import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', {
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
    <div>
      <h2>Register</h2>
      {error && <div>{error}</div>}
      {success && <div>{success}</div>}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;