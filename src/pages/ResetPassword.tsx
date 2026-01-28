import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../services/firebase';
import navbarLogo from '../assets/elios-navbar.png';
import { getFriendlyAuthError } from '../utils/authErrors';

export default function ResetPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            setMessage({ type: 'error', text: 'Please enter your email address.' });
            return;
        }

        setLoading(true);
        setMessage(null);
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage({ type: 'success', text: 'Check your email for password reset instructions.' });
            setEmail('');
        } catch (err: any) {
            setMessage({ type: 'error', text: getFriendlyAuthError(err.code || err.message) });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative overflow-hidden bg-[#1E4186]">
            {/* Animated Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/10 blur-[120px] rounded-full animate-float"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/10 blur-[150px] rounded-full animate-float [animation-delay:2s]"></div>

            {/* Logo Area */}
            <Link to="/" className="mb-12 animate-fade-in-up">
                <img
                    src={navbarLogo}
                    alt="Elios Logo"
                    className="h-12 w-auto brightness-0 invert"
                />
            </Link>

            {/* Reset Card */}
            <div className="w-full max-w-md glass-card p-10 md:p-12 rounded-[2.5rem] animate-fade-in-up [animation-delay:200ms]">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-heading font-black text-brand-blue uppercase tracking-tight">Reset Password</h1>
                    <p className="text-gray-500 font-questrial mt-2">We'll send you a link to recover access</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-black text-brand-blue uppercase tracking-[0.2em] ml-1">Email Address</label>
                        <input
                            type="email"
                            placeholder="name@company.com"
                            className="w-full h-14 px-6 rounded-2xl bg-white border-transparent focus:border-brand-blue/30 focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-medium text-brand-blue"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-16 rounded-2xl bg-brand-blue text-white font-black text-lg uppercase tracking-[0.2em] shadow-premium hover:bg-brand-blue-dark transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 active:scale-95"
                    >
                        {loading ? (
                            <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>
                                Send Link
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-2 transition-transform">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </>
                        )}
                    </button>

                    {message && (
                        <div className={`p-4 rounded-xl text-center font-bold text-sm animate-fade-in-up border ${message.type === 'success' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'
                            }`}>
                            {message.text}
                        </div>
                    )}

                    <div className="text-center flex flex-col gap-4">
                        <Link
                            to="/login"
                            className="text-brand-blue font-bold hover:underline font-questrial"
                        >
                            Back to Sign In
                        </Link>
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
