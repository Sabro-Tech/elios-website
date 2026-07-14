import { useState, useEffect } from 'react';
import { apiFetch } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface UserData {
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    city: string;
    address: string;
}

export default function Support() {
    const { user } = useAuth();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isWarrantyVisible, setIsWarrantyVisible] = useState(false);
    const [isComplaintVisible, setIsComplaintVisible] = useState(false);
    const [warranties, setWarranties] = useState<any[]>([]);
    const [complaints, setComplaints] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Original AC Options
    const acOptions = [
        "1 Ton Split",
        "1.5 Ton Split - LED",
        "2 Ton Split - LCD",
        "Floor Standing - 2 Ton",
        "Floor Standing - 4 Ton",
        "Cassette Type - 2 Ton",
        "Cassette Type - 4 Ton",
    ];

    // Form States (Restored to original backend structure)
    const [warrantyData, setWarrantyData] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        devicedetails: '',
        deviceserial: '',
        startdate: new Date().toISOString().split('T')[0],
        agreed: false
    });

    const [complaintData, setComplaintData] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        complaint: '',
        agreed: false
    });

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;
            try {
                // Fetch User Profile
                const data = await apiFetch<UserData>('/customers/me');
                setUserData(data);
                setWarrantyData(prev => ({
                    ...prev,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    phone: data.phone,
                    email: data.email
                }));
                setComplaintData(prev => ({
                    ...prev,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    phone: data.phone,
                    email: data.email
                }));

                // Fetch Warranties & Complaints
                const [w, c] = await Promise.all([
                    apiFetch<any[]>('/warranties'),
                    apiFetch<any[]>('/complaints')
                ]);
                setWarranties(w);
                setComplaints(c);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user]);

    const handleWarrantySubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Corrected Serial Number Validation (L0000-L0000-LL0000)
        const serialRegex = /^[A-Z]\d{4}-[A-Z]\d{4}-[A-Z]{2}\d{4}$/;
        if (!serialRegex.test(warrantyData.deviceserial)) {
            setMessage({ type: 'error', text: 'Invalid Serial Number format. Expected: A2627-E1046-XX1234' });
            return;
        }

        if (!warrantyData.agreed) return;
        setSubmitLoading(true);
        setMessage(null);

        try {
            // ID, ending date and status are all assigned server-side now
            const created = await apiFetch('/warranties', {
                method: 'POST',
                body: warrantyData
            });

            setMessage({ type: 'success', text: 'Warranty registered successfully!' });
            setIsWarrantyVisible(false);
            setWarranties([created, ...warranties]);
        } catch (err: any) {
            console.error('Warranty submission error:', err);
            setMessage({ type: 'error', text: err?.message || 'Failed to register warranty. Please try again.' });
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleComplaintSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!complaintData.agreed) return;
        setSubmitLoading(true);
        setMessage(null);

        try {
            // ID, dates and status are assigned server-side now
            const created = await apiFetch('/complaints', {
                method: 'POST',
                body: complaintData
            });

            setMessage({ type: 'success', text: 'Complaint submitted successfully!' });
            setIsComplaintVisible(false);
            setComplaints([created, ...complaints]);
        } catch (err: any) {
            console.error('Complaint submission error:', err);
            setMessage({ type: 'error', text: err?.message || 'Failed to submit complaint. Please try again.' });
        } finally {
            setSubmitLoading(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-12 h-12 border-4 border-brand-blue/30 border-t-brand-blue rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#f8fafc]">
            {/* Hero Section */}
            <section className="bg-brand-blue py-24 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-[-20deg] translate-x-1/2"></div>
                <div className="max-w-[1200px] mx-auto relative z-10">
                    <span className="text-white/60 font-bold uppercase tracking-[0.3em] text-sm mb-4 block animate-fade-in-up">Customer Support</span>
                    <h1 className="text-5xl md:text-7xl font-heading font-black text-white uppercase leading-none animate-fade-in-up [animation-delay:100ms]">
                        Elite Care <br />
                        <span className="text-white/40">Portal</span>
                    </h1>
                </div>
            </section>

            <main className="max-w-[1200px] mx-auto py-16 px-6 relative z-20">
                {/* Stats / Welcome */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 -mt-32">
                    <div className="bg-white p-8 rounded-[2rem] shadow-premium group hover:bg-brand-blue transition-all duration-500">
                        <div className="w-12 h-12 bg-brand-blue/5 rounded-2xl flex items-center justify-center text-brand-blue mb-6 group-hover:bg-white/20 group-hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                        </div>
                        <h3 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-1 group-hover:text-white/60">Welcome Back</h3>
                        <p className="text-brand-blue font-black text-2xl group-hover:text-white">{userData?.firstname} {userData?.lastname}</p>
                    </div>

                    <button
                        onClick={() => setIsWarrantyVisible(true)}
                        className="bg-white p-8 rounded-[2rem] shadow-premium text-left group hover:bg-brand-blue transition-all duration-500"
                    >
                        <div className="w-12 h-12 bg-brand-blue/5 rounded-2xl flex items-center justify-center text-brand-blue mb-6 group-hover:bg-white/20 group-hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                            </svg>
                        </div>
                        <h3 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-1 group-hover:text-white/60">New Registration</h3>
                        <p className="text-brand-blue font-black text-2xl group-hover:text-white">Register Warranty</p>
                    </button>

                    <button
                        onClick={() => setIsComplaintVisible(true)}
                        className="bg-white p-8 rounded-[2rem] shadow-premium text-left group hover:bg-brand-blue transition-all duration-500"
                    >
                        <div className="w-12 h-12 bg-brand-blue/5 rounded-2xl flex items-center justify-center text-brand-blue mb-6 group-hover:bg-white/20 group-hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
                            </svg>
                        </div>
                        <h3 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-1 group-hover:text-white/60">Submit Inquiry</h3>
                        <p className="text-brand-blue font-black text-2xl group-hover:text-white">File a Complaint</p>
                    </button>
                </div>

                {/* Content Tables */}
                <div className="flex flex-col gap-16">
                    {/* Warranties Table */}
                    <div className="animate-fade-in-up">
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <h2 className="text-3xl font-heading font-black text-brand-blue uppercase">Registered Warranties</h2>
                                <div className="h-1 w-20 bg-brand-blue mt-2 rounded-full"></div>
                            </div>
                        </div>

                        <div className="bg-white rounded-[2rem] shadow-premium overflow-hidden border border-gray-100">
                            <table className="w-full text-left">
                                <thead className="bg-[#f8fafc] border-b border-gray-100">
                                    <tr>
                                        {['ID', 'Device', 'Serial Number', 'Start Date', 'End Date', 'Status'].map(head => (
                                            <th key={head} className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">{head}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {warranties.length > 0 ? warranties.map(w => (
                                        <tr key={w.id} className="hover:bg-gray-50 transition-colors group">
                                            <td className="px-8 py-6 font-bold text-brand-blue">{w.id}</td>
                                            <td className="px-8 py-6 text-gray-600">{w.devicedetails}</td>
                                            <td className="px-8 py-6 text-center">
                                                <span className="px-4 py-2 font-ui text-xs font-bold bg-gray-50 rounded-xl uppercase tracking-widest text-brand-blue/70">
                                                    {w.deviceserial}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-gray-500">{w.startdate}</td>
                                            <td className="px-8 py-6 text-red-500 font-bold">{w.endingdate}</td>
                                            <td className="px-8 py-6">
                                                <span className="px-4 py-1.5 rounded-full bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-widest">
                                                    {w.status || 'Verified'}
                                                </span>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={6} className="px-8 py-12 text-center text-gray-400 font-questrial">No warranties found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Complaints Table */}
                    <div className="animate-fade-in-up [animation-delay:200ms]">
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <h2 className="text-3xl font-heading font-black text-brand-blue uppercase">Recent Complaints</h2>
                                <div className="h-1 w-20 bg-brand-blue mt-2 rounded-full"></div>
                            </div>
                        </div>

                        <div className="bg-white rounded-[2rem] shadow-premium overflow-hidden border border-gray-100">
                            <table className="w-full text-left">
                                <thead className="bg-[#f8fafc] border-b border-gray-100">
                                    <tr>
                                        {['ID', 'Location', 'Date', 'Complaint', 'Status'].map(head => (
                                            <th key={head} className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">{head}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {complaints.length > 0 ? complaints.map(c => (
                                        <tr key={c.id} className="hover:bg-gray-50 transition-colors group">
                                            <td className="px-8 py-6 font-bold text-brand-blue">{c.id}</td>
                                            <td className="px-8 py-6">
                                                <div className="text-gray-900 font-bold">{userData?.city}</div>
                                                <div className="text-xs text-gray-400">{userData?.address}</div>
                                            </td>
                                            <td className="px-8 py-6 text-gray-500">{c.complaintdate}</td>
                                            <td className="px-8 py-6 text-gray-500 max-w-xs truncate">{c.complaint}</td>
                                            <td className="px-8 py-6">
                                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${c.complaintstatus === 'Resolved' ? 'bg-green-50 text-green-600' :
                                                    c.complaintstatus === 'In Progress' ? 'bg-blue-50 text-blue-600' : 'bg-yellow-50 text-yellow-600'
                                                    }`}>
                                                    {c.complaintstatus || 'Registered'}
                                                </span>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={5} className="px-8 py-12 text-center text-gray-400 font-questrial">No complaints found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>

            {/* Warranty Modal */}
            {isWarrantyVisible && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-brand-blue/20 backdrop-blur-md" onClick={() => setIsWarrantyVisible(false)}></div>
                    <div className="w-full max-w-2xl bg-white rounded-[3rem] p-8 md:p-12 shadow-premium relative animate-fade-in-up overflow-y-auto max-h-[90vh]">
                        <h2 className="text-3xl font-heading font-black text-brand-blue uppercase mb-8">Register Warranty</h2>
                        <form onSubmit={handleWarrantySubmit} className="flex flex-col gap-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-black text-brand-blue uppercase tracking-[0.2em] ml-1">First Name</label>
                                    <input readOnly value={warrantyData.firstname} className="h-14 px-6 rounded-2xl bg-gray-50 text-gray-400 font-medium outline-none" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-black text-brand-blue uppercase tracking-[0.2em] ml-1">Last Name</label>
                                    <input readOnly value={warrantyData.lastname} className="h-14 px-6 rounded-2xl bg-gray-50 text-gray-400 font-medium outline-none" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-black text-brand-blue uppercase tracking-[0.2em] ml-1">Model Type</label>
                                    <select
                                        required
                                        className="h-14 px-6 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:ring-4 focus:ring-brand-blue/5 outline-none font-bold text-brand-blue appearance-none"
                                        onChange={(e) => setWarrantyData({ ...warrantyData, devicedetails: e.target.value })}
                                        value={warrantyData.devicedetails}
                                    >
                                        <option value="">Select AC Type</option>
                                        {acOptions.map(opt => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-black text-brand-blue uppercase tracking-[0.2em] ml-1">Serial Number</label>
                                    <input
                                        required
                                        placeholder="A2627-E1046-XX1234"
                                        className="h-14 px-6 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:ring-4 focus:ring-brand-blue/5 outline-none font-medium text-brand-blue"
                                        onChange={(e) => setWarrantyData({ ...warrantyData, deviceserial: e.target.value.toUpperCase() })}
                                        value={warrantyData.deviceserial}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-black text-brand-blue uppercase tracking-[0.2em] ml-1">Purchase Date</label>
                                <input
                                    type="date"
                                    required
                                    min={new Date().toISOString().split('T')[0]}
                                    className="h-14 px-6 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:ring-4 focus:ring-brand-blue/5 outline-none font-medium text-brand-blue"
                                    onChange={(e) => setWarrantyData({ ...warrantyData, startdate: e.target.value })}
                                    value={warrantyData.startdate}
                                />
                            </div>
                            <div className="flex items-center gap-4 p-4 bg-brand-blue/5 rounded-2xl">
                                <input
                                    type="checkbox"
                                    id="agreeW"
                                    className="w-5 h-5 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
                                    checked={warrantyData.agreed}
                                    onChange={(e) => setWarrantyData({ ...warrantyData, agreed: e.target.checked })}
                                />
                                <label htmlFor="agreeW" className="text-sm text-gray-600 font-questrial">
                                    I confirm that the serial number matches the product sticker.
                                </label>
                            </div>
                            <button
                                type="submit"
                                disabled={submitLoading || !warrantyData.agreed}
                                className="w-full h-16 rounded-2xl bg-brand-blue text-white font-black uppercase tracking-widest shadow-premium hover:bg-brand-blue-dark transition-all disabled:opacity-50"
                            >
                                {submitLoading ? 'Registering...' : 'Register Now'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Complaint Modal */}
            {isComplaintVisible && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-brand-blue/20 backdrop-blur-md" onClick={() => setIsComplaintVisible(false)}></div>
                    <div className="w-full max-w-2xl bg-white rounded-[3rem] p-8 md:p-12 shadow-premium relative animate-fade-in-up overflow-y-auto max-h-[90vh]">
                        <h2 className="text-3xl font-heading font-black text-brand-blue uppercase mb-8">File a Complaint</h2>
                        <form onSubmit={handleComplaintSubmit} className="flex flex-col gap-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-black text-brand-blue uppercase tracking-[0.2em] ml-1">First Name</label>
                                    <input readOnly value={complaintData.firstname} className="h-14 px-6 rounded-2xl bg-gray-50 text-gray-400 font-medium outline-none" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-black text-brand-blue uppercase tracking-[0.2em] ml-1">Last Name</label>
                                    <input readOnly value={complaintData.lastname} className="h-14 px-6 rounded-2xl bg-gray-50 text-gray-400 font-medium outline-none" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-black text-brand-blue uppercase tracking-[0.2em] ml-1">Complaint Details</label>
                                <textarea
                                    required
                                    rows={4}
                                    placeholder="Describe the issue you're facing..."
                                    className="w-full p-6 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-medium text-brand-blue resize-none"
                                    onChange={(e) => setComplaintData({ ...complaintData, complaint: e.target.value })}
                                ></textarea>
                            </div>
                            <div className="flex items-center gap-4 p-4 bg-brand-blue/5 rounded-2xl">
                                <input
                                    type="checkbox"
                                    id="agreeC"
                                    className="w-5 h-5 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
                                    checked={complaintData.agreed}
                                    onChange={(e) => setComplaintData({ ...complaintData, agreed: e.target.checked })}
                                />
                                <label htmlFor="agreeC" className="text-sm text-gray-600 font-questrial">
                                    I confirm that the details provided are accurate.
                                </label>
                            </div>
                            <button
                                type="submit"
                                disabled={submitLoading || !complaintData.agreed}
                                className="w-full h-16 rounded-2xl bg-brand-blue text-white font-black uppercase tracking-widest shadow-premium hover:bg-brand-blue-dark transition-all disabled:opacity-50"
                            >
                                {submitLoading ? 'Submitting...' : 'Submit Complaint'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Message Notification */}
            {message && (
                <div className="fixed bottom-8 right-8 z-[200] animate-slide-in-right">
                    <div className={`p-6 rounded-3xl shadow-premium border ${message.type === 'success' ? 'bg-white text-green-600 border-green-100' : 'bg-white text-red-600 border-red-100'
                        } flex items-center gap-4`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${message.type === 'success' ? 'bg-green-50' : 'bg-red-50'
                            }`}>
                            {message.type === 'success' ? '✓' : '!'}
                        </div>
                        <p className="font-bold">{message.text}</p>
                        <button onClick={() => setMessage(null)} className="text-gray-300 hover:text-gray-500">✕</button>
                    </div>
                </div>
            )}

        </div>
    );
}
