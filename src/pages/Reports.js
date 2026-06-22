import React from 'react';
import { useAppContext } from '../context/AppContext';

function Reports() {
  const { history } = useAppContext();

  const historyByType = history.reduce((acc, item) => {
    if (item && item.type) {
      acc[item.type] = (acc[item.type] || 0) + 1;
    }
    return acc;
  }, {});

  const recentCases = history
    .filter(item => item && item.timestamp) // Filter out invalid items
    .slice(0, 5)
    .reverse();

  const exportAllReports = () => {
    const reportData = {
      historyByType,
      totalCases: history.length,
      recent: recentCases.map(item => ({
        type: item.type,
        timestamp: new Date(item.timestamp).toLocaleString(),
        data: item.data
      }))
    };
    const json = JSON.stringify(reportData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'legal_case_reports.json';
    a.click();
  };

  return (
    <div className="container">
      <h2>📊 Reports & Analytics</h2>
      
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <div className="stat-card" style={{ padding: '2rem', border: '1px solid #ddd', borderRadius: '12px', background: 'white', textAlign: 'center' }}>
          <h3>Total Cases</h3>
          <div style={{ fontSize: '3rem', color: 'var(--primary-blue)', fontWeight: 'bold' }}>{history.length}</div>
        </div>
        <div className="stat-card" style={{ padding: '2rem', border: '1px solid #ddd', borderRadius: '12px', background: 'white', textAlign: 'center' }}>
          <h3>FIR Classifications</h3>
          <div style={{ fontSize: '3rem', color: '#ff6b6b', fontWeight: 'bold' }}>{historyByType.fir || 0}</div>
        </div>
        <div className="stat-card" style={{ padding: '2rem', border: '1px solid #ddd', borderRadius: '12px', background: 'white', textAlign: 'center' }}>
          <h3>Summaries</h3>
          <div style={{ fontSize: '3rem', color: '#4ecdc4', fontWeight: 'bold' }}>{historyByType.summary || 0}</div>
        </div>
        <div className="stat-card" style={{ padding: '2rem', border: '1px solid #ddd', borderRadius: '12px', background: 'white', textAlign: 'center' }}>
          <h3>File Uploads</h3>
          <div style={{ fontSize: '3rem', color: '#45b7d1', fontWeight: 'bold' }}>{historyByType.upload || 0}</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
        <button 
          onClick={exportAllReports}
          style={{ padding: '1rem 2rem', background: 'var(--primary-blue)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1em' }}
        >
          💾 Download Full Report (JSON)
        </button>
      </div>

      {recentCases.length > 0 ? (
        <div>
          <h3>Recent Activity (Last 5)</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {recentCases.map((item, index) => (
              <div key={item.id || index} style={{ padding: '1.5rem', border: '1px solid #eee', borderRadius: '8px', background: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 'bold', color: 'var(--primary-blue)' }}>{item.type?.toUpperCase() || 'UNKNOWN'}</span>
                  <small>{new Date(item.timestamp).toLocaleDateString()}</small>
                </div>
                <div style={{ marginTop: '0.5rem', color: '#666' }}>
                  {item.type === 'fir' && (
                    <div>
                      <strong>Category:</strong> {item.category || 'N/A'}<br />
                      <strong>Confidence:</strong> {item.confidence || 0}%
                    </div>
                  )}
                  {item.type === 'summary' && (
                    <div>
                      <strong>Original Length:</strong> {item.originalLength || 0} chars<br />
                      <strong>Summary:</strong> {item.summary?.slice(0, 100) || 'N/A'}...
                    </div>
                  )}
                  {item.type === 'upload' && (
                    <div>
                      <strong>Files:</strong> {Array.isArray(item.files) ? item.files.length : 0} uploaded
                    </div>
                  )}
                  {item.type === 'fir-register' && (
                    <div>
                      <strong>Title:</strong> {item.title || 'Untitled'}<br />
                      <strong>Location:</strong> {item.incidentLocation || 'Unknown'}
                    </div>
                  )}
                  {!['fir', 'summary', 'upload', 'fir-register'].includes(item.type) && (
                    <div>{JSON.stringify(item).slice(0, 100)}...</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
          <h3>No Recent Activity</h3>
          <p>Start using the application to see activity reports here.</p>
        </div>
      )}
    </div>
  );
}

export default Reports;

