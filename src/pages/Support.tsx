import { useState, useRef } from 'react';

export default function Support() {
    const today = new Date().toISOString().split('T')[0];
    const warrantyFormRef = useRef<HTMLDivElement>(null);
    const complaintFormRef = useRef<HTMLDivElement>(null);

    // State for Warranty Form
    const [isWarrantyVisible, setIsWarrantyVisible] = useState(false);
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

    // State for Complaint Form
    const [isComplaintVisible, setIsComplaintVisible] = useState(false);
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

    // Mock Data for Warranties Table
    const mockWarranties = [
        {
            no: 'W-EL-100234',
            device: '1.5 Ton Split - LED',
            startDate: '2025-01-15',
            parts: '1 Year',
            pcb: '3 Years',
            compressor: '10 Years'
        },
        {
            no: 'W-EL-100567',
            device: 'Cassette Type - 4 Ton',
            startDate: '2025-02-10',
            parts: '1 Year',
            pcb: '2 Years',
            compressor: '5 Years'
        }
    ];

    // Mock Data for Complaints Table
    const mockComplaints = [
        {
            id: 'C-EL-99812',
            text: 'Air flow is not uniform in the auto mode.',
            status: 'Pending'
        },
        {
            id: 'C-EL-99745',
            text: 'Remote display is flickering.',
            status: 'Resolved'
        },
        {
            id: 'C-EL-99630',
            text: 'Unusual noise from the outdoor unit.',
            status: 'In Progress'
        }
    ];

    const deviceTypes = [
        '1 Ton Split',
        '1.5 Ton Split - LED',
        '2 Ton Split - LCD',
        'Floor Standing - 2 Ton',
        'Floor Standing - 4 Ton',
        'Cassette Type - 2 Ton',
        'Cassette Type - 4 Ton'
    ];

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

    const handleWarrantySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: Record<string, string> = {};
        if (!warrantyData.firstName) newErrors.firstName = 'Required';
        if (!warrantyData.lastName) newErrors.lastName = 'Required';
        if (!warrantyData.phone) newErrors.phone = 'Required';
        if (!warrantyData.email) newErrors.email = 'Required';
        if (!warrantyData.deviceType) newErrors.deviceType = 'Required';
        if (!warrantyData.serialNo) newErrors.serialNo = 'Required';
        if (!warrantyData.agreed) newErrors.agreed = 'Required';

        if (Object.keys(newErrors).length > 0) {
            setWarrantyErrors(newErrors);
            return;
        }

        console.log('Warranty Registration:', warrantyData);
        alert('Warranty Registration Submitted Successfully!');
    };

    const handleComplaintSubmit = (e: React.FormEvent) => {
        e.preventDefault();
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

        console.log('Complaint Submission:', complaintData);
        alert('Complaint Submitted Successfully!');
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
            {/* Hero Section */}
            <section className="w-full bg-gradient-to-r from-[#1b3b79] to-[#4a4a4a] py-24 px-6">
                <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

                    {/* Left Column: Title */}
                    <div className="w-full text-left">
                        <h1 className="font-heading text-[46px] md:text-[56px] text-white uppercase leading-tight">
                            Customer Support<br />Center
                        </h1>
                    </div>

                    {/* Right Column: Text & Actions */}
                    <div className="w-full flex flex-col gap-8 text-left">
                        <p className="font-questrial text-[18px] md:text-[20px] text-white leading-relaxed">
                            We're here to make your experience smooth and hassle-free! Register your device warranty in just a few clicks and enjoy peace of mind knowing you're covered. Need assistance? Our complaint form is designed to resolve any issues quickly. We're committed to providing fast, reliable support every step of the way!
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

            {/* 1. Warranty Form Section - Animated */}
            <div
                className={`grid transition-[grid-template-rows,opacity] duration-1000 ease-in-out ${isWarrantyVisible ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <div className="overflow-hidden">
                    <section
                        ref={warrantyFormRef}
                        className="w-full py-24 px-6 relative"
                        style={{
                            background: `
                                radial-gradient(circle at 0% 0%, #49608f 0%, transparent 50%),
                                radial-gradient(circle at 0% 100%, #353535 0%, transparent 50%),
                                radial-gradient(circle at 100% 0%, #4f4f4f 0%, transparent 50%),
                                radial-gradient(circle at 100% 100%, #3a568f 0%, transparent 50%),
                                #b6b6b7
                            `
                        }}
                    >
                        <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">

                            {/* Left Column: Form */}
                            <div className="w-full bg-white/10 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-xl">
                                <h3 className="font-ui font-medium text-[42px] text-black uppercase mb-8 leading-tight text-left">
                                    Warranty Form
                                </h3>

                                <form onSubmit={handleWarrantySubmit} className="flex flex-col gap-6 text-left">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-black font-bold text-sm">First Name</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={warrantyData.firstName}
                                                onChange={handleWarrantyInputChange}
                                                placeholder="Enter your first name"
                                                className="bg-white p-3 rounded-lg outline-none text-black placeholder:text-gray-400"
                                            />
                                            {warrantyErrors.firstName && <span className="text-red-600 text-xs">{warrantyErrors.firstName}</span>}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-black font-bold text-sm">Last Name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={warrantyData.lastName}
                                                onChange={handleWarrantyInputChange}
                                                placeholder="Enter your last name"
                                                className="bg-white p-3 rounded-lg outline-none text-black placeholder:text-gray-400"
                                            />
                                            {warrantyErrors.lastName && <span className="text-red-600 text-xs">{warrantyErrors.lastName}</span>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-black font-bold text-sm">Phone</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={warrantyData.phone}
                                                onChange={handleWarrantyInputChange}
                                                placeholder="Enter your phone number"
                                                className="bg-white p-3 rounded-lg outline-none text-black placeholder:text-gray-400"
                                            />
                                            {warrantyErrors.phone && <span className="text-red-600 text-xs">{warrantyErrors.phone}</span>}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-black font-bold text-sm">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={warrantyData.email}
                                                onChange={handleWarrantyInputChange}
                                                placeholder="Enter your email"
                                                className="bg-white p-3 rounded-lg outline-none text-black placeholder:text-gray-400"
                                            />
                                            {warrantyErrors.email && <span className="text-red-600 text-xs">{warrantyErrors.email}</span>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-black font-bold text-sm">Date</label>
                                            <input
                                                type="date"
                                                name="date"
                                                min={today}
                                                value={warrantyData.date}
                                                onChange={handleWarrantyInputChange}
                                                className="bg-white p-3 rounded-lg outline-none text-black cursor-pointer"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-black font-bold text-sm">Device Type</label>
                                            <select
                                                name="deviceType"
                                                value={warrantyData.deviceType}
                                                onChange={handleWarrantyInputChange}
                                                className="bg-white p-3 rounded-lg outline-none text-black cursor-pointer appearance-none"
                                            >
                                                <option value="">Select Device Type</option>
                                                {deviceTypes.map(type => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                            {warrantyErrors.deviceType && <span className="text-red-600 text-xs">{warrantyErrors.deviceType}</span>}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-black font-bold text-sm">Device Serial No</label>
                                        <input
                                            type="text"
                                            name="serialNo"
                                            value={warrantyData.serialNo}
                                            onChange={handleWarrantyInputChange}
                                            placeholder="Enter your serial number"
                                            className="bg-white p-3 rounded-lg outline-none text-black placeholder:text-gray-400"
                                        />
                                        {warrantyErrors.serialNo && <span className="text-red-600 text-xs">{warrantyErrors.serialNo}</span>}
                                    </div>

                                    <div className="flex items-center gap-3 py-2">
                                        <input
                                            type="checkbox"
                                            name="agreed"
                                            id="warranty-terms"
                                            checked={warrantyData.agreed}
                                            onChange={handleWarrantyInputChange}
                                            className="w-5 h-5 cursor-pointer accent-[#1e4186]"
                                        />
                                        <label htmlFor="warranty-terms" className="text-black font-medium text-sm cursor-pointer select-none">
                                            I agree to all the Terms & Conditions
                                        </label>
                                        {warrantyErrors.agreed && <span className="text-red-600 text-xs ml-auto">{warrantyErrors.agreed}</span>}
                                    </div>

                                    <div className="flex gap-4">
                                        <button type="submit" className="flex-1 bg-[#1e4186] hover:bg-[#152e60] text-white font-questrial py-4 px-10 rounded-full transition-all shadow-lg font-bold text-[18px] mt-4 uppercase">
                                            Generate Warranty
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsWarrantyVisible(false)}
                                            className="bg-gray-200 hover:bg-gray-300 text-black font-questrial py-4 px-10 rounded-full transition-all font-bold text-[18px] mt-4 uppercase"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Right Column: Info */}
                            <div className="w-full flex flex-col gap-8 pt-8 md:pt-20 text-left text-black">
                                <h2 className="font-ui font-medium text-[40px] md:text-[47px] leading-tight">
                                    Register Your Device Warranty
                                </h2>
                                <p className="font-questrial text-[20px] leading-relaxed">
                                    Fill out the form to activate your warranty and enjoy hassle-free service. Ensure your device is protected and get quick support when you need it!
                                </p>
                            </div>

                        </div>
                    </section>
                </div>
            </div>

            {/* 2. My Warranties Table Section */}
            <section className="w-full bg-gradient-to-r from-[#1a3976] to-[#000000] py-24 px-6">
                <div className="max-w-[1300px] mx-auto">
                    <h2 className="font-ui font-medium text-[40px] md:text-[47px] text-white uppercase mb-12 text-left">
                        My Warranties
                    </h2>

                    <div className="w-full overflow-x-auto rounded-2xl shadow-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                        <table className="w-full text-left border-collapse min-w-[900px]">
                            <thead>
                                <tr className="bg-white/10 text-white font-ui font-medium uppercase tracking-wider text-sm">
                                    <th className="px-6 py-5">Warranty No.</th>
                                    <th className="px-6 py-5">Device</th>
                                    <th className="px-6 py-5">Starting Date</th>
                                    <th className="px-6 py-5">Parts Warranty</th>
                                    <th className="px-6 py-5">PCB Warranty</th>
                                    <th className="px-6 py-5">Compressor Warranty</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-white/90">
                                {mockWarranties.map((warranty, index) => (
                                    <tr key={index} className="font-questrial text-[16px] hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-6 font-bold text-white">{warranty.no}</td>
                                        <td className="px-6 py-6">{warranty.device}</td>
                                        <td className="px-6 py-6 font-ui">{warranty.startDate}</td>
                                        <td className="px-6 py-6 text-blue-300">{warranty.parts}</td>
                                        <td className="px-6 py-6 text-blue-200">{warranty.pcb}</td>
                                        <td className="px-6 py-6 text-green-300">{warranty.compressor}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* 3. Complaint Form Section - Animated */}
            <div
                className={`grid transition-[grid-template-rows,opacity] duration-1000 ease-in-out ${isComplaintVisible ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <div className="overflow-hidden">
                    <section
                        ref={complaintFormRef}
                        className="w-full py-24 px-6 relative"
                        style={{
                            background: `
                                radial-gradient(circle at 0% 0%, #49608f 0%, transparent 50%),
                                radial-gradient(circle at 0% 100%, #353535 0%, transparent 50%),
                                radial-gradient(circle at 100% 0%, #4f4f4f 0%, transparent 50%),
                                radial-gradient(circle at 100% 100%, #3a568f 0%, transparent 50%),
                                #b6b6b7
                            `
                        }}
                    >
                        <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">

                            {/* Left Column: Form */}
                            <div className="w-full bg-white/10 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-xl">
                                <h3 className="font-ui font-medium text-[42px] text-black uppercase mb-8 leading-tight text-left">
                                    Complaint Form
                                </h3>

                                <form onSubmit={handleComplaintSubmit} className="flex flex-col gap-6 text-left">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-black font-bold text-sm">First Name</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={complaintData.firstName}
                                                onChange={handleComplaintInputChange}
                                                placeholder="Enter your first name"
                                                className="bg-white p-3 rounded-lg outline-none text-black placeholder:text-gray-400"
                                            />
                                            {complaintErrors.firstName && <span className="text-red-600 text-xs">{complaintErrors.firstName}</span>}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-black font-bold text-sm">Last Name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={complaintData.lastName}
                                                onChange={handleComplaintInputChange}
                                                placeholder="Enter your last name"
                                                className="bg-white p-3 rounded-lg outline-none text-black placeholder:text-gray-400"
                                            />
                                            {complaintErrors.lastName && <span className="text-red-600 text-xs">{complaintErrors.lastName}</span>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-black font-bold text-sm">Phone</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={complaintData.phone}
                                                onChange={handleComplaintInputChange}
                                                placeholder="Enter your phone number"
                                                className="bg-white p-3 rounded-lg outline-none text-black placeholder:text-gray-400"
                                            />
                                            {complaintErrors.phone && <span className="text-red-600 text-xs">{complaintErrors.phone}</span>}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-black font-bold text-sm">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={complaintData.email}
                                                onChange={handleComplaintInputChange}
                                                placeholder="Enter your email"
                                                className="bg-white p-3 rounded-lg outline-none text-black placeholder:text-gray-400"
                                            />
                                            {complaintErrors.email && <span className="text-red-600 text-xs">{complaintErrors.email}</span>}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-black font-bold text-sm">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={complaintData.city}
                                            onChange={handleComplaintInputChange}
                                            placeholder="Enter your city"
                                            className="bg-white p-3 rounded-lg outline-none text-black placeholder:text-gray-400"
                                        />
                                        {complaintErrors.city && <span className="text-red-600 text-xs">{complaintErrors.city}</span>}
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-black font-bold text-sm">Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={complaintData.address}
                                            onChange={handleComplaintInputChange}
                                            placeholder="Enter your complete address"
                                            className="bg-white p-3 rounded-lg outline-none text-black placeholder:text-gray-400"
                                        />
                                        {complaintErrors.address && <span className="text-red-600 text-xs">{complaintErrors.address}</span>}
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-black font-bold text-sm">Complaint</label>
                                        <textarea
                                            name="complaint"
                                            value={complaintData.complaint}
                                            onChange={handleComplaintInputChange}
                                            placeholder="Describe your issue"
                                            rows={4}
                                            className="bg-white p-3 rounded-lg outline-none text-black placeholder:text-gray-400 resize-none font-questrial"
                                        />
                                        {complaintErrors.complaint && <span className="text-red-600 text-xs">{complaintErrors.complaint}</span>}
                                    </div>

                                    <div className="flex items-center gap-3 py-2">
                                        <input
                                            type="checkbox"
                                            name="agreed"
                                            id="complaint-terms"
                                            checked={complaintData.agreed}
                                            onChange={handleComplaintInputChange}
                                            className="w-5 h-5 cursor-pointer accent-[#1e4186]"
                                        />
                                        <label htmlFor="complaint-terms" className="text-black font-medium text-sm cursor-pointer select-none">
                                            I agree to all the Terms & Conditions
                                        </label>
                                        {complaintErrors.agreed && <span className="text-red-600 text-xs ml-auto">{complaintErrors.agreed}</span>}
                                    </div>

                                    <div className="flex gap-4">
                                        <button type="submit" className="flex-1 bg-[#1e4186] hover:bg-[#152e60] text-white font-questrial py-4 px-10 rounded-full transition-all shadow-lg font-bold text-[18px] mt-4 uppercase">
                                            Submit Complaint
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsComplaintVisible(false)}
                                            className="bg-gray-200 hover:bg-gray-300 text-black font-questrial py-4 px-10 rounded-full transition-all font-bold text-[18px] mt-4 uppercase"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Right Column: Info */}
                            <div className="w-full flex flex-col gap-8 pt-8 md:pt-20 text-left text-black">
                                <h2 className="font-ui font-medium text-[40px] md:text-[47px] leading-tight">
                                    SUBMIT A COMPLAINT
                                </h2>
                                <p className="font-questrial text-[20px] leading-relaxed">
                                    Have an issue? Fill out the form, and we’ll work to resolve it quickly. Our team is here to ensure you get the support you need!
                                </p>
                            </div>

                        </div>
                    </section>
                </div>
            </div>

            {/* 4. My Complaints Table Section */}
            <section className="w-full bg-gradient-to-r from-[#1a3976] to-[#000000] py-24 px-6">
                <div className="max-w-[1300px] mx-auto">
                    <h2 className="font-ui font-medium text-[40px] md:text-[47px] text-white uppercase mb-12 text-left">
                        My Complaints
                    </h2>

                    <div className="w-full overflow-x-auto rounded-2xl shadow-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                        <table className="w-full text-left border-collapse min-w-[700px]">
                            <thead>
                                <tr className="bg-white/10 text-white font-ui font-medium uppercase tracking-wider text-sm">
                                    <th className="px-6 py-5">Complaint ID</th>
                                    <th className="px-6 py-5">Complaint</th>
                                    <th className="px-6 py-5">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-white/90">
                                {mockComplaints.map((complaint, index) => (
                                    <tr key={index} className="font-questrial text-[16px] hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-6 font-bold text-white">{complaint.id}</td>
                                        <td className="px-6 py-6 max-w-[400px] truncate">{complaint.text}</td>
                                        <td className="px-6 py-6">
                                            <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase ${complaint.status === 'Resolved' ? 'bg-green-500/20 text-green-400' :
                                                    complaint.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                                                        'bg-yellow-500/20 text-yellow-400'
                                                }`}>
                                                {complaint.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
}
