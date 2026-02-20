import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API_URL from '../config';
import '../styles/Register.css';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setErrors({ general: data.error });
      }
    } catch (error) {
      setErrors({ general: 'Registration failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      {success && (
        <div className="toast-success">
          <div className="toast-border"></div>
          <span>Account created successfully</span>
        </div>
      )}

      <div className="register-left-panel">
        <div className="panel-content">
          <div className="logo-section">
            <div className="logo-icon"></div>
            <span className="logo-text">KodBank</span>
          </div>

          <div className="divider"></div>

          <div className="tagline-section">
            <h1 className="tagline">Professional Banking.</h1>
            <p className="subtitle">Secure. Fast. Reliable.</p>

            <div className="about-kodbank">
              <p>
                KodBank represents the future of digital banking, combining cutting-edge technology with traditional banking values. Our platform leverages state-of-the-art 256-bit encryption and JWT-based authentication to ensure complete security for every transaction.
              </p>

              <p>
                We believe banking should be accessible and intuitive. With real-time balance updates and a user-friendly interface, you maintain complete control over your finances. Join thousands of satisfied customers experiencing smarter, more secure banking with KodBank today.
              </p>
            </div>
          </div>

          <div className="features-list">
            <div className="feature-item">
              <div className="feature-bullet"></div>
              <span>256-bit encryption</span>
            </div>
            <div className="feature-item">
              <div className="feature-bullet"></div>
              <span>JWT secured sessions</span>
            </div>
            <div className="feature-item">
              <div className="feature-bullet"></div>
              <span>Real-time balance updates</span>
            </div>
          </div>

          <div className="version-tag">v1.0.0</div>
        </div>
      </div>

      <div className="register-right-panel">
        <div className="form-container">
          <div className="form-header">
            <h2 className="form-title">Create Account</h2>
            <p className="form-subtitle">Fill in your details below</p>
            <div className="divider"></div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-field">
                <label className="field-label">USERNAME</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="field-input"
                  placeholder="Enter username"
                  required
                />
                {errors.username && <span className="field-error">{errors.username}</span>}
              </div>

              <div className="form-field">
                <label className="field-label">EMAIL</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="field-input"
                  placeholder="Enter email"
                  required
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>

              <div className="form-field">
                <label className="field-label">PASSWORD</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="field-input"
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    👁️
                  </button>
                </div>
                {errors.password && <span className="field-error">{errors.password}</span>}
              </div>

              <div className="form-field">
                <label className="field-label">PHONE</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="field-input"
                  placeholder="Enter phone"
                />
              </div>

              <div className="form-field full-width">
                <label className="field-label">ROLE</label>
                <div className="dropdown-wrapper" onClick={() => setDropdownOpen(!dropdownOpen)}>
                  <div className="dropdown-display">
                    <span>🏦 Customer</span>
                    <span className="dropdown-chevron">▼</span>
                  </div>
                  {dropdownOpen && (
                    <div className="dropdown-panel">
                      <div className="dropdown-option" onClick={() => setDropdownOpen(false)}>
                        <span>🏦 Customer</span>
                        <span className="role-tag">ONLY ROLE</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {errors.general && <div className="field-error">{errors.general}</div>}

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? <span className="button-spinner"></span> : 'Create Account'}
            </button>

            <p className="switch-text">
              Already have an account? <Link to="/login" className="switch-link">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
