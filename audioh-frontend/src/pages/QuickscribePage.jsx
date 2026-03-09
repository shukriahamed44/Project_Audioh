import QuickScribe from "../QuickScribe";
import { Link } from 'react-router-dom';
import React from 'react';
import './Quickscribe.css';
import doneIcon from '../assets/done.png';

function QuickscribePage() {
    return (
        <div className="quickscribe-page-wrapper">
            <Link to="/" className="btn-home-nav">
                ← Home
            </Link>

            <div className="gradient-orb qs-orb-1"></div>
            <div className="gradient-orb qs-orb-2"></div>

            <div className="quickscribe-layout-container">
                <div className="quickscribe-context-panel">
                    <h3>Audio Requirements</h3>
                    <ul className="context-list">
                        <li>Maximum file size: <strong>50MB</strong></li>
                        <li>Supported formats: <strong>MP3, WAV, M4A</strong></li>
                        <li>Optimal language: <strong>English (US/UK)</strong></li>
                    </ul>

                    <h3 style={{ marginTop: '40px' }}>Recent Activity</h3>
                    <div className="recent-log">
                        <div className="log-item">
                            <img src={doneIcon} alt="Done" className="log-icon" />
                            <div className="log-details">
                                <span>Interview_04.mp3</span>
                                <small>Transcribed 2h ago</small>
                            </div>
                        </div>
                        <div className="log-item">
                            <img src={doneIcon} alt="Done" className="log-icon" />
                            <div className="log-details">
                                <span>Lecture_Notes.wav</span>
                                <small>Transcribed yesterday</small>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="quickscribe-glass-container">
                    <QuickScribe />
                </div>
            </div>
        </div>
    );
}

export default QuickscribePage;