"use client";

import { useEffect, useState } from "react";
import { socketService } from "@/lib/socket";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface PriceData {
  symbol: string;
  price: number;
  change24h: number;
  volume: number;
  raw: any;
}

const CATEGORIES = ["ALL", "NEW", "LAYER 1", "AI", "MEME", "DEFI", "US STOCKS"];

const CATEGORY_MAP: Record<string, string[]> = {
  "NEW": ["AIOT_USDT", "XAUT_USDT", "HUSD_USDT", "PEPE_USDT", "WIF_USDT", "BONK_USDT", "SUI_USDT"],
  "LAYER 1": ["BTC_USDT", "ETH_USDT", "SOL_USDT", "BNB_USDT", "ADA_USDT", "AVAX_USDT", "DOT_USDT", "TRX_USDT", "NEAR_USDT", "APT_USDT", "SUI_USDT", "TIA_USDT", "SEI_USDT"],
  "AI": ["FET_USDT", "RNDR_USDT", "NEAR_USDT"],
  "MEME": ["DOGE_USDT", "SHIB_USDT", "PEPE_USDT", "WIF_USDT", "BONK_USDT"],
  "DEFI": ["XRP_USDT", "LINK_USDT", "UNI_USDT", "JUP_USDT", "PYTH_USDT"],
  "US STOCKS": ["NVDAXUSDT", "TSLAXUSDT", "AAPLXUSDT", "METAXUSDT", "AMZNXUSDT", "GOOGLXUSDT"],
};

export default function MarketTable() {
  const [prices, setPrices] = useState<Record<string, PriceData>>({});
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const socket = socketService.getSocket();

    socket.on("price_update", (data: { prices: Record<string, PriceData> }) => {
      console.log("Received price update for", Object.keys(data.prices).length, "symbols");
      setPrices((prev) => ({
        ...prev,
        ...data.prices,
      }));
    });

    return () => {
      socket.off("price_update");
    };
  }, []);

  const priceList = Object.values(prices).filter(p => {
    const normalizedSymbol = p.symbol.replace("_", "");
    const matchesSearch = p.symbol.toLowerCase().includes(search.toLowerCase());

    let matchesCategory = activeCategory === "ALL";
    if (!matchesCategory) {
      const categorySymbols = CATEGORY_MAP[activeCategory] || [];
      matchesCategory = categorySymbols.some(s => s.replace("_", "") === normalizedSymbol);
    }

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full space-y-6">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 text-[11px] font-bold tracking-wider rounded transition-all ${activeCategory === cat
                ? "bg-[var(--accent)] text-white"
                : "bg-[var(--surface-2)] text-[var(--text-muted)] hover:text-[var(--text-strong)] border border-[var(--line-soft)]"
              }`}
          >
            {cat}
          </button>
        ))}
        <button className="p-1.5 bg-[var(--surface-2)] border border-[var(--line-soft)] rounded text-[var(--text-muted)]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-xs ml-auto">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[var(--surface-2)] border border-[var(--line-soft)] rounded-md px-10 py-1.5 text-sm text-[var(--text-strong)] focus:outline-none focus:border-[var(--accent)]"
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-[var(--line-subtle)] bg-[var(--surface-1)]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[var(--line-subtle)] text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
              <th className="px-6 py-4">Contract</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4 text-right">Last Price</th>
              <th className="px-6 py-4 text-right">24h Change</th>
              <th className="px-6 py-4 text-right">24h Volume</th>
              <th className="px-6 py-4 text-right">Open Interest</th>
              <th className="px-6 py-4 text-right">24h Prices</th>
              <th className="px-6 py-4 text-right">Funding</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--line-subtle)]">
            {priceList.length > 0 ? (
              priceList.map((ticker) => {
                const change = ticker.change24h;
                const isPositive = change >= 0;
                const isNew = ["AIOT_USDT", "XAUT_USDT", "HUSD_USDT", "PEPE_USDT", "WIF_USDT", "BONK_USDT", "SUI_USDT"].includes(ticker.symbol);

                return (
                  <tr 
                    key={ticker.symbol} 
                    className="hover:bg-[var(--surface-2)] transition-colors group cursor-pointer"
                    onClick={() => router.push(`/trade/${ticker.symbol}`)}
                  >
                    <td className="px-6 py-4 relative">
                      {isNew && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500 overflow-hidden">
                          <div className="absolute top-2 -left-4 bg-amber-500 text-[8px] font-black text-[#081018] px-4 py-0.5 rotate-[-45deg] whitespace-nowrap uppercase tracking-tighter">
                            New
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        <span className="text-[var(--text-muted)] group-hover:text-amber-400 cursor-pointer transition-colors">★</span>
                        <span className="text-sm font-bold text-[var(--text-strong)]">{ticker.symbol.replace("_", "")}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[var(--text-muted)]">
                          {ticker.symbol.split("_")[0]} Perpetual
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-[var(--surface-3)] text-[10px] font-bold text-amber-500">
                          200x
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-mono font-medium text-[var(--text-strong)]">
                        ${ticker.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`text-sm font-medium ${isPositive ? "text-green-500" : "text-red-500"}`}>
                        {isPositive ? "+" : ""}{change.toFixed(2)}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm text-[var(--text-soft)]">
                        ${(ticker.volume / 1000000).toFixed(2)}M
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm text-[var(--text-soft)]">
                        ${(ticker.volume * 0.1 / 1000000).toFixed(1)}M
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex flex-col items-end text-[10px]">
                        <span className="text-[var(--text-muted)]">High: <span className="text-[var(--text-strong)]">{(ticker.price * 1.02).toFixed(1)}</span></span>
                        <span className="text-[var(--text-muted)]">Low: <span className="text-[var(--text-strong)]">{(ticker.price * 0.98).toFixed(1)}</span></span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex flex-col items-end">
                        <span className="text-sm text-green-500 font-medium">0.0052%</span>
                        <span className="text-[9px] text-[var(--text-muted)]">/ 8h</span>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={8} className="px-6 py-20 text-center text-[var(--text-muted)]">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin"></div>
                    <p>Connecting to live market data...</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
