import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import flyMe from "../assets/fly-me.png";
import "../styles/Header.css";
import { auth } from '../lib/firebase';
import { onAuthStateChanged, signOut } from "firebase/auth";

const menuVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0, transition: { type: "tween", duration: 0.3 } },
};

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [user, setUser] = useState(null);
    const location = useLocation();

    // Authentication state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // Scroll handler to toggle .scrolled class
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Logout handler
    const handleLogout = async () => {
        try {
            await signOut(auth);
            setIsDropdownOpen(false);
            setIsOpen(false);
        } catch (error) {
            console.error("Error logging out:", error.message);
        }
    };

    return (
        <div className="head-box">
            <header className={`header ${isScrolled ? "scrolled" : ""}`}>
                <div className="logoBox">
                    <Link to="/">
                        <img src={flyMe} alt="Logo" className="logo" />
                    </Link>
                </div>

                <nav className="nav-links">
                    <Link to="/about-us" className={location.pathname === "/about-us" ? "active-link" : ""}>About Us</Link>
                    <Link to="/track-package" className={location.pathname === "/track-package" ? "active-link" : ""}>Track a Package</Link>
                    <Link to="/track-flight" className={location.pathname === "/track-flight" ? "active-link" : ""}>Track a Ticket</Link>
                    <Link
                        className="dropdown"
                        onMouseEnter={() => setIsDropdownOpen(true)}
                        onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                        <div className="dropdown-btn">Bookings</div>
                        {isDropdownOpen && (
                            <div className="dropdown-content">
                                <div className="dropdown-box">
                                    <h4>Shipments</h4>
                                    <Link to="/add-package" onClick={() => setIsDropdownOpen(false)}>Add Shipment</Link>
                                    <Link to="/all-packages" onClick={() => setIsDropdownOpen(false)}>All Shipments</Link>
                                </div>
                                <div className="dropdown-box">
                                    <h4>Tickets</h4>
                                    <Link to="/add-ticket" onClick={() => setIsDropdownOpen(false)}>Add Ticket</Link>
                                    <Link to="/all-tickets" onClick={() => setIsDropdownOpen(false)}>All Tickets</Link>
                                </div>
                                {user && (
                                    <button className="logout-btn" onClick={handleLogout}>
                                        Logout
                                    </button>
                                )}
                            </div>
                        )}
                    </Link>
                </nav>

                <div className="menu-btn" onClick={() => setIsOpen(true)}>
                    <FaBars size={24} />
                </div>

                {isOpen && <div className="overlay show" onClick={() => setIsOpen(false)}></div>}

                <motion.nav
                    initial="hidden"
                    animate={isOpen ? "visible" : "hidden"}
                    variants={menuVariants}
                    className="mobile-menu"
                >
                    <div className="mobImg">
                        <Link to="/" onClick={() => setIsOpen(false)}>
                            <img src={flyMe} alt="mobLogo" className="mobLogo" />
                        </Link>
                    </div>

                    <div className="close-btn" onClick={() => setIsOpen(false)}>
                        <FaTimes size={24} />
                    </div>

                    <Link to="/about-us" onClick={() => setIsOpen(false)}>About Us</Link>
                    <Link to="/track-package" onClick={() => setIsOpen(false)}>Track a Package</Link>
                    <Link to="/track-flight" onClick={() => setIsOpen(false)}>Track a Ticket</Link>

                    <div className="mobile-dropdown">
                        <strong>Bookings</strong>
                        <ul className="nested-menu">
                            <li><Link to="/add-package" onClick={() => setIsOpen(false)}>Add Shipment</Link></li>
                            <li><Link to="/all-packages" onClick={() => setIsOpen(false)}>All Shipments</Link></li>
                            <li><Link to="/add-ticket" onClick={() => setIsOpen(false)}>Add Ticket</Link></li>
                            <li><Link to="/all-tickets" onClick={() => setIsOpen(false)}>All Tickets</Link></li>
                        </ul>
                    </div>

                    {user && (
                        <button className="logout-btn" onClick={handleLogout}>
                            Logout
                        </button>
                    )}
                </motion.nav>
            </header>
        </div>
    );
};

export default Header;
