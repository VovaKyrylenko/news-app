"use client";

import {
  Pagination as UIPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

const getPaginationItems = (currentPage: number, totalPages: number) => {
  const delta = 2;
  const range: (number | "...")[] = [];

  for (
    let i = Math.max(2, currentPage - delta);
    i <= Math.min(totalPages - 1, currentPage + delta);
    i++
  ) {
    range.push(i);
  }

  if (currentPage - delta > 2) {
    range.unshift("...");
  }
  if (currentPage + delta < totalPages - 1) {
    range.push("...");
  }

  range.unshift(1);
  if (totalPages > 1) {
    range.push(totalPages);
  }

  return range;
};

export const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("currentPage", page.toString());
    router.push(`?${params.toString()}`);
  };

  const paginationItems = getPaginationItems(currentPage, totalPages);

  return (
    <UIPagination className="py-4">
      <PaginationPrevious
        className="cursor-pointer"
        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
      >
        Previous
      </PaginationPrevious>
      <PaginationContent>
        {paginationItems.map((item, index) =>
          item === "..." ? (
            <PaginationEllipsis key={index} />
          ) : (
            <PaginationItem key={index}>
              <PaginationLink
                className="cursor-pointer"
                isActive={item === currentPage}
                onClick={() => handlePageChange(Number(item))}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          ),
        )}
      </PaginationContent>
      <PaginationNext
        className="cursor-pointer"
        onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
      >
        Next
      </PaginationNext>
    </UIPagination>
  );
};
