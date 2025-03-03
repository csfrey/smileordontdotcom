import { IoIosMenu } from "react-icons/io";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

const MenuItem = ({ className, children, sub, to, onClick }) => {
  return (
    <Link to={to} onClick={onClick}>
      <div
        className={`hover:translate-x-4 transition cursor-pointer ${
          sub ? "text-xl sm:text-2xl" : "text-3xl sm:text-4xl"
        } ${className}`}
      >
        {children}
      </div>
    </Link>
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
            className="fixed w-screen h-screen z-20 bg-black"
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
            key="menu-slideout"
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
              <MenuItem to="/about" onClick={() => setIsOpen(false)}>
                About
              </MenuItem>
              <MenuItem to="/contact" onClick={() => setIsOpen(false)}>
                Contact
              </MenuItem>
              <div>
                <MenuItem to="/collections" onClick={() => setIsOpen(false)}>
                  Collections
                </MenuItem>
                <div className="flex flex-col space-y-4 mt-4">
                  <MenuItem
                    sub
                    to="/collections/subject"
                    onClick={() => setIsOpen(false)}
                  >
                    Subject
                  </MenuItem>
                  <MenuItem
                    sub
                    to="/collections/landscape"
                    onClick={() => setIsOpen(false)}
                  >
                    Landscape
                  </MenuItem>
                  <MenuItem
                    sub
                    to="/collections/street"
                    onClick={() => setIsOpen(false)}
                  >
                    Street
                  </MenuItem>
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
