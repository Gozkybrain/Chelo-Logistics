import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';
import bookMe from '../assets/landing.png';
import train from '../assets/icon_train.png';
import truck from '../assets/icon_truck.png';
import ship from '../assets/icon_ship.png';
import flight from '../assets/icon_new_2.png';
import Loader from '../components/Loader';
import HeroSection from '../components/HeroSection';


const Home = () => {
    const [trackingCode, setTrackingCode] = useState('');
    const [activeTab, setActiveTab] = useState('package');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    // Simulate fetching data or network delay
    useEffect(() => {
        const timer = setTimeout(() => {
            // Set loading to false after 2 seconds (simulate fetch)
            setIsLoading(false);
        }, 2000);
        // Cleanup timer
        return () => clearTimeout(timer);
    }, []);

    // Handle form submission based on active tab
    const handleTrack = () => {
        if (activeTab === 'package') {
            navigate(`/track-shipment?code=${trackingCode}`);
        } else if (activeTab === 'ticket') {
            navigate(`/my-flight?code=${trackingCode}`);
        }
    };

    // Show loader while isLoading is true
    if (isLoading) {
        return <Loader />;
    }

    return (
        <div>
            {/* Cover Container for Main Contents */}
            <HeroSection />
            <div className="top-section">
                <div className="top-left">
                    <h1>Leading Courier Delivery and Logistics Company</h1>
                </div>
                <div className="top-right">
                    <h3>Our logistics experts work with you to develop customized solutions that meet your unique needs.</h3>
                    <label className='top-p'>
                        We offer a wide range of shipping and logistics services, including air freight, sea freight, truck freight, warehouse service, customs brokerage, and more. Our services are designed to be flexible and customizable, allowing you to choose the options that best fit your business requirements.
                    </label>
                    <span className="top-button" onClick={() => navigate('/about-us')}>Learn More</span>
                </div>
            </div>

            <div className='cover'>
                <div className="home-container">
                    {/* Image at the left section */}
                    <div className="left-section">
                        <img src={bookMe} alt="Flight" className="flight-image" />
                    </div>

                    {/* Tracking form at the right section */}
                    <div className="left-section">
                        {/* Tab System */}
                        <div className="tab-container">
                            <button
                                className={`tab-button ${activeTab === 'package' ? 'active' : ''}`}
                                onClick={() => setActiveTab('package')}
                            >
                                Track a Package
                            </button>
                            <button
                                className={`tab-button ${activeTab === 'ticket' ? 'active' : ''}`}
                                onClick={() => setActiveTab('ticket')}
                            >
                                Flight Ticket
                            </button>
                        </div>

                        {/* Tracking Form */}
                        <form
                            className="track-form"
                            onSubmit={(e) => { e.preventDefault(); handleTrack(); }}
                        >
                            <label>Enter Tracking Code:</label>
                            <input
                                type="text"
                                placeholder='example: 1234567890'
                                value={trackingCode}
                                onChange={(e) => setTrackingCode(e.target.value)}
                                required
                            />
                            <button className='logout-button' type="submit">
                                {activeTab === 'package' ? 'Track Package' : 'Track Ticket'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className='why-us'>
                <h1>Why Choose us?</h1>
                {/* Div with 4 Boxes */}
                <div className="features-section">
                    <div className="feature-box">
                        <img src={flight} alt="Fast Delivery" />
                        <h3>Plane Freight</h3>
                        <p>Quick and Secure Air Cargo Shipping Solutions to Any Destination Worldwide</p>
                    </div>
                    <div className="feature-box">
                        <img src={ship} alt="Global Coverage" />
                        <h3>Ship Freight</h3>
                        <p>Any Cargo Size, Offering Reliable and Cost-Effective Solutions</p>
                    </div>
                    <div className="feature-box">
                        <img src={truck} alt="Secure Shipping" />
                        <h3>Truck Freight</h3>
                        <p>Fast and Reliable Ground Shipping Solutions for All Your Cargo Needs</p>
                    </div>
                    <div className="feature-box">
                        <img src={train} alt="Customer Support" />
                        <h3>Train Freight</h3>
                        <p>Rail Transportation Services for Domestic and International Shipping</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;