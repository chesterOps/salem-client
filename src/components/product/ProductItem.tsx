import React from "react";
import Stars from "../Stars";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

function ProductItem({
  product,
  imgCss,
}: {
  product: {
    id: number;
    image: string;
    name: string;
    slug: string;
    rating: number;
    price: number;
    discount?: number;
  };
  imgCss?: string;
}) {
  // Calculate discounted price
  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  return (
    <div className="flex flex-col">
      {/* Product Image Container */}
      <Link
        to={`/product/${product.slug}`}
        className="bg-[#F0EEED] rounded-[13px] justify-center items-center flex mb-2.5 lg:mb-4 lg:rounded-[20px] overflow-hidden group"
      >
        <img
          src={product.image}
          alt={product.name}
          className={twMerge(
            "md:w-full h-full block w-[200px] object-cover group-hover:scale-110 transition-transform duration-300",
            imgCss && imgCss
          )}
        />
      </Link>

      {/* Product Info */}
      <div className="flex flex-col">
        {/* Product Name */}
        <Link to={`/product/${product.slug}`}>
          <h3 className="text-base leading-[22px] lg:text-[20px] lg:leading-7 mb-1 lg:mb-2 font-bold satoshi line-clamp-2 cursor-pointer">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-[11px] lg:gap-[13px] mb-1 lg:mb-2">
          <Stars rating={product.rating} starClassName="size-4 lg:size-4.5" />
          <span className="text-xs lg:text-sm  text-black">
            {product.rating}/<span className="text-black/60">5</span>
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-[5px] lg:gap-2.5">
          <span className="text-xl leading-7 lg:text-2xl lg:leading-8 font-bold">
            ${discountedPrice.toFixed(0)}
          </span>
          {product.discount && (
            <React.Fragment>
              <span className="text-xl leading-7 lg:text-2xl lg:leading-8 font-bold text-black/40 line-through">
                ${product.price.toFixed(0)}
              </span>
              <span className="flex justify-center items-center w-[42px] h-5 rounded-full font-medium leading-3.5 text-[#FF3333] bg-[#FF3333]/10 text-[10px] lg:text-xs lg:leading-4 lg:w-14.5 lg:h-7">
                -{product.discount}%
              </span>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
