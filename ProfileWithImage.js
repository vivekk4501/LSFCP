import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import ProfileImageUpload from './ProfileImageUpload';

function ProfileWithImage() {
  const { user, profilePhoto, uploadProfilePhoto, removeProfilePhoto, history } = useAppContext();
  const [activeTab, setActiveTab] = useState('overview');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    department: user?.department || '',
    role: user?.role || 'User'
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        department: user.department || '',
        role: user.role || 'User'
      });
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setEditMode(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setEditMode(false);
    alert('Profile updated successfully!');
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'Admin': return 'linear-gradient(135deg, #ef4444 0%, #764ba2 100%)';
      case 'Police': return 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)';
      case 'Lawyer': return 'linear-gradient(135deg, #8b5cf6 0%, #2d3748 100%)';
      default: return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
  };

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '??';
  };

  const recentActivity = history?.slice(0, 10) || [];
  const firCases = history?.filter(h => h?.type === 'fir-register') || [];
  const evidenceCount = history?.filter(h => h?.type === 'upload')?.length || 0;
  const classificationCount = history?.filter(h => h?.type === 'fir')?.length || 0;
  const summaryCount = history?.filter(h => h?.type === 'summary')?.length || 0;

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
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <h1 style={{ 
              color: 'white', 
              fontSize: '2.5rem', 
              fontWeight: '700',
              margin: 0,
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
              👤 Enhanced Profile
            </h1>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: getRoleColor(user.role),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}>
              {profilePhoto ? (
                <img 
                  src={profilePhoto} 
                  alt="Profile" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    borderRadius: '50%'
                  }}
                />
              ) : (
                <div style={{ 
                  fontSize: '2rem', 
                  textAlign: 'center', 
                  color: 'white'
                }}>
                  👤
                </div>
              )}
            </div>
            <div style={{ color: 'white', textAlign: 'center' }}>
              <div style={{ fontSize: '1.2rem', opacity: 0.9 }}>
                {user?.name || 'Guest'}
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                {user?.email || 'No email'}
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                {user?.role || 'User'}
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                {user?.loginTime ? new Date(user.loginTime).toLocaleDateString() : 'Not available'}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 0' }}>
        {/* Stats Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1.5rem', 
          marginBottom: '2rem' 
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
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
                📁
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e40af' }}>
                  {firCases.length}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>FIR Cases</div>
              </div>
            </div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
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
                background: 'linear-gradient(135deg, #dcfce7, #166534)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.2rem'
              }}>
                📎
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#166534' }}>
                  {evidenceCount}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Evidence Files</div>
              </div>
            </div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
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
                background: 'linear-gradient(135deg, #fef3c7, #9d174d)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.2rem'
              }}>
                ⚖️
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#9d174d' }}>
                  {classificationCount}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Classifications</div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Image Upload Component */}
        <ProfileImageUpload />

        {/* Tabs Navigation */}
        <div style={{ 
          display: 'flex', 
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '0.5rem 1rem',
          marginBottom: '2rem',
          overflowX: 'auto'
        }}>
          {['overview', 'activity', 'cases', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: activeTab === tab ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '500',
                color: activeTab === tab ? '#1e40af' : '#64748b',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap'
              }}
              onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
              onMouseOut={(e) => e.target.style.background = 'transparent'}
            >
              {tab === 'overview' && '👤'}
              {tab === 'activity' && '📊'}
              {tab === 'cases' && '📋'}
              {tab === 'settings' && '⚙️'}
              <span style={{ marginLeft: '0.5rem' }}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
          {activeTab === 'overview' && (
            <div>
              <h3 style={{ color: '#1e40af', marginBottom: '1.5rem' }}>👤 Profile Overview</h3>
              
              {/* Personal Information */}
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ color: '#1e40af', marginBottom: '1rem' }}>Personal Information</h4>
                {editMode ? (
                  <form onSubmit={handleUpdateProfile} style={{ display: 'grid', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#64748b', fontSize: '0.9rem' }}>Full Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          background: 'rgba(255, 255, 255, 0.05)',
                          color: '#1e40af'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#64748b', fontSize: '0.9rem' }}>Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          background: 'rgba(255, 255, 255, 0.05)',
                          color: '#1e40af'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#64748b', fontSize: '0.9rem' }}>Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          background: 'rgba(255, 255, 255, 0.05)',
                          color: '#1e40af'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#64748b', fontSize: '0.9rem' }}>Department</label>
                      <input
                        type="text"
                        value={formData.department}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          background: 'rgba(255, 255, 255, 0.05)',
                          color: '#1e40af'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#64748b', fontSize: '0.9rem' }}>Role</label>
                      <select
                        value={formData.role}
                        onChange={(e) => handleInputChange('role', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          background: 'rgba(255, 255, 255, 0.05)',
                          color: '#1e40af'
                        }}
                      >
                        <option value="User">User</option>
                        <option value="Police">Police</option>
                        <option value="Lawyer">Lawyer</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                      <button
                        type="submit"
                        style={{
                          background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
                          color: 'white',
                          border: 'none',
                          padding: '0.75rem 1.5rem',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '1rem',
                          fontWeight: '500',
                          transition: 'all 0.3s ease',
                          flex: '1'
                        }}
                      >
                        💾 Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditMode(false)}
                        style={{
                          background: 'rgba(255, 255, 255, 0.1)',
                          color: '#64748b',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          padding: '0.75rem 1.5rem',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '1rem',
                          fontWeight: '500',
                          transition: 'all 0.3s ease',
                          flex: '1'
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    <div style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Full Name:</span>
                        <span style={{ color: '#1e40af', fontWeight: '500' }}>{user?.name || 'Not provided'}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Email:</span>
                        <span style={{ color: '#1e40af', fontWeight: '500' }}>{user?.email || 'Not provided'}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Phone:</span>
                        <span style={{ color: '#1e40af', fontWeight: '500' }}>{user?.phone || 'Not provided'}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Department:</span>
                        <span style={{ color: '#1e40af', fontWeight: '500' }}>{user?.department || 'Not assigned'}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Role:</span>
                        <span style={{ color: '#1e40af', fontWeight: '500' }}>{user?.role || 'User'}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Member Since:</span>
                        <span style={{ color: '#1e40af', fontWeight: '500' }}>
                          {user?.loginTime ? new Date(user.loginTime).toLocaleDateString() : 'Not available'}
                        </span>
                      </div>
                      <button
                        onClick={() => setEditMode(true)}
                        style={{
                          background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
                          color: 'white',
                          border: 'none',
                          padding: '0.5rem 1rem',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '0.9rem',
                          fontWeight: '500',
                          transition: 'all 0.3s ease',
                          marginTop: '1rem',
                          width: '100%'
                        }}
                      >
                        ✏️ Edit Profile
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div>
              <h3 style={{ color: '#1e40af', marginBottom: '1.5rem' }}>📊 Recent Activity</h3>
              
              {recentActivity.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '3rem 2rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <div style={{ fontSize: '3rem', color: '#64748b', marginBottom: '1rem' }}>📭</div>
                  <p style={{ color: '#1e40af', textAlign: 'center' }}>No recent activity found</p>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                    Start using the application to see your activity history here.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {recentActivity.map((item, index) => (
                    <div
                      key={item.id || index}
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        padding: '1rem',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                      onClick={() => {
                        console.log('Activity item clicked:', item);
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '1.2rem',
                          fontWeight: 'bold'
                        }}>
                          {item.type === 'fir-register' && '📋'}
                          {item.type === 'upload' && '📎'}
                          {item.type === 'fir' && '⚖️'}
                          {item.type === 'summary' && '📝'}
                        </div>
                        <div style={{ flex: '1' }}>
                          <div style={{ 
                            fontSize: '0.9rem', 
                            fontWeight: '500', 
                            color: '#1e40af',
                            marginBottom: '0.25rem'
                          }}>
                            {item.type?.toUpperCase() || 'UNKNOWN'}
                          </div>
                          <div style={{ 
                            fontSize: '0.8rem', 
                            color: '#64748b', 
                            opacity: 0.8
                          }}>
                            {item.timestamp ? (() => {
                              try {
                                return new Date(item.timestamp).toLocaleDateString();
                              } catch (error) {
                                console.error('Date formatting error:', error);
                                return 'Invalid date';
                              }
                            })() : 'No date'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'cases' && (
            <div>
              <h3 style={{ color: '#1e40af', marginBottom: '1.5rem' }}>📋 My FIR Cases</h3>
              
              {firCases.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '3rem 2rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <div style={{ fontSize: '3rem', color: '#64748b', marginBottom: '1rem' }}>📂</div>
                  <p style={{ color: '#1e40af', textAlign: 'center' }}>No FIR cases registered yet.</p>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                    Click the button below to register your first FIR case.
                  </p>
                  <div style={{ marginTop: '1rem' }}>
                    <button
                      onClick={() => window.location.href = '/fir-register'}
                      style={{
                        background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: '500',
                        transition: 'all 0.3s ease',
                        width: '100%'
                      }}
                    >
                      + Register New FIR
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                  {firCases.map((caseItem, index) => (
                    <div
                      key={caseItem.id || index}
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        padding: '1rem',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                        e.currentTarget.style.transform = 'translateY(-4px)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                      onClick={() => {
                        console.log('Case clicked:', caseItem);
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                        <h4 style={{ 
                          color: '#1e40af', 
                          fontSize: '1.1rem', 
                          fontWeight: '600',
                          flex: '1'
                        }}>
                          {caseItem.title || 'Untitled FIR'}
                        </h4>
                        <div style={{
                          background: 'rgba(30, 58, 138, 0.1)',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '6px',
                          fontSize: '0.9rem',
                          color: '#1e40af'
                        }}>
                          Status: <span style={{ color: '#16a34a', fontWeight: '500' }}>{caseItem.status || 'Open'}</span>
                        </div>
                      </div>
                      <p style={{ 
                        fontSize: '0.8rem', 
                        color: '#64748b', 
                        lineHeight: '1.4',
                        marginTop: '0.5rem'
                      }}>
                        {caseItem.description?.slice(0, 150) || 'No description provided'}
                      </p>
                      <div style={{ 
                        display: 'flex', 
                        gap: '1rem', 
                        marginTop: '0.75rem'
                      }}>
                        <span style={{ color: '#64748b', fontSize: '0.9rem' }}>📅</span>
                        <span>{caseItem.incidentDate ? new Date(caseItem.incidentDate).toLocaleDateString() : 'No date'}</span>
                        <span style={{ color: '#64748b', fontSize: '0.9rem' }}>📍</span>
                        <span>{caseItem.incidentLocation || 'Unknown location'}</span>
                        <span style={{ color: '#64748b', fontSize: '0.9rem' }}>📎</span>
                        <span>{caseItem.files?.length || 0} files</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h3 style={{ color: '#1e40af', marginBottom: '1.5rem' }}>⚙️ Settings</h3>
              
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{ marginBottom: '2rem' }}>
                  <h4 style={{ color: '#1e40af', marginBottom: '1rem' }}>Notification Preferences</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        style={{ marginRight: '0.5rem' }}
                      />
                      <span style={{ color: '#1e40af', fontSize: '0.9rem' }}>Email notifications for new cases</span>
                    </label>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        style={{ marginRight: '0.5rem' }}
                      />
                      <span style={{ color: '#1e40af', fontSize: '0.9rem' }}>SMS alerts for case updates</span>
                    </label>
                  </div>
                </div>
                
                <div style={{ marginBottom: '2rem' }}>
                  <h4 style={{ color: '#1e40af', marginBottom: '1rem' }}>Privacy Settings</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        style={{ marginRight: '0.5rem' }}
                      />
                      <span style={{ color: '#1e40af', fontSize: '0.9rem' }}>Make profile public</span>
                    </label>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        style={{ marginRight: '0.5rem' }}
                      />
                      <span style={{ color: '#1e40af', fontSize: '0.9rem' }}>Show activity status</span>
                    </label>
                  </div>
                </div>

                <div style={{ marginTop: '2rem' }}>
                  <button
                    onClick={() => alert('Settings saved successfully!')}
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
                      color: 'white',
                      border: 'none',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: '500',
                      transition: 'all 0.3s ease',
                      width: '100%'
                    }}
                  >
                    💾 Save Settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        padding: '2rem 0',
        textAlign: 'center',
        color: '#64748b',
        fontSize: '0.9rem'
      }}>
        <p>© 2024 Enhanced Law AI Assistant. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default ProfileWithImage;
