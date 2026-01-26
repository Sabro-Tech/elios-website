
export default function AboutUs() {
    return (
        <section className="w-full bg-[#e5e5e5] py-20 px-6">
            <div className="max-w-[1200px] mx-auto text-center flex flex-col items-center gap-8">
                {/* Title */}
                <h2 className="font-heading font-bold text-[46px] md:text-[56px] text-[#1e4186] uppercase">
                    About Us
                </h2>

                {/* Content */}
                <div className="flex flex-col gap-6 max-w-5xl">
                    <p className="font-questrial text-[20px] text-black leading-relaxed">
                        At <span className="font-bold">ELIOS</span>, we're redefining <span className="font-bold">home comfort</span> through innovation. As a Pakistan-based brand, we specialize in advanced <span className="font-bold">Digital Inverter Air Conditioners</span> that combine <span className="font-bold">energy efficiency</span>, <span className="font-bold">intelligent technology</span>, and <span className="font-bold">sleek design</span>.
                    </p>

                    <p className="font-questrial text-[20px] text-black leading-relaxed">
                        With features like <span className="font-bold">Wireless</span> control, real-time <span className="font-bold">power consumption monitoring</span>, and <span className="font-bold">customizable modes</span>, ELIOS products are built to put you in control—anytime, anywhere.
                    </p>

                    <p className="font-questrial text-[20px] text-black leading-relaxed">
                        We believe in making modern living effortless. From <span className="font-bold">cutting-edge tech</span> to <span className="font-bold">responsive customer support</span>, every step we take is driven by one goal: to create <span className="font-bold">smarter</span>, more <span className="font-bold">comfortable homes</span> across Pakistan.
                    </p>

                    <div className="flex flex-col gap-2 mt-4">
                        <p className="font-questrial text-[20px] text-black font-bold">
                            Live Smart. Live Cool. Live ELIOS.
                        </p>
                        <p className="font-questrial text-[16px] text-[#888888]">
                            A Brand by Kascon Technologes (Pvt) Ltd.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
