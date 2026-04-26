import React, { useRef, useEffect } from 'react';
import './LandingPage.css';
import { useNavigate, useLocation } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';


const LandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const collectionRef = useRef(null);

  const handleCTAClick = () => {
    collectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (location.state?.scrollToAtelier) {
      setTimeout(() => {
        collectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <div className="hero">
        <div className="floating-elements">
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
        </div>

        <div className="hero-content">
          <h1 className="brand-logo">PEARL</h1>
          <h2 className="tagline">You Wear Power Gently</h2>
          <button className="cta-button" onClick={handleCTAClick}>
            Enter The Experience
          </button>
        </div>
      </div>

      {/* Features Grid Section (scroll target) */}
      <div className="features-grid" ref={collectionRef}>
        <div className="feature-card" onClick={() => navigate('/collection/emotional-couture')}>
          <div className="feature-icon">👗</div>
          <h3 className="feature-title">Emotional Couture</h3>
          <p className="feature-description">
            Each piece tells a story, designed to evoke emotions and create unforgettable moments in luxury fashion.
          </p>
        </div>

        <div className="feature-card" onClick={() => navigate('/collection/premium-accessories')}>
          <div className="feature-icon">💎</div>
          <h3 className="feature-title">Premium Accessories</h3>
          <p className="feature-description">
            Handcrafted accessories that complement your style with the finest materials and attention to detail.
          </p>
        </div>

        <div className="feature-card" onClick={() => navigate('/collection/signature-perfumes')}>
          <div className="feature-icon">🌹</div>
          <h3 className="feature-title">Signature Perfumes</h3>
          <p className="feature-description">
            Capture emotions in a bottle with our exclusive fragrance collection, each scent a journey of its own.
          </p>
        </div>

        <div className="feature-card" onClick={() => navigate('/collection/complete-styling')}>
          <div className="feature-icon">✨</div>
          <h3 className="feature-title">Complete Styling</h3>
          <p className="feature-description">
            From individual pieces to complete outfits, discover endless ways to express your unique style.
          </p>
        </div>

        <div className="feature-card" onClick={() => navigate('/collection/pinterest-perfect')}>
          <div className="feature-icon">👑</div>
          <h3 className="feature-title">Pinterest Perfect</h3>
          <p className="feature-description">
            Trendsetting pieces inspired by the most coveted Pinterest aesthetics and office-chic vibes.
          </p>
        </div>

        <div className="feature-card" onClick={() => navigate('/collection/k-drama-inspired')}>
          <div className="feature-icon">🎭</div>
          <h3 className="feature-title">The CEO</h3>
          <p className="feature-description">
            Exclusive pieces inspired by iconic K-drama fashion moments that captivated the world.
          </p>
        </div>
      </div>

      {/* Editorial Collections Section */}
      <div className="collections-section">
        <h2 className="section-title">Editorial Campaigns</h2>
        <div className="collections-grid">
          <div className="collection-card" onClick={() => navigate('/editorial/scarlet-chapter')}>
            <div className="collection-title">The Scarlet Chapter</div>
          </div>
          <div className="collection-card" onClick={() => navigate('/editorial/winter-25')}>
            <div className="collection-title">Pearled Winter '25</div>
          </div>
          <div className="collection-card" onClick={() => navigate('/editorial/debutante-edge')}>
            <div className="collection-title">The Debutante's Edge</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

