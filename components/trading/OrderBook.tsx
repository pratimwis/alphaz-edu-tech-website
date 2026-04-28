"use client";

import React from "react";

interface OrderBookProps {
  symbol: string;
  price: number;
}

export default function OrderBook({ symbol, price }: OrderBookProps) {
  // Mock data for order book
  const asks = Array.from({ length: 12 }).map((_, i) => ({
    price: price + (12 - i) * 1.5,
    size: Math.random() * 2,
    total: 0,
  }));

  const bids = Array.from({ length: 12 }).map((_, i) => ({
    price: price - (i + 1) * 1.5,
    size: Math.random() * 2,
    total: 0,
  }));

  // Calculate totals
  let askTotal = 0;
  asks.reverse().forEach((a) => {
    askTotal += a.size;
    a.total = askTotal;
  });
  asks.reverse();

  let bidTotal = 0;
  bids.forEach((b) => {
    bidTotal += b.size;
    b.total = bidTotal;
  });

  const maxTotal = Math.max(askTotal, bidTotal);

  return (
    <div className="flex h-full flex-col bg-[#0b121e]">
      <div className="flex h-10 items-center justify-between border-b border-[#1e2a3b] px-4">
        <span className="text-[11px] font-bold text-white">Order Book</span>
        <div className="flex gap-2">
          <div className="flex items-center gap-1 rounded bg-[#1e2a3b] px-1.5 py-0.5">
            <span className="text-[10px] font-medium text-[#5f6f83]">0.5</span>
            <svg className="h-2 w-2 text-[#5f6f83]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex h-8 items-center px-4 text-[10px] font-medium text-[#5f6f83]">
        <span className="flex-1">Price (USD)</span>
        <span className="w-16 text-right">Size</span>
        <span className="w-16 text-right">Total</span>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar font-mono">
        {/* Asks */}
        <div className="flex flex-col-reverse min-h-[50%]">
          {asks.map((ask, i) => (
            <div key={i} className="group relative flex h-[18px] items-center px-4 text-[11px] transition hover:bg-white/[0.03]">
              <div 
                className="absolute right-0 top-0 h-full bg-[#ff4d4d14] transition-all duration-500" 
                style={{ width: `${(ask.total / maxTotal) * 100}%` }}
              />
              <span className="flex-1 font-bold tracking-tight text-[#ff4d4d]">{ask.price.toLocaleString(undefined, { minimumFractionDigits: 1 })}</span>
              <span className="relative w-16 text-right font-medium text-[#c2cad9]">{ask.size.toFixed(3)}</span>
              <span className="relative w-16 text-right font-medium text-[#c2cad9]">{ask.total.toFixed(3)}</span>
            </div>
          ))}
        </div>

        {/* Spread / Current Price */}
        <div className="my-1.5 flex h-10 items-center border-y border-[#1e2a3b] bg-[#141d2e] px-4 shadow-inner">
          <span className="text-sm font-black tracking-tight text-[#00c076]">${price.toLocaleString()}</span>
          <div className="ml-auto flex items-center gap-2">
             <span className="text-[10px] font-bold text-[#5f6f83] tracking-tighter">${(price * 1.0001).toFixed(1)}</span>
             <svg className="h-3 w-3 text-[#00c076]" fill="currentColor" viewBox="0 0 24 24">
               <path d="M7 14l5-5 5 5H7z" />
             </svg>
          </div>
        </div>

        {/* Bids */}
        <div className="flex flex-col">
          {bids.map((bid, i) => (
            <div key={i} className="group relative flex h-[18px] items-center px-4 text-[11px] transition hover:bg-white/[0.03]">
              <div 
                className="absolute right-0 top-0 h-full bg-[#00c07614] transition-all duration-500" 
                style={{ width: `${(bid.total / maxTotal) * 100}%` }}
              />
              <span className="flex-1 font-bold tracking-tight text-[#00c076]">{bid.price.toLocaleString(undefined, { minimumFractionDigits: 1 })}</span>
              <span className="relative w-16 text-right font-medium text-[#c2cad9]">{bid.size.toFixed(3)}</span>
              <span className="relative w-16 text-right font-medium text-[#c2cad9]">{bid.total.toFixed(3)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
