import { Link } from "react-router-dom";
import Container from "../Container";

function Categories() {
  return (
    <section className="mt-[50px] lg:mt-20">
      <Container>
        <div className="bg-[#f0f0f0] pb-7 pt-10 px-6 rounded-[20px] lg:rounded-[40px] lg:pt-[70px] lg:pb-[76px] lg:px-16 flex flex-col gap-7 lg:gap-16">
          <h1 className="text-center text-[32px] leading-9 lg:text-[48px] lg:leading-[58px]">
            browse by dress style
          </h1>

          <div className="flex flex-col gap-4 md:gap-5">
            <div className="flex flex-col gap-4 md:gap-5">
              <div className="sm:flex grid grid-rows-[repeat(2,200px)]  min-[480px]:grid-rows-[repeat(2,1fr)]  gap-4 sm:flex-wrap  sm:flex-row md:gap-5">
                <Link
                  to="/categories/casual"
                  className="bg-white w-full sm:w-[calc(50%-10px)] md:w-[calc(37.5%-10px)] flex hover:[&>img]:scale-110 rounded-[20px] overflow-hidden relative"
                >
                  <img
                    src="/casual.jpg"
                    alt="casual-category"
                    className="object-cover w-full h-full transition-transform duration-200 ease-in-out"
                  />
                  <h3 className="absolute top-4 left-6 satoshi font-bold text-[24px] leading-8 lg:text-[36px] lg:leading-[50px]">
                    Casual
                  </h3>
                </Link>
                <Link
                  to="/categories/formal"
                  className="bg-white w-full sm:w-[calc(50%-10px)] md:w-[calc(62.5%-10px)]   flex hover:[&>img]:scale-110 rounded-[20px] overflow-hidden relative"
                >
                  <img
                    src="/formal.jpg"
                    alt="formal-category"
                    className="object-cover w-full h-full transition-transform duration-200 ease-in-out"
                  />
                  <h3 className="absolute top-4 left-6 satoshi font-bold text-[24px] leading-8 lg:text-[36px] lg:leading-[50px]">
                    Formal
                  </h3>
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:gap-5">
              <div className="sm:flex grid grid-rows-[repeat(2,200px)]  min-[480px]:grid-rows-[repeat(2,1fr)]  gap-4 sm:flex-wrap  sm:flex-row md:gap-5">
                <Link
                  to="/categories/party"
                  className="bg-white w-full sm:w-[calc(50%-10px)] md:w-[calc(62.5%-10px)] flex hover:[&>img]:scale-110 rounded-[20px] overflow-hidden relative"
                >
                  <img
                    src="/party.jpg"
                    alt="party-category"
                    className="object-cover w-full h-full transition-transform duration-200 ease-in-out"
                  />
                  <h3 className="absolute top-4 left-6 satoshi font-bold text-[24px] leading-8 lg:text-[36px] lg:leading-[50px]">
                    Party
                  </h3>
                </Link>
                <Link
                  to="/categories/gym"
                  className="bg-white w-full sm:w-[calc(50%-10px)] md:w-[calc(37.5%-10px)] flex hover:[&>img]:scale-110 rounded-[20px] overflow-hidden relative"
                >
                  <img
                    src="/gym.jpg"
                    alt="gym-category"
                    className="object-cover w-full h-full transition-transform duration-200 ease-in-out"
                  />
                  <h3 className="absolute top-4 left-6 satoshi font-bold text-[24px] leading-8 lg:text-[36px] lg:leading-[50px]">
                    Gym
                  </h3>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Categories;
