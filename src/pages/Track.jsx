import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';
import train from '../assets/icon_train.png';
import truck from '../assets/icon_truck.png';
import ship from '../assets/icon_ship.png';
import flight from '../assets/icon_new_2.png';
import Loader from '../components/Loader';


const Track = () => {
    const [trackingCode, setTrackingCode] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0)
    const reasons = [
        {
            id: 1,
            icon: "clock",
            title: "Fast Delivery",
            description: "We prioritize speed without compromising safety for all your shipments.",
        },
        {
            id: 2,
            icon: "shield",
            title: "Secure Handling",
            description: "Your packages are handled with utmost care and security throughout transit.",
        },
        {
            id: 3,
            icon: "globe",
            title: "Global Coverage",
            description: "Our extensive network ensures delivery to virtually any destination worldwide.",
        },
        {
            id: 4,
            icon: "dollar",
            title: "Competitive Pricing",
            description: "We offer the best rates in the industry without compromising on service quality.",
        },
        {
            id: 5,
            icon: "headset",
            title: "24/7 Support",
            description: "Our customer service team is available round the clock to assist you.",
        },
    ]
    const images = ["/images/hero-0.jpeg", "/images/hero-6.jpg", "/images/hero.webp"]

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length)
        }, 5000)

        // Add scroll event listener to change header background
        const handleScroll = () => {
            const header = document.querySelector(".header")
            if (header) {
                if (window.scrollY > 50) {
                    header.classList.add("scrolled")
                } else {
                    header.classList.remove("scrolled")
                }
            }
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            clearInterval(interval)
            window.removeEventListener("scroll", handleScroll)
        }
    }, [images.length])

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
        navigate(`/track-shipment?code=${trackingCode}`);
    };

    // Show loader while isLoading is true
    if (isLoading) {
        return <Loader />;
    }

    return (
        <div>
            {/* Cover Container for Main Contents */}
            <section id="home" className="hero-section">
                <div className="carousel">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`carousel-slide ${index === currentSlide ? "active" : ""}`}
                            style={{ backgroundImage: `url(${image})` }}
                        />
                    ))}
                </div>
                <div className="hero-content">
                    <strong>Tracking, Track Parcels, Packages, Shipments
                    </strong>
                    <h1>Fast & Reliable Shipping Solutions</h1>
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
                            Track Package
                        </button>
                    </form>
                </div>
            </section>
            <div className='why-us'>
                <strong>WORLDWIDE FREIGHT FORWARDING AND LOGISTICS SERVICES</strong>
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

            <section id="why-us" className="why-choose-us">
                <div className="container why-us">
                    <strong className='section-description'>WHY CHOOSE US</strong>
                    <h2>THE MAIN FEATURES</h2>
                    <p className="section-description">
                        We stand out from the competition with our commitment to excellence, reliability, and customer satisfaction.
                        <br />
                        100% COMMITTED TO BRINGING IN AND DEVELOPING TALENT ACROSS ALL LEVELS OF THE ORGANISATION.
                    </p>

                    <div className="content-container">
                        <div className="reasons-container">
                            {reasons.map((reason) => (
                                <div key={reason.id} className="reason-item">
                                    <div className="reason-content">
                                        <h3>{reason.title}</h3>
                                        <p>{reason.description}</p>
                                    </div>
                                    <div className="reason-icon">
                                        {reason.icon === "clock" && (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <polyline points="12 6 12 12 16 14"></polyline>
                                            </svg>
                                        )}
                                        {reason.icon === "shield" && (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                            </svg>
                                        )}
                                        {reason.icon === "globe" && (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <line x1="2" y1="12" x2="22" y2="12"></line>
                                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                                            </svg>
                                        )}
                                        {reason.icon === "dollar" && (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <line x1="12" y1="1" x2="12" y2="23"></line>
                                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                            </svg>
                                        )}
                                        {reason.icon === "headset" && (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                                                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                                            </svg>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="image-container">
                            <img src="/images/logistic.png" alt="Logistics Center" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Track;