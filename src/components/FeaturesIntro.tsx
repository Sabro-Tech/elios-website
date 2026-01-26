export default function FeaturesIntro() {
    return (
        <section className="w-full bg-white py-20 px-6">
            <div className="max-w-[1200px] mx-auto text-center flex flex-col items-center">
                {/* Small Label */}
                <span
                    className="font-montserrat text-[#192A5E] font-black text-[30px] tracking-wide"
                >
                    Top Features
                </span>

                {/* Main Title */}
                <h2
                    className="font-montserrat text-[#192A5E] font-black text-[30px] tracking-wide mb-12"
                >
                    Industry-Leading Technology
                </h2>

                {/* Text Content */}
                <p
                    className="font-montserrat text-[#44527c] text-[19px] leading-relaxed md:leading-loose font-light max-w-4xl"
                >
                    At Elios, we pride ourselves on harnessing <span className="font-bold">industry-leading technology</span> to <span className="font-bold">revolutionize the way you experience comfort</span>. Our Digital Inverters are <span className="font-bold">designed with the latest advancements</span> in air conditioning technology, providing <span className="font-bold">unmatched efficiency and reliability</span>. By incorporating <span className="font-bold">cutting-edge components</span> and <span className="font-bold">smart algorithms</span>, Elios Air Conditioners <span className="font-bold">adapt to your environment</span> and <span className="font-bold">usage patterns</span>, optimizing performance <span className="font-bold">without compromising on power</span>. This approach not only ensures <span className="font-bold">superior cooling and heating</span>, but also <span className="font-bold">extends the lifespan</span> of the unit by <span className="font-bold">reducing wear and tear</span>, setting new standards in air conditioning technology.
                </p>
            </div>
        </section>
    );
}
