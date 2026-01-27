import { useState, useRef, useEffect } from 'react';
import { collection, onSnapshot, doc, setDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from '../context/AuthContext';

export default function Support() {
    const today = new Date().toISOString().split('T')[0];
    const warrantyFormRef = useRef<HTMLDivElement>(null);
    const complaintFormRef = useRef<HTMLDivElement>(null);

    const { user, userData } = useAuth();
    const [warranties, setWarranties] = useState<any[]>([]);
    const [complaints, setComplaints] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Form visibility states
    const [isWarrantyVisible, setIsWarrantyVisible] = useState(false);
    const [isComplaintVisible, setIsComplaintVisible] = useState(false);

    // Form data states
    const [warrantyData, setWarrantyData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        date: today,
        deviceType: '',
        serialNo: '',
        agreed: false
    });
    const [warrantyErrors, setWarrantyErrors] = useState<Record<string, string>>({});

    const [complaintData, setComplaintData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        city: '',
        address: '',
        complaint: '',
        agreed: false
    });
    const [complaintErrors, setComplaintErrors] = useState<Record<string, string>>({});

    const deviceTypes = [
        '1 Ton Split',
        '1.5 Ton Split - LED',
        '2 Ton Split - LCD',
        'Floor Standing - 2 Ton',
        'Floor Standing - 4 Ton',
        'Cassette Type - 2 Ton',
        'Cassette Type - 4 Ton'
    ];

    // Update form data when userData changes (autofill)
    useEffect(() => {
        if (userData) {
            setWarrantyData(prev => ({
                ...prev,
                firstName: userData.firstname || '',
                lastName: userData.lastname || '',
                phone: userData.phone || '',
                email: userData.email || ''
            }));
            setComplaintData(prev => ({
                ...prev,
                firstName: userData.firstname || '',
                lastName: userData.lastname || '',
                phone: userData.phone || '',
                email: userData.email || '',
                city: userData.city || '',
                address: userData.address || ''
            }));
        }
    }, [userData]);

    // Fetch data from Firestore
    useEffect(() => {
        if (!user || !userData) return;

        const customerId = user.uid;
        const collectionPath = 'Customers';

        // Warranties listener
        const warrantiesRef = collection(db, collectionPath, customerId, 'Warranties');
        const unsubWarranties = onSnapshot(warrantiesRef, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setWarranties(data);
            setLoading(false);
        });

        // Complaints listener
        const complaintsRef = collection(db, collectionPath, customerId, 'Complaints');
        const unsubComplaints = onSnapshot(complaintsRef, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setComplaints(data);
        });

        return () => {
            unsubWarranties();
            unsubComplaints();
        };
    }, [user, userData]);

    const handleWarrantyInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setWarrantyData(prev => ({ ...prev, [name]: val }));
    };

    const handleComplaintInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setComplaintData(prev => ({ ...prev, [name]: val }));
    };

    const handleWarrantySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        setWarrantyErrors({});

        const newErrors: Record<string, string> = {};
        if (!warrantyData.firstName) newErrors.firstName = 'Required';
        if (!warrantyData.lastName) newErrors.lastName = 'Required';
        if (!warrantyData.phone) newErrors.phone = 'Required';
        if (!warrantyData.email) newErrors.email = 'Required';
        if (!warrantyData.deviceType) newErrors.deviceType = 'Required';
        if (!warrantyData.serialNo) newErrors.serialNo = 'Required';
        else if (warrantyData.serialNo.length !== 18) newErrors.serialNo = 'Serial number must be 18 characters';
        if (!warrantyData.agreed) newErrors.agreed = 'Required';

        if (Object.keys(newErrors).length > 0) {
            setWarrantyErrors(newErrors);
            return;
        }

        setSubmitLoading(true);
        try {
            const customerId = user!.uid;
            const currentYear = new Date().getFullYear();
            const randomId = Math.floor(1000 + Math.random() * 9000);
            const warrantyId = `${currentYear}SAB-000${randomId}`;

            const start = new Date(warrantyData.date);
            const end = new Date(start);
            end.setFullYear(end.getFullYear() + 1);

            const docData = {
                firstname: warrantyData.firstName,
                lastname: warrantyData.lastName,
                phone: warrantyData.phone,
                email: warrantyData.email,
                city: userData?.city || '',
                startdate: warrantyData.date,
                endingdate: end.toISOString().split('T')[0],
                devicedetails: warrantyData.deviceType,
                deviceserial: warrantyData.serialNo
            };

            const collectionPath = 'Customers';
            await setDoc(doc(db, collectionPath, customerId, 'Warranties', warrantyId), docData);

            setMessage({ type: 'success', text: 'Warranty Registered Successfully!' });
            setIsWarrantyVisible(false);
            setWarrantyData(prev => ({ ...prev, serialNo: '', deviceType: '', agreed: false }));
        } catch (err) {
            console.error(err);
            setMessage({ type: 'error', text: 'Failed to register warranty.' });
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleComplaintSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        setComplaintErrors({});

        const newErrors: Record<string, string> = {};
        if (!complaintData.firstName) newErrors.firstName = 'Required';
        if (!complaintData.lastName) newErrors.lastName = 'Required';
        if (!complaintData.phone) newErrors.phone = 'Required';
        if (!complaintData.email) newErrors.email = 'Required';
        if (!complaintData.city) newErrors.city = 'Required';
        if (!complaintData.address) newErrors.address = 'Required';
        if (!complaintData.complaint) newErrors.complaint = 'Required';
        if (!complaintData.agreed) newErrors.agreed = 'Required';

        if (Object.keys(newErrors).length > 0) {
            setComplaintErrors(newErrors);
            return;
        }

        setSubmitLoading(true);
        try {
            const customerId = user!.uid;
            const complaintId = Math.floor(1000 + Math.random() * 9000).toString();

            const docData = {
                firstname: complaintData.firstName,
                lastname: complaintData.lastName,
                phone: complaintData.phone,
                email: complaintData.email,
                city: complaintData.city,
                address: complaintData.address,
                complaint: complaintData.complaint,
                complaintdate: today,
                complaintstatus: 'Registered',
                closingdate: ''
            };

            const collectionPath = 'Customers';
            await setDoc(doc(db, collectionPath, customerId, 'Complaints', complaintId), docData);

            setMessage({ type: 'success', text: 'Complaint Submitted Successfully!' });
            setIsComplaintVisible(false);
            setComplaintData(prev => ({ ...prev, complaint: '', agreed: false }));
        } catch (err) {
            console.error(err);
            setMessage({ type: 'error', text: 'Failed to submit complaint.' });
        } finally {
            setSubmitLoading(false);
        }
    };

    const toggleWarrantyForm = () => {
        const newState = !isWarrantyVisible;
        setIsWarrantyVisible(newState);
        if (newState) {
            setTimeout(() => {
                warrantyFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    };

    const toggleComplaintForm = () => {
        const newState = !isComplaintVisible;
        setIsComplaintVisible(newState);
        if (newState) {
            setTimeout(() => {
                complaintFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    };

    return (
        <div className="w-full overflow-x-hidden">
            {/* Feedback Message */}
            {message && (
                <div className={`fixed top-24 right-8 z-[100] p-4 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in ${message.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    }`}>
                    {message.type === 'success' ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    )}
                    <span className="font-questrial font-bold">{message.text}</span>
                    <button onClick={() => setMessage(null)} className="ml-2 hover:opacity-70"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg></button>
                </div>
            )}

            {/* Hero Section */}
            <section className="w-full bg-gradient-to-r from-[#1b3b79] to-[#4a4a4a] py-24 px-6">
                <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
                    <div className="w-full text-left">
                        <h1 className="font-heading text-[46px] md:text-[56px] text-white uppercase leading-tight">
                            Customer Support<br />Center
                        </h1>
                    </div>
                    <div className="w-full flex flex-col gap-8 text-left">
                        <p className="font-questrial text-[18px] md:text-[20px] text-white leading-relaxed">
                            We're here to make your experience smooth and hassle-free! Register your device warranty in just a few clicks and enjoy peace of mind knowing you're covered. Need assistance? Our complaint form is designed to resolve any issues quickly.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={toggleWarrantyForm}
                                className="bg-[#1e4186] hover:bg-[#152e60] text-white font-questrial px-8 py-3 rounded-full transition-all shadow-lg font-bold text-[16px] md:text-[18px]"
                            >
                                {isWarrantyVisible ? 'Hide Warranty Form' : 'Warranty Form'}
                            </button>
                            <button
                                onClick={toggleComplaintForm}
                                className="bg-[#1e4186] hover:bg-[#152e60] text-white font-questrial px-8 py-3 rounded-full transition-all shadow-lg font-bold text-[16px] md:text-[18px]"
                            >
                                {isComplaintVisible ? 'Hide Complaint Form' : 'Complaint Form'}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 1. Warranty Form Section */}
            <div className={`grid transition-[grid-template-rows,opacity] duration-1000 ease-in-out ${isWarrantyVisible ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    <section ref={warrantyFormRef} className="w-full py-24 px-6 relative" style={{ background: `radial-gradient(circle at 0% 0%, #49608f 0%, transparent 50%), radial-gradient(circle at 0% 100%, #353535 0%, transparent 50%), radial-gradient(circle at 100% 0%, #4f4f4f 0%, transparent 50%), radial-gradient(circle at 100% 100%, #3a568f 0%, transparent 50%), #b6b6b7` }}>
                        <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
                            <div className="w-full bg-white/10 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-xl text-left">
                                <h3 className="font-ui font-medium text-[42px] text-black uppercase mb-8 leading-tight">Warranty Form</h3>
                                <form onSubmit={handleWarrantySubmit} className="flex flex-col gap-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-black font-bold text-sm">First Name</label>
                                            <input type="text" name="firstName" value={warrantyData.firstName} onChange={handleWarrantyInputChange} placeholder="First name" className="bg-white p-3 rounded-lg outline-none text-black" readOnly={!!userData?.firstname} />
                                            {warrantyErrors.firstName && <span className="text-red-600 text-xs">{warrantyErrors.firstName}</span>}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-black font-bold text-sm">Last Name</label>
                                            <input type="text" name="lastName" value={warrantyData.lastName} onChange={handleWarrantyInputChange} placeholder="Last name" className="bg-white p-3 rounded-lg outline-none text-black" readOnly={!!userData?.lastname} />
                                            {warrantyErrors.lastName && <span className="text-red-600 text-xs">{warrantyErrors.lastName}</span>}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-black font-bold text-sm">Phone</label>
                                            <input type="tel" name="phone" value={warrantyData.phone} onChange={handleWarrantyInputChange} placeholder="Phone number" className="bg-white p-3 rounded-lg outline-none text-black" readOnly={!!userData?.phone} />
                                            {warrantyErrors.phone && <span className="text-red-600 text-xs">{warrantyErrors.phone}</span>}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-black font-bold text-sm">Email</label>
                                            <input type="email" name="email" value={warrantyData.email} onChange={handleWarrantyInputChange} placeholder="Email" className="bg-white p-3 rounded-lg outline-none text-black" readOnly={!!userData?.email} />
                                            {warrantyErrors.email && <span className="text-red-600 text-xs">{warrantyErrors.email}</span>}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-black font-bold text-sm">Date</label>
                                            <input type="date" name="date" value={warrantyData.date} onChange={handleWarrantyInputChange} className="bg-white p-3 rounded-lg outline-none text-black cursor-pointer" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-black font-bold text-sm">Device Type</label>
                                            <select name="deviceType" value={warrantyData.deviceType} onChange={handleWarrantyInputChange} className="bg-white p-3 rounded-lg outline-none text-black cursor-pointer appearance-none">
                                                <option value="">Select Device Type</option>
                                                {deviceTypes.map(type => (<option key={type} value={type}>{type}</option>))}
                                            </select>
                                            {warrantyErrors.deviceType && <span className="text-red-600 text-xs">{warrantyErrors.deviceType}</span>}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-black font-bold text-sm">Device Serial No (18 characters)</label>
                                        <input type="text" name="serialNo" value={warrantyData.serialNo} onChange={handleWarrantyInputChange} placeholder="Enter 18-character serial number" className="bg-white p-3 rounded-lg outline-none text-black" maxLength={18} />
                                        {warrantyErrors.serialNo && <span className="text-red-600 text-xs">{warrantyErrors.serialNo}</span>}
                                    </div>
                                    <div className="flex items-center gap-3 py-2">
                                        <input type="checkbox" name="agreed" id="warranty-terms" checked={warrantyData.agreed} onChange={handleWarrantyInputChange} className="w-5 h-5 cursor-pointer accent-[#1e4186]" />
                                        <label htmlFor="warranty-terms" className="text-black font-medium text-sm cursor-pointer select-none">I agree to Terms \u0026 Conditions</label>
                                        {warrantyErrors.agreed && <span className="text-red-600 text-xs ml-auto">{warrantyErrors.agreed}</span>}
                                    </div>
                                    <div className="flex gap-4">
                                        <button type="submit" disabled={submitLoading} className="flex-1 bg-[#1e4186] hover:bg-[#152e60] text-white font-questrial py-4 px-10 rounded-full transition-all shadow-lg font-bold text-[18px] mt-4 uppercase disabled:opacity-50">
                                            {submitLoading ? 'Registering...' : 'Generate Warranty'}
                                        </button>
                                        <button type="button" onClick={() => setIsWarrantyVisible(false)} className="bg-gray-200 hover:bg-gray-300 text-black font-questrial py-4 px-10 rounded-full transition-all font-bold text-[18px] mt-4 uppercase">Close</button>
                                    </div>
                                </form>
                            </div>
                            <div className="w-full flex flex-col gap-8 pt-8 md:pt-20 text-left text-black">
                                <h2 className="font-ui font-medium text-[40px] md:text-[47px] leading-tight">Register Your Device Warranty</h2>
                                <p className="font-questrial text-[20px] leading-relaxed">Fill out the form to activate your warranty and enjoy hassle-free service. Ensure your device is protected!</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* 2. My Warranties Table */}
            <section className="w-full bg-gradient-to-r from-[#1a3976] to-[#000000] py-24 px-6">
                <div className="max-w-[1300px] mx-auto">
                    <h2 className="font-ui font-medium text-[40px] md:text-[47px] text-white uppercase mb-12 text-left">My Warranties</h2>
                    <div className="w-full overflow-x-auto rounded-2xl shadow-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                        {loading ? (
                            <div className="p-20 text-center text-white font-questrial">Loading your warranties...</div>
                        ) : warranties.length === 0 ? (
                            <div className="p-20 text-center text-white font-questrial">No warranties found.</div>
                        ) : (
                            <table className="w-full text-left border-collapse min-w-[900px]">
                                <thead>
                                    <tr className="bg-white/10 text-white font-ui font-medium uppercase tracking-wider text-sm">
                                        <th className="px-6 py-5">Warranty No.</th>
                                        <th className="px-6 py-5">Device</th>
                                        <th className="px-6 py-5">Starting Date</th>
                                        <th className="px-6 py-5">Parts</th>
                                        <th className="px-6 py-5">PCB</th>
                                        <th className="px-6 py-5">Compressor</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-white/90 font-questrial">
                                    {warranties.map((warranty, index) => (
                                        <tr key={index} className="hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-6 font-bold text-white">{warranty.id}</td>
                                            <td className="px-6 py-6">{warranty.devicedetails}</td>
                                            <td className="px-6 py-6">{warranty.startdate}</td>
                                            <td className="px-6 py-6 text-blue-300">1 Year</td>
                                            <td className="px-6 py-6 text-blue-200">2 Years</td>
                                            <td className="px-6 py-6 text-green-300">10 Years</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </section>

            {/* 3. Complaint Form Section */}
            <div className={`grid transition-[grid-template-rows,opacity] duration-1000 ease-in-out ${isComplaintVisible ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    <section ref={complaintFormRef} className="w-full py-24 px-6 relative" style={{ background: `radial-gradient(circle at 0% 0%, #49608f 0%, transparent 50%), radial-gradient(circle at 0% 100%, #353535 0%, transparent 50%), radial-gradient(circle at 100% 0%, #4f4f4f 0%, transparent 50%), radial-gradient(circle at 100% 100%, #3a568f 0%, transparent 50%), #b6b6b7` }}>
                        <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
                            <div className="w-full bg-white/10 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-xl text-left">
                                <h3 className="font-ui font-medium text-[42px] text-black uppercase mb-8 leading-tight">Complaint Form</h3>
                                <form onSubmit={handleComplaintSubmit} className="flex flex-col gap-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-black font-bold text-sm">First Name</label>
                                            <input type="text" name="firstName" value={complaintData.firstName} onChange={handleComplaintInputChange} className="bg-white p-3 rounded-lg outline-none text-black" readOnly={!!userData?.firstname} />
                                            {complaintErrors.firstName && <span className="text-red-600 text-xs">{complaintErrors.firstName}</span>}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-black font-bold text-sm">Last Name</label>
                                            <input type="text" name="lastName" value={complaintData.lastName} onChange={handleComplaintInputChange} className="bg-white p-3 rounded-lg outline-none text-black" readOnly={!!userData?.lastname} />
                                            {complaintErrors.lastName && <span className="text-red-600 text-xs">{complaintErrors.lastName}</span>}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-black font-bold text-sm">Phone</label>
                                            <input type="tel" name="phone" value={complaintData.phone} onChange={handleComplaintInputChange} className="bg-white p-3 rounded-lg outline-none text-black" readOnly={!!userData?.phone} />
                                            {complaintErrors.phone && <span className="text-red-600 text-xs">{complaintErrors.phone}</span>}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-black font-bold text-sm">Email</label>
                                            <input type="email" name="email" value={complaintData.email} onChange={handleComplaintInputChange} className="bg-white p-3 rounded-lg outline-none text-black" readOnly={!!userData?.email} />
                                            {complaintErrors.email && <span className="text-red-600 text-xs">{complaintErrors.email}</span>}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-black font-bold text-sm">City</label>
                                        <input type="text" name="city" value={complaintData.city} onChange={handleComplaintInputChange} className="bg-white p-3 rounded-lg outline-none text-black" />
                                        {complaintErrors.city && <span className="text-red-600 text-xs">{complaintErrors.city}</span>}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-black font-bold text-sm">Address</label>
                                        <input type="text" name="address" value={complaintData.address} onChange={handleComplaintInputChange} className="bg-white p-3 rounded-lg outline-none text-black" />
                                        {complaintErrors.address && <span className="text-red-600 text-xs">{complaintErrors.address}</span>}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-black font-bold text-sm">Complaint</label>
                                        <textarea name="complaint" value={complaintData.complaint} onChange={handleComplaintInputChange} placeholder="Describe your issue" rows={4} className="bg-white p-3 rounded-lg outline-none text-black resize-none font-questrial" />
                                        {complaintErrors.complaint && <span className="text-red-600 text-xs">{complaintErrors.complaint}</span>}
                                    </div>
                                    <div className="flex items-center gap-3 py-2">
                                        <input type="checkbox" name="agreed" id="complaint-terms" checked={complaintData.agreed} onChange={handleComplaintInputChange} className="w-5 h-5 cursor-pointer accent-[#1e4186]" />
                                        <label htmlFor="complaint-terms" className="text-black font-medium text-sm cursor-pointer select-none">I agree to Terms \u0026 Conditions</label>
                                        {complaintErrors.agreed && <span className="text-red-600 text-xs ml-auto">{complaintErrors.agreed}</span>}
                                    </div>
                                    <div className="flex gap-4">
                                        <button type="submit" disabled={submitLoading} className="flex-1 bg-[#1e4186] hover:bg-[#152e60] text-white font-questrial py-4 px-10 rounded-full transition-all shadow-lg font-bold text-[18px] mt-4 uppercase disabled:opacity-50">
                                            {submitLoading ? 'Submitting...' : 'Submit Complaint'}
                                        </button>
                                        <button type="button" onClick={() => setIsComplaintVisible(false)} className="bg-gray-200 hover:bg-gray-300 text-black font-questrial py-4 px-10 rounded-full transition-all font-bold text-[18px] mt-4 uppercase">Close</button>
                                    </div>
                                </form>
                            </div>
                            <div className="w-full flex flex-col gap-8 pt-8 md:pt-20 text-left text-black">
                                <h2 className="font-ui font-medium text-[40px] md:text-[47px] leading-tight">SUBMIT A COMPLAINT</h2>
                                <p className="font-questrial text-[20px] leading-relaxed">Have an issue? Fill out the form, and we’ll work to resolve it quickly. Our team is here to ensure you get the support you need!</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* 4. My Complaints Table */}
            <section className="w-full bg-gradient-to-r from-[#1a3976] to-[#000000] py-24 px-6">
                <div className="max-w-[1300px] mx-auto">
                    <h2 className="font-ui font-medium text-[40px] md:text-[47px] text-white uppercase mb-12 text-left">My Complaints</h2>
                    <div className="w-full overflow-x-auto rounded-2xl shadow-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                        {loading ? (
                            <div className="p-20 text-center text-white font-questrial">Loading your complaints...</div>
                        ) : complaints.length === 0 ? (
                            <div className="p-20 text-center text-white font-questrial">No complaints found.</div>
                        ) : (
                            <table className="w-full text-left border-collapse min-w-[700px]">
                                <thead>
                                    <tr className="bg-white/10 text-white font-ui font-medium uppercase tracking-wider text-sm">
                                        <th className="px-6 py-5">Complaint ID</th>
                                        <th className="px-6 py-5">Complaint</th>
                                        <th className="px-6 py-5">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-white/90 font-questrial text-[16px]">
                                    {complaints.map((complaint, index) => (
                                        <tr key={index} className="hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-6 font-bold text-white">{complaint.id}</td>
                                            <td className="px-6 py-6 max-w-[400px] truncate">{complaint.complaint}</td>
                                            <td className="px-6 py-6">
                                                <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase ${complaint.complaintstatus === 'Resolved' ? 'bg-green-500/20 text-green-400' :
                                                    complaint.complaintstatus === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                                                        'bg-yellow-500/20 text-yellow-400'
                                                    }`}>
                                                    {complaint.complaintstatus}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
