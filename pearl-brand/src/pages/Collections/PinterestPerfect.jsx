import React from 'react';
import './CollectionPage.css';

const PinterestPerfect = () => {
  const products = [
    { title: "Soft Blush Trench", price: "₹6,899", image: "/images/trenchcoat.jpg" },
    { title: "Pastel Vibe Jumpsuit", price: "₹7,599", image: "/images/pinterest1.jpg" },
    { title: "Chic Blogger Set", price: "₹9,000", image: "/images/pinterestdress.jpg" },
    { title: "Creamy Corduroy Fit", price: "₹6,599", image: "/images/officedress.jpg" },
    { title: "Autumn Muse Co-ord", price: "₹7,899", image: "/images/shortdress1.jpg" },
    { title: "Vintage Checkered Blazer", price: "₹8,499", image: "/images/checkblazer.jpg" },
    { title: "Minimal Softwear Suit", price: "₹6,299", image: "/images/minimalsuit.jpg" },
    { title: "Ivory Luxe Coat", price: "₹11,200", image: "/images/ivorycoat.jpg" },
    { title: "Blush Aesthetic Romper", price: "₹6,899", image: "/images/blushromper.jpg" },
    { title: "Retro Revival Jacket", price: "₹8,050", image: "/images/retrojacket.jpg" },
    { title: "Café Date Ensemble", price: "₹7,700", image: "/images/cafedate.jpg" },
    { title: "Dusty Pink Knit Set", price: "₹9,450", image: "/images/dustypinkset.jpg" }
  ];

  return (
    <div className="collection-page">
      <h2 className="collection-heading">Pinterest Perfect</h2>
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

export default PinterestPerfect;
