import React, { useState } from 'react';
import axios from 'axios';

function StudentLogin({ onLoginSuccess, onGoBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://192.168.1.3:5000/student/login', { email, password });
      onLoginSuccess(res.data);
    } catch (err) {
      setError(err.response?.data || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto py-5">
      <div className="glass-card p-5 text-center">
        <h2 className="mb-4">Student Login</h2>
        {error && <div className="alert alert-danger mb-4">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="mb-3 text-start">
            <label className="form-label small fw-bold">EMAIL</label>
            <input 
              type="email" 
              className="form-control glass-input" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-4 text-start">
            <label className="form-label small fw-bold">PASSWORD</label>
            <input 
              type="password" 
              className="form-control glass-input" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-modern w-100">Login ➔</button>
        </form>
        <button className="btn btn-link mt-4 text-muted small" onClick={onGoBack}>
          New here? Register Account
        </button>
      </div>
    </div>
  );
}

export default StudentLogin;
