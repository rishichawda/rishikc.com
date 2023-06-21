import React from "react";
import "./index.scss";
import ContactText from "./text";
import ContactForm from "./form";

const Contact = () => {
  return (
    <div className="contact-section">
      <div className="contact-section-wrapper">
        <ContactText />
        <div className="contact-section-form">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
