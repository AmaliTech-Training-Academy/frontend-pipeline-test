"use client";

import { Button } from "@/components/ui/button";
import { PaginationItem, PaginationEllipsis } from "@/components/ui/pagination";

export function handlePrevious(
  page: number,
  onPageChange: (page: number) => void
) {
  if (page > 0) onPageChange(page - 1);
}

export function handleNext(
  page: number,
  totalPages: number,
  onPageChange: (page: number) => void
) {
  if (page < totalPages - 1) onPageChange(page + 1);
}

export function renderPageNumbers(
  page: number,
  totalPages: number,
  onPageChange: (page: number) => void
): React.ReactNode[] {
  const pages = [];

  if (totalPages <= 5) {
    for (let i = 0; i < totalPages; i++) {
      pages.push(
        <PaginationItem key={i}>
          <Button
            variant={i === page ? "outline" : "ghost"}
            onClick={() => onPageChange(i)}
          >
            {i + 1}
          </Button>
        </PaginationItem>
      );
    }
    return pages;
  }

  pages.push(
    <PaginationItem key={0}>
      <Button
        variant={page === 0 ? "outline" : "ghost"}
        onClick={() => onPageChange(0)}
      >
        1
      </Button>
    </PaginationItem>
  );

  if (page > 2) {
    pages.push(<PaginationEllipsis key="left-ellipsis" />);
  }

  const start = Math.max(1, page - 1);
  const end = Math.min(totalPages - 2, page + 1);
  for (let i = start; i <= end; i++) {
    pages.push(
      <PaginationItem key={i}>
        <Button
          variant={i === page ? "outline" : "ghost"}
          onClick={() => onPageChange(i)}
        >
          {i + 1}
        </Button>
      </PaginationItem>
    );
  }

  if (page < totalPages - 3) {
    pages.push(<PaginationEllipsis key="right-ellipsis" />);
  }

  pages.push(
    <PaginationItem key={totalPages - 1}>
      <Button
        variant={page === totalPages - 1 ? "outline" : "ghost"}
        onClick={() => onPageChange(totalPages - 1)}
      >
        {totalPages}
      </Button>
    </PaginationItem>
  );

  return pages;
}
