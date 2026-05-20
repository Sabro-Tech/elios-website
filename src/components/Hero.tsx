
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import videoBg from '../assets/white waves-background-hero.mp4';
import geyserImg from '../assets/Geyser-transparent-hero.png';
import acImg from '../assets/ac-nobg-hero.png';
import flower1tImg from '../assets/1ton-flower-nobg-hero.png';
import grey1tImg from '../assets/1ton-grey-nobg-hero.png';
import black15tImg from '../assets/1_5ton-black-nobg-hero.png';
import silver15tImg from '../assets/1_5ton-silver-nobg-hero.png';
import white15tImg from '../assets/1_5ton-white-nobg-hero.png';

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const slides = [
        {
            id: 1,
            title: "ELIOS DIGITAL INVERTER",
            subtitle: "The Future of Air Conditioning is Here!",
            image: acImg,
            alt: "Elios Digital Inverter AC",
        },
        {
            id: 2,
            title: "ELIOS BLOSSOM EDITION",
            subtitle: "Smart Cooling | Beautifully Crafted",
            image: flower1tImg,
            alt: "Elios 1 Ton Flower Inverter AC",
        },
        {
            id: 3,
            title: "ELIOS MINIMA GREY",
            subtitle: "Seamless Integration | Precision Cooling",
            image: grey1tImg,
            alt: "Elios 1 Ton Grey Inverter AC",
        },
        {
            id: 4,
            title: "ELIOS NOIR PRO",
            subtitle: "Premium Matte Black | Smart Inverter",
            image: black15tImg,
            alt: "Elios 1.5 Ton Black Inverter AC",
        },
        {
            id: 5,
            title: "ELIOS APEX SILVER",
            subtitle: "Elegant Finish | Smart Inverter",
            image: silver15tImg,
            alt: "Elios 1.5 Ton Silver Inverter AC",
        },
        {
            id: 6,
            title: "ELIOS ALPINE WHITE",
            subtitle: "Clean Lines | Maximum Efficiency",
            image: white15tImg,
            alt: "Elios 1.5 Ton White Inverter AC",
        },
        {
            id: 7,
            title: "AIR SOURCE WATER GEYSER",
            subtitle: "Smart | Efficient | Digital Control",
            image: geyserImg,
            alt: "Air Source Water Geyser",
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 6000);
        return () => clearInterval(interval);
    }, [currentSlide]);

    const handleSlideChange = (newSlide: number) => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentSlide(newSlide);
        setTimeout(() => setIsAnimating(false), 700);
    };

    const nextSlide = () => {
        handleSlideChange(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
    };

    const prevSlide = () => {
        handleSlideChange(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
    };

    return (
        <section className="relative w-full h-[calc(110vh-110px)] overflow-hidden bg-brand-blue">
            {/* Video Background Layer */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src={videoBg} type="video/mp4" />
                </video>
                {/* Gradient Overlay for contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/40 to-transparent"></div>
            </div>

            {/* Content Layer */}
            <div className="relative z-10 w-full h-full flex items-center justify-between px-6 lg:px-24 max-w-[1600px] mx-auto">

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    disabled={isAnimating}
                    className="absolute left-6 z-20 w-12 h-12 flex items-center justify-center text-brand-blue bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/40 hover:scale-110 transition-all disabled:opacity-50 hidden md:flex cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>

                <button
                    onClick={nextSlide}
                    disabled={isAnimating}
                    className="absolute right-6 z-20 w-12 h-12 flex items-center justify-center text-brand-blue bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/40 hover:scale-110 transition-all disabled:opacity-50 hidden md:flex cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>

                {/* Slides */}
                <div className="w-full h-full relative">
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`absolute inset-0 w-full h-full flex flex-col md:flex-row items-center justify-center md:justify-between gap-12 transition-all duration-700 ease-in-out ${index === currentSlide
                                ? 'opacity-100 translate-x-0'
                                : index < currentSlide ? 'opacity-0 -translate-x-full' : 'opacity-0 translate-x-full'
                                }`}
                        >
                            {/* Text Section (Left) */}
                            <div className="w-full md:w-[55%] flex flex-col items-center md:items-start text-center md:text-left pt-10 md:pt-0">
                                <div className={`transition-all duration-700 delay-300 transform ${index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                                    <h1
                                        className="font-montserrat text-[42px] md:text-[60px] lg:text-[72px] font-black text-[#192A5E] leading-[1.1] mb-6 uppercase tracking-tight"
                                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                                    >
                                        {slide.title.split(' ').map((word, i) => (
                                            <span key={i} className={i === 0 ? 'block' : 'inline'}>{word} </span>
                                        ))}
                                    </h1>
                                    <div className="h-1.5 w-24 bg-brand-blue mb-8 hidden md:block rounded-full"></div>
                                    <h2
                                        className="font-montserrat text-[22px] md:text-[28px] text-gray-600 font-medium mb-12 uppercase tracking-[0.2em]"
                                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                                    >
                                        {slide.subtitle}
                                    </h2>
                                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                        <Link
                                            to="/products"
                                            className="bg-brand-blue text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-brand-blue-dark transition-all shadow-xl hover:-translate-y-1 active:translate-y-0 animate-pulse hover:animate-none"
                                        >
                                            EXPLORE PRODUCTS
                                        </Link>
                                        <Link
                                            to="/support"
                                            className="bg-white/40 backdrop-blur-md text-brand-blue border-2 border-brand-blue/20 px-10 py-4 rounded-full font-bold text-lg hover:bg-white transition-all"
                                        >
                                            SUPPORT
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Image Section (Right) */}
                            <div className={`w-full md:w-[40%] flex justify-center md:justify-end transition-all duration-1000 delay-500 transform ${index === currentSlide ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-90 rotate-3'
                                }`}>
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-brand-blue/10 blur-[80px] rounded-full group-hover:bg-brand-blue/20 transition-all"></div>
                                    <img
                                        src={slide.image}
                                        alt={slide.alt}
                                        className="relative z-10 max-w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] animate-float"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Progress Bars */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => handleSlideChange(i)}
                        className={`transition-all duration-300 h-1.5 rounded-full ${i === currentSlide ? 'w-12 bg-brand-blue' : 'w-3 bg-gray-300 hover:bg-gray-400'}`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
