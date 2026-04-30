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
  "Trade like Binance, learn with virtual money",
  "100% risk-free crypto simulation environment",
  "$10,000 virtual balance on sign-up",
];

const platformFeatures = [
  {
    title: "Live-like exchange interface",
    description:
      "Familiar orderbook, charting, and buy/sell flow inspired by top crypto platforms so learners can train in a realistic setup.",
  },
  {
    title: "24/7 virtual crypto market practice",
    description:
      "Practice anytime with market behavior that mirrors real crypto volatility and continuous market timing.",
  },
  {
    title: "Multi-asset virtual trading",
    description:
      "Explore virtual spot, futures, and options for BTC, ETH, and trending pairs without using real funds.",
  },
  {
    title: "Learn risk management safely",
    description:
      "Test leverage, stop-loss, and position sizing strategies in a zero-loss environment before going live elsewhere.",
  },
];

const proFeatures = [
  {
    title: "Advanced order simulation",
    description:
      "Practice market, limit, stop-limit, and conditional orders to improve your speed and execution confidence.",
  },
  {
    title: "Portfolio and PnL dashboard",
    description:
      "Track virtual balance, open positions, realized and unrealized PnL, and performance trends in one place.",
  },
  {
    title: "Leaderboard and challenge mode",
    description:
      "Compete with other learners in virtual trading challenges and benchmark your skills against the community.",
  },
  {
    title: "Strategy journaling and insights",
    description:
      "Review each trade, identify mistakes, and build repeatable high-probability strategies with data-backed feedback.",
  },
];

const faqItems = [
  {
    question: "Is AlphaZ a real-money crypto exchange?",
    answer:
      "No. AlphaZ is a virtual trading platform built for learning. You trade with virtual funds only, so you can practice without financial risk.",
  },
  {
    question: "Do I need to deposit real money to start?",
    answer:
      "No real-money deposit is required. After sign-up, you receive virtual balance to begin practice trading immediately.",
  },
  {
    question: "Who should use this platform?",
    answer:
      "AlphaZ is ideal for beginners, students, and active traders who want to improve strategy, risk management, and execution before entering real markets.",
  },
];

