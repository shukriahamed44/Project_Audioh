import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from '../assets/Logo_White.png';

const Footer = () => {
    return (
        <footer className="global-footer">
            <div className="footer-content">
                <div className="footer-brand">
                    <img src={logo} alt="Audioh Logo" className="footer-logo" />
                    <p className="footer-tagline">Experience the next generation of audio intelligence.</p>
                </div>

                <div className="footer-links-grid">
                    <div className="footer-column">
                        <h4>Product</h4>
                        <Link to="/quickscribe">QuickScribe</Link>
                        <Link to="/features">Features</Link>
                        <Link to="/pricing">Pricing</Link>
                    </div>

                    <div className="footer-column">
                        <h4>Resources</h4>
                        <Link to="/docs">Documentation</Link>
                        <Link to="/api">API Reference</Link>
                        <Link to="/blog">Blog</Link>
                    </div>

                    <div className="footer-column">
                        <h4>Company</h4>
                        <Link to="/about">About Us</Link>
                        <Link to="/careers">Careers</Link>
                        <Link to="/contact">Contact</Link>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Project Audioh. All rights reserved.</p>
                <div className="footer-legal">
                    <Link to="/privacy">Privacy Policy</Link>
                    <Link to="/terms">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
