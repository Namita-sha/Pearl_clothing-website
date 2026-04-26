import React from 'react';
import ProductCard from './ProductCard';

const Section = ({ id, title, desc, products }) => (
  <section id={id} className="collection-section">
    <h2>{title}</h2>
    <p>{desc}</p>
    <div className="product-grid">
      {products.map((item, index) => (
        <ProductCard
          key={index}
          image={item.image}
          title={item.title}
          price={item.price}
        />
      ))}
    </div>
  </section>
);

export default Section;
