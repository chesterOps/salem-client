import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { navigationLinks } from "../utils/constants";
import { getCartItemCount } from "../cartSlice";
import ScBars from "../assets/icons/ScBars";
import ScCart from "../assets/icons/ScCart";
import ScSearch from "../assets/icons/ScSearch";
import Container from "./Container";
import Logo from "./Logo";
import MobileNavigation from "./MobileNavigation";
import MobileSearch from "./MobileSearch";
import SearchBar from "./SearchBar";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const cartTotal = useSelector(getCartItemCount);

  return (
    <React.Fragment>
      <nav className="sticky top-0 z-50 bg-white py-5 lg:py-6 border-b border-b-[#f2f2f2]">
        <Container className="flex gap-x-10 justify-between items-center">
          <div className="flex gap-x-4 items-center">
            <button
              className="lg:hidden icon-btn"
              onClick={() => setIsOpen(true)}
            >
              <ScBars />
            </button>
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <ul className="hidden lg:flex list-none items-center gap-x-6">
            <li>
              <NavLink to={navigationLinks[0].href}>
                {({ isActive }) => (
                  <span
                    className={twMerge(
                      "text-black transition-colors duration-200 hover:text-black/60 ease-in-out",
                      isActive && "text-black/60"
                    )}
                  >
                    {navigationLinks[0].name}
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to={navigationLinks[1].href}>
                {({ isActive }) => (
                  <span
                    className={twMerge(
                      "text-black transition-colors duration-200 hover:text-black/60 ease-in-out",
                      isActive && "text-black/60"
                    )}
                  >
                    {navigationLinks[1].name}
                  </span>
                )}
              </NavLink>
            </li>

            {navigationLinks.slice(2).map((link) => (
              <li key={link.name} className="text-base leading-[22px]">
                <Link to={link.href}>
                  <span
                    className={
                      "text-black transition-colors duration-200 hover:text-black/60 ease-in-out"
                    }
                  >
                    {link.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          {/* Desktop Search Bar */}
          <SearchBar />
          <div className="flex items-center gap-3 lg:gap-0">
            {/* Search Icon */}
            <div className="cursor-pointer flex items-center">
              <button
                className={twMerge(
                  "lg:hidden icon-btn",
                  isMobileSearchOpen && "pointer-events-none"
                )}
                onClick={() => setIsMobileSearchOpen((prev) => !prev)}
              >
                <ScSearch fillOpacity="1" />
              </button>
            </div>
            {/* Cart Icon */}
            <Link
              to="/cart"
              className="icon-btn relative inline-block pr-1.5 lg:pr-0"
            >
              <ScCart />
              {cartTotal > 0 && (
                <span className="absolute size-[18px] pointer-events-none lg:-right-1.5 right-0 -top-1.5 bg-black rounded-full text-white flex items-center justify-center font-medium text-[11px]">
                  {cartTotal}
                </span>
              )}
            </Link>
          </div>
        </Container>
        {/* Mobile Search Dropdown (under nav) */}
        <MobileSearch
          open={isMobileSearchOpen}
          onClose={() => setIsMobileSearchOpen(false)}
        />
      </nav>

      {/* Mobile Navigation */}
      <MobileNavigation isOpen={isOpen} setIsOpen={setIsOpen} />
    </React.Fragment>
  );
}

export default Navigation;
