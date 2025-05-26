import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/home.css';
import '../styles/HomePage.css';
import train from '../assets/icon_train.png';
import truck from '../assets/icon_truck.png';
import ship from '../assets/icon_ship.png';
import flight from '../assets/icon_new_2.png';
import Loader from '../components/Loader';
import HeroSection from '../components/HeroSection';


const Home = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
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

    const blogPosts = [
        {
            id: 1,
            title: "Top 5 Challenges of Shipping Goods Internationally",
            image: "/images/hero-6.jpg",
            snippet:
                "International shipping sounds simple, but delays, damaged goods, and poor documentation can make it stressful. Common issues include customs clearance problems, incorrect paperwork, high freight costs, and lack of tracking. Many businesses lose money due to poor planning or unreliable freight partners. This article highlights five major challenges you may face when shipping goods across borders, and how to deal with each one. With the right knowledge and preparation, you can avoid unnecessary costs, reduce risk, and ensure your shipments arrive on time. Whether you ship occasionally or regularly, this guide will help you navigate the process with confidence.",
            link: "/about-us",
        },
        {
            id: 2,
            title: "Why Real-Time Shipment Tracking Matters in Today’s Logistics",
            image: "/images/hero-7.jpg",
            snippet:
                "In today’s fast-paced logistics environment, real-time shipment tracking is essential. It allows businesses to monitor their cargo every step of the way — from pickup to final delivery — and helps prevent delays, losses, or miscommunication. Tracking systems offer visibility into a shipment’s location, estimated arrival, and handling status. This kind of transparency is key to building trust with partners and customers alike. Whether you manage high-value freight or time-sensitive deliveries, real-time tracking improves planning, communication, and overall service quality. In this article, we explore why live shipment data is no longer optional — it's a competitive advantage.",
            link: "/about-us",
        },
        {
            id: 3,
            title: "What to Know Before Importing Goods Across Borders",
            image: "/images/hero-2.jpeg",
            snippet:
                "Importing goods internationally requires more than placing an order and arranging transport. It involves understanding trade regulations, submitting the right documents, and preparing for customs inspections. Mistakes in paperwork or misclassified items can lead to delays, penalties, or cargo being held. This article outlines the key steps importers should take before bringing in goods — including handling commercial invoices, certificates of origin, and import duties. Whether you’re importing machinery, electronics, or consumer goods, being prepared helps reduce risk and avoid unnecessary costs. Learn how to set up a smooth, compliant import process that keeps your business moving efficiently.",
            link: "/about-us",
        },
    ]


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
            <HeroSection />
            <div className='why-us'>
                <strong>WORLDWIDE FREIGHT FORWARDING AND LOGISTICS SERVICES</strong>
                <h1>Our Business Mission
                    is Client’s Satisfaction</h1>
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


            {/* leave for later */}
            <div className="top-section">
                <div className="top-left">
                    <h1>#1 Leading Courier Delivery and Logistics Company</h1>
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

            <section className="blog-section">
                <div className="container">
                    <h2>Latest from Our Blog</h2>
                    <p className="section-description">
                        Stay updated with the latest news, insights, and trends in the shipping and logistics industry.
                    </p>

                    <div className="blog-container">
                        {blogPosts.map((post) => (
                            <div key={post.id} className="blog-card">
                                <div className="blog-image">
                                    <img src={post.image || "/placeholder.svg"} alt={post.title} />
                                </div>
                                <div className="blog-content">
                                    <h3 className="blog-title">{post.title}</h3>
                                    <p className="blog-snippet">{post.snippet}</p>
                                    <a href={post.link} className="read-more">
                                        Read More
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="view-all-container">
                        <Link to="/about-us" className="view-all-button">
                            More About Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;