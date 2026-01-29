import React, { useState } from 'react';
import axios from 'axios';
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
      const response = await axios.post('http://localhost:8081/api/auth/register', {
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
    <div className='register-wrapper'>
      <div className='register-card'>
        <h2 className="register-title">Create new account</h2>
        {error && <div>{error}</div>}
        {success && <div>{success}</div>}
        <form onSubmit={handleSubmit} className="login-form">
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">R E G I S T E R</button>
        </form>
      </div>
    </div>
  );
};

export default Register;