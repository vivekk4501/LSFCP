import React, { useState, useEffect } from 'react';
import { DataPersistenceService, CaseDataManager } from '../services/dataPersistence';
import { useAppContext } from '../context/AppContext';

function DataManager() {
  const { history } = useAppContext();
  const [dataManager, setDataManager] = useState(null);
  const [persistenceService, setPersistenceService] = useState(null);
  const [activeTab, setActiveTab] = useState('export');
  const [exportData, setExportData] = useState(null);
  const [importFile, setImportFile] = useState(null);
  const [storageUsage, setStorageUsage] = useState(null);
  const [firCases, setFirCases] = useState([]);
  const [summarizations, setSummarizations] = useState([]);
  const [evidence, setEvidence] = useState([]);

  useEffect(() => {
    const dm = new CaseDataManager();
    const ps = new DataPersistenceService();
    setDataManager(dm);
    setPersistenceService(ps);
    loadData(dm, ps);
  }, [history]);

  const loadData = (dm, ps) => {
    // Use AppContext history data instead of separate localStorage
    const firData = history.filter(item => item.type === 'fir').map(item => {
      // Debug: log the data structure to understand what we're working with
      console.log('FIR History Item:', item);
      console.log('FIR Data:', item.data);
      
      // Try multiple possible category field locations
      const category = item.data?.category || 
                       item.data?.result?.category || 
                       item.category || 
                       'Case Analysis';
      
      return {
        id: item.id,
        category: category,
        severity: item.data?.severity || item.data?.result?.severity || 'Medium',
        priority: item.data?.priority || item.data?.result?.priority || 'Normal',
        timestamp: item.timestamp,
        text: item.data?.text || item.data?.result?.text || '',
        confidence: item.data?.confidence || item.data?.result?.confidence || 0
      };
    });
    
    const summaryData = history.filter(item => item.type === 'summary').map(item => {
      // Debug: log the data structure to understand what we're working with
      console.log('Summary History Item:', item);
      
      // AppContext spreads data directly into the history item
      const originalLength = item.originalLength || 0;
      const summaryText = item.summary || '';
      const compressionRatio = item.compressionRatio || 0;
      
      return {
        id: item.id,
        originalLength: originalLength,
        summaryLength: summaryText.length,
        compressionRatio: compressionRatio,
        timestamp: item.timestamp,
        summary: summaryText
      };
    });
    
    const evidenceData = history.filter(item => item.type === 'upload').map(item => ({
      id: item.id,
      files: item.data || [],
      timestamp: item.timestamp
    }));
    
    setFirCases(firData);
    setSummarizations(summaryData);
    setEvidence(evidenceData);
    setStorageUsage(ps.getStorageUsage());
    setExportData(ps.exportData());
  };

  const handleExport = () => {
    if (persistenceService) {
      const data = persistenceService.exportData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `lawai_backup_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importData = JSON.parse(e.target.result);
        if (persistenceService && persistenceService.importData(importData)) {
          alert('Data imported successfully!');
          loadData(dataManager, persistenceService);
        } else {
          alert('Failed to import data');
        }
      } catch (error) {
        alert('Invalid file format');
      }
    };
    reader.readAsText(file);
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      if (persistenceService && persistenceService.clearAllData()) {
        window.alert('All data cleared successfully!');
        loadData(dataManager, persistenceService);
      }
    }
  };

  const handleDeleteFIR = (id) => {
    if (window.confirm('Are you sure you want to delete this FIR case?')) {
      if (dataManager && dataManager.deleteFIRCase(id)) {
        loadData(dataManager, persistenceService);
      }
    }
  };

  const handleDeleteSummary = (id) => {
    if (window.confirm('Are you sure you want to delete this summary?')) {
      const summaries = dataManager.getSummarizations();
      const filteredSummaries = summaries.filter(s => s.id !== id);
      if (persistenceService.saveData(persistenceService.STORAGE_KEYS.SUMMARIZATIONS, filteredSummaries)) {
        loadData(dataManager, persistenceService);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      // Return current date instead of N/A
      return new Date().toLocaleString();
    }
    try {
      const date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return new Date().toLocaleString();
      }
      return date.toLocaleString();
    } catch (error) {
      console.error('Date formatting error:', error);
      return new Date().toLocaleString();
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>🗃️ Data Management</h1>
      <p>Manage your Law AI data - export, import, and organize your cases</p>

      {/* Storage Usage */}
      {storageUsage && (
        <div style={{ 
          background: '#f8fafc', 
          padding: '1rem', 
          borderRadius: '8px', 
          marginBottom: '2rem',
          border: '1px solid #e2e8f0'
        }}>
          <h3>💾 Storage Usage</h3>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <span>Used: {(storageUsage.used / 1024).toFixed(2)} KB</span>
            <span>Total: {(storageUsage.total / 1024 / 1024).toFixed(2)} MB</span>
            <span>Usage: {storageUsage.percentage.toFixed(2)}%</span>
            <div style={{ 
              flex: 1, 
              height: '20px', 
              background: '#e2e8f0', 
              borderRadius: '10px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${storageUsage.percentage}%`,
                height: '100%',
                background: storageUsage.percentage > 80 ? '#ef4444' : '#10b981',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid #e2e8f0' }}>
        {['export', 'import', 'cases', 'summaries'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '0.75rem 1.5rem',
              background: activeTab === tab ? '#2563eb' : 'transparent',
              color: activeTab === tab ? 'white' : '#64748b',
              border: 'none',
              borderRadius: '8px 8px 0 0',
              cursor: 'pointer',
              fontWeight: activeTab === tab ? '600' : '400'
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Export Tab */}
      {activeTab === 'export' && (
        <div>
          <h2>📤 Export Data</h2>
          <p>Export all your data as a JSON backup file</p>
          <button onClick={handleExport} style={{ background: '#2563eb', color: 'white', padding: '0.75rem 1.5rem', border: 'none', borderRadius: '8px' }}>
            Export All Data
          </button>
          {exportData && (
            <div style={{ marginTop: '2rem' }}>
              <h3>Export Preview</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                  <strong>FIR Cases:</strong> {Object.keys(exportData.fir_cases || {}).length}
                </div>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                  <strong>Summaries:</strong> {Object.keys(exportData.summarizations || {}).length}
                </div>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                  <strong>Evidence:</strong> {Object.keys(exportData.evidence || {}).length}
                </div>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                  <strong>Profile:</strong> {exportData.user_profile ? '1' : '0'}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Import Tab */}
      {activeTab === 'import' && (
        <div>
          <h2>📥 Import Data</h2>
          <p>Import data from a previously exported JSON file</p>
          <div style={{ marginBottom: '2rem' }}>
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              style={{ marginBottom: '1rem' }}
            />
            <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
              Note: Importing will merge with existing data. Clear all data first if you want to replace everything.
            </p>
          </div>
          <button onClick={handleClearData} style={{ background: '#ef4444', color: 'white', padding: '0.75rem 1.5rem', border: 'none', borderRadius: '8px' }}>
            Clear All Data
          </button>
        </div>
      )}

      {/* FIR Cases Tab */}
      {activeTab === 'cases' && (
        <div>
          <h2>⚖️ FIR Cases ({firCases.length})</h2>
          {firCases.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#666', background: '#f8fafc', borderRadius: '8px' }}>
              <p>No FIR cases found. Start classifying FIRs to see them here.</p>
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Go to the FIR Classification page to add cases.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Category</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Severity</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Priority</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Date</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {firCases.map(fir => (
                    <tr key={fir.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '0.75rem' }}>
                        <span style={{ 
                          background: '#2563eb', 
                          color: 'white', 
                          padding: '0.25rem 0.5rem', 
                          borderRadius: '4px',
                          fontSize: '0.8rem'
                        }}>
                          {fir.category}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem' }}>
                        <span style={{ 
                          background: fir.severity === 'High' ? '#ef4444' : fir.severity === 'Medium' ? '#f59e0b' : '#10b981',
                          color: 'white', 
                          padding: '0.25rem 0.5rem', 
                          borderRadius: '4px',
                          fontSize: '0.8rem'
                        }}>
                          {fir.severity}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem' }}>
                        <span style={{ 
                          background: fir.priority === 'Urgent' ? '#ef4444' : fir.priority === 'High' ? '#f59e0b' : '#64748b',
                          color: 'white', 
                          padding: '0.25rem 0.5rem', 
                          borderRadius: '4px',
                          fontSize: '0.8rem'
                        }}>
                          {fir.priority}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem', fontSize: '0.9rem' }}>
                        {formatDate(fir.timestamp)}
                      </td>
                      <td style={{ padding: '0.75rem' }}>
                        <button 
                          onClick={() => handleDeleteFIR(fir.id)}
                          style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.25rem 0.5rem', borderRadius: '4px' }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Summaries Tab */}
      {activeTab === 'summaries' && (
        <div>
          <h2>📝 Summaries ({summarizations.length})</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Original Length</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Summary Length</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Compression</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Date</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {summarizations.map(summary => (
                  <tr key={summary.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.75rem' }}>{summary.originalLength} chars</td>
                    <td style={{ padding: '0.75rem' }}>{summary.summaryLength} chars</td>
                    <td style={{ padding: '0.75rem' }}>{summary.compressionRatio}%</td>
                    <td style={{ padding: '0.75rem', fontSize: '0.9rem' }}>
                      {formatDate(summary.timestamp)}
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <button 
                        onClick={() => handleDeleteSummary(summary.id)}
                        style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.25rem 0.5rem', borderRadius: '4px' }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataManager;
