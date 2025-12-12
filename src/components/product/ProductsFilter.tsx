import { useState } from "react";
import { checkLightness } from "../../utils/helpers";
import { twMerge } from "tailwind-merge";
import { BsCheck2 } from "react-icons/bs";
import ScControls from "../../assets/icons/ScControls";
import ScCaretRight from "../../assets/icons/ScCaretRight";
import ScCheck from "../../assets/icons/ScCheck";
import Button from "../Button";

function ProductsFilter() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const categories = ["T-shirts", "Shorts", "Shirts", "Jeans"];
  const [dropDowns, setDropDowns] = useState({
    price: true,
    colors: true,
    size: true,
  });
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

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };
  return (
    <aside className={`bg-white w-[295px] hidden lg:block`}>
      <div className="lg:border lg:border-black/10 lg:rounded-[20px] px-6 pt-5 pb-7.5">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl leading-7 font-bold satoshi">Filters</h2>
          <ScControls fillOpacity={0.4} className="size-6" />
        </div>

        <hr className="border-black/10 mb-6" />

        {/* Categories */}
        <div className="mb-6 flex flex-col gap-5">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center cursor-pointer group justify-between satoshi"
            >
              {/* Label text for the checkbox */}
              <span
                className={twMerge(
                  "text-base leading-4 text-black/60 group-hover:text-black transition-colors",
                  selectedCategories.includes(category) && "text-black"
                )}
              >
                {category}
              </span>
              {/* Hidden native checkbox kept for accessibility */}
              <input
                type="checkbox"
                className="peer hidden"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
              />
              {/* Visible custom checkbox */}
              <span className="w-4 h-4 flex items-center justify-center border rounded-xs border-black/20 peer-checked:bg-[#121212] peer-checked:border-[#121212] peer-checked:[&>svg]:opacity-100">
                {/* Check icon becomes visible when checked (opacity toggled via peer) */}
                <BsCheck2
                  size={20}
                  className="text-[#ffffff] opacity-0 peer-checked:opacity-100"
                />
              </span>
            </label>
          ))}
        </div>

        <hr className="border-black/10 mb-6" />

        {/* Price Range */}
        <div className="mb-6">
          <button
            className="flex justify-between items-center w-full"
            onClick={() =>
              setDropDowns((prev) => ({ ...prev, price: !prev.price }))
            }
          >
            <h3 className="satoshi text-xl font-bold ">Price</h3>
            <ScCaretRight
              opacity="1"
              className={twMerge(
                "size-4 transition-transform ease-in-out duration-300",
                dropDowns.price ? "rotate-270" : "rotate-90"
              )}
            />
          </button>
          <div
            className={twMerge(
              "overflow-hidden transition-all duration-300 ease-in-out",
              dropDowns.price ? "max-h-40 overflow-auto" : "max-h-0"
            )}
          >
            <div className="relative mt-5 mb-8 h-5 flex items-center">
              {/* Track background */}
              <div className="absolute w-full h-1.5 bg-[#F0F0F0] rounded-full"></div>

              {/* Active track (between min and max) */}
              <div
                className="absolute h-1.5 bg-black rounded-full"
                style={{
                  left: `${(priceRange[0] / 300) * 100}%`,
                  right: `${100 - (priceRange[1] / 300) * 100}%`,
                }}
              ></div>

              {/* Min value label that moves with thumb */}
              <div
                className="absolute top-6 text-sm bg-white font-medium whitespace-nowrap"
                style={{
                  left: `${(priceRange[0] / 300) * 100}%`,
                  transform: `translateX(${
                    priceRange[0] / 300 < 0.15
                      ? "0%"
                      : priceRange[0] / 300 > 0.85
                      ? "-100%"
                      : "-50%"
                  })`,
                }}
              >
                ${priceRange[0]}
              </div>

              {/* Max value label that moves with thumb */}
              <div
                className="absolute top-6 bg-white text-sm font-medium whitespace-nowrap"
                style={{
                  left: `${(priceRange[1] / 300) * 100}%`,
                  transform: `translateX(${
                    priceRange[1] / 300 < 0.15
                      ? "0%"
                      : priceRange[1] / 300 > 0.85
                      ? "-100%"
                      : "-50%"
                  })`,
                }}
              >
                ${priceRange[1]}
              </div>

              {/* Min range input */}
              <input
                type="range"
                min="0"
                max="300"
                value={priceRange[0]}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (value < priceRange[1]) {
                    setPriceRange([value, priceRange[1]]);
                  }
                }}
                className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:shadow-none [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0"
              />

              {/* Max range input */}
              <input
                type="range"
                min="0"
                max="300"
                value={priceRange[1]}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (value > priceRange[0]) {
                    setPriceRange([priceRange[0], value]);
                  }
                }}
                className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:shadow-none [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0"
              />
            </div>
          </div>
        </div>

        <hr className="border-black/10 mb-6" />

        {/* Colors */}
        <div className="mb-6">
          <button
            className="flex justify-between items-center w-full"
            onClick={() =>
              setDropDowns((prev) => ({ ...prev, colors: !prev.colors }))
            }
          >
            <h3 className="satoshi text-xl font-bold ">Colors</h3>
            <ScCaretRight
              opacity="1"
              className={twMerge(
                "size-4 transition-transform ease-in-out duration-300",
                dropDowns.colors ? "rotate-270" : "rotate-90"
              )}
            />
          </button>
          <div
            className={twMerge(
              "overflow-hidden transition-all duration-300 ease-in-out",
              dropDowns.colors ? "max-h-[1000px] overflow-auto" : "max-h-0"
            )}
          >
            <div className="grid grid-cols-5 mt-5 gap-4">
              {colors.map((color) => (
                <button
                  key={color.name}
                  className="aspect-square flex items-center justify-center border-2 rounded-full border-black/20 transition-colors"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  onClick={() => toggleColor(color.name)}
                >
                  {selectedColors.includes(color.name) && (
                    <ScCheck
                      color={
                        checkLightness(color.hex) === "light"
                          ? "#707070"
                          : "white"
                      }
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <hr className="border-black/10 mb-6" />

        {/* Sizes */}
        <div className="mb-6">
          <button
            className="flex justify-between items-center w-full"
            onClick={() =>
              setDropDowns((prev) => ({ ...prev, size: !prev.size }))
            }
          >
            <h3 className="satoshi text-xl font-bold ">Size</h3>
            <ScCaretRight
              opacity="1"
              className={twMerge(
                "size-4 transition-transform ease-in-out duration-300",
                dropDowns.size ? "rotate-270" : "rotate-90"
              )}
            />
          </button>
          <div
            className={twMerge(
              "overflow-hidden transition-all duration-300 ease-in-out",
              dropDowns.size ? "max-h-[1000px] overflow-auto" : "max-h-0"
            )}
          >
            <div className="flex flex-wrap items-center mt-5 gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`px-5 py-2.5 rounded-full text-sm transition-all ${
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
        </div>

        {/* Apply Filter Button */}
        <Button className="w-full">Reset Filters</Button>
      </div>
    </aside>
  );
}

export default ProductsFilter;
