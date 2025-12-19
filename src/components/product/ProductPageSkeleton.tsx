import Container from "../Container";

function ProductPageSkeleton() {
  return (
    <main className="mb-[50px] lg:mb-20">
      {/* BreadCrumb Skeleton */}
      <div className="animate-pulse py-6">
        <Container>
          <div className="flex gap-2 items-center">
            <div className="bg-gray-200 h-4 w-12 rounded" />
            <div className="bg-gray-200 h-4 w-1 rounded" />
            <div className="bg-gray-200 h-4 w-20 rounded" />
            <div className="bg-gray-200 h-4 w-1 rounded" />
            <div className="bg-gray-200 h-4 w-32 rounded" />
          </div>
        </Container>
      </div>

      {/* Product Details Skeleton */}
      <section className="lg:pt-3 pt-4">
        <Container>
          <div className="-mx-4 px-4 lg:gap-10 gap-5 flex flex-wrap animate-pulse">
            {/* Product Images Skeleton */}
            <div className="flex flex-col gap-3 xl:flex-row h-fit lg:gap-3.5 w-full md:w-[calc(50%-20px)]">
              {/* Main Image */}
              <div className="w-full rounded-[20px] bg-gray-200 aspect-square border  border-[#e4e4e4] overflow-hidden order-1 xl:order-2 flex-1" />

              {/* Thumbnail Images */}
              <div className="order-2 xl:order-1 xl:w-[152px]">
                <div className="flex xl:flex-col gap-3 lg:gap-3.5">
                  <div className="w-full bg-gray-200 aspect-square xl:h-[178px] rounded-[20px] border border-[#e4e4e4]" />
                  <div className="w-full bg-gray-200 aspect-square xl:h-[178px] rounded-[20px] border border-[#e4e4e4]" />
                  <div className="w-full bg-gray-200 aspect-square xl:h-[178px] rounded-[20px] border border-[#e4e4e4]" />
                </div>
              </div>
            </div>

            {/* Product Info Skeleton */}
            <div className="flex flex-col w-full md:w-[calc(50%-20px)]">
              {/* Title */}
              <div className="bg-gray-200 h-7 lg:h-12 w-3/4 rounded mb-3 lg:mb-3.5" />

              {/* Rating */}
              <div className="flex items-center gap-4 mb-3 lg:mb-3.5">
                <div className="bg-gray-200 w-40 h-5 rounded" />
              </div>

              {/* Price */}
              <div className="flex items-center gap-2.5 lg:gap-3 mb-5">
                <div className="bg-gray-200 w-24 h-8 lg:h-11 rounded" />
                <div className="bg-gray-200 w-20 h-8 lg:h-11 rounded" />
              </div>

              {/* Description */}
              <div className="pb-6 mb-6 border-b border-b-black/10 space-y-2">
                <div className="bg-gray-200 h-4 lg:h-5.5 w-full rounded" />
                <div className="bg-gray-200 h-4 lg:h-5.5 w-[95%] rounded" />
              </div>

              {/* Colors */}
              <div className="mb-6 pb-6 border-b border-b-black/10">
                <div className="bg-gray-200 h-4 lg:h-5.5 w-28 rounded mb-4" />
                <div className="flex gap-3 lg:gap-4 items-center">
                  <div className="rounded-full bg-gray-200 w-10 h-10 lg:w-[37px] lg:h-[37px]" />
                  <div className="rounded-full bg-gray-200 w-10 h-10 lg:w-[37px] lg:h-[37px]" />
                  <div className="rounded-full bg-gray-200 w-10 h-10 lg:w-[37px] lg:h-[37px]" />
                </div>
              </div>

              {/* Sizes */}
              <div className="mb-6 pb-6 border-b border-b-black/10">
                <div className="bg-gray-200 h-4 lg:h-5.5 w-24 rounded mb-4" />
                <div className="flex flex-wrap gap-2 lg:gap-3">
                  <div className="bg-gray-200 h-[39px] lg:h-11.5 w-[88px] rounded-full" />
                  <div className="bg-gray-200 h-[39px] lg:h-11.5 w-[88px] rounded-full" />
                  <div className="bg-gray-200 h-[39px] lg:h-11.5 w-[88px] rounded-full" />
                  <div className="bg-gray-200 h-[39px] lg:h-11.5 w-[88px] rounded-full" />
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex flex-col min-[400px]:flex-row gap-3 lg:gap-5">
                <div className="bg-gray-200 h-11 lg:h-13 w-[110px] min-[500px]:w-[170px] rounded-full" />
                <div className="bg-gray-200 h-11 lg:h-13 flex-1 max-w-100 lg:max-w-none rounded-full" />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

export default ProductPageSkeleton;
