import ScSearch from "../assets/icons/ScSearch";
import SearchDropdown from "./SearchDropdown";
import useSearch from "../hooks/useSearch";

function SearchBar() {
  const {
    inputRef,
    dropdownRef,
    searchTerm,
    setSearchTerm,
    showDropdown,
    products,
    isLoading,
    debouncedSearch,
  } = useSearch();

  return (
    <div className="relative flex-1 hidden lg:block" ref={dropdownRef}>
      <div className="rounded-full bg-[#f0f0f0] flex-1 px-4 py-3 flex gap-3">
        <ScSearch />
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for products..."
          className="bg-transparent outline-0 border-0 placeholder:text-[#909090] leading-[22px] text-base flex-1"
        />
      </div>

      {/* Dropdown */}
      <SearchDropdown
        products={products}
        isLoading={isLoading}
        isOpen={debouncedSearch.trim().length > 0 && showDropdown}
      />
    </div>
  );
}

export default SearchBar;
