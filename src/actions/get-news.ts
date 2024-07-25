"use server";

import { prisma } from "@/lib/db";
import { News as NewsDB } from "@prisma/client";

type GetNewsResponse = {
  news: NewsDB[];
  totalNewsCount: number;
};

interface GetNewsSuccessResponse {
  success: true;
  data: GetNewsResponse;
}

interface GetNewsFailureResponse {
  success: false;
  error: string;
}

type GetNewsResult = GetNewsSuccessResponse | GetNewsFailureResponse;

export const getNews = async (
  page: number,
  pageSize: number,
  searchTerm: string,
): Promise<GetNewsResult> => {
  try {
    if (searchTerm) {
      const news = await prisma.news.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        where: {
          OR: [
            {
              title: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
          ],
        },
        orderBy: {
          pubDate: "desc",
        },
      });

      const totalNewsCount = await prisma.news.count({
        where: {
          OR: [
            {
              title: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
          ],
        },
      });
      return {
        success: true,
        data: {
          news,
          totalNewsCount,
        },
      };
    }
    const news = await prisma.news.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        pubDate: "desc",
      },
    });

    const totalNewsCount = await prisma.news.count();

    return {
      success: true,
      data: {
        news,
        totalNewsCount,
      },
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
