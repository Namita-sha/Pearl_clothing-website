import React from 'react';
import './EditorialPage.css';

const ScarletChapter = () => {
  const products = [
    { id: 1, name: "Flame Blazer", price: "₹4,999", img: "/images/flame_blazer.jpg" },
    { id: 2, name: "Power Suit in Red", price: "₹7,490", img: "/images/power_suit.jpg" },
    { id: 3, name: "Bow Heel", price: "₹5,200", img: "/images/heel.jpg" },
  ];

  return (
    <div className="editorial-page">
      <h1 className="editorial-header">The Scarlet Chapter</h1>
      <p className="collection-description">
        A fierce expression of elegance in deep red and velvet tones.
      </p>
      <div className="editorial-grid">
        {products.map((item) => (
          <div key={item.id} className="editorial-card">
            <img src={item.img} alt={item.name} className="editorial-image" />
            <div className="editorial-info">
              <h3 className="editorial-title">{item.name}</h3>
              <p className="editorial-price">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScarletChapter;
