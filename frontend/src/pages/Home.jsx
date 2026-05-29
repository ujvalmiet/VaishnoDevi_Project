import React, { useState, useEffect } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Cloud, Droplets, Thermometer, ThermometerSun, Calendar as CalendarIcon, Activity, Star, Users, Map } from 'lucide-react';

function Home() {
  const [predictionData, setPredictionData] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  const [targetDate, setTargetDate] = useState('');
  const [numPeople, setNumPeople] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];
    setTargetDate(dateStr);
    fetchHistory();
  }, []);

  const handlePredict = async (e) => {
    if (e) e.preventDefault();
    if (!targetDate) return;

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/predict?date_str=${targetDate}`);
      const data = await res.json();
      setPredictionData(data);
      setFormSubmitted(true);
    } catch (err) {
      console.error("Failed to fetch prediction", err);
    }
    setLoading(false);
  };

  const fetchHistory = async () => {
    try {
      const res = await fetch(`http://localhost:8000/history_yearly`);
      const data = await res.json();
      setHistoryData(data);
    } catch (err) {
      console.error("Failed to fetch history", err);
    }
  };

  const formatDateString = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Logic for suggestion box
  let crowdMessage = "";
  let serviceSuggestions = [];

  if (predictionData) {
    let crowdLvl = predictionData.predicted_visitors;
    if (crowdLvl > 40000) {
      crowdMessage = "Heavy rush expected! Try to start your trek from Katra early in the morning (around 4-5 AM) or late at night.";
      serviceSuggestions.push({ icon: '🚁', title: 'Helicopter', desc: 'Highly recommended due to massive crowds. Pre-book exactly 60 days in advance!' });
      serviceSuggestions.push({ icon: '🚙', title: 'Battery Car', desc: 'Very difficult to get on the spot today. Book online beforehand.' });
    } else if (crowdLvl > 25000) {
      crowdMessage = "Moderate crowd expected. A steady pace will be fine, but expect some wait times at the main Bhawan.";
      serviceSuggestions.push({ icon: '🐴', title: 'Ponies / Palki', desc: `A good physical support option if elderly people are in your group of ${numPeople}.` });
      serviceSuggestions.push({ icon: '🚙', title: 'Battery Car', desc: 'Recommended from Ardhkuwari to Bhawan to save energy.' });
    } else {
      crowdMessage = "Low crowd expected. This is an ideal day for a peaceful Darshan. The trek will be comfortable.";
      serviceSuggestions.push({ icon: '🚶', title: 'Trekking', desc: 'The weather and crowd are perfect for a peaceful foot trek!' });
    }

    serviceSuggestions.push({ icon: '🚠', title: 'Bhawan Ropeway', desc: 'Available from Bhawan to Bhairon Temple. Ticket available on spot.' });

    if (numPeople >= 4) {
      serviceSuggestions.push({ icon: '🏠', title: 'Accommodation', desc: `Since you have a group of ${numPeople}, book dormitories at Sanjichhat or Bhawan early.` });
    }
    if (predictionData.weather.precipitation > 5) {
      serviceSuggestions.push({ icon: '☔', title: 'Rain Gear', desc: 'Rain is predicted! Please carry raincoats and wear trekking shoes with good grip.' });
    }
  }

  return (
    <div className="page-content fade-in">
      <div className="header" style={{ marginBottom: '32px' }}>
        <h1>Yatri Travel Planner</h1>
        <p>Book your virtual journey to discover crowd forecasts and services.</p>
      </div>

      <div className="card" style={{ maxWidth: '600px', margin: '0 auto', marginBottom: '48px', padding: '32px' }}>
        <h3 style={{ marginTop: 0, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}><Map size={24} color="var(--primary)" /> Plan Your Yatra</h3>
        <form onSubmit={handlePredict} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Date of Journey (Darshan)</label>
            <input
              type="date"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'rgba(0,0,0,0.2)', color: 'var(--text-main)', colorScheme: 'dark' }}
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Number of Pilgrims</label>
            <input
              type="number"
              style={{ width: '100%', padding: '12px 20px', borderRadius: '10px', border: '1px solid var(--border)', background: 'rgba(0,0,0,0.2)', color: 'var(--text-main)' }}
              value={numPeople}
              onChange={(e) => setNumPeople(e.target.value)}
              min="1"
              max="50"
              required
            />
          </div>
          <button type="submit" className="btn-predict" disabled={loading} style={{ marginTop: '8px' }}>
            {loading ? 'Analyzing Data...' : 'Check Crowd & Services'}
          </button>
        </form>
      </div>

      {formSubmitted && predictionData && (
        <div className="fade-in">
          <h2 style={{ textAlign: 'center', marginBottom: '32px' }}>Your Yatra Forecast</h2>

          <div className="grid-top">
            <div className="card prediction-card">
              <div className="date-badge">
                <CalendarIcon size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} />
                {formatDateString(predictionData.date)}
              </div>
              <h2>Expected Pilgrims</h2>
              <p className="number-huge">
                {predictionData.predicted_visitors.toLocaleString()}
              </p>
              <div className="factors">
                {predictionData.factors.is_weekend && <span>🚀 Weekend Peak</span>}
                {predictionData.factors.navratri && <span>🌸 Navratri Season</span>}
                <span>👥 Group of {numPeople}</span>
              </div>
            </div>

            <div className="card weather-card">
              <h3><Cloud size={24} /> Weather Forecast (Katra)</h3>
              <p style={{ color: 'var(--text-muted)' }}>Weather conditions greatly affect the climb.</p>
              <div className="weather-stats">
                <div className="weather-item">
                  <ThermometerSun size={32} color="var(--primary-light)" />
                  <span className="weather-val">{predictionData.weather.temp_max}°C</span>
                  <span className="weather-label">Max Temp</span>
                </div>
                <div className="weather-item">
                  <Thermometer size={32} color="#1976d2" />
                  <span className="weather-val">{predictionData.weather.temp_min}°C</span>
                  <span className="weather-label">Min Temp</span>
                </div>
                <div className="weather-item">
                  <Droplets size={32} color="#0288d1" />
                  <span className="weather-val">{predictionData.weather.precipitation} mm</span>
                  <span className="weather-label">Precipitation</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card suggestion-box" style={{ marginBottom: '40px' }}>
            <h3><Star size={20} color="var(--secondary)" style={{ marginRight: '8px', verticalAlign: 'text-bottom' }} /> Crowd Level Verdict</h3>
            <p>{crowdMessage}</p>
          </div>

          <h3 style={{ marginBottom: '24px' }}><Users size={24} color="var(--primary)" style={{ marginRight: '8px', verticalAlign: 'bottom' }} /> Recommended Services for Your Group</h3>
          <div className="grid-cards" style={{ marginBottom: '60px' }}>
            {serviceSuggestions.map((srv, idx) => (
              <div key={idx} className="card info-card" style={{ borderLeft: '4px solid var(--primary-light)' }}>
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{srv.icon}</div>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', color: 'var(--text-main)' }}>{srv.title}</h4>
                <p style={{ fontSize: '0.95rem' }}>{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* KEEP THE CHART SECTION FROM BEFORE SO WE DON'T LOSE IT */}
      <div className="card chart-card" style={{ marginTop: '40px' }}>
        <div className="chart-header">
          <h3><Activity size={20} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} /> Official Yatra Statistics (1986 - 2025)</h3>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Annual Footfall</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '40px' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '8px' }}>1986 (Board Formed)</div>
            <div style={{ color: 'var(--primary)', fontSize: '1.5rem', fontWeight: 'bold' }}>13.9 Lakhs</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '8px' }}>2000</div>
            <div style={{ color: 'var(--primary)', fontSize: '1.5rem', fontWeight: 'bold' }}>52.1 Lakhs</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '8px' }}>2012 (Record High)</div>
            <div style={{ color: 'var(--primary)', fontSize: '1.5rem', fontWeight: 'bold' }}>1.04 Crores</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '8px' }}>Recent Average</div>
            <div style={{ color: 'var(--primary)', fontSize: '1.5rem', fontWeight: 'bold' }}>90+ Lakhs</div>
          </div>
        </div>

        <div style={{ width: '100%', height: 350, marginBottom: '40px' }}>
          <h4 style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '16px' }}>All-Time Growth Trend</h4>
          <ResponsiveContainer>
            <AreaChart data={historyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis dataKey="year" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} minTickGap={5} />
              <YAxis tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} tickFormatter={(val) => `${(val / 100000).toFixed(0)}L`} />
              <Tooltip formatter={(value) => value.toLocaleString()} contentStyle={{ borderRadius: '8px', border: 'none', background: 'var(--surface)', color: 'var(--text-main)', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }} />
              <Area type="monotone" dataKey="visitors" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorVisitors)" name="Pilgrims" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div style={{ width: '100%', height: 300 }}>
          <h4 style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '16px' }}>Recent Decade Comparison</h4>
          <ResponsiveContainer>
            <BarChart data={historyData.slice(-10)} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis dataKey="year" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} />
              <YAxis tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} tickFormatter={(val) => `${(val / 100000).toFixed(0)}L`} />
              <Tooltip formatter={(value) => value.toLocaleString()} cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', background: 'var(--surface)', color: 'var(--text-main)', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }} />
              <Bar dataKey="visitors" fill="var(--secondary)" radius={[4, 4, 0, 0]} name="Pilgrims" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Home;
