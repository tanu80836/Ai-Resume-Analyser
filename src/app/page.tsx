import Link from "next/link";
import {
  Sparkles,
  UploadCloud,
  BarChart3,
  Target,
  Briefcase,
  GraduationCap,
  FileText,
  BrainCircuit,
  Map,
  MessagesSquare,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Database,
  Cpu,
} from "lucide-react";

const features = [
  {
    icon: UploadCloud,
    title: "PDF Resume Upload",
    desc: "Upload your resume in PDF format. Our parser extracts real text using pdfjs — no fake data, ever.",
  },
  {
    icon: Target,
    title: "AI Match Score",
    desc: "TF-IDF cosine similarity between your resume and the job description gives a true matching percentage.",
  },
  {
    icon: BarChart3,
    title: "ATS Compatibility Score",
    desc: "An ATS-style score out of 100 based on skills coverage, keywords, formatting, action verbs and quantified impact.",
  },
  {
    icon: BrainCircuit,
    title: "Skills Gap Analysis",
    desc: "Instantly see skills you already have vs. missing skills extracted from 1,300+ skill patterns.",
  },
  {
    icon: MessagesSquare,
    title: "Interview Preparation",
    desc: "Job-specific technical, HR and behavioral questions with suggested STAR-format answers.",
  },
  {
    icon: Map,
    title: "Learning Roadmap",
    desc: "A personalized week-by-week plan with courses and topics for every missing skill.",
  },
];

const howItWorks = [
  { step: "01", title: "Upload Resume", desc: "Drop your PDF resume and paste the target job description." },
  { step: "02", title: "AI Analyzes", desc: "NLP tokenization, TF-IDF vectors and skill extraction run in real time." },
  { step: "03", title: "Get Insights", desc: "Match %, ATS score, strengths, weaknesses and improvement suggestions." },
  { step: "04", title: "Prepare & Grow", desc: "Practice interview questions and follow your personalized learning roadmap." },
];

const techStack = [
  { icon: Cpu, name: "Next.js + React", desc: "Modern responsive frontend" },
  { icon: BrainCircuit, name: "NLP + TF-IDF", desc: "Real text analysis engine" },
  { icon: FileText, name: "pdfjs-dist", desc: "Real PDF text extraction" },
  { icon: Database, name: "PostgreSQL", desc: "Users & analysis history" },
  { icon: ShieldCheck, name: "JWT Auth", desc: "Secure login & sessions" },
];

