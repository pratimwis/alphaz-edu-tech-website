"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import api from "@/lib/api";

export default function PortfolioPage() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(true);
  const [holdings, setHoldings] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [wallet, setWallet] = useState<any>(null);

  const fetchPortfolio = async () => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const [summaryRes, historyRes] = await Promise.all([
        api.get("/portfolio/summary"),
        api.get("/portfolio/history?limit=20"),
      ]);

      if (summaryRes.data?.success) {
        setHoldings(summaryRes.data.data?.holdings || []);
        setWallet(summaryRes.data.data?.wallet || null);
      }
      if (historyRes.data?.success) {
        setOrders(historyRes.data.data || []);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-[var(--line-soft)] bg-[var(--surface-1)] p-8 text-center">
          <h1 className="text-2xl font-bold text-[var(--text-strong)]">Portfolio</h1>
          <p className="mt-3 text-sm text-[var(--text-muted)]">
            Please log in to view your holdings and order history.
          </p>
          <Link
            href="/login"
            className="mt-5 inline-flex rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--accent-hover)]"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--text-strong)]">Portfolio</h1>
        <button
          onClick={fetchPortfolio}
          className="rounded-md border border-[var(--line-soft)] bg-[var(--surface-1)] px-3 py-2 text-xs font-semibold text-[var(--text-soft)] hover:bg-[var(--surface-2)]"
        >
          Refresh
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-[var(--line-soft)] bg-[var(--surface-1)] p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">Spot Wallet</p>
          <p className="mt-2 text-xl font-black text-[var(--text-strong)]">
            ${Number(wallet?.balanceUsd || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className="rounded-xl border border-[var(--line-soft)] bg-[var(--surface-1)] p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">Futures Wallet</p>
          <p className="mt-2 text-xl font-black text-[#3ed87b]">
            ${Number(wallet?.futuresBalanceUsd || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className="rounded-xl border border-[var(--line-soft)] bg-[var(--surface-1)] p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">Spot Assets</p>
          <p className="mt-2 text-xl font-black text-[var(--text-strong)]">{holdings.length}</p>
        </div>
      </div>

      <div className="rounded-xl border border-[var(--line-soft)] bg-[var(--surface-1)] p-5">
        <h2 className="text-lg font-bold text-[var(--text-strong)]">Spot Holdings Wallet</h2>
        {loading ? (
          <p className="mt-4 text-sm text-[var(--text-muted)]">Loading holdings...</p>
        ) : holdings.length === 0 ? (
          <p className="mt-4 text-sm text-[var(--text-muted)]">No spot holdings available.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[680px] text-left">
              <thead>
                <tr className="border-b border-[var(--line-soft)] text-xs text-[var(--text-muted)]">
                  <th className="px-3 py-2">Asset</th>
                  <th className="px-3 py-2 text-right">Quantity</th>
                  <th className="px-3 py-2 text-right">Avg Price</th>
                  <th className="px-3 py-2 text-right">Value (USD)</th>
                  <th className="px-3 py-2 text-right">Unrealized PnL</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((h) => (
                  <tr key={h.symbol} className="border-b border-[var(--line-soft)]/40 text-sm text-[var(--text-soft)]">
                    <td className="px-3 py-3 font-semibold text-[var(--text-strong)]">{h.symbol}</td>
                    <td className="px-3 py-3 text-right">{Number(h.quantity || 0).toFixed(4)}</td>
                    <td className="px-3 py-3 text-right">${Number(h.avgBuyPrice || 0).toFixed(2)}</td>
                    <td className="px-3 py-3 text-right">${Number(h.valueUsd || 0).toFixed(2)}</td>
                    <td className={`px-3 py-3 text-right font-semibold ${Number(h.unrealizedPnlUsd || 0) >= 0 ? "text-[#00c076]" : "text-[#ff4d4d]"}`}>
                      {Number(h.unrealizedPnlUsd || 0) >= 0 ? "+" : ""}
                      {Number(h.unrealizedPnlUsd || 0).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-[var(--line-soft)] bg-[var(--surface-1)] p-5">
        <h2 className="text-lg font-bold text-[var(--text-strong)]">Order History</h2>
        {loading ? (
          <p className="mt-4 text-sm text-[var(--text-muted)]">Loading order history...</p>
        ) : orders.length === 0 ? (
          <p className="mt-4 text-sm text-[var(--text-muted)]">No order history available.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[780px] text-left">
              <thead>
                <tr className="border-b border-[var(--line-soft)] text-xs text-[var(--text-muted)]">
                  <th className="px-3 py-2">Time</th>
                  <th className="px-3 py-2">Symbol</th>
                  <th className="px-3 py-2">Side</th>
                  <th className="px-3 py-2 text-right">Quantity</th>
                  <th className="px-3 py-2 text-right">Price</th>
                  <th className="px-3 py-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o._id} className="border-b border-[var(--line-soft)]/40 text-sm text-[var(--text-soft)]">
                    <td className="px-3 py-3">{new Date(o.createdAt).toLocaleString()}</td>
                    <td className="px-3 py-3 font-semibold text-[var(--text-strong)]">{o.symbol}</td>
                    <td className={`px-3 py-3 font-semibold ${o.side === "buy" ? "text-[#00c076]" : "text-[#ff4d4d]"}`}>
                      {String(o.side || "").toUpperCase()}
                    </td>
                    <td className="px-3 py-3 text-right">{Number(o.quantity || 0).toFixed(4)}</td>
                    <td className="px-3 py-3 text-right">${Number(o.executionPrice || o.limitPrice || 0).toFixed(2)}</td>
                    <td className="px-3 py-3 text-right font-semibold text-[var(--text-muted)]">{String(o.status || "").toUpperCase()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
