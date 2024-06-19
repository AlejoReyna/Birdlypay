import React from 'react';
import './FirstPage.css';
import { Link } from 'react-router-dom';
const FirstPage = () => {
    return(
        <div className='container-fluid blue-background main-text d-flex flex-column justify-content-center align-items-center'>
            <div className='row'>
                <div className='col-12 actor-regular'>
                    <h3> Use crypto easy. </h3>
                    <br></br>
                    <h2> Your payroll in crypto. </h2>
                </div>
            </div>

            <div className='row buttons-container d-flex justify-content-center'>
                <div className='col-8 actor-regular '>
                    <button className='btn'>
                        <Link to="/RegisterEmail" className='text-decoration-none'> Continue Email </Link>
                    </button>
                    <button className='btn'> Log in with Wallet  </button>
                    <button className='btn'> Log in with BASE </button>
                </div>
            </div>
        </div>
    )
}

export default FirstPage;