import { useState, useRef } from 'react';
import { apiFetch } from '../services/api';
import Reveal from './Reveal';

const COUNTRY_CODES = [
    { code: '+92', name: 'PK' },
    { code: '+1', name: 'US' },
    { code: '+44', name: 'UK' },
    { code: '+91', name: 'IN' },
    { code: '+971', name: 'AE' },
];

const INTEREST: Record<number, string> = {
    1: 'Just browsing',
    2: 'Interested',
    3: 'Planning to buy',
    4: 'Urgent need',
    5: 'Brand enthusiast',
};

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        countryCode: '+92',
        message: '',
        rating: 0,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [hoverRating, setHoverRating] = useState(0);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.rating === 0) {
            setMessage({
                type: 'error',
                text: 'Pick an interest level below before sending — it tells us how quickly to come back to you.',
            });
            return;
        }

        setIsSubmitting(true);
        setMessage(null);

        try {
            await apiFetch('/contact', { method: 'POST', withAuth: false, body: formData });
            setMessage({ type: 'success', text: 'Sent. We will come back to you on the number or email you gave us.' });
            setFormData({ name: '', email: '', phone: '', countryCode: '+92', message: '', rating: 0 });
            formRef.current?.reset();
        } catch (error) {
            console.error('Error submitting form:', error);
            setMessage({
                type: 'error',
                text: 'That did not send. Check your connection and try again, or call +92 321 8548557.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const shown = hoverRating || formData.rating;

    return (
        <section id="contact" className="band">
            <div className="wrap grid lg:grid-cols-[.85fr_1.15fr] gap-12 lg:gap-20 items-start">

                <Reveal>
                    <p className="kicker mb-6">Get in touch</p>
                    <h2 className="display text-[2rem] sm:text-[2.75rem] lg:text-[3.25rem]">
                        Ask us <span className="block heavy">anything.</span>
                    </h2>
                    <p className="lede mt-7">
                        Sizing a room, choosing between one and one-and-a-half ton, or checking
                        whether we cover your city — send it over and a person will answer.
                    </p>

                    <dl className="mt-12">
                        <div className="flex flex-col gap-1.5 py-5 border-t border-edge">
                            <dt className="kicker">Email</dt>
                            <dd>
                                <a href="mailto:support@elios.com.pk" className="text-[17px] hover:text-brand-lift transition-colors break-all">
                                    support@elios.com.pk
                                </a>
                            </dd>
                        </div>
                        <div className="flex flex-col gap-1.5 py-5 border-t border-edge">
                            <dt className="kicker">Telephone</dt>
                            <dd className="flex flex-col gap-1">
                                <a href="tel:+923218548557" className="text-[17px] num hover:text-brand-lift transition-colors">+92 321 8548557</a>
                                <a href="tel:+923248250610" className="text-[17px] num hover:text-brand-lift transition-colors">+92 324 8250610</a>
                            </dd>
                        </div>
                    </dl>
                </Reveal>

                <Reveal delay={120} className="w-full">
                    <form ref={formRef} onSubmit={handleSubmit} className="card p-7 sm:p-10 flex flex-col gap-6" noValidate>
                        <div className="grid sm:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-2.5">
                                <label htmlFor="cf-name" className="field-label">Full name</label>
                                <input id="cf-name" required type="text" autoComplete="name" placeholder="Your name"
                                    className="field" value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div className="flex flex-col gap-2.5">
                                <label htmlFor="cf-email" className="field-label">Email address</label>
                                <input id="cf-email" required type="email" autoComplete="email" placeholder="you@example.com"
                                    className="field" value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2.5">
                            <label htmlFor="cf-phone" className="field-label">Phone number</label>
                            <div className="flex gap-3">
                                <select aria-label="Country code" value={formData.countryCode} className="field w-auto"
                                    onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}>
                                    {COUNTRY_CODES.map((c) => (
                                        <option key={c.code} value={c.code}>{c.name} {c.code}</option>
                                    ))}
                                </select>
                                <input id="cf-phone" required type="tel" autoComplete="tel" placeholder="300 1234567"
                                    className="field flex-1 num" value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2.5">
                            <label htmlFor="cf-message" className="field-label">Message</label>
                            <textarea id="cf-message" required rows={5}
                                placeholder="Which unit are you looking at, and how big is the room?"
                                className="field resize-y" value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                        </div>

                        <fieldset className="border-t border-edge pt-6">
                            <legend className="field-label">How soon are you deciding?</legend>
                            <div className="flex items-center gap-4 mt-4 flex-wrap">
                                <div className="flex gap-1.5" onMouseLeave={() => setHoverRating(0)}>
                                    {[1, 2, 3, 4, 5].map((n) => (
                                        <button
                                            key={n}
                                            type="button"
                                            aria-label={INTEREST[n]}
                                            aria-pressed={formData.rating === n}
                                            onClick={() => setFormData({ ...formData, rating: n })}
                                            onMouseEnter={() => setHoverRating(n)}
                                            onFocus={() => setHoverRating(n)}
                                            onBlur={() => setHoverRating(0)}
                                            className="w-9 h-11 flex items-end justify-center cursor-pointer group"
                                        >
                                            <span
                                                className={`w-full rounded-sm transition-all duration-300 ${shown >= n ? 'bg-brand-lift' : 'bg-edge-strong group-hover:bg-ink-dim'
                                                    }`}
                                                style={{ height: `${28 + n * 10}%` }}
                                            />
                                        </button>
                                    ))}
                                </div>
                                <span className="kicker" aria-live="polite">{shown ? INTEREST[shown] : 'Not set'}</span>
                            </div>
                        </fieldset>

                        <button type="submit" disabled={isSubmitting} className="btn btn-accent w-full py-4"
                            style={{ ['--accent' as string]: 'var(--color-brand-lift)', ['--on-accent' as string]: '#06101F' }}>
                            {isSubmitting ? 'Sending…' : 'Send message'}
                        </button>

                        {message && (
                            <p role="status"
                                className={`text-[15px] leading-relaxed border rounded-xl px-5 py-4 ${message.type === 'success'
                                    ? 'text-signal-good border-signal-good/40 bg-signal-good/8'
                                    : 'text-signal-bad border-signal-bad/40 bg-signal-bad/8'
                                    }`}>
                                {message.text}
                            </p>
                        )}
                    </form>
                </Reveal>
            </div>
        </section>
    );
}
