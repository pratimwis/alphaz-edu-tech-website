"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useTheme } from "@/lib/theme";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { setCredentials } from "@/lib/redux/slices/authSlice";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", formData);
      if (data.success) {
        toast.success("Logged in successfully!");
        
        dispatch(setCredentials({
          user: data.data.user,
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
        }));

        router.push("/futures");
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center gap-32 lg:gap-52 px-8 pt-15 pb-10 transition-colors duration-300">
      {/* Login Form Section */}
      <div className="w-full max-w-[440px] flex flex-col">
        <h1 className="text-[26px] font-semibold text-[var(--text-strong)] mb-8">Log In to Virtual Arena</h1>
        
        {/* Social Logins */}
        <div className="flex gap-3 mb-5">
          <button className="flex-1 flex items-center justify-center gap-2.5 bg-[#2d9cfc] hover:bg-[#2d9cfc]/90 text-white font-semibold h-[42px] rounded-[4px] text-[13px] transition-all">
            <div className="bg-white p-1 rounded-full">
              <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-[#2d9cfc]">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </div>
            Google
          </button>
          <button className="flex-1 flex items-center justify-center gap-2.5 bg-white hover:bg-gray-100 text-black font-semibold h-[42px] rounded-[4px] text-[13px] transition-all border border-gray-200 shadow-sm">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C4.3 17.06 4.89 11.23 7.74 11.08c1.13.06 1.9.7 2.62.7 1.05 0 1.5-.73 2.94-.73 1.38 0 2.22.56 3.1 1.67-2.8 1.48-2.3 5.42.55 6.56-.58 1.25-1.28 2.37-2.9 3.03l.01-.01c-.3.12-.58.21-.85.29-.2.06-.39.11-.58.15zM12.03 10.25c.02-2.14 1.74-3.9 3.86-3.9 2.12.02 3.73 2.05 3.5 4.14-2.12.18-3.9-1.54-4.14-3.66l.78-.58z" />
            </svg>
            Apple
          </button>
        </div>

        <div className="relative flex items-center mb-6">
          <div className="flex-grow border-t border-[var(--line-subtle)]"></div>
          <span className="flex-shrink mx-3 text-[var(--text-muted)] opacity-50 text-[11px]">Or</span>
          <div className="flex-grow border-t border-[var(--line-subtle)]"></div>
        </div>

        {/* Form Fields */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-wider">Email</label>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-[var(--surface-1)] border border-[var(--line-soft)] rounded-[4px] h-[44px] px-3.5 text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-all"
              placeholder="name@example.com"
              required
            />
          </div>
          <div className="space-y-1.5 relative">
            <label className="text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-wider">Password</label>
            <input 
              type={showPassword ? "text" : "password"} 
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-[var(--surface-1)] border border-[var(--line-soft)] rounded-[4px] h-[44px] px-3.5 text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-all"
              placeholder="••••••••"
              required
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 bottom-[11px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                {showPassword ? (
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                ) : (
                  <>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </>
                )}
              </svg>
            </button>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold h-[46px] rounded-[4px] transition-all shadow-md shadow-[var(--accent)]/10 text-[14px] mt-2 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* Links */}
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-[12px] mt-5">
          <Link href="/forgot-email" className="text-[var(--accent)] hover:underline">Forgot Email ID?</Link>
          <Link href="/forgot-password" className="text-[var(--accent)] hover:underline">Forgot Password?</Link>
          <Link href="/lost-2fa" className="text-[var(--accent)] hover:underline">Lost 2FA Token?</Link>
        </div>

        <div className="text-[12px] text-[var(--text-muted)] mt-5">
          Don't have an account? <Link href="/signup" className="text-[var(--accent)] font-semibold hover:underline ml-1">Sign Up</Link>
        </div>


        {/* App Store Links */}
        <div className="flex items-center gap-5 mt-10">
          <span className="text-[10px] text-[var(--text-muted)] font-medium uppercase tracking-widest opacity-40">Download App</span>
          <div className="flex gap-4">
            <button className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.1 2.48-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .76-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.36 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
            </button>
            <button className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.25 2.5a.75.75 0 0 0-.75.75v17.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.25a.75.75 0 0 0-.75-.75h-1.5zm10.75 0a.75.75 0 0 0-.75.75v17.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.25a.75.75 0 0 0-.75-.75h-1.5z" />
                <path d="M19.75 2.5a.75.75 0 0 0-.75.75v17.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.25a.75.75 0 0 0-.75-.75h-1.5zM6.75 10.5c0-.414.336-.75.75-.75h4.5a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1-.75-.75v-3z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* QR Code Section */}
      <div className="hidden md:flex flex-col items-center">
        <h2 className="text-[17px] font-medium text-[var(--text-strong)] mb-6 self-start">Quick Log In - Scan using App</h2>
        
        <div className="relative bg-[var(--surface-2)] p-10 rounded-[6px] border border-[var(--line-soft)] shadow-xl group">
          <div className="relative flex items-center gap-12">
            {/* QR Frame */}
            <div className="relative p-1 bg-[var(--qr-shell)] rounded-[2px] transform group-hover:scale-[1.01] transition-transform duration-500">
              {/* Corner Accents */}
              <div className="absolute -top-2.5 -left-2.5 w-8 h-8 border-t-2 border-l-2 border-[var(--accent)]"></div>
              <div className="absolute -top-2.5 -right-2.5 w-8 h-8 border-t-2 border-r-2 border-[var(--accent)]"></div>
              <div className="absolute -bottom-2.5 -left-2.5 w-8 h-8 border-b-2 border-l-2 border-[var(--accent)]"></div>
              <div className="absolute -bottom-2.5 -right-2.5 w-8 h-8 border-b-2 border-r-2 border-[var(--accent)]"></div>
              
              <div className="grid grid-cols-7 gap-1 p-1">
                {Array.from({ length: 49 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-4 h-4 rounded-[1px] ${
                      (i < 7 && (i % 7 === 0 || i % 7 === 6)) || 
                      (i > 41 && (i % 7 === 0 || i % 7 === 6)) || 
                      (i % 7 === 0 && (i < 7 || i > 41)) || 
                      (i % 7 === 6 && (i < 7 || i > 41)) ||
                      (i % 4 === 0)
                        ? "bg-[var(--qr-dark)]" 
                        : "bg-[var(--qr-light)]"
                    }`}
                  ></div>
                ))}
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="relative w-[120px] h-[220px] bg-[var(--surface-3)] rounded-[28px] border-[4px] border-[var(--line-soft)] shadow-2xl overflow-hidden flex flex-col items-center">
              <div className="mt-2.5 w-10 h-1 bg-[var(--line-soft)] rounded-full"></div>
              
              <div className="mt-8 flex flex-col items-center justify-center">
                <div className="w-14 h-14 border border-[var(--line-soft)] rounded-lg flex items-center justify-center relative bg-[var(--surface-4)]">
                  {/* Scanner sight */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--text-muted)] opacity-20"></div>
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[var(--text-muted)] opacity-20"></div>
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[var(--text-muted)] opacity-20"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--text-muted)] opacity-20"></div>
                  
                  <div className="w-12 h-0.5 bg-[var(--accent)] shadow-[0_0_10px_var(--accent)] opacity-80 animate-scan"></div>
                </div>
                <div className="mt-6 space-y-2 w-14 opacity-20">
                  <div className="h-0.5 bg-[var(--text-primary)] rounded-full"></div>
                  <div className="h-0.5 bg-[var(--text-primary)] rounded-full w-8"></div>
                  <div className="h-0.5 bg-[var(--text-primary)] rounded-full w-10"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-3.5 text-[12px] text-[var(--text-muted)] max-w-[340px]">
          <div className="flex-none p-1.5 bg-[var(--surface-2)] rounded border border-[var(--line-soft)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <line x1="3" y1="9" x2="21" y2="9"/>
              <line x1="9" y1="21" x2="9" y2="9"/>
            </svg>
          </div>
          <p className="leading-snug">
            Scan with the <span className="text-[var(--text-primary)] border-b border-dotted border-[var(--text-muted)] cursor-help">latest</span> AlphaZ App to log in instantly.
          </p>
        </div>
      </div>
    </div>
  );
}
