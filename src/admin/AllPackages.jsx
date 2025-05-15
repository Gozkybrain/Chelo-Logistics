import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../lib/firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import Loader from '../components/Loader';
import '../styles/AllTickets.css';
import { FaCopy, FaEye } from 'react-icons/fa';

const AllPackages = () => {
    const [packages, setPackages] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // Check if user is authenticated
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                navigate('/login');
            } else {
                fetchPackages();
            }
            setLoading(false);
        });

        return unsubscribe;
    }, [navigate]);

    // Fetch all packages from Firestore
    const fetchPackages = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, 'shipments'));
            const packagesData = querySnapshot.docs
                .map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
                .filter((pkg) => pkg.trackingNumber && pkg.senderName && pkg.receiverName); // Ensure all required fields exist

            setPackages(packagesData);
        } catch (error) {
            console.error('Error fetching packages:', error);
        } finally {
            setLoading(false);
        }
    };


    // Filter packages based on search term
    const filteredPackages = packages.filter((pkg) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return (
            pkg.trackingNumber.toLowerCase().includes(lowerCaseSearchTerm) ||
            pkg.senderName.toLowerCase().includes(lowerCaseSearchTerm)
        );
    });

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Handle package row click
    const handlePackageClick = (pkg) => {
        setSelectedPackage(pkg);
        setIsEditing(true);
    };

    // Handle form submission for editing
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await updateDoc(doc(db, 'shipments', selectedPackage.id), selectedPackage);
            setIsEditing(false);
            // Refresh the package list
            fetchPackages();
        } catch (error) {
            console.error('Error updating package:', error);
        } finally {
            setIsSaving(false);
        }
    };

    // Handle delete button click
    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteDoc(doc(db, 'shipments', selectedPackage.id));
            setIsEditing(false);
            // Refresh the package list
            fetchPackages();
        } catch (error) {
            console.error('Error deleting package:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    // Handle input changes in the edit form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
    
        // Check if the input is part of the nested `route` object
        if (name.startsWith('route.')) {
            // Extract the field name (e.g., 'origin', 'location1', etc.)
            const routeField = name.split('.')[1]; 
            setSelectedPackage((prevPackage) => ({
                ...prevPackage,
                route: {
                    ...prevPackage.route,
                    // Update the specific field in the `route` object
                    [routeField]: value, 
                },
            }));
        } else {
            // Handle non-nested fields (e.g., senderName, receiverName, etc.)
            setSelectedPackage((prevPackage) => ({
                ...prevPackage,
                [name]: value,
            }));
        }
    };

    // Close the sidebar
    const closeSidebar = () => {
        setIsEditing(false);
        setSelectedPackage(null);
    };

    if (loading) {
        return <Loader />;
    }

    const getCurrentLocationOptions = (route) => {
        const { origin, location1, location2, location3, location4, location5, destination } = route;

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
        <div className="all-tickets-container">
            <h1>All Packages</h1>

            {/* Add Search Bar */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by tracking number or sender name..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>


            {/* table to display the package list */}
            <table>
                <thead>
                    <tr>
                        <th>Tracking Number</th>
                        <th>Sender Name</th>
                        <th className="hide-on-mobile">From</th>
                        <th className="hide-on-mobile">To</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPackages.map((pkg) => (
                        <tr key={pkg.id} onClick={() => handlePackageClick(pkg)} className="tr">
                            <td>{pkg.trackingNumber}</td>
                            <td>{pkg.senderName}</td>
                            <td className="hide-on-mobile">{pkg.route.origin}</td>
                            <td className="hide-on-mobile">{pkg.route.destination}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Overlay */}
            {isEditing && <div className="overlaying" onClick={closeSidebar}></div>}

            {/* Slide-in edit form */}
            <div className={`edit-form ${isEditing ? 'open' : ''}`}>
                <h2>Edit Package</h2>
                {selectedPackage && (
                    <form onSubmit={handleEditSubmit}>
                        {/* Tracking Number */}
                        <div className="field-groups">
                            <div className="tracking-number-container">
                                <h4>Tracking Number:</h4>
                                <span>{selectedPackage.trackingNumber}</span>
                                <div className="icon-container">
                                    <FaCopy
                                        className="icon"
                                        onClick={() => navigator.clipboard.writeText(selectedPackage.trackingNumber)}
                                        title="Copy Tracking Number"
                                    />
                                    <a
                                        href={`/track-shipment?code=${selectedPackage.trackingNumber}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FaEye className="icon" title="View Package" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Sender Information */}
                        <h2>Sender Information</h2>
                        <div className="field-group">
                            <div>
                                <label>Full Name:</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    name="senderName"
                                    value={selectedPackage.senderName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Address:</label>
                                <input
                                    type="text"
                                    placeholder="123 Main St"
                                    name="senderAddress"
                                    value={selectedPackage.senderAddress}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Email:</label>
                                <input
                                    type="email"
                                    placeholder="john.doe@example.com"
                                    name="senderEmail"
                                    value={selectedPackage.senderEmail}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Phone:</label>
                                <input
                                    type="tel"
                                    placeholder="+1234567890"
                                    name="senderPhone"
                                    value={selectedPackage.senderPhone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Receiver Information */}
                        <h2>Receiver Information</h2>
                        <div className="field-group">
                            <div>
                                <label>Full Name:</label>
                                <input
                                    type="text"
                                    placeholder="Jane Smith"
                                    name="receiverName"
                                    value={selectedPackage.receiverName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Address:</label>
                                <input
                                    type="text"
                                    placeholder="456 Elm St"
                                    name="receiverAddress"
                                    value={selectedPackage.receiverAddress}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Email:</label>
                                <input
                                    type="email"
                                    placeholder="jane.smith@example.com"
                                    name="receiverEmail"
                                    value={selectedPackage.receiverEmail}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Phone:</label>
                                <input
                                    type="tel"
                                    placeholder="+0987654321"
                                    name="receiverPhone"
                                    value={selectedPackage.receiverPhone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Shipment Information */}
                        <h2>Shipment Information</h2>
                        <div className="field-group">
                            <div>
                                <label>Pickup Date:</label>
                                <input
                                    type="date"
                                    name="pickupDate"
                                    value={selectedPackage.pickupDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Expected Delivery Date:</label>
                                <input
                                    type="date"
                                    name="expectedDeliveryDate"
                                    value={selectedPackage.expectedDeliveryDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Type of Shipment:</label>
                                <select
                                    name="shipmentType"
                                    value={selectedPackage.shipmentType}
                                    onChange={handleInputChange}
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
                                    value={selectedPackage.status}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Transit">In Transit</option>
                                    <option value="On Hold">On Hold</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Clearance Needed">Clearance Needed</option>
                                </select>
                            </div>
                            <div>
                                <label>Package Description:</label>
                                <input
                                    type="text"
                                    placeholder="Describe the package"
                                    name="packageDescription"
                                    value={selectedPackage.packageDescription}
                                    onChange={handleInputChange}
                                    required
                                />
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
                                    value={selectedPackage.route.origin}
                                    onChange={handleInputChange}
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
                                        value={selectedPackage.route[`location${num}`]}
                                        onChange={handleInputChange}
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
                                    value={selectedPackage.route.destination}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Current Location:</label>
                                <select
                                    name="currentLocation"
                                    value={selectedPackage.currentLocation}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="" disabled>
                                        Select Current Location
                                    </option>
                                    {getCurrentLocationOptions(selectedPackage.route).map((location, index) => (
                                        <option key={index} value={location.value}>
                                            {location.value}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Submit and Delete Buttons */}
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

export default AllPackages;