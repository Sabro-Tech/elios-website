import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import navbarLogo from '../assets/elios-navbar.png';
import { getFriendlyAuthError } from '../utils/authErrors';

export default function Signup() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        city: '',
        address: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (Object.values(formData).some(val => !val)) {
            setError('Please fill in all fields.');
            return;
        }
        setError('');
        setLoading(true);
        try {
            await signup(formData.email, formData.password, {
                firstname: formData.firstName,
                lastname: formData.lastName,
                phone: formData.phone,
                city: formData.city,
                address: formData.address,
                role: 'user'
            });
            navigate('/support');
        } catch (err: any) {
            setError(getFriendlyAuthError(err.code || err.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 lg:p-12 relative overflow-hidden bg-[#1E4186]">
            {/* Animated Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/10 blur-[120px] rounded-full animate-float"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/10 blur-[150px] rounded-full animate-float [animation-delay:2s]"></div>

            {/* Logo Area */}
            <Link to="/" className="mb-10 animate-fade-in-up">
                <img
                    src={navbarLogo}
                    alt="Elios Logo"
                    className="h-10 w-auto brightness-0 invert"
                />
            </Link>

            {/* Signup Card */}
            <div className="w-full max-w-2xl glass-card p-8 md:p-12 rounded-[2.5rem] animate-fade-in-up [animation-delay:200ms] overflow-y-auto max-h-[90vh] custom-scrollbar">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-heading font-black text-brand-blue uppercase tracking-tight">Create Account</h1>
                    <p className="text-gray-500 font-questrial mt-2">Join the Elios smart community</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-black text-brand-blue uppercase tracking-[0.2em] ml-1">First Name</label>
                            <input
                                name="firstName"
                                type="text"
                                placeholder="John"
                                className="w-full h-14 px-6 rounded-2xl bg-white border-transparent focus:border-brand-blue/30 focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-medium text-brand-blue"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-black text-brand-blue uppercase tracking-[0.2em] ml-1">Last Name</label>
                            <input
                                name="lastName"
                                type="text"
                                placeholder="Doe"
                                className="w-full h-14 px-6 rounded-2xl bg-white border-transparent focus:border-brand-blue/30 focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-medium text-brand-blue"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-black text-brand-blue uppercase tracking-[0.2em] ml-1">Email Address</label>
                            <input
                                name="email"
                                type="email"
                                placeholder="john@example.com"
                                className="w-full h-14 px-6 rounded-2xl bg-white border-transparent focus:border-brand-blue/30 focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-medium text-brand-blue"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-black text-brand-blue uppercase tracking-[0.2em] ml-1">Phone Number</label>
                            <input
                                name="phone"
                                type="tel"
                                placeholder="0300 1234567"
                                className="w-full h-14 px-6 rounded-2xl bg-white border-transparent focus:border-brand-blue/30 focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-medium text-brand-blue"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-black text-brand-blue uppercase tracking-[0.2em] ml-1">Password</label>
                        <div className="relative">
                            <input
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                className="w-full h-14 px-6 rounded-2xl bg-white border-transparent focus:border-brand-blue/30 focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-medium text-brand-blue pr-14"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-5 top-1/2 -translate-y-1/2 text-brand-blue/40 hover:text-brand-blue transition-colors"
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-black text-brand-blue uppercase tracking-[0.2em] ml-1">City</label>
                            <input
                                name="city"
                                type="text"
                                placeholder="Islamabad"
                                className="w-full h-14 px-6 rounded-2xl bg-white border-transparent focus:border-brand-blue/30 focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-medium text-brand-blue"
                                value={formData.city}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-black text-brand-blue uppercase tracking-[0.2em] ml-1">Residential Address</label>
                            <input
                                name="address"
                                type="text"
                                placeholder="House # 123, St # 4..."
                                className="w-full h-14 px-6 rounded-2xl bg-white border-transparent focus:border-brand-blue/30 focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-medium text-brand-blue"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-16 rounded-2xl bg-brand-blue text-white font-black text-lg uppercase tracking-[0.2em] shadow-premium hover:bg-brand-blue-dark transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 active:scale-95 mt-4"
                    >
                        {loading ? (
                            <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>
                                Create Account
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-2 transition-transform">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </>
                        )}
                    </button>

                    {error && (
                        <div className="p-4 rounded-xl bg-red-50 text-red-600 text-center font-bold text-sm animate-fade-in-up border border-red-100">
                            {error}
                        </div>
                    )}

                    <div className="text-center">
                        <p className="text-gray-500 font-questrial">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="text-brand-blue font-bold hover:underline"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </form>
            </div>

            {/* Footer Text */}
            <p className="mt-8 text-white/40 font-ui text-xs uppercase tracking-[0.3em] animate-fade-in-up [animation-delay:400ms]">
                © {new Date().getFullYear()} Elios Intelligence Systems
            </p>
        </div>
    );
}
