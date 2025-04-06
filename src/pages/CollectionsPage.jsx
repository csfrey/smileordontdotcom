import { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useImages } from "../lib/images";
import CollectionLink from "../components/CollectionLink";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

const CollectionsPage = () => {
  const { collection } = useParams();
  const { subjectQuery, landscapeQuery, musicQuery } = useImages();
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(() => {
    // Check if window exists (for SSR safety)
    return typeof window !== "undefined" ? window.innerWidth < 640 : false;
  });

  // Update isSmallScreen on resize.
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const photos = useMemo(() => {
    if (!collection) return [];
    if (collection === "subject")
      return subjectQuery.isLoading ? [] : subjectQuery.data;
    if (collection === "landscape")
      return landscapeQuery.isLoading ? [] : landscapeQuery.data;
    if (collection === "music")
      return musicQuery.isLoading ? [] : musicQuery.data;

    return [];
  }, [collection, subjectQuery.isLoading, landscapeQuery.isLoading]);

  // Keyboard navigation with wrap-around behavior.
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeImageIndex === null) return;
      if (e.key === "Escape") {
        setActiveImageIndex(null);
      } else if (e.key === "ArrowLeft") {
        setActiveImageIndex(
          (prev) => (prev - 1 + photos.length) % photos.length
        );
      } else if (e.key === "ArrowRight") {
        setActiveImageIndex((prev) => (prev + 1) % photos.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIndex, photos.length]);

  // Handle swipe navigation with wrap-around.
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const threshold = 50;
    if (touchStart === null || touchEnd === null) return;
    const delta = touchStart - touchEnd;
    if (delta > threshold) {
      setActiveImageIndex((prev) => (prev + 1) % photos.length);
    } else if (delta < -threshold) {
      setActiveImageIndex((prev) => (prev - 1 + photos.length) % photos.length);
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  if (
    collection !== "subject" &&
    collection !== "landscape" &&
    collection !== "music"
  ) {
    return (
      <div className="grid lg:grid-cols-2">
        {!subjectQuery.isLoading && (
          <section className="mt-18 lg:mt-24">
            <CollectionLink to="/collections/subject" bg={subjectQuery.data[0]}>
              SUBJECT
            </CollectionLink>
          </section>
        )}
        {!landscapeQuery.isLoading && (
          <section className="mt-18 lg:mt-24">
            <CollectionLink
              to="/collections/landscape"
              bg={landscapeQuery.data[0]}
            >
              LANDSCAPE
            </CollectionLink>
          </section>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="text-center mt-16 text-5xl font-peckham">
        {collection}
      </div>
      <div className="p-1 sm:p-16 grid gap-1 sm:gap-16 lg:grid-cols-3">
        {photos.map((p, index) => (
          <img
            key={index}
            src={p}
            alt={`Image ${index + 1}`}
            // Only enable click-to-view for non-small screens.
            onClick={
              !isSmallScreen ? () => setActiveImageIndex(index) : undefined
            }
            className="sm:cursor-pointer sm:hover:brightness-75"
          />
        ))}
      </div>

      {activeImageIndex !== null && (
        // Overlay with inline style for vignette effect; clicking outside closes the modal.
        <div
          onClick={() => setActiveImageIndex(null)}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          {/* Modal container with fixed dimensions */}
          <div
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative flex items-center justify-center bg-transparent"
            style={{ width: "80vw", height: "80vh" }}
          >
            <img
              src={photos[activeImageIndex]}
              alt={`Large view of image ${activeImageIndex + 1}`}
              className="max-h-full max-w-full object-contain"
            />
            {/* X button */}
            <button
              onClick={() => setActiveImageIndex(null)}
              className="absolute top-2 right-2 text-white text-3xl font-bold z-10"
              aria-label="Close image"
            >
              &times;
            </button>
            {/* Prev button always in the same position */}
            <button
              onClick={() =>
                setActiveImageIndex(
                  (prev) => (prev - 1 + photos.length) % photos.length
                )
              }
              className="absolute left-0 lg:left-16 text-white text-4xl z-10"
              aria-label="Previous image"
              style={{ top: "50%", transform: "translateY(-50%)" }}
            >
              <BsChevronCompactLeft />
            </button>
            {/* Next button always in the same position */}
            <button
              onClick={() =>
                setActiveImageIndex((prev) => (prev + 1) % photos.length)
              }
              className="absolute right-0 lg:right-16 text-white text-4xl z-10"
              aria-label="Next image"
              style={{ top: "50%", transform: "translateY(-50%)" }}
            >
              <BsChevronCompactRight />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CollectionsPage;
