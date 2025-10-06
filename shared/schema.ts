import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const generateIdeasRequestSchema = z.object({
  industry: z.string().nullable().optional(),
  budget: z.string().nullable().optional(),
  complexity: z.string().nullable().optional(),
  audience: z.string().nullable().optional(),
});

export type GenerateIdeasRequest = z.infer<typeof generateIdeasRequestSchema>;

export const ideaSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
  budget: z.string(),
  complexity: z.string(),
  uniqueness: z.number().min(1).max(5),
  roadmap: z.array(z.object({
    phase: z.string(),
    duration: z.string(),
    tasks: z.array(z.string()),
  })),
  pros: z.array(z.string()),
  cons: z.array(z.string()),
  requiredSkills: z.array(z.string()),
  potentialRevenue: z.string(),
  targetMarketSize: z.string(),
});

export type Idea = z.infer<typeof ideaSchema>;
