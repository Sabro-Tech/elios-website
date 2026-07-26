import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FIELDS, fieldVars, onAccent, type Field } from '../theme/fields';
import { useField } from '../context/FieldContext';
import geyserImg from '../assets/Geyser-transparent-hero.png';
import flower1tImg from '../assets/1ton-flower-nobg-hero.png';
import grey1tImg from '../assets/1ton-grey-nobg-hero.png';
import black15tImg from '../assets/1_5ton-black-nobg-hero.png';
import silver15tImg from '../assets/1_5ton-silver-nobg-hero.png';
import white15tImg from '../assets/1_5ton-white-nobg-hero.png';

interface Slide {
    id: string;
    line1: string;
    line2: string;
    subtitle: string;
    image: string;
    alt: string;
    field: Field;
    readout: [string, string][];
}

/** Every figure is read off the published spec sheet. Nothing is estimated. */
const SLIDES: Slide[] = [
    {
        id: 'white',
        line1: 'Alpine', line2: 'White',
        subtitle: 'High-gloss white, the classic. Full 1.5 ton output, WiFi, Eco and PKR modes, and a ten-year compressor warranty.',
        image: white15tImg, alt: 'Elios Alpine White 1.5 ton inverter air conditioner',
        field: FIELDS.white,
        readout: [['18,000', 'BTU cooling'], ['12.6', 'EER'], ['1,428 W', 'Rated input']],
    },
    {
        id: 'noir',
        line1: 'Noir', line2: 'Pro',
        subtitle: 'Matte black over the 1.5 ton platform, moving 850 m³/hr for rooms that take longer to pull down.',
        image: black15tImg, alt: 'Elios Noir Pro 1.5 ton inverter air conditioner',
        field: FIELDS.noir,
        readout: [['18,000', 'BTU cooling'], ['850', 'm³/hr airflow'], ['10 yr', 'Compressor']],
    },
    {
        id: 'silver',
        line1: 'Apex', line2: 'Silver',
        subtitle: 'Brushed silver for offices and open-plan rooms, with the same 12.6 EER rating as the rest of the 1.5 ton line.',
        image: silver15tImg, alt: 'Elios Apex Silver 1.5 ton inverter air conditioner',
        field: FIELDS.silver,
        readout: [['18,000', 'BTU cooling'], ['12.6', 'EER'], ['58 W', 'Indoor motor']],
    },
    {
        id: 'grey',
        line1: 'Minima', line2: 'Grey',
        subtitle: 'A metallic grey finish that disappears against a painted wall, running the 1.0 ton platform at 440 W when the room is only holding temperature.',
        image: grey1tImg, alt: 'Elios Minima Grey 1.0 ton inverter air conditioner',
        field: FIELDS.grey,
        readout: [['12,000', 'BTU cooling'], ['12.5', 'EER'], ['440 W', 'Minimum draw']],
    },
    {
        id: 'blossom',
        line1: 'Blossom', line2: 'Edition',
        subtitle: 'A luxury floral art panel over the same twin-rotary inverter platform — part of the room rather than an appliance bolted to the wall.',
        image: flower1tImg, alt: 'Elios Blossom Edition 1.0 ton inverter air conditioner',
        field: FIELDS.blossom,
        readout: [['12,000', 'BTU cooling'], ['12.5', 'EER'], ['0.8 Kg', 'R410A charge']],
    },
    {
        id: 'geyser',
        line1: 'Air Source', line2: 'Geyser',
        subtitle: 'Smart heating cycles and digital control — the tank heats on a schedule you set instead of staying hot around the clock.',
        image: geyserImg, alt: 'Elios air source water geyser',
        field: FIELDS.geyser,
        readout: [['Air source', 'Type'], ['Digital', 'Control'], ['Smart', 'Cycles']],
    },
];

const DWELL = 7000;

