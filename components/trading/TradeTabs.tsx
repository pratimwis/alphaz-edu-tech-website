"use client";

import React, { useState, useEffect, useMemo } from "react";
import api from "@/lib/api";
import { socketService } from "@/lib/socket";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import toast from "react-hot-toast";
import Link from "next/link";

const tabs = [
  "Positions",
  "Open Orders",
  "Stop Orders",
  "Order History",
];

export default function TradeTabs() {
  const [activeTab, setActiveTab] = useState("Positions");
  const [positions, setPositions] = useState<any[]>([]);
  const [prices, setPrices] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const fetchPositions = async () => {
    if (!isAuthenticated) return;
    try {
      const response = await api.get("/futures/positions");
      if (response.data?.success) {
        setPositions(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching positions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPositions();

    const socket = socketService.getSocket();
    
    const handlePositionUpdate = () => fetchPositions();
    const handlePriceUpdate = (data: any) => {
      if (data.prices) {
        setPrices(prev => {
          const newPrices: any = { ...prev };
          Object.keys(data.prices).forEach(sym => {
            newPrices[sym] = data.prices[sym].price;
          });
          return newPrices;
        });
      }
    };

    socket.on("position_update", handlePositionUpdate);
    socket.on("portfolio_update", handlePositionUpdate);
    socket.on("price_update", handlePriceUpdate);

    return () => {
      socket.off("position_update", handlePositionUpdate);
      socket.off("portfolio_update", handlePositionUpdate);
      socket.off("price_update", handlePriceUpdate);
    };
  }, [isAuthenticated]);

  const handleClosePosition = async (positionId: string) => {
    try {
      await api.post(`/futures/close/${positionId}`);
      toast.success("Position closing...");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to close position");
    }
  };

  const calculatePNL = (pos: any) => {
    const currentPrice = prices[pos.symbol];
    if (!currentPrice) return { pnl: 0, pnlPercent: 0 };

    const isLong = pos.side === "long" || pos.side === "buy";
    const pnl = isLong 
      ? (currentPrice - pos.entryPrice) * pos.quantity
      : (pos.entryPrice - currentPrice) * pos.quantity;
    
    const margin = (pos.entryPrice * pos.quantity) / pos.leverage;
    const pnlPercent = (pnl / margin) * 100;

    return { pnl, pnlPercent };
  };

  const totalUPNL = useMemo(() => {
    return positions.reduce((acc, pos) => {
      const { pnl } = calculatePNL(pos);
      return acc + pnl;
    }, 0);
  }, [positions, prices]);

  if (!isAuthenticated) {
    return (
      <div className="flex h-full min-h-[220px] items-center justify-center rounded-lg border border-[var(--line-soft)] bg-[var(--surface-1)] px-6 py-10">
        <div className="text-center">
          <p className="text-sm font-semibold text-[var(--text-strong)]">
            Log in to view positions and order history
          </p>
          <p className="mt-2 text-xs text-[var(--text-muted)]">
            Position holding details are available only for signed-in users.
          </p>
          <Link
            href="/login"
            className="mt-4 inline-flex rounded-md bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[var(--accent-hover)]"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-[var(--surface-1)]">
      {/* Tab Header */}
      <div className="flex h-10 gap-8 border-b border-[var(--line-soft)] px-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative flex items-center text-[11px] font-semibold transition-all duration-300 ${
              activeTab === tab ? "text-[var(--text-strong)]" : "text-[var(--text-muted)] hover:text-[var(--text-soft)]"
            }`}
          >
            {tab}
            {tab === "Positions" && positions.length > 0 && (
              <span className="ml-1.5 rounded-full bg-[#ff7814]/10 px-1.5 py-0.5 text-[9px] font-bold text-[#ff7814]">
                {positions.length}
              </span>
            )}
            {activeTab === tab && (
              <span className="absolute -bottom-[1px] left-0 h-[2px] w-full bg-[var(--accent)]" />
            )}
          </button>
        ))}
      </div>

      {/* Positions Content */}
      <div className="flex-1 overflow-auto custom-scrollbar">
        {activeTab === "Positions" && (
          <div className="flex flex-col h-full">
            {positions.length > 0 && (
              <div className="flex items-center justify-between px-6 py-3 bg-[var(--surface-3)]/40 border-b border-[var(--line-soft)]">
                <div className="flex items-center gap-4">
                  <span className="text-[11px] text-[var(--text-muted)]">Total UPNL</span>
                  <span className={`text-xs font-bold ${totalUPNL >= 0 ? "text-[#00c076]" : "text-[#ff4d4d]"}`}>
                    {totalUPNL >= 0 ? "+" : ""}{totalUPNL.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#00c0761a] text-[#00c076] font-bold">Healthy</span>
                   <button className="text-[10px] font-bold text-[#ff4d4d] hover:bg-[#ff4d4d1a] px-2 py-1 rounded transition-colors border border-[#ff4d4d33]">Close All</button>
                </div>
              </div>
            )}

            {positions.length > 0 ? (
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead className="bg-[var(--surface-1)]">
                  <tr className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] border-b border-[var(--line-soft)]">
                    <th className="px-6 py-3 font-medium">Symbol</th>
                    <th className="px-6 py-3 font-medium">Quantity</th>
                    <th className="px-6 py-3 font-medium text-right">Entry Price</th>
                    <th className="px-6 py-3 font-medium text-right">Mark Price</th>
                    <th className="px-6 py-3 font-medium text-right">Leverage</th>
                    <th className="px-6 py-3 font-medium text-right">Unrealized PNL</th>
                    <th className="px-6 py-3 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="text-[11px] text-[var(--text-primary)]">
                  {positions.map((pos) => {
                    const { pnl, pnlPercent } = calculatePNL(pos);
                    const markPrice = prices[pos.symbol] || pos.entryPrice;
                    return (
                      <tr key={pos._id} className="border-b border-[var(--line-soft)]/40 hover:bg-[var(--surface-2)]/50 transition-colors">
                        <td className="px-6 py-4">
                           <div className="flex flex-col">
                              <span className="font-black text-sm">{pos.symbol.split("_")[0]}<span className="text-[10px] text-[var(--text-muted)] font-medium ml-0.5">PERP</span></span>
                              <span className={`text-[9px] font-bold ${(pos.side === 'long' || pos.side === 'buy') ? 'text-[#00c076]' : 'text-[#ff4d4d]'}`}>
                                {(pos.side === 'long' || pos.side === 'buy') ? 'LONG' : 'SHORT'}
                              </span>
                           </div>
                        </td>
                        <td className="px-6 py-4">
                           <div className="flex flex-col">
                              <span className="font-bold">{pos.quantity.toFixed(4)} {pos.symbol.split("_")[0]}</span>
                              <span className="text-[10px] text-[var(--text-muted)]">{(pos.quantity * 1000).toFixed(0)} Lots</span>
                           </div>
                        </td>
                        <td className="px-6 py-4 text-right font-mono text-[var(--text-muted)]">${pos.entryPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                        <td className="px-6 py-4 text-right font-mono text-[var(--text-strong)]">${markPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-amber-500 font-bold px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">{pos.leverage}x</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex flex-col items-end">
                             <span className={`font-black text-xs ${pnl >= 0 ? "text-[#00c076]" : "text-[#ff4d4d]"}`}>
                                {pnl >= 0 ? "+" : ""}{pnl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                             </span>
                             <span className={`text-[10px] font-bold ${pnlPercent >= 0 ? "text-[#00c076]" : "text-[#ff4d4d]"}`}>
                                {pnlPercent >= 0 ? "+" : ""}{pnlPercent.toFixed(2)}%
                             </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                             <button className="px-2 py-1 rounded bg-[var(--surface-3)] text-[var(--text-muted)] hover:text-[var(--text-strong)] transition-all text-[9px] font-bold">Add</button>
                             <button 
                               onClick={() => handleClosePosition(pos._id)}
                               className="px-2 py-1 rounded bg-[var(--surface-3)] text-[#ff4d4d] hover:bg-[#ff4d4d] hover:text-white transition-all text-[9px] font-bold"
                             >
                               Close
                             </button>
                             <button className="px-2 py-1 rounded bg-[var(--surface-3)] text-[var(--text-muted)] hover:text-[var(--text-strong)] transition-all text-[9px] font-bold">TP/SL</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center py-20 text-[var(--text-muted)]">
                <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--surface-3)]/20 border border-[var(--line-soft)]">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <line x1="9" y1="21" x2="9" y2="9" />
                  </svg>
                  <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-[var(--surface-1)] border border-[var(--line-soft)] flex items-center justify-center">
                    <span className="text-[10px] font-bold">0</span>
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-[var(--text-soft)] mb-1">No Open Positions</h3>
                <p className="text-xs text-[var(--text-muted)] max-w-[200px] text-center leading-relaxed">
                  Your active trades will appear here once executed.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
