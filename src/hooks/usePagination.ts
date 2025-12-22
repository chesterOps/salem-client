import { useSearchParams } from "react-router-dom";
import type { Product } from "../services/productApi";

function usePagination(sortedProducts: Product[], itemsPerPage = 9) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: page.toString(),
    });
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return {
    totalPages,
    paginatedProducts,
    handlePageChange,
    startIndex,
    endIndex,
    itemsPerPage,
    currentPage,
  };
}

export default usePagination;
