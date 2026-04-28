"use client";

import React, { useEffect, useRef, memo, useState, useCallback } from "react";
import { socketService } from "@/lib/socket";
import api from "@/lib/api";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import toast from "react-hot-toast";

function TradingChart({ symbol = "BTC_USDT" }: { symbol?: string }) {
  const container = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const [activePosition, setActivePosition] = useState<any>(null);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const fetchActivePosition = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const response = await api.get("/futures/positions");
      if (response.data?.success) {
        const pos = response.data.data.find((p: any) => p.symbol === symbol);
        setActivePosition(pos || null);
      }
    } catch (error) {
      console.error("Error fetching active position for chart:", error);
    }
  }, [symbol, isAuthenticated]);

  // Load TradingView Widget
  useEffect(() => {
    if (!widgetRef.current) return;

    // Clear the widget container safely
    widgetRef.current.innerHTML = "";
    
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: `BINANCE:${symbol.replace("_", "")}`,
      interval: "5",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      enable_publishing: false,
      allow_symbol_change: false,
      calendar: false,
      support_host: "https://www.tradingview.com",
      backgroundColor: "rgba(9, 13, 24, 1)",
      gridColor: "rgba(30, 34, 45, 1)",
      hide_side_toolbar: false,
      details: false,
      hotlist: false,
      calendar_event: false,
    });

    widgetRef.current.appendChild(script);

    return () => {
      if (widgetRef.current) {
        widgetRef.current.innerHTML = "";
      }
    };
  }, [symbol]);

  // Handle Updates
  useEffect(() => {
    fetchActivePosition();
    const socket = socketService.getSocket();
    
    const handlePriceUpdate = (data: any) => {
      if (data.prices && data.prices[symbol]) {
        setCurrentPrice(data.prices[symbol].price);
      }
    };

    const handleUpdate = () => fetchActivePosition();

    socket.on("price_update", handlePriceUpdate);
    socket.on("position_update", handleUpdate);
    socket.on("portfolio_update", handleUpdate);

    return () => {
      socket.off("price_update", handlePriceUpdate);
      socket.off("position_update", handleUpdate);
      socket.off("portfolio_update", handleUpdate);
    };
  }, [symbol, isAuthenticated, fetchActivePosition]);

  const handleClosePosition = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activePosition) return;
    try {
      await api.post(`/futures/close/${activePosition._id}`);
      toast.success("Closing position...");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to close position");
    }
  };

  const calculatePNL = () => {
    if (!activePosition || !currentPrice) return { pnl: 0, pnlPercent: 0 };
    const isLong = activePosition.side === "long" || activePosition.side === "buy";
    const pnl = isLong 
      ? (currentPrice - activePosition.entryPrice) * activePosition.quantity
      : (activePosition.entryPrice - currentPrice) * activePosition.quantity;
    
    const margin = (activePosition.entryPrice * activePosition.quantity) / activePosition.leverage;
    const pnlPercent = (pnl / margin) * 100;
    return { pnl, pnlPercent, isLong };
  };

  const pnlData = calculatePNL();

  return (
    <div className="relative h-full w-full bg-[#090d18] overflow-hidden" ref={container}>
      {/* Stable Widget Container Managed by Ref */}
      <div 
        ref={widgetRef} 
        className="h-full w-full"
        style={{ height: "100%", width: "100%" }}
      >
        <div className="flex h-full items-center justify-center text-[#5f6f83] text-[10px] uppercase tracking-widest font-bold">
           Initializing Charting Engine...
        </div>
      </div>

      {/* PNL Indicator Overlay (Mobile Style) */}
      {activePosition && currentPrice > 0 && (
        <div className="absolute right-12 top-1/2 -translate-y-1/2 z-[100] pointer-events-none">
           <div className="flex items-center pointer-events-auto">
              <div className="w-8 h-[1px] bg-[#3b82f6] border-t border-dashed opacity-50"></div>
              <div className="flex items-center overflow-hidden rounded bg-[#1e222d] border border-[#3b82f666] shadow-2xl">
                 <div className="flex items-center gap-1.5 px-2 py-1.5 bg-[#3b82f6] text-white text-[11px] font-bold">
                    <span>{(activePosition.quantity * 1000).toFixed(0)}</span>
                 </div>
                 <div className="flex items-center gap-2 px-3 py-1.5 min-w-[100px]">
                    <span className={`text-[11px] font-black ${pnlData.pnl >= 0 ? "text-[#00c076]" : "text-[#ff4d4d]"}`}>
                      {pnlData.pnl >= 0 ? "+" : ""}{pnlData.pnl.toFixed(2)} USD
                    </span>
                    <button 
                      onClick={handleClosePosition}
                      className="ml-1 text-[#5f6f83] hover:text-white transition-colors p-1"
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Symbol Badge at Top Left */}
      <div className="absolute left-4 top-4 z-20 flex items-center gap-2 bg-[#1e222d] rounded px-2 py-1 border border-white/5 pointer-events-none shadow-lg">
         <div className="w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center text-[10px] font-bold text-white">B</div>
         <span className="text-[11px] font-bold text-white uppercase">{symbol.replace("_", " / ")}</span>
         <div className="w-1.5 h-1.5 rounded-full bg-[#00c076] animate-pulse"></div>
      </div>
    </div>
  );
}

export default memo(TradingChart);
