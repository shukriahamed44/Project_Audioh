// ./pages/Welcome.jsx
import { Link } from 'react-router-dom';
import React from 'react';
import QuickScribe from '../QuickScribe';
import './Welcome.css'; // Assuming you have a CSS file for styling


function Welcome(){
    return(
        <div className='welcome-container' >
            {/* <div className='logo-container'> */}
                <img src = "src\assets\Logo_White.png"/>
            {/* </div> */}
  
            <p style={{fontSize: '35px', marginTop:'0px' ,paddingTop: '0px', marginLeft: '100px'}}>Do more with your audio</p>
            
            <div style={{ marginTop: '30px' }}>
                <Link to="/login">
                    <button style={{ margin: '10px', padding: '10px 20px', marginLeft: '100px' }}>Log in</button>
                </Link>
                
                <Link to="/register">
                    <button style={{ margin: '10px', padding: '10px 20px' }}>Register</button>
                </Link>
                <><Link to ="/quickscribe">
                <button style={{ margin: '10px', padding: '10px 20px' }}>QuickScribe </button>
                </Link></>
            </div>

            
        </div>
    );
}

export default Welcome;