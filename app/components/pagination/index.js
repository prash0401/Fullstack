"use client";

import { useState } from "react";

export default function Pagination() {
  const totalPages = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePrev = () => {
    if (currentPage > 1) {
      // onPageChange(currentPage - 1);
      setCurrentPage(currentPage - 1);
      console.log("previous button clicked", currentPage);
    }
  };
  const handleNext = () => {
    if (currentPage < totalPages) {
      // onPageChange(currentPage + 1);
      setCurrentPage(currentPage + 1);
      console.log("next button clicked", currentPage);
    }
  };

  return (
    <>
      <div>
        <button onClick={handlePrev} disabled={currentPage === 1}>
          prev
        </button>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          next
        </button>
      </div>
    </>
  );
}
