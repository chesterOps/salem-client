import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import ScClose from "../assets/icons/ScClose";
import ScSearch from "../assets/icons/ScSearch";
import useSearch from "../hooks/useSearch";
import Container from "./Container";
import SearchDropdown from "./SearchDropdown";

type MobileSearchProps = {
  open: boolean;
  onClose?: () => void;
};

function MobileSearch({ open, onClose }: MobileSearchProps) {
  const {
    inputRef,
    dropdownRef,
    searchTerm,
    setSearchTerm,
    showDropdown,
    products,
    isLoading,
    debouncedSearch,
    setDebouncedSearch,
  } = useSearch(onClose);
  // Focus input when opened
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
    if (!open) {
      setSearchTerm("");
      setDebouncedSearch("");
    }
  }, [open]);

  // Close on ESC
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose && onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div
      className={twMerge(
        "lg:hidden absolute z-49 opacity-0 pointer-events-none top-1/2 -translate-y-1/2 left-0 w-full transition-all duration-300 ease-in-out",
        open && "opacity-100 pointer-events-auto "
      )}
    >
      <Container>
        <div
          className="flex items-center relative bg-white gap-3"
          ref={dropdownRef}
        >
          <div className="px-4 rounded-full bg-[#f0f0f0] flex-1 flex items-center gap-3 py-2.5">
            <ScSearch size={20} />
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for products..."
              className="bg-transparent outline-0 placeholder:text-[#909090] border-0 text-sm flex-1"
            />
            {/* Dropdown */}
            <SearchDropdown
              products={products}
              isLoading={isLoading}
              isOpen={debouncedSearch.trim().length > 0 && showDropdown}
            />
          </div>
          <button onClick={onClose}>
            <ScClose color="black" />
          </button>
        </div>
      </Container>
    </div>
  );
}

export default MobileSearch;
