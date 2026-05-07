import React from 'react';

export default function Dashboard() {
  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Dashboard</h1>
      
      <div className="grid-2">
        <div className="glass-panel">
          <h3>Welcome to AdAutomate</h3>
          <p style={{ color: 'var(--text-main)' }}>
            This is the frontend dashboard for the Google Ads Admin Automation system.
            Use the sidebar to manage Users, Advertisers, and Campaigns.
          </p>
        </div>
        
        <div className="glass-panel">
          <h3>System Status</h3>
          <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#66fcf1' }}></div>
            <span style={{ color: 'var(--text-main)' }}>Backend Connected (Port 3001)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
