import { FIELDS, isLight } from '../theme/fields';
import Reveal from './Reveal';
import flower1tImg from '../assets/1ton-flower-nobg-hero.png';
import grey1tImg from '../assets/1ton-grey-nobg-hero.png';
import black15tImg from '../assets/1_5ton-black-nobg-hero.png';
import silver15tImg from '../assets/1_5ton-silver-nobg-hero.png';
import white15tImg from '../assets/1_5ton-white-nobg-hero.png';

export const RUNGS = [
    { key: 'blossom', name: 'Blossom Edition', colour: 'Floral Art', ton: '1.0 Ton', img: flower1tImg },
    { key: 'grey', name: 'Minima Grey', colour: 'Metallic Grey', ton: '1.0 Ton', img: grey1tImg },
    { key: 'noir', name: 'Noir Pro', colour: 'Matte Black', ton: '1.5 Ton', img: black15tImg },
    { key: 'silver', name: 'Apex Silver', colour: 'Brushed Silver', ton: '1.5 Ton', img: silver15tImg },
    { key: 'white', name: 'Alpine White', colour: 'High-Gloss White', ton: '1.5 Ton', img: white15tImg },
] as const;

interface Props {
    /** where a rung navigates to; omit to render it as a static index */
    onSelect?: (key: string) => void;
    heading?: boolean;
}

/**
 * Each rung carries the field derived from the finish standing on it — which
 * is why the Noir Pro card is light while the rest are dark.
 */
export default function FinishLadder({ onSelect, heading = true }: Props) {
    return (
        <section id="range" className="band">
            <div className="wrap">
                {heading && (
                    <Reveal className="flex flex-wrap justify-between items-end gap-8 mb-14">
                        <h2 className="display text-[2rem] sm:text-[2.75rem] lg:text-[3.5rem]">
                            One machine,
                            <span className="block heavy">five finishes.</span>
                        </h2>
                        <p className="lede max-w-[46ch]">
                            The same twin-rotary T3 platform sits behind every panel. Each field
                            below is tinted from the finish standing on it.
                        </p>
                    </Reveal>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                    {RUNGS.map((r, i) => {
                        const f = FIELDS[r.key];
                        const light = isLight(f.ground);
                        const Tag = onSelect ? 'button' : 'div';
                        return (
                            <Reveal key={r.key} delay={i * 80}>
                                <Tag
                                    {...(onSelect
                                        ? { onClick: () => onSelect(r.key), 'aria-label': `${r.name} — see details` }
                                        : {})}
                                    className={`group relative w-full h-full overflow-hidden rounded-[18px] border px-5 pt-9 pb-6 flex flex-col items-center gap-5 min-h-[380px] transition-transform duration-700 hover:-translate-y-2 ${onSelect ? 'cursor-pointer text-left' : ''
                                        }`}
                                    style={{
                                        background: f.ground,
                                        borderColor: `color-mix(in srgb, ${f.accent} 24%, transparent)`,
                                    }}
                                >
                                    <span
                                        className="absolute -left-1/4 top-[8%] w-[150%] aspect-square rounded-full pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity duration-700"
                                        style={{ background: `radial-gradient(circle, color-mix(in srgb, ${f.accent} 26%, transparent) 0%, transparent 62%)` }}
                                        aria-hidden="true"
                                    />

                                    <img
                                        src={r.img}
                                        alt={`Elios ${r.name}`}
                                        className="relative z-10 h-[150px] w-auto object-contain transition-transform duration-700 group-hover:scale-105 group-hover:-translate-y-1"
                                        style={{ filter: `drop-shadow(0 20px 30px rgba(0,0,0,${light ? 0.3 : 0.6}))` }}
                                    />

                                    <span className="relative z-10 mt-auto text-center block">
                                        <span className="block text-[14px] font-semibold mb-1.5" style={{ color: f.ink }}>
                                            {r.name}
                                        </span>
                                        <span className="block text-[10.5px] uppercase tracking-[0.18em]" style={{ color: f.accent }}>
                                            {r.colour}
                                        </span>
                                        <span
                                            className="block text-[10.5px] uppercase tracking-[0.18em] mt-1.5"
                                            style={{ color: `color-mix(in srgb, ${f.ink} 45%, transparent)` }}
                                        >
                                            {r.ton}
                                        </span>
                                    </span>
                                </Tag>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
