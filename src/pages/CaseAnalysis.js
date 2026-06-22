import React, { useState, useEffect } from 'react';

function CaseAnalysis() {
  const [history, setHistory] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalCases: 0,
    categoryBreakdown: {},
    averageConfidence: 0,
    casesByMonth: {},
    severityBreakdown: {},
    priorityBreakdown: {}
  });
  
  useEffect(() => {
    // Load history from localStorage
    const savedHistory = localStorage.getItem('lawai_history');
    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory);
      setHistory(parsedHistory);
      calculateAnalytics(parsedHistory);
    }
  }, []);

  const calculateAnalytics = (historyData) => {
    const firHistory = historyData.filter(item => item.type === 'fir');
    
    // Category breakdown
    const categoryCount = {};
    let totalConfidence = 0;
    let confidenceCount = 0;

    // Severity breakdown
    const severityCount = {};
    
    // Priority breakdown
    const priorityCount = {};

    // Cases by month
    const monthlyCases = {};

    firHistory.forEach(item => {
      // Category
      if (item.data.category) {
        categoryCount[item.data.category] = (categoryCount[item.data.category] || 0) + 1;
      }

      // Confidence
      if (item.data.confidence) {
        totalConfidence += item.data.confidence;
        confidenceCount++;
      }

      // Severity
      if (item.data.severity) {
        severityCount[item.data.severity] = (severityCount[item.data.severity] || 0) + 1;
      }

      // Priority
      if (item.data.priority) {
        priorityCount[item.data.priority] = (priorityCount[item.data.priority] || 0) + 1;
      }

      // Monthly cases
      const month = new Date(item.timestamp).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      monthlyCases[month] = (monthlyCases[month] || 0) + 1;
    });

    setAnalytics({
      totalCases: firHistory.length,
      categoryBreakdown: categoryCount,
      averageConfidence: confidenceCount > 0 ? (totalConfidence / confidenceCount).toFixed(1) : 0,
      casesByMonth: monthlyCases,
      severityBreakdown: severityCount,
      priorityBreakdown: priorityCount
    });
  };

  const drawBarChart = (data, title, color = '#2563eb') => {
    const maxValue = Math.max(...Object.values(data), 1);
    
    return (
      <div style={{ marginBottom: '2rem' }}>
        <h3>{title}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {Object.entries(data).map(([key, value]) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '120px', fontSize: '0.9rem' }}>{key}</div>
              <div style={{ 
                flex: 1, 
                height: '30px', 
                background: '#e2e8f0', 
                borderRadius: '4px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${(value / maxValue) * 100}%`,
                  height: '100%',
                  background: color,
                  transition: 'width 0.5s ease'
                }} />
                <span style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#333',
                  fontWeight: 'bold',
                  fontSize: '0.8rem'
                }}>
                  {value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const drawPieChart = (data, title) => {
    const total = Object.values(data).reduce((sum, val) => sum + val, 0);
    const colors = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];
    
    return (
      <div style={{ marginBottom: '2rem' }}>
        <h3>{title}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {Object.entries(data).map(([key, value], index) => {
            const percentage = ((value / total) * 100).toFixed(1);
            const color = colors[index % colors.length];
            
            return (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  background: color,
                  borderRadius: '4px'
                }} />
                <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
                  <span>{key}</span>
                  <span style={{ fontWeight: 'bold' }}>{value} ({percentage}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const drawLineChart = (data, title) => {
    const sortedMonths = Object.keys(data).sort((a, b) => new Date(a) - new Date(b));
    const maxValue = Math.max(...Object.values(data), 1);
    
    return (
      <div style={{ marginBottom: '2rem' }}>
        <h3>{title}</h3>
        <div style={{ 
          height: '200px', 
          background: '#f8fafc', 
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '1rem',
          position: 'relative'
        }}>
          <svg width="100%" height="100%" viewBox="0 0 400 180">
            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map((percent, index) => (
              <line
                key={index}
                x1="40"
                y1={180 - (percent * 1.6)}
                x2="380"
                y2={180 - (percent * 1.6)}
                stroke="#e2e8f0"
                strokeWidth="1"
              />
            ))}
            
            {/* Data line */}
            {sortedMonths.length > 1 && (
              <polyline
                points={sortedMonths.map((month, index) => {
                  const x = 40 + (index * (340 / (sortedMonths.length - 1)));
                  const y = 180 - ((data[month] / maxValue) * 160);
                  return `${x},${y}`;
                }).join(' ')}
                fill="none"
                stroke="#2563eb"
                strokeWidth="2"
              />
            )}
            
            {/* Data points */}
            {sortedMonths.map((month, index) => {
              const x = 40 + (index * (340 / (sortedMonths.length - 1)));
              const y = 180 - ((data[month] / maxValue) * 160);
              return (
                <circle key={index} cx={x} cy={y} r="4" fill="#2563eb" />
              );
            })}
            
            {/* Labels */}
            {sortedMonths.map((month, index) => {
              const x = 40 + (index * (340 / (sortedMonths.length - 1)));
              return (
                <text
                  key={index}
                  x={x}
                  y="175"
                  textAnchor="middle"
                  fontSize="10"
                  fill="#64748b"
                >
                  {month.substring(0, 3)}
                </text>
              );
            })}
          </svg>
        </div>
      </div>
    );
  };

  const exportData = () => {
    const exportData = {
      analytics,
      history,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `case_analysis_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>📊 Case Analysis Dashboard</h1>
        <button onClick={exportData} style={{ background: '#2563eb', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '8px' }}>
          Export Data
        </button>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h4>Total Cases</h4>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563eb', margin: '0' }}>{analytics.totalCases}</p>
        </div>
        <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h4>Avg Confidence</h4>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981', margin: '0' }}>{analytics.averageConfidence}%</p>
        </div>
        <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h4>Categories</h4>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b', margin: '0' }}>{Object.keys(analytics.categoryBreakdown).length}</p>
        </div>
        <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h4>This Month</h4>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6', margin: '0' }}>
            {Object.values(analytics.casesByMonth).slice(-1)[0] || 0}
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        {/* Category Breakdown */}
        {Object.keys(analytics.categoryBreakdown).length > 0 && (
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            {drawPieChart(analytics.categoryBreakdown, 'Case Categories')}
          </div>
        )}

        {/* Severity Breakdown */}
        {Object.keys(analytics.severityBreakdown).length > 0 && (
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            {drawBarChart(analytics.severityBreakdown, 'Severity Levels', '#ef4444')}
          </div>
        )}

        {/* Priority Breakdown */}
        {Object.keys(analytics.priorityBreakdown).length > 0 && (
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            {drawBarChart(analytics.priorityBreakdown, 'Priority Levels', '#f59e0b')}
          </div>
        )}

        {/* Monthly Trend */}
        {Object.keys(analytics.casesByMonth).length > 0 && (
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            {drawLineChart(analytics.casesByMonth, 'Cases Over Time')}
          </div>
        )}
      </div>

      {/* Recent Cases Table */}
      <div style={{ marginTop: '2rem', background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <h3>Recent Cases</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Category</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Confidence</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Severity</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Priority</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {history
                .filter(item => item.type === 'fir')
                .slice(-10)
                .reverse()
                .map((item, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{ 
                        background: '#2563eb', 
                        color: 'white', 
                        padding: '0.25rem 0.5rem', 
                        borderRadius: '4px',
                        fontSize: '0.8rem'
                      }}>
                        {item.data.category || 'Unknown'}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem' }}>{item.data.confidence || 0}%</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{ 
                        background: item.data.severity === 'High' ? '#ef4444' : item.data.severity === 'Medium' ? '#f59e0b' : '#10b981',
                        color: 'white', 
                        padding: '0.25rem 0.5rem', 
                        borderRadius: '4px',
                        fontSize: '0.8rem'
                      }}>
                        {item.data.severity || 'Medium'}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{ 
                        background: item.data.priority === 'Urgent' ? '#ef4444' : item.data.priority === 'High' ? '#f59e0b' : '#64748b',
                        color: 'white', 
                        padding: '0.25rem 0.5rem', 
                        borderRadius: '4px',
                        fontSize: '0.8rem'
                      }}>
                        {item.data.priority || 'Normal'}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem', fontSize: '0.9rem' }}>
                      {new Date(item.timestamp).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {analytics.totalCases === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
          <h3>No Data Available</h3>
          <p>Start classifying FIR cases to see analytics and graphs here.</p>
        </div>
      )}
    </div>
  );
}

export default CaseAnalysis;
