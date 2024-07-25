"use server";

import { prisma } from "@/lib/db";

interface RestoreNewsSuccessResponse {
  success: true;
}

interface RestoreNewsFailureResponse {
  success: false;
  error: string;
}

type RestoreNewsResult =
  | RestoreNewsSuccessResponse
  | RestoreNewsFailureResponse;

export const restoreNews = async (id: number): Promise<RestoreNewsResult> => {
  try {
    await prisma.news.update({
      where: { id },
      data: { deleted: false },
    });
    return { success: true };
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
