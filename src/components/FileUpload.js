import React, { useState, useCallback } from 'react';
import { useAppContext } from '../context/AppContext';

function FileUpload({ onUpload }) {
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { addToHistory } = useAppContext();

  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList).slice(0, 5); // Max 5
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    setUploading(true);
    // Mock upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    const filesData = files.map(f => ({ name: f.name, size: f.size, type: f.type }));
    addToHistory('upload', filesData);
    if (onUpload) onUpload(filesData);
    setFiles([]);
    setUploading(false);
  };

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  }, []);

  return (
    <div className="file-upload-container">
      <div 
        className={`drop-zone ${dragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p>📁 Drag & drop files here or click to browse</p>
        <input
          type="file"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          style={{ display: 'none' }}
          id="file-input"
        />
        <label htmlFor="file-input" className="browse-btn">Browse Files</label>
      </div>

      {files.length > 0 && (
        <div className="files-list">
          <h4>Selected Files ({files.length}/5):</h4>
          {files.map((file, index) => (
            <div key={index} className="file-item">
              <span>{file.name} ({(file.size / 1024).toFixed(1)} KB)</span>
              <button type="button" onClick={() => removeFile(index)}>Remove</button>
            </div>
          ))}
          <button 
            onClick={handleUpload} 
            disabled={uploading || files.length === 0}
            className="upload-btn"
          >
            {uploading ? 'Uploading...' : `Upload ${files.length} file(s)`}
          </button>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
