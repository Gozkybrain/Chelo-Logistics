import { useState, useEffect } from "react"
import "../styles/HeroSection.css"
import { Link } from 'react-router-dom';


const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0)

    const images = ["/images/hero-1.jpeg", "/images/hero-4.jpeg", "/images/hero-5.jpeg"]

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

    return (
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
                <strong>We provide the highest quality courier services</strong>
                <h1>Fast & Reliable Shipping Solutions</h1>
                <p>Delivering your packages safely and on time across the globe with our premium courier services.</p>
                <div className="cta-container">
                    <Link to="/about-us" className="cta-box">
                        <>About Us</>
                    </Link>
                    <Link to="/track-package" className="cta-box">
                        <>Track a Package</>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
