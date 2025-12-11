import { useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import ProductItem from "../components/product/ProductItem";
import { products } from "../data/products";
import ScArrowLeft from "../assets/icons/ScArrowLeft";
import ScCaretRight from "../assets/icons/ScCaretRight";

function Category() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [sortBy, setSortBy] = useState("most-popular");
  const [showFilters, setShowFilters] = useState(false);

  const categories = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"];
  const sizes = [
    "XX-Small",
    "X-Small",
    "Small",
    "Medium",
    "Large",
    "X-Large",
    "XX-Large",
    "3X-Large",
    "4X-Large",
  ];
  const colors = [
    { name: "Green", hex: "#00C12B" },
    { name: "Red", hex: "#F50606" },
    { name: "Yellow", hex: "#F5DD06" },
    { name: "Orange", hex: "#F57906" },
    { name: "Cyan", hex: "#06CAF5" },
    { name: "Blue", hex: "#063AF5" },
    { name: "Purple", hex: "#7D06F5" },
    { name: "Pink", hex: "#F506A4" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Black", hex: "#000000" },
  ];

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  return (
    <main className="mb-[50px] lg:mb-20">
      <BreadCrumb links={[{ name: "Casual" }]} />
      <Container>
        <div className="flex gap-5">
          {/* Filters Sidebar */}
          <aside
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block fixed lg:static inset-0 z-50 lg:z-0 bg-white lg:bg-transparent lg:w-[295px] shrink-0 overflow-y-auto`}
          >
            <div className="lg:border lg:border-black/10 lg:rounded-[20px] lg:p-5 lg:py-6 p-6">
              {/* Mobile close button */}
              <div className="flex justify-between items-center mb-6 lg:hidden">
                <h2 className="text-xl font-bold">Filters</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="hidden lg:flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Filters</h2>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-black/40"
                >
                  <line x1="4" y1="21" x2="4" y2="14" />
                  <line x1="4" y1="10" x2="4" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12" y2="3" />
                  <line x1="20" y1="21" x2="20" y2="16" />
                  <line x1="20" y1="12" x2="20" y2="3" />
                  <line x1="1" y1="14" x2="7" y2="14" />
                  <line x1="9" y1="8" x2="15" y2="8" />
                  <line x1="17" y1="16" x2="23" y2="16" />
                </svg>
              </div>

              <hr className="border-black/10 mb-5 lg:mb-6" />

              {/* Categories */}
              <div className="mb-5 lg:mb-6">
                {categories.map((category) => (
                  <label
                    key={category}
                    className="flex items-center justify-between py-2 cursor-pointer group"
                  >
                    <span className="text-sm lg:text-base text-black/60 group-hover:text-black transition-colors">
                      {category}
                    </span>
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="w-4 h-4 rounded border-black/20 text-black focus:ring-0 cursor-pointer"
                    />
                  </label>
                ))}
              </div>

              <hr className="border-black/10 mb-5 lg:mb-6" />

              {/* Price Range */}
              <div className="mb-5 lg:mb-6">
                <h3 className="text-base lg:text-xl font-bold mb-5">Price</h3>
                <input
                  type="range"
                  min="0"
                  max="300"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full mb-5"
                />
                <div className="flex items-center justify-between text-sm lg:text-base">
                  <span className="font-semibold">${priceRange[0]}</span>
                  <span className="font-semibold">${priceRange[1]}</span>
                </div>
              </div>

              <hr className="border-black/10 mb-5 lg:mb-6" />

              {/* Colors */}
              <div className="mb-5 lg:mb-6">
                <h3 className="text-base lg:text-xl font-bold mb-5">Colors</h3>
                <div className="grid grid-cols-5 gap-4">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      className="w-[37px] h-[37px] rounded-full border-2 border-transparent hover:border-black/20 transition-colors"
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              <hr className="border-black/10 mb-5 lg:mb-6" />

              {/* Sizes */}
              <div className="mb-6">
                <h3 className="text-base lg:text-xl font-bold mb-5">Size</h3>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`px-3 py-2.5 rounded-full text-xs lg:text-sm transition-all ${
                        selectedSizes.includes(size)
                          ? "bg-black text-white"
                          : "bg-[#F0F0F0] text-black/60 hover:bg-black/10"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Apply Filter Button */}
              <button className="w-full bg-black text-white rounded-full py-3 lg:py-4 text-sm lg:text-base font-medium hover:bg-black/90 transition-colors lg:hidden">
                Apply Filter
              </button>
            </div>
          </aside>

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
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden p-2 bg-[#F0F0F0] rounded-full"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="4" y1="21" x2="4" y2="14" />
                    <line x1="4" y1="10" x2="4" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12" y2="3" />
                    <line x1="20" y1="21" x2="20" y2="16" />
                    <line x1="20" y1="12" x2="20" y2="3" />
                    <line x1="1" y1="14" x2="7" y2="14" />
                    <line x1="9" y1="8" x2="15" y2="8" />
                    <line x1="17" y1="16" x2="23" y2="16" />
                  </svg>
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
