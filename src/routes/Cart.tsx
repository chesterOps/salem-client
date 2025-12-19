import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  getCartDiscountTotal,
  getCartItems,
  getCartTotal,
  increaseQuantity,
  removeItem,
} from "../cartSlice";
import ScArrowLeft from "../assets/icons/ScArrowLeft";
import ScCart from "../assets/icons/ScCart";
import ScCoupon from "../assets/icons/ScCoupon";
import ScMinus from "../assets/icons/ScMinus";
import ScPlus from "../assets/icons/ScPlus";
import ScTrash from "../assets/icons/ScTrash";
import BreadCrumb from "../components/BreadCrumb";
import Button from "../components/Button";
import Container from "../components/Container";
import { Link } from "react-router-dom";
import { sizes } from "../utils/constants";
import useDocumentTitle from "../hooks/useDocumentTitle";

function Cart() {
  // Get cart items from Redux store
  const cartItems = useSelector(getCartItems);

  // Discount total
  const discount = useSelector(getCartDiscountTotal);

  // Subtotal
  const subTotal = useSelector(getCartTotal);

  useDocumentTitle("Cart");

  // Delivery fee - fixed
  const deliveryFee = 15;

  const dispatch = useDispatch();

  // Total
  const total = subTotal - discount + deliveryFee;

  return (
    <main>
      {/* Breadcrumb */}
      <BreadCrumb links={[{ name: "Cart" }]} />
      <Container className="">
        <h1 className="text-[32px] mb-5 lg:mb-6 leading-9.5 lg:text-[40px] lg:leading-12">
          your cart
        </h1>
        {/* Check if cartItems is empty */}

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 lg:py-32">
            {/* Cart Icon */}
            <div className="mb-6 lg:mb-8 p-8 bg-black/5 rounded-full">
              <ScCart size={80} color="#00000040" />
            </div>

            {/* Empty State Text */}
            <h2 className="text-2xl lg:text-3xl font-bold mb-3 lg:mb-4 satoshi">
              Your cart is empty
            </h2>
            <p className="text-black/60 text-base lg:text-lg mb-6 text-center max-w-md">
              Looks like you haven't added any items to your cart yet.
            </p>

            {/* Continue Shopping Button */}
            <Link to="/shop">
              <Button color="black" className="px-8  h-[42px]">
                <span className="text-sm lg:text-base">Return to Shop</span>
              </Button>
            </Link>
          </div>
        ) : (
          <div className="-mx-4 px-4 flex flex-wrap gap-5 mb-[50px] lg:mb-20">
            {/* Cart Items */}

            <div className="lg:w-[calc(58.5%-10px)] w-full h-fit border border-black/10 rounded-[20px] p-3.5 lg:py-5 lg:px-6">
              <div className="space-y-4 lg:space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3.5 lg:gap-4 pb-4 lg:pb-6 border-b border-black/10 last:border-b-0 last:pb-0"
                  >
                    {/* Product Image */}
                    <Link
                      to={`/product/${item.slug}`}
                      className="size-[99px] lg:size-[124px] group rounded-[9px] bg-[#F0EEED] overflow-hidden shrink-0"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between gap-2 items-start mb-1">
                          <Link
                            to={`/product/${item.slug}`}
                            className="wrap-break-word"
                          >
                            <h3 className="text-base lg:text-xl  satoshi font-bold leading-5.5 lg:leading-7">
                              {item.title}
                            </h3>
                          </Link>
                          {/* Delete Button */}
                          <button
                            onClick={() =>
                              dispatch(removeItem({ id: item.id }))
                            }
                            className="cursor-pointer icon-btn"
                          >
                            <ScTrash className="size-5 lg:size-6" />
                          </button>
                        </div>
                        <p className="text-xs text-black mb-0.5 lg:mb-1 lg:text-sm">
                          Size:{" "}
                          <span className="text-black/60">
                            {sizes[item.size as keyof typeof sizes] ||
                              item.size}
                          </span>
                        </p>
                        <p className="text-xs text-black mb-0.5 lg:mb-1 lg:text-sm">
                          Color:{" "}
                          <span className="text-black/60">{item.color}</span>
                        </p>
                      </div>

                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2 lg:gap-2.5">
                          <span className="text-xl leading-7 lg:text-2xl lg:leading-8 font-bold satoshi">
                            $
                            {item.discount
                              ? (
                                  item.price -
                                  (item.price * item.discount) / 100
                                ).toFixed(0)
                              : item.price}
                          </span>
                          {item.discount && (
                            <>
                              <span className="text-xl leading-7 lg:text-2xl lg:leading-8 font-bold satoshi text-black/40 line-through">
                                ${item.price}
                              </span>
                              <span className="text-[10px] lg:text-xs leading-3.5 font-medium text-[#FF3333] bg-[#FF3333]/10 rounded-full px-2 lg:px-3.5 py-1.5">
                                -{item.discount}%
                              </span>
                            </>
                          )}
                        </div>

                        {/* Quantity Control */}
                        <div className="flex items-center justify-between h-[31px] w-[105px] lg:w-[126px] lg:h-11 bg-[#F0F0F0] rounded-full px-3.5 lg:px-5 py-2 lg:py-3">
                          <button
                            onClick={() =>
                              dispatch(decreaseQuantity({ id: item.id }))
                            }
                            className="hover:opacity-70 transition-opacity"
                            aria-label="Decrease quantity"
                          >
                            <ScMinus className="size-4 lg:size-5" />
                          </button>
                          <span className="text-sm lg:text-base font-medium satoshi min-w-3 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              dispatch(increaseQuantity({ id: item.id }))
                            }
                            className="hover:opacity-70 transition-opacity"
                            aria-label="Increase quantity"
                          >
                            <ScPlus className="size-4 lg:size-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Order Summary */}
            <div className="lg:w-[calc(41.5%-10px)] w-full border border-black/10 rounded-[20px] p-5 lg:px-6 h-fit">
              <h2 className="text-xl leading-7 satoshi lg:text-2xl lg:leading-8 font-bold mb-4 lg:mb-6">
                Order Summary
              </h2>

              <div className="space-y-5 mb-5 pb-5 border-b border-black/10">
                <div className="flex justify-between text-base leading-5.5 lg:text-xl lg:leading-7 text-black/60">
                  <span>Subtotal</span>
                  <span className="font-bold text-black satoshi">
                    ${subTotal.toFixed(0)}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-base leading-5.5 lg:text-xl lg:leading-7 text-black/60">
                    <span>Discount</span>
                    <span className="font-bold text-[#FF3333] satoshi">
                      -${discount.toFixed(0)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-base leading-5.5 lg:text-xl lg:leading-7 text-black/60">
                  <span>Delivery Fee</span>
                  <span className="font-bold text-black satoshi">
                    ${deliveryFee.toFixed(0)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between text-base leading-5.5 lg:text-xl lg:leading-7 pb-5 lg:pb-6">
                <span>Total</span>
                <span className="satoshi font-bold text-xl leading-7 lg:text-2xl lg:leading-8">
                  ${total.toFixed(0)}
                </span>
              </div>

              {/* Promo Code */}
              <div className="flex gap-3 flex-col min-[400px]:flex-row mb-4 lg:mb-6">
                <div className="flex items-center gap-2.5 lg:gap-3 flex-1 min-w-0 px-4 bg-[#F0F0F0] py-3.5 lg:py-3 rounded-full text-sm lg:text-base lg:leading-5.5">
                  <ScCoupon className="size-5 lg:size-6" />
                  <input
                    type="text"
                    placeholder="Add promo code"
                    className="flex-1 placeholder:text-black/40 min-w-0 outline-none"
                  />
                </div>

                <Button color="black" className="px-[26px] lg:w-[119px] h-12">
                  Apply
                </Button>
              </div>

              {/* Checkout Button */}
              <Button
                color="black"
                className="w-full h-[54px] gap-3 lg:h-[60px]"
              >
                <span className="text-sm lg:text-base lg:leading-5.5">
                  Go to Checkout
                </span>
                <ScArrowLeft
                  color="#ffffff"
                  className="rotate-180 size-5 lg:size-6"
                />
              </Button>
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}

export default Cart;
