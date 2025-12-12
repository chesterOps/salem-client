import { useState } from "react";
import { products } from "../data/products";
import ScArrowLeft from "../assets/icons/ScArrowLeft";
import ScCaretRight from "../assets/icons/ScCaretRight";
import ScControls from "../assets/icons/ScControls";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import ProductItem from "../components/product/ProductItem";
import ProductsFilter from "../components/product/ProductsFilter";
import MobileProductsFilter from "../components/product/MobileProductsFilter";

function Category() {
  const [sortBy, setSortBy] = useState("most-popular");

  const [showFilters, setShowFilters] = useState(false);

  return (
    <main className="mb-[50px] lg:mb-20">
      <BreadCrumb links={[{ name: "Casual" }]} />
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
                Casual
              </h1>
              <div className="flex items-center gap-3 flex-1 lg:flex-auto justify-between lg:justify-end">
                <span className="text-sm lg:text-base lg:leading-5.5 text-black/60">
                  Showing 1-{products.length} of {products.length} Products
                </span>
                {/* Sort */}
                <div className="hidden lg:flex items-center">
                  <span className="text-black/60 inline-block mr-1">
                    Sort by:{" "}
                  </span>
                  <div className="flex items-center gap-1">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-transparent appearance-none text-sm outline-none cursor-pointer"
                    >
                      <option value="most-popular">Most Popular</option>
                      <option value="newest">Newest</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                    </select>
                    <ScCaretRight opacity="1" className="size-4 rotate-90" />
                  </div>
                </div>
                <button
                  className="lg:hidden size-8 flex justify-center items-center bg-[#F0F0F0] rounded-full"
                  onClick={() => setShowFilters(true)}
                >
                  <ScControls />
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6 lg:gap-y-9 lg:gap-x-5 mb-6 lg:mb-8">
              {products.map((product) => (
                <ProductItem
                  key={product.id}
                  product={product}
                  imgCss="w-auto aspect-square"
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t gap-1 min-[440px]:gap-2 border-black/10 pt-5">
              <button className="px-2.5 lg:px-3.5 py-2 text-xs lg:text-sm flex items-center gap-2 leading-5 font-medium border border-black/10 rounded-lg hover:bg-black/6 hover:border-[#f0f0f0] ease-in-out duration-150 transition-colors disabled:opacity-50">
                <ScArrowLeft className="size-4 lg:size-5" />
                <span className="hidden min-[440px]:inline-flex">Previous</span>
              </button>
              <div className="flex gap-1 min-[440px]:gap-2">
                <button className="size-9 lg:size-10 font-medium flex items-center text-xs leading-5 lg:text-sm justify-center rounded-lg bg-black/6">
                  1
                </button>
                <button className="size-9 lg:size-10 items-center justify-center text-xs leading-5 lg:text-sm text-black/60 hover:text-black rounded-lg hover:bg-black/6 transition-colors">
                  2
                </button>
                <button className="size-9 lg:size-10 items-center text-xs leading-5 lg:text-sm justify-center text-black/60 hover:text-black rounded-lg hover:bg-black/6 transition-colors">
                  3
                </button>
                <span className="size-9 lg:size-10 text-xs leading-5 lg:text-sm text-black/60 flex items-center justify-center">
                  ...
                </span>
                <button className="size-9 lg:size-10 text-xs leading-5 lg:text-sm items-center justify-center text-black/60 hover:text-black rounded-lg hover:bg-black/6 transition-colors">
                  10
                </button>
              </div>
              <button className="px-2.5 lg:px-3.5 py-2 text-xs lg:text-sm flex items-center gap-2 leading-5 font-medium border border-black/10 rounded-lg hover:bg-black/6 hover:border-[#f0f0f0] ease-in-out duration-150 transition-colors disabled:opacity-50">
                <span className="hidden min-[440px]:inline-flex">Next</span>
                <ScArrowLeft className="size-4 lg:size-5 rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}

export default Category;
