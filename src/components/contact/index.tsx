import React from "react";
import "./index.scss";
import ContactText from "./text";
import ContactForm from "./form";

const Contact = () => {
  return (
    <div className="flex items-center justify-center bg-white dark:bg-slate-900 shadow-2xl shadow-brand-500 dark:shadow-slate-500 contact-page-section">
      <svg
        id="blob-1"
        className="absolute drop-shadow-lg fill-violet-200 dark:fill-purple-700"
        viewBox="0 0 480 480"
      >
        <path d="M345,326Q240,412,131,326Q22,240,131,129.5Q240,19,345,129.5Q450,240,345,326Z" />
      </svg>
      <svg
        id="blob-2"
        className="absolute drop-shadow-lg fill-violet-200 dark:fill-purple-700"
        viewBox="0 0 200 200"
      >
        <path
          d="M57.6,-16.4C65.8,6.7,57.7,37.4,35.6,54.9C13.5,72.4,-22.6,76.5,-39.3,62.4C-56.1,48.3,-53.5,15.9,-43.8,-9.3C-34,-34.5,-17,-52.4,3.8,-53.6C24.7,-54.9,49.3,-39.4,57.6,-16.4Z"
          transform="translate(100 100)"
        />
      </svg>
      <div className="grid lg:grid-cols-2 gap-10 contact-page-section-wrapper">
        <ContactText />
        <div className="relative flex items-center justify-center rounded-2xl contact-page-section-form">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
