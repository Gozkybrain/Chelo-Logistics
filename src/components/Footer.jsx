import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>With our extensive global network, we provide seamless shipping solutions across continents, ensuring your packages arrive safely and on time, no matter the destination.</p>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: info@chelologistics.com</p>
          <p>Phone: +1 (810) 219-1347</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 . All rights reserved.</p>
      </div>

      <div className="translate-container">
        <div id="google_translate_element"></div>
      </div>
    </footer>
  );
}

export default Footer;
