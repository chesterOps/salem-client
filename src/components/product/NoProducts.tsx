import { useSearchParams } from "react-router-dom";
import ScControls from "../../assets/icons/ScControls";
import Button from "../Button";

function NoProducts({ type = "default" }: { type?: "default" | "filter" }) {
  const [searchParams, setSearchParams] = useSearchParams();
  // Reset filters but keep sortBy
  const resetFilters = () => {
    const params = new URLSearchParams();
    const sortBy = searchParams.get("sortBy");
    if (sortBy) params.set("sortBy", sortBy);
    params.set("page", "1");
    setSearchParams(params);
  };
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-12 lg:py-16">
      <div className="text-center max-w-md">
        <div className="mb-4">
          <ScControls className="size-16 lg:size-20 mx-auto opacity-20" />
        </div>
        <h3 className="text-xl lg:text-2xl font-bold mb-2 satoshi">
          No Products Found
        </h3>
        <p className="text-black/60 mb-6 text-sm lg:text-base">
          We couldn't find any products. Try adjusting your search or filter
        </p>
        {type === "filter" && (
          <div className="flex justify-center">
            <Button onClick={resetFilters} color="white" className="px-8">
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NoProducts;
