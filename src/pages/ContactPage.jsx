import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ContactPage = () => {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phonenumber: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  // Updates state as the user types into inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Validates the input fields
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    }
    return newErrors;
  };

  // Handles the submit action, validating fields first
  const handleSubmit = () => {
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      // Here you could add logic to send the data to a server.
      setSent(true);
    }
  };

  return (
    <div className="grow flex justify-center">
      <div className="w-sm">
        <div className="font-peckham text-5xl text-center my-12">CONTACT</div>

        <AnimatePresence mode="wait">
          {sent ? (
            <div className="font-peckham text-center">
              THANKS! WE&apos;LL GET BACK TO YOU SHORTLY!
            </div>
          ) : (
            <motion.div className="flex flex-col space-y-4">
              <div>
                <label htmlFor="name" className="font-peckham">
                  NAME
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full border rounded bg-white p-0.5"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="phonenumber" className="font-peckham">
                  PHONE (OPTIONAL)
                </label>
                <input
                  id="phonenumber"
                  type="text"
                  className="w-full border rounded bg-white p-0.5"
                  value={formData.phonenumber}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="email" className="font-peckham">
                  EMAIL
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full border rounded bg-white p-0.5"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="font-peckham">
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full border rounded bg-white p-0.5"
                  value={formData.message}
                  onChange={handleChange}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm">{errors.message}</p>
                )}
              </div>

              <button
                className="bg-gray-950 hover:bg-gray-800 active:bg-gray-700 text-white font-peckham rounded"
                onClick={handleSubmit}
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
