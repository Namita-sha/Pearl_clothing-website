import React from "react";
import { Link } from "react-router-dom";
import "./CategoryPage.css";

const WomenPage = () => {
  return (
    <div className="category-page">
      <h2 className="category-title">Women's Collection</h2>

      <div className="features-grid">

        {/* Dresses */}
        <Link to="/women/dresses" className="feature-card">
          <div className="feature-icon">👗</div>
          <h3 className="feature-title">Dresses</h3>
          <p className="feature-description">
            Elegant, flowy, and powerful silhouettes for every occasion.
          </p>
        </Link>

        {/* Shirts */}
        <Link to="/women/shirts" className="feature-card">
          <div className="feature-icon">👚</div>
          <h3 className="feature-title">Shirts & Blouses</h3>
          <p className="feature-description">
            From crisp to romantic — styles for the empowered woman.
          </p>
        </Link>

        {/* Outerwear */}
        <Link to="/women/outerwear" className="feature-card">
          <div className="feature-icon">🧥</div>
          <h3 className="feature-title">Coats & Jackets</h3>
          <p className="feature-description">
            Layer your look with timeless and trend-forward outerwear.
          </p>
        </Link>

        {/* Trousers */}
        <Link to="/women/trousers" className="feature-card">
          <div className="feature-icon">👖</div>
          <h3 className="feature-title">Trousers</h3>
          <p className="feature-description">
            Chic, tailored, and comfortable bottoms made to move with you.
          </p>
        </Link>

        {/* Handbags */}
        <Link to="/women/handbags" className="feature-card">
          <div className="feature-icon">👜</div>
          <h3 className="feature-title">Handbags</h3>
          <p className="feature-description">
            Statement pieces and everyday elegance for every outfit.
          </p>
        </Link>

        {/* Footwear */}
        <Link to="/women/footwear" className="feature-card">
          <div className="feature-icon">👠</div>
          <h3 className="feature-title">Footwear</h3>
          <p className="feature-description">
            Powerful heels, bold flats & dreamy shoes you’ll wear forever.
          </p>
        </Link>

      </div>
    </div>
  );
};

export default WomenPage;