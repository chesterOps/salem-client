import { twMerge } from "tailwind-merge";

function ProductLoader({
  length = 4,
  productClassName,
}: {
  length?: number;
  productClassName?: string;
}) {
  return (
    <>
      {Array.from({ length }).map((_, index) => (
        <div
          key={index}
          className={twMerge(
            "flex flex-col animate-pulse",
            productClassName && productClassName
          )}
        >
          <div className="bg-gray-200 rounded-[13px] lg:rounded-[20px] mb-2.5 lg:mb-4 h-[200px] w-full lg:h-[298px]" />

          {/* Product Info Skeleton */}
          <div className="flex flex-col">
            {/* Product Name Skeleton */}
            <div className="h-5 lg:h-6 bg-gray-200 rounded mb-1 lg:mb-2 w-3/4" />
            {/* Rating Skeleton */}
            <div className="h-4 lg:h-5 bg-gray-200 rounded mb-1 lg:mb-2 w-1/3" />

            {/* Price Skeleton */}
            <div className="flex items-center gap-[5px] lg:gap-2.5">
              <div className="h-7 lg:h-8 bg-gray-200 rounded w-16 lg:w-20" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default ProductLoader;
