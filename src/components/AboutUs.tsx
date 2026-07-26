import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import noirImg from '../assets/1_5ton-black-nobg-hero.png';

const TAGS = ['Twin-Rotary T3', 'R410A', '50°C rated', 'WiFi', 'Eco mode'];

export default function AboutUs() {
    return (
        <section id="about" className="band">
            <div className="wrap grid lg:grid-cols-[.92fr_1.08fr] gap-10 lg:gap-[76px] items-center">

                {/* The Noir Pro is near-black, so its frame goes light. Same rule
            the hero runs, applied to a fixed section. */}
                <Reveal
                    className="relative rounded-[18px] overflow-hidden aspect-[4/3.4] grid place-items-center border border-[#E2E3DE]"
                    style={{ background: 'radial-gradient(circle at 50% 40%, #F2F2EF 0%, #D6D7D2 74%)' }}
                >
                    <img
                        src={noirImg}
                        alt="Elios Noir Pro in matte black"
                        className="max-h-[78%] w-auto object-contain"
                        style={{ filter: 'drop-shadow(0 26px 38px rgba(0,0,0,.34))' }}
                    />
                    <span className="absolute left-6 bottom-5 text-[10.5px] uppercase tracking-[0.2em] text-[#6A6D68]">
                        Noir Pro · Matte Black
                    </span>
                </Reveal>

                <Reveal delay={120}>
                    <p className="kicker mb-6">About Elios</p>
                    <h2 className="display text-[2.25rem] sm:text-[3rem] lg:text-[3.5rem]">
                        Built here,
                        <span className="block heavy">for the heat here.</span>
                    </h2>

                    <div className="flex flex-wrap gap-2 mt-7 mb-7">
                        {TAGS.map((t) => <span key={t} className="chip">{t}</span>)}
                    </div>

                    <p className="lede mb-4">
                        A fixed-speed unit knows two states: flat out, or off. It overshoots, stops,
                        drifts warm, and slams back on — and you pay for every one of those swings.
                    </p>
                    <p className="lede mb-4">
                        An Elios inverter modulates instead, holding your target on as little as
                        440 W, and reporting exactly what it is drawing while it does. Less cycling
                        means less wear, which is why the compressor carries a ten-year warranty
                        rather than a slogan.
                    </p>
                    <p className="lede mb-9">
                        Engineered and supported from Islamabad, for houses that run their cooling
                        hard for five months of the year on electricity that is not cheap.
                    </p>

                    <div className="flex flex-wrap gap-3">
                        <Link to="/#features" className="btn btn-solid">See the technology</Link>
                        <Link to="/#app" className="btn btn-line">Watch the panel</Link>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