export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0B1B3F]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-violet-600/30 blur-3xl" />
          <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl" />
        </div>
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/40 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300">
              <Sparkles className="h-3.5 w-3.5" /> AI-POWERED CAREER PLATFORM
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              Find Your Perfect <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Career Match</span> with AI
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-300">
              Upload your resume PDF, paste a job description, and instantly get a real AI match score,
              ATS compatibility, missing skills, interview questions and a personalized learning roadmap.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-7 py-3.5 text-base font-bold text-white shadow-xl shadow-violet-900/50 transition hover:bg-violet-500"
              >
                Get Started <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/5 px-7 py-3.5 text-base font-semibold text-white transition hover:bg-white/10"
              >
                I already have an account
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
              {["Real PDF parsing", "No fake results", "Free to use"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" /> {t}
                </span>
              ))}
            </div>
          </div>

          {/* Demo card */}
          <div className="relative">
            <div className="rounded-3xl border border-white/10 bg-white p-6 shadow-2xl shadow-black/40 sm:p-8">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-[#0B1B3F]">Sample Analysis</p>
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">LIVE ENGINE</span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-violet-50 p-4 text-center">
                  <p className="text-3xl font-extrabold text-violet-700">82%</p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">JOB MATCH</p>
                </div>
                <div className="rounded-2xl bg-indigo-50 p-4 text-center">
                  <p className="text-3xl font-extrabold text-indigo-700">76<span className="text-base">/100</span></p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">ATS SCORE</p>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-600">
                    <span>Skills Coverage</span><span>68%</span>
                  </div>
                  <div className="mt-1 h-2.5 rounded-full bg-slate-100">
                    <div className="h-2.5 w-[68%] rounded-full bg-gradient-to-r from-violet-500 to-indigo-500" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-600">
                    <span>Keyword Overlap</span><span>74%</span>
                  </div>
                  <div className="mt-1 h-2.5 rounded-full bg-slate-100">
                    <div className="h-2.5 w-[74%] rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500" />
                  </div>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Python", "Machine Learning", "SQL", "React"].map((s) => (
                  <span key={s} className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">✓ {s}</span>
                ))}
                {["Docker", "AWS"].map((s) => (
                  <span key={s} className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-600">✗ {s}</span>
                ))}
              </div>
              <p className="mt-4 text-center text-xs text-slate-400">Your real scores will be computed from your actual resume & job description.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-violet-600">About the Project</span>
            <h2 className="mt-3 text-3xl font-extrabold text-[#0B1B3F] sm:text-4xl">
              An MCA AI-ML Final Year Project That Actually Works
            </h2>
            <p className="mt-4 text-slate-600">
              CareerMatch AI bridges the gap between students and recruiters. Instead of guessing whether
              your resume fits a job, the platform reads your real PDF, compares it against the real job
              description using NLP techniques, and tells you exactly where you stand — and how to improve.
            </p>
            <p className="mt-3 text-slate-600">
              Every score is computed live from your documents: TF-IDF cosine similarity for matching,
              a 1,300+ pattern skill database for gap analysis, and a multi-factor ATS model for formatting
              quality. Results are saved to your dashboard so you can track progress across applications.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Briefcase, stat: "1,300+", label: "Skill patterns" },
              { icon: FileText, stat: "100%", label: "Real PDF parsing" },
              { icon: BrainCircuit, stat: "TF-IDF", label: "Matching engine" },
              { icon: GraduationCap, stat: "12", label: "Interview Qs per job" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <s.icon className="h-7 w-7 text-violet-600" />
                <p className="mt-3 text-2xl font-extrabold text-[#0B1B3F]">{s.stat}</p>
                <p className="text-sm text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-violet-600">Features</span>
            <h2 className="mt-3 text-3xl font-extrabold text-[#0B1B3F] sm:text-4xl">Everything You Need to Get Hired</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              A complete toolkit — from resume analysis to interview prep and skill roadmaps — in one dashboard.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="group rounded-2xl border border-slate-200 bg-[#F8F9FE] p-6 transition hover:-translate-y-1 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-100">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-200">
                  <f.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-[#0B1B3F]">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-violet-600">How It Works</span>
          <h2 className="mt-3 text-3xl font-extrabold text-[#0B1B3F] sm:text-4xl">Four Steps to Your Dream Job</h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((h) => (
            <div key={h.step} className="relative rounded-2xl bg-[#0B1B3F] p-6 text-white">
              <span className="text-4xl font-extrabold text-violet-500/60">{h.step}</span>
              <h3 className="mt-3 text-lg font-bold">{h.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TECH STACK */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-violet-600">Technology Stack</span>
            <h2 className="mt-3 text-3xl font-extrabold text-[#0B1B3F] sm:text-4xl">Built with Modern Tools</h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {techStack.map((t) => (
              <div key={t.name} className="rounded-2xl border border-slate-200 p-5 text-center">
                <t.icon className="mx-auto h-8 w-8 text-violet-600" />
                <p className="mt-3 font-bold text-[#0B1B3F]">{t.name}</p>
                <p className="mt-1 text-xs text-slate-500">{t.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 rounded-3xl bg-gradient-to-r from-violet-700 to-indigo-700 p-8 text-center text-white sm:p-12">
            <h3 className="text-2xl font-extrabold sm:text-3xl">Ready to analyze your resume?</h3>
            <p className="mx-auto mt-3 max-w-xl text-violet-100">
              Create a free account and get your first AI-powered resume analysis in under a minute.
            </p>
            <Link
              href="/register"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-bold text-violet-700 shadow-xl transition hover:bg-violet-50"
            >
              Get Started Free <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
