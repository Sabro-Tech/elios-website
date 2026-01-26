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

    // Auto-toggle between Geyser and AC every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveMode(prev => prev === 'geyser' ? 'ac' : 'geyser');
        }, 5000);
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
        <section className="w-full bg-[#c1d4ff] py-20 overflow-hidden">
            <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-12 md:gap-20">

                {/* Feature 1: Image Left, Text Right */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="w-full md:w-1/2 flex justify-center md:justify-start" key={`img1-${activeMode}`}>
                        <img
                            src={currentData.feature1.image}
                            alt={currentData.feature1.title}
                            className="h-[350px] md:h-[500px] w-auto object-contain animate-slide-in-left"
                        />
                    </div>
                    <div className="w-full md:w-1/2 text-center md:text-left" key={`txt1-${activeMode}`}>
                        <div className="animate-slide-in-right">
                            <span className="font-montserrat text-[#192A5E] font-black uppercase tracking-widest text-base md:text-lg mb-2 block">
                                {currentData.feature1.label}
                            </span>
                            <h3 className="font-montserrat text-[#192A5E] font-black text-4xl md:text-5xl uppercase mb-4">
                                {currentData.feature1.title}
                            </h3>
                            <p className="font-montserrat text-[#192A5E] text-2xl md:text-3xl font-light">
                                {currentData.feature1.subtitle}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Feature 2: Text Left, Image Right */}
                <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4">
                    <div className="w-full md:w-1/2 text-center md:text-right" key={`txt2-${activeMode}`}>
                        <div className="animate-slide-in-left">
                            <span className="font-montserrat text-[#192A5E] font-black uppercase tracking-widest text-base md:text-lg mb-2 block">
                                {currentData.feature2.label}
                            </span>
                            <h3 className="font-montserrat text-[#192A5E] font-black text-4xl md:text-5xl uppercase mb-4">
                                {currentData.feature2.title}
                            </h3>
                            <p className="font-montserrat text-[#192A5E] text-2xl md:text-3xl font-light">
                                {currentData.feature2.subtitle}
                            </p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 flex justify-center md:justify-end" key={`img2-${activeMode}`}>
                        <img
                            src={currentData.feature2.image}
                            alt={currentData.feature2.title}
                            className="h-[350px] md:h-[500px] w-auto object-contain animate-slide-in-right"
                        />
                    </div>
                </div>

                {/* Feature 3: Image Left, Text Right */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="w-full md:w-1/2 flex justify-center md:justify-start" key={`img3-${activeMode}`}>
                        <img
                            src={currentData.feature3.image}
                            alt={currentData.feature3.title}
                            className="h-[350px] md:h-[500px] w-auto object-contain animate-slide-in-left"
                        />
                    </div>
                    <div className="w-full md:w-1/2 text-center md:text-left" key={`txt3-${activeMode}`}>
                        <div className="animate-slide-in-right">
                            <span className="font-montserrat text-[#192A5E] font-black uppercase tracking-widest text-base md:text-lg mb-2 block">
                                {currentData.feature3.label}
                            </span>
                            <h3 className="font-montserrat text-[#192A5E] font-black text-4xl md:text-5xl uppercase mb-4">
                                {currentData.feature3.title}
                            </h3>
                            <p className="font-montserrat text-[#192A5E] text-2xl md:text-3xl font-light">
                                {currentData.feature3.subtitle}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Feature 4: Wifi (Static) - Text Left, Image Right */}
                <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4">
                    <div className="w-full md:w-1/2 text-center md:text-right">
                        {/* Static Label? User didn't specify, assuming similar style or omitted */}
                        <h3 className="font-montserrat text-[#192A5E] font-black text-4xl md:text-5xl uppercase mb-4">
                            Wireless Connectivity
                        </h3>
                        <p className="font-montserrat text-[#192A5E] text-2xl md:text-3xl font-light">
                            Seamless Control
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
                        {/* Feature 4 Image with Wifi Overlay */}
                        <div className="relative inline-block">
                            <img
                                src={feature4}
                                alt="Wireless Connectivity"
                                className="h-[350px] md:h-[500px] w-auto object-contain"
                            />
                            {/* Centered Wifi Overlay */}
                            <img
                                src={wifiIcon}
                                alt="Wifi"
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[75%] h-auto object-contain drop-shadow-lg"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
