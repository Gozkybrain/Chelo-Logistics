import React from 'react';
import { Atom } from 'react-loading-indicators';
import '../styles/Loader.css';

const NotFound = ({ color = '#FEB126', size = 'large', textColor = '#333' }) => {

    // Function to navigate back to the previous page
    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <div className="loader-container">
            <div className="loader-content" style={{ color: textColor }}>
                <Atom color={color} size={size} />
                <p
                    className="loader-text loader-error-code"
                    style={{ color: textColor }}>
                    404
                </p>
                <p
                    className="loader-text loader-message"
                    style={{ color: textColor }}>
                    Page Not Found
                </p>
                <button
                    className="go-back-btn"
                    onClick={handleGoBack}>
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default NotFound;
