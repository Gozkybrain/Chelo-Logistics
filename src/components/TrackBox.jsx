import React from 'react';
import { FaMapMarkerAlt, FaFlagCheckered, FaLandmark } from 'react-icons/fa';

const TrackBox = ({
    trackingNumber,
    status,
    origin,
    destination,
    packageDescription,
    shipmentType,
    route,
    currentLocation
}) => {
    // Get all locations from the route
    const locations = [
        route.origin,
        route.location1,
        route.location2,
        route.location3,
        route.location4,
        route.location5,
        route.destination,
        // Remove empty or undefined locations
    ].filter(Boolean);


    // Find the index of the current location
    const currentLocationIndex = locations.indexOf(currentLocation);

    // Calculate progress percentage
    const progress = ((currentLocationIndex + 1) / locations.length) * 100;

    return (
        <div className="track-box">
            {/* Tracking Number and Status */}
            <h1 className='track-head'>#{trackingNumber} - {status}</h1>

            {/* Package Description and Shipment Type */}
            <h3 className='track-head'>
                {packageDescription} via {shipmentType}
            </h3>

            {/* Progress Bar */}
            <div className="progress-bar-container">
                {/* Start Landmark Icon */}
                <div className="landmark-icon start">
                    <FaLandmark />
                </div>

                {/* Progress Bar */}
                <div className="progress-bar">
                    <div
                        className="progress"
                        style={{ width: `${progress}%` }}
                    ></div>
                    <div className="map-indicator" style={{ left: `${progress}%` }}>
                        <FaMapMarkerAlt />
                    </div>
                </div>

                {/* End Landmark Icon */}
                <div className="landmark-icon end">
                    <FaFlagCheckered />
                </div>
            </div>

            {/* Origin and Receiver Address Boxes */}
            <div className="location-boxes">
                {/* Origin Box */}
                <div className="location-box">
                    <h3>Origin</h3>
                    <p>{origin}</p>
                </div>

                {/* Receiver Address Box */}
                <div className="location-box">
                    <h3>Destination</h3>
                    <p>{destination}</p>
                </div>
            </div>
        </div>
    );
};

export default TrackBox;