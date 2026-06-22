import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { summarizeCase } from "../services/api";
import MLSummarizationService from "../services/mlSummarization";
import { CaseDataManager } from "../services/dataPersistence";

function Summarization() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const [mlService, setMlService] = useState(null);
  const [dataManager, setDataManager] = useState(null);
  const [summaryLength, setSummaryLength] = useState(100);
  const { addToHistory, updateResult } = useAppContext();

  useEffect(() => {
    // Initialize ML service and data manager
    const ml = new MLSummarizationService();
    const dm = new CaseDataManager();
    setMlService(ml);
    setDataManager(dm);
  }, []);

  const generateSummary = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      let summary = '';
      
      // Try ML service first with enhanced algorithm
      if (mlService) {
        summary = mlService.generateSummary(text, summaryLength);
      }
      
      // Fallback to API if ML service fails or returns empty
      if (!summary || summary === "No text provided for summarization.") {
        try {
          summary = await summarizeCase(text);
        } catch (apiError) {
          console.warn('API fallback failed:', apiError);
          summary = 'Unable to generate summary. Please try again.';
        }
      }
      
      setResult(summary);
      updateResult('summary', summary);
      addToHistory('summary', { 
        originalLength: text.length, 
        summary,
        targetLength: summaryLength,
        compressionRatio: text.length > 0 ? ((summary.length / text.length) * 100).toFixed(2) : 0
      });

      // Save to localStorage with enhanced metadata
      if (dataManager && summary && summary !== 'Unable to generate summary. Please try again.') {
        const summaryData = {
          originalText: text,
          summary: summary,
          originalLength: text.length,
          summaryLength: summary.length,
          targetLength: summaryLength,
          compressionRatio: ((summary.length / text.length) * 100).toFixed(2),
          wordCount: summary.split(' ').length,
          timestamp: new Date().toISOString(),
          source: 'enhanced_ml_summarization',
          algorithm: summary.length > 0 ? 'extractive_abstractive_hybrid' : 'fallback'
        };
        dataManager.saveSummarization(summaryData);
      }

    } catch (error) {
      console.error('Summary error:', error);
      setResult('Error generating summary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSummary = () => {
    if (dataManager && result) {
      const summaryData = {
        originalText: text,
        summary: result,
        originalLength: text.length,
        summaryLength: result.length,
        compressionRatio: ((result.length / text.length) * 100).toFixed(2),
        timestamp: new Date().toISOString(),
        source: 'manual_save'
      };
      
      if (dataManager.saveSummarization(summaryData)) {
        alert('Summary saved successfully!');
      } else {
        alert('Failed to save summary');
      }
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadedFile(file);
    setUploadError("");

    if (file.type === "text/plain" || file.name.endsWith(".txt")) {
      setUploadLoading(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        const extracted = event.target.result;
        setText(extracted);
        setUploadLoading(false);
      };
      reader.onerror = () => {
        setUploadError("Failed to read the uploaded file.");
        setUploadLoading(false);
      };
      reader.readAsText(file);
    } else {
      setUploadError("Auto-extraction supports .txt files. Please paste text from PDF/DOCX manually.");
      setTimeout(() => setUploadError(""), 6000);
    }
  };

  const clearUploadedFile = () => {
    setUploadedFile(null);
    setText("");
    setUploadError("");
  };

  return (
    <div className="container">
      <h2>📝 Case Summarization</h2>
      <p>Enhanced ML Summarization with {mlService?.getModelStats?.().totalTrainingExamples || 25}+ training examples</p>
      
      {/* Model Statistics */}
      {mlService && (
        <div style={{ 
          background: '#f8fafc', 
          padding: '1rem', 
          borderRadius: '8px', 
          marginBottom: '1rem',
          fontSize: '0.9rem'
        }}>
          <strong>🤖 Model Stats:</strong>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <span>Training Examples: {mlService.getModelStats().totalTrainingExamples}</span>
            <span>Avg Compression: {mlService.getModelStats().averageCompressionRatio.toFixed(1)}%</span>
            <span>Algorithm: Extractive-Abstractive Hybrid</span>
          </div>
        </div>
      )}

      {/* Document Upload */}
      <div className="drop-zone" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h4>📎 Upload Document (optional)</h4>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', margin: '0.5rem 0 1rem' }}>
          Upload a <strong>.txt</strong> file to auto-fill the case text.
        </p>
        <input
          type="file"
          accept=".txt,.pdf,.doc,.docx"
          onChange={handleFileUpload}
          id="summary-doc-upload"
          style={{ display: "none" }}
        />
        <label htmlFor="summary-doc-upload" className="browse-btn" style={{ cursor: "pointer" }}>
          {uploadLoading ? "Reading..." : "Choose File"}
        </label>
        {uploadedFile && (
          <div style={{ marginTop: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 1rem', background: 'white', borderRadius: '8px', boxShadow: 'var(--shadow)' }}>
            <span>📄 {uploadedFile.name}</span>
            <button type="button" onClick={clearUploadedFile} style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}>
              Remove
            </button>
          </div>
        )}
        {uploadLoading && <div className="loader" style={{ width: 24, height: 24, margin: "0.5rem auto" }} />}
        {uploadError && <div className="message error-message" style={{ marginTop: '0.5rem' }}>{uploadError}</div>}
      </div>

      <textarea
        placeholder="Enter full case text or judgment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
      />
      
      {/* Summary Length Control */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1rem 0' }}>
        <label>Summary Length:</label>
        <select 
          value={summaryLength} 
          onChange={(e) => setSummaryLength(Number(e.target.value))}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value={50}>Very Short (50 words)</option>
          <option value={100}>Short (100 words)</option>
          <option value={150}>Medium (150 words)</option>
          <option value={200}>Long (200 words)</option>
        </select>
        <span style={{ fontSize: '0.9rem', color: '#666' }}>
          Current: {text.length} chars → ~{summaryLength} words
        </span>
      </div>
      
      <button onClick={generateSummary} disabled={loading || !text.trim()}>
        {loading ? 'Generating...' : 'Generate Summary'}
      </button>
      {result && (
        <div className="result-box">
          <h3>📄 Generated Summary:</h3>
          <p>{result}</p>
          
          {/* Enhanced Statistics */}
          <div style={{ 
            background: '#f1f5f9', 
            padding: '1rem', 
            borderRadius: '8px', 
            marginTop: '1rem',
            fontSize: '0.9rem'
          }}>
            <h4>📊 Summary Statistics:</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.5rem', marginTop: '0.5rem' }}>
              <div>
                <strong>Original:</strong> {text.length} chars
              </div>
              <div>
                <strong>Summary:</strong> {result.length} chars
              </div>
              <div>
                <strong>Words:</strong> {result.split(' ').length}
              </div>
              <div>
                <strong>Compression:</strong> {text.length > 0 ? ((result.length / text.length) * 100).toFixed(2) : 0}%
              </div>
              <div>
                <strong>Target:</strong> {summaryLength} words
              </div>
              <div>
                <strong>Accuracy:</strong> {Math.abs(result.split(' ').length - summaryLength) <= 20 ? '✅ Good' : '⚠️ Adjust'}
              </div>
            </div>
          </div>
          
          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button 
              onClick={() => navigator.clipboard.writeText(result)}
            >
              📋 Copy
            </button>
            <button 
              onClick={() => {
                const blob = new Blob([result], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'case_summary.txt';
                a.click();
              }}
            >
              💾 Download TXT
            </button>
            <button 
              onClick={handleSaveSummary}
              style={{ background: '#10b981' }}
            >
              💾 Save to Database
            </button>
            <button 
              onClick={() => {
                if (mlService) {
                  const testResults = mlService.testSummarization();
                  console.log('ML Service Test Results:', testResults);
                  alert(`Test completed! Check console for detailed results. Average accuracy: ${testResults.filter(r => r.lengthAccuracy === 'Good').length}/${testResults.length} summaries within target length.`);
                }
              }}
              style={{ background: '#8b5cf6' }}
            >
              🧪 Test Model
            </button>
          </div>
          <div style={{ marginTop: '1rem', fontSize: '0.9em', color: '#666' }}>
            <p>✅ Saved to history automatically • 🤖 Generated using Extractive-Abstractive Hybrid Algorithm</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Summarization;

