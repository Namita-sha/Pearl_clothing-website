import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand Section */}
        <div className="footer-section">
          <h2 className="footer-logo">PEARL</h2>
          <p className="footer-tagline">
            Designed for those who feel deeply and dress boldly.
          </p>
        </div>

        {/* Shop Links */}
        <div className="footer-section">
          <h4>Shop</h4>
          <Link to="/women">Women</Link>
          <Link to="/men">Men</Link>
          <Link to="/collection/emotional-couture">Collections</Link>
        </div>

        {/* Company Links */}
        <div className="footer-section">
          <h4>Company</h4>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Privacy Policy</a>
        </div>

        {/* Connect */}
        <div className="footer-section">
          <h4>Connect</h4>
          <a href="#">Instagram</a>
          <a href="#">Pinterest</a>
          <a href="#">LinkedIn</a>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} PEARL. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;