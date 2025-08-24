// src/components/Footer.js
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css"; // Styling file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section left">
        <h2 className="footer-logo">MedicineStore</h2>
        <p>Serving you 24/7 with care and quality.</p>
      </div>

      <div className="footer-section center">
        <h3>Quick Links</h3>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/billing">Billing</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>

      <div className="footer-section right">
        <h3>Contact Us</h3>
        <p>Email: support@medicinestore.com</p>
        <p>Phone: +91 12345 67890</p>
        <p>Location: Kolkata, India</p>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 MedicineStore. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
