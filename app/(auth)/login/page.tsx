"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
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
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-[12px] mt-5 text-[var(--text-muted)]">
          <span>Account recovery and 2FA support will be available in upcoming releases.</span>
        </div>

        <div className="text-[12px] text-[var(--text-muted)] mt-5">
          Don't have an account? <Link href="/signup" className="text-[var(--accent)] font-semibold hover:underline ml-1">Sign Up</Link>
        </div>


        {/* Debug App Link */}
        <div className="flex items-center gap-5 mt-10">
          <span className="text-[10px] text-[var(--text-muted)] font-medium uppercase tracking-widest opacity-40">Android Debug Build</span>
          <a
            href="https://drive.google.com/file/d/1oJUPjFT9a_UE1P0fDqS84VQz1C28c68U/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-[var(--line-soft)] bg-[var(--surface-1)] px-3 py-2 text-[12px] font-medium text-[var(--text-primary)] transition hover:bg-[var(--surface-2)]"
          >
            Download Debug APK
          </a>
        </div>
      </div>

      {/* App Build Status Section */}
      <div className="hidden md:flex flex-col items-center">
        <h2 className="text-[17px] font-medium text-[var(--text-strong)] mb-6 self-start">
          App is Currently in Development
        </h2>
        
        <div className="w-full max-w-[420px] rounded-[6px] border border-[var(--line-soft)] bg-[var(--surface-2)] p-8 shadow-xl">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--accent-soft)]">
            Build Status
          </p>
          <ul className="mt-4 space-y-2 text-[13px] leading-6 text-[var(--text-muted)]">
            <li>- Current release is an internal debug APK</li>
            <li>- Some features are actively under development</li>
            <li>- 2FA and account recovery are not live yet</li>
          </ul>
          <a
            href="https://drive.google.com/file/d/1oJUPjFT9a_UE1P0fDqS84VQz1C28c68U/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex rounded-md border border-[var(--line-soft)] bg-[var(--surface-1)] px-4 py-2.5 text-[13px] font-medium text-[var(--text-primary)] transition hover:bg-[var(--surface-3)]"
          >
            Download Debug APK
          </a>
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
            Use the latest debug APK to test login and core trading flows while the production app is being finalized.
          </p>
        </div>
      </div>
    </div>
  );
}
