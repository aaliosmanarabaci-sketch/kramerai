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
});

export type Idea = z.infer<typeof ideaSchema>;
