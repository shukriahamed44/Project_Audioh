import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './DashboardSidebar.css';
import logo from '../assets/Logo_White.png';

const DashboardSidebar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'active-nav-link' : '';
    };

    return (
        <aside className="dashboard-sidebar">
            <div className="sidebar-brand">
                <Link to="/">
                    <img src={logo} alt="Audioh" className="sidebar-logo" />
                </Link>
            </div>

            <nav className="sidebar-nav">
                <h5 className="nav-section-title">Menu</h5>
                <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>
                    <span className="nav-icon"></span>
                    Overview
                </Link>
                <Link to="/projects" className={`nav-link ${isActive('/projects')}`}>
                    <span className="nav-icon"></span>
                    My Projects
                </Link>
                <Link to="/quickscribe" className={`nav-link ${isActive('/quickscribe')}`}>
                    <span className="nav-icon"></span>
                    QuickScribe
                </Link>

                <h5 className="nav-section-title" style={{ marginTop: '30px' }}>Support</h5>
                <Link to="#" className="nav-link">
                    <span className="nav-icon"></span>
                    Settings
                </Link>
                <Link to="#" className="nav-link">
                    <span className="nav-icon"></span>
                    Help Center
                </Link>
            </nav>

            <div className="sidebar-footer">
                <div className="storage-badge">
                    <span className="storage-label">Storage Used</span>
                    <div className="storage-bar"><div className="storage-fill"></div></div>
                    <span className="storage-text">1.2 GB / 5 GB</span>
                </div>
            </div>
        </aside>
    );
};

export default DashboardSidebar;
