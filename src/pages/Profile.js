import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate, Link } from "react-router-dom";
import ProfileImageUpload from "../components/ProfileImageUpload";

function Profile() {
  const { user, logout, history, profilePhoto } = useAppContext();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  const firCases = history.filter(h => h.type === 'fir-register');
  const evidenceCount = history.filter(h => h.type === 'upload').length;
  const classificationCount = history.filter(h => h.type === 'fir').length;
  const summaryCount = history.filter(h => h.type === 'summary').length;

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, role: user.role, email: user.email, phone: user.phone || '', department: user.department || '' });
    }
  }, [user, editing]);

  if (!user) {
    return (
      <div className="container">
        <div className="profile-guest">
          <div className="guest-icon">🔐</div>
          <h2>Access Denied</h2>
          <p>Please <Link to="/login" className="link-gradient">log in</Link> to view your profile.</p>
        </div>
      </div>
    );
  }

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    // In a real app, this would update the user profile
    setEditing(false);
    setLoading(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '??';
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'Admin': return '#ef4444';
      case 'Police': return '#3b82f6';
      case 'Lawyer': return '#8b5cf6';
      default: return '#10b981';
    }
  };

  const recentActivity = history.slice(0, 8);

  return (
    <div className="profile-page">
      {/* Hero Header */}
      <div className="profile-hero" style={{ background: `linear-gradient(135deg, ${getRoleColor(user.role)}, var(--secondary-blue))` }}>
        <div className="profile-hero-content">
          <div className="avatar-circle" style={{ background: getRoleColor(user.role), overflow: 'hidden', padding: 0 }}>
            {profilePhoto ? (
              <img
                src={profilePhoto}
                alt="Profile"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              getInitials(user.name)
            )}
          </div>
          <div className="profile-hero-text">
            <h1>{user.name}</h1>
            <div className="profile-meta">
              <span className="role-badge" style={{ background: getRoleColor(user.role) }}>{user.role}</span>
              <span>📧 {user.email}</span>
              <span>📅 Member since {new Date(user.loginTime).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#dbeafe', color: '#1e40af' }}>📁</div>
          <div className="stat-info">
            <span className="stat-value">{firCases.length}</span>
            <span className="stat-label">FIR Cases</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#dcfce7', color: '#166534' }}>📎</div>
          <div className="stat-info">
            <span className="stat-value">{evidenceCount}</span>
            <span className="stat-label">Evidence Files</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fef3c7', color: '#92400e' }}>⚖️</div>
          <div className="stat-info">
            <span className="stat-value">{classificationCount}</span>
            <span className="stat-label">Classifications</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fce7f3', color: '#9d174d' }}>📝</div>
          <div className="stat-info">
            <span className="stat-value">{summaryCount}</span>
            <span className="stat-label">Summaries</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="profile-tabs">
        <div className="tab-nav">
          <button
            className={activeTab === 'overview' ? 'tab-active' : ''}
            onClick={() => setActiveTab('overview')}
          >
            👤 Overview
          </button>
          <button
            className={activeTab === 'cases' ? 'tab-active' : ''}
            onClick={() => setActiveTab('cases')}
          >
            📋 My FIR Cases ({firCases.length})
          </button>
          <button
            className={activeTab === 'activity' ? 'tab-active' : ''}
            onClick={() => setActiveTab('activity')}
          >
            📊 Recent Activity
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="tab-panel">
              <ProfileImageUpload />
              {editing ? (
                <form onSubmit={handleUpdate} className="edit-form">
                  <h3>✏️ Edit Profile</h3>
                  <div className="form-row">
                    <div className="input-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        value={formData.name || ''}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="input-group">
                      <label>Email</label>
                      <input
                        type="email"
                        value={formData.email || ''}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="input-group">
                      <label>Phone</label>
                      <input
                        type="tel"
                        value={formData.phone || ''}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="input-group">
                      <label>Department</label>
                      <input
                        type="text"
                        value={formData.department || ''}
                        onChange={(e) => setFormData({...formData, department: e.target.value})}
                        placeholder="e.g. Cyber Crime Unit"
                      />
                    </div>
                  </div>
                  <div className="input-group">
                    <label>Role</label>
                    <select
                      value={formData.role || ''}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                    >
                      <option>User</option>
                      <option>Police</option>
                      <option>Lawyer</option>
                      <option>Admin</option>
                    </select>
                  </div>
                  <div className="form-actions">
                    <button type="submit" disabled={loading} className="auth-btn btn-gradient">
                      {loading ? 'Saving...' : '💾 Save Changes'}
                    </button>
                    <button type="button" onClick={handleEditToggle} className="btn-secondary">Cancel</button>
                  </div>
                </form>
              ) : (
                <div className="profile-info">
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="info-label">Full Name</span>
                      <span className="info-value">{user.name}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Email</span>
                      <span className="info-value">{user.email}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Phone</span>
                      <span className="info-value">{user.phone || 'Not provided'}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Department</span>
                      <span className="info-value">{user.department || 'Not assigned'}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Role</span>
                      <span className="info-value">
                        <span className="role-badge-inline" style={{ background: getRoleColor(user.role) }}>{user.role}</span>
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Member Since</span>
                      <span className="info-value">{new Date(user.loginTime).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="profile-actions">
                    <button onClick={handleEditToggle} className="auth-btn btn-gradient">✏️ Edit Profile</button>
                    <button onClick={() => setShowLogoutConfirm(true)} className="logout-btn">🚪 Logout</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'cases' && (
            <div className="tab-panel">
              <div className="cases-header">
                <h3>📋 Registered FIR Cases</h3>
                <Link to="/fir-register">
                  <button className="auth-btn btn-sm">+ Register New FIR</button>
                </Link>
              </div>
              {firCases.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📂</div>
                  <p>No FIR cases registered yet.</p>
                  <Link to="/fir-register">
                    <button className="auth-btn btn-gradient">Register Your First FIR</button>
                  </Link>
                </div>
              ) : (
                <div className="cases-list">
                  {firCases.map((c) => (
                    <div key={c.id} className="case-card">
                      <div className="case-header">
                        <h4>{c.data.title || 'Untitled Case'}</h4>
                        <span className="case-status">{c.data.status || 'Open'}</span>
                      </div>
                      <p className="case-desc">{c.data.description?.slice(0, 120)}...</p>
                      <div className="case-meta">
                        <span>📅 {new Date(c.data.incidentDate || c.timestamp).toLocaleDateString()}</span>
                        <span>📍 {c.data.location || 'Unknown'}</span>
                        <span>📎 {c.data.evidence?.length || 0} files</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="tab-panel">
              <h3>📊 Recent Activity</h3>
              {recentActivity.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📭</div>
                  <p>No recent activity found.</p>
                </div>
              ) : (
                <div className="activity-list">
                  {recentActivity.map((item) => (
                    <div key={item.id} className="activity-item">
                      <div className="activity-icon">
                        {item.type === 'fir-register' && '📋'}
                        {item.type === 'upload' && '📎'}
                        {item.type === 'fir' && '⚖️'}
                        {item.type === 'summary' && '📝'}
                      </div>
                      <div className="activity-body">
                        <p className="activity-title">
                          {item.type === 'fir-register' && `Registered FIR: ${item.data.title || 'Untitled'}`}
                          {item.type === 'upload' && `Uploaded ${item.data.length} evidence file(s)`}
                          {item.type === 'fir' && `Classified as ${item.data.category}`}
                          {item.type === 'summary' && 'Generated case summary'}
                        </p>
                        <span className="activity-time">{new Date(item.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="modal-overlay" onClick={() => setShowLogoutConfirm(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <h3>🚪 Confirm Logout</h3>
            <p>Are you sure you want to sign out of your account?</p>
            <div className="modal-actions">
              <button onClick={handleLogout} className="logout-btn">Yes, Logout</button>
              <button onClick={() => setShowLogoutConfirm(false)} className="btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;

