import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, updateDoc, collectionGroup, query, orderBy } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from '../context/AuthContext';

type Brand = 'Elios' | 'Sabro';
type Tab = 'Customers' | 'Warranties' | 'Complaints' | 'Messages';

export default function Admin() {
    const { user, userData } = useAuth();
    const [activeBrand, setActiveBrand] = useState<Brand>('Elios');
    const [activeTab, setActiveTab] = useState<Tab>('Customers');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    const [data, setData] = useState({
        Elios: { Customers: [] as any[], Warranties: [] as any[], Complaints: [] as any[] },
        Sabro: { Customers: [] as any[], Warranties: [] as any[], Complaints: [] as any[] },
        Messages: [] as any[]
    });

    // Role-based logic
    const isGlobalAdmin = userData?.role === 'admin';

    useEffect(() => {
        if (!user) return;

        // Fetch Customers from 'Customers' (All web users)
        const unsubCustomers = onSnapshot(collection(db, 'Customers'), (snapshot) => {
            const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), _collection: 'Customers' })) as any[];

            const eliosC = docs.filter(d => d.brand !== 'Sabro'); // Default to Elios if not specified
            const sabroC = docs.filter(d => d.brand === 'Sabro');

            setData(prev => ({
                ...prev,
                Elios: { ...prev.Elios, Customers: eliosC },
                Sabro: { ...prev.Sabro, Customers: [...prev.Sabro.Customers.filter(d => d._collection === 'Sabro Customers'), ...sabroC] }
            }));
            setLoading(false);
        });

        // Fetch Sabro Customers from 'Sabro Customers' (Read-only/Legacy)
        const unsubSabroLegacy = onSnapshot(collection(db, 'Sabro Customers'), (snapshot) => {
            const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), _collection: 'Sabro Customers' }));

            setData(prev => ({
                ...prev,
                Sabro: { ...prev.Sabro, Customers: [...prev.Sabro.Customers.filter(d => d._collection === 'Customers'), ...docs] }
            }));
        });

        // Fetch All Warranties (Collection Group)
        const unsubWarranties = onSnapshot(query(collectionGroup(db, 'Warranties')), (snapshot) => {
            const docs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                customerId: doc.ref.parent.parent?.id,
                _path: doc.ref.path,
                _collection: doc.ref.path.includes('Sabro Customers') ? 'Sabro Customers' : 'Customers'
            }));

            const eliosW = docs.filter(d => d._collection === 'Customers');
            const sabroW = docs.filter(d => d._collection === 'Sabro Customers');

            setData(prev => ({
                ...prev,
                Elios: { ...prev.Elios, Warranties: eliosW },
                Sabro: { ...prev.Sabro, Warranties: sabroW }
            }));
        });

        // Fetch All Complaints (Collection Group)
        const unsubComplaints = onSnapshot(query(collectionGroup(db, 'Complaints')), (snapshot) => {
            const docs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                customerId: doc.ref.parent.parent?.id,
                _path: doc.ref.path,
                _collection: doc.ref.path.includes('Sabro Customers') ? 'Sabro Customers' : 'Customers'
            }));

            const eliosC = docs.filter(d => d._collection === 'Customers');
            const sabroC = docs.filter(d => d._collection === 'Sabro Customers');

            setData(prev => ({
                ...prev,
                Elios: { ...prev.Elios, Complaints: eliosC },
                Sabro: { ...prev.Sabro, Complaints: sabroC }
            }));
        });

        // Fetch Contact Messages
        const unsubMessages = onSnapshot(query(collection(db, 'ContactMessages'), orderBy('createdAt', 'desc')), (snapshot) => {
            const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setData(prev => ({ ...prev, Messages: docs }));
        });

        return () => {
            unsubCustomers();
            unsubSabroLegacy();
            unsubWarranties();
            unsubComplaints();
            unsubMessages();
        };
    }, [user]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const handleUpdateStatus = async (item: any, tab: Tab, field: string, value: string) => {
        try {
            const coll = item._collection;
            const docRef = doc(db, coll, item.customerId, tab, item.id);
            await updateDoc(docRef, { [field]: value });
        } catch (error) {
            console.error('Update failed:', error);
            alert('Failed to update record.');
        }
    };

    const handleMessageAction = async (msgId: string, field: string, value: any) => {
        try {
            const docRef = doc(db, 'ContactMessages', msgId);
            await updateDoc(docRef, { [field]: value });
        } catch (error) {
            console.error('Message action failed:', error);
        }
    };

    const applyRoleFilter = (items: any[]) => {
        if (isGlobalAdmin) return items;
        return [];
    };

    const getFilteredData = () => {
        if (activeTab === 'Messages') {
            const msgs = data.Messages;
            if (!searchQuery) return msgs;
            return msgs.filter(m =>
                m.firstName?.toLowerCase().includes(searchQuery) ||
                m.email?.toLowerCase().includes(searchQuery) ||
                m.message?.toLowerCase().includes(searchQuery)
            );
        }

        const currentData = data[activeBrand][activeTab as Exclude<Tab, 'Messages'>];
        const roleFiltered = applyRoleFilter(currentData);

        if (!searchQuery) return roleFiltered;

        return roleFiltered.filter((item: any) => {
            const searchStr = searchQuery.toLowerCase();
            return (
                item.firstname?.toLowerCase().includes(searchStr) ||
                item.lastname?.toLowerCase().includes(searchStr) ||
                item.phone?.includes(searchStr) ||
                item.email?.toLowerCase().includes(searchStr) ||
                item.id?.toLowerCase().includes(searchStr) ||
                item.deviceserial?.toLowerCase().includes(searchStr)
            );
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
                                className={`h-full px-4 text-[24px] font-heading font-bold lowercase tracking-widest transition-all relative ${activeBrand === brand && activeTab !== 'Messages' ? 'text-[#1e4186]' : 'text-gray-400'
                                    }`}
                            >
                                {brand === 'Elios' ? 'elios' : 'sabro'}
                                {activeBrand === brand && activeTab !== 'Messages' && (
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-[#1e4186] rounded-t-full"></div>
                                )}
                            </button>
                        ))}
                    </div>
                    <div className="text-sm font-bold text-[#1e4186] bg-blue-50 px-4 py-2 rounded-full">
                        {userData?.role || 'Admin'} Panel
                    </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 py-10">
                {/* Minimal sub-navbar & Search */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div className="flex bg-gray-200/50 p-1 rounded-xl">
                        {(['Customers', 'Warranties', 'Complaints', 'Messages'] as Tab[]).map(tab => (
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
                    {loading ? (
                        <div className="p-20 text-center text-gray-400 animate-pulse">Loading data...</div>
                    ) : (
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
                                        <th className="px-6 py-5">Warranty ID</th>
                                        <th className="px-6 py-5">Customer</th>
                                        <th className="px-6 py-5">Serial No.</th>
                                        <th className="px-6 py-5">Device</th>
                                        <th className="px-6 py-5">Start Date</th>
                                        <th className="px-6 py-5">End Date</th>
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
                                    </tr>
                                )}
                                {activeTab === 'Messages' && (
                                    <tr className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        <th className="px-6 py-5">Status</th>
                                        <th className="px-6 py-5">Name / Email</th>
                                        <th className="px-6 py-5">Phone</th>
                                        <th className="px-6 py-5">Message</th>
                                        <th className="px-6 py-5">Date</th>
                                        <th className="px-6 py-5 text-center">Actions</th>
                                    </tr>
                                )}
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {getFilteredData().map((item: any) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors font-questrial text-sm text-gray-700">
                                        {activeTab === 'Customers' && (
                                            <>
                                                <td className="px-6 py-5 font-bold text-gray-900">{item.firstname}</td>
                                                <td className="px-6 py-5">{item.lastname}</td>
                                                <td className="px-6 py-5">{item.phone}</td>
                                                <td className="px-6 py-5 text-blue-600">{item.email}</td>
                                                <td className="px-6 py-5 text-gray-500">{item.address}</td>
                                                <td className="px-6 py-5">{item.city}</td>
                                                <td className="px-6 py-5 text-gray-400">
                                                    {item.createdAt instanceof Object && 'toDate' in item.createdAt
                                                        ? item.createdAt.toDate().toLocaleDateString()
                                                        : String(item.createdAt || '')}
                                                </td>
                                            </>
                                        )}
                                        {activeTab === 'Warranties' && (
                                            <>
                                                <td className="px-6 py-5 font-bold text-[#1e4186]">{item.id}</td>
                                                <td className="px-6 py-5">
                                                    <div className="font-bold text-gray-900">{item.firstname} {item.lastname}</div>
                                                    <div className="text-xs text-gray-400">{item.phone}</div>
                                                </td>
                                                <td className="px-6 py-5 font-mono text-xs">{item.deviceserial}</td>
                                                <td className="px-6 py-5">{item.devicedetails}</td>
                                                <td className="px-6 py-5">{item.startdate}</td>
                                                <td className="px-6 py-5 text-red-500 font-bold">{item.endingdate}</td>
                                            </>
                                        )}
                                        {activeTab === 'Complaints' && (
                                            <>
                                                <td className="px-6 py-5 font-bold text-[#1e4186]">{item.id}</td>
                                                <td className="px-6 py-5">
                                                    <div className="font-bold text-gray-900">{item.firstname} {item.lastname}</div>
                                                    <div className="text-xs text-gray-400">{item.phone}</div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="text-gray-900">{item.city}</div>
                                                    <div className="text-xs text-gray-400">{item.address}</div>
                                                </td>
                                                <td className="px-6 py-5">{item.complaintdate}</td>
                                                <td className="px-6 py-5 max-w-[200px] truncate" title={item.complaint}>{item.complaint}</td>
                                                <td className="px-6 py-5">
                                                    <select
                                                        value={item.complaintstatus}
                                                        onChange={(e) => handleUpdateStatus(item, 'Complaints', 'complaintstatus', e.target.value)}
                                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold outline-none cursor-pointer border ${item.complaintstatus === 'Resolved' ? 'bg-green-50 text-green-600 border-green-200' :
                                                            item.complaintstatus === 'In Progress' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                                                                'bg-yellow-50 text-yellow-600 border-yellow-200'
                                                            }`}
                                                    >
                                                        <option value="Registered">Registered</option>
                                                        <option value="In Progress">In Progress</option>
                                                        <option value="Resolved">Resolved</option>
                                                    </select>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <input
                                                        type="date"
                                                        value={item.closingdate}
                                                        onChange={(e) => handleUpdateStatus(item, 'Complaints', 'closingdate', e.target.value)}
                                                        className="bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg text-xs outline-none cursor-pointer focus:border-[#1e4186]"
                                                    />
                                                </td>
                                            </>
                                        )}
                                        {activeTab === 'Messages' && (
                                            <>
                                                <td className="px-6 py-5">
                                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${item.status === 'New' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="font-bold text-gray-900">{item.firstName} {item.lastName}</div>
                                                    <div className="text-xs text-blue-500">{item.email}</div>
                                                </td>
                                                <td className="px-6 py-5">{item.countryCode} {item.phone}</td>
                                                <td className="px-6 py-5 max-w-[300px] truncate" title={item.message}>{item.message}</td>
                                                <td className="px-6 py-5 text-gray-400 text-xs">
                                                    {item.createdAt?.toDate().toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-5 text-center">
                                                    <div className="flex justify-center gap-2">
                                                        <button
                                                            onClick={() => handleMessageAction(item.id, 'status', item.status === 'New' ? 'Read' : 'New')}
                                                            className={`p-1.5 rounded-lg border transition-colors ${item.status === 'Read' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-gray-50 text-gray-400 border-gray-200'}`}
                                                            title="Mark as Read"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                                        </button>
                                                        <button
                                                            onClick={() => handleMessageAction(item.id, 'starred', !item.starred)}
                                                            className={`p-1.5 rounded-lg border transition-colors ${item.starred ? 'bg-yellow-50 text-yellow-600 border-yellow-200' : 'bg-gray-50 text-gray-400 border-gray-200'}`}
                                                            title="Star Message"
                                                        >
                                                            <svg className="w-4 h-4" fill={item.starred ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    {!loading && getFilteredData().length === 0 && (
                        <div className="p-20 text-center text-gray-400 font-questrial italic">
                            No records found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
