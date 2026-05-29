import React from 'react';
import { Compass, ExternalLink } from 'lucide-react';

function Nearby() {
  return (
    <div className="page-content fade-in">
      <h2 className="section-title"><Compass className="icon-title"/> Places Nearby Katra</h2>
      <div className="grid-cards">
        <div className="card info-card">
          <img src="/patnitop.png" alt="Patnitop" className="card-img" />
          <h3>Patnitop</h3>
          <p>A beautiful hill resort situated about 80km from Katra, known for its picturesque meadows and pine forests.</p>
          <a href="https://en.wikipedia.org/wiki/Patnitop" target="_blank" rel="noreferrer" style={{color: 'var(--primary-light)', display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '16px', textDecoration: 'none', fontWeight: '500'}}>
             Read More <ExternalLink size={14}/>
          </a>
        </div>
        <div className="card info-card">
          <img src="/shivkhori.png" alt="Shiv Khori" className="card-img" />
          <h3>Shiv Khori</h3>
          <p>A famous cave shrine of Lord Shiva located roughly 70km from Katra, featuring a naturally formed Shivling.</p>
          <a href="https://en.wikipedia.org/wiki/Shivkhori" target="_blank" rel="noreferrer" style={{color: 'var(--primary-light)', display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '16px', textDecoration: 'none', fontWeight: '500'}}>
             Read More <ExternalLink size={14}/>
          </a>
        </div>
        <div className="card info-card">
          <img src="/trek.png" alt="Baba Dhansar" className="card-img" />
          <h3>Baba Dhansar</h3>
          <p>A sacred site just 15km from Katra, featuring a beautiful spring emerging from the rocks and a temple dedicated to Lord Shiva.</p>
          <a href="https://en.wikipedia.org/wiki/Baba_Dhansar" target="_blank" rel="noreferrer" style={{color: 'var(--primary-light)', display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '16px', textDecoration: 'none', fontWeight: '500'}}>
             Read More <ExternalLink size={14}/>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Nearby;
