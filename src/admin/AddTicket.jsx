import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import generateTrackingNumber from '../utils/generateTrackingNumber';
import '../styles/AddShipment.css';
import Modal from 'react-modal';
import Loader from '../components/Loader';


// Set the root element for accessibility
Modal.setAppElement('#root');

// Function to generate a random seat number (2 digits followed by 1 letter)
const generateSeatNumber = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  let seatNumber = '';
  for (let i = 0; i < 2; i++) {
    seatNumber += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  seatNumber += letters.charAt(Math.floor(Math.random() * letters.length));
  return seatNumber;
  // example: XY9
};

// Function to generate a random flight number (1 letter followed by 4 digits)
const generateFlightNumber = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  let flightNumber = '';
  flightNumber += letters.charAt(Math.floor(Math.random() * letters.length));
  for (let i = 0; i < 4; i++) {
    flightNumber += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  return flightNumber;
  // example: B1234
};

const AddTicket = () => {
  // Initial state for shipment details
  const initialShipmentDetails = {
    name: '',
    gender: '',
    seatNumber: generateSeatNumber(),
    addressFrom: '',
    addressTo: '',
    departureTime: '',
    departureDate: '',
    arrivalTime: '',
    arrivalDate: '',
    flightNumber: generateFlightNumber(),
    cabinClass: '',
    amount: '',
    airline: '',
    paymentStatus: 'Unpaid'
  };

  const [shipmentDetails, setShipmentDetails] = useState(initialShipmentDetails);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [user, setUser] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // if user is not logged in, then redirect to login
  useEffect(() => {
    // Show loader when checking authentication
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        navigate('/login');
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [navigate]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipmentDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const trackingNumber = generateTrackingNumber();
    console.log('Submitting shipment details:', shipmentDetails);
    console.log('Generated tracking number:', trackingNumber);

    try {
      await addDoc(collection(db, 'shipments'), {
        ...shipmentDetails,
        trackingNumber,
        username: user.email
      });
      console.log('Shipment added successfully');
      setTrackingNumber(trackingNumber);
      setModalIsOpen(true);

      // Reset form after successful submission
      setShipmentDetails(initialShipmentDetails);

    } catch (error) {
      console.error("Error adding document: ", error);
    } finally {
      setLoading(false);
    }
  };

  // close the modal by navigating to the track page
  const closeModal = () => {
    setModalIsOpen(false);
    navigate(`/flight-ticket?code=${trackingNumber}`, { state: { shipmentDetails, trackingNumber } });
  };

  const handleLogout = async () => {
    try {
      // Assuming you're using Firebase Auth
      await auth.signOut();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };



  return (
    <div>
      {/* Display loader while waiting */}
      {loading &&
        <div className='overlay-loader'><Loader /></div>}


      <div className={`add-shipment-container ${loading ? 'loading' : ''}`}>
        {user && <>Logged in as: {user.email}
          <div className="out" onClick={handleLogout}>Logout</div>
        </>}
        <h1>Register a Flight Ticket</h1>

        <form onSubmit={handleSubmit}>
          <div className="field-group">
            {/* Passenger's name */}
            <div>
              <label>
                Passenger's Name:
              </label>
              <input
                type="text"
                placeholder='John Doe'
                name="name"
                value={shipmentDetails.name}
                onChange={handleChange}
                required />
            </div>

            {/* Select a Gender */}
            <div>
              <label>
                Gender:
              </label>
              <select name="gender" value={shipmentDetails.gender} onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="field-group">
            {/* Random Seat Number */}
            <div>
              <label>
                Seat Number:
              </label>
              <input type="text"
                name="seatNumber"
                value={shipmentDetails.seatNumber}
                onChange={handleChange}
                readOnly />
            </div>

            {/* Random Flight Number */}
            <div>
              <label>
                Flight Number:
              </label>
              <input
                type="text"
                name="flightNumber"
                value={shipmentDetails.flightNumber}
                onChange={handleChange}
                readOnly />
            </div>
          </div>

          <div className="field-group">
            {/* From (Airport) */}
            <div>
              <label>
                From (Airport):
              </label>
              <input
                type="text"
                placeholder='New York'
                name="addressFrom"
                value={shipmentDetails.addressFrom}
                onChange={handleChange}
                required />
            </div>

            {/* To (Airport) */}
            <div>
              <label>
                To (Airport):
              </label>
              <input
                type="text"
                placeholder='West Virginia'
                name="addressTo"
                value={shipmentDetails.addressTo}
                onChange={handleChange}
                required />
            </div>
          </div>

          <div className="field-group">
            {/* Departure Time */}
            <div>
              <label>
                Departure Time:
              </label>
              <input
                type="time"
                name="departureTime"
                value={shipmentDetails.departureTime}
                onChange={handleChange}
                required />
            </div>

            {/* Departure Date */}
            <div>
              <label>
                Departure Date:
              </label>
              <input
                type="date"
                name="departureDate"
                value={shipmentDetails.departureDate}
                onChange={handleChange}
                required />
            </div>
          </div>

          <div className="field-group">
            {/* Arrival Time */}
            <div>
              <label>
                Arrival Time:
              </label>
              <input
                type="time"
                name="arrivalTime"
                value={shipmentDetails.arrivalTime}
                onChange={handleChange}
                required />
            </div>

            {/* Arrival Date */}
            <div>
              <label>
                Arrival Date:
              </label>
              <input
                type="date"
                name="arrivalDate"
                value={shipmentDetails.arrivalDate}
                onChange={handleChange}
                required />
            </div>
          </div>

          <div className="field-group">
            {/* Cabin Class */}
            <div>
              <label>
                Cabin Class:
              </label>
              <select name="cabinClass" value={shipmentDetails.cabinClass} onChange={handleChange} required>
                <option value="">Select Cabin Class</option>
                <option value="Economy">Economy</option>
                <option value="Business">Business</option>
                <option value="First">First</option>
              </select>
            </div>

            {/* Preferred airline */}
            <div>
              <label>
                Airline:
              </label>
              <input
                type="text"
                placeholder='Emirates'
                name="airline"
                value={shipmentDetails.airline}
                onChange={handleChange}
                required />
            </div>

            {/* Passenger's billing */}
            <div>
              <label>
                Flight Fare:
              </label>
              <input
                type="text"
                placeholder='200'
                name="amount"
                value={shipmentDetails.amount}
                onChange={handleChange}
                required />
            </div>

            {/* Payment Status */}
            <div>
              <label>
                Payment Status:
              </label>
              <select
                name="paymentStatus"
                value={shipmentDetails.paymentStatus}
                onChange={handleChange}
                required>
                <option value="Unpaid">Unpaid</option>
                <option value="Paid">Paid</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={loading}>
          {loading ? 'Adding Ticket...' : 'Add Ticket'}
          </button>
        </form>



        {/* Modal for tracking number */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Shipment Added"
          className="modals"
          overlayClassName="overlaid"
        >
          <h2>Shipment Added Successfully!</h2>
          <p>Your Tracking Number is: <strong>{trackingNumber}</strong></p>
          <button onClick={closeModal}>View My Flight</button>
        </Modal>
      </div>
    </div>
  );
};

export default AddTicket;
