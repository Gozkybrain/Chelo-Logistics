import React from 'react';
import '../styles/home.css';

const PayNow = () => {

  // Retrieve tracking code and amount from the URL parameters
  const params = new URLSearchParams(window.location.search);
  const trackingCode = params.get('code');
  const amount = params.get('amount');

  return (
    <div>

      {/* Cover Container for Main Contents */}
      <div className="cover">
        <div className="home-container">
          {/* Payment details section */}
          <div className="payment">
            <h2>Payment Information</h2>
            <p><strong>CashApp Tag:</strong> $yourtag</p>
            <p><strong>Full Name:</strong> Your Full Name</p>
            {trackingCode && (
              <>
                <p><strong>Tracking Number:</strong> {trackingCode}</p>
              </>
            )}
            {amount && (
              <>
                <p><strong>Amount Due:</strong> ${amount}</p>
              </>
            )}
            <p>Note: Please include your tracking number in the CashApp payment note.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PayNow;
