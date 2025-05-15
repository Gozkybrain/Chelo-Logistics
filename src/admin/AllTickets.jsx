import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../lib/firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import Loader from '../components/Loader';
import '../styles/AllTickets.css';
import { FaCopy, FaEye } from 'react-icons/fa';

const AllTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); 
  const navigate = useNavigate();
  const [isCopied, setIsCopied] = useState(false); 


  // Check if user is authenticated
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/login');
      } else {
        fetchTickets();
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [navigate]);

  // Fetch all tickets from Firestore
  const fetchTickets = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'shipments'));
      const ticketsData = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        // Only show tickets with flightNumber
        .filter((ticket) => ticket.flightNumber);
      setTickets(ticketsData);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter tickets based on search term
  const filteredTickets = tickets.filter((ticket) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      ticket.trackingNumber.toLowerCase().includes(lowerCaseSearchTerm) ||
      ticket.name.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle ticket row click
  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
    setIsEditing(true);
  };

  // Handle form submission for editing
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateDoc(doc(db, 'shipments', selectedTicket.id), selectedTicket);
      setIsEditing(false);
      // Refresh the ticket list
      fetchTickets();
    } catch (error) {
      console.error('Error updating ticket:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle delete button click
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteDoc(doc(db, 'shipments', selectedTicket.id));
      setIsEditing(false);
      // Refresh the ticket list
      fetchTickets();
    } catch (error) {
      console.error('Error deleting ticket:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle input changes in the edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedTicket((prevTicket) => ({
      ...prevTicket,
      [name]: value,
    }));
  };

  // Close the sidebar
  const closeSidebar = () => {
    setIsEditing(false);
    setSelectedTicket(null);
  };

  if (loading) {
    return <Loader />;
  }

  // Handle copy tracking number
  const handleCopy = () => {
    navigator.clipboard.writeText(selectedTicket.trackingNumber);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); 
  };

  return (
    <div className="all-tickets-container">
      <h1>All Tickets</h1>

      {/* Add Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by tracking number or passenger name..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

{/* tabular form for all the tickets */}
      <table>
        <thead>
          <tr>
            <th>Tracking Number</th>
            <th>Passenger Name</th>
            <th className="hide-on-mobile">From Airport</th>
            <th className="hide-on-mobile">To Airport</th>
          </tr>
        </thead>
        <tbody>
          {filteredTickets.map((ticket) => (
            <tr key={ticket.id} onClick={() => handleTicketClick(ticket)} className="tr">
              <td>{ticket.trackingNumber}</td>
              <td>{ticket.name}</td>
              <td className="hide-on-mobile">{ticket.addressFrom}</td>
              <td className="hide-on-mobile">{ticket.addressTo}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Overlay */}
      {isEditing && <div className="overlaying" onClick={closeSidebar}></div>}

      {/* Slide-in edit form */}
      <div className={`edit-form ${isEditing ? 'open' : ''}`}>
        {selectedTicket && (
          <form onSubmit={handleEditSubmit}>
            {/* Tracking Number, copy icon and view icon */}
            <div className="field-groups">
              <div className="tracking-number-container">
                <h4>Tracking Number:</h4>
                <span>{selectedTicket.trackingNumber}</span>
                <span className="icon-container">
                  <FaCopy
                    className="icon"
                    onClick={handleCopy}
                    title="Copy Tracking Number"
                  />
                  {isCopied && <span className="copied-message">Copied!</span>}
                  <a
                    href={`/flight-ticket?code=${selectedTicket.trackingNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaEye className="icon" title="View Ticket" />
                  </a>
                </span>
              </div>
            </div>

            <h2>Edit Ticket</h2>
            {/* Passenger's Name */}
            <div className="field-group">
              <label>Passenger's Name:</label>
              <input
                type="text"
                name="name"
                value={selectedTicket.name}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Gender */}
            <div className="field-group">
              <label>Gender:</label>
              <select
                name="gender"
                value={selectedTicket.gender}
                onChange={handleInputChange}
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Seat Number */}
            <div className="field-group">
              <label>Seat Number:</label>
              <input
                type="text"
                name="seatNumber"
                value={selectedTicket.seatNumber}
                onChange={handleInputChange}
                readOnly
              />
            </div>

            {/* Flight Number */}
            <div className="field-group">
              <label>Flight Number:</label>
              <input
                type="text"
                name="flightNumber"
                value={selectedTicket.flightNumber}
                onChange={handleInputChange}
                readOnly
              />
            </div>

            {/* From (Airport) */}
            <div className="field-group">
              <label>From (Airport):</label>
              <input
                type="text"
                name="addressFrom"
                value={selectedTicket.addressFrom}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* To (Airport) */}
            <div className="field-group">
              <label>To (Airport):</label>
              <input
                type="text"
                name="addressTo"
                value={selectedTicket.addressTo}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Departure Time */}
            <div className="field-group">
              <label>Departure Time:</label>
              <input
                type="time"
                name="departureTime"
                value={selectedTicket.departureTime}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Departure Date */}
            <div className="field-group">
              <label>Departure Date:</label>
              <input
                type="date"
                name="departureDate"
                value={selectedTicket.departureDate}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Arrival Time */}
            <div className="field-group">
              <label>Arrival Time:</label>
              <input
                type="time"
                name="arrivalTime"
                value={selectedTicket.arrivalTime}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Arrival Date */}
            <div className="field-group">
              <label>Arrival Date:</label>
              <input
                type="date"
                name="arrivalDate"
                value={selectedTicket.arrivalDate}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Cabin Class */}
            <div className="field-group">
              <label>Cabin Class:</label>
              <select
                name="cabinClass"
                value={selectedTicket.cabinClass}
                onChange={handleInputChange}
                required
              >
                <option value="Economy">Economy</option>
                <option value="Business">Business</option>
                <option value="First">First</option>
              </select>
            </div>

            {/* Airline */}
            <div className="field-group">
              <label>Airline:</label>
              <input
                type="text"
                name="airline"
                value={selectedTicket.airline}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Flight Fare */}
            <div className="field-group">
              <label>Flight Fare:</label>
              <input
                type="text"
                name="amount"
                value={selectedTicket.amount}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Payment Status */}
            <div className="field-group">
              <label>Payment Status:</label>
              <select
                name="paymentStatus"
                value={selectedTicket.paymentStatus}
                onChange={handleInputChange}
                required
              >
                <option value="Unpaid">Unpaid</option>
                <option value="Paid">Paid</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex-btn">
              <button type="submit" disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save'}
              </button>
              <button type="button" onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
              <button type="button" onClick={closeSidebar}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AllTickets;