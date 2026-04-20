import React, { useState } from 'react';
import axios from 'axios';

function AdminLogin({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://student-app-m60q.onrender.com/auth/login', { email, password });
      if (res.data.token) {
        onLoginSuccess(res.data.token);
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data);
      } else {
        setError('Login failed. Server might be down.');
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="glass-card auth-box p-5 text-center">
        <div className="mb-4">
          <div className="portal-icon mb-3">🛡️</div>
          <h2 className="mb-1">Admin Portal</h2>
          <p className="text-muted small">System Access Control</p>
        </div>

        {error && (
          <div className="alert alert-danger border-0 glass-card p-3 mb-4 text-start d-flex align-items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4 text-start">
            <label className="form-label small fw-bold px-1">EMAIL ADDRESS</label>
            <div className="input-group">
              <input
                type="email"
                className="form-control glass-input"
                placeholder="user name"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                required
              />
            </div>
          </div>

          <div className="mb-4 text-start">
            <label className="form-label small fw-bold px-1">PASSWORD</label>
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control glass-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                style={{ paddingRight: '45px' }}
              />
              <button
                className="btn p-0 border-0 position-absolute end-0 top-50 translate-middle-y me-3"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  background: 'none',
                  color: 'var(--text-secondary)',
                  opacity: 0.7,
                  zIndex: 10,
                  fontSize: '1.2rem'
                }}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 btn-modern mt-3">
            Secure Entry ➔
          </button>
        </form>

        <div className="mt-5 text-center">
          <p className="text-muted extra-small">
            Student Management System v2.0 <br />
            Protected by End-to-End Encryption
          </p>
        </div>
      </div>
    </div>
  );

}

export default AdminLogin;
