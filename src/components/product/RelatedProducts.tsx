import { twMerge } from "tailwind-merge";
import { products } from "../../data/products";
import Container from "../Container";
import ProductItem from "./ProductItem";

function RelatedProducts() {
  const relatedProducts = products.slice(4, 8);
  return (
    <section className="mt-[50px] lg:mt-20">
      <Container>
        <div className="flex flex-col justify-center">
          <h1 className="text-center text-[32px] mb-8 lg:mb-[55px] leading-9 lg:text-[48px] lg:leading-[58px]">
            You might also like
          </h1>
          {/* Related Products Grid */}
          <div className="overflow-x-auto -mx-4 px-4 mb-[50px] lg:mb-20 scrollbar-hide">
            <div className="flex gap-4 lg:gap-5">
              {relatedProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={twMerge(
                    " md:w-[calc(33.333%-11px)] lg:w-[calc(25%-15px)] shrink-0",
                    index === relatedProducts.length - 1 && "pr-4 lg:pr-0"
                  )}
                >
                  <ProductItem product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default RelatedProducts;
