import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ContactPage = () => {
  const [sent, setSent] = useState(false);

  return (
    <div className="grow flex justify-center">
      <div className="w-sm">
        <div className="font-peckham text-5xl text-center my-12">CONTACT</div>

        <AnimatePresence mode="wait">
          {sent ? (
            <div className="font-peckham text-center">
              Thanks for your message
            </div>
          ) : (
            <motion.div className="flex flex-col space-y-4" animate={{}}>
              <div>
                <label for="name" className="font-peckham">
                  NAME
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full border rounded bg-white p-0.5"
                />
              </div>

              <div>
                <label for="phonenumber" className="font-peckham">
                  PHONE (OPTIONAL)
                </label>
                <input
                  id="phonenumber"
                  type="text"
                  className="w-full border rounded bg-white p-0.5"
                />
              </div>

              <div>
                <label for="email" className="font-peckham">
                  EMAIL
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full border rounded bg-white p-0.5"
                />
              </div>

              <div>
                <label for="message" className="font-peckham">
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full border rounded bg-white p-0.5"
                />
              </div>
              <button
                className="bg-gray-950 hover:bg-gray-800 active:bg-gray-700 text-white font-peckham rounded"
                onClick={() => setSent(true)}
              >
                SEND
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ContactPage;
