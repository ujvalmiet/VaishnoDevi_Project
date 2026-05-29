import React from 'react';
import { Info } from 'lucide-react';

function AboutSite() {
  return (
    <div className="page-content fade-in">
      <h2 className="section-title"><Info className="icon-title"/> About this Prediction Site</h2>
      <div className="card content-card">
        <p>This web application was built to assist pilgrims in planning their journey to the Holy Shrine. By predicting the daily footfall, devotees can choose the best days to travel and avoid extreme crowds.</p>
        <ul>
          <li><strong>Data Source:</strong> The model is trained on actual daily footfall data spanning 40 years (1986 - 2025), totaling over 14,000 historical records.</li>
          <li><strong>Machine Learning:</strong> We utilize a Random Forest Regression model that considers multiple features including seasonality, Navratri festivals, weekends, and historical trends.</li>
          <li><strong>Weather Integration:</strong> Real-time weather forecasts are fetched from the Open-Meteo API for Katra to provide contextual advice for the climb.</li>
        </ul>
      </div>
    </div>
  );
}

export default AboutSite;
