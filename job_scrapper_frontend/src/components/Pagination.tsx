// src/components/Pagination.tsx

import React from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, handlePageChange }) => (
  <div className="pagination">
    {Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index}
        onClick={() => handlePageChange(index + 1)}
        className={currentPage === index + 1 ? 'active' : ''}
      >
        {index + 1}
      </button>
    ))}
  </div>
);

export default Pagination;
