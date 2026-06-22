import React from 'react';

function Banner() {
  return (
    <div style={{
      width: '100%',
      height: '300px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '0 0 20px 20px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        opacity: 0.3
      }} />
      
      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        color: 'white',
        padding: '0 2rem'
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          margin: '0 0 1rem 0',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          animation: 'fadeInDown 1s ease-out'
        }}>
          Law AI Assistant
        </h1>
        <p style={{
          fontSize: '1.2rem',
          margin: '0 0 2rem 0',
          textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
          animation: 'fadeInUp 1s ease-out 0.3s both'
        }}>
          Intelligent Legal Document Processing & FIR Management System
        </p>
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          animation: 'fadeInUp 1s ease-out 0.6s both'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.2)',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontSize: '0.9rem',
            backdropFilter: 'blur(10px)'
          }}>
            ⚖️ FIR Classification
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.2)',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontSize: '0.9rem',
            backdropFilter: 'blur(10px)'
          }}>
            📝 Document Summarization
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.2)',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontSize: '0.9rem',
            backdropFilter: 'blur(10px)'
          }}>
            📊 Case Management
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        width: '100px',
        height: '100px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '50%',
        animation: 'float 3s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        width: '60px',
        height: '60px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '50%',
        animation: 'float 3s ease-in-out infinite 1s'
      }} />
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}

export default Banner;
