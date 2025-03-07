import { useState } from "react";
import Carousel from "../components/Carousel";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { images as fallbackImages } from "../constants";
// import { useImgur } from "../lib/imgur";

const CollectionLink = ({ children, bg, to }) => {
  return (
    <Link
      to={to}
      className="relative flex justify-center rounded-lg cursor-pointer max-w-xl mx-auto"
    >
      <img src={bg} height={200} className="rounded-lg" />
      <div className="absolute rounded-lg w-full h-full transition opacity-50 hover:opacity-70 bg-black"></div>
      <div className="absolute top-1/2 transform -translate-y-1/2 text-white font-peckham text-4xl">
        {children}
      </div>
    </Link>
  );
};

const Home = () => {
  // const { carousel } = useImgur();

  return (
    <div className="grow mb-20">
      <div className="flex justify-center mt-20">
        <Carousel>
          {fallbackImages.map((image, i) => (
            <img src={image} key={`home-image-${i}`} height={200} />
          ))}
        </Carousel>
      </div>

      <section className="mt-24 sm:my-48">
        <div className="flex justify-center">
          <div className="font-bold text-center font-peckham text-4xl w-[300px] mx-8">
            <div>35MM.</div>
            <div>SEATTLE.</div>
          </div>
        </div>
      </section>
      <section className="font-peckham">
        <div className="text-center text-3xl">CONTACT</div>
        <div className="text-center mt-4">732 491 6228</div>
        <div className="text-center">{"casey@smileordont.com"}</div>
      </section>
      {/* 
      <section className="mt-24">
        <CollectionLink to="/collections/subject" bg={fallbackImages[7]}>
          SUBJECT
        </CollectionLink>
      </section>

      <section className="mt-24">
        <CollectionLink to="/collections/landscape" bg={fallbackImages[3]}>
          LANDSCAPE
        </CollectionLink>
      </section> */}

      {/* <section className="mt-24">
        <CollectionLink to="/collections/street" bg={images[8]}>
          STREET
        </CollectionLink>
      </section> */}
    </div>
  );
};

export default Home;
