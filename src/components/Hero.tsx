
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import videoBg from '../assets/white waves-background-hero.mp4';
import geyserImg from '../assets/Geyser-transparent-hero.png';
import acImg from '../assets/ac-nobg-hero.png';

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            id: 1,
            title: "AIR SOURCE WATER GEYSER",
            subtitle: "Smart | Efficient | Digital Control",
            image: geyserImg,
            alt: "Air Source Water Geyser",
        },
        {
            id: 2,
            title: "ELIOS DIGITAL INVERTER",
            subtitle: "The Future of Air Conditioning is Here!",
            image: acImg,
            alt: "Elios Digital Inverter AC",
        }
    ];

    // Auto-slide every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    return (
        <section className="relative w-full h-[calc(105vh-110px)] overflow-hidden">
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            >
                <source src={videoBg} type="video/mp4" />
            </video>

            {/* Overlay Content */}
            <div className="relative z-10 w-full h-full flex items-center justify-between px-4 lg:px-20 max-w-[1400px] mx-auto">
                {/* Navigation Buttons (Absolute Positioned on edges) */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 z-20 p-2 text-brand-blue hover:bg-white/20 rounded-full transition-colors hidden md:block"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute right-4 z-20 p-2 text-brand-blue hover:bg-white/20 rounded-full transition-colors hidden md:block"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>

                {/* Slides Container */}
                <div className="w-full h-full relative">
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`absolute inset-0 w-full h-full flex flex-col md:flex-row items-center justify-center gap-12 md:gap-30 transition-opacity duration-700 ease-in-out ${index === currentSlide ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                                }`}
                        >
                            {/* Text Section (Left) */}
                            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left pl-0 md:pl-20 mb-8 md:mb-0">
                                <h1
                                    className="font-montserrat text-[40px] md:text-[52px] font-black text-[#192A5E] leading-tight mb-4 uppercase tracking-wide"
                                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                                >
                                    {slide.title}
                                </h1>
                                <h2
                                    className="font-montserrat text-[20px] md:text-[30px] text-[#192A5E] font-light mb-8 uppercase"
                                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                                >
                                    {slide.subtitle}
                                </h2>
                            </div>

                            {/* Image Section (Right) */}
                            <div className="w-full md:w-1/2 flex justify-center md:justify-end pr-0 md:pr-20">
                                <img
                                    src={slide.image}
                                    alt={slide.alt}
                                    className={`max-w-[400px] md:max-w-[600px] lg:max-w-[700px] h-auto object-contain drop-shadow-xl transition-transform duration-700 ${index === currentSlide ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                                        }`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
