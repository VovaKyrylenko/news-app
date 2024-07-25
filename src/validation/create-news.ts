import { z } from "zod";

export const createNewsSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be at most 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be at most 500 characters"),
  link: z.string().url("Invalid URL"),
  pubDate: z.date(),
  imageLink: z.string().url("Invalid URL"),
});

export type News = z.infer<typeof createNewsSchema>;
