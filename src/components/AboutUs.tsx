
export default function AboutUs() {
    return (
        <section id="about" className="w-full bg-[#f8fafc] py-32 px-6 relative overflow-hidden">
            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-blue/5 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-brand-blue/5 blur-[100px] rounded-full"></div>

            <div className="max-w-[1200px] mx-auto text-center flex flex-col items-center gap-12 relative z-10">
                {/* Title */}
                <div className="animate-fade-in-up">
                    <h2 className="font-heading font-bold text-[48px] md:text-[64px] text-brand-blue uppercase leading-tight tracking-tight">
                        About Us
                    </h2>
                    <div className="h-1.5 w-20 bg-brand-blue mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-8 max-w-4xl">
                    <p className="font-questrial text-[22px] md:text-[24px] text-gray-700 leading-relaxed animate-fade-in-up [animation-delay:200ms]">
                        At <span className="font-bold text-brand-blue">ELIOS</span>, we're redefining <span className="font-bold">home comfort</span> through innovation. As a Pakistan-based brand, we specialize in advanced <span className="font-bold text-brand-blue">Digital Inverter Air Conditioners</span> that combine <span className="font-bold">energy efficiency</span>, <span className="font-bold">intelligent technology</span>, and <span className="font-bold">sleek design</span>.
                    </p>

                    <p className="font-questrial text-[22px] md:text-[24px] text-gray-700 leading-relaxed animate-fade-in-up [animation-delay:400ms]">
                        With features like <span className="font-bold">Wireless</span> control, real-time <span className="font-bold">power consumption monitoring</span>, and <span className="font-bold">customizable modes</span>, ELIOS products are built to put you in control—anytime, anywhere.
                    </p>

                    <p className="font-questrial text-[22px] md:text-[24px] text-gray-700 leading-relaxed animate-fade-in-up [animation-delay:600ms]">
                        We believe in making modern living effortless. From <span className="font-bold text-brand-blue">cutting-edge tech</span> to <span className="font-bold">responsive customer support</span>, every step we take is driven by one goal: to create <span className="font-bold">smarter</span>, more <span className="font-bold">comfortable homes</span> across Pakistan.
                    </p>

                    <div className="flex flex-col gap-4 mt-12 animate-fade-in-up [animation-delay:800ms]">
                        <p className="font-questrial text-[22px] md:text-[26px] text-brand-blue font-black tracking-wide">
                            LIVE SMART. LIVE COOL. LIVE ELIOS.
                        </p>
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                        <p className="font-questrial text-[16px] text-gray-400 uppercase tracking-widest font-bold">
                            A Brand by Kascon Technologies (Pvt) Ltd.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
