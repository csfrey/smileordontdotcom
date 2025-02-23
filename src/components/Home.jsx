import { useState } from "react";
import Carousel from "./Carousel";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const images = [
  "landscape1.JPG",
  "landscape2.JPG",
  "landscape3.JPG",
  "landscape4.JPG",
  "landscape5.JPG",
  "landscape6.JPG",
  "subject1.JPG",
  "subject2.JPG",
  "subject3.JPG",
  "subject4.JPG",
  "subject5.JPG",
  "subject6.JPG",
].map((i) => `/images/${i}`);

const Collection = ({ children, bg, to }) => {
  return (
    <Link
      to={to}
      className="relative flex justify-center rounded-lg cursor-pointer max-w-xl mx-auto"
    >
      <img src={bg} height={200} className="rounded-lg" />
      <div className="absolute rounded-lg w-full h-full transition opacity-50 hover:opacity-80 bg-black"></div>
      <div className="absolute top-1/2 transform -translate-y-1/2 text-white font-peckham text-4xl">
        {children}
      </div>
    </Link>
  );
};

const Home = () => {
  return (
    <div className="grow mb-20">
      <div className="flex justify-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: "20%" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Carousel>
            {images.map((image, i) => (
              <img src={image} key={`home-image-${i}`} height={200} />
            ))}
          </Carousel>
        </motion.div>
      </div>

      <section className="mt-24 sm:my-48">
        <div className="flex justify-center">
          <div className="font-bold text-center font-peckham text-4xl w-[300px] mx-8">
            <div>35MM.</div>
            <div>SEATTLE.</div>
          </div>
        </div>
      </section>

      <section className="mt-24">
        <Collection bg={images[7]}>SUBJECT</Collection>
      </section>

      <section className="mt-24">
        <Collection bg={images[3]}>LANDSCAPE</Collection>
      </section>

      <section className="mt-24">
        <Collection bg={images[8]}>STREET</Collection>
      </section>
    </div>
  );
};

export default Home;
