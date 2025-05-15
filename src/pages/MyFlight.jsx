import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import '../styles/MyFlight.css';
import Loader from '../components/Loader';
import flyMe from '../assets/flyMe.png';
import { format } from 'date-fns';

const MyFlight = () => {
  // State to hold the shipment data and loading state
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hooks to get the location and navigation functions from react-router
  const location = useLocation();
  const navigate = useNavigate();

  // useEffect to fetch the shipment details based on the tracking code in the URL
  useEffect(() => {
    const fetchShipment = async () => {
      const params = new URLSearchParams(location.search);
      const trackingCode = params.get('code');

      // Check if tracking code exists in the URL
      if (trackingCode) {
        const q = query(collection(db, 'shipments'), where('trackingNumber', '==', trackingCode));
        const querySnapshot = await getDocs(q);

        // If the query returns results, set the shipment data
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            setShipment(doc.data());
          });
        }
      }
      setLoading(false);
    };

    fetchShipment();
  }, [location.search]);


  // Render a loading component if the data is still being fetched
  if (loading) {
    return <Loader />;
  }

  // Render a message if no shipment data is found for the given tracking code
  if (!shipment) {
    return <p>No ticket found for this tracking number.</p>;
  }

  // Function to format dates in 'EEEE, MMMM d, yyyy' format
  const formatDate = (date) => date ? format(new Date(date), 'EEEE, MMMM d, yyyy') : 'Date not available';

  // Formatting the departure and arrival dates using the formatDate function
  const formattedDepartureDate = formatDate(shipment.departureDate);
  const formattedArrivalDate = formatDate(shipment.arrivalDate);

  // Function to format time in 12-hour format with am/pm
  const formatTime = (time) => {
    if (!time) return 'Time not available';
    const parsedTime = new Date(`1970-01-01T${time}`);
    return format(parsedTime, 'h:mm aaa');
  };

  return (
    <div>
      {/* Navigation bar with a logo and a button to book a new flight */}
      <nav className="navbar">
        <img src={flyMe} alt="Logo" className="logo" />
        <button className="add-flight-button" onClick={() => navigate('/add-ticket')}>
          Book a Flight
        </button>
      </nav>


      <div className="my-flight-container">
        {/* Buttons to save the receipt as PDF and to navigate to payment page if unpaid */}
        <div className="receipt-buttons">
          {shipment.paymentStatus === 'Unpaid' ? (
            <button onClick={() => navigate(`/pay-now?code=${shipment.trackingNumber}&amount=${shipment.amount}`)}>Unpaid: Pay Now</button>
          ) : (
            <p>Paid in Full</p>
          )}
        </div>

        {/* the main receipt's canvas starts here */}
        <div id="receipt" className="receipt">
          {/* Receipt header with a logo and title */}
          <div className="receipt-header">
            <img src={flyMe} alt="Logo" className="logo" />
            <h2>Flight Ticket Purchase</h2>
          </div>

          {/* Payment status, tracking number, and airline details */}
          <div className="receipt-footer receipt-section">
            <p><strong>Payment Status:</strong>
              <div className='receipt-details'>{shipment.paymentStatus}</div>
            </p>
            <p><strong>Tracking Number:</strong>
              <div className='receipt-details'>{shipment.trackingNumber}</div>
            </p>
            <p><strong>Airline:</strong>
              <div className='receipt-details'>{shipment.airline}</div>
            </p>
          </div>

          {/* Passenger's name and gender */}
          <div className="receipt-section">
            <p><strong>Passenger's Name:</strong>
              <div className='receipt-details'>{shipment.name}</div>
            </p>
            <p><strong>Gender:</strong>
              <div className='receipt-details'>{shipment.gender}</div>
            </p>
          </div>

          {/* From and To addresses */}
          <div className="receipt-section">
            <p><strong>From:</strong>
              <div className='receipt-details'>{shipment.addressFrom}</div>
            </p>
            <p><strong>To:</strong>
              <div className='receipt-details'>{shipment.addressTo}</div>
            </p>
          </div>

          {/* Departure and arrival dates and times */}
          <div className="receipt-section">
            <p><strong>Departure Date:</strong>
              <div className='receipt-details'>{formattedDepartureDate} - {formatTime(shipment.departureTime)}</div>
            </p>
            <p><strong>Arrival Date:</strong>
              <div className='receipt-details'>{formattedArrivalDate} - {formatTime(shipment.arrivalTime)}</div>
            </p>
          </div>

          {/* Flight number, seat number, and cabin class */}
          <div className="receipt-section">
            <p><strong>Flight Number:</strong>
              <div className='receipt-details'>{shipment.flightNumber}</div>
            </p>
            <p><strong>Seat Number:</strong>
              <div className='receipt-details'>{shipment.seatNumber}</div>
            </p>
            <p><strong>Cabin Class:</strong>
              <div className='receipt-details'>{shipment.cabinClass}</div>
            </p>
          </div>

          <div className='receipt-end'>
            <div className='receipt-section'>
              {/* Display payment amount and status */}
              {shipment.paymentStatus === 'Unpaid' ? (
                <>
                  ${shipment.amount} Flight fare is Unpaid - Please ensure payment is made before {formattedDepartureDate}.
                </>
              ) : (
                <> ${shipment.amount} Flight fare has been Paid in Full.</>
              )}
            </div>

            {/* Important flight rules */}
            <div className="receipt-section">
              <h3>Important Rules</h3>
              <ol>
                <li>Arrive at the airport at least 2 hours before the departure time.</li>
                <li>Carry a valid government-issued ID along with this ticket.</li>
                <li>Ensure all carry-on items meet the airline's size and weight restrictions.</li>
                <li>Comply with all airline safety regulations and instructions.</li>
              </ol>
            </div>

            {/* Reminder to submit ticket at the terminal */}
            <div className="receipt-section">
              <p>Please submit your ticket at the terminal to receive a boarding pass.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyFlight;
