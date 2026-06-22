import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container">
      <section className="hero">
        <h1>🚀 AI-Powered Legal Case Management</h1>
        <p>Transform your legal workflow with intelligent FIR classification, document summarization, and evidence management.</p>
        <div style={{ margin: '2rem 0' }}>
        <Link to="/fir-register">
            <button style={{ marginRight: '1rem', fontSize: '1.2rem' }}>Register a FIR Case</button>
          </Link>
          <Link to="/evidence">
            <button style={{ background: 'white', color: 'var(--primary-blue)' }}>Upload Evidence</button>
          </Link>
        </div>
      </section>

      <h2>Features</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr)', gap: '2rem' }}>
        <div className="card">
          <h3>⚖️ Smart FIR Classification</h3>
          <p>Automatically categorize FIR documents using advanced AI models.</p>
        </div>
        <div className="card">
          <h3>📝 Intelligent Summarization</h3>
          <p>Generate concise summaries of lengthy legal documents in seconds.</p>
        </div>
        <div className="card">
          <h3>📁 Evidence Management</h3>
          <p>Securely upload, organize, and analyze case evidence.</p>
        </div>
        <div className="card">
          <h3>📊 Analytics Dashboard</h3>
          <p>Track case progress, classification accuracy, and workflow efficiency.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
