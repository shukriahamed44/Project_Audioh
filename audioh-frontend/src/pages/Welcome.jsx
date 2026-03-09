import { Link } from 'react-router-dom';
import React from 'react';
import './Welcome.css';
import logo from '../assets/Logo_White.png';

function Welcome() {
    return (
        <div className="welcome-page-wrapper">
            <div className="gradient-orb orb-1"></div>
            <div className="gradient-orb orb-2"></div>

            <div className='welcome-glass-card'>
                <div className='welcome-content'>
                    <img src={logo} alt="Logo" className="welcome-logo" />
                    <h1 className="welcome-tagline">Do more with your audio</h1>
                    <p className="welcome-subtext">Experience the next generation of audio intelligence.</p>

                    <div className="welcome-actions">
                        <Link to="/login">
                            <button className="btn-primary">Log in</button>
                        </Link>
                        <Link to="/register">
                            <button className="btn-secondary">Register</button>
                        </Link>
                        <Link to="/quickscribe">
                            <button className="btn-secondary">Try QuickScribe</button>
                        </Link>
                    </div>

                    <div className="features-badge-row">
                        <span className="feature-badge">Lightning Fast</span>
                        <span className="feature-badge">AI Powered</span>
                        <span className="feature-badge">Secure Storage</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Welcome;