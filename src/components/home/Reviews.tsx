import { useRef } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { reviews } from "../../data/reviews";
import ScArrowLeft from "../../assets/icons/ScArrowLeft";
import ScCheckCircle from "../../assets/icons/ScCheckCircle";
import ScStar from "../../assets/icons/ScStar";
import Container from "../Container";

function Reviews() {
  const swiperRef = useRef<SwiperType | null>(null);

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <section className="my-[50px] lg:my-20">
      <Container className="flex items-end justify-between flex-wrap min-[400px]:flex-nowrap gap-4 mb-6 lg:mb-10">
        <h1 className="text-[32px] leading-9 lg:text-[48px] lg:leading-[52px]">
          Our happy customers
        </h1>
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={handlePrev}
            className="active:opacity-50 hover:opacity-70 transition-opacity p-3 -m-3 touch-manipulation cursor-pointer bg-transparent border-0 outline-0 active:outline-0"
            aria-label="Previous review"
            type="button"
          >
            <ScArrowLeft />
          </button>
          <button
            onClick={handleNext}
            className="active:opacity-50 hover:opacity-70 transition-opacity p-3 -m-3 touch-manipulation cursor-pointer bg-transparent border-0 outline-0 active:outline-0"
            aria-label="Next review"
            type="button"
          >
            <ScArrowLeft className="rotate-180" />
          </button>
        </div>
      </Container>

      {/* Reviews Carousel */}
      <div className="sm:overflow-visible overflow-hidden ">
        <Container>
          <Swiper
            modules={[Autoplay]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            loop
            speed={500}
            initialSlide={2}
            spaceBetween={20}
            slidesPerView={1}
            centeredSlides
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                centeredSlides: true,
              },
              1024: {
                slidesPerView: 3,
                centeredSlides: true,
              },
            }}
            className="overflow-visible!"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id} className="h-auto!">
                <div className="bg-white border border-[#e4e4e4] rounded-[20px] p-6  lg:py-7 lg:px-8 h-full">
                  <div>
                    {/* Star Rating */}
                    <div className="flex gap-1 mb-3">
                      {[...Array(review.rating)].map((_, i) => (
                        <ScStar key={i} className="lg:size-[22px]" />
                      ))}
                    </div>

                    {/* Reviewer Name */}
                    <div className="flex items-center gap-1 mb-2 lg:mb-3">
                      <h3 className="font-bold satoshi text-base leading-[22px] lg:text-[20px]">
                        <span>{review.name}</span>
                      </h3>
                      <ScCheckCircle className="lg:size-6" />
                    </div>

                    {/* Review Text */}
                    <p className="text-[#757575] text-sm lg:text-base leading-[22px]">
                      "{review.comment}"
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </div>
    </section>
  );
}

export default Reviews;
