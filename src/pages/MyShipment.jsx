import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Loader from '../components/Loader';
import TrackMap from '../components/TrackMap';
import TrackBox from '../components/TrackBox';
import TrackInfo from '../components/TrackInfo'; 
import '../styles/MyShipment.css';

const MyShipment = () => {
    const [shipment, setShipment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Extract the tracking number from the URL query parameter
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const trackingNumber = queryParams.get('code');

    // Fetch shipment details from Firestore
    useEffect(() => {
        const fetchShipment = async () => {
            if (!trackingNumber) {
                setError('No tracking number provided.');
                setLoading(false);
                return;
            }

            try {
                // Create a query to find the shipment by trackingNumber
                const shipmentsRef = collection(db, 'shipments');
                const q = query(shipmentsRef, where('trackingNumber', '==', trackingNumber));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    // Get the first matching document
                    const shipmentDoc = querySnapshot.docs[0];
                    setShipment(shipmentDoc.data());
                } else {
                    setError('Shipment not found.');
                }
            } catch (err) {
                console.error('Error fetching shipment:', err);
                setError('Failed to fetch shipment details.');
            } finally {
                setLoading(false);
            }
        };

        fetchShipment();
    }, [trackingNumber]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!shipment) {
        return <div className="error-message">No shipment data available.</div>;
    }

    // Prepare props for TrackInfo
    const senderInfo = {
        fullName: shipment.senderName,
        email: shipment.senderEmail,
        phone: shipment.senderPhone,
        address: shipment.senderAddress,
    };

    const receiverInfo = {
        fullName: shipment.receiverName,
        email: shipment.receiverEmail,
        phone: shipment.receiverPhone,
        address: shipment.receiverAddress,
    };

    const packageInfo = {
        pickupDate: shipment.pickupDate,
        expectedDeliveryDate: shipment.expectedDeliveryDate,
        description: shipment.packageDescription,
        destination: shipment.route.destination,
    };

    return (
        <div className="my-shipment-container">
            <div className="tracking-layout">
                {/* Left Box (1/3) - TrackBox Component */}
                <div className="tracking-details">
                    <TrackBox
                        trackingNumber={trackingNumber}
                        status={shipment.status}
                        origin={shipment.route.origin}
                        destination={shipment.route.destination}
                        packageDescription={shipment.packageDescription}
                        shipmentType={shipment.shipmentType}
                        route={shipment.route}
                        currentLocation={shipment.currentLocation}
                    />
                </div>

                {/* Right Box (2/3) - Map */}
                <div className="map-container">
                    <TrackMap shipment={shipment} />
                </div>
            </div>

            {/* TrackInfo Component */}
            <TrackInfo sender={senderInfo} receiver={receiverInfo} packageInfo={packageInfo} />
        </div>
    );
};

export default MyShipment;