"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/api";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { socketService } from "@/lib/socket";

interface OrderFormProps {
  symbol: string;
  price: number;
}

export default function OrderForm({ symbol, price }: OrderFormProps) {
  const [side, setSide] = useState<"long" | "short">("long");
  const [orderType, setOrderType] = useState<"limit" | "market">("market");
  const [leverage, setLeverage] = useState(20);
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState<"coin" | "lot">("lot");
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [activePosition, setActivePosition] = useState<any>(null);

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const fetchBalance = async () => {
    if (!isAuthenticated) return;
    setBalanceLoading(true);
    try {
      const response = await api.get("/wallet");
      if (response.data?.success) {
        setBalance(response.data.data.futuresBalanceUsd);
      }
    } catch (error: any) {
      console.error("Error fetching balance:", error);
    } finally {
      setBalanceLoading(false);
    }
  };

  const fetchActivePosition = async () => {
    if (!isAuthenticated) return;
    try {
      const response = await api.get("/futures/positions");
      if (response.data?.success) {
        const pos = response.data.data.find((p: any) => p.symbol === symbol);
        setActivePosition(pos || null);
      }
    } catch (error) {
      console.error("Error fetching active position:", error);
    }
  };

  useEffect(() => {
    fetchBalance();
    fetchActivePosition();
    
    const socket = socketService.getSocket();
    const handleUpdate = () => {
      fetchBalance();
      fetchActivePosition();
    };

    socket.on("portfolio_update", handleUpdate);
    socket.on("position_update", handleUpdate);
    
    return () => {
      socket.off("portfolio_update", handleUpdate);
      socket.off("position_update", handleUpdate);
    };
  }, [isAuthenticated, symbol]);

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to trade");
      return;
    }

    const actualQuantity = unit === "lot" ? parseFloat(quantity) / 1000 : parseFloat(quantity);

    if (isNaN(actualQuantity) || actualQuantity <= 0) {
      toast.error(`Please enter a valid ${unit === "lot" ? "lot" : "quantity"}`);
      return;
    }

    setLoading(true);
    try {
      const endpoint = "/futures/open";
      const payload = {
        symbol: symbol,
        side: side,
        quantity: actualQuantity,
        leverage: leverage,
        marginType: "isolated",
      };

      const response = await api.post(endpoint, payload);
      if (response.data?.success) {
        toast.success(`${side.toUpperCase()} position opened successfully!`);
        setQuantity("");
        handleUpdate();
      }
    } catch (error: any) {
      const msg = error.response?.data?.message || "Order failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = () => {
    fetchBalance();
    fetchActivePosition();
  };

  const baseSymbol = symbol.split("_")[0];

  // Calculate current PNL for the active position
  const pnlData = activePosition ? (() => {
    const isLong = activePosition.side === "long" || activePosition.side === "buy";
    const pnl = isLong 
      ? (price - activePosition.entryPrice) * activePosition.quantity
      : (activePosition.entryPrice - price) * activePosition.quantity;
    const margin = (activePosition.entryPrice * activePosition.quantity) / activePosition.leverage;
    const pnlPercent = (pnl / margin) * 100;
    return { pnl, pnlPercent, isLong };
  })() : null;

  return (
    <div className="flex w-[300px] flex-col bg-[#0b121e] border-l border-[#1e2a3b] h-full overflow-hidden">
      {/* Side Tabs */}
      <div className="flex border-b border-[#1e2a3b]">
        <button
          onClick={() => setSide("long")}
          className={`flex-1 py-3 text-xs font-bold transition-all duration-300 ${
            side === "long" 
              ? "text-[#00c076] border-b-2 border-[#00c076] bg-[#00c0760a]" 
              : "text-[#5f6f83] hover:text-[#8e97a8]"
          }`}
        >
          Buy / Long
        </button>
        <button
          onClick={() => setSide("short")}
          className={`flex-1 py-3 text-xs font-bold transition-all duration-300 ${
            side === "short" 
              ? "text-[#ff4d4d] border-b-2 border-[#ff4d4d] bg-[#ff4d4d0a]" 
              : "text-[#5f6f83] hover:text-[#8e97a8]"
          }`}
        >
          Sell / Short
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-6">
        
        {/* Active Position Indicator */}
        {activePosition && pnlData && (
          <div className="rounded-lg bg-gradient-to-br from-[#1e2a3b] to-[#080d18] border border-[#1e2a3b] p-3 shadow-xl animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                 <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${pnlData.isLong ? "bg-[#00c0761a] text-[#00c076]" : "bg-[#ff4d4d1a] text-[#ff4d4d]"}`}>
                    {pnlData.isLong ? "LONG" : "SHORT"}
                 </span>
                 <span className="text-[11px] font-bold text-[#eef3ff]">{baseSymbol} <span className="text-[9px] text-[#5f6f83]">Active</span></span>
              </div>
              <span className={`text-xs font-black ${pnlData.pnl >= 0 ? "text-[#00c076]" : "text-[#ff4d4d]"}`}>
                {pnlData.pnl >= 0 ? "+" : ""}{pnlData.pnl.toFixed(2)} USD
              </span>
            </div>
            <div className="flex items-center justify-between text-[10px]">
               <span className="text-[#5f6f83]">ROE%</span>
               <span className={`font-bold ${pnlData.pnlPercent >= 0 ? "text-[#00c076]" : "text-[#ff4d4d]"}`}>
                 {pnlData.pnlPercent >= 0 ? "+" : ""}{pnlData.pnlPercent.toFixed(2)}%
               </span>
            </div>
            <div className="mt-2 h-1 w-full bg-[#0b121e] rounded-full overflow-hidden">
               <div 
                 className={`h-full transition-all duration-500 ${pnlData.pnl >= 0 ? "bg-[#00c076]" : "bg-[#ff4d4d]"}`} 
                 style={{ width: `${Math.min(Math.abs(pnlData.pnlPercent), 100)}%` }} 
               />
            </div>
          </div>
        )}

        {/* Leverage Selector */}
        <div className="rounded-lg border border-[#1e2a3b] bg-[#141d2e] p-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-[#5f6f83]">Leverage</span>
            <div className="flex items-center gap-1 cursor-pointer">
              <span className="text-xs font-bold text-amber-500">{leverage}x</span>
              <svg className="w-3 h-3 text-[#5f6f83]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Order Type Tabs */}
        <div className="flex gap-4 border-b border-[#1e2a3b]/50">
          {["Limit", "Market", "Maker Only"].map((type) => (
            <button
              key={type}
              onClick={() => type !== "Maker Only" && setOrderType(type.toLowerCase() as any)}
              className={`pb-2 text-[11px] font-medium transition-all ${
                (type.toLowerCase() === orderType || (type === "Maker Only" && orderType === "limit"))
                  ? "text-white border-b-2 border-white -mb-[1px]" 
                  : "text-[#5f6f83] hover:text-[#8e97a8]"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Quantity Section */}
        <div className="space-y-2.5">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-[#5f6f83] font-medium uppercase tracking-wider">Amount</span>
            <div className="flex p-0.5 bg-[#080d18] border border-[#1e2a3b] rounded-md">
              <button 
                onClick={() => setUnit("lot")}
                className={`px-2 py-0.5 rounded-[3px] text-[9px] font-bold transition-all duration-200 ${unit === "lot" ? "bg-[#1e2a3b] text-[#eef3ff] shadow-sm" : "text-[#5f6f83] hover:text-[#8e97a8]"}`}
              >
                LOT
              </button>
              <button 
                onClick={() => setUnit("coin")}
                className={`px-2 py-0.5 rounded-[3px] text-[9px] font-bold transition-all duration-200 ${unit === "coin" ? "bg-[#1e2a3b] text-[#eef3ff] shadow-sm" : "text-[#5f6f83] hover:text-[#8e97a8]"}`}
              >
                {baseSymbol}
              </button>
            </div>
          </div>
          
          <div className="relative group">
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full bg-[#080d18] border border-[#1e2a3b] rounded-lg h-[44px] px-3.5 text-sm font-bold text-[#eef3ff] focus:outline-none focus:border-[#5f6f83] transition-all placeholder:text-[#1e2a3b]/50"
              placeholder="0.00"
            />
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 border-l border-[#1e2a3b] pl-3">
              <span className="text-[10px] font-black text-[#5f6f83] uppercase tracking-tighter">
                {unit === "lot" ? "Lot" : baseSymbol}
              </span>
              <svg className="w-2.5 h-2.5 text-[#1e2a3b] group-hover:text-[#5f6f83] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {unit === "lot" && quantity && (
            <div className="flex items-center gap-1 justify-end">
              <span className="text-[10px] text-[#5f6f83] italic">≈</span>
              <span className="text-[10px] font-medium text-[#8e97a8]">{(parseFloat(quantity) / 1000).toFixed(6)}</span>
              <span className="text-[10px] text-[#5f6f83]">{baseSymbol}</span>
            </div>
          )}

          {/* Percent Dots */}
          <div className="flex items-center justify-between px-1 mt-3">
            {[10, 25, 50, 75, 100].map((pct) => (
              <button 
                key={pct}
                className="group flex flex-col items-center gap-1"
              >
                <div className="h-1 w-1 rounded-full bg-[#1e2a3b] group-hover:bg-[#5f6f83]" />
                <span className="text-[9px] text-[#5f6f83]">{pct}%</span>
              </button>
            ))}
          </div>
        </div>

        {/* Info & Execution */}
        <div className="mt-auto space-y-4">
          <div className="space-y-2 border-t border-[#1e2a3b]/50 pt-4">
            <div className="flex justify-between text-[11px]">
              <span className="text-[#5f6f83]">Funds req.</span>
              <span className="text-[#8e97a8]">
                ~{((price * (unit === "lot" ? (parseFloat(quantity) || 0) / 1000 : (parseFloat(quantity) || 0))) / leverage).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
              </span>
            </div>
            
            <div className="flex justify-between text-[11px] items-center">
              <div className="flex items-center gap-1.5">
                <span className="text-[#5f6f83]">Available Margin</span>
                <button 
                  onClick={fetchBalance}
                  className={`p-0.5 rounded hover:bg-[#1e2a3b] transition-colors ${balanceLoading ? 'animate-spin' : ''}`}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#5f6f83]">
                    <path d="M23 4v6h-6" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                  </svg>
                </button>
              </div>
              <span className={`font-bold transition-colors ${balanceLoading ? 'text-[#5f6f83]' : 'text-[#8e97a8]'}`}>
                {balance === null ? "---" : balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
              </span>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`relative mt-2 flex h-12 w-full items-center justify-center overflow-hidden rounded-lg shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 text-sm font-bold text-white ${
              side === 'long' 
                ? 'bg-gradient-to-r from-[#00c076] to-[#00d086]' 
                : 'bg-gradient-to-r from-[#ff4d4d] to-[#ff5d5d]'
            }`}
          >
            {loading ? "Processing..." : `${side === 'long' ? 'Buy / Long' : 'Sell / Short'} ${baseSymbol}`}
          </button>
        </div>
      </div>

      {/* Footer Promo */}
      <div className="p-4 border-t border-[#1e2a3b] bg-[#0b121e]">
        <div className="rounded-lg bg-gradient-to-br from-[#141d2e] to-[#0b121e] p-3 border border-[#1e2a3b] hover:border-[#5f6f83]/30 transition-colors cursor-pointer">
           <div className="flex items-center justify-between">
              <p className="text-[11px] font-medium text-[#8e97a8]">
                Save up to <span className="text-[#00c076]">50% on fees</span>
              </p>
              <svg className="w-4 h-4 text-[#00c076]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
           </div>
        </div>
      </div>
    </div>
  );
}
