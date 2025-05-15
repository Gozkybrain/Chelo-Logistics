// src/utils/generateTrackingNumber.js
const generateTrackingNumber = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    let trackingNumber = '';
    for (let i = 0; i < 3; i++) {
      trackingNumber += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    for (let i = 0; i < 5; i++) {
      trackingNumber += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    return trackingNumber;
  };
  
  export default generateTrackingNumber;
  