"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Theme = "dark" | "light";

export const darkPalette = {
  "--page-bg": "#0b0f1b",
  "--header-bg": "rgba(11, 15, 27, 0.9)",
  "--surface-1": "#111828",
  "--surface-2": "#121d31",
  "--surface-3": "#161f33",
  "--surface-4": "#1a2236",
  "--line-soft": "rgba(147, 163, 190, 0.2)",
  "--line-subtle": "rgba(240, 245, 255, 0.08)",
  "--line-accent": "rgba(255, 122, 20, 0.36)",
  "--text-primary": "#eef3ff",
  "--text-strong": "#ffffff",
  "--text-muted": "#9aa8bf",
  "--text-soft": "#c8d1df",
  "--accent": "#ff6a00",
  "--accent-hover": "#ff7a1a",
  "--accent-soft": "#ffad67",
  "--chip-bg": "#171f33",
  "--footer-bg": "#0d1222",
  "--qr-shell": "#ffffff",
  "--qr-dark": "#000000",
  "--qr-light": "#ffffff",
  "--support-grad": "linear-gradient(160deg, #32210f 0%, #5f2f05 100%)",
  "--support-btn-bg": "#44260f",
  "--support-btn-hover": "#5e3112",
  "--support-text-title": "#fff2e2",
  "--support-text-desc": "#ffd7b4",
  "--support-btn-text": "#ffffff",
};

export const lightPalette = {
  "--page-bg": "#f4f7fd",
  "--header-bg": "rgba(244, 247, 253, 0.93)",
  "--surface-1": "#ffffff",
  "--surface-2": "#f5f8ff",
  "--surface-3": "#eef4ff",
  "--surface-4": "#ebf2ff",
  "--line-soft": "rgba(37, 53, 80, 0.16)",
  "--line-subtle": "rgba(15, 24, 39, 0.12)",
  "--line-accent": "rgba(255, 122, 20, 0.42)",
  "--text-primary": "#0f1729",
  "--text-strong": "#0b1424",
  "--text-muted": "#5f6e86",
  "--text-soft": "#33455f",
  "--accent": "#ff6a00",
  "--accent-hover": "#ff7a1a",
  "--accent-soft": "#b85f14",
  "--chip-bg": "#fff3e7",
  "--footer-bg": "#e9effa",
  "--qr-shell": "#111827",
  "--qr-dark": "#ffffff",
  "--qr-light": "#111827",
  "--support-grad": "linear-gradient(160deg, #ffd8ad 0%, #f9a246 100%)",
  "--support-btn-bg": "#fff0de",
  "--support-btn-hover": "#ffe1bf",
  "--support-text-title": "#5f2f05",
  "--support-text-desc": "#7a4a15",
  "--support-btn-text": "#5f2f05",
};

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
  palette: any;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeStorageKey = "alphaz-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(themeStorageKey) as Theme;
    if (storedTheme === "dark" || storedTheme === "light") {
      setThemeState(storedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setThemeState("dark");
    } else {
      setThemeState("light");
    }
    setMounted(true);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    window.localStorage.setItem(themeStorageKey, newTheme);
  };

  const palette = useMemo(() => (theme === "dark" ? darkPalette : lightPalette), [theme]);
  const isDark = theme === "dark";

  const value = {
    theme,
    setTheme,
    isDark,
    palette,
  };

  return (
    <ThemeContext.Provider value={value}>
      <div 
        className="min-h-screen transition-colors duration-300"
        style={{
          ...(palette as any),
          ...(!mounted ? { visibility: "hidden" } : {})
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
