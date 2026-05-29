import React from 'react';
import { MapPin } from 'lucide-react';

function InBhawan() {
  return (
    <div className="page-content fade-in">
      <h2 className="section-title"><MapPin className="icon-title"/> Other Places in Bhawan</h2>
      <div className="grid-cards">
        <div className="card info-card">
          <h3>Ardhkuwari</h3>
          <p>Located halfway to the Bhawan, this is the holy cave where Mata Vaishno Devi is believed to have meditated for nine months.</p>
        </div>
        <div className="card info-card">
          <h3>Bhairon Temple</h3>
          <p>Located 2km above the main Bhawan. The pilgrimage is considered incomplete without paying respects at the Bhairon Temple.</p>
        </div>
        <div className="card info-card">
          <h3>Sanjichhat</h3>
          <p>The highest point on the trek. It offers breathtaking panoramic views of the valley and serves as the helipad for the shrine.</p>
        </div>
      </div>
    </div>
  );
}

export default InBhawan;
