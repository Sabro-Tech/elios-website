import { useState, useEffect } from 'react';
import flower1tImg from '../assets/1ton-flower-nobg-hero.png';
import grey1tImg from '../assets/1ton-grey-nobg-hero.png';
import black15tImg from '../assets/1_5ton-black-nobg-hero.png';
import silver15tImg from '../assets/1_5ton-silver-nobg-hero.png';
import white15tImg from '../assets/1_5ton-white-nobg-hero.png';

interface Dimensions {
    width: string;
    depth: string;
    height: string;
}

interface Product {
    id: string;
    name: string;
    category: '1' | '1.5';
    ton: string;
    color: string;
    colorClass: string;
    description: string;
    image: string;
    badge: string;
    specs: {
        outdoor: {
            capacity: string;
            type: string;
            coolingCapacity: string;
            heatingCapacity: string;
            compressorType: string;
            inverterType: string;
            powerInput: string;
            ratedCurrent: string;
            energyEfficiency: string;
            refrigerant: string;
            gasCharged: string;
            maxTempCooling: string;
            minTempHeating: string;
            dimensions: Dimensions;
            netWeight: string;
        };
        indoor: {
            airflow: string;
            airSwing: string;
            motorPower: string;
            dimensions: Dimensions;
            weight: string;
        };
        additional: {
            wifi: 'Yes' | 'No';
            app: 'Yes' | 'No';
            ecoMode: 'Yes' | 'No';
            pkrMode: 'Yes' | 'No';
        };
        warranty: {
            compressor: string;
            pcb: string;
            parts: string;
        };
    };
}

