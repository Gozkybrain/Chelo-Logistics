import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Loader from '../components/Loader';
import TrackMap from '../components/TrackMap';
import TrackBox from '../components/TrackBox';
import TrackInfo from '../components/TrackInfo';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import '../styles/MyShipment.css';

const MyShipment = () => {
    const [shipment, setShipment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const trackingNumber = queryParams.get('code');

    const fullPageRef = useRef(); // Ref to full page content

    useEffect(() => {
        const fetchShipment = async () => {
            if (!trackingNumber) {
                setError('No tracking number provided.');
                setLoading(false);
                return;
            }

            try {
                const shipmentsRef = collection(db, 'shipment-chelo');
                const q = query(shipmentsRef, where('trackingNumber', '==', trackingNumber));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
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

    const handlePrintFullPagePDF = async () => {
        const input = fullPageRef.current;
        const canvas = await html2canvas(input, { scale: 2, useCORS: true });
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        // If the content is taller than one page, slice it across pages
        let position = 0;
        while (position < pdfHeight) {
            pdf.addImage(imgData, 'PNG', 0, -position, pdfWidth, pdfHeight);
            if (position + pdf.internal.pageSize.getHeight() < pdfHeight) {
                pdf.addPage();
            }
            position += pdf.internal.pageSize.getHeight();
        }

        pdf.save(`${trackingNumber}_invoice.pdf`);
    };

    if (loading) return <Loader />;
    if (error) return <div className="error-message">{error}</div>;
    if (!shipment) return <div className="error-message">No shipment data available.</div>;

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
        <div ref={fullPageRef} className="my-shipment-container">
            <div className="tracking-layout">
                {/* Left Box */}
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

                    {/* PDF Download Button - UNDER TrackBox */}
                    <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                        <button onClick={handlePrintFullPagePDF}>
                            Print Invoice as PDF
                        </button>
                    </div>
                </div>

                {/* Right Box */}
                <div className="map-container">
                    <TrackMap shipment={shipment} />
                </div>
            </div>

            {/* Full Info */}
            <TrackInfo sender={senderInfo} receiver={receiverInfo} packageInfo={packageInfo} />
        </div>
    );
};

export default MyShipment;
