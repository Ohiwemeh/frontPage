import React from "react";

const Pagination = ({ onPageChange, currentPage, blogs = [], pageSize }) => {
  const totalPage = Math.ceil(blogs.length / pageSize);

  const renderPaginationLinks = () => {
    return Array.from({ length: totalPage }, (_, i) => i + 1).map(
      (pageNumber) => (
        <li key={pageNumber}>
          <button
            onClick={() => onPageChange(pageNumber)}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              pageNumber === currentPage
                ? "bg-blue-600 text-white font-bold"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white"
            }`}
          >
            {pageNumber}
          </button>
        </li>
      )
    );
  };

  return (
    <ul className="flex items-center justify-center gap-3 my-8">
      <li>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-500 hover:text-white transition-all duration-300"
        >
          Previous
        </button>
      </li>
      <div className="flex gap-2">{renderPaginationLinks()}</div>
      <li>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPage}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-500 hover:text-white transition-all duration-300"
        >
          Next
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
