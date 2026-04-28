"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";

const navLinks = [
  "Markets",
  "Futures",
  "Options",
  "Virtual Arena",
  "Algo Hub",
  "More",
];

const tradeBenefits = [
  "Master Crypto without real-money risk",
  "100% Risk-Free Simulation",
  "$10,000 Virtual Funds on Sign-up",
];

const platformFeatures = [
  {
    title: "Start smaller",
    description:
      "Small lot sizes on BTC and ETH contracts make it easy to begin with controlled risk.",
  },
  {
    title: "Trade 24/7/365",
    description:
      "Virtual markets stay open around the clock, matching the real crypto market rhythm.",
  },
  {
    title: "Enjoy daily expiries",
    description:
      "Daily and weekly expiries create more tactical opportunities for short-term setups.",
  },
  {
    title: "Do more with less",
    description:
      "Smart margin simulation lets you test advanced positions with efficient virtual capital.",
  },
];

const proFeatures = [
  {
    title: "Basket Orders with Margin Benefits",
    description:
      "Bundle multiple virtual positions together and test margin offset behavior in one click.",
  },
  {
    title: "Strategy Builder",
    description:
      "Build and compare multi-leg futures and options strategies before going live.",
  },
  {
    title: "Deep OTM/ITM Strikes",
    description:
      "Practice with deep strike selections and short-duration setups to master execution.",
  },
  {
    title: "PnL Analytics",
    description:
      "Track returns, win rate, drawdown, and behavior insights in one clean dashboard.",
  },
];

const faqItems = [
  {
    question: "Is this virtual trading platform beginner friendly?",
    answer:
      "Yes. It is designed for learners and active traders to practice execution, risk, and strategy without real-money pressure.",
  },
  { question: "Do I need to deposit money to start virtual trading?" },
  { question: "Can I switch from virtual mode to live mode later?" },
];

const footerColumns = [
  {
    title: "Company",
    links: ["About Us", "Terms of Service", "Privacy Policy", "Careers"],
  },
  {
    title: "Information",
    links: ["Contract Specs", "Trading Fees", "Settlement Prices", "Bug Bounty"],
  },
  {
    title: "Resources",
    links: ["API Docs", "Raise a Ticket", "Support Center", "Demo Trading"],
  },
  {
    title: "Socials",
    links: ["X", "Instagram", "YouTube", "LinkedIn"],
  },
];

const mobileScreens = [
  {
    src: "/app-screens/mobile-screen-1.png",
    alt: "AlphaZ mobile app trading chart screen",
  },
  {
    src: "/app-screens/mobile-screen-2.png",
    alt: "AlphaZ mobile app market overview screen",
  },
];

