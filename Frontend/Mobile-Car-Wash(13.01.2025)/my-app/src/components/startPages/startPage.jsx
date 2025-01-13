import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './loginPage.css';
import LoginPage from './loginPage.jsx';

function StartPage() {
    const [showLoginPage, setShowLoginPage] = useState(false);
    
    const handleClick = () => {
        setShowLoginPage(true);
    }

    return (
        <div className={`startPage ${showLoginPage ? 'show-login' : ''}`}>
            <div className='start-page'>
                {!showLoginPage && (
                    <div className='overlay' >
                        <h1 className='head'></h1>
                        <button
                        className='button'  
                        onClick={handleClick} 
                        //----
                        data-text="Awesome">
                        <span className="actual-text">&nbsp;Click&nbsp;to&nbsp;Login&nbsp;</span>
    <span aria-hidden="true" className="hover-text">&nbsp;Click&nbsp;to&nbsp;Login&nbsp;</span></button>
                    </div>
                )}
            </div>
            {showLoginPage && (
                <div className='login-form'>
                    <LoginPage/>
                </div>
            )}
        </div>
    );
}

export default StartPage;

// class="position-absolute top-0 start-50 translate-middle-x"