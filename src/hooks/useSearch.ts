import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { useSearchProductsQuery } from "../services/productApi";

function useSearch(onClose?: () => void) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { data: products, isLoading } = useSearchProductsQuery(
    debouncedSearch,
    {
      skip: !debouncedSearch.trim(),
    }
  );
  const { pathname } = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      if (searchTerm.trim().length > 0) {
        setShowDropdown(true);
      } else {
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
        // Optionally call onClose callback
        onClose && onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Clear search on navigation
  useEffect(() => {
    setSearchTerm("");
    setDebouncedSearch("");
    setShowDropdown(false);
    // Optionally call onClose callback
    onClose && onClose();
  }, [pathname]);
  return {
    searchTerm,
    setSearchTerm,
    showDropdown,
    setShowDropdown,
    products,
    isLoading,
    inputRef,
    dropdownRef,
    debouncedSearch,
    setDebouncedSearch,
  };
}

export default useSearch;
