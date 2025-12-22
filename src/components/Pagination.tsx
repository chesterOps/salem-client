import React from "react";
import ScArrowLeft from "../assets/icons/ScArrowLeft";

function Pagination({
  currentPage,
  totalPages,
  handlePageChange,
}: {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}) {
  return (
    <div className="flex items-center justify-between border-t gap-1 min-[440px]:gap-2 border-black/10 pt-5">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2.5 lg:px-3.5 py-2 text-xs lg:text-sm flex items-center gap-2 leading-5 font-medium border border-black/10 rounded-lg hover:bg-black/6 hover:border-[#f0f0f0] ease-in-out duration-150 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ScArrowLeft className="size-4 lg:size-5" />
        <span className="hidden min-[440px]:inline-flex">Previous</span>
      </button>
      <div className="flex gap-1 min-[440px]:gap-2">
        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
          let pageNum;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }

          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`size-9 lg:size-10 font-medium flex items-center text-xs leading-5 lg:text-sm justify-center rounded-lg transition-colors ${
                currentPage === pageNum
                  ? "bg-black/6"
                  : "text-black/60 hover:text-black hover:bg-black/6"
              }`}
            >
              {pageNum}
            </button>
          );
        })}
        {totalPages > 5 && currentPage < totalPages - 2 && (
          <React.Fragment>
            <span className="size-9 lg:size-10 text-xs leading-5 lg:text-sm text-black/60 flex items-center justify-center">
              ...
            </span>
            <button
              onClick={() => handlePageChange(totalPages)}
              className="size-9 lg:size-10 text-xs leading-5 lg:text-sm flex items-center justify-center text-black/60 hover:text-black rounded-lg hover:bg-black/6 transition-colors"
            >
              {totalPages}
            </button>
          </React.Fragment>
        )}
      </div>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2.5 lg:px-3.5 py-2 text-xs lg:text-sm flex items-center gap-2 leading-5 font-medium border border-black/10 rounded-lg hover:bg-black/6 hover:border-[#f0f0f0] ease-in-out duration-150 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="hidden min-[440px]:inline-flex">Next</span>
        <ScArrowLeft className="size-4 lg:size-5 rotate-180" />
      </button>
    </div>
  );
}

export default Pagination;
