import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../../services/productApi";
import Container from "../Container";
import ProductItem from "../product/ProductItem";
import Button from "../Button";
import ProductLoader from "../product/ProductLoader";
import React from "react";

function NewArrivals() {
  const {
    data: newProducts,
    isLoading,
    error,
  } = useGetAllProductsQuery("limit=4");

  return (
    <section className="mt-[50px] lg:mt-20 mb-10 lg:mb-16">
      <Container>
        <div className="flex flex-col justify-center pb-10 lg:pb-16 border-b border-b-[#e4e4e4]">
          <h1 className="text-center text-[32px] mb-8 lg:mb-[55px] leading-9 lg:text-[48px] lg:leading-[58px]">
            New arrivals
          </h1>
          {/* New Arrivals Grid */}
          <div className="overflow-x-auto -mx-4 px-4 scrollbar-hide">
            {isLoading && (
              <div className="flex gap-4 lg:gap-5">
                <ProductLoader
                  length={4}
                  productClassName={twMerge(
                    " sm:w-[calc(33.333%-11px)] lg:w-[calc(25%-15px)] shrink-0 w-[calc(50%-8px)] min-w-[200px]"
                  )}
                />
              </div>
            )}
            {!isLoading && newProducts && (
              <React.Fragment>
                <div className="flex gap-4 lg:gap-5">
                  {newProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className={twMerge(
                        " md:w-[calc(33.333%-11px)] lg:w-[calc(25%-15px)] shrink-0",
                        index === newProducts.length - 1 && "pr-4 lg:pr-0"
                      )}
                    >
                      <ProductItem product={product} />
                    </div>
                  ))}
                </div>
                {/* Shop button */}
                <div className="flex justify-center mt-6 lg:mt-9 ">
                  <Link to="/shop" className="w-full min-[400px]:w-auto">
                    <Button
                      color="white"
                      className="w-full min-[400px]:w-auto min-w-[218px] h-[46px] lg:h-[52px]"
                    >
                      View All
                    </Button>
                  </Link>
                </div>
              </React.Fragment>
            )}
            {!isLoading && error && <div>Something went wrong.</div>}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default NewArrivals;
