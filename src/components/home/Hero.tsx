import Button from "../Button";
import Container from "../Container";

function Hero() {
  return (
    <section className=" bg-[#F2F0F1] ">
      <Container className="items-center min-h-[664px] xl:items-start justify-between flex flex-col xl:flex-row">
        <div className="flex flex-col gap-5 lg:gap-y-12 max-w-[596px]">
          <div>
            <h1 className="text-[36px] leading-[34px] mt-10 mb-5 lg:mt-[103px] lg:mb-6 lg:text-[64px] lg:leading-16">
              Find clothes that matches your style
            </h1>
            <p className="text-sm text-black/60 lg:text-base lg:leading-[22px] lg:max-w-[545px]">
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style.
            </p>
            <div className="mt-6 lg:mt-8">
              <Button
                color="black"
                className="min-w-[210px]  h-13! text-[16px]! w-full min-[500px]:w-auto"
              >
                Shop Now
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-y-3 items-center min-[500px]:flex-row">
            <div className="flex gap-7 lg:gap-8 items-center">
              <div>
                <h3 className="satoshi text-2xl lg:text-[40px] lg:leading-13.5 leading-8">
                  200+
                </h3>
                <p className="text-xs leading-[22px] lg:text-[16px] text-black/60">
                  International Brands
                </p>
              </div>
              <div className="w-px h-13 bg-black/10 lg:h-18.5"></div>
              <div>
                <h3 className="satoshi text-2xl lg:text-[40px] lg:leading-13.5 leading-8">
                  2000+
                </h3>
                <p className="text-xs leading-[22px] lg:text-[16px] text-black/60">
                  High-Quality Products
                </p>
              </div>
            </div>
            <div className="flex items-center gap-7">
              <div className="w-px h-13 bg-black/10 lg:h-18.5 hidden min-[500px]:block ml-7 lg:ml-8"></div>
              <div>
                <h3 className="satoshi text-2xl lg:text-[40px] lg:leading-13.5 leading-8">
                  30,000+
                </h3>
                <p className="text-xs leading-[22px] lg:text-[16px] text-black/60">
                  Happy Customers
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="self-end min-w-[50%] mx-auto xl:mx-0 mt-6 lg:mt-13.5 xl:mt-0">
          <img className="object-cover h-full w-full block" src="hero.jpg" />
        </div>
      </Container>
    </section>
  );
}

export default Hero;
