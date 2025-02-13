import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/** BootCamp のドキュメント一覧のページネーションは１番目が選択されていると 1 ~ 5 **/
const MAX_PAGES_SHOW_TO_SHOW = 5;

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const half = Math.floor(MAX_PAGES_SHOW_TO_SHOW / 2);

    let start = Math.max(currentPage - half, 1);
    let end = Math.min(start + MAX_PAGES_SHOW_TO_SHOW - 1, totalPages);

    if (currentPage >= totalPages - half) {
      start = Math.max(totalPages - MAX_PAGES_SHOW_TO_SHOW + 1, 1);
      end = totalPages;
    } else if (currentPage > half) {
      start = currentPage - half;
      end = Math.min(start + MAX_PAGES_SHOW_TO_SHOW - 1, totalPages);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className="flex justify-center mt-4 space-x-2"
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        <ChevronsLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {getPageNumbers().map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "ghost"}
          onClick={() => onPageChange(page)}
          className="px-3 py-1"
        >
          {page}
        </Button>
      ))}

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        <ChevronsRight className="h-4 w-4" />
      </Button>
    </nav>
  );
};

export default Pagination;
