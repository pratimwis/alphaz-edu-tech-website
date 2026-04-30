"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { RootState } from "@/lib/redux/store";
import { logout } from "@/lib/redux/slices/authSlice";
import { useTheme } from "@/lib/theme";
import { socketService } from "@/lib/socket";
import WalletDropdown from "./WalletDropdown";
import ProfileModal from "./ProfileModal";

function SunIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" /><path d="M12 2.5V4.5" /><path d="M12 19.5V21.5" /><path d="M4.5 12H2.5" /><path d="M21.5 12H19.5" /><path d="M18.4 5.6L17 7" /><path d="M7 17L5.6 18.4" /><path d="M18.4 18.4L17 17" /><path d="M7 7L5.6 5.6" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.4A8.5 8.5 0 1 1 11.6 3a7 7 0 0 0 9.4 9.4z" />
    </svg>
  );
}

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { theme, setTheme, isDark } = useTheme();
  const user = useSelector((state: RootState) => state.auth.user);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [showWallet, setShowWallet] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    if (accessToken) {
      socketService.reconnectWithToken(accessToken);
    } else {
      socketService.disconnect();
    }
  }, [accessToken]);

  const handleLogout = () => {
    dispatch(logout());
    socketService.disconnect();
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line-subtle)] bg-[var(--header-bg)] shadow-[0_1px_0_var(--line-subtle)] backdrop-blur-md">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-sm bg-gradient-to-br from-amber-400 to-orange-500 text-xs font-black text-[#081018]">
              A
            </span>
            <div>
              <p className="text-xs font-bold tracking-wide text-[var(--text-strong)] uppercase">
                AlphaZ Arena
              </p>
              <p className="text-[10px] text-[var(--text-muted)] leading-tight">
                Virtual Trading
              </p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-2">
            {[
              { name: "Markets", href: "/futures" },
              { name: "Futures", href: "/futures" },
              { name: "Options", href: "/options" },
              { name: "Virtual Arena", href: "/futures" },
              { name: "Algo Hub", href: "#" },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium opacity-100 transition hover:bg-[var(--surface-2)] ${
                  isDark
                    ? "text-[var(--text-soft)] hover:text-[var(--text-strong)]"
                    : "!text-[#111827] hover:!text-[#0b1424]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--line-soft)] bg-[var(--surface-1)] text-[var(--text-soft)] transition hover:bg-[var(--surface-2)] hover:text-[var(--text-strong)]"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              {/* Wallet Balance */}
              <div className="relative">
                <div
                  onClick={() => setShowWallet(!showWallet)}
                  className={`hidden sm:flex items-center gap-2.5 px-3 h-9 rounded-md bg-[var(--surface-2)] border transition-all cursor-pointer select-none ${showWallet ? 'border-[var(--accent)] ring-1 ring-[var(--accent)]' : 'border-[var(--line-soft)] hover:bg-[var(--surface-3)]'}`}
                >
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-[var(--text-muted)] font-semibold uppercase leading-none">Virtual Balance</span>
                    <span className="text-xs font-bold text-[#3ed87b]">$10,000.00</span>
                  </div>
                  <svg className={`w-3 h-3 text-[var(--text-muted)] transition-transform duration-200 ${showWallet ? 'rotate-180 text-[var(--accent)]' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {showWallet && (
                  <>
                    <div
                      className="fixed inset-0 z-[90]"
                      onClick={() => setShowWallet(false)}
                    />
                    <WalletDropdown onClose={() => setShowWallet(false)} />
                  </>
                )}
              </div>

              {/* Notifications */}
              <button className="relative h-9 w-9 flex items-center justify-center rounded-md border border-transparent text-[var(--text-soft)] hover:border-[var(--line-soft)] hover:bg-[var(--surface-2)] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <span className="absolute top-2 right-2 w-2 h-2 bg-[var(--accent)] rounded-full border-2 border-[var(--header-bg)]"></span>
              </button>

              {/* Settings */}
              <button className="h-9 w-9 flex items-center justify-center rounded-md border border-transparent text-[var(--text-soft)] hover:border-[var(--line-soft)] hover:bg-[var(--surface-2)] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </button>

              <div className="w-[1px] h-6 bg-[var(--line-soft)] mx-1" />

              {/* Profile Dropdown Trigger */}
              <div
                onClick={() => setShowProfile(true)}
                className="flex items-center gap-2 pl-2 group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-[var(--surface-3)] border border-[var(--accent)] flex items-center justify-center text-[var(--accent)] font-bold text-xs shadow-inner group-hover:scale-105 transition-transform">
                  {user.email[0].toUpperCase()}
                </div>
                <div className="hidden xl:flex flex-col">
                  <span className="text-xs font-bold text-[var(--text-strong)] leading-none group-hover:text-[var(--accent)] transition-colors">{user.email.split('@')[0]}</span>
                  <span className="text-[10px] text-[var(--text-muted)] mt-0.5">Verified Account</span>
                </div>
              </div>

              {showProfile && (
                <ProfileModal user={user} onClose={() => setShowProfile(false)} />
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className={`h-9 px-4 flex items-center justify-center rounded-md border border-[var(--line-soft)] bg-[var(--surface-1)] text-sm font-semibold opacity-100 hover:bg-[var(--surface-2)] transition-all ${
                  isDark
                    ? "text-[var(--text-soft)] hover:text-[var(--text-strong)]"
                    : "!text-[#111827]"
                }`}
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="h-9 px-5 flex items-center justify-center rounded-md bg-[var(--accent)] text-sm font-bold text-white hover:bg-[var(--accent-hover)] transition-all shadow-lg shadow-[var(--accent)]/20"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
