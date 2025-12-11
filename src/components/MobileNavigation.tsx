import React, { useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { navigationLinks } from "../utils/constants";
import ScClose from "../assets/icons/ScClose";
import Logo from "./Logo";
import { useDisableScroll } from "../hooks/useDisableScroll";
import SocialIcons from "./SocialIcons";

function MobileNavigation({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const pathname = useLocation().pathname;
  useEffect(() => {
    // Close mobile menu on route change
    setIsOpen(false);
  }, [pathname, setIsOpen]);

  useDisableScroll(isOpen);
  return (
    <React.Fragment>
      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={twMerge(
          "fixed left-0 transition-all top-0 h-full lg:hidden w-full pointer-events-none bg-black duration-300 ease-in-out opacity-0 z-60",
          isOpen && "opacity-30 pointer-events-auto"
        )}
      />
      {/* Side Navigation */}
      <nav
        className={twMerge(
          "fixed left-0 flex flex-col top-0 h-full gap-y-4  w-full sm:max-w-[400px] pb-10 pt-6 lg:hidden -translate-x-full bg-white z-70 transform transition-transform duration-300",
          isOpen && "translate-x-0"
        )}
      >
        {/* Render links */}
        <div className="flex justify-end px-4 icon-btn">
          <button onClick={() => setIsOpen(false)}>
            <ScClose color="black" />
          </button>
        </div>
        <ul className="flex flex-col  gap-y-0.5 ">
          <li>
            <NavLink to={navigationLinks[0].href}>
              {({ isActive }) => (
                <span
                  className={twMerge(
                    "px-4 py-3 inline-block w-full text-lg hover:bg-[#f0f0f0]",
                    isActive && "bg-[#f8f8f8]"
                  )}
                >
                  {navigationLinks[0].name}
                </span>
              )}
            </NavLink>
          </li>
          {navigationLinks.slice(1).map((item, i) => (
            <li key={i}>
              <Link to={item.href}>
                <span
                  className={
                    "px-4 py-3 inline-block w-full text-lg hover:bg-[#f0f0f0]"
                  }
                >
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="items-center flex-col gap-4 justify-end flex-1 flex">
          <Logo />
          <SocialIcons />
        </div>
      </nav>
    </React.Fragment>
  );
}

export default MobileNavigation;
