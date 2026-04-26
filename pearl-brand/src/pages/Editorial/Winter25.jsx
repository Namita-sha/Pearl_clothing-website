import React from 'react';
import './EditorialPage.css';

const Winter25 = () => {
  const products = [
    { id: 1, name: "Pearled Blazer", price: "₹6,200", img: "/images/peral_blazer.jpg" },
    { id: 2, name: "Frosted Trench Coat", price: "₹8,999", img: "/images/frosted_trenchcoat.jpg" },
    { id: 3, name: "Snow Knit Ensemble", price: "₹3,800", img: "/images/snow_sweater.jpg" },
  ];

  return (
    <div className="editorial-page">
      <h1 className="editorial-header">Pearled Winter '25</h1>
      <p className="collection-description">
        Cozy meets couture. Winter wear that whispers luxury.
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

export default Winter25;
