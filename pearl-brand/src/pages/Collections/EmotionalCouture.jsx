import React from 'react';
import './CollectionPage.css';

const EmotionalCouture = () => {
  const products = [
    { title: "Crimson Drama Gown", price: "₹89,999", image: "/images/redgown.jpg" },
    { title: "Velvet Whisper Dress", price: "₹99,499", image: "/images/velvetdress.jpg" },
    { title: "White Wispers", price: "₹75,299", image: "/images/whitedress.jpg" },
    { title: "Midnight Grace", price: "₹1,09,999", image: "/images/dress3.jpg" },
    { title: "Golden Mirage", price: "₹95,000", image: "/images/dress10.jpg" },
    { title: "Ivory Bloom Dress", price: "₹85,700", image: "/images/dress5.jpg" },
    { title: "Royal Wine Gown", price: "₹1,25,000", image: "/images/dress12.jpg" },
    { title: "Blush Cloud Tulle", price: "₹79,499", image: "/images/dress9.jpg" },
    { title: "Scarlet Flame Dress", price: "₹92,300", image: "/images/dress4.jpg" },
    { title: "Ethereal Ruffle Gown", price: "₹88,800", image: "/images/dress13.jpg" },
    { title: "Moonlit Pearl Ensemble", price: "₹1,12,999", image: "/images/dress0.jpg" },
    { title: "Crème Opera Elegance", price: "₹97,999", image: "/images/dress14.jpg" }
  ];

  return (
    <div className="collection-page">
      <h2 className="collection-heading">Emotional Couture</h2>
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

export default EmotionalCouture;
