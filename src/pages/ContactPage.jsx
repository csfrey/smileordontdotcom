import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate on change
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (name === "email" && value) {
        if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = "Email is invalid.";
        } else {
          delete newErrors.email;
        }
      } else {
        if (value.trim()) {
          delete newErrors[name];
        } else {
          newErrors[name] = `${
            name.charAt(0).toUpperCase() + name.slice(1)
          } is required.`;
        }
      }
      return newErrors;
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
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
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="grow flex justify-center">
      <div className="w-sm">
        <div className="font-peckham text-5xl text-center my-12">CONTACT</div>
        <section className="font-peckham">
          <div className="text-center mt-4 text-2xl">REACH ME HERE:</div>
          <div className="text-center mt-8">732 491 6228</div>
          <div className="text-center mb-8">{"casey@smileordont.com"}</div>
          <div className="text-center mb-4 text-2xl">OR SEND ME A MESSAGE:</div>
        </section>
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
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
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
                  value={formData.phone}
                  onChange={handleChange}
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
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
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
                  value={formData.message}
                  onChange={handleChange}
                />
                {errors.message && (
                  <p className="text-red-500">{errors.message}</p>
                )}
              </div>
              <button
                type="submit"
                className="mb-8 bg-gray-950 hover:bg-gray-800 active:bg-gray-700 text-white font-peckham rounded"
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
