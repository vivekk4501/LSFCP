import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const { appData } = useAppContext();
  const { stats } = appData;

  useEffect(() => {
    // Show loader briefly then use real stats
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Dashboard Overview</h1>
      
      <div className="stats-grid">
        <div className="card">
          <h3>Total Cases</h3>
          <div style={{ fontSize: '3rem', color: 'var(--primary-blue)', fontWeight: 'bold' }}>{stats.cases}</div>
          <p>From your processing history</p>
        </div>
        <div className="card">
          <h3>FIR Classifications</h3>
          <div style={{ fontSize: '3rem', color: '#10b981', fontWeight: 'bold' }}>{stats.classifications}</div>
          <p>Total classified</p>
        </div>
        <div className="card">
          <h3>Summaries Generated</h3>
          <div style={{ fontSize: '3rem', color: '#f59e0b', fontWeight: 'bold' }}>{stats.summaries}</div>
          <p>Total summaries</p>
        </div>
      </div>

      <h2>Quick Actions</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr)', gap: '2rem' }}>
        <Link to="/evidence" className="card">
          <h3>📁 Upload Case</h3>
          <p>Upload new case files and evidence</p>
        </Link>
        <Link to="/fir" className="card">
          <h3>⚖️ FIR Classification</h3>
          <p>Classify FIR documents automatically</p>
        </Link>
        <Link to="/summarize" className="card">
          <h3>📝 Document Summary</h3>
          <p>Generate quick summaries of cases</p>
        </Link>
        <Link to="/history" className="card">
          <h3>📋 Case History</h3>
          <p>View processing history</p>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
