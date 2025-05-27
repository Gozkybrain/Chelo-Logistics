// utils/generateTrackingNumber.js
const generateTrackingNumber = () => {
  const letters = () => {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      for (let i = 0; i < 3; i++) {
          result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
  };

  const randomDigit = () => Math.floor(Math.random() * 10);         // 0-9
  const randomTwoDigits = () => String(Math.floor(Math.random() * 100)).padStart(2, '0'); // 00-99
  const randomTenDigits = () => String(Math.floor(1000000000 + Math.random() * 9000000000)); // 10-digit number

  return `${letters()}${randomDigit()}-${randomTwoDigits()}-${randomTenDigits()}`;
};

export default generateTrackingNumber;
