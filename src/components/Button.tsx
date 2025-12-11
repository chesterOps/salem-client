import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "black" | "white";
  size?: "md";
}

const colorClasses = {
  black: "bg-black text-white disabled:hover:bg-black hover:bg-black/90",
  white:
    "bg-white text-black  hover:border-[#f3f4f6] hover:bg-[#f3f4f6] border border-[#e4e4e4]",
};

const sizeClasses = {
  md: "h-[42px] px-4 lg:px-[30px] lg:h-12",
};

export default function Button({
  className,
  children,
  color = "black",
  size = "md",
  ...rest
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        "transition-all disabled:opacity-80 leading-4 ease-in-out duration-200 text-sm lg:text-base lg:leading-[22px] font-medium rounded-full disabled:cursor-not-allowed min-w-[120px] flex items-center justify-center cursor-pointer",
        size && sizeClasses[size],
        color && colorClasses[color],
        className && className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
