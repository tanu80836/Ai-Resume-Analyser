"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Loader2, Users, FileText, BarChart3, Target, Trash2, ShieldCheck, AlertTriangle, Search,
} from "lucide-react";

interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  analysisCount: number;
}

interface AdminAnalysis {
  id: number;
  userId: number;
  fileName: string;
  jobTitle: string;
  matchScore: number;
  atsScore: number;
  createdAt: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [stats, setStats] = useState({ totalUsers: 0, totalAnalyses: 0, avgMatch: 0, avgAts: 0 });
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [analyses, setAnalyses] = useState<AdminAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<number | null>(null);

  async function load() {
    const me = await fetch("/api/auth/me").then((r) => (r.ok ? r.json() : { user: null }));
    if (!me.user) { router.push("/login"); return; }
    if (me.user.role !== "admin") { setError("Admin access required. Your account is not an administrator."); setLoading(false); return; }
    const res = await fetch("/api/admin/stats");
    const d = await res.json();
    if (!res.ok) { setError(d.error || "Failed to load admin data."); setLoading(false); return; }
    setStats(d.stats);
    setUsers(d.users);
    setAnalyses(d.analyses);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleDeleteUser(id: number, name: string) {
    if (!confirm(`Delete user "${name}" and all their analyses? This cannot be undone.`)) return;
    setDeleting(id);
    const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    if (res.ok) {
      setUsers((u) => u.filter((x) => x.id !== id));
      setAnalyses((a) => a.filter((x) => x.userId !== id));
      setStats((s) => ({ ...s, totalUsers: s.totalUsers - 1 }));
    } else {
      const d = await res.json();
      alert(d.error || "Failed to delete user.");
    }
    setDeleting(null);
  }

  if (loading) {
    return (
      <main className="flex min-h-[calc(100vh-65px)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-16 text-center">
        <AlertTriangle className="mx-auto h-10 w-10 text-red-400" />
        <p className="mt-3 font-semibold text-slate-700">{error}</p>
      </main>
    );
  }

  const filteredUsers = users.filter(
    (u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <div className="rounded-3xl bg-gradient-to-r from-[#0B1B3F] to-violet-900 p-6 text-white sm:p-8">
        <p className="flex items-center gap-2 text-sm text-violet-300">
          <ShieldCheck className="h-4 w-4" /> Administrator Panel
        </p>
        <h1 className="mt-1 text-2xl font-extrabold sm:text-3xl">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-slate-300">Platform overview, user management and analysis history.</p>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { icon: Users, label: "Total Registered Users", value: stats.totalUsers, color: "bg-violet-100 text-violet-700" },
          { icon: FileText, label: "Total Resumes Analyzed", value: stats.totalAnalyses, color: "bg-indigo-100 text-indigo-700" },
          { icon: Target, label: "Average Match Score", value: `${stats.avgMatch}%`, color: "bg-fuchsia-100 text-fuchsia-700" },
          { icon: BarChart3, label: "Average ATS Score", value: `${stats.avgAts}/100`, color: "bg-emerald-100 text-emerald-700" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.color}`}>
              <s.icon className="h-5 w-5" />
            </span>
            <p className="mt-3 text-2xl font-extrabold text-[#0B1B3F]">{s.value}</p>
            <p className="text-sm text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Users */}
      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <h2 className="flex items-center gap-2 text-lg font-extrabold text-[#0B1B3F]">
            <Users className="h-5 w-5 text-violet-600" /> User Management ({users.length})
          </h2>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users…"
              className="w-full rounded-xl border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-violet-500 sm:w-64"
            />
          </div>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                <th className="pb-3 pr-4 font-semibold">User</th>
                <th className="pb-3 pr-4 font-semibold">Email</th>
                <th className="pb-3 pr-4 font-semibold">Role</th>
                <th className="pb-3 pr-4 font-semibold">Analyses</th>
                <th className="pb-3 pr-4 font-semibold">Joined</th>
                <th className="pb-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <td className="py-3 pr-4">
                    <span className="flex items-center gap-2 font-medium text-[#0B1B3F]">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white">
                        {u.name.charAt(0).toUpperCase()}
                      </span>
                      {u.name}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-slate-600">{u.email}</td>
                  <td className="py-3 pr-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${u.role === "admin" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600"}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 pr-4 font-semibold text-slate-700">{u.analysisCount}</td>
                  <td className="py-3 pr-4 text-slate-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td className="py-3">
                    <button
                      onClick={() => handleDeleteUser(u.id, u.name)}
                      disabled={deleting === u.id}
                      className="flex items-center gap-1 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-100 disabled:opacity-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> {deleting === u.id ? "…" : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && <p className="py-8 text-center text-sm text-slate-500">No users match your search.</p>}
        </div>
      </div>

      {/* Analysis history */}
      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="flex items-center gap-2 text-lg font-extrabold text-[#0B1B3F]">
          <FileText className="h-5 w-5 text-violet-600" /> All Analysis History ({analyses.length})
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                <th className="pb-3 pr-4 font-semibold">ID</th>
                <th className="pb-3 pr-4 font-semibold">User ID</th>
                <th className="pb-3 pr-4 font-semibold">Resume</th>
                <th className="pb-3 pr-4 font-semibold">Job Title</th>
                <th className="pb-3 pr-4 font-semibold">Match %</th>
                <th className="pb-3 pr-4 font-semibold">ATS</th>
                <th className="pb-3 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {analyses.map((a) => (
                <tr key={a.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <td className="py-3 pr-4 text-slate-500">#{a.id}</td>
                  <td className="py-3 pr-4 text-slate-600">{a.userId}</td>
                  <td className="py-3 pr-4 font-medium text-[#0B1B3F]">{a.fileName}</td>
                  <td className="py-3 pr-4 text-slate-600">{a.jobTitle}</td>
                  <td className="py-3 pr-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${a.matchScore >= 70 ? "bg-emerald-100 text-emerald-700" : a.matchScore >= 45 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-600"}`}>
                      {a.matchScore}%
                    </span>
                  </td>
                  <td className="py-3 pr-4 font-semibold text-slate-700">{a.atsScore}/100</td>
                  <td className="py-3 text-slate-500">{new Date(a.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {analyses.length === 0 && <p className="py-8 text-center text-sm text-slate-500">No analyses yet. Users will appear here once they analyze resumes.</p>}
        </div>
      </div>
    </main>
  );
}
