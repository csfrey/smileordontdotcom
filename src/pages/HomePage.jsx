import { useState } from "react";
import Carousel from "../components/Carousel";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { images as fallbackImages } from "../constants";
import { useQuery } from "@tanstack/react-query";
import { useImages } from "../lib/images";
import CollectionLink from "../components/CollectionLink";

const Home = () => {
  const { carouselQuery, subjectQuery, landscapeQuery, musicQuery } =
    useImages();

  return (
    <div className="grow mb-20">
      <div className="flex justify-center mt-10">
        {!carouselQuery.isLoading && (
          <Carousel>
            {carouselQuery.data.map((image, i) => (
              <img src={image} key={`home-image-${i}`} height={800} />
            ))}
          </Carousel>
        )}
      </div>

      <section className="mt-24 sm:my-48">
        <div className="flex justify-center">
          <div className="font-bold text-center font-peckham text-4xl w-[300px] mx-8">
            <div>35MM.</div>
            <div>SEATTLE.</div>
          </div>
        </div>
      </section>

      {!subjectQuery.isLoading && (
        <section className="mt-24">
          <CollectionLink to="/collections/subject" bg={subjectQuery.data[0]}>
            SUBJECT
          </CollectionLink>
        </section>
      )}

      {!landscapeQuery.isLoading && (
        <section className="mt-24">
          <CollectionLink
            to="/collections/landscape"
            bg={landscapeQuery.data[0]}
          >
            LANDSCAPE
          </CollectionLink>
        </section>
      )}

      {!musicQuery.isLoading && (
        <section className="mt-24">
          <CollectionLink to="/collections/music" bg={musicQuery.data[0]}>
            LIVE MUSIC
          </CollectionLink>
        </section>
      )}

      <section className="font-peckham mt-24">
        <div className="flex justify-center">
          <Link to="/contact" className="text-3xl">
            CONTACT
          </Link>
        </div>
        <div className="text-center mt-4">732 491 6228</div>
        <div className="text-center">{"casey@smileordont.com"}</div>
      </section>
    </div>
  );
};

export default Home;
