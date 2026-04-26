import React from 'react';
import './EditorialPage.css';

const DebutanteEdge = () => {
  const products = [
    { id: 1, name: "Structured Corset Gown", price: "₹9,500", img: "/images/peral_blazer.jpg" },
    { id: 2, name: "Corset Top", price: "₹3,300", img: "/images/corset.jpg" },
    { id: 3, name: "Bow Skirt", price: "₹4,250", img: "/images/bow_skirt.jpg" },
  ];

  return (
    <div className="editorial-page">
      <h1 className="editorial-header">The Debutante's Edge</h1>
      <p className="collection-description">
        A modern fairytale — balancing grace and rebellion in every piece.
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

export default DebutanteEdge;
