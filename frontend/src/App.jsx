import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AboutTemple from './pages/AboutTemple';
import InBhawan from './pages/InBhawan';
import Nearby from './pages/Nearby';
import Guidelines from './pages/Guidelines';
import AboutSite from './pages/AboutSite';
import Official from './pages/Official';
import './App.css';

function App() {
  return (
    <Router>
      <div className="dashboard">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-temple" element={<AboutTemple />} />
          <Route path="/bhawan" element={<InBhawan />} />
          <Route path="/nearby" element={<Nearby />} />
          <Route path="/guidelines" element={<Guidelines />} />
          <Route path="/about-site" element={<AboutSite />} />
          <Route path="/official" element={<Official />} />
        </Routes>
        <footer style={{textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)'}}>
          Jai Mata Di | Yatri Footfall Predictor
        </footer>
      </div>
    </Router>
  );
}

export default App;
