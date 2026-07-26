import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import Reveal from '../components/Reveal';
import FinishLadder from '../components/FinishLadder';
import { FIELDS, isLight } from '../theme/fields';
import flower1tImg from '../assets/1ton-flower-nobg-hero.png';
import grey1tImg from '../assets/1ton-grey-nobg-hero.png';
import black15tImg from '../assets/1_5ton-black-nobg-hero.png';
import silver15tImg from '../assets/1_5ton-silver-nobg-hero.png';
import white15tImg from '../assets/1_5ton-white-nobg-hero.png';

interface Dimensions { width: string; depth: string; height: string; }

interface Product {
    id: string;
    /** key into FIELDS — decides this unit's field */
    finish: keyof typeof FIELDS;
    name: string;
    category: '1' | '1.5';
    ton: string;
    color: string;
    description: string;
    image: string;
    badge: string;
    specs: {
        outdoor: {
            capacity: string; type: string; coolingCapacity: string; heatingCapacity: string;
            compressorType: string; inverterType: string; powerInput: string; ratedCurrent: string;
            energyEfficiency: string; refrigerant: string; gasCharged: string;
            maxTempCooling: string; minTempHeating: string; dimensions: Dimensions; netWeight: string;
        };
        indoor: { airflow: string; airSwing: string; motorPower: string; dimensions: Dimensions; weight: string; };
        additional: { wifi: 'Yes' | 'No'; app: 'Yes' | 'No'; ecoMode: 'Yes' | 'No'; pkrMode: 'Yes' | 'No'; };
        warranty: { compressor: string; pcb: string; parts: string; };
    };
}

const HELPLINES = [
    { number: '+92 321 8548557', label: 'Helpline 01', description: 'Sales & technical assistance' },
    { number: '+92 324 8250610', label: 'Helpline 02', description: 'Customer support & direct booking' },
];

const SPEC_1TON = {
    outdoor: {
        capacity: '1.0 Ton', type: 'DC Inverter', coolingCapacity: '12,000 BTU', heatingCapacity: '13,000 BTU',
        compressorType: 'Twin-Rotary', inverterType: 'T3', powerInput: '960 W (Min: 440W, Max: 1320W)',
        ratedCurrent: '2.0A - 6.0A', energyEfficiency: '12.5 EER / 3.70 COP', refrigerant: 'R410A',
        gasCharged: '0.8 Kg', maxTempCooling: '50 °C', minTempHeating: '0 °C',
        dimensions: { width: '927', depth: '362', height: '508' }, netWeight: '40 Kg',
    },
    indoor: {
        airflow: '638 m3/hr', airSwing: 'Yes (2D)', motorPower: '20 W',
        dimensions: { width: '800', depth: '203', height: '292' }, weight: '12 Kg',
    },
    additional: { wifi: 'Yes', app: 'Yes', ecoMode: 'Yes', pkrMode: 'Yes' },
    warranty: { compressor: '10 Years', pcb: '4 Years', parts: '1 Year' },
} as Product['specs'];

const SPEC_15TON = {
    outdoor: {
        capacity: '1.5 Ton', type: 'DC Inverter', coolingCapacity: '18,000 BTU', heatingCapacity: '19,000 BTU',
        compressorType: 'Twin-Rotary', inverterType: 'T3', powerInput: '1,428 W (Min: 440W, Max: 1980W)',
        ratedCurrent: '2.0A - 9.0A', energyEfficiency: '12.6 EER / 3.71 COP', refrigerant: 'R410A',
        gasCharged: '1.20 Kg', maxTempCooling: '50 °C', minTempHeating: '0 °C',
        dimensions: { width: '940', depth: '406', height: '609' }, netWeight: '50 Kg',
    },
    indoor: {
        airflow: '850 m3/hr', airSwing: 'Yes (2D)', motorPower: '58 W',
        dimensions: { width: '990', depth: '203', height: '318' }, weight: '13.0 Kg',
    },
    additional: { wifi: 'Yes', app: 'Yes', ecoMode: 'Yes', pkrMode: 'Yes' },
    warranty: { compressor: '10 Years', pcb: '4 Years', parts: '1 Year' },
} as Product['specs'];

