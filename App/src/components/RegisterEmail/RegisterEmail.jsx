import React, {useState} from 'react';
import VerificationCode from '../VerificationCode/VerificationCode';
import { Link } from 'react-router-dom';
import './RegisterEmail.css';

const RegisterEmail = () => {
    const [showVerificationCode, setShowVerificationCode] = useState(false);
    
    return (
        
        <div className='container-fluid pink-background main-text d-flex flex-column justify-content-center align-items-center'>
            <div className='row'>
            <button className='btn'> Back </button>
            </div>
        <div className='row'>
            <div className='col-12 actor-regular'>
                <h3> Your email </h3>
                <input type='text'> </input>
                <br></br>
                <hr></hr>
                <button onClick={() => setShowVerificationCode(true)}>Continue</button>
                <br></br>
          </div>
        </div>
        {showVerificationCode && <VerificationCode />}
    </div>
    );
}

export default RegisterEmail;