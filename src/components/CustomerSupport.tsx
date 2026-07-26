import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import acBrochure from '../assets/Elios AC Brochure.pdf';
import geyserBrochure from '../assets/Elios Geyser Brochure.pdf';
import acManual from '../assets/Elios AC User Manual.pdf';
import geyserManualUrdu from '../assets/Elios Geyser User Manual - Urdu.pdf';
import geyserManualEnglish from '../assets/Elios Geyser User Manual - English.pdf';

/** 1.5 ton line, straight off the published spec sheet. */
const SPEC: [string, string][] = [
    ['Cooling capacity', '18,000 BTU'],
    ['Efficiency', '12.6 EER / 3.71 COP'],
    ['Rated input', '1,428 W'],
    ['Airflow', '850 m³/hr'],
    ['Refrigerant', 'R410A · 1.20 Kg'],
    ['Compressor warranty', '10 Years'],
];

const DOCS = [
    { href: acManual, title: 'Air Conditioner User Manual', kind: 'Manual', lang: 'English' },
    { href: geyserManualEnglish, title: 'Water Geyser User Manual', kind: 'Manual', lang: 'English' },
    { href: geyserManualUrdu, title: 'واٹر گیزر یوزر مینوئل', kind: 'Manual', lang: 'اردو', rtl: true },
    { href: acBrochure, title: 'Air Conditioner Brochure', kind: 'Brochure', lang: 'English' },
    { href: geyserBrochure, title: 'Water Geyser Brochure', kind: 'Brochure', lang: 'English' },
];

const DownloadIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth={1.4}
        className="flex-none opacity-45 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0.5" aria-hidden="true">
        <path d="M12 3v13.5m0 0l4.5-4.5M12 16.5L7.5 12M3 20.25h18" />
    </svg>
);

export default function CustomerSupport() {
    return (
        <section id="support" className="band band-alt">
            <div className="wrap">
                <Reveal className="mb-14">
                    <h2 className="display text-[2rem] sm:text-[2.75rem] lg:text-[3.5rem]">
                        The numbers,
                        <span className="block heavy">and the paperwork.</span>
                    </h2>
                </Reveal>

                <div className="grid lg:grid-cols-2 gap-10 lg:gap-[70px] items-start">
                    <Reveal>
                        <p className="kicker mb-6">1.5 Ton — published specification</p>
                        <dl className="border-t border-edge">
                            {SPEC.map(([k, v]) => (
                                <div key={k} className="flex justify-between items-baseline gap-6 py-4 border-b border-edge">
                                    <dt className="text-[14.5px] text-ink-soft">{k}</dt>
                                    <dd className="text-[14.5px] num text-right">{v}</dd>
                                </div>
                            ))}
                        </dl>
                        <Link to="/products" className="btn btn-line mt-8">See the full range</Link>
                    </Reveal>

                    <Reveal delay={120}>
                        <p className="kicker mb-6">Manuals &amp; brochures</p>
                        <ul className="border-t border-edge">
                            {DOCS.map((d) => (
                                <li key={d.href + d.lang}>
                                    <a
                                        href={d.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        dir={d.rtl ? 'rtl' : undefined}
                                        className="group flex items-center justify-between gap-5 py-5 px-1 border-b border-edge hover:bg-card hover:px-3.5 transition-all duration-500"
                                    >
                                        <span className="min-w-0">
                                            <span className="block text-[15px] truncate">{d.title}</span>
                                            <span className="block text-[10.5px] uppercase tracking-[0.18em] text-ink-dim mt-1.5">
                                                {d.kind} · {d.lang}
                                            </span>
                                        </span>
                                        <DownloadIcon />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                </div>

                {/* Owner CTA */}
                <Reveal delay={200} className="mt-16 lg:mt-24">
                    <div
                        className="relative overflow-hidden rounded-[24px] border border-edge-strong px-7 sm:px-12 lg:px-[72px] py-12 lg:py-[88px]"
                        style={{
                            background:
                                'radial-gradient(90% 130% at 88% 10%, #1B3E86 0%, transparent 56%), linear-gradient(120deg, #0D1013 0%, #14181D 100%)',
                        }}
                    >
                        <p className="kicker mb-6">Owner support</p>
                        <h3 className="display text-[1.75rem] sm:text-[2.5rem] lg:text-[3rem] max-w-[15ch]">
                            Register it. <span className="heavy">Then forget it.</span>
                        </h3>
                        <p className="lede mt-6 mb-9">
                            Register your warranty once and the record sits with us — no receipt to
                            lose, no card to find three years from now when the compressor needs
                            looking at.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Link to="/support" className="btn btn-solid">Open the support desk</Link>
                            <Link to="/support" className="btn btn-line">File a complaint</Link>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
