import { useEffect, useRef, useState } from "react";
import ScEmail from "../assets/icons/ScEmail";
import Button from "./Button";
import Container from "./Container";

function NewsLetter() {
  // Header height
  const [height, setHeight] = useState(0);

  // Header ref
  const headerRef = useRef(null);

  useEffect(() => {
    if (!headerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      setHeight(entry.contentRect.height);
    });

    observer.observe(headerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={headerRef}
      style={{ marginBottom: `-${height / 2}px` }}
      className="relative z-10"
    >
      <Container>
        <div className="bg-black rounded-[20px] pb-7 pt-8 px-6 lg:px-16 lg:py-9 flex flex-col md:flex-row gap-8 items-center justify-between">
          <h1 className="text-[32px] leading-[35px]  lg:max-w-none lg:text-[40px] lg:leading-[45px] text-white">
            Stay up to date about our latest offers
          </h1>
          <form className="flex-1 flex flex-col gap-3.5 lg:min-w-[350px]  lg:max-w-none w-full">
            <div className="bg-white gap-x-3 rounded-full flex px-4 py-[11px] lg:py-3">
              <ScEmail className="size-5 lg:size-6" />
              <input
                className="flex-1 outline-none border-none text-sm lg:text-base lg:leading-[22px]"
                placeholder="Enter your email address"
                type="email"
              />
            </div>
            <Button color="white" size="md" className="w-full">
              Subscribe to Newsletter
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default NewsLetter;
