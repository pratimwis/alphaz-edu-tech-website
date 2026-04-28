import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { ReduxProvider } from "@/lib/redux/ReduxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AlphaZ Exchange | Virtual Crypto Trading",
  description:
    "Practice crypto futures and options in a realistic, India-focused virtual trading environment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ReduxProvider>
          <ThemeProvider>
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#1a2236',
                  color: '#eef3ff',
                  border: '1px solid rgba(147, 163, 190, 0.2)',
                },
              }}
            />
            <Navbar />
            {children}
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
