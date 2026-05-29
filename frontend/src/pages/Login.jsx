import React, { useState } from 'react';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(email && password) {
      onLogin();
    }
  };

  return (
    <div className="fade-in" style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--background)'}}>
      <div className="card" style={{width: '100%', maxWidth: '400px', padding: '40px'}}>
        <h2 style={{textAlign: 'center', color: 'var(--primary)', marginBottom: '8px'}}>Jai Mata Di</h2>
        <p style={{textAlign: 'center', color: 'var(--text-muted)', marginBottom: '32px'}}>Sign in to plan your Yatra</p>
        
        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
          <div>
            <label style={{display: 'block', marginBottom: '8px', color: 'var(--text-main)', fontSize: '0.9rem'}}>Email or Mobile Number</label>
            <input 
              type="text" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border)', background: 'rgba(0,0,0,0.2)', color: 'white'}}
              placeholder="Enter details"
            />
          </div>
          <div>
            <label style={{display: 'block', marginBottom: '8px', color: 'var(--text-main)', fontSize: '0.9rem'}}>Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border)', background: 'rgba(0,0,0,0.2)', color: 'white'}}
              placeholder="Enter password"
            />
          </div>
          <button type="submit" className="btn-predict" style={{marginTop: '12px'}}>Login & Continue</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
