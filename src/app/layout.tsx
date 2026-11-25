import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "CareerMatch AI — AI Resume Analyzer & Job Matching",
  description:
    "Upload your resume PDF, paste a job description, and get an AI-powered match score, ATS score, missing skills, interview questions and a personalized learning roadmap.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#F4F5FB] text-slate-900 antialiased">
        <Navbar />
        {children}
        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-center text-sm text-slate-500 sm:flex-row sm:px-6 sm:text-left">
            <p>
              <span className="font-bold text-[#0B1B3F]">CareerMatch AI</span> — MCA AI-ML Final Year Project
            </p>
            <p>Real NLP + TF-IDF matching · PDF parsing · ATS scoring · Learning roadmaps</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
