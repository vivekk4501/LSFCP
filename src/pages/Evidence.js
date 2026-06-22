import React, { useState, useEffect } from 'react';
import FileUpload from '../components/FileUpload';
import { useAppContext } from '../context/AppContext';

function Evidence() {
  const [message, setMessage] = useState('');
  const [recentUploads, setRecentUploads] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { history } = useAppContext();

  useEffect(() => {
    const uploads = history.filter(h => h.type === 'upload').slice(0, 5);
    setRecentUploads(uploads);
  }, [history]);

  const handleUpload = async (filesData) => {
    try {
      setUploadProgress(30);
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 1500));
      setUploadProgress(100);
      setMessage(`✅ Successfully uploaded ${filesData.length} files!`);
      setTimeout(() => setMessage(''), 5000);
    } catch (error) {
      setMessage('❌ Upload failed. Try again.');
      setTimeout(() => setMessage(''), 5000);
    } finally {
      setUploadProgress(0);
    }
  };

  return (
    <div className="container">
      <h2>📁 Evidence Management</h2>
      <p>Upload knife images, fingerprints, documents, CCTV footage... (PDF, JPG, PNG, DOCX supported)</p>
      
      <FileUpload onUpload={handleUpload} />
      
      {uploadProgress > 0 && (
        <div className="progress-section">
          <div className="progress-bar">
            <div style={{ width: `${uploadProgress}%`, background: 'var(--primary-blue)' }}></div>
          </div>
          <p>{uploadProgress}% complete</p>
        </div>
      )}
      
      {message && <div className={`message ${message.startsWith('✅') ? 'success-message' : 'error-message'}`}>{message}</div>}
      
      {recentUploads.length > 0 && (
        <div className="recent-section">
          <h3>Recent Uploads</h3>
          <ul>
            {recentUploads.map(upload => (
              <li key={upload.id}>
                📎 {upload.data.map(f => f.name).join(', ')} 
                <span style={{fontSize: '0.9em', color: '#666'}}> - {new Date(upload.timestamp).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Evidence;
