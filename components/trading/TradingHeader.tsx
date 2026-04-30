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
    <div className="flex h-[52px] items-center justify-between border-b border-[var(--line-soft)] bg-[var(--surface-1)] px-4">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <span className="text-base font-bold text-[var(--text-strong)]">
            {symbol.replace("_", "")}
          </span>
          <div className="flex items-center gap-1.5 rounded bg-[var(--surface-3)] px-2 py-0.5">
             <div className="h-1.5 w-1.5 rounded-full bg-[#00c076]" />
             <span className="text-[10px] font-medium text-[var(--text-muted)]">
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

          <div className="hidden h-8 w-[1px] bg-[var(--line-soft)] md:block" />

          <div className="hidden items-center gap-6 md:flex">
            <div className="flex flex-col">
              <span className="text-[10px] text-[var(--text-muted)]">24h Change</span>
              <span className={`text-xs font-medium ${isPositive ? "text-[#00c076]" : "text-[#ff4d4d]"}`}>
                {isPositive ? "+" : ""}{ticker?.change24h?.toFixed(2) || "0.00"}%
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-[var(--text-muted)]">24h High</span>
              <span className="text-xs font-medium text-[var(--text-strong)]">${ticker?.high24h?.toLocaleString() || "---"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-[var(--text-muted)]">24h Low</span>
              <span className="text-xs font-medium text-[var(--text-strong)]">${ticker?.low24h?.toLocaleString() || "---"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-[var(--text-muted)]">24h Volume</span>
              <span className="text-xs font-medium text-[var(--text-strong)]">{ticker?.volume24h?.toLocaleString() || "---"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 rounded border border-[var(--line-soft)] bg-[var(--surface-2)] px-3 py-1.5 text-[11px] font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-3)] hover:text-[var(--text-strong)]">
          Contract Details
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
