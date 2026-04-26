import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './ProfilePage.css';

const ProfilePage = () => {
  const [user, setUser]       = useState(null);
  const [orders, setOrders]   = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('pearlUser');
    if (!stored) return navigate('/auth');
    setUser(JSON.parse(stored));

    const wish = JSON.parse(localStorage.getItem('pearlWishlist') || '[]');
    const cart = JSON.parse(localStorage.getItem('pearlCart') || '[]');
    setWishlist(wish);
    setCartCount(cart.reduce((s, i) => s + i.quantity, 0));

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('pearlToken');
        const { data } = await axios.get('http://localhost:5000/api/orders/my-orders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(data);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('pearlUser');
    localStorage.removeItem('pearlToken');
    navigate('/auth');
  };

  if (!user) return null;

  return (
    <div className="profile-page">
      {/* Profile Header */}
      <div className="profile-hero">
        <div className="profile-avatar">
          {user.username?.charAt(0).toUpperCase()}
        </div>
        <div className="profile-info">
          <h2 className="profile-name">{user.username}</h2>
          <p className="profile-email">{user.email}</p>
          <span className="profile-badge">Pearl Member</span>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Sign Out
        </button>
      </div>

      {/* Stats Row */}
      <div className="profile-stats">
        <Link to="/orders" className="stat-card">
          <span className="stat-number">{orders.length}</span>
          <span className="stat-label">Orders</span>
        </Link>
        <Link to="/wishlist" className="stat-card">
          <span className="stat-number">{wishlist.length}</span>
          <span className="stat-label">Wishlist</span>
        </Link>
        <Link to="/cart" className="stat-card">
          <span className="stat-number">{cartCount}</span>
          <span className="stat-label">In Cart</span>
        </Link>
      </div>

      {/* Recent Orders */}
      <div className="profile-section">
        <div className="section-header">
          <h3>Recent Orders</h3>
          <Link to="/orders" className="see-all">See all →</Link>
        </div>

        {loading ? (
          <div className="profile-loading">
            <div className="loading-spinner"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="profile-empty">
            <p>No orders yet.</p>
            <Link to="/women">Start shopping →</Link>
          </div>
        ) : (
          <div className="orders-preview">
            {orders.slice(0, 3).map(order => (
              <div className="order-preview-card" key={order._id}>
                <div className="order-preview-left">
                  <p className="order-preview-id">
                    #{order._id.slice(-8).toUpperCase()}
                  </p>
                  <p className="order-preview-date">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    })}
                  </p>
                  <p className="order-preview-items">
                    {order.items?.length} item{order.items?.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="order-preview-right">
                  <span className={`order-badge ${order.status}`}>
                    {order.status}
                  </span>
                  <p className="order-preview-total">
                    ₹{order.totalAmount?.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Wishlist Preview */}
      <div className="profile-section">
        <div className="section-header">
          <h3>Saved Pieces</h3>
          <Link to="/wishlist" className="see-all">See all →</Link>
        </div>
        {wishlist.length === 0 ? (
          <div className="profile-empty">
            <p>Nothing saved yet.</p>
            <Link to="/women">Explore collection →</Link>
          </div>
        ) : (
          <div className="wishlist-preview">
            {wishlist.slice(0, 4).map(item => (
              <div className="wishlist-preview-item" key={item._id}>
                <img src={item.image} alt={item.name}
                  onError={e => e.target.src = 'https://via.placeholder.com/80'} />
                <div>
                  <p className="wl-name">{item.name}</p>
                  <p className="wl-price">₹{item.price?.toLocaleString('en-IN')}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="profile-section">
        <h3>Quick Links</h3>
        <div className="quick-links">
          <Link to="/cart"      className="quick-link">🛍️ My Cart</Link>
          <Link to="/wishlist"  className="quick-link">♡ Wishlist</Link>
          <Link to="/orders"    className="quick-link">📦 All Orders</Link>
          <Link to="/ai-stylist" className="quick-link">✨ AI Stylist</Link>
          <Link to="/women"     className="quick-link">👗 Women</Link>
          <Link to="/men"       className="quick-link">👔 Men</Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;