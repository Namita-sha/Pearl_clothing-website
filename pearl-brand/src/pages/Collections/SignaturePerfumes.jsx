import React from 'react';
import './CollectionPage.css';

const SignaturePerfumes = () => {
  const products = [
    { title: "Twilight Rose", price: "₹93,999", image: "/images/roseperfume.jpg" },
    { title: "Noir Bloom", price: "₹84,499", image: "/images/perfume3.jpg" },
    { title: "Golden Veil", price: "₹85,200", image: "/images/perfume2.jpg" },
    { title: "Mystic Oud", price: "₹99,000", image: "/images/perfume4.jpg" },
    { title: "Velvet Woods", price: "₹76,499", image: "/images/perfume11.jpg" },
    { title: "Moonlit Amber", price: "₹89,900", image: "/images/perfume12.jpg" },
    { title: "Pearl Essence", price: "₹1,10,000", image: "/images/perfume7.jpg" },
    { title: "Royal Musk", price: "₹95,499", image: "/images/perfume8.jpg" },
    { title: "Saffron Mirage", price: "₹1,25,000", image: "/images/perfume9.jpg" },
    { title: "Citrus Noir", price: "₹78,999", image: "/images/perfume10.jpg" },
    { title: "Velour Nights", price: "₹88,899", image: "/images/perfume6.jpg" },
    { title: "Dusk in Kashmir", price: "₹99,999", image: "/images/perfume5.jpg" }
  ];

  return (
    <div className="collection-page">
      <h2 className="collection-heading">Signature Perfumes</h2>
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

export default SignaturePerfumes;

