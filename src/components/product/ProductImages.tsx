import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

function ProductImages({ product }: { product: any }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="flex flex-col gap-3 xl:flex-row lg:gap-3.5 w-full md:w-[calc(50%-20px)]">
      {/* Main Image */}
      <div className="w-full rounded-[20px] bg-[#F0EEED] xl:h-full aspect-square border border-[#e4e4e4] overflow-hidden order-1 xl:order-2 flex-1">
        <Swiper
          spaceBetween={10}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          loop={true}
          modules={[FreeMode, Thumbs]}
          className="h-full"
        >
          {product.images.map((img: string, i: number) => (
            <SwiperSlide key={i} className="h-full">
              <img
                src={img}
                alt={`${product.title} ${i + 1}`}
                className="w-full h-full object-bottom object-contain xl:object-cover cursor-pointer"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Thumbnail Images */}
      <div className="order-2 xl:order-1 xl:w-[152px]">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={12}
          slidesPerView={3}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
          direction="horizontal"
          breakpoints={{
            1280: {
              direction: "vertical",
              spaceBetween: 14,
            },
          }}
          className="thumbs-swiper h-auto! xl:h-full!"
        >
          {product.images.map((img: string, i: number) => (
            <SwiperSlide key={i}>
              <div className="w-full lg:w-[152px] h-[106px] min-[400px]:h-auto bg-[#F0EEED] aspect-square xl:h-[178px] rounded-[20px] border border-[#e4e4e4] overflow-hidden cursor-pointer hover:border-black/30 transition-all">
                <img
                  src={img}
                  alt={`${product.title} view ${i + 1}`}
                  className="w-full h-full object-bottom object-contain xl:object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default ProductImages;
