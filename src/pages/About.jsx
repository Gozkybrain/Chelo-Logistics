import React, { useState, useEffect } from 'react';
import '../styles/home.css'; 
import train from '../assets/icon_train.png';
import truck from '../assets/icon_truck.png';
import ship from '../assets/icon_ship.png';
import flight from '../assets/icon_new_2.png';
import Loader from '../components/Loader';
import { MdEmail, MdLocationOn, MdPhoneAndroid } from 'react-icons/md';

const About = () => {
    const bookMe = '/images/hero-2.jpeg';
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
        <div className=''>
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
                            <h3>Warehouse Services</h3>
                            <p>
                                We offer state-of-the-art warehousing solutions to ensure your goods are stored safely and efficiently.
                            </p>

                            <h3>24/7 Support</h3>
                            <p>
                                Our dedicated support team is available around the clock to assist you with any queries or issues.
                            </p>

                            <h3>Online Tracking</h3>
                            <p>
                                With our advanced online tracking system, you can monitor your shipments in real-time.
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
                            <p>info@chelologistics.com</p>
                        </div>
                    </div>
                    <div className="feature-box">
                        <div className="contact-info">
                            <MdPhoneAndroid className="contact-icon" />
                            <h3>Contact Number</h3>
                            <p>+1 (810) 219-1347</p>
                        </div>
                    </div>
                    <div className="feature-box">
                        <div className="contact-info">
                            <MdLocationOn className="contact-icon" />
                            <h3>Warehouse Address</h3>
                            <p>Grand Rapids, MI, United States</p>
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

            <section id="about" className="middle-section">
                <div className="container">
                    <h2>Our Global Network</h2>
                    <p className="section-description">
                        With our extensive global network, we provide seamless shipping solutions across continents, ensuring your
                        packages arrive safely and on time, no matter the destination.
                    </p>

                    <div className="boxes-container">
                        <div className="side-box left">
                            <div>
                                <h3>111,380</h3>
                                <p>
                                    Satisfied Customers
                                </p>
                            </div>
                            <div>
                                <h3>1,763</h3>
                                <p>
                                    Workers in team
                                </p>
                            </div>
                            <div>
                                <h3>77</h3>
                                <p>
                                    Awards Won
                                </p>
                            </div>
                        </div>

                        <div className="middle-box">
                            <img src="/images/truck-bg.png" alt="Global Shipping" />
                        </div>

                        <div className="side-box right">
                            <div>
                                <h3>568</h3>
                                <p>
                                    Vehicles owned
                                </p>
                            </div>
                            <div>
                                <h3>1,207</h3>
                                <p>
                                    Secure Warehouse
                                </p>
                            </div>
                            <div>
                                <h3>1,000,000+</h3>
                                <p>
                                    Items Delivered
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;