import Container from "../Container";
import Button from "../Button";
import ProductItem from "../product/ProductItem";
import { Link } from "react-router-dom";
import { products } from "../../data/products";
import { twMerge } from "tailwind-merge";

function TopSelling() {
  const topSellingProducts = products.slice(4, 8);
  return (
    <section className="mt-[50px] lg:mt-20">
      <Container>
        <div className="flex flex-col justify-center">
          <h1 className="text-center text-[32px] mb-8 lg:mb-[55px] leading-9 lg:text-[48px] lg:leading-[58px]">
            Top Selling
          </h1>
          {/* Top Selling Grid */}
          <div className="overflow-x-auto -mx-4 px-4 mb-6 lg:mb-9 scrollbar-hide">
            <div className="flex gap-4 lg:gap-5">
              {topSellingProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={twMerge(
                    " md:w-[calc(33.333%-11px)] lg:w-[calc(25%-15px)] shrink-0",
                    index === topSellingProducts.length - 1 && "pr-4 lg:pr-0"
                  )}
                >
                  <ProductItem product={product} />
                </div>
              ))}
            </div>
          </div>
          {/* Shop button */}
          <div className="flex justify-center">
            <Link to="/shop" className="w-full min-[400px]:w-auto">
              <Button
                color="white"
                className="w-full min-[400px]:w-auto min-w-[218px] h-[46px] lg:h-[52px]"
              >
                View All
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default TopSelling;
