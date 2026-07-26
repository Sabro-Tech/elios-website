import { Link } from 'react-router-dom';
import Reveal from './Reveal';

const CAPABILITIES = [
    {
        accent: '#4E86E8',
        title: 'Live consumption',
        icon: 'M3 12h4l3 8 4-16 3 8h4',
        body: 'Volts, amps, current rupees and unit price, reported on the panel and in the app while the unit runs.',
    },
    {
        accent: '#63BACB',
        title: 'Inverter modulation',
        icon: 'M12 3v18M5 8l7-5 7 5M5 16l7 5 7-5',
        body: 'The compressor holds your target by taking out only the heat that came in — down to 440 W, without cycling hard.',
    },
    {
        accent: '#C79AC8',
        title: 'Smart heating cycles',
        icon: 'M12 2s5 5.5 5 10a5 5 0 01-10 0c0-4.5 5-10 5-10z',
        body: 'The geyser heats on a schedule you set rather than holding a tank hot around the clock.',
    },
];

export default function FeaturesIntro() {
    return (
        <section id="features" className="band band-alt">
            <div className="wrap">
                <Reveal className="flex flex-wrap justify-between items-end gap-8 mb-14">
                    <h2 className="display text-[2rem] sm:text-[2.75rem] lg:text-[3.5rem]">
                        What it <span className="heavy">actually does</span>
                    </h2>
                    <p className="lede max-w-[46ch]">
                        Three things the machine is doing while it runs — each one a number you can
                        read, not a claim you have to take on faith.
                    </p>
                </Reveal>

                <div className="grid md:grid-cols-3 gap-[18px]">
                    {CAPABILITIES.map((c, i) => (
                        <Reveal
                            key={c.title}
                            delay={i * 90}
                            className="card card-hover p-8 lg:p-9 flex flex-col group"
                        >
                            <span
                                className="w-[46px] h-[46px] rounded-full border grid place-items-center mb-7 transition-transform duration-600 group-hover:-rotate-6 group-hover:scale-105"
                                style={{ borderColor: '#2A2E34', color: c.accent }}
                            >
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
                                    strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d={c.icon} />
                                </svg>
                            </span>

                            <h3 className="text-[19px] font-semibold tracking-tight mb-3">{c.title}</h3>
                            <p className="text-[14.5px] leading-relaxed text-ink-soft mb-6">{c.body}</p>

                            <Link
                                to="/#app"
                                className="mt-auto inline-flex items-center gap-2 text-[11.5px] uppercase tracking-[0.16em]"
                                style={{ color: c.accent }}
                            >
                                Learn more
                                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor"
                                    strokeWidth={2} className="transition-transform duration-500 group-hover:translate-x-1.5" aria-hidden="true">
                                    <path d="M5 12h14M13 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
