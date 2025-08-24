// src/pages/Contact.jsx
import React from "react";
import "./Contact.css";

function Contact() {
  return (
    <div className="contact-container">
      <h2>📞 Contact Us</h2>
      <p>If you have any questions or need support, feel free to contact us.</p>

      <div className="contact-card">
        <h3>📱 Call Us</h3>
        <p><a href="tel:+919876543210">+91 98765 43210</a></p>
      </div>

      <div className="contact-card">
        <h3>📧 Email Us</h3>
        <p><a href="mailto:mitamedicineshop@gmail.com">mitamedicineshop@gmail.com</a></p>
      </div>

      <div className="contact-card">
        <h3>📍 Visit Us</h3>
        <p>Action Area-II, Eco Space, Kolkata, India</p>
      </div>
    </div>
  );
}

export default Contact;
