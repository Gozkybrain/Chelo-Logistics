import React from 'react';

const TrackInfo = ({ sender, receiver, packageInfo }) => {
    return (
        <div className="track-info-container">
            {/* Sender Info Box */}
            <div className="info-box">
                <h2>Sender Information</h2>
                <h3>Full Name:</h3><p> {sender.fullName}</p>
                <h3>Email:</h3><p> {sender.email}</p>
                <h3>Phone:</h3><p> {sender.phone}</p>
                <h3>Address:</h3><p> {sender.address}</p>
            </div>

            {/* Receiver Info Box */}
            <div className="info-box">
                <h2>Receiver Information</h2>
                <h3>Full Name:</h3><p> {receiver.fullName}</p>
                <h3>Email:</h3><p> {receiver.email}</p>
                <h3>Phone:</h3><p> {receiver.phone}</p>
                <h3>Address:</h3><p> {receiver.address}</p>
            </div>

            {/* Package Info Box */}
            <div className="info-box">
                <h2>Package Information</h2>
                <h3>Pickup Date:</h3><p> {packageInfo.pickupDate}</p>
                <h3>Expected Delivery Date:</h3><p> {packageInfo.expectedDeliveryDate}</p>
                <h3>Description:</h3><p> {packageInfo.description}</p>
                <h3>Destination:</h3><p> {packageInfo.destination}</p>
            </div>
        </div>
    );
};

export default TrackInfo;