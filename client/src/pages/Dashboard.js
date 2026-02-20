import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import '../styles/Dashboard.css';

function Dashboard() {
  const [balance, setBalance] = useState(null);
  const [showBalance, setShowBalance] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'User';
  const role = localStorage.getItem('role') || 'Customer';

  const getInitial = () => username.charAt(0).toUpperCase();
  
  const getMemberSince = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const handleRevealBalance = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/getBalance', {
        credentials: 'include'
      });

      if (res.ok) {
        const data = await res.json();
        
        setTimeout(() => {
          setBalance(data.balance);
          setShowBalance(true);
          setLoading(false);
          
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#F5C518', '#FF8C00', '#FFFFFF']
          });
        }, 500);
      } else {
        navigate('/login');
      }
    } catch (error) {
      navigate('/login');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST', credentials: 'include' });
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-navbar">
        <div className="navbar-left">
          <div className="navbar-logo">
            <div className="navbar-logo-icon"></div>
            <span className="logo-kod">Kod</span>
            <span className="logo-bank">Bank</span>
          </div>
          <div className="logo-underline"></div>
        </div>
        
        <div className="navbar-center">
          <button className="nav-link active">Home</button>
          <button className="nav-link">Balance</button>
          <button className="nav-link">Security</button>
          <button className="nav-link">Profile</button>
        </div>
        
        <div className="navbar-right">
          <span className="navbar-greeting">Hey, {username}! 👋</span>
          <div className="navbar-avatar">{getInitial()}</div>
          <button className="navbar-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="dashboard-grid">
          <div className="left-column">
            <div className="welcome-card">
              <div className="hero-label">YOUR ACCOUNT OVERVIEW</div>
              <h1 className="hero-heading">Welcome back, {username}!</h1>
              <p className="hero-subtitle">Your finances are secure and up to date.</p>
              
              <div className="hero-tags">
                <span className="hero-tag">🔒 Secure</span>
                <span className="hero-tag">🚀 Active</span>
                <span className="hero-tag">🎯 JWT Protected</span>
              </div>
            </div>

            <div className="balance-glass-card">
              <div className="balance-header">
                <div className="balance-icon">💰</div>
                <div className="balance-title">Your Balance</div>
              </div>
              <div className="balance-subtitle">Tap reveal to see your balance</div>
              
              <div className="balance-display">
                {!balance || !showBalance ? (
                  <div className="balance-masked">₹ • • • • • •</div>
                ) : (
                  <div className="balance-amount">₹{balance.toLocaleString('en-IN')}</div>
                )}
              </div>
              
              {!balance ? (
                <button 
                  className="reveal-btn" 
                  onClick={handleRevealBalance}
                  disabled={loading}
                >
                  {loading ? <span className="btn-spinner"></span> : 'Reveal Balance →'}
                </button>
              ) : (
                <>
                  <button 
                    className="reveal-btn" 
                    onClick={() => setShowBalance(!showBalance)}
                  >
                    {showBalance ? 'Hide Balance' : 'Show Balance →'}
                  </button>
                  {showBalance && (
                    <div className="balance-success">✅ Balance retrieved!</div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="right-column">
            <h2 className="section-title">Account Details</h2>
            <div className="account-cards-vertical">
              <div className="account-card">
                <div className="card-icon">🏦</div>
                <div className="card-content">
                  <div className="card-label">ACCOUNT TYPE</div>
                  <div className="card-value">{role}</div>
                  <div className="card-subtext">Personal account</div>
                </div>
              </div>
              
              <div className="account-card">
                <div className="card-icon">✅</div>
                <div className="card-content">
                  <div className="card-label">STATUS</div>
                  <div className="card-value status-active">Active</div>
                  <div className="card-subtext">All systems normal</div>
                </div>
              </div>
              
              <div className="account-card">
                <div className="card-icon">🔒</div>
                <div className="card-content">
                  <div className="card-label">SECURITY</div>
                  <div className="card-value">JWT Auth</div>
                  <div className="card-subtext">Token based</div>
                </div>
              </div>
              
              <div className="account-card">
                <div className="card-icon">📅</div>
                <div className="card-content">
                  <div className="card-label">MEMBER SINCE</div>
                  <div className="card-value">{getMemberSince()}</div>
                  <div className="card-subtext">Account age</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="features-section">
          <h2 className="section-title">Why KodBank?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔐</div>
              <div className="feature-title">Bank-grade Security</div>
              <div className="feature-desc">Your data is always encrypted</div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <div className="feature-title">Instant Updates</div>
              <div className="feature-desc">Real-time balance and activity</div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <div className="feature-title">Smart Dashboard</div>
              <div className="feature-desc">Everything in one place</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
