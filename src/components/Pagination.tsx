import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const maxPagesToShow = 6;

  const getPageNumbers = () => {
    const pages = [];
    const half = Math.floor(maxPagesToShow / 2);

    let start = Math.max(currentPage - half, 1);
    const end = Math.min(start + maxPagesToShow - 1, totalPages);

    if (end - start + 1 < maxPagesToShow) {
      start = Math.max(end - maxPagesToShow + 1, 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginTop: "20px",
      }}
    >
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        title="First Page"
      >
        ⏮️
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        title="Previous Page"
      >
        ◀️
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            padding: "6px 12px",
            backgroundColor: page === currentPage ? "#007bff" : "#f8f9fa",
            color: page === currentPage ? "#fff" : "#000",
            border: "1px solid #ddd",
            borderRadius: "4px",
            cursor: page === currentPage ? "default" : "pointer",
          }}
          disabled={page === currentPage}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        title="Next Page"
      >
        ▶️
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        title="Last Page"
      >
        ⏭️
      </button>
    </div>
  );
};

export default Pagination;
