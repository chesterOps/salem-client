import { useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import Button from "../components/Button";
import { products } from "../data/products";

function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("card");

  // Sample order items
  const orderItems = [
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
  ];

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = subtotal * 0.2;
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  return (
    <main>
      <BreadCrumb
        links={[{ name: "Cart", url: "/cart" }, { name: "Checkout" }]}
      />

      <Container>
        <h1 className="text-[32px] mb-8 lg:mb-10 leading-9.5 lg:text-[40px] lg:leading-12">
          Checkout
        </h1>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-5">
          {/* Checkout Form */}
          <div className="flex-1 lg:max-w-[715px]">
            {/* Contact Information */}
            <div className="border border-black/10 rounded-[20px] p-5 lg:p-6 mb-5">
              <h2 className="text-xl lg:text-2xl font-bold mb-6">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm lg:text-base text-black/60 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="John"
                      className="w-full px-4 py-3 bg-[#F0F0F0] rounded-lg text-sm lg:text-base outline-none focus:ring-2 focus:ring-black/10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm lg:text-base text-black/60 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="w-full px-4 py-3 bg-[#F0F0F0] rounded-lg text-sm lg:text-base outline-none focus:ring-2 focus:ring-black/10"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm lg:text-base text-black/60 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john.doe@example.com"
                    className="w-full px-4 py-3 bg-[#F0F0F0] rounded-lg text-sm lg:text-base outline-none focus:ring-2 focus:ring-black/10"
                  />
                </div>
                <div>
                  <label className="block text-sm lg:text-base text-black/60 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 234 567 8900"
                    className="w-full px-4 py-3 bg-[#F0F0F0] rounded-lg text-sm lg:text-base outline-none focus:ring-2 focus:ring-black/10"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="border border-black/10 rounded-[20px] p-5 lg:p-6 mb-5">
              <h2 className="text-xl lg:text-2xl font-bold mb-6">
                Shipping Address
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm lg:text-base text-black/60 mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    placeholder="123 Main Street"
                    className="w-full px-4 py-3 bg-[#F0F0F0] rounded-lg text-sm lg:text-base outline-none focus:ring-2 focus:ring-black/10"
                  />
                </div>
                <div>
                  <label className="block text-sm lg:text-base text-black/60 mb-2">
                    Apartment, suite, etc. (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Apartment 4B"
                    className="w-full px-4 py-3 bg-[#F0F0F0] rounded-lg text-sm lg:text-base outline-none focus:ring-2 focus:ring-black/10"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm lg:text-base text-black/60 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      placeholder="New York"
                      className="w-full px-4 py-3 bg-[#F0F0F0] rounded-lg text-sm lg:text-base outline-none focus:ring-2 focus:ring-black/10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm lg:text-base text-black/60 mb-2">
                      State / Province
                    </label>
                    <input
                      type="text"
                      placeholder="NY"
                      className="w-full px-4 py-3 bg-[#F0F0F0] rounded-lg text-sm lg:text-base outline-none focus:ring-2 focus:ring-black/10"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm lg:text-base text-black/60 mb-2">
                      ZIP / Postal Code
                    </label>
                    <input
                      type="text"
                      placeholder="10001"
                      className="w-full px-4 py-3 bg-[#F0F0F0] rounded-lg text-sm lg:text-base outline-none focus:ring-2 focus:ring-black/10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm lg:text-base text-black/60 mb-2">
                      Country
                    </label>
                    <select className="w-full px-4 py-3 bg-[#F0F0F0] rounded-lg text-sm lg:text-base outline-none focus:ring-2 focus:ring-black/10 cursor-pointer">
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                      <option>Australia</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="border border-black/10 rounded-[20px] p-5 lg:p-6">
              <h2 className="text-xl lg:text-2xl font-bold mb-6">
                Payment Method
              </h2>
              <div className="space-y-4 mb-6">
                {/* Card Payment */}
                <label className="flex items-center gap-4 p-4 border border-black/10 rounded-lg cursor-pointer hover:border-black/30 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Credit / Debit Card</span>
                      <div className="flex gap-1">
                        <svg
                          width="32"
                          height="20"
                          viewBox="0 0 32 20"
                          fill="none"
                        >
                          <rect width="32" height="20" rx="4" fill="#1434CB" />
                          <circle cx="12" cy="10" r="6" fill="#EB001B" />
                          <circle cx="20" cy="10" r="6" fill="#F79E1B" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </label>

                {/* PayPal */}
                <label className="flex items-center gap-4 p-4 border border-black/10 rounded-lg cursor-pointer hover:border-black/30 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5"
                  />
                  <span className="font-medium">PayPal</span>
                </label>

                {/* Cash on Delivery */}
                <label className="flex items-center gap-4 p-4 border border-black/10 rounded-lg cursor-pointer hover:border-black/30 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5"
                  />
                  <span className="font-medium">Cash on Delivery</span>
                </label>
              </div>

              {/* Card Details (only show when card is selected) */}
              {paymentMethod === "card" && (
                <div className="space-y-4 pt-4 border-t border-black/10">
                  <div>
                    <label className="block text-sm lg:text-base text-black/60 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 bg-[#F0F0F0] rounded-lg text-sm lg:text-base outline-none focus:ring-2 focus:ring-black/10"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm lg:text-base text-black/60 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 bg-[#F0F0F0] rounded-lg text-sm lg:text-base outline-none focus:ring-2 focus:ring-black/10"
                      />
                    </div>
                    <div>
                      <label className="block text-sm lg:text-base text-black/60 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-3 bg-[#F0F0F0] rounded-lg text-sm lg:text-base outline-none focus:ring-2 focus:ring-black/10"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:min-w-[505px] lg:w-[calc(41.5%-10px)]">
            <div className="border border-black/10 rounded-[20px] p-5 lg:p-6 sticky top-5">
              <h2 className="text-xl lg:text-2xl font-bold mb-6">
                Order Summary
              </h2>

              {/* Order Items */}
              <div className="space-y-4 mb-6 pb-6 border-b border-black/10">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg bg-[#F0EEED] overflow-hidden shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm lg:text-base font-bold truncate mb-1">
                        {item.name}
                      </h3>
                      <p className="text-xs lg:text-sm text-black/60">
                        Size: {item.size} | Color: {item.color}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm lg:text-base font-bold satoshi">
                          ${item.price}
                        </span>
                        <span className="text-sm text-black/60">
                          Qty: {item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-5 mb-6 pb-6 border-b border-black/10">
                <div className="flex justify-between text-base lg:text-xl text-black/60">
                  <span>Subtotal</span>
                  <span className="font-bold text-black satoshi">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-base lg:text-xl text-black/60">
                  <span>
                    Discount <span className="text-red-500">(-20%)</span>
                  </span>
                  <span className="font-bold text-red-500 satoshi">
                    -${discount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-base lg:text-xl text-black/60">
                  <span>Delivery Fee</span>
                  <span className="font-bold text-black satoshi">
                    ${deliveryFee.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between text-xl lg:text-2xl font-bold mb-6">
                <span>Total</span>
                <span className="satoshi">${total.toFixed(2)}</span>
              </div>

              {/* Place Order Button */}
              <Button color="black" className="w-full h-[54px] lg:h-[60px]">
                Place Order
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}

export default Checkout;
