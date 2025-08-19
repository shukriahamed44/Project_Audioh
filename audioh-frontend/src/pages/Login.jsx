import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Assuming you have a CSS file for styling

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
    <div className = 'login-wrapper'>
    <div className='login-card'>
      <h2 className = 'login-title'>Already have an account?</h2>
      {error && <div className = "login-error ">{error}</div>}
      <form onSubmit={handleSubmit} className="login-form">
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
        <button type="submit">L O G I N</button>
      </form>
    </div>
    </div>
  );
};

export default Login;