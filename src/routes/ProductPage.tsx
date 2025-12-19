import { BsCheck2Circle } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../cartSlice";
import { useGetProductByIdQuery } from "../services/productApi";
import { checkLightness, unSlugify } from "../utils/helpers";
import React, { useEffect, useState } from "react";
import ScCheck from "../assets/icons/ScCheck";
import ScMinus from "../assets/icons/ScMinus";
import ScPlus from "../assets/icons/ScPlus";
import BreadCrumb from "../components/BreadCrumb";
import Button from "../components/Button";
import Container from "../components/Container";
import RelatedProducts from "../components/product/RelatedProducts";
import Stars from "../components/Stars";
import { sizes } from "../utils/constants";
import ProductImages from "../components/product/ProductImages";
import ProductPageSkeleton from "../components/product/ProductPageSkeleton";
import NotFound from "./NotFound";
import useDocumentTitle from "../hooks/useDocumentTitle";

function ProductPage() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { data: product, error, isLoading } = useGetProductByIdQuery(`${id}`);
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] ?? "");
  const [selectedColor, setSelectedColor] = useState(
    product?.colors[0].name ?? ""
  );
  const dispatch = useDispatch();

  // Unslugify product slug
  const pageTitle = unSlugify(id || "");

  useDocumentTitle(pageTitle);

  // Set selected size and color when product data is loaded
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
      setSelectedColor(product.colors[0].name);
    }
  }, [product]);

  const discountedPrice =
    product && product.discount
      ? product.price * (1 - product.discount / 100)
      : product?.price;

  const handleQuantityChange = (type: "increment" | "decrement") => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Handle add to cart
  function handleAddToCart() {
    // Dispatch add to cart action
    if (product)
      dispatch(
        addItem({
          id: `${product.id}-${selectedSize}-${selectedColor}`,
          price: product.price,
          size: selectedSize,
          color: selectedColor,
          title: product.title,
          image: product.mainImage,
          slug: product.slug,
          discount: product.discount,
          quantity,
        })
      );

    // Show added state
    setAdded(true);

    // Reset added state after 2 seconds
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  }
  console.log(error);

  if (isLoading) return <ProductPageSkeleton />;

  if ((error as any)?.status === 404 || !product) {
    return (
      <NotFound
        title="Product not found"
        message="The product you're looking for doesn't exist or has been removed."
      />
    );
  } else if (error) {
    return (
      <NotFound
        title="Error loading product"
        message="We encountered an error while loading this product."
      />
    );
  }

  return (
    <main>
      {/* BreadCrumb */}
      <BreadCrumb
        links={[{ name: "Shop", url: "/shop" }, { name: product.title }]}
      />

      {/* Product Details */}
      <section className="lg:pt-3 pt-4">
        <Container>
          <div className="-mx-4 px-4 lg:gap-10 gap-5 flex flex-wrap">
            {/* Product Images */}
            <ProductImages product={product} />
            {/* Product Info */}
            <div className="flex flex-col w-full md:w-[calc(50%-20px)]">
              <h1 className="text-2xl leading-7 lg:text-[40px] lg:leading-12 mb-3 lg:mb-3.5">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-3 lg:mb-3.5">
                <Stars rating={product.rating} />
                <span className="text-sm lg:text-base lg:leading-[22px]">
                  {product.rating}/<span className="text-black/60">5</span>
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2.5 lg:gap-3 mb-5">
                <span className="text-2xl leading-8 lg:leading-[43px] lg:text-[32px] font-bold satoshi">
                  ${discountedPrice}
                </span>
                {product.discount && (
                  <React.Fragment>
                    <span className="text-2xl leading-8 lg:leading-[43px] lg:text-[32px] font-bold satoshi text-black/40 line-through">
                      ${product.price}
                    </span>
                    <span className="bg-[#FF3333]/10 text-[#FF3333] flex items-center w-15.5 h-[31px] justify-center lg:w-18 lg:h-8.5 text-sm lg:text-base lg:leading-5.5 font-medium rounded-full">
                      -{product.discount}%
                    </span>
                  </React.Fragment>
                )}
              </div>

              <p className="text-sm lg:text-base lg:leading-[22px] text-black/60 pb-6 mb-6 border-b border-b-black/10">
                {product.description}
              </p>

              {/* Color Selection */}
              <div className="mb-6 pb-6 border-b border-b-black/10">
                <p className="text-sm lg:text-base lg:leading-5.5 text-black/60 mb-4">
                  Select Colors
                </p>
                <div className="flex gap-3  items-center lg:gap-4">
                  {product.colors.map((color: any) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-10 h-10 lg:w-[37px] font-medium border-2 border-black/20 lg:h-[37px] flex justify-center items-center rounded-full transition-all`}
                      style={{ backgroundColor: color.hex }}
                      aria-label={color.name}
                    >
                      {selectedColor === color.name && (
                        <ScCheck
                          className="size-[17px] lg:size-4"
                          color={
                            checkLightness(color.hex) === "light"
                              ? "#707070"
                              : "white"
                          }
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6 pb-6 border-b border-b-black/10">
                <p className="text-sm lg:text-base lg:leading-5.5 text-black/60 mb-4">
                  Choose Size
                </p>
                <div className="flex flex-wrap gap-2 lg:gap-3">
                  {product.sizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-5 py-2 rounded-full flex justify-between items-center h-[39px] lg:h-11.5 lg:py-3 lg:px-6 text-sm lg:text-base transition-all duration-200 ease-in-out ${
                        selectedSize === size
                          ? "bg-black text-white"
                          : "bg-[#F0F0F0] text-black/60 hover:bg-black/10 "
                      }`}
                    >
                      {sizes[size as keyof typeof sizes] || size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex flex-col min-[400px]:flex-row gap-3 lg:gap-5">
                {/* Quantity Selector */}
                <div className="flex items-center justify-between h-11 lg:h-13 bg-[#F0F0F0] rounded-full px-4 py-3 lg:py-3.5 lg:px-5 w-[110px] min-[500px]:w-[170px]">
                  <button
                    onClick={() => handleQuantityChange("decrement")}
                    className="hover:opacity-70 transition-opacity"
                    aria-label="Decrease quantity"
                  >
                    <ScMinus className="size-5 lg:size-6" />
                  </button>
                  <span className="text-sm font-medium lg:text-base lg:leading-5.5 satoshi flex-1 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange("increment")}
                    className="hover:opacity-70 transition-opacity"
                    aria-label="Increase quantity"
                  >
                    <ScPlus className="size-5 lg:size-6" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <Button
                  color="black"
                  onClick={handleAddToCart}
                  className="flex-1 w-full max-w-100 lg:max-w-none gap-2  h-11 lg:h-13"
                  disabled={added}
                >
                  {added ? (
                    <React.Fragment>
                      <BsCheck2Circle size={24} /> Added to Cart
                    </React.Fragment>
                  ) : (
                    "Add to Cart"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Products */}
      <RelatedProducts />
    </main>
  );
}

export default ProductPage;
