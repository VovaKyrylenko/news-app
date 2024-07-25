"use server";

import { prisma } from "@/lib/db";
import { ZodError } from "zod";
import { UpdateNews, updateNewsSchema } from "@/validation/update-news";

interface UpdateNewsSuccessResponse {
  success: true;
  error: null;
}

interface UpdateNewsFailureResponse {
  success: false;
  error: string;
}

type UpdateNewsResult = UpdateNewsSuccessResponse | UpdateNewsFailureResponse;

export const updateNews = async (
  id: number,
  data: UpdateNews,
): Promise<UpdateNewsResult> => {
  try {
    const parsedData = updateNewsSchema.parse(data);

    await prisma.news.update({
      where: { id },
      data: parsedData,
    });

    return { success: true, error: null };
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return {
        success: false,
        error: error.message,
      };
    } else if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    } else {
      return {
        success: false,
        error: "Unknown error",
      };
    }
  }
};
