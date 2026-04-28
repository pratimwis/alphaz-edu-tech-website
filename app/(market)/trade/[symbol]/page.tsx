"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { socketService } from "@/lib/socket";
import TradingHeader from "@/components/trading/TradingHeader";
import TradingChart from "@/components/trading/TradingChart";
import OrderBook from "@/components/trading/OrderBook";
import RecentTrades from "@/components/trading/RecentTrades";
import OrderForm from "@/components/trading/OrderForm";
import TradeTabs from "@/components/trading/TradeTabs";
import { Toaster } from "react-hot-toast";

export default function TradePage() {
  const params = useParams();
  const symbol = (params.symbol as string) || "BTC_USDT";
  const [ticker, setTicker] = useState<any>(null);
  const [prices, setPrices] = useState<any>({});

  useEffect(() => {
    const socket = socketService.getSocket();

    socket.on("price_update", (data: any) => {
      setPrices(data.prices);
      if (data.prices[symbol]) {
        setTicker({
          price: data.prices[symbol].price,
          change24h: data.prices[symbol].change24h || 1.25, // Mock if missing
          high24h: data.prices[symbol].high24h || data.prices[symbol].price * 1.05,
          low24h: data.prices[symbol].low24h || data.prices[symbol].price * 0.95,
          volume24h: data.prices[symbol].volume24h || 1250.5,
        });
      }
    });

    return () => {
      socket.off("price_update");
    };
  }, [symbol]);

  const currentPrice = ticker?.price || 0;

  if (!ticker && !prices[symbol]) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center bg-[#080d18] text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#ff7814] border-t-transparent"></div>
          <p className="text-sm font-bold uppercase tracking-widest text-[#5f6f83]">Loading {symbol.replace("_", "")} Market...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#080d18] text-[var(--text-primary)]">
      <Toaster position="top-right" />
      
      {/* First View: Header + Trading Interface (Full Height) */}
      <div className="flex h-[calc(100vh-64px)] flex-col border-b border-[#1e2a3b]">
        <TradingHeader symbol={symbol} ticker={ticker} />

        <div className="flex flex-1 overflow-hidden">
          {/* Chart Section */}
          <div className="flex-1 bg-[#080d18]">
            <TradingChart symbol={symbol} />
          </div>

          {/* Middle Section: Order Book & Recent Trades */}
          <div className="flex w-72 flex-col border-l border-[#1e2a3b] bg-[#0b121e]">
            <div className="flex-[1.5] overflow-hidden">
              <OrderBook symbol={symbol} price={currentPrice} />
            </div>
            <div className="flex-1 border-t border-[#1e2a3b] overflow-hidden">
              <RecentTrades symbol={symbol} price={currentPrice} />
            </div>
          </div>

          {/* Right Section: Order Form */}
          <div className="w-[300px] border-l border-[#1e2a3b]">
            <OrderForm symbol={symbol} price={currentPrice} />
          </div>
        </div>
      </div>

      {/* Second View: Positions/Orders (Full Width, Below Scroll) */}
      <div className="min-h-[500px] w-full bg-[#0b121e]">
        <div className="p-4">
          <TradeTabs />
        </div>
      </div>
    </div>
  );
}
