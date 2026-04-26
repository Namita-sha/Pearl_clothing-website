import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import './WishlistPage.css';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  const load = () => {
    const stored = JSON.parse(localStorage.getItem('pearlWishlist') || '[]');
    setWishlist(stored);
  };

  useEffect(() => {
    const user = localStorage.getItem('pearlUser');
    if (!user) return navigate('/auth');
    load();
    window.addEventListener('wishlistUpdated', load);
    return () => window.removeEventListener('wishlistUpdated', load);
  }, []);

  if (wishlist.length === 0) return (
    <div className="wishlist-page">
      <div className="wishlist-empty">
        <span className="empty-heart">♡</span>
        <h2>Your wishlist is empty</h2>
        <p>Save pieces you love — they'll wait for you here.</p>
        <button onClick={() => navigate('/women')}>Explore Collection</button>
      </div>
    </div>
  );

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h2 className="wishlist-title">My Wishlist</h2>
        <p className="wishlist-count">{wishlist.length} saved pieces</p>
      </div>
      <div className="wishlist-grid">
        {wishlist.map(item => (
          <ProductCard key={item._id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;