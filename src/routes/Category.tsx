import ScArrowLeft from "../assets/icons/ScArrowLeft";
import ScCaretRight from "../assets/icons/ScCaretRight";
import ScControls from "../assets/icons/ScControls";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import ProductItem from "../components/product/ProductItem";
import ProductsFilter from "../components/product/ProductsFilter";
import ProductLoader from "../components/product/ProductLoader";
import MobileProductsFilter from "../components/product/MobileProductsFilter";
import NoProducts from "../components/product/NoProducts";
import useDocumentTitle from "../hooks/useDocumentTitle";
import React, { useState, useMemo } from "react";
import { useGetProductsByCategoryQuery } from "../services/productApi";
import { useParams, useSearchParams } from "react-router-dom";
import { unSlugify } from "../utils/helpers";
import { sizes } from "../utils/constants";

function Category() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "newest";
  const currentPage = parseInt(searchParams.get("page") || "1");
  const itemsPerPage = 9;

  const { name } = useParams();
  const pageTitle = unSlugify(name || "");
  useDocumentTitle(`${pageTitle}`);

  const [showFilters, setShowFilters] = useState(false);

  const {
    data: products,
    error,
    isLoading,
  } = useGetProductsByCategoryQuery(name || "");

  // Get filter values from URL
  const selectedTags =
    searchParams.get("tags")?.split(",").filter(Boolean) || [];
  const selectedSizes =
    searchParams.get("sizes")?.split(",").filter(Boolean) || [];
  const selectedColors =
    searchParams.get("colors")?.split(",").filter(Boolean) || [];
  const minPrice = parseInt(searchParams.get("minPrice") || "0");
  const maxPrice = parseInt(searchParams.get("maxPrice") || "300");

  // Filter and sort products
  const sortedProducts = useMemo(() => {
    if (!products) return [];

    let filtered = [...products];

    // Apply category filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter((product) =>
        selectedTags.some(
          (tag) => product.tag.toLowerCase() === tag.toLowerCase()
        )
      );
    }

    // Apply size filter
    if (selectedSizes.length > 0) {
      filtered = filtered.filter((product) =>
        product.sizes.some((size) =>
          selectedSizes.includes(sizes[size as keyof typeof sizes])
        )
      );
    }

    // Apply color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter((product) =>
        product.colors.some((color) =>
          selectedColors.some((selectedColor) =>
            color.name.toLowerCase().includes(selectedColor.toLowerCase())
          )
        )
      );
    }

    // Apply price filter
    filtered = filtered.filter((product) => {
      const price = product.discount
        ? product.price * (1 - product.discount / 100)
        : product.price;
      return price >= minPrice && price <= maxPrice;
    });

    // Sort
    switch (sortBy) {
      case "newest":
        return filtered.reverse();
      case "price-low":
        return filtered.sort((a, b) => {
          const priceA = a.discount
            ? a.price * (1 - a.discount / 100)
            : a.price;
          const priceB = b.discount
            ? b.price * (1 - b.discount / 100)
            : b.price;
          return priceA - priceB;
        });
      case "price-high":
        return filtered.sort((a, b) => {
          const priceA = a.discount
            ? a.price * (1 - a.discount / 100)
            : a.price;
          const priceB = b.discount
            ? b.price * (1 - b.discount / 100)
            : b.price;
          return priceB - priceA;
        });
      case "most-popular":
        return filtered.sort((a, b) => b.sales - a.sales);
      default:
        return filtered.reverse();
    }
  }, [
    products,
    sortBy,
    selectedTags,
    selectedSizes,
    selectedColors,
    minPrice,
    maxPrice,
  ]);

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  const handleSortChange = (value: string) => {
    // Spread existing params to retain filters

    setSearchParams({
      ...Object.fromEntries(searchParams),
      sortBy: value,
      page: "1",
    });
  };

  const handlePageChange = (page: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: page.toString(),
    });
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <main className="mb-[50px] lg:mb-20">
      <BreadCrumb links={[{ name: pageTitle }]} />
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
                {pageTitle}
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
              paginatedProducts &&
              paginatedProducts.length > itemsPerPage && (
                <div className="flex items-center justify-between border-t gap-1 min-[440px]:gap-2 border-black/10 pt-5">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-2.5 lg:px-3.5 py-2 text-xs lg:text-sm flex items-center gap-2 leading-5 font-medium border border-black/10 rounded-lg hover:bg-black/6 hover:border-[#f0f0f0] ease-in-out duration-150 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ScArrowLeft className="size-4 lg:size-5" />
                    <span className="hidden min-[440px]:inline-flex">
                      Previous
                    </span>
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
              )}
          </div>
        </div>
      </Container>
    </main>
  );
}

export default Category;
