import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/register', {
        username,
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setSuccess('Registered successfully!');
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error('Registration error:', err.response?.data || err.message);
      setError(err.response?.data || 'Registration failed');
    }
  };

  return (
    <div className='login-wrapper'>
      {/* Floating Home Button */}
      <Link to="/" className="btn-home-nav">
        ← Home
      </Link>

      <div className="login-orb register-orb-pos"></div>
      <div className='login-glass-card'>
        <h2 className="login-title">Create Account</h2>
        {error && <div className="login-error">{error}</div>}
        {success && <div className="login-success">{success}</div>}
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
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>Register</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px', color: 'var(--text-muted)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--accent-primary)', fontWeight: '600' }}>Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;