"use server";

import { prisma } from "@/lib/db";

interface DeleteNewsSuccessResponse {
  success: true;
}

interface DeleteNewsFailureResponse {
  success: false;
  error: string;
}

type DeleteNewsResult = DeleteNewsSuccessResponse | DeleteNewsFailureResponse;

export const deleteNews = async (id: number): Promise<DeleteNewsResult> => {
  try {
    await prisma.news.update({
      where: { id },
      data: { deleted: true },
    });
    return { success: true };
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