const PRODUCTS: Product[] = [
    {
        id: 'ac-1t-flower', finish: 'blossom', name: 'ELIOS BLOSSOM EDITION', category: '1', ton: '1.0 Ton',
        color: 'Elegant Floral Art', image: flower1tImg, badge: 'Designer Edition',
        description: 'A luxury floral art panel over the same twin-rotary inverter platform — the unit reads as part of the room rather than an appliance bolted to the wall.',
        specs: SPEC_1TON,
    },
    {
        id: 'ac-1t-grey', finish: 'grey', name: 'ELIOS MINIMA GREY', category: '1', ton: '1.0 Ton',
        color: 'Metallic Grey', image: grey1tImg, badge: 'Minima Edition',
        description: 'A metallic grey finish that disappears against a painted wall, running the 1.0 ton platform at 440 W when the room is only holding temperature.',
        specs: SPEC_1TON,
    },
    {
        id: 'ac-15t-black', finish: 'noir', name: 'ELIOS NOIR PRO', category: '1.5', ton: '1.5 Ton',
        color: 'Premium Matte Black', image: black15tImg, badge: 'Noir Pro Edition',
        description: 'Matte black over the 1.5 ton platform, moving 850 m³/hr for rooms that take longer to pull down.',
        specs: SPEC_15TON,
    },
    {
        id: 'ac-15t-silver', finish: 'silver', name: 'ELIOS APEX SILVER', category: '1.5', ton: '1.5 Ton',
        color: 'Brushed Silver', image: silver15tImg, badge: 'Apex Silver Edition',
        description: 'Brushed silver for offices and open-plan rooms, with the same 12.6 EER rating as the rest of the 1.5 ton line.',
        specs: SPEC_15TON,
    },
    {
        id: 'ac-15t-white', finish: 'white', name: 'ELIOS ALPINE WHITE', category: '1.5', ton: '1.5 Ton',
        color: 'High-Gloss White', image: white15tImg, badge: 'Alpine Edition',
        description: 'High-gloss white, the classic. Full 1.5 ton output, WiFi, Eco and PKR modes, and a ten-year compressor warranty.',
        specs: SPEC_15TON,
    },
];

function Row({ label, value, lift }: { label: string; value: string; lift?: boolean }) {
    return (
        <div className="flex justify-between items-baseline gap-6 py-3.5 border-b border-edge">
            <span className="text-[13.5px] text-ink-dim">{label}</span>
            <span className={`text-[14px] num text-right ${lift ? 'text-brand-lift font-semibold' : ''}`}>{value}</span>
        </div>
    );
}

