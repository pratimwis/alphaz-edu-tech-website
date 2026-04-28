"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const MARKET_TABS = [
  { name: "Watchlist", href: "/watchlist" },
  { name: "Futures", href: "/futures" },
  { name: "Options", href: "/options" },
  { name: "RWA Tokens", href: "/rwa" },
  { name: "Straddle", href: "/straddle" },
  { name: "Spot", href: "/spot" },
  { name: "Analytics", href: "/analytics" },
];

export default function MarketLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[var(--page-bg)]">
      {/* Sub Header */}
      <div className="border-b border-[var(--line-subtle)] bg-[var(--header-bg)]">
        {/* <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8 h-14">
          <nav className="flex items-center gap-6 h-full">
            {MARKET_TABS.map((tab) => {
              const isActive = pathname === tab.href;
              return (
                <Link
                  key={tab.name}
                  href={tab.href}
                  className={`relative flex items-center h-full text-sm font-medium transition-colors ${
                    isActive ? "text-[var(--text-strong)]" : "text-[var(--text-muted)] hover:text-[var(--text-soft)]"
                  }`}
                >
                  {tab.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-6">
            <div className="text-xs">
              <span className="text-[var(--text-muted)]">24 hr Volume </span>
              <span className="text-[var(--text-strong)] font-bold">$1369.9M</span>
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded bg-[var(--surface-3)] border border-[var(--line-soft)] text-xs font-medium text-[var(--text-soft)] hover:text-[var(--text-strong)] transition-colors">
              Download
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div> */}
      </div>

      {/* Main Content */}
      <main className={`${pathname.startsWith('/trade') ? 'w-full' : 'mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8'}`}>
        {children}
      </main>
    </div>
  );
}
