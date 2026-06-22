import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '', role: 'User' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill all fields');
      return;
    }
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 800));
    const loggedIn = login(formData.email, formData.password, formData.role);
    if (loggedIn) {
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => navigate('/profile'), 1200);
    } else {
      setError('Invalid credentials');
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-glow auth-glow-1"></div>
      <div className="auth-glow auth-glow-2"></div>

      <div className="auth-card-glass" style={{ maxWidth: '420px', padding: '2rem' }}>
        <div className="auth-header">
          <div className="auth-icon">⚖️</div>
          <h1>Welcome Back</h1>
          <p>Sign in to Law AI Platform</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <div className="auth-error">
              <span>⚠️</span> {error}
            </div>
          )}
          {success && (
            <div className="auth-success">
              <span>✅</span> {success}
            </div>
          )}

          <div className="auth-input-group">
            <span className="input-icon">📧</span>
            <input
              type="email"
              id="login-email"
              placeholder=" "
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
            <label htmlFor="login-email">Email Address</label>
          </div>

          <div className="auth-input-group">
            <span className="input-icon">🔑</span>
            <input
              type={showPassword ? "text" : "password"}
              id="login-password"
              placeholder=" "
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
            <label htmlFor="login-password">Password</label>
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: '1rem', background: 'none', border: 'none', boxShadow: 'none', fontSize: '1.2rem', cursor: 'pointer', padding: 0 }}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          <div className="auth-input-group">
            <span className="input-icon">🛡️</span>
            <select
              id="login-role"
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
            >
              <option>User</option>
              <option>Police</option>
              <option>Lawyer</option>
              <option>Admin</option>
            </select>
            <label htmlFor="login-role" className="select-label">Select Role</label>
          </div>

          <button type="submit" disabled={loading} className="auth-btn-glass">
            {loading ? (
              <span className="auth-spinner"></span>
            ) : (
              <>Sign In →</>
            )}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Create account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

