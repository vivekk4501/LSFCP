import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const { user, profilePhoto, logout } = useAppContext();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar" style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '1rem 2rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      position: 'relative',
      zIndex: 1000
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '0 0 auto' }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Law AI</h2>
        {user && (
          <span style={{ 
            fontSize: '0.8rem', 
            background: 'rgba(255,255,255,0.2)', 
            padding: '0.25rem 0.5rem', 
            borderRadius: '12px',
            textAlign: 'center',
            whiteSpace: 'nowrap'
          }}>
            {user.role}
          </span>
        )}
      </div>
      
      <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: '0 0 auto', margin: '0 1rem' }}>
        <input
          type="text"
          className="search-bar"
          placeholder="Search cases..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '20px',
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            placeholderColor: 'rgba(255,255,255,0.7)',
            minWidth: '200px'
          }}
        />
      </form>

      <ul className={`navbar-nav ${isMenuOpen ? 'active' : ''}`} style={{ 
        display: 'flex', 
        listStyle: 'none', 
        margin: 0, 
        padding: 0, 
        gap: '1rem',
        alignItems: 'center',
        flex: '0 0 auto',
        whiteSpace: 'nowrap'
      }}>
        <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
        {user ? (
          <>
            <li><Link to="/fir-register" onClick={() => setIsMenuOpen(false)}>Register FIR</Link></li>
            <li><Link to="/evidence" onClick={() => setIsMenuOpen(false)}>Evidence</Link></li>
            <li><Link to="/fir" onClick={() => setIsMenuOpen(false)}>FIR</Link></li>
            <li><Link to="/summarize" onClick={() => setIsMenuOpen(false)}>Summarize</Link></li>
            <li><Link to="/history" onClick={() => setIsMenuOpen(false)}>History</Link></li>
            <li><Link to="/reports" onClick={() => setIsMenuOpen(false)}>Reports</Link></li>
            <li><Link to="/data-manager" onClick={() => setIsMenuOpen(false)}>Data</Link></li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Link to="/profile" onClick={() => setIsMenuOpen(false)} style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {profilePhoto ? (
                  <img 
                    src={profilePhoto} 
                    alt="Profile" 
                    style={{ 
                      width: '32px', 
                      height: '32px', 
                      borderRadius: '50%', 
                      objectFit: 'cover',
                      border: '2px solid rgba(255,255,255,0.5)',
                      verticalAlign: 'middle'
                    }}
                  />
                ) : (
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    verticalAlign: 'middle'
                  }}>
                    👤
                  </div>
                )}
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <button 
                onClick={handleLogout} 
                style={{ 
                  background: 'rgba(255,255,255,0.2)', 
                  border: '1px solid rgba(255,255,255,0.3)', 
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  transition: 'background 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
                onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link></li>
            <li><Link to="/register" onClick={() => setIsMenuOpen(false)}>Register</Link></li>
          </>
        )}
        <li>
          <button 
            type="button" 
            onClick={toggleDarkMode} 
            style={{ 
              background: 'none', 
              border: '1px solid rgba(255,255,255,0.3)', 
              padding: '0.5rem',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '1.2rem'
            }}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </li>
      </ul>

      <div 
        className="hamburger" 
        onClick={toggleMenu}
        style={{
          display: 'none',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '25px',
          height: '20px',
          cursor: 'pointer'
        }}
      >
        <span style={{ 
          width: '100%', 
          height: '3px', 
          background: 'white', 
          borderRadius: '2px',
          transition: 'all 0.3s ease'
        }}></span>
        <span style={{ 
          width: '100%', 
          height: '3px', 
          background: 'white', 
          borderRadius: '2px',
          transition: 'all 0.3s ease'
        }}></span>
        <span style={{ 
          width: '100%', 
          height: '3px', 
          background: 'white', 
          borderRadius: '2px',
          transition: 'all 0.3s ease'
        }}></span>
      </div>
    </nav>
  );
}

export default Navbar;
