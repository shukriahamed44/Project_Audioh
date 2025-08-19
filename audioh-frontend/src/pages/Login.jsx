import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username,
        password
      });
      
      // Store user session with user ID from backend response
      localStorage.setItem('user', username);
      
      // IMPORTANT: Get and store the actual user ID from backend
      if (response.data && response.data.userId) {
        localStorage.setItem('userId', response.data.userId.toString());
      } else {
        // Fallback for testing (but this shouldn't happen in production)
        localStorage.setItem('userId');
      }
      
      navigate('/dashboard');
    } catch (err) {
      // Better error handling - show actual error from server
      setError(err.response?.data || 'Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <div style={{color: 'red'}}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;