export default function Products() {
    const [selectedCategory, setSelectedCategory] = useState<'all' | '1' | '1.5'>('all');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [bookingProduct, setBookingProduct] = useState<Product | null>(null);
    const [activeModalTab, setActiveModalTab] = useState<'outdoor' | 'indoor' | 'additional'>('outdoor');
    const [isMobileDevice, setIsMobileDevice] = useState(false);

    // Detect device type on load
    useEffect(() => {
        const checkDevice = () => {
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            setIsMobileDevice(isMobile);
        };
        checkDevice();
        window.addEventListener('resize', checkDevice);
        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    const products: Product[] = [
        {
            id: "ac-1t-flower",
            name: "ELIOS BLOSSOM EDITION",
            category: "1",
            ton: "1.0 Ton",
            color: "Elegant Floral Art",
            colorClass: "bg-radial from-pink-100 to-pink-200 border border-pink-300 ring-2 ring-pink-100/50",
            description: "Unparalleled aesthetics meeting premium engineering. Featuring a luxury floral art panel to complement your premium living spaces.",
            image: flower1tImg,
            badge: "Designer Edition",
            specs: {
                outdoor: {
                    capacity: "1.0 Ton",
                    type: "DC Inverter",
                    coolingCapacity: "12,000 BTU",
                    heatingCapacity: "13,000 BTU",
                    compressorType: "Twin-Rotary",
                    inverterType: "T3",
                    powerInput: "960 W (Min: 440W, Max: 1320W)",
                    ratedCurrent: "2.0A - 6.0A",
                    energyEfficiency: "12.5 EER / 3.70 COP",
                    refrigerant: "R410A",
                    gasCharged: "0.8 Kg",
                    maxTempCooling: "50 °C",
                    minTempHeating: "0 °C",
                    dimensions: { width: "927", depth: "362", height: "508" },
                    netWeight: "40 Kg"
                },
                indoor: {
                    airflow: "638 m3/hr",
                    airSwing: "Yes (2D)",
                    motorPower: "20 W",
                    dimensions: { width: "800", depth: "203", height: "292" },
                    weight: "12 Kg"
                },
                additional: {
                    wifi: "Yes",
                    app: "Yes",
                    ecoMode: "Yes",
                    pkrMode: "Yes"
                },
                warranty: {
                    compressor: "10 Years",
                    pcb: "4 Years",
                    parts: "1 Year"
                }
            }
        },
        {
            id: "ac-1t-grey",
            name: "ELIOS MINIMA GREY",
            category: "1",
            ton: "1.0 Ton",
            color: "Metallic Grey",
            colorClass: "bg-gradient-to-br from-gray-400 to-gray-600 border border-gray-500 ring-2 ring-gray-300/50",
            description: "A sleek, modern aesthetic with a premium metallic grey finish. Built to deliver rapid cooling with extreme energy efficiency.",
            image: grey1tImg,
            badge: "Minima Edition",
            specs: {
                outdoor: {
                    capacity: "1.0 Ton",
                    type: "DC Inverter",
                    coolingCapacity: "12,000 BTU",
                    heatingCapacity: "13,000 BTU",
                    compressorType: "Twin-Rotary",
                    inverterType: "T3",
                    powerInput: "960 W (Min: 440W, Max: 1320W)",
                    ratedCurrent: "2.0A - 6.0A",
                    energyEfficiency: "12.5 EER / 3.70 COP",
                    refrigerant: "R410A",
                    gasCharged: "0.8 Kg",
                    maxTempCooling: "50 °C",
                    minTempHeating: "0 °C",
                    dimensions: { width: "927", depth: "362", height: "508" },
                    netWeight: "40 Kg"
                },
                indoor: {
                    airflow: "638 m3/hr",
                    airSwing: "Yes (2D)",
                    motorPower: "20 W",
                    dimensions: { width: "800", depth: "203", height: "292" },
                    weight: "12 Kg"
                },
                additional: {
                    wifi: "Yes",
                    app: "Yes",
                    ecoMode: "Yes",
                    pkrMode: "Yes"
                },
                warranty: {
                    compressor: "10 Years",
                    pcb: "4 Years",
                    parts: "1 Year"
                }
            }
        },
        {
            id: "ac-15t-black",
            name: "ELIOS NOIR PRO",
            category: "1.5",
            ton: "1.5 Ton",
            color: "Premium Matte Black",
            colorClass: "bg-gradient-to-br from-gray-800 to-black border border-gray-950 ring-2 ring-gray-900/50 shadow-[inset_0_2px_4px_rgba(255,255,255,0.15)]",
            description: "Make a bold statement with a luxury matte black finish. Designed for larger spaces requiring fast, dynamic temperature control.",
            image: black15tImg,
            badge: "Noir Pro Edition",
            specs: {
                outdoor: {
                    capacity: "1.5 Ton",
                    type: "DC Inverter",
                    coolingCapacity: "18,000 BTU",
                    heatingCapacity: "19,000 BTU",
                    compressorType: "Twin-Rotary",
                    inverterType: "T3",
                    powerInput: "1,428 W (Min: 440W, Max: 1980W)",
                    ratedCurrent: "2.0A - 9.0A",
                    energyEfficiency: "12.6 EER / 3.71 COP",
                    refrigerant: "R410A",
                    gasCharged: "1.20 Kg",
                    maxTempCooling: "50 °C",
                    minTempHeating: "0 °C",
                    dimensions: { width: "940", depth: "406", height: "609" },
                    netWeight: "50 Kg"
                },
                indoor: {
                    airflow: "850 m3/hr",
                    airSwing: "Yes (2D)",
                    motorPower: "58 W",
                    dimensions: { width: "990", depth: "203", height: "318" },
                    weight: "13.0 Kg"
                },
                additional: {
                    wifi: "Yes",
                    app: "Yes",
                    ecoMode: "Yes",
                    pkrMode: "Yes"
                },
                warranty: {
                    compressor: "10 Years",
                    pcb: "4 Years",
                    parts: "1 Year"
                }
            }
        },
        {
            id: "ac-15t-silver",
            name: "ELIOS APEX SILVER",
            category: "1.5",
            ton: "1.5 Ton",
            color: "Brushed Silver",
            colorClass: "bg-gradient-to-br from-gray-200 to-gray-400 border border-gray-400 ring-2 ring-gray-200/50",
            description: "Minimalist luxury at its finest. The brushed silver finish blends seamlessly with modern office and home decors.",
            image: silver15tImg,
            badge: "Apex Silver Edition",
            specs: {
                outdoor: {
                    capacity: "1.5 Ton",
                    type: "DC Inverter",
                    coolingCapacity: "18,000 BTU",
                    heatingCapacity: "19,000 BTU",
                    compressorType: "Twin-Rotary",
                    inverterType: "T3",
                    powerInput: "1,428 W (Min: 440W, Max: 1980W)",
                    ratedCurrent: "2.0A - 9.0A",
                    energyEfficiency: "12.6 EER / 3.71 COP",
                    refrigerant: "R410A",
                    gasCharged: "1.20 Kg",
                    maxTempCooling: "50 °C",
                    minTempHeating: "0 °C",
                    dimensions: { width: "940", depth: "406", height: "609" },
                    netWeight: "50 Kg"
                },
                indoor: {
                    airflow: "850 m3/hr",
                    airSwing: "Yes (2D)",
                    motorPower: "58 W",
                    dimensions: { width: "990", depth: "203", height: "318" },
                    weight: "13.0 Kg"
                },
                additional: {
                    wifi: "Yes",
                    app: "Yes",
                    ecoMode: "Yes",
                    pkrMode: "Yes"
                },
                warranty: {
                    compressor: "10 Years",
                    pcb: "4 Years",
                    parts: "1 Year"
                }
            }
        },
        {
            id: "ac-15t-white",
            name: "ELIOS ALPINE WHITE",
            category: "1.5",
            ton: "1.5 Ton",
            color: "High-Gloss White",
            colorClass: "bg-white border border-gray-300 ring-2 ring-gray-100",
            description: "The timeless classic with a high-gloss premium white finish. Delivering ultimate performance, energy efficiency, and smart operations.",
            image: white15tImg,
            badge: "Alpine Edition",
            specs: {
                outdoor: {
                    capacity: "1.5 Ton",
                    type: "DC Inverter",
                    coolingCapacity: "18,000 BTU",
                    heatingCapacity: "19,000 BTU",
                    compressorType: "Twin-Rotary",
                    inverterType: "T3",
                    powerInput: "1,428 W (Min: 440W, Max: 1980W)",
                    ratedCurrent: "2.0A - 9.0A",
                    energyEfficiency: "12.6 EER / 3.71 COP",
                    refrigerant: "R410A",
                    gasCharged: "1.20 Kg",
                    maxTempCooling: "50 °C",
                    minTempHeating: "0 °C",
                    dimensions: { width: "940", depth: "406", height: "609" },
                    netWeight: "50 Kg"
                },
                indoor: {
                    airflow: "850 m3/hr",
                    airSwing: "Yes (2D)",
                    motorPower: "58 W",
                    dimensions: { width: "990", depth: "203", height: "318" },
                    weight: "13.0 Kg"
                },
                additional: {
                    wifi: "Yes",
                    app: "Yes",
                    ecoMode: "Yes",
                    pkrMode: "Yes"
                },
                warranty: {
                    compressor: "10 Years",
                    pcb: "4 Years",
                    parts: "1 Year"
                }
            }
        }
    ];

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(p => p.category === selectedCategory);

    // WhatsApp Link generator
    const getWhatsAppLink = (number: string, forceWeb: boolean) => {
        if (!bookingProduct) return '#';
        const cleanNumber = number.replace(/\s+/g, '').replace('+', '');
        const messageText = `Hello Elios! I would like to book the ${bookingProduct.name} (${bookingProduct.ton}, Color: ${bookingProduct.color}). Please share the booking details.`;
        const encoded = encodeURIComponent(messageText);

        if (forceWeb) {
            return `https://web.whatsapp.com/send?phone=${cleanNumber}&text=${encoded}`;
        } else {
            return `https://api.whatsapp.com/send?phone=${cleanNumber}&text=${encoded}`;
        }
    };

    return (
        <div className="min-h-screen bg-[#fafbfc] pb-32 overflow-hidden">
            {/* Immersive Hero Header */}
            <section className="relative bg-gradient-to-br from-[#0c1836] via-[#102454] to-[#1E4186] py-32 px-6 overflow-hidden border-b border-[#1E4186]/20">
                {/* Decorative glowing abstract layout */}
                <div className="absolute inset-0 z-0 opacity-40">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/30 blur-[150px] rounded-full translate-x-1/4 -translate-y-1/4 animate-pulse duration-7000"></div>
                    <div className="absolute -bottom-1/3 left-0 w-[500px] h-[500px] bg-sky-500/20 blur-[120px] rounded-full -translate-x-1/4"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0c1836_80%)]"></div>
                </div>

                <div className="max-w-[1400px] mx-auto relative z-10 text-center px-4">
                    <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-sky-400 font-bold uppercase tracking-[0.25em] text-xs px-5 py-2.5 rounded-full border border-white/5 mb-6 animate-fade-in-up">
                        <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-ping"></span>
                        Premium Inverter Series
                    </span>
                    <h1 className="text-5xl md:text-7xl font-heading font-black text-white uppercase tracking-tight leading-none animate-fade-in-up [animation-delay:100ms] drop-shadow-sm">
                        LUXURY COMFORT
                    </h1>
                    <div className="h-1.5 w-28 bg-gradient-to-r from-sky-400 to-brand-blue mx-auto mt-6 rounded-full animate-fade-in-up [animation-delay:150ms]"></div>
                    <p className="text-white/70 font-questrial text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed animate-fade-in-up [animation-delay:200ms]">
                        Discover the elite five models engineered to deliver extreme durability, quiet operations, smart wireless control, and maximum energy savings.
                    </p>
                </div>
            </section>

            {/* Filter Section */}
            <section className="max-w-[1400px] mx-auto px-6 mt-16 z-20 relative">
                <div className="flex flex-wrap items-center justify-center gap-3 bg-white/65 backdrop-blur-xl p-3.5 rounded-[2rem] shadow-premium border border-gray-100 max-w-fit mx-auto animate-fade-in-up">
                    {[
                        { key: 'all', label: 'ALL MODELS' },
                        { key: '1', label: '1.0 TON UNITS' },
                        { key: '1.5', label: '1.5 TON UNITS' }
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setSelectedCategory(tab.key as any)}
                            className={`px-8 py-3.5 rounded-2xl font-ui font-bold text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                                selectedCategory === tab.key
                                    ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20 scale-[1.03]'
                                    : 'text-brand-blue/80 hover:text-brand-blue hover:bg-brand-blue/5'
                            }`}
                            style={{ fontFamily: 'Oswald, sans-serif' }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </section>

            {/* Products Grid */}
            <section className="max-w-[1400px] mx-auto px-6 lg:px-12 mt-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {filteredProducts.map((product, idx) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-[3rem] p-8 shadow-premium border border-gray-50 hover:-translate-y-3.5 transition-all duration-500 flex flex-col justify-between group relative overflow-hidden animate-fade-in-up"
                            style={{ animationDelay: `${idx * 120}ms` }}
                        >
                            {/* Animated card-hover glowing back-rings */}
                            <div className="absolute -top-24 -right-24 w-52 h-52 bg-gradient-to-br from-brand-blue/5 to-sky-400/5 blur-[60px] rounded-full group-hover:from-brand-blue/15 group-hover:to-sky-400/15 group-hover:scale-125 transition-all duration-700"></div>
                            
                            <div>
                                {/* Header Info */}
                                <div className="flex justify-between items-center mb-6 relative z-10">
                                    <span className="bg-brand-blue/5 text-brand-blue font-bold text-[9px] tracking-widest uppercase px-4 py-2 rounded-full border border-brand-blue/10">
                                        {product.badge}
                                    </span>
                                    <span className="font-ui text-gray-400 font-bold uppercase tracking-wider text-sm" style={{ fontFamily: 'Oswald, sans-serif' }}>
                                        {product.ton}
                                    </span>
                                </div>

                                {/* Dynamic Product Image Container */}
                                <div className="h-68 flex items-center justify-center relative mb-8">
                                    <div className="absolute w-44 h-44 bg-brand-blue/[0.03] blur-[45px] rounded-full group-hover:scale-130 group-hover:bg-brand-blue/[0.08] transition-all duration-700"></div>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-[82%] max-w-[90%] object-contain relative z-10 transition-transform duration-700 ease-out group-hover:scale-[1.08] group-hover:-rotate-1 drop-shadow-[0_12px_24px_rgba(0,0,0,0.06)]"
                                    />
                                </div>

                                {/* Color Swatch Display */}
                                <div className="flex items-center gap-2.5 mb-4 relative z-10">
                                    <span className={`w-4 h-4 rounded-full ${product.colorClass} shadow-sm`} title={product.color}></span>
                                    <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase font-questrial">
                                        {product.color}
                                    </span>
                                </div>

                                {/* Product Title */}
                                <h3 className="font-heading font-black text-2xl text-brand-blue tracking-tight leading-snug mb-3.5 group-hover:text-brand-blue-dark transition-colors">
                                    {product.name}
                                </h3>

                                {/* Product Description */}
                                <p className="text-gray-500 font-questrial text-[14px] leading-relaxed mb-6">
                                    {product.description}
                                </p>

                                {/* Micro specifications directly on the card */}
                                <div className="grid grid-cols-2 gap-3 bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50 mb-6">
                                    <div className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4 text-sky-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.284 16.284A3 3 0 0 1 12 15a3 3 0 0 1 3.716 1.284m-8.547-2.828a6 6 0 0 1 8.547 0m-11.378-2.828a9 9 0 0 1 12.378 0m-14.22-2.828a12 12 0 0 1 17.06 0" />
                                        </svg>
                                        <span className="text-xs text-gray-600 font-medium font-questrial">WiFi Functionality</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-brand-blue">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h7.5v7.5h-7.5v-7.5Z" />
                                        </svg>
                                        <span className="text-xs text-gray-600 font-medium font-questrial">T3 Twin-Rotary</span>
                                    </div>
                                </div>
                            </div>

                            {/* Card Footer actions */}
                            <div className="flex items-center gap-4 mt-2 pt-6 border-t border-gray-100">
                                <button
                                    onClick={() => {
                                        setSelectedProduct(product);
                                        setActiveModalTab('outdoor');
                                    }}
                                    className="flex-1 bg-brand-blue/5 text-brand-blue py-3.5 px-6 rounded-2xl font-bold hover:bg-brand-blue hover:text-white transition-all duration-300 text-center text-xs cursor-pointer border border-brand-blue/5 hover:scale-[1.02]"
                                >
                                    SPECIFICATIONS
                                </button>
                                <button
                                    onClick={() => setBookingProduct(product)}
                                    className="bg-brand-blue text-white py-3.5 px-6 rounded-2xl font-bold hover:bg-brand-blue-dark transition-all duration-300 text-center text-xs cursor-pointer flex-1 hover:scale-[1.02] shadow-md shadow-brand-blue/10"
                                >
                                    BOOK NOW
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Spec Details Modal */}
            {selectedProduct && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 transition-all duration-500 animate-fade-in">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-[#070e22]/50 backdrop-blur-md transition-opacity" 
                        onClick={() => setSelectedProduct(null)}
                    ></div>

                    {/* Modal Box */}
                    <div className="w-full max-w-2xl bg-white rounded-[3.25rem] p-6 md:p-10 shadow-2xl relative animate-fade-in-up overflow-hidden max-h-[92vh] flex flex-col border border-gray-100 z-10">
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedProduct(null)}
                            className="absolute top-8 right-8 text-gray-400 hover:text-brand-blue transition-colors text-xl font-bold w-11 h-11 flex items-center justify-center bg-gray-50 hover:bg-gray-100 rounded-full cursor-pointer border border-gray-200/50 z-20"
                        >
                            ✕
                        </button>

                        <div className="flex-shrink-0">
                            {/* Top Badge */}
                            <span className="bg-brand-blue/5 text-brand-blue font-bold text-[9px] tracking-widest uppercase px-4 py-2 rounded-full mb-4 inline-block border border-brand-blue/10">
                                {selectedProduct.badge}
                            </span>

                            {/* Header Details */}
                            <h2 className="text-2xl md:text-3xl font-heading font-black text-brand-blue uppercase mb-2">
                                {selectedProduct.name}
                            </h2>
                            
                            <div className="flex items-center gap-3 mb-6">
                                <span className={`w-3.5 h-3.5 rounded-full ${selectedProduct.colorClass}`}></span>
                                <p className="text-gray-400 font-questrial text-xs uppercase tracking-widest font-bold">
                                    {selectedProduct.ton} — {selectedProduct.color}
                                </p>
                            </div>

                            {/* Premium Tab Bar for Specs categories */}
                            <div className="flex border-b border-gray-100 mb-6 gap-2">
                                {[
                                    { key: 'outdoor', label: 'OUTDOOR UNIT' },
                                    { key: 'indoor', label: 'INDOOR UNIT' },
                                    { key: 'additional', label: 'FEATURES & WARRANTY' }
                                ].map((tab) => (
                                    <button
                                        key={tab.key}
                                        onClick={() => setActiveModalTab(tab.key as any)}
                                        className={`pb-3 text-xs tracking-wider uppercase font-bold font-ui transition-all border-b-2 cursor-pointer ${
                                            activeModalTab === tab.key
                                                ? 'border-brand-blue text-brand-blue scale-[1.02]'
                                                : 'border-transparent text-gray-400 hover:text-gray-600'
                                        }`}
                                        style={{ fontFamily: 'Oswald, sans-serif' }}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Modal Specs Content: Scrollable Section */}
                        <div className="flex-1 overflow-y-auto pr-2 pb-4 scrollbar-thin scrollbar-thumb-gray-200">
                            <div className="bg-[#fcfdfe] rounded-3xl p-5 md:p-7 border border-gray-100 shadow-inner">
                                {activeModalTab === 'outdoor' && (
                                    <div className="flex flex-col gap-3.5 text-sm font-questrial text-gray-600">
                                        <div className="flex justify-between items-center py-1">
                                            <span className="text-gray-400 font-medium">Capacity</span>
                                            <span className="text-brand-blue font-bold">{selectedProduct.specs.outdoor.capacity}</span>
                                        </div>
                                        <div className="h-px bg-gray-100/60 w-full"></div>

                                        <div className="flex justify-between items-center py-1">
                                            <span className="text-gray-400 font-medium">Unit Type</span>
                                            <span className="text-brand-blue font-bold">{selectedProduct.specs.outdoor.type}</span>
                                        </div>
                                        <div className="h-px bg-gray-100/60 w-full"></div>

                                        <div className="flex justify-between items-center py-1">
                                            <span className="text-gray-400 font-medium">Cooling Capacity</span>
                                            <span className="text-brand-blue font-bold">{selectedProduct.specs.outdoor.coolingCapacity}</span>
                                        </div>
                                        <div className="h-px bg-gray-100/60 w-full"></div>

                                        <div className="flex justify-between items-center py-1">
                                            <span className="text-gray-400 font-medium">Heating Capacity</span>
                                            <span className="text-brand-blue font-bold">{selectedProduct.specs.outdoor.heatingCapacity}</span>
                                        </div>
                                        <div className="h-px bg-gray-100/60 w-full"></div>

                                        <div className="flex justify-between items-center py-1">
                                            <span className="text-gray-400 font-medium">Compressor Type</span>
                                            <span className="text-brand-blue font-bold">{selectedProduct.specs.outdoor.compressorType}</span>
                                        </div>
                                        <div className="h-px bg-gray-100/60 w-full"></div>

                                        <div className="flex justify-between items-center py-1">
                                            <span className="text-gray-400 font-medium">Inverter Type</span>
                                            <span className="text-sky-500 font-black">{selectedProduct.specs.outdoor.inverterType}</span>
                                        </div>
                                        <div className="h-px bg-gray-100/60 w-full"></div>

                                        <div className="flex justify-between items-center py-1">
                                            <span className="text-gray-400 font-medium">Power Input</span>
                                            <span className="text-brand-blue font-bold">{selectedProduct.specs.outdoor.powerInput}</span>
                                        </div>
                                        <div className="h-px bg-gray-100/60 w-full"></div>

                                        <div className="flex justify-between items-center py-1">
                                            <span className="text-gray-400 font-medium">Rated Current</span>
                                            <span className="text-brand-blue font-bold">{selectedProduct.specs.outdoor.ratedCurrent}</span>
                                        </div>
                                        <div className="h-px bg-gray-100/60 w-full"></div>

                                        <div className="flex justify-between items-center py-1">
                                            <span className="text-gray-400 font-medium">Energy Efficiency (EER/COP)</span>
                                            <span className="text-brand-blue font-bold">{selectedProduct.specs.outdoor.energyEfficiency}</span>
                                        </div>
                                        <div className="h-px bg-gray-100/60 w-full"></div>

                                        <div className="flex justify-between items-center py-1">
                                            <span className="text-gray-400 font-medium">Refrigerant Gas</span>
                                            <span className="text-brand-blue font-bold">{selectedProduct.specs.outdoor.refrigerant}</span>
                                        </div>
                                        <div className="h-px bg-gray-100/60 w-full"></div>

                                        <div className="flex justify-between items-center py-1">
                                            <span className="text-gray-400 font-medium">Gas Charged</span>
                                            <span className="text-brand-blue font-bold">{selectedProduct.specs.outdoor.gasCharged}</span>
                                        </div>
                                        <div className="h-px bg-gray-100/60 w-full"></div>

                                        <div className="flex justify-between items-center py-1">
                                            <span className="text-gray-400 font-medium">Max Operating Temp (Cooling)</span>
                                            <span className="text-brand-blue font-bold">{selectedProduct.specs.outdoor.maxTempCooling}</span>
                                        </div>
                                        <div className="h-px bg-gray-100/60 w-full"></div>

                                        <div className="flex justify-between items-center py-1">
                                            <span className="text-gray-400 font-medium">Min Operating Temp (Heating)</span>
                                            <span className="text-brand-blue font-bold">{selectedProduct.specs.outdoor.minTempHeating}</span>
                                        </div>
                                        <div className="h-px bg-gray-100/60 w-full"></div>

                                        <div className="flex flex-col gap-2 py-1">
                                            <span className="text-gray-400 font-medium">Outdoor Dimensions (mm)</span>
                                            <div className="grid grid-cols-3 gap-2 text-center mt-1">
                                                <div className="bg-white p-2.5 rounded-xl border border-gray-100">
                                                    <p className="text-[10px] text-gray-400 uppercase font-black">Width</p>
                                                    <p className="text-brand-blue font-bold text-sm mt-0.5">{selectedProduct.specs.outdoor.dimensions.width} mm</p>
                                                </div>
                                                <div className="bg-white p-2.5 rounded-xl border border-gray-100">
                                                    <p className="text-[10px] text-gray-400 uppercase font-black">Depth</p>
                                                    <p className="text-brand-blue font-bold text-sm mt-0.5">{selectedProduct.specs.outdoor.dimensions.depth} mm</p>
                                                </div>
                                                <div className="bg-white p-2.5 rounded-xl border border-gray-100">
                                                    <p className="text-[10px] text-gray-400 uppercase font-black">Height</p>
                                                    <p className="text-brand-blue font-bold text-sm mt-0.5">{selectedProduct.specs.outdoor.dimensions.height} mm</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="h-px bg-gray-100/60 w-full"></div>

                                        <div className="flex justify-between items-center py-1">
                                            <span className="text-gray-400 font-medium">Net Weight</span>
                                            <span className="text-brand-blue font-bold">{selectedProduct.specs.outdoor.netWeight}</span>
                                        </div>
                                    </div>
                                )}

                                {activeModalTab === 'indoor' && (
                                    <div className="flex flex-col gap-4 text-sm font-questrial text-gray-600">
                                        <div className="flex justify-between items-center py-1">
                                            <span className="text-gray-400 font-medium">Air Flow Rate</span>
                                            <span className="text-brand-blue font-bold">{selectedProduct.specs.indoor.airflow}</span>
                                        </div>
                                        <div className="h-px bg-gray-100/60 w-full"></div>

                                        <div className="flex justify-between items-center py-1">
                                            <span className="text-gray-400 font-medium">Air Swing</span>
                                            <span className="text-brand-blue font-bold">{selectedProduct.specs.indoor.airSwing}</span>
                                        </div>
                                        <div className="h-px bg-gray-100/60 w-full"></div>

                                        <div className="flex justify-between items-center py-1">
                                            <span className="text-gray-400 font-medium">Motor Power</span>
                                            <span className="text-brand-blue font-bold">{selectedProduct.specs.indoor.motorPower}</span>
                                        </div>
                                        <div className="h-px bg-gray-100/60 w-full"></div>

                                        <div className="flex flex-col gap-2 py-1">
                                            <span className="text-gray-400 font-medium">Indoor Dimensions (mm)</span>
                                            <div className="grid grid-cols-3 gap-2 text-center mt-1">
                                                <div className="bg-white p-2.5 rounded-xl border border-gray-100">
                                                    <p className="text-[10px] text-gray-400 uppercase font-black">W</p>
                                                    <p className="text-brand-blue font-bold text-sm mt-0.5">{selectedProduct.specs.indoor.dimensions.width} mm</p>
                                                </div>
                                                <div className="bg-white p-2.5 rounded-xl border border-gray-100">
                                                    <p className="text-[10px] text-gray-400 uppercase font-black">D</p>
                                                    <p className="text-brand-blue font-bold text-sm mt-0.5">{selectedProduct.specs.indoor.dimensions.depth} mm</p>
                                                </div>
                                                <div className="bg-white p-2.5 rounded-xl border border-gray-100">
                                                    <p className="text-[10px] text-gray-400 uppercase font-black">H</p>
                                                    <p className="text-brand-blue font-bold text-sm mt-0.5">{selectedProduct.specs.indoor.dimensions.height} mm</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="h-px bg-gray-100/60 w-full"></div>

                                        <div className="flex justify-between items-center py-1">
                                            <span className="text-gray-400 font-medium">Weight</span>
                                            <span className="text-brand-blue font-bold">{selectedProduct.specs.indoor.weight}</span>
                                        </div>
                                    </div>
                                )}

                                {activeModalTab === 'additional' && (
                                    <div className="flex flex-col gap-4 text-sm font-questrial text-gray-600">
                                        <h5 className="font-ui text-[11px] text-brand-blue font-black uppercase tracking-widest bg-brand-blue/5 px-3.5 py-1.5 rounded-lg w-max border border-brand-blue/5 mb-1" style={{ fontFamily: 'Oswald, sans-serif' }}>
                                            Additional Features
                                        </h5>
                                        <div className="flex justify-between items-center py-1">
                                            <span className="text-gray-400 font-medium">WiFi Function</span>
                                            <span className={`font-black ${selectedProduct.specs.additional.wifi === 'Yes' ? 'text-green-500' : 'text-gray-400'}`}>{selectedProduct.specs.additional.wifi}</span>
                                        </div>
                                        <div className="h-px bg-gray-100/60 w-full"></div>

                                        <div className="flex justify-between items-center py-1">
                                            <span className="text-gray-400 font-medium">App Integration</span>
                                            <span className={`font-black ${selectedProduct.specs.additional.app === 'Yes' ? 'text-green-500' : 'text-gray-400'}`}>{selectedProduct.specs.additional.app}</span>
                                        </div>
                                        <div className="h-px bg-gray-100/60 w-full"></div>

                                        <div className="flex justify-between items-center py-1">
                                            <span className="text-gray-400 font-medium">Eco Mode</span>
                                            <span className={`font-black ${selectedProduct.specs.additional.ecoMode === 'Yes' ? 'text-green-500' : 'text-gray-400'}`}>{selectedProduct.specs.additional.ecoMode}</span>
                                        </div>
                                        <div className="h-px bg-gray-100/60 w-full"></div>

                                        <div className="flex justify-between items-center py-1">
                                            <span className="text-gray-400 font-medium">PKR Mode</span>
                                            <span className={`font-black ${selectedProduct.specs.additional.pkrMode === 'Yes' ? 'text-green-500' : 'text-gray-400'}`}>{selectedProduct.specs.additional.pkrMode}</span>
                                        </div>
                                        <div className="h-px bg-gray-100/60 w-full"></div>

                                        <h5 className="font-ui text-[11px] text-[#25d366] font-black uppercase tracking-widest bg-[#25d366]/5 px-3.5 py-1.5 rounded-lg w-max border border-[#25d366]/5 mt-4 mb-1" style={{ fontFamily: 'Oswald, sans-serif' }}>
                                            Official Warranty
                                        </h5>
                                        <div className="flex justify-between items-center py-1">
                                            <span className="text-gray-400 font-medium">Compressor Warranty</span>
                                            <span className="text-[#25d366] font-black">{selectedProduct.specs.warranty.compressor}</span>
                                        </div>
                                        <div className="h-px bg-gray-100/60 w-full"></div>

                                        <div className="flex justify-between items-center py-1">
                                            <span className="text-gray-400 font-medium">PCB Warranty</span>
                                            <span className="text-brand-blue font-bold">{selectedProduct.specs.warranty.pcb}</span>
                                        </div>
                                        <div className="h-px bg-gray-100/60 w-full"></div>

                                        <div className="flex justify-between items-center py-1">
                                            <span className="text-gray-400 font-medium">Parts Warranty</span>
                                            <span className="text-brand-blue font-bold">{selectedProduct.specs.warranty.parts}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Modal Action CTA */}
                        <div className="flex-shrink-0 flex gap-4 mt-6 pt-4 border-t border-gray-100">
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="flex-1 h-14 border border-gray-200 text-gray-500 rounded-2xl font-bold hover:bg-gray-50 transition-all cursor-pointer text-xs"
                            >
                                CLOSE
                            </button>
                            <button
                                onClick={() => {
                                    setBookingProduct(selectedProduct);
                                    setSelectedProduct(null);
                                }}
                                className="flex-1 h-14 bg-brand-blue text-white rounded-2xl font-bold hover:bg-brand-blue-dark flex items-center justify-center transition-all shadow-md shadow-brand-blue/10 cursor-pointer text-xs"
                            >
                                BOOK NOW
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* WhatsApp Booking Options Modal */}
            {bookingProduct && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 transition-all duration-500 animate-fade-in">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-[#070e22]/60 backdrop-blur-md transition-opacity" 
                        onClick={() => setBookingProduct(null)}
                    ></div>

                    {/* Modal Content */}
                    <div className="w-full max-w-lg bg-white rounded-[3rem] p-8 md:p-10 shadow-2xl relative animate-fade-in-up border border-gray-150 z-20">
                        {/* Close button */}
                        <button
                            onClick={() => setBookingProduct(null)}
                            className="absolute top-8 right-8 text-gray-400 hover:text-brand-blue transition-colors text-xl font-bold w-10 h-10 flex items-center justify-center bg-gray-50 hover:bg-gray-100 rounded-full cursor-pointer border border-gray-200/50"
                        >
                            ✕
                        </button>

                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-[#25d366]/10 rounded-3xl flex items-center justify-center text-[#25d366] mx-auto mb-4 animate-bounce duration-3000">
                                <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-heading font-black text-brand-blue uppercase tracking-tight">
                                WhatsApp Booking
                            </h3>
                            <p className="text-gray-400 font-questrial text-xs uppercase tracking-widest font-bold mt-2">
                                For {bookingProduct.name}
                            </p>
                        </div>

                        {/* Helpline Selection Section */}
                        <div className="flex flex-col gap-6">
                            {[
                                {
                                    number: "+92 321 8548557",
                                    label: "Helpline Option 01",
                                    description: "Sales & Technical Assistance"
                                },
                                {
                                    number: "+92 324 8250610",
                                    label: "Helpline Option 02",
                                    description: "Customer Support & Direct Booking"
                                }
                            ].map((helpline, idx) => (
                                <div key={idx} className="bg-gray-50 rounded-3xl p-5 border border-gray-100 flex flex-col gap-4 relative overflow-hidden group/item">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <span className="text-[10px] text-brand-blue font-black uppercase tracking-wider bg-brand-blue/5 px-3 py-1 rounded-full border border-brand-blue/5">
                                                {helpline.label}
                                            </span>
                                            <h4 className="text-lg font-heading font-black text-brand-blue mt-2 leading-none">
                                                {helpline.number}
                                            </h4>
                                            <p className="text-xs text-gray-400 font-questrial mt-1 font-bold">
                                                {helpline.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action Buttons for Helpline */}
                                    <div className="grid grid-cols-2 gap-3.5 mt-2">
                                        {/* WhatsApp App CTA */}
                                        <a
                                            href={getWhatsAppLink(helpline.number, false)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => setBookingProduct(null)}
                                            className={`relative flex items-center justify-center gap-2 h-12 rounded-2xl font-bold font-questrial text-[11px] uppercase tracking-wider transition-all border cursor-pointer select-none ${
                                                isMobileDevice 
                                                    ? 'bg-[#25d366] text-white border-transparent hover:bg-[#20ba59] shadow-md shadow-[#25d366]/10 hover:scale-[1.02]' 
                                                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-brand-blue'
                                            }`}
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                            </svg>
                                            <span>WhatsApp App</span>
                                            {isMobileDevice && (
                                                <span className="absolute -top-2.5 -right-2.5 bg-white text-[#25d366] text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border border-[#25d366]/20 shadow-sm animate-pulse">
                                                    Best
                                                </span>
                                            )}
                                        </a>

                                        {/* WhatsApp Web CTA */}
                                        <a
                                            href={getWhatsAppLink(helpline.number, true)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => setBookingProduct(null)}
                                            className={`relative flex items-center justify-center gap-2 h-12 rounded-2xl font-bold font-questrial text-[11px] uppercase tracking-wider transition-all border cursor-pointer select-none ${
                                                !isMobileDevice 
                                                    ? 'bg-[#1E4186] text-white border-transparent hover:bg-brand-blue-dark shadow-md shadow-brand-blue/10 hover:scale-[1.02]' 
                                                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                            }`}
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                                            </svg>
                                            <span>WhatsApp Web</span>
                                            {!isMobileDevice && (
                                                <span className="absolute -top-2.5 -right-2.5 bg-white text-brand-blue text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border border-brand-blue/20 shadow-sm animate-pulse">
                                                    Best
                                                    {navigator.platform.indexOf('Mac') > -1 ? ' (Mac)' : ' (PC)'}
                                                </span>
                                            )}
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Modal Action CTA */}
                        <div className="flex gap-4 mt-8 pt-2">
                            <button
                                onClick={() => setBookingProduct(null)}
                                className="w-full h-13 border border-gray-200 text-gray-500 rounded-2xl font-bold hover:bg-gray-50 transition-all cursor-pointer text-xs uppercase tracking-wider"
                            >
                                CANCEL
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
