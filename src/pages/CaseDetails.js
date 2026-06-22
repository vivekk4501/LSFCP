import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

function CaseDetails() {
  const { id } = useParams();
  const { history } = useAppContext();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundItem = history.find(h => h.id === id);
    setItem(foundItem);
    setLoading(false);
  }, [id, history]);

  if (loading) {
    return <div className="container"><p>Loading case details...</p></div>;
  }

  if (!item) {
    return (
      <div className="container">
        <h2>Case not found</h2>
        <Link to="/history">← Back to History</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <Link to="/history" className="btn-back">← Back to History</Link>
      </div>
      <div className="case-header" style={{ padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px', background: 'white', marginBottom: '2rem' }}>
        <h2>Case #{item.id}</h2>
        <span style={{ fontWeight: 'bold', padding: '0.5rem 1rem', borderRadius: '20px', background: '#e3f2fd', color: 'var(--primary-blue)' }}>
          {item.type.toUpperCase()}
        </span>
        <p><strong>Date:</strong> {new Date(item.timestamp).toLocaleString()}</p>
      </div>

      <div className="case-details">
        {item.type === 'upload' && (
          <div>
            <h3>📁 Uploaded Files</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {item.data.map((file, index) => (
                <li key={index} style={{ padding: '0.75rem', border: '1px solid #eee', borderRadius: '4px' }}>
                  📎 {file.name} 
                  {file.size && <span style={{ fontSize: '0.9em', color: '#666', marginLeft: '0.5rem' }}>({(file.size / 1024).toFixed(1)} KB)</span>}
                  {file.url && <a href={file.url} style={{ marginLeft: '0.5rem', color: 'var(--primary-blue)' }}>🔗 View</a>}
                </li>
              ))}
            </ul>
          </div>
        )}

        {item.type === 'fir' && (
          <div>
            <h3>⚖️ FIR Classification Details</h3>
            <p><strong>Category:</strong> <span style={{ fontSize: '1.5em', color: 'var(--primary-blue)' }}>{item.data.category}</span></p>
            <p><strong>Confidence:</strong> {item.data.confidence}%</p>
            <p><strong>Text Preview:</strong></p>
            <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', maxHeight: '200px', overflow: 'auto' }}>
              {item.data.text}
            </div>
          </div>
        )}

        {item.type === 'summary' && (
          <div>
            <h3>📄 Case Summary</h3>
            <p><strong>Original Length:</strong> {item.data.originalLength} characters</p>
            <div style={{ background: '#f0f8ff', padding: '1.5rem', borderLeft: '4px solid var(--primary-blue)', borderRadius: '4px' }}>
              <p>{item.data.summary}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CaseDetails;

