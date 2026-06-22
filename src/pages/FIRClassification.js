import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import MLClassificationService from "../services/mlClassification";

function FIRClassification() {

  const [text, setText] = useState("");
  const [results, setResults] = useState(null);
  const [mlService, setMlService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('ensemble');

  const { addToHistory, updateResult, results: savedResults } = useAppContext();

  // ✅ Initialize ML service
  useEffect(() => {
    const ml = new MLClassificationService();
    setMlService(ml);
  }, []);

  // ✅ Load saved result on refresh
  useEffect(() => {
    if (savedResults?.fir) {
      setResults(savedResults.fir);
    }
  }, [savedResults?.fir]);

  const handleClassify = () => {
    if (!text.trim() || !mlService) return;

    setLoading(true);

    try {
      // Use real ML service with selected model
      const result = mlService.classifyFIR(text, mode);
      
      console.log('Classification result:', result); // Debug logging

      setResults(result);

      // Save with enhanced data
      updateResult("fir", result);
      addToHistory("fir", { 
        text, 
        ...result,
        timestamp: new Date().toISOString()
      });

      setText("");
    } catch (error) {
      console.error('Classification error:', error);
      setResults({ 
        category: "Error", 
        confidence: 0,
        error: "Classification failed. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1> FIR Classification</h1>
      <p>Enhanced ML Classification with {mlService?.getModelStats?.().totalTrainingExamples || 25}+ training examples</p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter FIR text..."
        rows={6}
        style={{ width: '100%', marginBottom: '1rem' }}
      />

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ marginRight: '1rem' }}>Model:</label>
        <select 
          value={mode} 
          onChange={(e) => setMode(e.target.value)}
          style={{ padding: '0.5rem', marginRight: '1rem' }}
        >
          <option value="ensemble">Ensemble (Recommended)</option>
          <option value="naive_bayes">Naive Bayes</option>
          <option value="cnn">CNN Pattern Matching</option>
        </select>
        <span style={{ fontSize: '0.9rem', color: '#666' }}>
          {mode === 'ensemble' ? '⭐ Best accuracy with combined models' : 
           mode === 'naive_bayes' ? '📊 Statistical classification' : 
           '🧠 Pattern-based classification'}
        </span>
      </div>

      <button onClick={handleClassify} disabled={loading || !mlService}>
        {loading ? 'Classifying...' : 'Classify FIR'}
      </button>

      {results && !results.error && (
        <div style={{ marginTop: '2rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px' }}>
          <h3> Classification Result</h3>
          <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
            Model Used: <strong>{results.modelUsed === 'ensemble' ? 'Ensemble (NB + CNN)' : 
                           results.modelUsed === 'naive_bayes' ? 'Naive Bayes' : 
                           results.modelUsed === 'cnn' ? 'CNN Pattern Matching' : 'Unknown'}</strong>
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            <div>
              <strong>Category:</strong> 
              <div style={{ 
                background: '#2563eb', 
                color: 'white', 
                padding: '0.5rem', 
                borderRadius: '4px',
                marginTop: '0.5rem',
                textAlign: 'center'
              }}>
                {results.category}
              </div>
            </div>
            <div>
              <strong>IPC Section:</strong>
              <div style={{ 
                background: '#8b5cf6', 
                color: 'white', 
                padding: '0.5rem', 
                borderRadius: '4px',
                marginTop: '0.5rem',
                textAlign: 'center',
                fontSize: '0.9rem'
              }}>
                {results.section}
              </div>
            </div>
            <div>
              <strong>Confidence:</strong>
              <div style={{ 
                background: results.confidence > 80 ? '#10b981' : results.confidence > 60 ? '#f59e0b' : '#ef4444',
                color: 'white', 
                padding: '0.5rem', 
                borderRadius: '4px',
                marginTop: '0.5rem',
                textAlign: 'center'
              }}>
                {results.confidence}%
              </div>
            </div>
            {results.severity && (
              <div>
                <strong>Severity:</strong>
                <div style={{ 
                  background: results.severity === 'High' ? '#ef4444' : results.severity === 'Medium' ? '#f59e0b' : '#10b981',
                  color: 'white', 
                  padding: '0.5rem', 
                  borderRadius: '4px',
                  marginTop: '0.5rem',
                  textAlign: 'center'
                }}>
                  {results.severity}
                </div>
              </div>
            )}
            {results.priority && (
              <div>
                <strong>Priority:</strong>
                <div style={{ 
                  background: results.priority === 'Urgent' ? '#ef4444' : results.priority === 'High' ? '#f59e0b' : '#64748b',
                  color: 'white', 
                  padding: '0.5rem', 
                  borderRadius: '4px',
                  marginTop: '0.5rem',
                  textAlign: 'center'
                }}>
                  {results.priority}
                </div>
              </div>
            )}
          </div>
          
          {results.legalDescription && (
            <div style={{ marginTop: '1rem' }}>
              <strong>Legal Description:</strong>
              <div style={{ 
                background: '#f1f5f9', 
                padding: '0.75rem', 
                borderRadius: '4px',
                marginTop: '0.5rem',
                fontSize: '0.9rem',
                lineHeight: '1.4'
              }}>
                {results.legalDescription}
              </div>
            </div>
          )}
          
          {results.keywords && results.keywords.length > 0 && (
            <div style={{ marginTop: '1rem' }}>
              <strong>Keywords Found:</strong>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                {results.keywords.map((keyword, index) => (
                  <span key={index} style={{ 
                    background: '#e2e8f0', 
                    padding: '0.25rem 0.5rem', 
                    borderRadius: '12px',
                    fontSize: '0.8rem'
                  }}>
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {results?.error && (
        <div style={{ color: 'red', marginTop: '1rem', padding: '1rem', background: '#fee2e2', borderRadius: '8px' }}>
          {results.error}
        </div>
      )}

      {!mlService && (
        <div style={{ color: '#64748b', marginTop: '1rem', textAlign: 'center' }}>
          Loading ML Service...
        </div>
      )}
    </div>
  );
}

export default FIRClassification;