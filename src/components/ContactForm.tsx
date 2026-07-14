import { useState, useRef } from 'react';
import { apiFetch } from '../services/api';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        countryCode: '+92',
        message: '',
        rating: 0
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [hoverRating, setHoverRating] = useState(0);
    const formRef = useRef<HTMLFormElement>(null);

    const countryCodes = [
        { code: '+92', name: 'PK' },
        { code: '+1', name: 'US' },
        { code: '+44', name: 'UK' },
        { code: '+91', name: 'IN' },
        { code: '+971', name: 'AE' },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.rating === 0) {
            setMessage({ type: 'error', text: 'Please provide a rating.' });
            return;
        }

        setIsSubmitting(true);
        setMessage(null);

        try {
            await apiFetch('/contact', {
                method: 'POST',
                withAuth: false,
                body: formData
            });

            setMessage({ type: 'success', text: 'Message sent successfully! We will contact you soon.' });
            setFormData({ name: '', email: '', phone: '', countryCode: '+92', message: '', rating: 0 });
            if (formRef.current) formRef.current.reset();
        } catch (error) {
            console.error('Error submitting form:', error);
            setMessage({ type: 'error', text: 'Failed to send message. Please try again later.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="w-full bg-white py-32 px-6 relative overflow-hidden">
            <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-16 items-start">

                {/* Left Side: Info */}
                <div className="w-full md:w-[40%] flex flex-col gap-8">
                    <div className="animate-fade-in-up">
                        <span className="text-brand-blue font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Get In Touch</span>
                        <h2 className="font-heading font-black text-5xl md:text-6xl text-brand-blue uppercase leading-tight">
                            Let's Connect
                        </h2>
                        <div className="h-1.5 w-20 bg-brand-blue mt-6 rounded-full"></div>
                    </div>

                    <p className="font-questrial text-xl text-gray-600 leading-relaxed animate-fade-in-up [animation-delay:200ms]">
                        Have questions about our smart solutions? Our core team is ready to assist you with technical inquiries or support.
                    </p>

                    <div className="flex flex-col gap-6 mt-4 animate-fade-in-up [animation-delay:400ms]">
                        <div className="flex items-center gap-6 group">
                            <div className="w-14 h-14 bg-brand-blue/5 rounded-2xl flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">Email Us</p>
                                <p className="text-brand-blue font-bold text-lg">support@elios.com.pk</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 group">
                            <div className="w-14 h-14 bg-brand-blue/5 rounded-2xl flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">Call Us</p>
                                <p className="text-brand-blue font-bold text-lg">+92 321 8548557</p>
                                <p className="text-brand-blue font-bold text-lg">+92 324 8250610</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="w-full md:w-[60%] animate-fade-in-up [animation-delay:200ms]">
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-premium border border-gray-100">
                        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.name}
                                        placeholder="John Doe"
                                        className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-transparent focus:border-brand-blue/30 focus:bg-white focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-medium text-brand-blue"
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                                    <input
                                        required
                                        type="email"
                                        value={formData.email}
                                        placeholder="john@example.com"
                                        className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-transparent focus:border-brand-blue/30 focus:bg-white focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-medium text-brand-blue"
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-gray-500 uppercase tracking-widest ml-1">Phone Number</label>
                                <div className="flex gap-4">
                                    <select
                                        value={formData.countryCode}
                                        className="h-14 px-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-bold text-brand-blue appearance-none cursor-pointer"
                                        onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                                    >
                                        {countryCodes.map(c => (
                                            <option key={c.code} value={c.code}>{c.name} {c.code}</option>
                                        ))}
                                    </select>
                                    <input
                                        required
                                        type="tel"
                                        value={formData.phone}
                                        placeholder="300 1234567"
                                        className="flex-1 h-14 px-6 rounded-2xl bg-gray-50 border-transparent focus:border-brand-blue/30 focus:bg-white focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-medium text-brand-blue"
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-gray-500 uppercase tracking-widest ml-1">Message</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.message}
                                    placeholder="Tell us how we can help..."
                                    className="w-full p-6 rounded-2xl bg-gray-50 border-transparent focus:border-brand-blue/30 focus:bg-white focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-medium text-brand-blue resize-none"
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                ></textarea>
                            </div>

                            {/* Enhanced Star Rating */}
                            <div className="flex flex-col items-center md:items-start gap-4 p-6 bg-brand-blue/5 rounded-3xl border border-brand-blue/10">
                                <label className="text-sm font-black text-brand-blue uppercase tracking-[0.2em]">Rate Your Interest</label>
                                <div className="flex gap-3">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, rating: star })}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                            className="transition-all duration-300 transform hover:scale-125 focus:outline-none"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill={(hoverRating || formData.rating) >= star ? '#1E4186' : 'transparent'}
                                                stroke="#1E4186"
                                                strokeWidth={1.5}
                                                className="w-10 h-10 transition-colors"
                                            >
                                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    ))}
                                </div>
                                <span className="text-xs font-bold text-brand-blue/60 uppercase tracking-widest h-4">
                                    {hoverRating === 1 && "Just Browsing"}
                                    {hoverRating === 2 && "Interested"}
                                    {hoverRating === 3 && "Planning to Buy"}
                                    {hoverRating === 4 && "Urgent Need"}
                                    {hoverRating === 5 && "Brand Enthusiast!"}
                                    {!hoverRating && formData.rating > 0 && "Selected"}
                                </span>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-16 rounded-2xl bg-brand-blue text-white font-black text-lg uppercase tracking-[0.2em] shadow-premium hover:bg-brand-blue-dark transition-all disabled:opacity-70 disabled:cursor-not-allowed group flex items-center justify-center gap-3 relative overflow-hidden"
                            >
                                {isSubmitting ? (
                                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        Send Message
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-2 transition-transform">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                        </svg>
                                    </>
                                )}
                            </button>

                            {message && (
                                <div className={`p-4 rounded-2xl text-center font-bold animate-fade-in-up ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-green-100'}`}>
                                    {message.text}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
