import { pgTable, text, serial, integer, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const dreams = pgTable("dreams", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: timestamp("date").notNull().defaultNow(),
  mood: text("mood"),
  clarity: text("clarity"),
  location: text("location"),
  elements: json("elements").$type<string[]>().default([]),
  visualization: text("visualization"),
  interpretation: text("interpretation"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertDreamSchema = createInsertSchema(dreams).omit({
  id: true,
  createdAt: true,
});

export type InsertDream = z.infer<typeof insertDreamSchema>;
export type Dream = typeof dreams.$inferSelect;

// Schema for generating dream visualizations
export const generateVisualizationSchema = z.object({
  description: z.string().min(5, "Please provide a description of your dream"),
  elements: z.array(z.string()).optional(),
  mood: z.string().optional(),
});

export type GenerateVisualization = z.infer<typeof generateVisualizationSchema>;
