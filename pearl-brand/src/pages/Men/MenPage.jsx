import React from "react";
import { Link } from "react-router-dom";
import "../Women/CategoryPage.css";

const MenPage = () => {
  return (
    <div className="category-page">
      <h2 className="category-title">Men's Collection</h2>

      <div className="features-grid">

        <Link to="/men/shirts" className="feature-card">
          <h3 className="feature-title">Shirts</h3>
          <p className="feature-description">
            Smart and casual styles crafted for confidence.
          </p>
        </Link>

        <Link to="/men/trousers" className="feature-card">
          <h3 className="feature-title">Trousers</h3>
          <p className="feature-description">
            Tailored, relaxed or rugged — bottoms built to move.
          </p>
        </Link>

        <Link to="/men/outerwear" className="feature-card">
          <h3 className="feature-title">Outerwear</h3>
          <p className="feature-description">
            Layer with leather, denim, coats and bold jackets.
          </p>
        </Link>

        <Link to="/men/footwear" className="feature-card">
          <h3 className="feature-title">Footwear</h3>
          <p className="feature-description">
            Classic shoes and statement sneakers for all walks.
          </p>
        </Link>

      </div>
    </div>
  );
};

export default MenPage;