const footerColumns = [
  {
    title: "Company",
    links: ["About Us", "Terms of Service", "Privacy Policy", "Careers"],
  },
  {
    title: "Information",
    links: ["Market Rules", "Virtual Trading Terms", "Learning Roadmap", "Bug Bounty"],
  },
  {
    title: "Resources",
    links: ["API Docs", "Raise a Ticket", "Support Center", "Trading Academy"],
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
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  return (
    <div
      className="min-h-screen bg-[var(--page-bg)] text-[var(--text-primary)] transition-colors duration-300"
    >
      <main className="mx-auto max-w-6xl px-4 pb-18 pt-10 sm:px-6 lg:px-8">
        <section className="grid gap-10 py-4 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line-accent)] bg-[var(--chip-bg)] px-4 py-2 text-xs font-semibold tracking-wide text-[var(--accent-soft)]">
              <span className="inline-block h-2 w-2 rounded-full bg-[#3ed87b]" />
              India-first virtual crypto trading platform
            </span>
            <h1 className="max-w-xl text-4xl font-bold leading-tight text-[var(--text-strong)] sm:text-5xl">
              Trade Like Binance and CoinDCX, With Virtual Money
            </h1>
            <p className="max-w-xl text-lg leading-7 text-[var(--text-muted)]">
              AlphaZ gives you a real exchange-like experience for spot, futures, and
              options trading - but with virtual funds. Learn, practice, and build
              confidence before risking real capital.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link 
                href="/signup"
                className="rounded-lg bg-[var(--accent)] px-8 py-3 text-base font-semibold text-white transition hover:bg-[var(--accent-hover)]"
              >
                Start Free Practice
              </Link>
              <button className="rounded-lg border border-[var(--line-soft)] bg-[var(--surface-1)] px-8 py-3 text-base font-medium text-[var(--text-soft)] transition hover:bg-[var(--surface-2)]">
                Explore Platform Demo
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
                  100%
                  <span className="ml-2 text-5xl align-middle text-[#311400] sm:text-6xl">
                    virtual
                  </span>
                </h2>
                <div className="grid gap-2 text-[#291304] sm:grid-cols-3">
                  <div className="rounded-lg bg-[#ffc785] px-3 py-2 text-center">
                    <p className="text-xs font-bold tracking-wide">SPOT</p>
                    <p className="text-sm font-black">Virtual Orders</p>
                  </div>
                  <div className="rounded-lg bg-[#ffc785] px-3 py-2 text-center">
                    <p className="text-xs font-bold tracking-wide">FUTURES</p>
                    <p className="text-sm font-black">Practice Leverage</p>
                  </div>
                  <div className="rounded-lg bg-[#ffc785] px-3 py-2 text-center">
                    <p className="text-xs font-bold tracking-wide">OPTIONS</p>
                    <p className="text-sm font-black">Strategy Training</p>
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
          Exchange-like trading simulation with zero real-money exposure and
          structured learning for all levels.
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
                Built for Serious Practice
              </p>
              <h2 className="mt-2 text-3xl font-bold text-[var(--text-strong)]">
                Real Trading Experience, Virtual Capital
              </h2>
              <p className="mt-3 max-w-2xl text-[var(--text-muted)]">
                We replicate the look and feel of major crypto exchanges so you can
                train your decision-making, execution speed, and discipline without
                risking real money.
              </p>
            </div>
            <span className="rounded-full border border-[var(--line-soft)] bg-[var(--surface-1)] px-4 py-2 text-xs font-semibold tracking-wide text-[var(--text-soft)]">
              Virtual Money. Real Skills.
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
            <p className="text-sm font-semibold text-[var(--accent-soft)]">Quick Onboarding</p>
            <h3 className="mt-2 text-3xl font-bold text-[var(--text-strong)]">
              Start Trading Practice in Minutes
            </h3>
            <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
              Join AlphaZ and get instant virtual funds. Build your strategy with
              no financial pressure while experiencing real market-style workflows.
            </p>
            <Link 
              href="/signup"
              className="mt-7 inline-flex w-full items-center justify-center rounded-lg bg-[var(--accent)] px-4 py-3 text-base font-semibold text-white transition hover:bg-[var(--accent-hover)]"
            >
              Create Free Account
            </Link>
          </div>

          <div className="grid gap-4 bg-[var(--surface-3)] p-7 sm:grid-cols-3 sm:p-8">
            {[
              "Create your account and choose your learning track",
              "Receive your virtual capital wallet instantly",
              "Start spot, futures, and options simulation immediately",
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
            Core Platform Capabilities
          </p>
          <h2 className="mt-2 text-3xl font-bold text-[var(--text-strong)]">
            Everything You Need to Learn Crypto Trading
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
              Need help with features, strategy practice, or platform navigation?
              Our support desk is available 24x7 to guide your learning journey.
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
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(index)}
                    className="flex w-full items-start justify-between gap-4 text-left"
                  >
                    <p className="text-sm font-semibold text-[var(--text-strong)]">
                      {item.question}
                    </p>
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-black text-white">
                      {openFaqIndex === index ? "-" : "+"}
                    </span>
                  </button>
                  {item.answer && openFaqIndex === index ? (
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
              Android App In Progress
            </p>
            <h2 className="mt-2 text-3xl font-bold text-[var(--text-strong)]">
              Current Build is a Debug Version
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--text-muted)]">
              Our mobile app is currently under development. The screenshots shown
              here are from our internal debug build for testing core trading flows.
              You can download and test the latest debug APK from the link below.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-sm">
              <a
                href="https://drive.google.com/file/d/1oJUPjFT9a_UE1P0fDqS84VQz1C28c68U/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-[var(--line-soft)] bg-[var(--surface-3)] px-4 py-2 font-medium text-[var(--text-strong)] transition hover:bg-[var(--surface-2)]"
              >
                Download Debug APK
              </a>
              <span className="rounded-md border border-[var(--line-soft)] bg-[var(--surface-3)] px-4 py-2 text-[var(--text-muted)]">
                Stable release coming soon
              </span>
            </div>
            <div className="mt-6 rounded-xl border border-[var(--line-soft)] bg-[var(--surface-3)] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent-soft)]">
                Build Status
              </p>
              <ul className="mt-3 space-y-2 text-sm text-[var(--text-muted)]">
                <li>- Version: Internal debug APK</li>
                <li>- Platform: Android testing build</li>
                <li>- Access: Download from Google Drive link above</li>
              </ul>
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
              India-focused crypto trading simulator built to help beginners and
              aspiring pros gain real-world market skills using virtual money.
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
          AlphaZ Exchange India (c) 2026. Virtual trading platform. No real-money trading.
        </div>
      </footer>
    </div>
  );
}
