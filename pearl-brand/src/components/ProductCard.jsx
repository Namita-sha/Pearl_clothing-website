import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';
import './ProductCard.css';

const ProductCard = (props) => {
  // support both <ProductCard product={p} /> and <ProductCard {...p} />
  const product = props.product || props;
  const { _id, name, price, image, description } = product;

  const navigate = useNavigate();
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  // Check if already wishlisted on mount
  useEffect(() => {
    const wl = JSON.parse(localStorage.getItem('pearlWishlist') || '[]');
    setWishlisted(wl.some(item => item._id === _id));
  }, [_id]);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    const cart = JSON.parse(localStorage.getItem('pearlCart') || '[]');
    const existing = cart.find(item => item._id === _id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ _id, name, price, image, quantity: 1 });
    }
    localStorage.setItem('pearlCart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    const user = localStorage.getItem('pearlUser');
    if (!user) { navigate('/auth'); return; }

    const wl = JSON.parse(localStorage.getItem('pearlWishlist') || '[]');
    const exists = wl.some(item => item._id === _id);

    let updated;
    if (exists) {
      updated = wl.filter(item => item._id !== _id);
    } else {
      updated = [...wl, { _id, name, price, image }];
    }
    localStorage.setItem('pearlWishlist', JSON.stringify(updated));
    window.dispatchEvent(new Event('wishlistUpdated'));
    setWishlisted(!exists);
  };

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img
          src={image}
          alt={name}
          className="product-image"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400'; }}
        />
        <button
          className={`wishlist-btn ${wishlisted ? 'active' : ''}`}
          onClick={handleWishlist}
          title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
         <FiHeart fill={wishlisted ? '#800020' : 'none'} stroke={wishlisted ? '#800020' : '#fff'} />
        </button>
      </div>

      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        {description && <p className="product-description">{description}</p>}
        <div className="product-footer">
          <span className="product-price">₹{price?.toLocaleString('en-IN')}</span>
          <button
            className={`cart-btn ${addedToCart ? 'added' : ''}`}
            onClick={handleAddToCart}
          >
            <FiShoppingBag size={13} />
            {addedToCart ? 'Added!' : 'Add to Bag'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;