import { useMemo, useState } from "react";
import { useInterval, useTimeout } from "usehooks-ts";

import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

const delay = 2500;

const Carousel = ({ children, className }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [recentlyClicked, setRecentlyClicked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const numSlides = useMemo(() => children?.length ?? 0, [children]);

  useInterval(
    () => {
      setCurrentSlide((currentSlide + 1) % numSlides);
    },
    isPlaying ? delay : null
  );

  return (
    <div className={`relative w-full max-w-xl`}>
      <div className="grow overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {children}
        </div>
      </div>
      <div
        className="absolute left-0 top-1/2 transform -translate-y-1/2 text-4xl cursor-pointer sm:-translate-x-[100%] sm:hover:-translate-x-[105%]"
        onClick={() => {
          setIsPlaying(false);
          setCurrentSlide((currentSlide - 1 + numSlides) % numSlides);
        }}
      >
        <BsChevronCompactLeft />
      </div>
      <div
        className="absolute right-0 top-1/2 transform -translate-y-1/2 text-4xl cursor-pointer sm:translate-x-[100%] sm:hover:translate-x-[105%]"
        onClick={() => {
          setIsPlaying(false);
          setCurrentSlide((currentSlide + 1) % numSlides);
        }}
      >
        <BsChevronCompactRight />
      </div>
      <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-[200%] transistion flex space-x-2">
        {children.map((_, i) => (
          <div
            className={`h-2 w-2 cursor-pointer rounded-full transition focus:outline-none ${
              currentSlide === i
                ? "border-none bg-gray-800"
                : "border border-gray-600 bg-none"
            }`}
            onClick={() => {
              setIsPlaying(false);
              setCurrentSlide(i);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
