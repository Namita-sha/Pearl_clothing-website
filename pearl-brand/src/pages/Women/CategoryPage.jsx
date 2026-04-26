import React, { useEffect, useState } from 'react';
import './CategoryPage.css';
import ProductCard from '../../components/ProductCard';
import { fetchProducts } from '../../api/products';

const CategoryPage = ({ category, gender = 'women', title }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetchProducts({ gender, category });

        // Backend returns the array directly (res.data is already the array).
        // Guard against both shapes just in case.
        const items = Array.isArray(res.data)
          ? res.data
          : res.data?.products ?? [];

        setProducts(items);
      } catch (err) {
        console.error(err);
        setError(`Could not load ${title}. Please try again.`);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [category, gender, title]);

  if (loading) return (
    <div className="category-page">
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <p>Loading {title}...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="category-page">
      <p className="error-state">{error}</p>
    </div>
  );

  if (products.length === 0) return (
    <div className="category-page">
      <h2 className="category-title">{title}</h2>
      <p className="empty-state">No products found in this category yet.</p>
    </div>
  );

  return (
    <div className="category-page">
      <h2 className="category-title">{title}</h2>
      <p className="category-count">{products.length} pieces</p>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;