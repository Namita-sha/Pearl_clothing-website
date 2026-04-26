import React from 'react';
import './CollectionPage.css';

const CompleteStyling = () => {
  const products = [
  
    { title: "Office Dress", price: "₹58,299", image: "/images/outfit33.jpg" },
    { title: "Evening Blazer", price: "₹22,199", image: "/images/outfit34.jpg" },
    { title: "Charcoal Luxe Trousers", price: "₹42,599", image: "/images/outfit35.jpg" },
    { title: "Corporate Blush Co-ord", price: "₹55,900", image: "/images/outfit8.jpg" },
    { title: "White Boss Ensemble", price: "₹78,250", image: "/images/outfit9.jpg" },
    { title: "Mocha Confidence Fit", price: "₹63,700", image: "/images/outfit36.jpg" },
    { title: "Scarlet Classy Wrap", price: "₹69,999", image: "/images/outfit11.jpg" },
    { title: "Editorial Runway Blazer", price: "₹88,880", image: "/images/outfit12.jpg" },
    { title: "Velvet Noir Ensemble", price: "₹85,499", image: "/images/outfit3.jpg" },
  { title: "Ivory Pearl Pantsuit", price: "₹73,200", image: "/images/outfit8.jpg" },
  { title: "Crimson Authority Set", price: "₹91,000", image: "/images/outfit15.jpg" },
  { title: "Ash Grey Blazer", price: "₹54,000", image: "/images/outfit16.jpg" },
  { title: "Gilded Royal Dress", price: "₹1,10,000", image: "/images/outfit17.jpg" },
  { title: "CEO Tan Ensemble", price: "₹62,500", image: "/images/outfit18.jpg" },
  { title: "Onyx Leather Suit", price: "₹88,800", image: "/images/outfit19.jpg" },
  { title: "Cocoa Curve Set", price: "₹60,499", image: "/images/outfit20.jpg" },
  { title: "Urban Night Tux", price: "₹70,000", image: "/images/outfit21.jpg" },
  { title: "Regal Drape Dress", price: "₹77,900", image: "/images/outfit22.jpg" },
  { title: "Fierce Monochrome Blazer", price: "₹69,600", image: "/images/outfit23.jpg" },
  { title: "Velvet Edge Set", price: "₹92,300", image: "/images/outfit24.jpg" },
  { title: "Pearl Boss Coat", price: "₹66,666", image: "/images/outfit25.jpg" },
  { title: "Cherry Executive Wrap", price: "₹79,999", image: "/images/outfit26.jpg" },
  { title: "Black Gold Glam Set", price: "₹98,000", image: "/images/outfit27.jpg" },
  { title: "Twilight Leaderwear", price: "₹87,100", image: "/images/outfit28.jpg" },
  { title: "Serene Silk Suit", price: "₹64,400", image: "/images/outfit29.jpg" },
  { title: "Obsidian Trim Co-ord", price: "₹72,880", image: "/images/outfit30.jpg" },
  { title: "Bold Chic Blazer Dress", price: "₹55,200", image: "/images/outfit31.jpg" },
  { title: "Graphite Queen Suit", price: "₹89,000", image: "/images/outfit32.jpg" }
];



  return (
    <div className="collection-page">
      <h2 className="collection-heading">Complete Styling</h2>
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

export default CompleteStyling;

