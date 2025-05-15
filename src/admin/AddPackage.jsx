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

const AddPackage = () => {
    // Initial state for package details
    const initialPackageDetails = {
        senderName: '',
        senderAddress: '',
        senderEmail: '',
        senderPhone: '',
        receiverName: '',
        receiverAddress: '',
        receiverEmail: '',
        receiverPhone: '',
        pickupDate: '',
        expectedDeliveryDate: '',
        packageDescription: '',
        shipmentType: '',
        status: 'Pending',
        route: {
            origin: '',
            location1: '',
            location2: '',
            location3: '',
            location4: '',
            location5: '',
            destination: '',
        },
        currentLocation: '', 
    };

    const [packageDetails, setPackageDetails] = useState(initialPackageDetails);
    const [trackingNumber, setTrackingNumber] = useState('');
    const [user, setUser] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Generate tracking number when the page loads
    useEffect(() => {
        setTrackingNumber(generateTrackingNumber());
    }, []);

    // Redirect to login if user is not authenticated
    useEffect(() => {
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

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('route.')) {
            const routeField = name.split('.')[1];
            setPackageDetails((prevDetails) => ({
                ...prevDetails,
                route: {
                    ...prevDetails.route,
                    [routeField]: value,
                },
            }));
        } else {
            setPackageDetails((prevDetails) => ({
                ...prevDetails,
                [name]: value,
            }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); 

        try {
            await addDoc(collection(db, 'shipments'), {
                ...packageDetails,
                trackingNumber,
                username: user.email,
            });
            console.log('Package added successfully');
            setModalIsOpen(true); 

            // Reset form after successful submission
            setPackageDetails(initialPackageDetails);
        } catch (error) {
            console.error('Error adding document: ', error);
        } finally {
            setLoading(false); 
        }
    };

    // Close the modal and navigate to the tracking page
    const closeModal = () => {
        setModalIsOpen(false);
        navigate(`/track-shipment?code=${trackingNumber}`, {
            state: { packageDetails, trackingNumber },
        });
    };

    // Handle logout
    const handleLogout = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    // Get current location options for the dropdown
    const getCurrentLocationOptions = () => {
        const { origin, location1, location2, location3, location4, location5, destination } =
            packageDetails.route;

        const locations = [
            { label: 'Origin', value: origin || 'Origin' },
            { label: 'Location 1', value: location1 || 'Location 1' },
            { label: 'Location 2', value: location2 || 'Location 2' },
            { label: 'Location 3', value: location3 || 'Location 3' },
            { label: 'Location 4', value: location4 || 'Location 4' },
            { label: 'Location 5', value: location5 || 'Location 5' },
            { label: 'Destination', value: destination || 'Destination' },
        ];

        return locations;
    };

    return (
        <div>
            {/* Display loader while waiting */}
            {loading && (
                <div className="overlay-loader">
                    <Loader />
                </div>
            )}

            <div className={`add-shipment-container ${loading ? 'loading' : ''}`}>
                {user && (
                    <p>
                        Logged in as: {user.email}
                        <div className="out" onClick={handleLogout}>
                            Logout
                        </div>
                    </p>
                )}
                <h1>Register a Package Shipment</h1>

                <form onSubmit={handleSubmit}>
                    {/* Sender Info */}
                    <h2>Sender Information</h2>
                    <div className="field-group">
                        <div>
                            <label>Full Name:</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                name="senderName"
                                value={packageDetails.senderName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Address:</label>
                            <input
                                type="text"
                                placeholder="123 Main St"
                                name="senderAddress"
                                value={packageDetails.senderAddress}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input
                                type="email"
                                placeholder="john.doe@example.com"
                                name="senderEmail"
                                value={packageDetails.senderEmail}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Phone:</label>
                            <input
                                type="tel"
                                placeholder="+1234567890"
                                name="senderPhone"
                                value={packageDetails.senderPhone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Receiver Info */}
                    <h2>Receiver Information</h2>
                    <div className="field-group">
                        <div>
                            <label>Full Name:</label>
                            <input
                                type="text"
                                placeholder="Jane Smith"
                                name="receiverName"
                                value={packageDetails.receiverName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Address:</label>
                            <input
                                type="text"
                                placeholder="456 Elm St"
                                name="receiverAddress"
                                value={packageDetails.receiverAddress}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input
                                type="email"
                                placeholder="jane.smith@example.com"
                                name="receiverEmail"
                                value={packageDetails.receiverEmail}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Phone:</label>
                            <input
                                type="tel"
                                placeholder="+0987654321"
                                name="receiverPhone"
                                value={packageDetails.receiverPhone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Shipment Info */}
                    <h2>Shipment Information</h2>
                    <div className="field-group">
                        <div>
                            <label>Tracking Number:</label>
                            <input
                                type="text"
                                name="trackingNumber"
                                value={trackingNumber}
                                readOnly
                            />
                        </div>
                        <div>
                            <label>Pickup Date:</label>
                            <input
                                type="date"
                                name="pickupDate"
                                value={packageDetails.pickupDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Expected Delivery Date:</label>
                            <input
                                type="date"
                                name="expectedDeliveryDate"
                                value={packageDetails.expectedDeliveryDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Package Description:</label>
                            <input
                                type="text"
                                placeholder="Describe the package"
                                name="packageDescription"
                                value={packageDetails.packageDescription}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Type of Shipment:</label>
                            <select
                                name="shipmentType"
                                value={packageDetails.shipmentType}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Type</option>
                                <option value="Air">Air</option>
                                <option value="Sea">Sea</option>
                                <option value="Road">Road</option>
                            </select>
                        </div>
                        <div>
                            <label>Status:</label>
                            <select
                                name="status"
                                value={packageDetails.status}
                                onChange={handleChange}
                                required
                            >
                                <option value="Pending">Pending</option>
                                <option value="In Transit">In Transit</option>
                                <option value="On Hold">On Hold</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Clearance Needed">Clearance Needed</option>
                            </select>
                        </div>
                    </div>

                    {/* Route Information */}
                    <h2>Route Information</h2>
                    <div className="field-group">
                        <div>
                            <label>Origin:</label>
                            <input
                                type="text"
                                placeholder="Origin Location"
                                name="route.origin"
                                value={packageDetails.route.origin}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {[1, 2, 3, 4, 5].map((num) => (
                            <div key={num}>
                                <label>Location {num}:</label>
                                <input
                                    type="text"
                                    placeholder={`Location ${num}`}
                                    name={`route.location${num}`}
                                    value={packageDetails.route[`location${num}`]}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        ))}
                        <div>
                            <label>Destination:</label>
                            <input
                                type="text"
                                placeholder="Destination Location"
                                name="route.destination"
                                value={packageDetails.route.destination}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Current Location:</label>
                            <select
                                name="currentLocation"
                                value={packageDetails.currentLocation}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>
                                    Select Current Location
                                </option>
                                {getCurrentLocationOptions().map((location, index) => (
                                    <option key={index} value={location.value}>
                                        {location.value}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Adding Package...' : 'Add Package'}
                    </button>
                </form>

                {/* Modal for tracking number */}
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    contentLabel="Package Added"
                    className="modals"
                    overlayClassName="overlaid"
                >
                    <h2>Package Added Successfully!</h2>
                    <p>Your Tracking Number is: <strong>{trackingNumber}</strong></p>
                    <button onClick={closeModal}>Track My Package</button>
                </Modal>
            </div>
        </div>
    );
};

export default AddPackage;