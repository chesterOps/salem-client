import { useSearchParams } from "react-router-dom";
import type { Product } from "../services/productApi";
import { useMemo } from "react";
import { sizes } from "../utils/constants";

function useSortFilter(products: Product[]) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "newest";

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
  const sortedProducts = useMemo<Product[]>(() => {
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
        return filtered;
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
        return filtered;
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

  const handleSortChange = (value: string) => {
    // Spread existing params to retain filters

    setSearchParams({
      ...Object.fromEntries(searchParams),
      sortBy: value,
      page: "1",
    });
  };

  return {
    sortedProducts,
    sortBy,
    handleSortChange,
  };
}

export default useSortFilter;
