/**
 * Every line below is a published Elios spec. Nothing here is marketing
 * filler, and nothing may be added that the spec sheet does not support.
 */
const FACTS = [
    'Twin-Rotary T3 Inverter',
    '12.6 EER / 3.71 COP',
    'R410A Refrigerant',
    'Rated to 50°C Ambient',
    '10-Year Compressor Warranty',
    'WiFi + App Control',
    'Eco Mode',
    'PKR Price Mode',
    'Made in Pakistan',
];

function Track({ hidden }: { hidden?: boolean }) {
    return (
        <div className="mq-track" aria-hidden={hidden || undefined}>
            {FACTS.map((f) => (
                <span className="mq-item" key={f}>
                    <b>{f}</b>
                    <span className="w-1 h-1 rounded-full bg-edge-strong" />
                </span>
            ))}
        </div>
    );
}

export default function Marquee() {
    return (
        <div className="marquee" role="region" aria-label="Elios specifications">
            <Track />
            <Track hidden />
        </div>
    );
}
