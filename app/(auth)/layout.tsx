"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/lib/theme";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex flex-col bg-[var(--page-bg)] text-[var(--text-primary)] font-sans overflow-hidden transition-colors duration-300">
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
