"use server";

import { prisma } from "@/lib/db";
import { News, createNewsSchema } from "@/validation/create-news";
import { ZodError } from "zod";

type CreateNewsSuccessResponse = {
  success: true;
  error: null;
};

type CreateNewsFailureResponse = {
  success: false;
  error: string;
};

type CreateNewsResponse = CreateNewsSuccessResponse | CreateNewsFailureResponse;

export const createNews = async (data: News): Promise<CreateNewsResponse> => {
  try {
    const parsedData = createNewsSchema.parse(data);
    await prisma.news.create({
      data: parsedData,
    });
    return {
      success: true,
      error: null,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        error:
          "Validation failed: " + error.errors.map((e) => e.message).join(", "),
      };
    }
    if (error instanceof Error) {
      return {
        success: false,
        error: "Error: " + error.message,
      };
    }
    return {
      success: false,
      error: "An unknown error occurred",
    };
  }
};
