import { twMerge } from "tailwind-merge";
import { useEffect, useRef } from "react";
import Container from "./Container";
import ScSearch from "../assets/icons/ScSearch";
import ScClose from "../assets/icons/ScClose";

type MobileSearchProps = {
  open: boolean;
  onClose?: () => void;
};

function MobileSearch({ open, onClose }: MobileSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
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
        "lg:hidden absolute z-49 opacity-0 pointer-events-none top-1/2 -translate-y-1/2 left-0 w-full overflow-hidden transition-all duration-300 ease-in-out",
        open && "opacity-100 pointer-events-auto "
      )}
    >
      <Container className="flex items-center bg-white gap-3">
        <div className="px-4 rounded-full bg-[#f0f0f0] flex-1 flex items-center gap-3 py-2.5">
          <ScSearch size={20} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for products..."
            className="bg-transparent outline-0 placeholder:text-[#909090] border-0 text-sm flex-1"
            onBlur={() => {
              // Clear input and close on blur
              if (open && onClose) onClose();
            }}
          />
        </div>
        <button onClick={onClose}>
          <ScClose color="black" />
        </button>
      </Container>
    </div>
  );
}

export default MobileSearch;
