import React from 'react';
import './CollectionPage.css';

const KDramaInspired = () => {
  const products = [
    { title: "Seoul Chic Coat", price: "₹40,999", image: "/images/kdrama1.jpg" },
    { title: "Soft Hanbok Fusion", price: "₹73,499", image: "/images/kdrama2.jpg" },
    { title: "K-Elegance Blazer", price: "₹57,999", image: "/images/kdrama3.jpg" },
    { title: "Ivory CEO Look", price: "₹68,000", image: "/images/kdrama4.jpg" },
    { title: "Boss Lady Draped Coat", price: "₹72,900", image: "/images/kdrama5.jpg" },
    { title: "Winter Seoul Royal", price: "₹88,880", image: "/images/kdrama6.jpg" },
    { title: "Pale Peach Power Set", price: "₹62,300", image: "/images/kdrama7.jpg" },
    { title: "Graceful Office Blazer", price: "₹58,200", image: "/images/kdrama8.jpg" },
    { title: "Modern Hanbok Glam", price: "₹77,400", image: "/images/kdrama9.jpg" },
    { title: "Charcoal Drama Wrap", price: "₹65,500", image: "/images/kdrama10.jpg" },
    { title: "Beige Royal Trench", price: "₹69,999", image: "/images/kdrama11.jpg" },
    { title: "Noona Blazer Co-ord", price: "₹59,990", image: "/images/kdrama12.jpg" }
  ];

  return (
    <div className="collection-page">
      <h2 className="collection-heading">The CEO</h2>
      <div className="collection-grid">
        {products.map((p, i) => (
          <div className="product-card" key={i}>
            <img src={p.image} alt={p.title} className="product-image" />
            <h3 className="product-title">{p.title}</h3>
            <p className="product-price">{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KDramaInspired;

