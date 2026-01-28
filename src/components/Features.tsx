import { useState, useEffect } from 'react';
import feature1Geyser from '../assets/feature1-geyser.png';
import feature1Ac from '../assets/feature1-ac.png';
import feature2Geyser from '../assets/feature2-geyser.png';
import feature2Ac from '../assets/feature2-ac.png';
import feature3Geyser from '../assets/feature3-geyser.png';
import feature3Ac from '../assets/feature3-ac.png';
import feature4 from '../assets/feature4.png';
import wifiIcon from '../assets/wifi.png';

export default function Features() {
    const [activeMode, setActiveMode] = useState<'geyser' | 'ac'>('geyser');

    // Auto-toggle between Geyser and AC every 10 seconds for better readability
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveMode(prev => prev === 'geyser' ? 'ac' : 'geyser');
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    const data = {
        geyser: {
            feature1: {
                label: "Geyser",
                title: "Main Screen",
                subtitle: "Simplified Control",
                image: feature1Geyser
            },
            feature2: {
                label: "Geyser",
                title: "Smart Heating Cycles",
                subtitle: "Cost Efficient Functionality",
                image: feature2Geyser
            },
            feature3: {
                label: "Geyser",
                title: "Real-Time Dashboard",
                subtitle: "Precision at Your Fingertips",
                image: feature3Geyser
            }
        },
        ac: {
            feature1: {
                label: "AC",
                title: "Main Screen",
                subtitle: "Smart Price Control",
                image: feature1Ac
            },
            feature2: {
                label: "AC",
                title: "Price Mode",
                subtitle: "Cost Efficient Functionality",
                image: feature2Ac
            },
            feature3: {
                label: "AC",
                title: "Real-Time Dashboard",
                subtitle: "Precision at Your Fingertips",
                image: feature3Ac
            }
        }
    };

    const currentData = data[activeMode];

    return (
        <section id="features" className="w-full bg-[#f1f5f9] py-32 overflow-hidden">
            <div className="max-w-[1300px] mx-auto px-6 flex flex-col gap-24">

                {/* Header */}
                <div className="text-center mb-10">
                    <h2 className="font-heading font-black text-[42px] md:text-[56px] text-brand-blue uppercase mb-4">
                        Elite Features
                    </h2>
                    <div className="flex justify-center gap-4 mb-8">
                        <button
                            onClick={() => setActiveMode('geyser')}
                            className={`px-8 py-2 rounded-full font-bold transition-all ${activeMode === 'geyser' ? 'bg-brand-blue text-white shadow-lg' : 'bg-white text-gray-400 hover:text-brand-blue'}`}
                        >
                            GEYSER
                        </button>
                        <button
                            onClick={() => setActiveMode('ac')}
                            className={`px-8 py-2 rounded-full font-bold transition-all ${activeMode === 'ac' ? 'bg-brand-blue text-white shadow-lg' : 'bg-white text-gray-400 hover:text-brand-blue'}`}
                        >
                            AC
                        </button>
                    </div>
                </div>

                {/* Feature 1: Image Left, Text Right */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-12 group">
                    <div className="w-full md:w-[50%] flex justify-center md:justify-start relative" key={`img1-${activeMode}`}>
                        <div className="absolute inset-0 bg-brand-blue/5 rounded-3xl -rotate-2 transform group-hover:rotate-0 transition-transform duration-500"></div>
                        <img
                            src={currentData.feature1.image}
                            alt={currentData.feature1.title}
                            className="relative z-10 h-[400px] md:h-[550px] w-auto object-contain animate-slide-in-left shadow-2xl rounded-3xl"
                        />
                    </div>
                    <div className="w-full md:w-[45%] text-center md:text-left" key={`txt1-${activeMode}`}>
                        <div className="animate-slide-in-right">
                            <span className="font-montserrat text-brand-blue font-bold uppercase tracking-[0.3em] text-sm mb-4 block">
                                FEATURE 01 — {currentData.feature1.label}
                            </span>
                            <h3 className="font-montserrat text-[#192A5E] font-black text-4xl md:text-5xl lg:text-6xl uppercase mb-6 leading-tight">
                                {currentData.feature1.title}
                            </h3>
                            <p className="font-montserrat text-gray-500 text-xl md:text-2xl font-medium leading-relaxed">
                                {currentData.feature1.subtitle}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Feature 2: Text Left, Image Right */}
                <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 group">
                    <div className="w-full md:w-[45%] text-center md:text-right" key={`txt2-${activeMode}`}>
                        <div className="animate-slide-in-left">
                            <span className="font-montserrat text-brand-blue font-bold uppercase tracking-[0.3em] text-sm mb-4 block">
                                FEATURE 02 — {currentData.feature2.label}
                            </span>
                            <h3 className="font-montserrat text-[#192A5E] font-black text-4xl md:text-5xl lg:text-6xl uppercase mb-6 leading-tight">
                                {currentData.feature2.title}
                            </h3>
                            <p className="font-montserrat text-gray-500 text-xl md:text-2xl font-medium leading-relaxed">
                                {currentData.feature2.subtitle}
                            </p>
                        </div>
                    </div>
                    <div className="w-full md:w-[50%] flex justify-center md:justify-end relative" key={`img2-${activeMode}`}>
                        <div className="absolute inset-0 bg-brand-blue/5 rounded-3xl rotate-2 transform group-hover:rotate-0 transition-transform duration-500"></div>
                        <img
                            src={currentData.feature2.image}
                            alt={currentData.feature2.title}
                            className="relative z-10 h-[400px] md:h-[550px] w-auto object-contain animate-slide-in-right shadow-2xl rounded-3xl"
                        />
                    </div>
                </div>

                {/* Feature 3: Image Left, Text Right */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-12 group">
                    <div className="w-full md:w-[50%] flex justify-center md:justify-start relative" key={`img3-${activeMode}`}>
                        <div className="absolute inset-0 bg-brand-blue/5 rounded-3xl -rotate-2 transform group-hover:rotate-0 transition-transform duration-500"></div>
                        <img
                            src={currentData.feature3.image}
                            alt={currentData.feature3.title}
                            className="relative z-10 h-[400px] md:h-[550px] w-auto object-contain animate-slide-in-left shadow-2xl rounded-3xl"
                        />
                    </div>
                    <div className="w-full md:w-[45%] text-center md:text-left" key={`txt3-${activeMode}`}>
                        <div className="animate-slide-in-right">
                            <span className="font-montserrat text-brand-blue font-bold uppercase tracking-[0.3em] text-sm mb-4 block">
                                FEATURE 03 — {currentData.feature3.label}
                            </span>
                            <h3 className="font-montserrat text-[#192A5E] font-black text-4xl md:text-5xl lg:text-6xl uppercase mb-6 leading-tight">
                                {currentData.feature3.title}
                            </h3>
                            <p className="font-montserrat text-gray-500 text-xl md:text-2xl font-medium leading-relaxed">
                                {currentData.feature3.subtitle}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Feature 4: Wifi (Static) */}
                <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 group bg-brand-blue rounded-[3rem] p-12 md:p-20 shadow-premium relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="w-full md:w-[45%] text-center md:text-left relative z-10">
                        <span className="font-montserrat text-white/60 font-bold uppercase tracking-[0.3em] text-sm mb-4 block">
                            ADVANCED CONNECTIVITY
                        </span>
                        <h3 className="font-montserrat text-white font-black text-4xl md:text-5xl lg:text-6xl uppercase mb-6 leading-tight">
                            Wireless Connectivity
                        </h3>
                        <p className="font-montserrat text-white/80 text-xl md:text-2xl font-light leading-relaxed mb-8">
                            Seamless control from the palm of your hand. Experience the future of home automation.
                        </p>
                        <a
                            href="https://play.google.com/store/apps/details?id=com.sabro.accontroller&pcampaignid=web_share"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-4 text-white font-bold border-b-2 border-white/20 pb-2 hover:gap-6 transition-all cursor-pointer"
                        >
                            Learn About Elios App
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </a>
                    </div>
                    <div className="w-full md:w-[50%] flex justify-center md:justify-end relative z-10">
                        <div className="relative inline-block hover:scale-105 transition-transform duration-500">
                            <img
                                src={feature4}
                                alt="Wireless Connectivity"
                                className="h-[350px] md:h-[500px] w-auto object-contain drop-shadow-2xl"
                            />
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[85%] h-full flex items-center justify-center">
                                <img
                                    src={wifiIcon}
                                    alt="Wifi"
                                    className="w-[70%] h-auto object-contain animate-float drop-shadow-glow"
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
