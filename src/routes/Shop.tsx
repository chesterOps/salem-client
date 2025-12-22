import ScCaretRight from "../assets/icons/ScCaretRight";
import ScControls from "../assets/icons/ScControls";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import Pagination from "../components/Pagination";
import MobileProductsFilter from "../components/product/MobileProductsFilter";
import NoProducts from "../components/product/NoProducts";
import ProductItem from "../components/product/ProductItem";
import ProductLoader from "../components/product/ProductLoader";
import ProductsFilter from "../components/product/ProductsFilter";
import useDocumentTitle from "../hooks/useDocumentTitle";
import usePagination from "../hooks/usePagination";
import useSortFilter from "../hooks/useSortFilter";
import { useState } from "react";
import { useGetAllProductsQuery } from "../services/productApi";

function Shop() {
  useDocumentTitle("Shop");

  const [showFilters, setShowFilters] = useState(false);

  const { data: products, error, isLoading } = useGetAllProductsQuery("");

  // Sort and Filter
  const { sortedProducts, handleSortChange, sortBy } = useSortFilter(
    products || []
  );

  // Pagination
  const {
    paginatedProducts,
    totalPages,
    handlePageChange,
    startIndex,
    currentPage,
    itemsPerPage,
    endIndex,
  } = usePagination(sortedProducts);

  return (
    <main className="mb-[50px] lg:mb-20">
      <BreadCrumb links={[{ name: "Shop" }]} />
      <Container>
        <div className="flex gap-5">
          {/* Desktop Filter */}
          <ProductsFilter />
          {/* Mobile Filter */}
          <MobileProductsFilter
            open={showFilters}
            handleClose={() => setShowFilters(false)}
          />

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center gap-2 justify-between mt-1 lg:mt-0 mb-7.5 lg:mb-4">
              <h1 className="text-2xl leading-8 lg:text-[32px] lg:leading-11 font-bold satoshi">
                All Products
              </h1>
              <div className="flex items-center gap-3 flex-1 lg:flex-auto justify-between lg:justify-end">
                {!isLoading && sortedProducts && sortedProducts.length > 0 && (
                  <span className="text-sm lg:text-base lg:leading-5.5 text-black/60">
                    Showing {startIndex + 1}-
                    {Math.min(endIndex, sortedProducts.length)} of{" "}
                    {sortedProducts.length} Products
                  </span>
                )}

                {/* Sort */}
                <div className="hidden lg:flex items-center">
                  <span className="text-black/60 inline-block mr-1">
                    Sort by:{" "}
                  </span>
                  <div className="flex items-center gap-1">
                    <select
                      value={sortBy}
                      onChange={(e) => handleSortChange(e.target.value)}
                      className="bg-transparent appearance-none text-sm outline-none cursor-pointer"
                    >
                      <option value="newest">Newest</option>
                      <option value="most-popular">Most Popular</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                    </select>
                    <ScCaretRight opacity="1" className="size-4 rotate-90" />
                  </div>
                </div>
                <div className="flex justify-end flex-1 lg:hidden">
                  <button
                    className=" size-8 justify-center flex items-center bg-[#F0F0F0] rounded-full"
                    onClick={() => setShowFilters(true)}
                  >
                    <ScControls />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6 lg:gap-y-9 lg:gap-x-5 mb-6 lg:mb-8">
              {isLoading && <ProductLoader length={9} />}
              {error && <p>Something went wrong.</p>}
              {!isLoading &&
                paginatedProducts &&
                paginatedProducts.length > 0 &&
                paginatedProducts.map((product) => (
                  <ProductItem
                    key={product.id}
                    product={product}
                    imgCss="w-auto"
                  />
                ))}
              {!isLoading &&
                paginatedProducts &&
                paginatedProducts.length === 0 && <NoProducts />}
            </div>

            {/* Pagination */}
            {!isLoading &&
              sortedProducts &&
              sortedProducts.length > itemsPerPage && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  handlePageChange={handlePageChange}
                />
              )}
          </div>
        </div>
      </Container>
    </main>
  );
}

export default Shop;
