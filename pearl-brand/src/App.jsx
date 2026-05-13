import React from 'react';
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import Auth from './pages/LandingPage/Auth/Auth';
import WomenPage from './pages/Women/WomenPage';
import Dresses from './pages/Women/Dresses';
import Shirts from './pages/Women/Shirts';
import Outerwear from './pages/Women/Outerwear';
import Trousers from './pages/Women/Trousers';
import Handbags from './pages/Women/Handbags';
import Footwear from './pages/Women/Footwear';
import MenPage from './pages/Men/MenPage';
import MenShirts from './pages/Men/Shirts';
import MenTrousers from './pages/Men/Trousers';
import MenOuterwear from './pages/Men/Outerwear';
import MenFootwear from './pages/Men/Footwear';

// Collection Pages
import EmotionalCouture from './pages/Collections/EmotionalCouture';
import PremiumAccessories from './pages/Collections/PremiumAccessories';
import SignaturePerfumes from './pages/Collections/SignaturePerfumes';
import CompleteStyling from './pages/Collections/CompleteStyling';
import PinterestPerfect from './pages/Collections/PinterestPerfect';
import KDramaInspired from './pages/Collections/KDramaInspired';

// Editorial Campaign Pages
import ScarletChapter from './pages/Editorial/ScarletChapter';
import Winter25 from './pages/Editorial/Winter25';
import DebutanteEdge from './pages/Editorial/DebutanteEdge';

import CartPage from './pages/Cart/CartPage';
import CheckoutPage from './pages/Checkout/CheckoutPage';
import OrdersPage from './pages/Orders/OrdersPage';
import AIStylist from './pages/AIStylist/AIStylist';
import WishlistPage from './pages/Wishlist/WishlistPage';
import ProfilePage from './pages/Profile/ProfilePage';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* Main */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Auth />} />

          {/* Women */}
          <Route path="/women" element={<WomenPage />} />
          <Route path="/women/dresses" element={<Dresses />} />
          <Route path="/women/shirts" element={<Shirts />} />
          <Route path="/women/outerwear" element={<Outerwear />} />
          <Route path="/women/trousers" element={<Trousers />} />
          <Route path="/women/handbags" element={<Handbags />} />
          <Route path="/women/footwear" element={<Footwear />} />

          {/* Men */}
          <Route path="/men" element={<MenPage />} />
          <Route path="/men/shirts" element={<MenShirts />} />
          <Route path="/men/trousers" element={<MenTrousers />} />
          <Route path="/men/outerwear" element={<MenOuterwear />} />
          <Route path="/men/footwear" element={<MenFootwear />} />

          {/* Collections */}
          <Route path="/collection/emotional-couture" element={<EmotionalCouture />} />
          <Route path="/collection/premium-accessories" element={<PremiumAccessories />} />
          <Route path="/collection/signature-perfumes" element={<SignaturePerfumes />} />
          <Route path="/collection/complete-styling" element={<CompleteStyling />} />
          <Route path="/collection/pinterest-perfect" element={<PinterestPerfect />} />
          <Route path="/collection/k-drama-inspired" element={<KDramaInspired />} />

          {/* Editorial */}
          <Route path="/editorial/scarlet-chapter" element={<ScarletChapter />} />
          <Route path="/editorial/winter-25" element={<Winter25 />} />
          <Route path="/editorial/debutante-edge" element={<DebutanteEdge />} />

          {/* New Routes */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/ai-stylist" element={<AIStylist />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;