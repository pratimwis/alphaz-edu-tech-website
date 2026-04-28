"use client";

import React from "react";

export default function RecentTrades({ symbol, price }: { symbol: string; price: number }) {
  const trades = Array.from({ length: 15 }).map((_, i) => ({
    price: price + (Math.random() - 0.5) * 10,
    size: Math.random() * 0.5,
    time: new Date(Date.now() - i * 1000 * 60).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    side: Math.random() > 0.5 ? "buy" : "sell",
  }));

  return (
    <div className="flex h-full flex-col bg-[#0b121e] border-t border-[#1e2a3b]">
      <div className="flex h-10 items-center px-4 border-b border-[#1e2a3b]">
        <span className="text-[11px] font-bold text-white">Recent Trades</span>
      </div>

      <div className="flex h-8 items-center px-4 text-[10px] font-medium text-[#5f6f83]">
        <span className="flex-1">Price (USD)</span>
        <span className="w-16 text-right">Size</span>
        <span className="w-16 text-right">Time</span>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar font-mono">
        {trades.map((trade, i) => (
          <div key={i} className="flex h-[18px] items-center px-4 text-[11px] transition hover:bg-white/[0.03]">
            <span className={`flex-1 font-bold tracking-tight ${trade.side === "buy" ? "text-[#00c076]" : "text-[#ff4d4d]"}`}>
              {trade.price.toLocaleString(undefined, { minimumFractionDigits: 1 })}
            </span>
            <span className="w-16 text-right font-medium text-[#c2cad9]">{trade.size.toFixed(3)}</span>
            <span className="w-16 text-right font-medium text-[#5f6f83]">{trade.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
