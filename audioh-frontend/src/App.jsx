import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import QuickScribe from './QuickScribe';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import QuickscribePage from './pages/QuickscribePage';
import Welcome from './pages/Welcome';
import Projects from './pages/Projects';


function App() {
  return (
    <Router>
      <div>
        {/* Navigation links - these should be inside Router */}
        {/* <div style={{ padding: '10px' }}>
          <Link to="/login" style={{ marginRight: '10px' }}>Log in</Link>
          <Link to="/register" style={{ marginRight: '10px' }}>Register</Link>
        </div> */}

        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/quickscribe" element={<QuickscribePage />} />
        </Routes>    
      </div>
    </Router>
  )
}

export default App