"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Sparkles, LayoutDashboard, UploadCloud, LogOut, Menu, X, ShieldCheck, Home } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : { user: null }))
      .then((d) => setUser(d.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [pathname]);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/");
    router.refresh();
  }

  const linkCls = (active: boolean) =>
    `flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
      active ? "bg-violet-600 text-white" : "text-slate-200 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B1B3F]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-900/40">
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="text-lg font-extrabold tracking-tight text-white">
            CareerMatch <span className="text-violet-400">AI</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Link href="/" className={linkCls(pathname === "/")}>
            <Home className="h-4 w-4" /> Home
          </Link>
          {user && (
            <>
              <Link href="/dashboard" className={linkCls(pathname === "/dashboard")}>
                <LayoutDashboard className="h-4 w-4" /> Dashboard
              </Link>
              <Link href="/upload" className={linkCls(pathname === "/upload")}>
                <UploadCloud className="h-4 w-4" /> Analyze
              </Link>
              {user.role === "admin" && (
                <Link href="/admin" className={linkCls(pathname === "/admin")}>
                  <ShieldCheck className="h-4 w-4" /> Admin
                </Link>
              )}
            </>
          )}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {loading ? (
            <span className="text-sm text-slate-400">Loading…</span>
          ) : user ? (
            <>
              <span className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-slate-100">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                {user.name.split(" ")[0]}
                {user.role === "admin" && (
                  <span className="rounded bg-amber-400/20 px-1.5 py-0.5 text-[10px] font-bold text-amber-300">ADMIN</span>
                )}
              </span>
              <button
                onClick={logout}
                className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-500/80"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:text-white">
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-violet-900/40 transition hover:bg-violet-500"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        <button className="text-white md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#0B1B3F] px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            <Link href="/" onClick={() => setOpen(false)} className={linkCls(pathname === "/")}>
              <Home className="h-4 w-4" /> Home
            </Link>
            {user ? (
              <>
                <Link href="/dashboard" onClick={() => setOpen(false)} className={linkCls(pathname === "/dashboard")}>
                  <LayoutDashboard className="h-4 w-4" /> Dashboard
                </Link>
                <Link href="/upload" onClick={() => setOpen(false)} className={linkCls(pathname === "/upload")}>
                  <UploadCloud className="h-4 w-4" /> Analyze Resume
                </Link>
                {user.role === "admin" && (
                  <Link href="/admin" onClick={() => setOpen(false)} className={linkCls(pathname === "/admin")}>
                    <ShieldCheck className="h-4 w-4" /> Admin Dashboard
                  </Link>
                )}
                <button onClick={logout} className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-left text-sm font-medium text-red-300 hover:bg-white/10">
                  <LogOut className="h-4 w-4" /> Logout ({user.name.split(" ")[0]})
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className={linkCls(pathname === "/login")}>
                  Login
                </Link>
                <Link href="/register" onClick={() => setOpen(false)} className={linkCls(pathname === "/register")}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
