import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

export default function Signup() {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        password: '',
        city: '',
        address: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            // Save user profile to Firestore
            // All website users are stored in the "Customers" collection.
            const collectionPath = 'Customers';

            // Generate current date in DD-MM-YYYY format as used in existing backend
            const now = new Date();
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const year = now.getFullYear();
            const formattedDate = `${day}-${month}-${year}`;

            await setDoc(doc(db, collectionPath, user.uid), {
                firstname: formData.firstname,
                lastname: formData.lastname,
                email: formData.email,
                phone: formData.phone,
                city: formData.city,
                address: formData.address,
                createdAt: formattedDate,
                role: 'user' // Default role
            });

            navigate('/support');
        } catch (err: any) {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
                setError('This email address is already in use. Please try another or log in.');
            } else {
                setError(err.message || 'Failed to create an account');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10">
                <div className="text-center mb-10">
                    <h2 className="text-[32px] font-heading font-bold text-[#1e4186] mb-2">Create Account</h2>
                    <p className="text-gray-500 font-questrial">Join the Elios family today</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6 text-sm flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-[#1e4186] px-1 font-questrial">First Name</label>
                            <input
                                type="text" name="firstname" required value={formData.firstname} onChange={handleChange}
                                placeholder="John"
                                className="bg-[#f3f4f6] px-5 py-3.5 rounded-xl outline-none focus:ring-2 focus:ring-[#1e4186]/20 transition-all font-questrial text-sm"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-[#1e4186] px-1 font-questrial">Last Name</label>
                            <input
                                type="text" name="lastname" required value={formData.lastname} onChange={handleChange}
                                placeholder="Doe"
                                className="bg-[#f3f4f6] px-5 py-3.5 rounded-xl outline-none focus:ring-2 focus:ring-[#1e4186]/20 transition-all font-questrial text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-bold text-[#1e4186] px-1 font-questrial">Email Address</label>
                        <input
                            type="email" name="email" required value={formData.email} onChange={handleChange}
                            placeholder="john@example.com"
                            className="bg-[#f3f4f6] px-5 py-3.5 rounded-xl outline-none focus:ring-2 focus:ring-[#1e4186]/20 transition-all font-questrial text-sm"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-bold text-[#1e4186] px-1 font-questrial">Phone Number</label>
                        <input
                            type="tel" name="phone" required value={formData.phone} onChange={handleChange}
                            placeholder="03XXXXXXXXX"
                            className="bg-[#f3f4f6] px-5 py-3.5 rounded-xl outline-none focus:ring-2 focus:ring-[#1e4186]/20 transition-all font-questrial text-sm"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-bold text-[#1e4186] px-1 font-questrial">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password" required value={formData.password} onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full bg-[#f3f4f6] px-5 py-3.5 rounded-xl outline-none focus:ring-2 focus:ring-[#1e4186]/20 transition-all font-questrial text-sm pr-12"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1e4186] transition-colors"
                            >
                                {showPassword ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.059 10.059 0 014.244-5.228M9.17 9.17a3 3 0 014.243 4.243M19.39 19.39L4.06 4.06" /></svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-bold text-[#1e4186] px-1 font-questrial">City</label>
                        <input
                            type="text" name="city" required value={formData.city} onChange={handleChange}
                            placeholder="Islamabad"
                            className="bg-[#f3f4f6] px-5 py-3.5 rounded-xl outline-none focus:ring-2 focus:ring-[#1e4186]/20 transition-all font-questrial text-sm"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-bold text-[#1e4186] px-1 font-questrial">Address</label>
                        <input
                            type="text" name="address" required value={formData.address} onChange={handleChange}
                            placeholder="House #123, Street #45..."
                            className="bg-[#f3f4f6] px-5 py-3.5 rounded-xl outline-none focus:ring-2 focus:ring-[#1e4186]/20 transition-all font-questrial text-sm"
                        />
                    </div>

                    <button
                        type="submit" disabled={loading}
                        className="bg-[#1e4186] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#152e60] transition-all transform active:scale-[0.98] shadow-lg mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <div className="text-center mt-8 font-questrial text-gray-500">
                    Already have an account? <Link to="/login" className="text-[#1e4186] font-bold hover:underline">Log In</Link>
                </div>
            </div>
        </div>
    );
}
