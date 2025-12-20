import { Link } from "react-router-dom";
import type { Product } from "../services/productApi";
import React from "react";

function SearchDropdown({
  products,
  isLoading,
  isOpen,
}: {
  products: Product[] | undefined;
  isLoading: boolean;
  isOpen: boolean;
}) {
  if (!isOpen) return null;
  return (
    <div className="absolute top-full mt-2 w-full left-0 bg-white rounded-[20px] shadow-lg max-h-[370px] overflow-y-auto z-50 border border-black/10">
      {isLoading ? (
        <div className="p-4 text-center text-black/60">Searching...</div>
      ) : products && products.length > 0 ? (
        <div className="py-2">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.slug}`}
              className="flex  gap-3 p-3 hover:bg-gray-50 transition-colors"
            >
              <img
                src={product.mainImage}
                alt={product.title}
                className="w-16 h-16 object-cover rounded-lg bg-[#F0EEED]"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-sm line-clamp-1">
                  {product.title}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-bold text-sm">
                    $
                    {product.discount
                      ? (product.price * (1 - product.discount / 100)).toFixed(
                          2
                        )
                      : product.price.toFixed(2)}
                  </span>
                  {product.discount && (
                    <React.Fragment>
                      <span className="text-xs text-black/40 line-through">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-xs text-[#FF3333] px-2 py-0.5 bg-[#FF3333]/10 rounded-full font-medium">
                        -{product.discount}%
                      </span>
                    </React.Fragment>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="p-4 text-center text-black/60">No products found</div>
      )}
    </div>
  );
}

export default SearchDropdown;
