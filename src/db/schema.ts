import { pgTable, serial, varchar, text, integer, timestamp, jsonb } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 180 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: varchar("role", { length: 20 }).notNull().default("user"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const analyses = pgTable("analyses", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  fileName: varchar("file_name", { length: 255 }).notNull(),
  jobTitle: varchar("job_title", { length: 200 }).notNull(),
  jobDescription: text("job_description").notNull(),
  resumeText: text("resume_text").notNull(),
  matchScore: integer("match_score").notNull(),
  atsScore: integer("ats_score").notNull(),
  skillsPresent: jsonb("skills_present").$type<string[]>().notNull().default([]),
  missingSkills: jsonb("missing_skills").$type<string[]>().notNull().default([]),
  strengths: jsonb("strengths").$type<string[]>().notNull().default([]),
  weaknesses: jsonb("weaknesses").$type<string[]>().notNull().default([]),
  suggestions: jsonb("suggestions").$type<string[]>().notNull().default([]),
  interviewQuestions: jsonb("interview_questions")
    .$type<{ type: string; question: string; answer: string }[]>()
    .notNull()
    .default([]),
  roadmap: jsonb("roadmap")
    .$type<{ skill: string; level: string; duration: string; course: string; topics: string[]; weekPlan: string[] }[]>()
    .notNull()
    .default([]),
  wordCount: integer("word_count").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
