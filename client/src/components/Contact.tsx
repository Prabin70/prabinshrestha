"use client";

import React, { useRef, useState } from "react";
import { Send } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, Variants } from "framer-motion";
import { webThreeForm } from "@/api/env";

const WEB3FORMS_ACCESS_KEY = webThreeForm;

const useMagneticEffect = (ref: React.RefObject<HTMLButtonElement | null>) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (ref.current) {
      const { clientX, clientY } = e;
      const { width, height, left, top } = ref.current.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      setPosition({ x, y });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  const transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  const textTransform = `translate(${x * 0.2}px, ${y * 0.2}px)`;

  return { transform, textTransform, handleMouseMove, handleMouseLeave };
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const subtitleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
};

const formVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.4, ease: "easeOut" },
  },
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const { transform, textTransform, handleMouseMove, handleMouseLeave } =
    useMagneticEffect(buttonRef);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!WEB3FORMS_ACCESS_KEY) {
      toast.error("Configuration error: Form access key is missing.");
      setIsLoading(false);
      return;
    }

    const formDataWeb3 = new FormData();
    formDataWeb3.append("access_key", WEB3FORMS_ACCESS_KEY);
    formDataWeb3.append("name", formData.name);
    formDataWeb3.append("email", formData.email);
    formDataWeb3.append("subject", formData.subject);
    formDataWeb3.append("message", formData.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataWeb3,
      });

      const data = await response.json();
      console.log(data);

      if (data.success) {
        toast.success("Message sent successfully!");

        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        const errorMessage =
          data.message ||
          "Failed to send message. Please check your form data and try again.";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Network error. Could not connect to the server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 pb-4"
        >
          Get In Touch
        </motion.h2>
        <motion.p
          variants={subtitleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-lg text-neutral-400 text-center max-w-2xl mx-auto mt-4 mb-16"
        >
          Have a question or a project in mind? Feel free to reach out. I'm
          always open to discussing new ideas and opportunities.
        </motion.p>

        <motion.form
          variants={formVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-8 max-w-2xl mx-auto"
        >
          <ToastContainer position="bottom-right" autoClose={5000} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative group">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-neutral-900 border-2 border-neutral-800 rounded-lg px-4 py-3 text-neutral-100 placeholder-transparent focus:outline-none focus:border-purple-500 transition-colors peer"
                placeholder="Your Name"
              />
              <label
                htmlFor="name"
                className="absolute left-4 -top-3.5 text-neutral-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-purple-400 peer-focus:text-sm"
              >
                Your Name
              </label>
            </div>

            <div className="relative group">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-neutral-900 border-2 border-neutral-800 rounded-lg px-4 py-3 text-neutral-100 placeholder-transparent focus:outline-none focus:border-purple-500 transition-colors peer"
                placeholder="Your Email"
              />
              <label
                htmlFor="email"
                className="absolute left-4 -top-3.5 text-neutral-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-purple-400 peer-focus:text-sm"
              >
                Your Email
              </label>
            </div>
          </div>

          <div className="relative group">
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full bg-neutral-900 border-2 border-neutral-800 rounded-lg px-4 py-3 text-neutral-100 placeholder-transparent focus:outline-none focus:border-purple-500 transition-colors peer"
              placeholder="Subject"
            />
            <label
              htmlFor="subject"
              className="absolute left-4 -top-3.5 text-neutral-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-purple-400 peer-focus:text-sm"
            >
              Subject
            </label>
          </div>

          <div className="relative group">
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full bg-neutral-900 border-2 border-neutral-800 rounded-lg px-4 py-3 text-neutral-100 placeholder-transparent focus:outline-none focus:border-purple-500 transition-colors peer resize-none"
              placeholder="Your Message"
            ></textarea>
            <label
              htmlFor="message"
              className="absolute left-4 -top-3.5 text-neutral-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-purple-400 peer-focus:text-sm"
            >
              Your Message
            </label>
          </div>

          <div className="text-center">
            <button
              ref={buttonRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ transform }}
              type="submit"
              disabled={isLoading}
              className="group cursor-pointer relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-purple-600 rounded-full overflow-hidden transition-transform duration-300 ease-out hover:bg-purple-700 hover:shadow-2xl hover:shadow-purple-500/30 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span
                style={{ transform: textTransform }}
                className="relative z-10 flex items-center transition-transform duration-300 ease-out"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message{" "}
                    <Send className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </span>
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;