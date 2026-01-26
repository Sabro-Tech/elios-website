import { Link } from 'react-router-dom';
import acBrochure from '../assets/Elios AC Brochure.pdf';
import geyserBrochure from '../assets/Elios Geyser Brochure.pdf';
import acManual from '../assets/Elios AC User Manual.pdf';
import geyserManualUrdu from '../assets/Elios Geyser User Manual - Urdu.pdf';
import geyserManualEnglish from '../assets/Elios Geyser User Manual - English.pdf';

export default function CustomerSupport() {
    return (
        <section className="w-full bg-white py-20 px-6">
            <div className="max-w-[1400px] mx-auto flex flex-col gap-24">

                {/* Row 1: Customer Support Center */}
                <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start">
                    {/* Title Part */}
                    <div className="w-full md:w-[45%]">
                        <h2 className="font-heading font-bold text-[40px] md:text-[50px] leading-tight text-[#192A5E] uppercase">
                            Customer Support<br />
                            <span className="inline-block border-b-4 border-[#192A5E] pb-1">Center</span>
                        </h2>
                    </div>

                    {/* Content Part */}
                    <div className="w-full md:w-[55%] flex flex-col items-start gap-6">
                        <div className="flex flex-col gap-4">
                            <p className="font-questrial text-[18px] text-[#44527c] leading-relaxed">
                                We're here to make your experience smooth and hassle-free! Register your device warranty in just a few clicks and enjoy peace of mind knowing you're covered.
                            </p>
                            <p className="font-questrial text-[18px] text-[#44527c] leading-relaxed">
                                Need assistance? Our complaint form is designed to resolve any issues quickly. We're committed to providing fast, reliable support every step of the way!
                            </p>
                        </div>
                        <Link
                            to="/support"
                            className="bg-[#E5E7EB] hover:bg-[#D1D5DB] text-[#44527c] font-questrial px-10 py-2 rounded-full transition-colors text-[18px] inline-block"
                        >
                            Visit
                        </Link>
                    </div>
                </div>

                {/* Row 2: User Instructions Manual */}
                <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start">
                    {/* Title Part */}
                    <div className="w-full md:w-[45%]">
                        <h2 className="font-heading font-bold text-[40px] md:text-[50px] leading-tight text-[#192A5E] uppercase">
                            User Instructions<br />
                            <span className="inline-block border-b-4 border-[#192A5E] pb-1">Manual</span>
                        </h2>
                    </div>

                    {/* Content Part */}
                    <div className="w-full md:w-[55%] flex flex-col items-start gap-6">
                        <div className="flex flex-col gap-4">
                            <p className="font-questrial text-[18px] text-[#44527c] leading-relaxed">
                                Get the most out of your ELIOS Digital Inverter by following our comprehensive user guide. It includes detailed instructions on installation, usage, and troubleshooting to ensure optimal performance.
                            </p>
                            <p className="font-questrial text-[18px] text-[#44527c] leading-relaxed">
                                Click the button below to download the manual and keep it handy for easy reference!
                            </p>
                        </div>

                        {/* Buttons Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl text-center">
                            {/* Left Column */}
                            <div className="flex flex-col gap-3">
                                <a
                                    href={acBrochure}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#E5E7EB] hover:bg-[#D1D5DB] text-[#44527c] font-questrial px-6 py-2 rounded-full transition-colors text-[16px] whitespace-nowrap block"
                                >
                                    Download Brochure (AC)
                                </a>
                                <a
                                    href={geyserBrochure}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#E5E7EB] hover:bg-[#D1D5DB] text-[#44527c] font-questrial px-6 py-2 rounded-full transition-colors text-[16px] whitespace-nowrap block"
                                >
                                    Download Brochure (Geyser)
                                </a>
                            </div>

                            {/* Right Column */}
                            <div className="flex flex-col gap-3">
                                <a
                                    href={acManual}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#E5E7EB] hover:bg-[#D1D5DB] text-[#44527c] font-questrial px-6 py-2 rounded-full transition-colors text-[16px] whitespace-nowrap block"
                                >
                                    User Manual (AC)
                                </a>
                                <a
                                    href={geyserManualUrdu}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#E5E7EB] hover:bg-[#D1D5DB] text-[#44527c] font-questrial px-6 py-2 rounded-full transition-colors text-[16px] whitespace-nowrap block"
                                >
                                    User Manual (Geyser - Urdu)
                                </a>
                                <a
                                    href={geyserManualEnglish}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#E5E7EB] hover:bg-[#D1D5DB] text-[#44527c] font-questrial px-6 py-2 rounded-full transition-colors text-[16px] whitespace-nowrap block"
                                >
                                    User Manual (Geyser - English)
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
