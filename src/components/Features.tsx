import Reveal from './Reveal';
import { APP_FIELD } from '../theme/fields';
import appMain from '../assets/feature1-geyser.png';
import appData from '../assets/feature3-ac.png';
import appPrice from '../assets/feature2-ac.png';

const PLAY_STORE =
    'https://play.google.com/store/apps/details?id=com.sabro.accontroller&pcampaignid=web_share';

/**
 * The Android app measured #214FB7 / #1877D2, so this section's field is navy.
 * The main-screen capture is a full-length portrait (much taller than the two
 * angled renders) and gets its own column so it shows uncropped.
 */
export default function Features() {
    return (
        <section
            id="app"
            className="relative overflow-hidden py-[clamp(80px,11vw,150px)]"
            style={{
                background: `radial-gradient(120% 90% at 82% 12%, #123A86 0%, transparent 58%),
                     radial-gradient(90% 80% at 8% 92%, #0B2560 0%, transparent 60%),
                     ${APP_FIELD.ground}`,
            }}
        >
            {/* A faint instrument grid, masked so it never reaches the edges */}
            <div
                className="absolute inset-0 pointer-events-none"
                aria-hidden="true"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(110,155,240,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(110,155,240,.08) 1px, transparent 1px)',
                    backgroundSize: '74px 74px',
                    maskImage: 'radial-gradient(70% 60% at 50% 40%, #000 0%, transparent 78%)',
                    WebkitMaskImage: 'radial-gradient(70% 60% at 50% 40%, #000 0%, transparent 78%)',
                }}
            />

            <div className="wrap relative">
                <Reveal className="flex flex-wrap justify-between items-end gap-8 mb-14">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] mb-6" style={{ color: APP_FIELD.pale }}>
                            The Elios app
                        </p>
                        <h2 className="display text-[2rem] sm:text-[2.75rem] lg:text-[3.5rem] max-w-[16ch]">
                            Watch the cost
                            <span className="block heavy">as it happens.</span>
                        </h2>
                    </div>
                    <p className="lede max-w-[46ch]" style={{ color: '#B6CBF0' }}>
                        Volts, amps, current rupees, target rupees, unit price. The app puts the
                        meter on your phone, so the running cost stops being a surprise at the end
                        of the month.
                    </p>
                </Reveal>

                <div className="grid lg:grid-cols-2 gap-[22px] items-start">
                    <Reveal className="rounded-[20px] overflow-hidden pt-7 px-5 border transition-transform duration-700 hover:-translate-y-2.5"
                        style={{
                            background: 'linear-gradient(180deg, rgba(110,155,240,.13), rgba(110,155,240,.03))',
                            borderColor: 'rgba(122,162,240,.22)',
                        }}>
                        <p className="text-[11px] uppercase tracking-[0.2em] mb-4" style={{ color: APP_FIELD.pale }}>
                            01 — Main screen
                        </p>
                        <img
                            src={appMain}
                            alt="The Elios app main screen, showing target temperature, tank temperature and connection status"
                            className="w-full h-auto -mb-px"
                            style={{ filter: 'drop-shadow(0 26px 40px rgba(0,0,0,.55))' }}
                        />
                    </Reveal>

                    <div className="flex flex-col gap-[22px]">
                        {[
                            { n: '02 — Data screen', src: appData, alt: 'The Elios app data screen, showing live volts, amps and energy cost' },
                            { n: '03 — Price mode', src: appPrice, alt: 'The Elios app price mode, choosing an operating mode and comfort temperature' },
                        ].map((p, i) => (
                            <Reveal
                                key={p.n}
                                delay={100 + i * 90}
                                className="rounded-[20px] overflow-hidden pt-7 px-5 border transition-transform duration-700 hover:-translate-y-2.5"
                                style={{
                                    background: 'linear-gradient(180deg, rgba(110,155,240,.13), rgba(110,155,240,.03))',
                                    borderColor: 'rgba(122,162,240,.22)',
                                }}
                            >
                                <p className="text-[11px] uppercase tracking-[0.2em] mb-4" style={{ color: APP_FIELD.pale }}>
                                    {p.n}
                                </p>
                                <img
                                    src={p.src}
                                    alt={p.alt}
                                    className="w-full h-auto -mb-px"
                                    style={{ filter: 'drop-shadow(0 26px 40px rgba(0,0,0,.55))' }}
                                />
                            </Reveal>
                        ))}
                    </div>
                </div>

                <Reveal delay={220} className="mt-14">
                    <a
                        href={PLAY_STORE}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-accent"
                        style={{ ['--accent' as string]: APP_FIELD.accent, ['--on-accent' as string]: '#FFFFFF' }}
                    >
                        Get it on Google Play
                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
                            <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </a>
                </Reveal>
            </div>
        </section>
    );
}
