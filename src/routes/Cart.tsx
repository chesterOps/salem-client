import { useState } from "react";
import { products } from "../data/products";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import Button from "../components/Button";
import ScMinus from "../assets/icons/ScMinus";
import ScPlus from "../assets/icons/ScPlus";
import ScCoupon from "../assets/icons/ScCoupon";
import ScArrowLeft from "../assets/icons/ScArrowLeft";
import ScTrash from "../assets/icons/ScTrash";

interface CartItem {
  id: number;
  name: string;
  image: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
}

function Cart() {
  // Sample cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: products[0].name,
      image: products[0].image,
      size: "Large",
      color: "Olive",
      price: products[0].price,
      quantity: 1,
    },
    {
      id: 2,
      name: products[1].name,
      image: products[1].image,
      size: "Medium",
      color: "Blue",
      price: products[1].discount
        ? products[1].price * (1 - products[1].discount / 100)
        : products[1].price,
      quantity: 1,
    },
    {
      id: 3,
      name: products[3].name,
      image: products[3].image,
      size: "Small",
      color: "Red",
      price: products[3].discount
        ? products[3].price * (1 - products[3].discount / 100)
        : products[3].price,
      quantity: 1,
    },
  ]);

  const updateQuantity = (id: number, type: "increment" | "decrement") => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                type === "increment"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = subtotal * 0.2; // 20% discount
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  return (
    <main>
      {/* Breadcrumb */}
      <BreadCrumb links={[{ name: "Cart" }]} />
      <Container className="mb-[50px] lg:mb-20">
        <h1 className="text-[32px] mb-5 lg:mb-6 leading-9.5 lg:text-[40px] lg:leading-12">
          your cart
        </h1>
        <div className="-mx-4 px-4 flex flex-wrap gap-5">
          {/* Cart Items */}

          <div className="lg:w-[calc(58.5%-10px)] w-full border border-black/10 rounded-[20px] p-3.5 lg:py-5 lg:px-6">
            <div className="space-y-4 lg:space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 lg:gap-4 pb-4 lg:pb-6 border-b border-black/10 last:border-b-0 last:pb-0"
                >
                  {/* Product Image */}
                  <div className="size-[99px] lg:size-[124px] group rounded-[9px] bg-[#F0EEED] overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-base lg:text-xl satoshi font-bold leading-5.5 lg:leading-7">
                          {item.name}
                        </h3>
                        {/* Delete Button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="cursor-pointer icon-btn"
                        >
                          <ScTrash className="size-5 lg:size-6" />
                        </button>
                      </div>
                      <p className="text-xs text-black mb-0.5 lg:mb-1 lg:text-sm">
                        Size: <span className="text-black/60">{item.size}</span>
                      </p>
                      <p className="text-xs text-black mb-0.5 lg:mb-1 lg:text-sm">
                        Color:{" "}
                        <span className="text-black/60">{item.color}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xl leading-7 lg:text-2xl lg:leading-8 font-bold satoshi">
                        ${item.price}
                      </span>

                      {/* Quantity Control */}
                      <div className="flex items-center justify-between h-[31px] w-[105px] lg:w-[126px] lg:h-11 bg-[#F0F0F0] rounded-full px-3.5 lg:px-5 py-2 lg:py-3">
                        <button
                          onClick={() => updateQuantity(item.id, "decrement")}
                          className="hover:opacity-70 transition-opacity"
                          aria-label="Decrease quantity"
                        >
                          <ScMinus className="size-4 lg:size-5" />
                        </button>
                        <span className="text-sm lg:text-base font-medium satoshi min-w-3 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, "increment")}
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
                  ${subtotal.toFixed(0)}
                </span>
              </div>
              <div className="flex justify-between text-base leading-5.5 lg:text-xl lg:leading-7 text-black/60">
                <span>Discount</span>
                <span className="font-bold text-[#FF3333] satoshi">
                  -${discount.toFixed(0)}
                </span>
              </div>
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
              <div className="flex items-center gap-2.5 lg:gap-3 flex-1 px-4 bg-[#F0F0F0] py-3.5 lg:py-3 rounded-full text-sm lg:text-base lg:leading-5.5">
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
            <Button color="black" className="w-full h-[54px] gap-3 lg:h-[60px]">
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
      </Container>
    </main>
  );
}

export default Cart;
