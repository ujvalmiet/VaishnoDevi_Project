import React from 'react';
import { Mountain } from 'lucide-react';

function AboutTemple() {
  return (
    <div className="page-content fade-in">
      <h2 className="section-title"><Mountain className="icon-title"/> About Mata Vaishno Devi</h2>
      <div className="card content-card">
        <img src="/bhawan-night.jpg" alt="Vaishno Devi Bhawan at Night" className="hero-img" />
        <p>Mata Vaishno Devi is one of the most revered Hindu pilgrimage sites in the world, located in the Trikuta Mountains in Katra, Jammu & Kashmir. It is dedicated to Goddess Vaishnavi, who is believed to grant the wishes of sheets those who visit her holy cave.</p>
        <p>The trek to the holy shrine spans approximately 12 kilometers from the base camp at Katra. Millions of devotees undertake this spiritual journey every year, navigating steep inclines and beautiful mountainous terrain, chanting "Jai Mata Di".</p>
      </div>
    </div>
  );
}

export default AboutTemple;
