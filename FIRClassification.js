import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';

function FIRClassification() {
  const { history } = useAppContext();
  const [chartType, setChartType] = useState('bar');
  const [classificationData, setClassificationData] = useState([]);
  const [accuracyData, setAccuracyData] = useState([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Process classification data from history
    const firClassifications = history?.filter(item => item?.type === 'fir') || [];
    
    // Generate sample data for demonstration
    const sampleData = [
      { category: 'Theft', count: 45, accuracy: 92, color: '#3b82f6' },
      { category: 'Assault', count: 32, accuracy: 88, color: '#ef4444' },
      { category: 'Fraud', count: 28, accuracy: 95, color: '#10b981' },
      { category: 'Vandalism', count: 21, accuracy: 85, color: '#f59e0b' },
      { category: 'Domestic Violence', count: 18, accuracy: 90, color: '#8b5cf6' },
      { category: 'Cyber Crime', count: 15, accuracy: 87, color: '#06b6d4' },
      { category: 'Traffic Violation', count: 12, accuracy: 93, color: '#84cc16' },
      { category: 'Other', count: 8, accuracy: 82, color: '#64748b' }
    ];

    setClassificationData(sampleData);
    setAccuracyData(sampleData.map(item => ({
      label: item.category,
      value: item.accuracy,
      color: item.color
    })));
  }, [history]);

  const drawBarChart = (ctx, data) => {
    const canvas = ctx.canvas;
    const width = canvas.width;
    const height = canvas.height;
    const padding = 60;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Find max values
    const maxCount = Math.max(...data.map(d => d.count));
    const maxAccuracy = Math.max(...data.map(d => d.accuracy));

    // Draw axes
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Draw grid lines
    ctx.strokeStyle = '#f3f4f6';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Draw bars
    const barWidth = chartWidth / (data.length * 2);
    data.forEach((item, index) => {
      const x = padding + (index * 2 + 0.5) * barWidth;
      const barHeight = (item.count / maxCount) * chartHeight;
      const y = height - padding - barHeight;

      // Draw bar
      ctx.fillStyle = item.color;
      ctx.fillRect(x, y, barWidth, barHeight);

      // Draw value on top
      ctx.fillStyle = '#1f2937';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(item.count, x + barWidth / 2, y - 5);

      // Draw label
      ctx.save();
      ctx.translate(x + barWidth / 2, height - padding + 20);
      ctx.rotate(-Math.PI / 4);
      ctx.fillText(item.category, 0, 0);
      ctx.restore();
    });

    // Draw title
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('FIR Cases by Category', width / 2, 30);
  };

  const drawPieChart = (ctx, data) => {
    const canvas = ctx.canvas;
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 3;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Calculate total
    const total = data.reduce((sum, item) => sum + item.value, 0);

    // Draw pie slices
    let currentAngle = -Math.PI / 2;
    data.forEach((item, index) => {
      const sliceAngle = (item.value / total) * 2 * Math.PI;

      // Draw slice
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.closePath();
      ctx.fillStyle = item.color;
      ctx.fill();

      // Draw label
      const labelAngle = currentAngle + sliceAngle / 2;
      const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
      const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);

      ctx.fillStyle = 'white';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${item.value}%`, labelX, labelY);

      currentAngle += sliceAngle;
    });

    // Draw legend
    const legendX = width - 150;
    const legendY = 50;
    data.forEach((item, index) => {
      const y = legendY + index * 25;

      // Draw color box
      ctx.fillStyle = item.color;
      ctx.fillRect(legendX, y, 15, 15);

      // Draw label
      ctx.fillStyle = '#1f2937';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`${item.label}: ${item.value}%`, legendX + 20, y + 12);
    });

    // Draw title
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Classification Accuracy Distribution', width / 2, 30);
  };

  const drawChart = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    if (chartType === 'bar') {
      drawBarChart(ctx, classificationData);
    } else {
      drawPieChart(ctx, accuracyData);
    }
  };

  useEffect(() => {
    drawChart();
    window.addEventListener('resize', drawChart);
    return () => window.removeEventListener('resize', drawChart);
  }, [chartType, classificationData, accuracyData]);

  const totalCases = classificationData.reduce((sum, item) => sum + item.count, 0);
  const averageAccuracy = (accuracyData.reduce((sum, item) => sum + item.value, 0) / accuracyData.length).toFixed(1);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem 0',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '2rem',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ 
            color: '#1e40af', 
            fontSize: '2.5rem', 
            fontWeight: '700',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            ⚖️ FIR Classification Analytics
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem', marginTop: '0.5rem' }}>
            Comprehensive analysis of case classification accuracy and distribution
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Stats Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1.5rem', 
          marginBottom: '2rem' 
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.2rem'
              }}>
                📊
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e40af' }}>
                  {totalCases}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Total Cases</div>
              </div>
            </div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.2rem'
              }}>
                🎯
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#059669' }}>
                  {averageAccuracy}%
                </div>
                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Avg Accuracy</div>
              </div>
            </div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.2rem'
              }}>
                📈
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#d97706' }}>
                  {classificationData.length}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Categories</div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Controls */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem'
          }}>
            <h3 style={{ color: '#1e40af', fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>
              📊 Classification Analytics
            </h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => setChartType('bar')}
                style={{
                  background: chartType === 'bar' 
                    ? 'linear-gradient(135deg, #3b82f6, #1e40af)' 
                    : 'rgba(255, 255, 255, 0.1)',
                  color: chartType === 'bar' ? 'white' : '#64748b',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
              >
                📊 Bar Chart
              </button>
              <button
                onClick={() => setChartType('pie')}
                style={{
                  background: chartType === 'pie' 
                    ? 'linear-gradient(135deg, #3b82f6, #1e40af)' 
                    : 'rgba(255, 255, 255, 0.1)',
                  color: chartType === 'pie' ? 'white' : '#64748b',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
              >
                🥧 Pie Chart
              </button>
            </div>
          </div>

          {/* Chart Canvas */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            padding: '1rem',
            height: '400px',
            position: 'relative'
          }}>
            <canvas
              ref={canvasRef}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '8px'
              }}
            />
          </div>
        </div>

        {/* Detailed Data Table */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ color: '#1e40af', fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
            📋 Classification Details
          </h3>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#1e40af', fontWeight: '600' }}>Category</th>
                  <th style={{ padding: '1rem', textAlign: 'center', color: '#1e40af', fontWeight: '600' }}>Cases</th>
                  <th style={{ padding: '1rem', textAlign: 'center', color: '#1e40af', fontWeight: '600' }}>Accuracy</th>
                  <th style={{ padding: '1rem', textAlign: 'center', color: '#1e40af', fontWeight: '600' }}>Performance</th>
                </tr>
              </thead>
              <tbody>
                {classificationData.map((item, index) => (
                  <tr key={index} style={{ 
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'background 0.3s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = 'rgba(59, 130, 246, 0.05)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '1rem', color: '#1f2937', fontWeight: '500' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '2px',
                          background: item.color
                        }} />
                        {item.category}
                      </div>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center', color: '#64748b' }}>
                      {item.count}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center', color: '#64748b' }}>
                      {item.accuracy}%
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <div style={{
                        width: '100px',
                        height: '8px',
                        background: 'rgba(229, 231, 235, 0.5)',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        margin: '0 auto'
                      }}>
                        <div style={{
                          width: `${item.accuracy}%`,
                          height: '100%',
                          background: item.accuracy >= 90 ? '#10b981' : 
                                     item.accuracy >= 80 ? '#f59e0b' : '#ef4444',
                          borderRadius: '4px',
                          transition: 'width 0.3s ease'
                        }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        padding: '2rem 0',
        textAlign: 'center',
        color: 'white',
        fontSize: '0.9rem'
      }}>
        <p>© 2024 FIR Classification Analytics. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default FIRClassification;
