"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/lib/redux/slices/authSlice";
import toast from "react-hot-toast";
import api from "@/lib/api";

interface ProfileModalProps {
  user: any;
  onClose: () => void;
}

export default function ProfileModal({ user, onClose }: ProfileModalProps) {
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [spotHoldings, setSpotHoldings] = useState<any[]>([]);
  const [orderHistory, setOrderHistory] = useState<any[]>([]);

  const fetchPortfolioData = async () => {
    setLoading(true);
    try {
      const [summaryRes, historyRes] = await Promise.all([
        api.get("/portfolio/summary"),
        api.get("/portfolio/history?limit=8"),
      ]);

      if (summaryRes.data?.success) {
        setSpotHoldings(summaryRes.data.data?.holdings || []);
      }

      if (historyRes.data?.success) {
        setOrderHistory(historyRes.data.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch portfolio data:", error);
      toast.error("Could not load portfolio details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
    fetchPortfolioData();
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    onClose();
  };

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#081018]/80 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-[620px] bg-[var(--surface-1)] border border-[var(--line-soft)] rounded-2xl shadow-[0_32px_128px_rgba(0,0,0,0.45)] overflow-hidden animate-in zoom-in-95 fade-in duration-300 ease-out">
        {/* Header Section */}
        <div className="relative h-36 bg-gradient-to-br from-[#ff7a14] to-[#ff4b14] p-6 flex items-end">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all active:scale-95"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          
          <div className="flex items-center gap-4 translate-y-10">
            <div className="w-24 h-24 rounded-2xl bg-[var(--surface-1)] border-4 border-[var(--surface-1)] shadow-2xl flex items-center justify-center text-[#ff7a14] text-4xl font-black italic">
              {user.email[0].toUpperCase()}
            </div>
            <div className="mb-2">
              <h2 className="text-2xl font-bold text-white tracking-tight">{user.email.split('@')[0]}</h2>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="px-2 py-0.5 rounded bg-white/15 text-[10px] font-bold text-white uppercase tracking-wider border border-white/10">UID: 8273941</span>
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/20 text-[10px] font-bold text-emerald-400 uppercase tracking-wider border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Verified
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-14 px-6 grid grid-cols-3 gap-3">
          <div className="text-center p-3.5 rounded-xl bg-[var(--surface-2)] border border-[var(--line-soft)]">
            <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest">Spot Holdings</p>
            <p className="text-lg font-black text-[var(--text-strong)] mt-1">{spotHoldings.length}</p>
          </div>
          <div className="text-center p-3.5 rounded-xl bg-[var(--surface-2)] border border-[var(--line-soft)]">
            <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest">Order History</p>
            <p className="text-lg font-black text-[var(--text-strong)] mt-1">{orderHistory.length}</p>
          </div>
          <div className="text-center p-3.5 rounded-xl bg-[var(--surface-2)] border border-[var(--line-soft)]">
            <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest">Account</p>
            <p className="text-lg font-black text-[#ff7a14] mt-1">Active</p>
          </div>
        </div>

        {/* Actions Menu */}
        <div className="p-6 space-y-6">
          <div className="space-y-2.5">
            <h3 className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-[0.2em] pl-1">Account Management</h3>
            <div className="grid gap-2">
              {[
                { name: "Personal Information", icon: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8" },
                { name: "Security Settings", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
                { name: "Order History", icon: "M9 12h6 M9 16h6 M9 8h6 M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2" },
                { name: "Referral Rewards", icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75" },
              ].map((item) => (
                <button 
                  key={item.name}
                  className="flex items-center justify-between p-4 rounded-xl bg-[var(--surface-2)] border border-transparent hover:border-[rgba(255,122,20,0.3)] hover:bg-[var(--surface-3)] transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-[var(--surface-1)] text-[var(--text-muted)] group-hover:text-[#ff7a14] transition-colors">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d={item.icon} />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-[var(--text-strong)]">{item.name}</span>
                  </div>
                  <svg className="w-4 h-4 text-[var(--text-muted)] group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-[var(--line-soft)] bg-[var(--surface-2)] p-4">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  Spot Holdings Wallet
                </h4>
                <button
                  onClick={fetchPortfolioData}
                  className="text-[10px] font-semibold text-[var(--accent)] hover:underline"
                >
                  Refresh
                </button>
              </div>
              {loading ? (
                <p className="text-xs text-[var(--text-muted)]">Loading holdings...</p>
              ) : spotHoldings.length > 0 ? (
                <div className="space-y-2">
                  {spotHoldings.slice(0, 4).map((holding) => (
                    <div
                      key={holding.symbol}
                      className="flex items-center justify-between rounded-lg border border-[var(--line-soft)] bg-[var(--surface-1)] px-3 py-2"
                    >
                      <div>
                        <p className="text-xs font-bold text-[var(--text-strong)]">{holding.symbol}</p>
                        <p className="text-[10px] text-[var(--text-muted)]">
                          Qty: {holding.quantity?.toFixed?.(4) ?? holding.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-semibold text-[var(--text-soft)]">
                          ${Number(holding.valueUsd || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </p>
                        <p className={`text-[10px] font-semibold ${Number(holding.unrealizedPnlUsd || 0) >= 0 ? "text-[#00c076]" : "text-[#ff4d4d]"}`}>
                          {Number(holding.unrealizedPnlUsd || 0) >= 0 ? "+" : ""}
                          {Number(holding.unrealizedPnlUsd || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[var(--text-muted)]">No spot holdings found.</p>
              )}
            </div>

            <div className="rounded-xl border border-[var(--line-soft)] bg-[var(--surface-2)] p-4">
              <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Recent Order History
              </h4>
              {loading ? (
                <p className="text-xs text-[var(--text-muted)]">Loading orders...</p>
              ) : orderHistory.length > 0 ? (
                <div className="space-y-2">
                  {orderHistory.slice(0, 4).map((order) => (
                    <div
                      key={order._id}
                      className="flex items-center justify-between rounded-lg border border-[var(--line-soft)] bg-[var(--surface-1)] px-3 py-2"
                    >
                      <div>
                        <p className="text-xs font-bold text-[var(--text-strong)]">
                          {order.symbol} <span className={`${order.side === "buy" ? "text-[#00c076]" : "text-[#ff4d4d]"}`}>{String(order.side || "").toUpperCase()}</span>
                        </p>
                        <p className="text-[10px] text-[var(--text-muted)]">
                          {new Date(order.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-semibold text-[var(--text-soft)]">
                          {Number(order.quantity || 0).toFixed(4)}
                        </p>
                        <p className="text-[10px] text-[var(--text-muted)]">
                          {String(order.status || "pending").toUpperCase()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[var(--text-muted)]">No order history available.</p>
              )}
            </div>
          </div>

          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 p-4 rounded-xl bg-[#ff4b14]/10 border border-[#ff4b14]/20 text-[#ff4b14] font-bold hover:bg-[#ff4b14] hover:text-white transition-all shadow-xl shadow-[#ff4b14]/5 active:scale-[0.98]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            LOG OUT SESSION
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
