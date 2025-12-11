import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import React, { useState } from "react";
import Container from "./Container";
import ScClose from "../assets/icons/ScClose";
import Navigation from "./Navigation";

function Header() {
  // Top promotional bar
  const [isPromoVisible, setIsPromoVisible] = useState(true);
  return (
    <React.Fragment>
      {/* Promotional Bar */}
      <div
        className={twMerge(
          "bg-black overflow-hidden text-xs sm:text-sm transition-all duration-300 ease-in-out text-white",
          isPromoVisible ? "max-h-20" : "max-h-0"
        )}
      >
        <Container className="flex  py-2.5">
          <p className="flex-1 text-center">
            Sign up and get 20% off to your first order.{" "}
            <Link to="#" className="font-medium underline">
              Sign Up Now
            </Link>
          </p>
          <button
            className="hidden sm:flex icon-btn"
            onClick={() => setIsPromoVisible(false)}
          >
            <ScClose />
          </button>
        </Container>
      </div>
      {/* Navigation Bar */}
      <Navigation />
    </React.Fragment>
  );
}

export default Header;
