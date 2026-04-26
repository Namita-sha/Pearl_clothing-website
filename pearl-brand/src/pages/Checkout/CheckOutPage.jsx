import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { state } = useLocation();
  const navigate  = useNavigate();
  const cart      = state?.cart  || JSON.parse(localStorage.getItem('pearlCart') || '[]');
  const total     = state?.total || cart.reduce((s, i) => s + i.price * i.quantity, 0);

  const [form, setForm] = useState({
    name: '', phone: '', address: '', city: '', pincode: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src   = 'https://checkout.razorpay.com/v1/checkout.js';
    document.body.appendChild(script);
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handlePayment = async () => {
    // Validate form
    for (const key of Object.keys(form)) {
      if (!form[key].trim()) return alert('Please fill all fields');
    }

    const token = localStorage.getItem('pearlToken');
    setLoading(true);

    try {
      // Step 1: Create Razorpay order on backend
      const { data } = await axios.post(
        'http://localhost:5000/api/orders/create-razorpay-order',
        { totalAmount: total },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Step 2: Open Razorpay payment modal
      const options = {
        key:         import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount:      data.amount,
        currency:    'INR',
        name:        'PEARL',
        description: 'Luxury Fashion',
        order_id:    data.orderId,
        handler: async (response) => {
          // Step 3: Verify payment on backend
          try {
            await axios.post(
              'http://localhost:5000/api/orders/verify-payment',
              {
                razorpay_order_id:   response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature:  response.razorpay_signature,
                items:           cart.map(i => ({
                  product:  i._id,
                  quantity: i.quantity,
                  price:    i.price
                })),
                totalAmount:     total,
                shippingAddress: form
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            // Clear cart
            localStorage.removeItem('pearlCart');
            navigate('/orders', { state: { success: true } });
          } catch {
            alert('Payment verification failed. Contact support.');
          }
        },
        prefill: { name: form.name, contact: form.phone },
        theme:   { color: '#d4af37' }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert('Could not initiate payment. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <h2 className="checkout-title">Checkout</h2>

      <div className="checkout-layout">
        {/* Shipping Form */}
        <div className="shipping-form">
          <h3>Shipping Details</h3>
          {[
            { name: 'name',    placeholder: 'Full Name',     type: 'text' },
            { name: 'phone',   placeholder: 'Phone Number',  type: 'tel'  },
            { name: 'address', placeholder: 'Address',       type: 'text' },
            { name: 'city',    placeholder: 'City',          type: 'text' },
            { name: 'pincode', placeholder: 'Pincode',       type: 'text' },
          ].map(field => (
            <input
              key={field.name}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={form[field.name]}
              onChange={handleChange}
              className="checkout-input"
            />
          ))}
        </div>

        {/* Order Summary */}
        <div className="checkout-summary">
          <h3>Order Summary</h3>
          {cart.map(item => (
            <div className="checkout-item" key={item._id}>
              <img src={item.image} alt={item.name} />
              <div>
                <p className="item-name">{item.name}</p>
                <p className="item-meta">Qty: {item.quantity} × ₹{item.price?.toLocaleString('en-IN')}</p>
              </div>
              <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
            </div>
          ))}

          <div className="checkout-total">
            <span>Total</span>
            <span>₹{total.toLocaleString('en-IN')}</span>
          </div>

          <button
            className="pay-btn"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? 'Processing...' : `Pay ₹${total.toLocaleString('en-IN')}`}
          </button>

          <p className="secure-note">🔒 Secured by Razorpay</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;