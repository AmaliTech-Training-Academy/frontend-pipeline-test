"use client";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  handleNext,
  handlePrevious,
  renderPageNumbers,
} from "@/lib/pagination";
import { PaginationControlsProps } from "@/lib/types/pagination";

export function PaginationControls({
  pageInfo,
  onPageChange,
}: PaginationControlsProps) {
  const { page, totalPages } = pageInfo;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="ghost"
            onClick={() => handlePrevious(page, onPageChange)}
            disabled={page === 0}
          >
            Previous
          </Button>
        </PaginationItem>
        {renderPageNumbers(page, totalPages, onPageChange)}
        <PaginationItem>
          <Button
            variant="ghost"
            onClick={() => handleNext(page, totalPages, onPageChange)}
            disabled={page === totalPages - 1}
          >
            Next
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
