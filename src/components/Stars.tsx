import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

const Stars = ({
  rating,
  starClassName,
}: {
  rating: number;
  starClassName?: string;
}) => {
  return (
    <div className="flex items-center gap-1 lg:gap-1.5">
      {[...Array(5)].map((_, i) => {
        const starValue = i + 1;

        if (rating >= starValue) {
          return (
            <BsStarFill
              key={i}
              color="#FFC633"
              className={twMerge("size-5", starClassName && starClassName)}
            />
          );
        } else if (rating >= starValue - 0.5) {
          return (
            <BsStarHalf
              key={i}
              color="#FFC633"
              className={twMerge("size-5", starClassName && starClassName)}
            />
          );
        } else {
          return (
            <BsStar
              key={i}
              color="#FFC633"
              className={twMerge("size-5", starClassName && starClassName)}
            />
          );
        }
      })}
    </div>
  );
};

export default Stars;
