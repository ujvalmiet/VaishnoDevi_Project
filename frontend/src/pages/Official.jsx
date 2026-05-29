import React from 'react';
import { Link2, Phone, AlertCircle, PlayCircle, ExternalLink } from 'lucide-react';

function Official() {
  return (
    <div className="page-content fade-in">
      <h2 className="section-title"><Link2 className="icon-title"/> Official Shrine Board Links</h2>
      
      <div className="card suggestion-box" style={{borderLeftColor: 'var(--primary)', background: 'rgba(255, 71, 87, 0.05)'}}>
        <h3><AlertCircle size={20} style={{marginRight: '8px', verticalAlign: 'text-bottom'}}/> Important Notice</h3>
        <p>There is no public API provided by the Shri Mata Vaishno Devi Shrine Board (SMVDSB). All bookings should be made strictly through the official website.</p>
      </div>

      <div className="grid-cards" style={{marginBottom: '40px'}}>
        <div className="card info-card">
          <h3>Yatra Parchi & Room Bookings</h3>
          <p>Book your RFID Yatra Parchi, Battery Cars, and Accommodation directly from the official portal.</p>
          <div style={{marginTop: '20px'}}>
            <a href="https://www.maavaishnodevi.org" target="_blank" rel="noreferrer" style={{color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', fontWeight: 'bold'}}>
              <ExternalLink size={16} /> www.maavaishnodevi.org
            </a>
            <br />
            <a href="https://online.maavaishnodevi.org" target="_blank" rel="noreferrer" style={{color: 'var(--primary-light)', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', fontWeight: 'bold'}}>
              <ExternalLink size={16} /> online.maavaishnodevi.org
            </a>
          </div>
        </div>
        <div className="card info-card">
          <h3><Phone size={18} style={{marginRight: '6px', verticalAlign: 'text-bottom'}}/> 24x7 Helplines</h3>
          <p>For emergencies and official support:</p>
          <ul style={{listStyle: 'none', padding: 0, marginTop: '12px'}}>
            <li style={{marginBottom: '8px'}}><strong>Toll Free:</strong> <a href="tel:18001807212" style={{color: 'var(--text-main)', textDecoration: 'none'}}>1800-180-7212</a></li>
            <li style={{marginBottom: '8px'}}><strong>Helpline:</strong> <a href="tel:01991232887" style={{color: 'var(--text-main)', textDecoration: 'none'}}>01991-232887</a></li>
            <li><strong>Email:</strong> <a href="mailto:online@maavaishnodevi.net" style={{color: 'var(--secondary)', textDecoration: 'none'}}>online@maavaishnodevi.net</a></li>
          </ul>
        </div>
      </div>

      <h2 className="section-title"><PlayCircle className="icon-title"/> Live Aarti Darshan</h2>
      <div className="card content-card" style={{textAlign: 'center'}}>
        <p>Watch the Live Aarti straight from the Holy Cave. The Aarti is officially broadcasted daily.</p>
        <div style={{marginTop: '24px', marginBottom: '24px'}}>
          <PlayCircle size={64} color="#ff0000" />
        </div>
        <a href="https://www.youtube.com/results?search_query=vaishno+devi+live+aarti+shraddha+mh+one" target="_blank" rel="noreferrer" className="btn-predict" style={{display: 'inline-block', textDecoration: 'none'}}>Watch Live on YouTube</a>
      </div>
    </div>
  );
}

export default Official;
