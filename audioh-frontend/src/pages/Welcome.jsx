// ./pages/Welcome.jsx
import { Link } from 'react-router-dom';
import React from 'react';
import QuickScribe from '../QuickScribe';


function Welcome(){
    return(
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to Audioh!</h1>
            <p>Your audio processing platform</p>
            
            <div style={{ marginTop: '30px' }}>
                <Link to="/login">
                    <button style={{ margin: '10px', padding: '10px 20px' }}>Log in</button>
                </Link>
                
                <Link to="/register">
                    <button style={{ margin: '10px', padding: '10px 20px' }}>Register</button>
                </Link>
                <><Link to ="/dashboard">
                <button style={{ margin: '10px', padding: '10px 20px' }}>Quick Dashboard </button>
                </Link></>
            </div>

            <QuickScribe/>
        </div>
    );
}

export default Welcome;