const CloseIcon = () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden="true">
        <path d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export default function Products() {
    const [params, setParams] = useSearchParams();
    const [category, setCategory] = useState<'all' | '1' | '1.5'>('all');
    const [selected, setSelected] = useState<Product | null>(null);
    const [booking, setBooking] = useState<Product | null>(null);
    const [tab, setTab] = useState<'outdoor' | 'indoor' | 'additional'>('outdoor');
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () =>
            setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // Arriving from the home-page ladder with ?finish=noir
    useEffect(() => {
        const finish = params.get('finish');
        if (!finish) return;
        const target = PRODUCTS.find((p) => p.finish === finish);
        if (!target) return;
        setCategory('all');
        requestAnimationFrame(() =>
            document.getElementById(`unit-${target.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        );
        params.delete('finish');
        setParams(params, { replace: true });
    }, [params, setParams]);

    // Both overlays close on Escape and lock the page behind them
    useEffect(() => {
        if (!selected && !booking) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key !== 'Escape') return;
            if (booking) setBooking(null);
            else setSelected(null);
        };
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [selected, booking]);

    const visible = category === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === category);

    const whatsAppLink = useCallback(
        (number: string, forceWeb: boolean) => {
            if (!booking) return '#';
            const clean = number.replace(/\s+/g, '').replace('+', '');
            const text = encodeURIComponent(
                `Hello Elios! I would like to book the ${booking.name} (${booking.ton}, Color: ${booking.color}). Please share the booking details.`
            );
            return forceWeb
                ? `https://web.whatsapp.com/send?phone=${clean}&text=${text}`
                : `https://api.whatsapp.com/send?phone=${clean}&text=${text}`;
        },
        [booking]
    );

    const jump = (finish: string) => {
        const target = PRODUCTS.find((p) => p.finish === finish);
        if (!target) return;
        setCategory('all');
        requestAnimationFrame(() =>
            document.getElementById(`unit-${target.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        );
    };

    return (
        <main className="w-full min-h-screen">

            <section className="pt-[136px] lg:pt-[168px] pb-14">
                <div className="wrap">
                    <Reveal>
                        <p className="kicker mb-7">The range · Five finishes</p>
                        <h1 className="display text-[2.5rem] sm:text-[3.5rem] lg:text-[4.5rem] max-w-[14ch]">
                            One machine, <span className="heavy">five finishes.</span>
                        </h1>
                        <p className="lede mt-7">
                            The same twin-rotary T3 inverter platform sits behind every panel below.
                            What changes is the surface it wears and whether it is sized at one ton
                            or one and a half.
                        </p>
                    </Reveal>
                </div>
            </section>

            <FinishLadder onSelect={jump} heading={false} />

            {/* Filter */}
            <section className="wrap pt-14 flex flex-wrap items-center gap-5 justify-between">
                <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by capacity">
                    {([
                        { key: 'all', label: 'All models' },
                        { key: '1', label: '1.0 ton' },
                        { key: '1.5', label: '1.5 ton' },
                    ] as const).map((t) => (
                        <button
                            key={t.key}
                            onClick={() => setCategory(t.key)}
                            aria-pressed={category === t.key}
                            className={`btn ${category === t.key ? 'btn-solid' : 'btn-line'}`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
                <p className="kicker" aria-live="polite">
                    {visible.length} {visible.length === 1 ? 'model' : 'models'}
                </p>
            </section>

            {/* Each unit gets a full row on its own field */}
            <div className="wrap pb-28">
                {visible.map((p, i) => {
                    const f = FIELDS[p.finish];
                    return (
                        <Reveal
                            key={p.id}
                            id={`unit-${p.id}`}
                            as="article"
                            className={`flex flex-col gap-10 lg:gap-16 items-center py-16 lg:py-24 border-b border-edge ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
                                }`}
                        >
                            <div
                                className="w-full lg:w-[44%] relative flex justify-center rounded-[18px] py-12 overflow-hidden border"
                                style={{
                                    background: f.ground,
                                    borderColor: `color-mix(in srgb, ${f.accent} 22%, transparent)`,
                                }}
                            >
                                <span
                                    className="absolute w-[62%] aspect-square rounded-full pointer-events-none"
                                    style={{ background: `radial-gradient(circle, color-mix(in srgb, ${f.accent} 24%, transparent) 0%, transparent 64%)` }}
                                    aria-hidden="true"
                                />
                                <img
                                    src={p.image}
                                    alt={`${p.name} — ${p.color}, ${p.ton}`}
                                    className="relative z-10 max-h-[260px] lg:max-h-[320px] w-auto object-contain"
                                    style={{ filter: `drop-shadow(0 28px 40px rgba(0,0,0,${isLight(f.ground) ? 0.3 : 0.65}))` }}
                                />
                            </div>

                            <div className="w-full lg:w-[52%]">
                                <div className="flex items-center gap-3 mb-5">
                                    <span className="w-8 h-[3px] rounded-full" style={{ background: f.unit }} aria-hidden="true" />
                                    <span className="kicker">{p.badge}</span>
                                </div>

                                <h2 className="display text-[1.75rem] sm:text-[2.25rem] lg:text-[2.75rem]">{p.name}</h2>
                                <p className="kicker mt-4">{p.ton} · {p.color}</p>
                                <p className="lede mt-6">{p.description}</p>

                                <div className="mt-8 border-t border-edge">
                                    <Row label="Cooling capacity" value={p.specs.outdoor.coolingCapacity} />
                                    <Row label="Efficiency" value={p.specs.outdoor.energyEfficiency} lift />
                                    <Row label="Rated input" value={p.specs.outdoor.powerInput} />
                                    <Row label="Compressor warranty" value={p.specs.warranty.compressor} />
                                </div>

                                <div className="flex flex-wrap gap-3 mt-9">
                                    <button onClick={() => { setSelected(p); setTab('outdoor'); }} className="btn btn-line">
                                        Full specification
                                    </button>
                                    <button
                                        onClick={() => setBooking(p)}
                                        className="btn btn-accent"
                                        style={{ ['--accent' as string]: f.accent, ['--on-accent' as string]: isLight(f.accent) ? '#06101F' : '#FFFFFF' }}
                                    >
                                        Book on WhatsApp
                                    </button>
                                </div>
                            </div>
                        </Reveal>
                    );
                })}
            </div>

            {/* Specification sheet */}
            {selected && (
                <div role="dialog" aria-modal="true" aria-label={`${selected.name} specification`}
                    className="fixed inset-0 z-100 flex items-end sm:items-center justify-center sm:p-6">
                    <div className="absolute inset-0 bg-ground/85 backdrop-blur-sm" onClick={() => setSelected(null)} />

                    <div className="relative card w-full max-w-2xl flex flex-col max-h-[92vh] sm:max-h-[88vh] anim-rise overflow-hidden">
                        <div className="flex-none p-7 sm:p-9 pb-0">
                            <div className="flex items-start justify-between gap-6">
                                <div>
                                    <p className="kicker mb-3">{selected.badge}</p>
                                    <h2 className="display text-[1.5rem] sm:text-[1.875rem]">{selected.name}</h2>
                                    <p className="kicker mt-3">{selected.ton} · {selected.color}</p>
                                </div>
                                <button onClick={() => setSelected(null)} aria-label="Close specification"
                                    className="flex-none w-10 h-10 grid place-items-center rounded-full border border-edge-strong text-ink-dim hover:text-ink hover:border-ink-soft transition-colors cursor-pointer">
                                    <CloseIcon />
                                </button>
                            </div>

                            <div className="flex gap-6 mt-8 border-b border-edge" role="tablist">
                                {([
                                    { key: 'outdoor', label: 'Outdoor' },
                                    { key: 'indoor', label: 'Indoor' },
                                    { key: 'additional', label: 'Features & warranty' },
                                ] as const).map((t) => (
                                    <button key={t.key} role="tab" aria-selected={tab === t.key} onClick={() => setTab(t.key)}
                                        className={`text-[11px] uppercase tracking-[0.18em] pb-3 -mb-px border-b-2 transition-colors cursor-pointer ${tab === t.key ? 'border-ink text-ink' : 'border-transparent text-ink-dim hover:text-ink-soft'
                                            }`}>
                                        {t.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto px-7 sm:px-9 py-5">
                            {tab === 'outdoor' && (
                                <>
                                    <Row label="Capacity" value={selected.specs.outdoor.capacity} />
                                    <Row label="Unit type" value={selected.specs.outdoor.type} />
                                    <Row label="Cooling capacity" value={selected.specs.outdoor.coolingCapacity} />
                                    <Row label="Heating capacity" value={selected.specs.outdoor.heatingCapacity} />
                                    <Row label="Compressor type" value={selected.specs.outdoor.compressorType} />
                                    <Row label="Inverter type" value={selected.specs.outdoor.inverterType} lift />
                                    <Row label="Power input" value={selected.specs.outdoor.powerInput} />
                                    <Row label="Rated current" value={selected.specs.outdoor.ratedCurrent} />
                                    <Row label="Energy efficiency (EER / COP)" value={selected.specs.outdoor.energyEfficiency} lift />
                                    <Row label="Refrigerant gas" value={selected.specs.outdoor.refrigerant} />
                                    <Row label="Gas charged" value={selected.specs.outdoor.gasCharged} />
                                    <Row label="Max operating temp (cooling)" value={selected.specs.outdoor.maxTempCooling} />
                                    <Row label="Min operating temp (heating)" value={selected.specs.outdoor.minTempHeating} />
                                    <Row label="Dimensions W × D × H"
                                        value={`${selected.specs.outdoor.dimensions.width} × ${selected.specs.outdoor.dimensions.depth} × ${selected.specs.outdoor.dimensions.height} mm`} />
                                    <Row label="Net weight" value={selected.specs.outdoor.netWeight} />
                                </>
                            )}

                            {tab === 'indoor' && (
                                <>
                                    <Row label="Air flow rate" value={selected.specs.indoor.airflow} />
                                    <Row label="Air swing" value={selected.specs.indoor.airSwing} />
                                    <Row label="Motor power" value={selected.specs.indoor.motorPower} />
                                    <Row label="Dimensions W × D × H"
                                        value={`${selected.specs.indoor.dimensions.width} × ${selected.specs.indoor.dimensions.depth} × ${selected.specs.indoor.dimensions.height} mm`} />
                                    <Row label="Weight" value={selected.specs.indoor.weight} />
                                </>
                            )}

                            {tab === 'additional' && (
                                <div className="flex flex-col gap-7">
                                    <div>
                                        <p className="kicker mb-3">Additional features</p>
                                        <Row label="WiFi function" value={selected.specs.additional.wifi} lift={selected.specs.additional.wifi === 'Yes'} />
                                        <Row label="App integration" value={selected.specs.additional.app} lift={selected.specs.additional.app === 'Yes'} />
                                        <Row label="Eco mode" value={selected.specs.additional.ecoMode} lift={selected.specs.additional.ecoMode === 'Yes'} />
                                        <Row label="PKR mode" value={selected.specs.additional.pkrMode} lift={selected.specs.additional.pkrMode === 'Yes'} />
                                    </div>
                                    <div>
                                        <p className="kicker mb-3">Official warranty</p>
                                        <Row label="Compressor" value={selected.specs.warranty.compressor} lift />
                                        <Row label="PCB" value={selected.specs.warranty.pcb} />
                                        <Row label="Parts" value={selected.specs.warranty.parts} />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex-none flex gap-3 p-7 sm:p-9 pt-5 border-t border-edge">
                            <button onClick={() => setSelected(null)} className="btn btn-line flex-1">Close</button>
                            <button onClick={() => { setBooking(selected); setSelected(null); }}
                                className="btn btn-accent flex-1"
                                style={{ ['--accent' as string]: 'var(--color-brand-lift)', ['--on-accent' as string]: '#06101F' }}>
                                Book on WhatsApp
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Booking */}
            {booking && (
                <div role="dialog" aria-modal="true" aria-label="WhatsApp booking"
                    className="fixed inset-0 z-110 flex items-end sm:items-center justify-center sm:p-6">
                    <div className="absolute inset-0 bg-ground/85 backdrop-blur-sm" onClick={() => setBooking(null)} />

                    <div className="relative card w-full max-w-lg p-7 sm:p-9 max-h-[92vh] overflow-y-auto anim-rise">
                        <div className="flex items-start justify-between gap-6 mb-7">
                            <div>
                                <p className="kicker mb-3">Book on WhatsApp</p>
                                <h2 className="display text-[1.375rem] sm:text-[1.625rem]">{booking.name}</h2>
                                <p className="kicker mt-3">{booking.ton} · {booking.color}</p>
                            </div>
                            <button onClick={() => setBooking(null)} aria-label="Close booking"
                                className="flex-none w-10 h-10 grid place-items-center rounded-full border border-edge-strong text-ink-dim hover:text-ink hover:border-ink-soft transition-colors cursor-pointer">
                                <CloseIcon />
                            </button>
                        </div>

                        <p className="text-[15px] leading-relaxed text-ink-soft mb-7">
                            Your message opens with the model, capacity, and finish already filled
                            in. Pick the line you would rather reach.
                        </p>

                        <div className="flex flex-col gap-4">
                            {HELPLINES.map((h) => (
                                <div key={h.number} className="rounded-xl border border-edge p-5 bg-ground-alt">
                                    <p className="kicker">{h.label}</p>
                                    <p className="display text-[1.25rem] mt-2 num">{h.number}</p>
                                    <p className="text-[13px] text-ink-dim mt-1.5">{h.description}</p>

                                    <div className="grid grid-cols-2 gap-3 mt-5">
                                        <a href={whatsAppLink(h.number, false)} target="_blank" rel="noopener noreferrer"
                                            onClick={() => setBooking(null)}
                                            className={isMobile ? 'btn btn-solid' : 'btn btn-line'}>
                                            App
                                        </a>
                                        <a href={whatsAppLink(h.number, true)} target="_blank" rel="noopener noreferrer"
                                            onClick={() => setBooking(null)}
                                            className={!isMobile ? 'btn btn-solid' : 'btn btn-line'}>
                                            Web
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button onClick={() => setBooking(null)} className="btn btn-line w-full mt-7">Cancel</button>
                    </div>
                </div>
            )}
        </main>
    );
}
