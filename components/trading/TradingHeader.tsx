"use client";

import React from "react";

interface TickerData {
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
}

export default function TradingHeader({ 
  symbol, 
  ticker 
}: { 
  symbol: string; 
  ticker: TickerData | null 
}) {
  const isPositive = (ticker?.change24h || 0) >= 0;

  return (
    <div className="flex h-[52px] items-center justify-between border-b border-[#1e2a3b] bg-[#0b121e] px-4">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <span className="text-base font-bold text-white">
            {symbol.replace("_", "")}
          </span>
          <div className="flex items-center gap-1.5 rounded bg-[#1e2a3b] px-2 py-0.5">
             <div className="h-1.5 w-1.5 rounded-full bg-[#00c076]" />
             <span className="text-[10px] font-medium text-[#8e97a8]">
               Perpetual
             </span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className={`text-base font-semibold transition-colors duration-500 ${isPositive ? "text-[#00c076]" : "text-[#ff4d4d]"}`}>
              ${ticker?.price?.toLocaleString(undefined, { minimumFractionDigits: 1 }) || "---"}
            </span>
          </div>

          <div className="hidden h-8 w-[1px] bg-[#1e2a3b] md:block" />

          <div className="hidden items-center gap-6 md:flex">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#5f6f83]">24h Change</span>
              <span className={`text-xs font-medium ${isPositive ? "text-[#00c076]" : "text-[#ff4d4d]"}`}>
                {isPositive ? "+" : ""}{ticker?.change24h?.toFixed(2) || "0.00"}%
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-[#5f6f83]">24h High</span>
              <span className="text-xs font-medium text-white">${ticker?.high24h?.toLocaleString() || "---"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-[#5f6f83]">24h Low</span>
              <span className="text-xs font-medium text-white">${ticker?.low24h?.toLocaleString() || "---"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-[#5f6f83]">24h Volume</span>
              <span className="text-xs font-medium text-white">{ticker?.volume24h?.toLocaleString() || "---"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 rounded border border-[#1e2a3b] bg-[#141d2e] px-3 py-1.5 text-[11px] font-medium text-[#8e97a8] transition hover:bg-[#1e2a3b] hover:text-white">
          Contract Details
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
