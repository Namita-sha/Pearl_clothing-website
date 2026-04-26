import React from 'react';
import './CollectionPage.css';

const PremiumAccessories = () => {
  const products = [
    { title: " Royal Necklace", price: "₹22,299", image: "/images/necklace3.jpg" },
    { title: " Crystal Earrings", price: "₹33,499", image: "/images/earrings.jpg" },
    { title: "Pearl Accent Bracelet", price: "₹11,899", image: "/images/bracelet.jpg" },
    { title: "Pearl Necklace", price: "₹77,499", image: "/images/necklace4.jpg" },
    { title: "Crystal Necklace", price: "₹15,000", image: "/images/necklace5.jpg" },
    { title: "Royal Brooch", price: "₹6,999", image: "/images/broach.jpg" },
    { title: "Vintage Peacock Brooch", price: "₹18,999", image: "/images/brooch.jpg" },
    { title: "Vintage watch", price: "₹12,500", image: "/images/watch2.jpg" },
    { title: "Elegant Watch", price: "₹27,999", image: "/images/watch.jpg" },
    { title: "Princess Necklace", price: "₹9,499", image: "/images/necklace6.jpg" },
    { title: "Arm Cuff", price: "₹4,999", image: "/images/armcuff.jpg" },
    { title: "Crystal Drop Pendant", price: "₹14,299", image: "/images/pendant.jpg" }
  ];

  return (
    <div className="collection-page">
      <h2 className="collection-heading">Premium Accessories</h2>
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

export default PremiumAccessories;

