import { useState } from 'react';

type Brand = 'Elios' | 'Sabro';
type Tab = 'Customers' | 'Warranties' | 'Complaints';

export default function Admin() {
    const [activeBrand, setActiveBrand] = useState<Brand>('Elios');
    const [activeTab, setActiveTab] = useState<Tab>('Customers');
    const [searchQuery, setSearchQuery] = useState('');

    // Mock Data State (normally from Firestore)
    const [data, setData] = useState({
        Elios: {
            Customers: [
                { firstName: 'Ahmed', lastName: 'Khan', contact: '0300-1234567', email: 'ahmed@example.com', address: 'H-12', city: 'Islamabad', joinedOn: '2025-01-01' },
                { firstName: 'Sara', lastName: 'Ali', contact: '0321-9876543', email: 'sara@example.com', address: 'Gulberg', city: 'Lahore', joinedOn: '2025-01-10' },
            ],
            Warranties: [
                { firstName: 'Ahmed', lastName: 'Khan', contact: '0300-1234567', email: 'ahmed@example.com', warrantyNo: 'W-EL-001', serialNo: 'SN123', device: '1.5 Ton Split - LED', startDate: '2025-01-15', parts: '1 Year', pcb: '3 Years', compressor: '10 Years' },
            ],
            Complaints: [
                { tid: 'T-EL-001', name: 'Ahmed Khan', contact: '0300-1234567', city: 'Islamabad', address: 'H-12', date: '2025-01-20', complaint: 'Cooling issue', status: 'Pending', closingDate: '' },
            ]
        },
        Sabro: {
            Customers: [
                { firstName: 'Zain', lastName: 'Malik', contact: '0333-5556667', email: 'zain@example.com', address: 'Sector F-7', city: 'Islamabad', joinedOn: '2024-12-20' },
            ],
            Warranties: [],
            Complaints: []
        }
    });

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const handleComplaintUpdate = (brand: Brand, index: number, field: 'status' | 'closingDate', value: string) => {
        const newData = { ...data };
        (newData[brand].Complaints[index] as any)[field] = value;
        setData(newData);
    };

    const handleSave = () => {
        alert('Changes saved to database (mock)!');
    };

    const filteredData = () => {
        const currentData = data[activeBrand][activeTab];
        if (!searchQuery) return currentData;

        return currentData.filter((item: any) => {
            if (activeTab === 'Customers') {
                return item.firstName.toLowerCase().includes(searchQuery) ||
                    item.contact.includes(searchQuery) ||
                    item.city.toLowerCase().includes(searchQuery);
            }
            if (activeTab === 'Warranties') {
                return item.firstName.toLowerCase().includes(searchQuery) ||
                    item.warrantyNo.toLowerCase().includes(searchQuery) ||
                    item.serialNo.toLowerCase().includes(searchQuery) ||
                    item.contact.includes(searchQuery);
            }
            if (activeTab === 'Complaints') {
                return item.tid.toLowerCase().includes(searchQuery) ||
                    item.name.toLowerCase().includes(searchQuery) ||
                    item.contact.includes(searchQuery);
            }
            return true;
        });
    };

    return (
        <div className="w-full bg-[#f8fafc] min-h-screen">
            {/* Header / Brand Tabs */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex gap-12 h-full">
                        {(['Elios', 'Sabro'] as Brand[]).map(brand => (
                            <button
                                key={brand}
                                onClick={() => setActiveBrand(brand)}
                                className={`h-full px-4 text-[24px] font-heading font-bold lowercase tracking-widest transition-all relative ${activeBrand === brand ? 'text-[#1e4186]' : 'text-gray-400'
                                    }`}
                            >
                                {brand === 'Elios' ? 'elios' : 'sabro'}
                                {activeBrand === brand && (
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-[#1e4186] rounded-t-full"></div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 py-10">
                {/* Minimal sub-navbar & Search */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div className="flex bg-gray-200/50 p-1 rounded-xl">
                        {(['Customers', 'Warranties', 'Complaints'] as Tab[]).map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === tab ? 'bg-white text-[#1e4186] shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="relative">
                        <input
                            type="text"
                            placeholder={`Search ${activeTab.toLowerCase()}...`}
                            value={searchQuery}
                            onChange={handleSearch}
                            className="w-full md:w-[320px] bg-white border border-gray-200 px-5 py-3 rounded-2xl outline-none focus:border-[#1e4186] transition-all text-sm font-questrial"
                        />
                        <svg className="absolute right-4 top-3.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden overflow-x-auto">
                    <table className="w-full text-left min-w-[1000px]">
                        <thead className="bg-[#f1f5f9] border-b border-gray-100">
                            {activeTab === 'Customers' && (
                                <tr className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    <th className="px-6 py-5">First Name</th>
                                    <th className="px-6 py-5">Last Name</th>
                                    <th className="px-6 py-5">Contact</th>
                                    <th className="px-6 py-5">Email</th>
                                    <th className="px-6 py-5">Address</th>
                                    <th className="px-6 py-5">City</th>
                                    <th className="px-6 py-5">Joined On</th>
                                </tr>
                            )}
                            {activeTab === 'Warranties' && (
                                <tr className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    <th className="px-6 py-5">Customer</th>
                                    <th className="px-6 py-5">Contact</th>
                                    <th className="px-6 py-5">Warranty No.</th>
                                    <th className="px-6 py-5">Serial No.</th>
                                    <th className="px-6 py-5">Device</th>
                                    <th className="px-6 py-5">Start Date</th>
                                    <th className="px-6 py-5">Warranties (P/PCB/C)</th>
                                </tr>
                            )}
                            {activeTab === 'Complaints' && (
                                <tr className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    <th className="px-6 py-5">TID</th>
                                    <th className="px-6 py-5">Name / Contact</th>
                                    <th className="px-6 py-5">Location</th>
                                    <th className="px-6 py-5">Date</th>
                                    <th className="px-6 py-5">Complaint</th>
                                    <th className="px-6 py-5">Status</th>
                                    <th className="px-6 py-5">Closing Date</th>
                                    <th className="px-6 py-5 text-center">Action</th>
                                </tr>
                            )}
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredData().map((item: any, idx: number) => (
                                <tr key={idx} className="hover:bg-gray-50 transition-colors font-questrial text-sm text-gray-700">
                                    {activeTab === 'Customers' && (
                                        <>
                                            <td className="px-6 py-5 font-bold text-gray-900">{item.firstName}</td>
                                            <td className="px-6 py-5 text-gray-900">{item.lastName}</td>
                                            <td className="px-6 py-5">{item.contact}</td>
                                            <td className="px-6 py-5 text-blue-600">{item.email}</td>
                                            <td className="px-6 py-5 text-gray-500">{item.address}</td>
                                            <td className="px-6 py-5">{item.city}</td>
                                            <td className="px-6 py-5 text-gray-400">{item.joinedOn}</td>
                                        </>
                                    )}
                                    {activeTab === 'Warranties' && (
                                        <>
                                            <td className="px-6 py-5 font-bold text-gray-900">{item.firstName} {item.lastName}</td>
                                            <td className="px-6 py-5">{item.contact}</td>
                                            <td className="px-6 py-5 font-bold text-[#1e4186]">{item.warrantyNo}</td>
                                            <td className="px-6 py-5 text-gray-500">{item.serialNo}</td>
                                            <td className="px-6 py-5">{item.device}</td>
                                            <td className="px-6 py-5">{item.startDate}</td>
                                            <td className="px-6 py-5 flex gap-2">
                                                <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[10px] font-bold">P:{item.parts}</span>
                                                <span className="bg-purple-50 text-purple-600 px-2 py-0.5 rounded text-[10px] font-bold">PCB:{item.pcb}</span>
                                                <span className="bg-green-50 text-green-600 px-2 py-0.5 rounded text-[10px] font-bold">C:{item.compressor}</span>
                                            </td>
                                        </>
                                    )}
                                    {activeTab === 'Complaints' && (
                                        <>
                                            <td className="px-6 py-5 font-bold text-[#1e4186]">{item.tid}</td>
                                            <td className="px-6 py-5">
                                                <div className="font-bold text-gray-900">{item.name}</div>
                                                <div className="text-xs text-gray-400">{item.contact}</div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="text-gray-900">{item.city}</div>
                                                <div className="text-xs text-gray-400">{item.address}</div>
                                            </td>
                                            <td className="px-6 py-5">{item.date}</td>
                                            <td className="px-6 py-5 max-w-[200px] truncate" title={item.complaint}>{item.complaint}</td>
                                            <td className="px-6 py-5">
                                                <select
                                                    value={item.status}
                                                    onChange={(e) => handleComplaintUpdate(activeBrand, idx, 'status', e.target.value)}
                                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold outline-none cursor-pointer border ${item.status === 'Resolved' ? 'bg-green-50 text-green-600 border-green-200' :
                                                        item.status === 'In Progress' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                                                            'bg-yellow-50 text-yellow-600 border-yellow-200'
                                                        }`}
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="In Progress">In Progress</option>
                                                    <option value="Resolved">Resolved</option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-5">
                                                <input
                                                    type="date"
                                                    value={item.closingDate}
                                                    onChange={(e) => handleComplaintUpdate(activeBrand, idx, 'closingDate', e.target.value)}
                                                    className="bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg text-xs outline-none cursor-pointer focus:border-[#1e4186]"
                                                />
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <button
                                                    onClick={handleSave}
                                                    className="bg-[#1e4186] hover:bg-[#152e60] text-white px-5 py-2 rounded-xl text-xs font-bold transition-all"
                                                >
                                                    Save
                                                </button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredData().length === 0 && (
                        <div className="p-20 text-center text-gray-400 font-questrial italic">
                            No records found matching your search.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
