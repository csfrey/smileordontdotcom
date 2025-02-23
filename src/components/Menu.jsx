import { IoIosMenu } from "react-icons/io";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

const MenuItem = ({ className, sub, children }) => {
  return (
    <div
      className={`hover:translate-x-4 transition cursor-pointer ${
        sub ? "text-xl sm:text-2xl" : "text-3xl sm:text-4xl"
      } ${className}`}
    >
      {children}
    </div>
  );
};

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="fixed top-6 left-6 text-5xl cursor-pointer z-30 hover:"
        onClick={() => setIsOpen(true)}
      >
        <IoIosMenu className="" />
      </div>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key="vignette"
            className="absolute w-screen h-screen z-20 bg-black"
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          ></motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            className="fixed bg-[#fcd612] sm:w-md w-sm h-screen z-30 top-0 left-0 p-8 font-peckham"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ ease: "easeInOut" }}
          >
            <IoClose
              className="absolute top-3 right-3 text-3xl cursor-pointer hover:rotate-90 transition"
              onClick={() => setIsOpen(false)}
            />
            <div className="flex flex-col space-y-12">
              <MenuItem>About</MenuItem>
              <MenuItem>Contact</MenuItem>
              <div>
                <MenuItem>Collections</MenuItem>
                <div className="flex flex-col space-y-4 mt-4">
                  <MenuItem sub>Subject</MenuItem>
                  <MenuItem sub>Landscape</MenuItem>
                  <MenuItem sub>Street</MenuItem>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default Menu;