export default function Hero() {
    const [index, setIndex] = useState(0);
    const [held, setHeld] = useState(false);
    const { setField } = useField();
    const unitRef = useRef<HTMLDivElement>(null);
    const reduced = useRef(false);

    useEffect(() => {
        reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }, []);

    const go = useCallback((next: number) => setIndex((next + SLIDES.length) % SLIDES.length), []);

    /**
     * The field is swapped instantly, not cross-faded.
     *
     * Several of these products invert the page — Noir Pro is dark-on-light
     * while the rest are light-on-dark — and interpolating between an inverted
     * pair necessarily passes through a mid-grey where ground and ink meet and
     * nothing is readable. Snapping the colours and flying the content back in
     * (every element below is keyed to the slide and carries `anim-rise`) keeps
     * the change legible at every frame and reads as a deliberate cut.
     */

    // Publish the active field so the navigation can ride the same ground.
    useEffect(() => {
        setField(SLIDES[index].field);
        return () => setField(null);
    }, [index, setField]);

    useEffect(() => {
        if (held || reduced.current) return;
        const t = setTimeout(() => go(index + 1), DWELL);
        return () => clearTimeout(t);
    }, [index, held, go]);

    // Gentle parallax; skipped entirely under reduced motion.
    useEffect(() => {
        if (reduced.current) return;
        const onScroll = () => {
            const el = unitRef.current;
            if (!el) return;
            const y = Math.min(window.scrollY, window.innerHeight);
            el.style.translate = `0 ${y * 0.12}px`;
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const slide = SLIDES[index];

    return (
        <section
            id="hero"
            style={fieldVars(slide.field)}
            className="relative overflow-hidden flex items-center"
            onMouseEnter={() => setHeld(true)}
            onMouseLeave={() => setHeld(false)}
            onFocusCapture={() => setHeld(true)}
            onBlurCapture={() => setHeld(false)}
            aria-roledescription="carousel"
            aria-label="Elios product range"
        >
            <div
                className="absolute inset-0 field-ground"
                aria-hidden="true"
            />

            <div
                className="absolute right-[2%] top-1/2 -translate-y-1/2 rounded-full blur-[30px] pointer-events-none anim-breathe field-haze"
                style={{ width: 'min(62vw, 780px)', height: 'min(62vw, 780px)' }}
                aria-hidden="true"
            />

            <div
                className="wrap relative w-full grid lg:grid-cols-[1.02fr_.98fr] items-center gap-8 lg:gap-10 py-10 field-ink"
                style={{ paddingTop: 'calc(57px + 2rem)' }}
            >
                {/* Left — the argument */}
                <div className="order-2 lg:order-1 flex flex-col justify-center">
                    <p key={`k-${slide.id}`} className="kicker field-faint flex items-center gap-3 mb-6 lg:mb-8 anim-rise">
                        <span className="w-1.5 h-1.5 rounded-full anim-ping flex-none" style={{ background: 'var(--accent)' }} />
                        Digital inverter · Built in Pakistan
                    </p>

                    <h1 key={`t-${slide.id}`} className="display text-[2.5rem] sm:text-[3.25rem] lg:text-[4rem] xl:text-[4.75rem] anim-rise">
                        {slide.line1}
                        <span className="block heavy">{slide.line2}</span>
                    </h1>

                    <p
                        key={`s-${slide.id}`}
                        className="mt-6 text-[15px] lg:text-base leading-relaxed max-w-[46ch] anim-rise field-soft"
                        style={{ animationDelay: '110ms' }}
                    >
                        {slide.subtitle}
                    </p>

                    <div key={`c-${slide.id}`} className="flex flex-wrap gap-3 mt-9 anim-rise" style={{ animationDelay: '170ms' }}>
                        <Link
                            to="/products"
                            className="btn"
                            style={{ background: slide.field.accent, color: onAccent(slide.field.accent) }}
                        >
                            Book on WhatsApp
                        </Link>
                        <Link to="/#app" className="btn btn-line">See the app</Link>
                    </div>

                    <dl
                        key={`r-${slide.id}`}
                        className="flex mt-11 pt-6 border-t max-w-[560px] anim-rise"
                        style={{ borderColor: 'color-mix(in srgb, var(--ink) 16%, transparent)', animationDelay: '220ms' }}
                    >
                        {slide.readout.map(([value, label], i) => (
                            <div
                                key={label}
                                className={`flex flex-col ${i > 0 ? 'pl-5 ml-5 sm:pl-8 sm:ml-8 border-l' : ''}`}
                                style={{ borderColor: 'color-mix(in srgb, var(--ink) 12%, transparent)' }}
                            >
                                <dd
                                    className="num text-[clamp(22px,2.5vw,34px)] leading-none tracking-tight field-accent"
                                    style={{ fontVariationSettings: "'wdth' 108, 'wght' 500" }}
                                >
                                    {value}
                                </dd>
                                <dt
                                    className="text-[10.5px] uppercase tracking-[0.2em] mt-2.5 field-faint"
                                >
                                    {label}
                                </dt>
                            </div>
                        ))}
                    </dl>
                </div>

                {/* Right — the unit */}
                <div className="order-1 lg:order-2 relative flex items-center justify-center min-h-[38svh] lg:min-h-[calc(var(--vh)*0.5)]">
                    <div ref={unitRef} key={`i-${slide.id}`} className="relative z-10 flex justify-center w-full anim-unit">
                        <img
                            src={slide.image}
                            alt={slide.alt}
                            className="w-auto object-contain max-w-[92%]"
                            style={{
                                maxHeight: 'calc(var(--vh) * 0.52)',
                                filter: 'drop-shadow(0 40px 60px rgba(0,0,0,.5))',
                            }}
                        />
                    </div>

                    {/* The swatch rail: each dot is the colour measured from that unit */}
                    <div
                        className="absolute z-20 right-0 bottom-0 flex gap-2.5 lg:flex-col max-lg:static max-lg:justify-center max-lg:mt-4 max-lg:w-full"
                        role="tablist"
                        aria-label="Choose a finish"
                    >
                        {SLIDES.map((s, i) => (
                            <button
                                key={s.id}
                                role="tab"
                                aria-selected={i === index}
                                aria-label={`${s.line1} ${s.line2}`}
                                onClick={() => { go(i); setHeld(true); }}
                                className="relative w-[34px] h-[34px] rounded-full cursor-pointer transition-transform duration-500 hover:scale-110"
                                style={{
                                    background: s.field.unit,
                                    border: '1px solid color-mix(in srgb, var(--ink) 22%, transparent)',
                                    boxShadow: i === index ? '0 0 0 2px var(--ground), 0 0 0 3px var(--ink)' : 'none',
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Position marker */}
            <div
                className="absolute bottom-6 inset-x-0 wrap hidden md:flex items-end justify-between pointer-events-none field-ink field-faint"
            >
                <span className="num text-[11px] tracking-[0.2em] uppercase">
                    {String(index + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
                </span>
                <span className="text-[11px] tracking-[0.2em] uppercase">Scroll</span>
            </div>
        </section>
    );
}
