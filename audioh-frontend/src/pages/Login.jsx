import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', {
        username,
        password
      });

      localStorage.setItem('user', username);

      if (response.data && response.data.userId) {
        localStorage.setItem('userId', response.data.userId.toString());
      } else {
        localStorage.setItem('userId');
      }

      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data || 'Login failed');
    }
  };

  return (
    <div className='login-wrapper'>
      {/* Floating Home Button */}
      <Link to="/" className="btn-home-nav">
        ← Home
      </Link>

      <div className="login-orb"></div>
      <div className='login-glass-card'>
        <h2 className='login-title'>Welcome Back</h2>
        {error && <div className="login-error">{error}</div>}
        <form onSubmit={handleSubmit} className="login-form">
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="glass-input"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="glass-input"
          />
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>Log In</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px', color: 'var(--text-muted)' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--accent-primary)', fontWeight: '600' }}>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;