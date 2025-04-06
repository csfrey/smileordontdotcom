import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const ContactPage = () => {
  const [sent, setSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        e.target,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log("Email successfully sent!", result.text);
          setSent(true);
        },
        (error) => {
          console.error("Failed to send email.", error);
        }
      );
  };

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
            <motion.form
              className="flex flex-col space-y-4"
              onSubmit={sendEmail}
              animate={{}}
            >
              <div>
                <label htmlFor="name" className="font-peckham">
                  NAME
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="w-full border rounded bg-white p-0.5"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="font-peckham">
                  PHONE (OPTIONAL)
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  className="w-full border rounded bg-white p-0.5"
                />
              </div>

              <div>
                <label htmlFor="email" className="font-peckham">
                  EMAIL
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="w-full border rounded bg-white p-0.5"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="font-peckham">
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full border rounded bg-white p-0.5"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-gray-950 hover:bg-gray-800 active:bg-gray-700 text-white font-peckham rounded"
              >
                SEND
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ContactPage;