import { useTheme } from "@/lib/theme";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-[var(--page-bg)] text-[var(--text-primary)] transition-colors duration-300"
    >
      <main className="mx-auto max-w-6xl px-4 pb-18 pt-10 sm:px-6 lg:px-8">
        <section className="grid gap-10 py-4 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line-accent)] bg-[var(--chip-bg)] px-4 py-2 text-xs font-semibold tracking-wide text-[var(--accent-soft)]">
              <span className="inline-block h-2 w-2 rounded-full bg-[#3ed87b]" />
              Made for India
            </span>
            <h1 className="max-w-xl text-4xl font-bold leading-tight text-[var(--text-strong)] sm:text-5xl">
              Trade Futures and Options on Bitcoin and Ether
            </h1>
            <p className="max-w-xl text-lg leading-7 text-[var(--text-muted)]">
              Build confidence with a realistic virtual market setup, live-like order
              flow, and 24/7 practice on crypto F&O instruments.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link 
                href="/signup"
                className="rounded-lg bg-[var(--accent)] px-8 py-3 text-base font-semibold text-white transition hover:bg-[var(--accent-hover)]"
              >
                Start Virtual Trading
              </Link>
              <button className="rounded-lg border border-[var(--line-soft)] bg-[var(--surface-1)] px-8 py-3 text-base font-medium text-[var(--text-soft)] transition hover:bg-[var(--surface-2)]">
                View Demo
              </button>
            </div>
            <div className="pt-2 text-sm text-[var(--text-soft)]">
              Trade on the go:
              <div className="mt-2 flex gap-2">
                <span className="inline-flex rounded-md border border-[var(--line-soft)] bg-[var(--surface-1)] px-3 py-1.5">
                  Play Store
                </span>
                <span className="inline-flex rounded-md border border-[var(--line-soft)] bg-[var(--surface-1)] px-3 py-1.5">
                  App Store
                </span>
                <span className="inline-flex rounded-md border border-[var(--line-soft)] bg-[var(--surface-1)] px-3 py-1.5">
                  Web App
                </span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div
              className="relative overflow-hidden rounded-2xl border border-[var(--line-accent)] p-8 shadow-[0_20px_80px_rgba(255,120,20,0.24)]"
              style={{ backgroundImage: "var(--hero-grad)" }}
            >
              <span className="absolute -left-8 -top-8 h-28 w-28 rounded-full border border-[#ffd6ad]/30" />
              <span className="absolute -right-6 top-8 h-12 w-12 rounded-full bg-[#d8ebff] text-center text-[11px] font-semibold leading-[48px] text-[#5f6f83]">
                ETH
              </span>
              <span className="absolute left-6 top-14 h-10 w-10 rounded-full bg-[#ffd28a] text-center text-[11px] font-semibold leading-[40px] text-[#8e5616]">
                BTC
              </span>
              <div className="relative space-y-4">
                <h2 className="text-7xl font-black leading-none text-[#2d1a09] sm:text-8xl">
                  0
                  <span className="ml-2 text-5xl align-middle text-[#311400] sm:text-6xl">
                    fee
                  </span>
                </h2>
                <div className="grid gap-2 text-[#291304] sm:grid-cols-3">
                  <div className="rounded-lg bg-[#ffc785] px-3 py-2 text-center">
                    <p className="text-xs font-bold tracking-wide">OPTIONS</p>
                    <p className="text-sm font-black">0 Fee</p>
                  </div>
                  <div className="rounded-lg bg-[#ffc785] px-3 py-2 text-center">
                    <p className="text-xs font-bold tracking-wide">FUTURES</p>
                    <p className="text-sm font-black">0 Exit Fee</p>
                  </div>
                  <div className="rounded-lg bg-[#ffc785] px-3 py-2 text-center">
                    <p className="text-xs font-bold tracking-wide">SPOT</p>
                    <p className="text-sm font-black">0 Entry Fee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 flex items-center gap-3 rounded-lg border border-[var(--line-soft)] bg-[var(--surface-1)] px-4 py-3 text-sm text-[var(--text-soft)]">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[color:rgba(255,122,20,0.22)] text-[var(--accent)]">
            {"\u2713"}
          </span>
          Pro-grade simulation platform with realistic orderbook behavior and
          controlled risk learning.
        </section>

        <section className="mt-8 grid gap-4 rounded-xl border border-[var(--line-accent)] bg-[var(--benefits-bg)] p-4 text-center text-sm font-semibold text-[var(--accent-soft)] sm:grid-cols-3">
          {tradeBenefits.map((item) => (
            <div key={item} className="rounded-md bg-[var(--benefit-item-bg)] px-3 py-2">
              {item}
            </div>
          ))}
        </section>

        <section className="mt-14">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[var(--accent-soft)]">
                Designed to Delight Traders
              </p>
              <h2 className="mt-2 text-3xl font-bold text-[var(--text-strong)]">
                Like F&O Trading, But Better
              </h2>
              <p className="mt-3 max-w-2xl text-[var(--text-muted)]">
                Familiar futures and options workflows with a cleaner interface and
                more transparent trade simulation metrics.
              </p>
            </div>
            <span className="rounded-full border border-[var(--line-soft)] bg-[var(--surface-1)] px-4 py-2 text-xs font-semibold tracking-wide text-[var(--text-soft)]">
              Crypto F&O vs Equity F&O
            </span>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {platformFeatures.map((feature) => (
              <article
                key={feature.title}
                className="rounded-xl border border-[var(--line-soft)] bg-[var(--surface-1)] p-5"
              >
                <p className="flex items-center gap-2 text-lg font-semibold text-[var(--text-strong)]">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#35d786]" />
                  {feature.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-0 overflow-hidden rounded-xl border border-[var(--line-soft)] bg-[var(--surface-1)] md:grid-cols-[0.85fr_1.15fr]">
          <div className="bg-[var(--surface-2)] p-7 sm:p-8">
            <p className="text-sm font-semibold text-[var(--accent-soft)]">Easy Sign Up</p>
            <h3 className="mt-2 text-3xl font-bold text-[var(--text-strong)]">
              Start Practice in Minutes
            </h3>
            <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
              Master complex futures and options strategies without risking a single
              dollar. Get instant access to $10,000 in virtual funds.
            </p>
            <Link 
              href="/signup"
              className="mt-7 inline-flex w-full items-center justify-center rounded-lg bg-[var(--accent)] px-4 py-3 text-base font-semibold text-white transition hover:bg-[var(--accent-hover)]"
            >
              Sign Up
            </Link>
          </div>

          <div className="grid gap-4 bg-[var(--surface-3)] p-7 sm:grid-cols-3 sm:p-8">
            {[
              "Complete KYC verification in less than a minute",
              "Link account and top-up your virtual balance instantly",
              "Launch into practice mode with real market movement",
            ].map((step, index) => (
              <div
                key={step}
                className="rounded-lg border border-[var(--line-soft)] bg-[var(--surface-4)] p-4"
              >
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[color:rgba(255,122,20,0.22)] font-bold text-[var(--accent)]">
                  {index + 1}
                </div>
                <p className="text-sm leading-6 text-[var(--text-muted)]">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--accent-soft)]">
            Best in Class
          </p>
          <h2 className="mt-2 text-3xl font-bold text-[var(--text-strong)]">
            Pro Trading Features For Everyone
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {proFeatures.map((feature) => (
              <article
                key={feature.title}
                className="rounded-xl border border-[var(--line-soft)] bg-[var(--surface-1)] p-5"
              >
                <p className="text-base font-semibold text-[var(--text-strong)]">
                  {feature.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-4 lg:grid-cols-[0.72fr_1.28fr]">
          <div
            className="rounded-xl border border-[var(--line-accent)] p-7 transition-all duration-300"
            style={{ backgroundImage: "var(--support-grad)" }}
          >
            <h3 className="text-3xl font-bold text-[var(--support-text-title)]">24x7 Customer Support</h3>
            <p className="mt-4 text-sm leading-6 text-[var(--support-text-desc)]">
              Have a question? Our support center, live chat, and ticket desk are
              available all day for strategy and platform help.
            </p>
            <button className="mt-8 rounded-lg border border-[var(--support-text-desc)]/20 bg-[var(--support-btn-bg)] px-5 py-2.5 text-sm font-semibold text-[var(--support-btn-text)] transition hover:bg-[var(--support-btn-hover)]">
              Raise a Support Ticket
            </button>
          </div>

          <div className="rounded-xl border border-[var(--line-soft)] bg-[var(--surface-1)] p-7">
            <h3 className="text-3xl font-bold text-[var(--text-strong)]">
              Frequently Asked Questions
            </h3>
            <div className="mt-6 space-y-3">
              {faqItems.map((item, index) => (
                <article
                  key={item.question}
                  className="rounded-lg border border-[var(--line-soft)] bg-[var(--surface-3)] p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm font-semibold text-[var(--text-strong)]">
                      {item.question}
                    </p>
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-black text-white">
                      {index === 0 ? "-" : "+"}
                    </span>
                  </div>
                  {item.answer ? (
                    <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
                      {item.answer}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-14 grid items-center gap-8 rounded-2xl border border-[var(--line-soft)] bg-[var(--surface-1)] p-7 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[var(--accent-soft)]">
              Anytime, Anywhere
            </p>
            <h2 className="mt-2 text-3xl font-bold text-[var(--text-strong)]">
              Download App, Trade On The Go
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--text-muted)]">
              Track charts, place virtual orders, and evaluate outcomes from mobile
              with one synced account.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-sm">
              <span className="rounded-md border border-[var(--line-soft)] bg-[var(--surface-3)] px-4 py-2">
                Google Play
              </span>
              <span className="rounded-md border border-[var(--line-soft)] bg-[var(--surface-3)] px-4 py-2">
                App Store
              </span>
            </div>
            <div className="mt-6 inline-flex rounded-xl border border-[var(--line-soft)] p-3">
              <div
                className="rounded-md p-1.5"
                style={{ backgroundColor: "var(--qr-shell)" }}
              >
                <div className="grid grid-cols-7 gap-1.5">
                  {Array.from({ length: 49 }).map((_, index) => (
                    <span
                      key={index}
                      className={`h-2.5 w-2.5 rounded-[2px] ${
                        index % 2 === 0 || index % 5 === 0
                          ? "bg-[var(--qr-dark)]"
                          : "bg-[var(--qr-light)]"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="mx-auto grid w-full max-w-[620px] grid-cols-1 gap-4 sm:grid-cols-2">
              {mobileScreens.map((screen, index) => (
                <figure
                  key={screen.src}
                  className={`overflow-hidden rounded-[18px] border border-[var(--line-soft)] bg-[#080d18] shadow-[0_20px_40px_rgba(2,6,15,0.45)] ${
                    index === 1 ? "sm:mt-8" : ""
                  }`}
                >
                  <Image
                    src={screen.src}
                    alt={screen.alt}
                    width={738}
                    height={1600}
                    priority={index === 0}
                    className="h-auto w-full object-contain"
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--line-subtle)] bg-[var(--footer-bg)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-5 lg:px-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-sm bg-gradient-to-br from-amber-400 to-orange-500 text-xs font-black text-[#081018]">
                A
              </span>
              <p className="text-sm font-semibold text-[var(--text-strong)]">
                AlphaZ Exchange
              </p>
            </div>
            <p className="mt-4 text-sm leading-6 text-[var(--text-muted)]">
              India-first virtual crypto derivatives simulator for disciplined,
              data-driven traders.
            </p>
          </div>
          {footerColumns.map((column) => (
            <div key={column.title}>
              <p className="text-sm font-semibold text-[var(--text-strong)]">
                {column.title}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-[var(--text-muted)]">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="transition hover:text-[var(--text-soft)]">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-[var(--line-subtle)] py-5 text-center text-xs text-[var(--text-muted)]">
          AlphaZ Exchange India (c) 2026. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
