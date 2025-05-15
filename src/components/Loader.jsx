import React from 'react';
import { Atom } from 'react-loading-indicators';
import '../styles/Loader.css'; 


const Loader = ({ color = '#FEB126', size = 'large' }) => {
  return (
    <div className="loader-container">
      <div className="loader-content">
        <Atom color={color} size={size} />
      </div>
    </div>
  );
};

export default Loader;
