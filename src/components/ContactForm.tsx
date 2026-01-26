import { useState } from 'react';

const countryCodes = [
    { code: '+92', name: 'Pakistan' },
    { code: '+1', name: 'USA' },
    { code: '+44', name: 'UK' },
    { code: '+971', name: 'UAE' },
    { code: '+966', name: 'Saudi Arabia' },
];

export default function ContactForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        countryCode: '+92',
        message: ''
    });

    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.message.trim()) newErrors.message = 'Message is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            console.log('Form Submitted:', { ...formData, rating });
            setIsSubmitted(true);
            // In a real app, you'd send this to a backend/firebase
        }
    };

    return (
        <section className="w-full bg-white py-24 px-6">
            <div className="max-w-[800px] mx-auto">
                {/* Title */}
                <h2 className="font-heading font-bold text-[40px] md:text-[50px] text-[#1e4186] mb-12 text-center md:text-left">
                    Get in Touch
                </h2>

                {isSubmitted ? (
                    <div className="bg-blue-50 p-8 rounded-2xl text-center">
                        <h3 className="text-2xl font-bold text-[#1e4186] mb-4">Thank You!</h3>
                        <p className="text-blue-900">Your message has been sent successfully. We'll get back to you shortly.</p>
                        <button
                            onClick={() => setIsSubmitted(false)}
                            className="mt-6 text-blue-600 font-bold hover:underline"
                        >
                            Send another message
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                        {/* Row 1: Names */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex flex-col gap-2">
                                <label className="font-questrial font-bold text-black px-2">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="Enter your first name"
                                    className={`bg-[#f3f4f6] text-[#1e4186] placeholder:text-[#1e4186]/50 px-6 py-4 rounded-xl outline-none border-2 transition-all font-questrial
                                        ${errors.firstName ? 'border-red-400' : 'border-transparent focus:border-[#1e4186]/30'}`}
                                />
                                {errors.firstName && <span className="text-red-500 text-sm px-2">{errors.firstName}</span>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-questrial font-bold text-black px-2">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Enter your last name"
                                    className={`bg-[#f3f4f6] text-[#1e4186] placeholder:text-[#1e4186]/50 px-6 py-4 rounded-xl outline-none border-2 transition-all font-questrial
                                        ${errors.lastName ? 'border-red-400' : 'border-transparent focus:border-[#1e4186]/30'}`}
                                />
                                {errors.lastName && <span className="text-red-500 text-sm px-2">{errors.lastName}</span>}
                            </div>
                        </div>

                        {/* Row 2: Email & Phone */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex flex-col gap-2">
                                <label className="font-questrial font-bold text-black px-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter your email"
                                    className={`bg-[#f3f4f6] text-[#1e4186] placeholder:text-[#1e4186]/50 px-6 py-4 rounded-xl outline-none border-2 transition-all font-questrial
                                        ${errors.email ? 'border-red-400' : 'border-transparent focus:border-[#1e4186]/30'}`}
                                />
                                {errors.email && <span className="text-red-500 text-sm px-2">{errors.email}</span>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-questrial font-bold text-black px-2">Phone</label>
                                <div className="flex gap-2">
                                    <select
                                        name="countryCode"
                                        value={formData.countryCode}
                                        onChange={handleInputChange}
                                        className="bg-[#f3f4f6] text-[#1e4186] px-4 py-4 rounded-xl outline-none border-2 border-transparent focus:border-[#1e4186]/30 font-questrial w-[100px]"
                                    >
                                        {countryCodes.map(c => (
                                            <option key={c.code} value={c.code}>{c.code}</option>
                                        ))}
                                    </select>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="Enter your phone number"
                                        className={`flex-1 bg-[#f3f4f6] text-[#1e4186] placeholder:text-[#1e4186]/50 px-6 py-4 rounded-xl outline-none border-2 transition-all font-questrial
                                            ${errors.phone ? 'border-red-400' : 'border-transparent focus:border-[#1e4186]/30'}`}
                                    />
                                </div>
                                {errors.phone && <span className="text-red-500 text-sm px-2">{errors.phone}</span>}
                            </div>
                        </div>

                        {/* Row 3: Message */}
                        <div className="flex flex-col gap-2">
                            <label className="font-questrial font-bold text-black px-2">Write a Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                placeholder="Send us a message"
                                rows={5}
                                className={`bg-[#f3f4f6] text-[#1e4186] placeholder:text-[#1e4186]/50 px-6 py-4 rounded-xl outline-none border-2 transition-all font-questrial resize-none
                                    ${errors.message ? 'border-red-400' : 'border-transparent focus:border-[#1e4186]/30'}`}
                            />
                            {errors.message && <span className="text-red-500 text-sm px-2">{errors.message}</span>}
                        </div>

                        {/* Row 4: Rating */}
                        <div className="flex flex-col gap-4">
                            <label className="font-questrial font-bold text-black px-2">Rate Your Experience With Us</label>
                            <div className="flex gap-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        onClick={() => setRating(star)}
                                        className="transition-transform hover:scale-110 active:scale-95"
                                    >
                                        <svg
                                            width="40"
                                            height="40"
                                            viewBox="0 0 24 24"
                                            fill={star <= (hoverRating || rating) ? "#1e4186" : "none"}
                                            stroke="#1e4186"
                                            strokeWidth="1.5"
                                            className="transition-colors duration-200"
                                        >
                                            <path d="M12 1.5l3.09 6.26L22 8.74l-5 4.87 1.18 6.89L12 17.25l-6.18 3.25L7 13.61l-5-4.87 6.91-1l3.09-6.26z" />
                                        </svg>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Row 5: Submit */}
                        <button
                            type="submit"
                            className="bg-[#1e4186] text-white font-questrial py-4 px-10 rounded-full text-xl font-bold hover:bg-[#152e60] transition-all transform active:scale-95 shadow-lg mt-4"
                        >
                            Submit
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
}
