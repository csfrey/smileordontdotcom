import { useMemo, useState, useRef } from "react";
import { useInterval } from "usehooks-ts";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

const delay = 2500;
const swipeThreshold = 50; // Minimum pixels to trigger a slide change

const Carousel = ({ children, className }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [dragStartX, setDragStartX] = useState(null);
  const [dragDelta, setDragDelta] = useState(0);
  const numSlides = useMemo(() => children?.length ?? 0, [children]);
  const containerRef = useRef(null);

  // Auto-advance only when not dragging
  useInterval(
    () => {
      if (dragStartX === null) {
        setCurrentSlide((prev) => (prev + 1) % numSlides);
      }
    },
    isPlaying ? delay : null
  );

  // function pausePlaying() {
  //   setIsPlaying(false);
  //   setTimeout(() => {
  //     setIsPlaying(true);
  //   }, 5000);
  // }

  // Start dragging: record the initial pointer position
  function handlePointerDown(e) {
    setIsPlaying(false);
    setDragStartX(e.clientX);
  }

  // Update the drag delta as the user moves their pointer
  function handlePointerMove(e) {
    if (dragStartX !== null) {
      const delta = e.clientX - dragStartX;
      setDragDelta(delta);
    }
  }

  // When the drag ends, decide if the swipe was strong enough to change slides
  function handlePointerUp() {
    if (dragStartX !== null) {
      if (dragDelta > swipeThreshold) {
        // Dragged right: show previous slide
        setCurrentSlide((prev) => (prev - 1 + numSlides) % numSlides);
      } else if (dragDelta < -swipeThreshold) {
        // Dragged left: show next slide
        setCurrentSlide((prev) => (prev + 1) % numSlides);
      }
    }
    // Reset drag state
    setDragStartX(null);
    setDragDelta(0);
  }

  // If the pointer leaves the container while dragging, treat it as the end of a drag
  function handlePointerLeave() {
    if (dragStartX !== null) {
      handlePointerUp();
    }
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-xl ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      style={{ touchAction: "pan-y" }} // Allow vertical scrolling on touch devices
    >
      <div className="grow overflow-hidden sm:rounded-lg">
        <div
          className="flex transition-transform duration-300 ease-out"
          // During dragging, we add the delta to the computed translation
          style={{
            transform: `translateX(calc(-${
              currentSlide * 100
            }% + ${dragDelta}px))`,
          }}
        >
          {children}
        </div>
      </div>
      <div
        className="absolute left-0 top-1/2 transform -translate-y-1/2 text-4xl cursor-pointer sm:-translate-x-[100%] sm:hover:-translate-x-[105%]"
        onClick={() => {
          setIsPlaying(false);
          setCurrentSlide((prev) => (prev - 1 + numSlides) % numSlides);
        }}
      >
        <BsChevronCompactLeft />
      </div>
      <div
        className="absolute right-0 top-1/2 transform -translate-y-1/2 text-4xl cursor-pointer sm:translate-x-[100%] sm:hover:translate-x-[105%]"
        onClick={() => {
          setIsPlaying(false);
          setCurrentSlide((prev) => (prev + 1) % numSlides);
        }}
      >
        <BsChevronCompactRight />
      </div>
      <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-[200%] transition flex space-x-2">
        {children.map((_, i) => (
          <div
            key={i}
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
