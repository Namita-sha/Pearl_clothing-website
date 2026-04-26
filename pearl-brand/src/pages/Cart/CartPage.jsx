import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('pearlCart') || '[]');
    setCart(stored);
  }, []);

  const updateQty = (id, delta) => {
    const updated = cart.map(item =>
      item._id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCart(updated);
    localStorage.setItem('pearlCart', JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cart.filter(item => item._id !== id);
    setCart(updated);
    localStorage.setItem('pearlCart', JSON.stringify(updated));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) return (
    <div className="cart-page">
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <p>Discover pieces made for you</p>
        <button onClick={() => navigate('/women')}>Shop Women</button>
        <button onClick={() => navigate('/men')}>Shop Men</button>
      </div>
    </div>
  );

  return (
    <div className="cart-page">
      <h2 className="cart-title">Your Cart</h2>
      <div className="cart-layout">
        <div className="cart-items">
          {cart.map(item => (
            <div className="cart-item" key={item._id}>
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p className="cart-item-price">₹{item.price?.toLocaleString('en-IN')}</p>
                <div className="qty-controls">
                  <button onClick={() => updateQty(item._id, -1)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQty(item._id, +1)}>+</button>
                </div>
              </div>
              <button className="remove-btn" onClick={() => removeItem(item._id)}>✕</button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{total.toLocaleString('en-IN')}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span className="free">FREE</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{total.toLocaleString('en-IN')}</span>
          </div>
          <button
            className="checkout-btn"
            onClick={() => {
              const user = localStorage.getItem('pearlUser');
              if (!user) return navigate('/auth');
              navigate('/checkout', { state: { cart, total } });
            }}
          >
            Proceed to Checkout
          </button>
          <button className="continue-btn" onClick={() => navigate('/women')}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;