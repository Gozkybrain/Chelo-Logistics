import React, { useState, useEffect } from 'react';
import '../styles/home.css'; // Reuse the same styles
import bookMe from '../assets/consult-man.png';
import train from '../assets/icon_train.png';
import truck from '../assets/icon_truck.png';
import ship from '../assets/icon_ship.png';
import flight from '../assets/icon_new_2.png';
import Loader from '../components/Loader';
import { MdEmail, MdLocationOn } from 'react-icons/md'; 

const About = () => {
    const [isLoading, setIsLoading] = useState(true); 

    // Simulate fetching data or network delay
    useEffect(() => {
        const timer = setTimeout(() => {
            // Set loading to false after 2 seconds (simulate fetch)
            setIsLoading(false); 
        }, 2000);
// Cleanup timer
        return () => clearTimeout(timer); 
    }, []);

    // Show loader while isLoading is true
    if (isLoading) {
        return <Loader />;
    }

    return (
        <div>
            {/* Cover Container for Main Contents */}
            <div className="top-section">
                <div className="top-left">
                    <h1>About Us</h1>
                </div>
                <div className="top-right">
                    <h3>Your Trusted Partner in Logistics and Courier Services</h3>
                    <label className='top-p'>
                        At our core, we are dedicated to providing reliable, efficient, and secure logistics solutions tailored to meet your needs. Whether it's shipping, warehousing, or online tracking, we've got you covered.
                    </label>
                </div>
            </div>

            <div className='cover'>
                {/* About Us Content */}
                <div className="home-container">
                    {/* Image at the left section */}
                    <div className="left-section">
                        <img src={bookMe} alt="About Us" className="flight-image" />
                    </div>

                    {/* About Us Details */}
                    <div className="left-section">
                        <h1>Our Services</h1>
                        <div className="about-content">
                            <h2>Warehouse Services</h2>
                            <p>
                                We offer state-of-the-art warehousing solutions to ensure your goods are stored safely and efficiently. Our facilities are equipped with advanced security systems and climate control to meet your specific requirements.
                            </p>

                            <h2>24/7 Support</h2>
                            <p>
                                Our dedicated support team is available around the clock to assist you with any queries or issues. Whether it's tracking your shipment or resolving a concern, we're here to help.
                            </p>

                            <h2>Online Tracking</h2>
                            <p>
                                With our advanced online tracking system, you can monitor your shipments in real-time. Stay updated on the status of your package from pickup to delivery.
                            </p>

                            <h2>Insurance</h2>
                            <p>
                                We provide comprehensive insurance options to protect your goods during transit. Rest assured that your shipments are covered against any unforeseen events.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Information */}
            <div className='why-us'>
                <h1>Contact Us</h1>
                <div className="features-section">
                    <div className="feature-box">
                        <div className="contact-info">
                            <MdEmail className="contact-icon" />
                            <h3>Email Address</h3>
                            <p>support@couriercompany.com</p>
                        </div>
                    </div>
                    <div className="feature-box">
                        <div className="contact-info">
                            <MdLocationOn className="contact-icon" />
                            <h3>Warehouse Address</h3>
                            <p>123 Logistics Street, Suite 456, Cityville, Country</p>
                        </div>
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

export default About;