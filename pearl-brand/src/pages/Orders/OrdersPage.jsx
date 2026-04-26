import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './OrdersPage.css';

const OrdersPage = () => {
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);
  const { state }             = useLocation();
  const navigate              = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const token = localStorage.getItem('pearlToken');
      if (!token) return navigate('/auth');
      try {
        const { data } = await axios.get(
          'http://localhost:5000/api/orders/my-orders',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOrders(data);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return (
    <div className="orders-page">
      <div className="orders-loading">
        <div className="loading-spinner"></div>
        <p>Loading your orders...</p>
      </div>
    </div>
  );

  return (
    <div className="orders-page">
      {state?.success && (
        <div className="success-banner">
          🎉 Order placed successfully! Thank you for shopping with PEARL.
        </div>
      )}

      <h2 className="orders-title">My Orders</h2>

      {orders.length === 0 ? (
        <div className="no-orders">
          <p>No orders yet.</p>
          <button onClick={() => navigate('/women')}>Start Shopping</button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div className="order-card" key={order._id}>
              <div className="order-header">
                <div>
                  <p className="order-id">Order #{order._id.slice(-8).toUpperCase()}</p>
                  <p className="order-date">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'long', year: 'numeric'
                    })}
                  </p>
                </div>
                <div className="order-right">
                  <span className={`order-status ${order.status}`}>{order.status}</span>
                  <p className="order-total">₹{order.totalAmount?.toLocaleString('en-IN')}</p>
                </div>
              </div>

              <div className="order-items">
                {order.items?.map((item, i) => (
                  <div className="order-item" key={i}>
                    {item.product?.image && (
                      <img src={item.product.image} alt={item.product?.name} />
                    )}
                    <div>
                      <p>{item.product?.name || 'Product'}</p>
                      <p className="order-item-meta">
                        Qty: {item.quantity} × ₹{item.price?.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {order.shippingAddress && (
                <p className="order-address">
                  📦 {order.shippingAddress.address}, {order.shippingAddress.city} — {order.shippingAddress.pincode}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;