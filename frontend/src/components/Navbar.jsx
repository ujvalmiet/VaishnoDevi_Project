import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  
  return (
    <nav className="navbar">
      <div className="nav-logo">Mata Vaishno Devi Yatra</div>
      <div className="nav-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Predictor</Link>
        <Link to="/about-temple" className={location.pathname === '/about-temple' ? 'active' : ''}>About Temple</Link>
        <Link to="/bhawan" className={location.pathname === '/bhawan' ? 'active' : ''}>In Bhawan</Link>
        <Link to="/nearby" className={location.pathname === '/nearby' ? 'active' : ''}>Nearby</Link>
        <Link to="/about-site" className={location.pathname === '/about-site' ? 'active' : ''}>About Site</Link>
        <Link to="/guidelines" className={location.pathname === '/guidelines' ? 'active' : ''}>Guidelines</Link>
        <Link to="/official" className={location.pathname === '/official' ? 'active' : ''}>Official Links</Link>
      </div>
    </nav>
  );
}

export default Navbar;
