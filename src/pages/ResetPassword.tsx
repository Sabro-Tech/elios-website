import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../services/firebase';

export default function ResetPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);

        try {
            await sendPasswordResetEmail(auth, email);
            setMessage('A password reset link has been sent to your email. Please check your inbox and spam folder.');
        } catch (err: any) {
            console.error('Password reset error:', err);
            if (err.code === 'auth/user-not-found') {
                setError('No account found with this email address.');
            } else if (err.code === 'auth/invalid-email') {
                setError('Please enter a valid email address.');
            } else {
                setError('Failed to send reset email. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10">
                <div className="text-center mb-10">
                    <h2 className="text-[32px] font-heading font-bold text-[#1e4186] mb-2">Reset Password</h2>
                    <p className="text-gray-500 font-questrial">Enter your email to receive a reset link</p>
                </div>

                {message && (
                    <div className="bg-green-50 text-green-600 p-4 rounded-xl mb-6 text-sm flex items-center gap-2">
                        <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {message}
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6 text-sm flex items-center gap-2">
                        <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#1e4186] px-1 font-questrial">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@example.com"
                            className="bg-[#f3f4f6] px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-[#1e4186]/20 transition-all font-questrial"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#1e4186] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#152e60] transition-all transform active:scale-[0.98] shadow-lg mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Sending link...' : 'Send Reset Link'}
                    </button>
                </form>

                <div className="text-center mt-10 font-questrial text-gray-500 flex flex-col gap-2">
                    <p>Remembered your password? <Link to="/login" className="text-[#1e4186] font-bold hover:underline">Log In</Link></p>
                    <p>Don't have an account? <Link to="/signup" className="text-[#1e4186] font-bold hover:underline">Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
}
