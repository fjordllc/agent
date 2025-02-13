import { useState } from "react";

interface UsePaginationProps {
  initialPage?: number;
}

export function usePagination({ initialPage = 1 }: UsePaginationProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  return { currentPage, setCurrentPage };
}
