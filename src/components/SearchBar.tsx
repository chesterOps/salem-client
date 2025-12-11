import ScSearch from "../assets/icons/ScSearch";

function SearchBar() {
  return (
    <div className="rounded-full bg-[#f0f0f0] hidden  flex-1 px-4 py-3 lg:flex gap-3">
      <ScSearch />
      <input
        type="text"
        placeholder="Search for products..."
        className="bg-transparent outline-0 border-0 placeholder:text-[#909090] leading-[22px] text-base flex-1"
      />
    </div>
  );
}

export default SearchBar;
