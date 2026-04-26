import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiUser, FiHeart, FiShoppingBag, FiLogOut, FiPackage } from "react-icons/fi";
import "./Navbar.css";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser]             = useState(null);
  const [cartCount, setCartCount]   = useState(0);
  const [wishCount, setWishCount]   = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate    = useNavigate();

  const loadCounts = () => {
    const cart = JSON.parse(localStorage.getItem('pearlCart') || '[]');
    const wl   = JSON.parse(localStorage.getItem('pearlWishlist') || '[]');
    setCartCount(cart.reduce((s, i) => s + i.quantity, 0));
    setWishCount(wl.length);
  };

  useEffect(() => {
    const stored = localStorage.getItem("pearlUser");
    if (stored) setUser(JSON.parse(stored));
    loadCounts();

    window.addEventListener('cartUpdated', loadCounts);
    window.addEventListener('wishlistUpdated', loadCounts);
    return () => {
      window.removeEventListener('cartUpdated', loadCounts);
      window.removeEventListener('wishlistUpdated', loadCounts);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim())
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('pearlUser');
    localStorage.removeItem('pearlToken');
    setUser(null);
    setShowDropdown(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo" onClick={() => {
        window.location.pathname === '/'
          ? window.scrollTo({ top: 0, behavior: 'smooth' })
          : navigate('/');
      }}>
        PEARL
      </div>

      {/* Nav Links */}
      <div className="navbar-links">
        <Link to="/women">Women</Link>
        <Link to="/men">Men</Link>
        <Link to="/" onClick={(e) => {
          e.preventDefault();
          window.location.pathname === '/'
            ? document.querySelector('.features-grid')?.scrollIntoView({ behavior: 'smooth' })
            : navigate('/', { state: { scrollToAtelier: true } });
        }}>The Atelier</Link>
        <Link to="/ai-stylist" className="ai-link">✨ AI Stylist</Link>
      </div>

      {/* Icons */}
      <div className="navbar-icons">
        {/* Search */}
        <div className="search-container">
          <input
            type="text"
            className="hidden-search-input"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch} className="icon-button">
            <FiSearch size={18} />
          </button>
        </div>

        {/* User Avatar + Dropdown */}
        {user ? (
          <div className="avatar-wrapper" ref={dropdownRef}>
            <div
              className="nav-avatar"
              onClick={() => setShowDropdown(prev => !prev)}
              title="My Account"
            >
              {user.username?.[0]?.toUpperCase()}
            </div>

            {showDropdown && (
              <div className="profile-dropdown">
                <div className="dropdown-header">
                  <p className="dropdown-name">{user.username}</p>
                  <p className="dropdown-email">{user.email}</p>
                </div>
                <Link
                  to="/orders"
                  className="dropdown-item"
                  onClick={() => setShowDropdown(false)}
                >
                  <FiPackage size={14} /> My Orders
                </Link>
                <Link
                  to="/wishlist"
                  className="dropdown-item"
                  onClick={() => setShowDropdown(false)}
                >
                  <FiHeart size={14} /> Wishlist
                </Link>
                <button className="dropdown-item logout-item" onClick={handleLogout}>
                  <FiLogOut size={14} /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/auth" className="icon-button" title="Login">
            <FiUser size={20} />
          </Link>
        )}

        {/* Wishlist */}
        <Link to={user ? "/wishlist" : "/auth"} className="icon-button icon-badge-wrapper" title="Wishlist">
          <FiHeart size={20} />
          {wishCount > 0 && <span className="icon-badge">{wishCount}</span>}
        </Link>

        {/* Cart */}
        <Link to="/cart" className="icon-button icon-badge-wrapper" title="Cart">
          <FiShoppingBag size={20} />
          {cartCount > 0 && <span className="icon-badge">{cartCount}</span>}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
