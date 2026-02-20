import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('username', data.username);
        localStorage.setItem('role', data.role);
        navigate('/dashboard');
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('Login failed');
    }
  };

  return (
    <div className="login-page">
      {error && (
        <div className="toast-error">
          <div className="toast-border-error"></div>
          <span>Invalid username or password</span>
        </div>
      )}

      <div className="login-card">
        <div className="card-header-full">
          <div className="logo-area">
            <div className="logo-square"></div>
            <span className="logo-name">KodBank</span>
          </div>
        </div>

        <div className="card-body">
          <div className="card-section-left">
            <div className="welcome-area">
              <h2 className="welcome-title">Welcome to KodBank</h2>
              <p className="welcome-subtitle">Sign in to continue</p>
            </div>
            <div className="security-note">
              <span className="security-icon">🔒</span>
              <span className="security-text">Secure Banking</span>
            </div>
          </div>

          <div className="card-section-middle">
            <form onSubmit={handleSubmit}>
              <div className="input-field">
                <label className="input-label">USERNAME</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="input-box"
                  placeholder="Enter username"
                  required
                />
              </div>

              <div className="input-field">
                <label className="input-label">PASSWORD</label>
                <div className="password-box-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="input-box"
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    className="password-eye"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    👁️
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="card-section-right">
            <button type="submit" className="signin-btn" onClick={handleSubmit}>
              Sign In
            </button>
          </div>
        </div>
      </div>

      <p className="register-text">
        Don't have an account? <Link to="/register" className="register-link">Register</Link>
      </p>
    </div>
  );
}

export default Login;
