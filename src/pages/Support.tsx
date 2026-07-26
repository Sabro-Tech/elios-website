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

const AC_OPTIONS = [
    '1 Ton Split',
    '1.5 Ton Split - LED',
    '2 Ton Split - LCD',
    'Floor Standing - 2 Ton',
    'Floor Standing - 4 Ton',
    'Cassette Type - 2 Ton',
    'Cassette Type - 4 Ton',
];

const SERIAL_PATTERN = /^[A-Z]\d{4}-[A-Z]\d{4}-[A-Z]{2}\d{4}$/;

function StatusMark({ value, kind }: { value: string; kind: 'warranty' | 'complaint' }) {
    const v = (value || '').toLowerCase();
    let tone = 'text-ink-soft border-edge-strong';
    if (kind === 'warranty' || v === 'resolved') tone = 'text-signal-good border-signal-good/50';
    else if (v === 'in progress') tone = 'text-brand-lift border-brand-lift/50';

    return (
        <span className={`inline-block text-[10.5px] uppercase tracking-[0.16em] border rounded-full px-2.5 py-1 whitespace-nowrap ${tone}`}>
            {value}
        </span>
    );
}

const CloseIcon = () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden="true">
        <path d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export default function Support() {
    const { user } = useAuth();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [warrantyOpen, setWarrantyOpen] = useState(false);
    const [complaintOpen, setComplaintOpen] = useState(false);
    const [warranties, setWarranties] = useState<any[]>([]);
    const [complaints, setComplaints] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const today = new Date().toISOString().split('T')[0];

    const [warrantyData, setWarrantyData] = useState({
        firstname: '', lastname: '', phone: '', email: '',
        devicedetails: '', deviceserial: '', startdate: today, agreed: false,
    });

    const [complaintData, setComplaintData] = useState({
        firstname: '', lastname: '', phone: '', email: '', complaint: '', agreed: false,
    });

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;
            try {
                const data = await apiFetch<UserData>('/customers/me');
                setUserData(data);

                const identity = {
                    firstname: data.firstname, lastname: data.lastname,
                    phone: data.phone, email: data.email,
                };
                setWarrantyData((p) => ({ ...p, ...identity }));
                setComplaintData((p) => ({ ...p, ...identity }));

                const [w, c] = await Promise.all([
                    apiFetch<any[]>('/warranties'),
                    apiFetch<any[]>('/complaints'),
                ]);
                setWarranties(w);
                setComplaints(c);
            } catch (err) {
                console.error(err);
                setMessage({
                    type: 'error',
                    text: 'Could not load your records. Refresh the page, or call +92 321 8548557 if it keeps failing.',
                });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user]);

    useEffect(() => {
        if (!warrantyOpen && !complaintOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key !== 'Escape') return;
            setWarrantyOpen(false);
            setComplaintOpen(false);
        };
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [warrantyOpen, complaintOpen]);

    useEffect(() => {
        if (!message) return;
        const t = setTimeout(() => setMessage(null), 8000);
        return () => clearTimeout(t);
    }, [message]);

    const submitWarranty = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!SERIAL_PATTERN.test(warrantyData.deviceserial)) {
            setMessage({
                type: 'error',
                text: 'That serial number does not match the format on the unit sticker. It looks like A2627-E1046-XX1234.',
            });
            return;
        }
        if (!warrantyData.agreed) return;

        setSubmitting(true);
        setMessage(null);
        try {
            const created = await apiFetch('/warranties', { method: 'POST', body: warrantyData });
            setMessage({ type: 'success', text: 'Warranty registered. It is listed below and on file with our service desk.' });
            setWarrantyOpen(false);
            setWarranties([created, ...warranties]);
        } catch (err: any) {
            console.error('Warranty submission error:', err);
            setMessage({ type: 'error', text: err?.message || 'That did not save. Check your connection and try again.' });
        } finally {
            setSubmitting(false);
        }
    };

    const submitComplaint = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!complaintData.agreed) return;

        setSubmitting(true);
        setMessage(null);
        try {
            const created = await apiFetch('/complaints', { method: 'POST', body: complaintData });
            setMessage({ type: 'success', text: 'Complaint filed. It is in the service queue and you will be contacted on the number on your account.' });
            setComplaintOpen(false);
            setComplaints([created, ...complaints]);
        } catch (err: any) {
            console.error('Complaint submission error:', err);
            setMessage({ type: 'error', text: err?.message || 'That did not send. Check your connection and try again.' });
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center gap-5">
                <div className="w-8 h-8 rounded-full border border-edge-strong border-t-ink animate-spin" />
                <p className="kicker">Loading your records</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen">
            <section className="pt-[120px] lg:pt-[150px] pb-12 border-b border-edge">
                <div className="wrap flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                    <div>
                        <p className="kicker mb-5">Support desk</p>
                        <h1 className="display text-[2rem] sm:text-[2.75rem] lg:text-[3.5rem]">
                            {userData?.firstname ? <>Hello, <span className="heavy">{userData.firstname}.</span></> : 'Your account'}
                        </h1>
                        {userData && (
                            <p className="mt-5 text-[15px] text-ink-dim">{userData.email} · {userData.phone}</p>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <button onClick={() => setWarrantyOpen(true)} className="btn btn-accent"
                            style={{ ['--accent' as string]: 'var(--color-brand-lift)', ['--on-accent' as string]: '#06101F' }}>
                            Register a warranty
                        </button>
                        <button onClick={() => setComplaintOpen(true)} className="btn btn-line">File a complaint</button>
                    </div>
                </div>
            </section>

            <div className="wrap py-14 lg:py-20 flex flex-col gap-16">
                <section>
                    <div className="flex items-baseline justify-between gap-6 mb-6">
                        <h2 className="display text-[1.5rem] sm:text-[1.875rem]">Registered warranties</h2>
                        <span className="kicker num">{warranties.length} on file</span>
                    </div>

                    <div className="card overflow-x-auto">
                        <table className="ledger min-w-[860px]">
                            <thead>
                                <tr>
                                    <th>ID</th><th>Device</th><th>Serial number</th>
                                    <th>Start</th><th>Ends</th><th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {warranties.length ? warranties.map((w) => (
                                    <tr key={w.id}>
                                        <td className="num text-ink-dim">{w.id}</td>
                                        <td>{w.devicedetails}</td>
                                        <td className="num text-brand-lift whitespace-nowrap">{w.deviceserial}</td>
                                        <td className="num text-ink-soft whitespace-nowrap">{w.startdate}</td>
                                        <td className="num text-ink-soft whitespace-nowrap">{w.endingdate}</td>
                                        <td><StatusMark value={w.status || 'Verified'} kind="warranty" /></td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={6} className="py-14 text-center">
                                            <p className="text-ink-soft">No warranties registered yet.</p>
                                            <p className="text-[14px] text-ink-dim mt-2">
                                                Register your unit and the record stays with us — no receipt to keep.
                                            </p>
                                            <button onClick={() => setWarrantyOpen(true)} className="btn btn-line mt-6">
                                                Register a warranty
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section>
                    <div className="flex items-baseline justify-between gap-6 mb-6">
                        <h2 className="display text-[1.5rem] sm:text-[1.875rem]">Complaints</h2>
                        <span className="kicker num">{complaints.length} filed</span>
                    </div>

                    <div className="card overflow-x-auto">
                        <table className="ledger min-w-[860px]">
                            <thead>
                                <tr>
                                    <th>ID</th><th>Location</th><th>Date</th><th>Detail</th><th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {complaints.length ? complaints.map((c) => (
                                    <tr key={c.id}>
                                        <td className="num text-ink-dim">{c.id}</td>
                                        <td>
                                            <span className="block">{userData?.city}</span>
                                            <span className="block text-[13px] text-ink-dim mt-0.5">{userData?.address}</span>
                                        </td>
                                        <td className="num text-ink-soft whitespace-nowrap">{c.complaintdate}</td>
                                        <td className="max-w-xs text-ink-soft">{c.complaint}</td>
                                        <td><StatusMark value={c.complaintstatus || 'Registered'} kind="complaint" /></td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={5} className="py-14 text-center">
                                            <p className="text-ink-soft">Nothing filed — which is the good outcome.</p>
                                            <p className="text-[14px] text-ink-dim mt-2">
                                                If a unit is not behaving, tell us here and it goes straight into the service queue.
                                            </p>
                                            <button onClick={() => setComplaintOpen(true)} className="btn btn-line mt-6">
                                                File a complaint
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>

            {/* Warranty registration */}
            {warrantyOpen && (
                <div role="dialog" aria-modal="true" aria-label="Register warranty"
                    className="fixed inset-0 z-100 flex items-end sm:items-center justify-center sm:p-6">
                    <div className="absolute inset-0 bg-ground/85 backdrop-blur-sm" onClick={() => setWarrantyOpen(false)} />

                    <div className="relative card w-full max-w-2xl p-7 sm:p-10 max-h-[92vh] overflow-y-auto anim-rise">
                        <div className="flex items-start justify-between gap-6 mb-7">
                            <div>
                                <p className="kicker mb-3">New registration</p>
                                <h2 className="display text-[1.5rem] sm:text-[1.875rem]">Register a warranty</h2>
                            </div>
                            <button onClick={() => setWarrantyOpen(false)} aria-label="Close"
                                className="flex-none w-10 h-10 grid place-items-center rounded-full border border-edge-strong text-ink-dim hover:text-ink transition-colors cursor-pointer">
                                <CloseIcon />
                            </button>
                        </div>

                        <form onSubmit={submitWarranty} className="flex flex-col gap-5">
                            <div className="grid sm:grid-cols-2 gap-5">
                                <div className="flex flex-col gap-2.5">
                                    <label htmlFor="w-first" className="field-label">First name</label>
                                    <input id="w-first" readOnly value={warrantyData.firstname} className="field" />
                                </div>
                                <div className="flex flex-col gap-2.5">
                                    <label htmlFor="w-last" className="field-label">Last name</label>
                                    <input id="w-last" readOnly value={warrantyData.lastname} className="field" />
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-5">
                                <div className="flex flex-col gap-2.5">
                                    <label htmlFor="w-model" className="field-label">Model type</label>
                                    <select id="w-model" required className="field" value={warrantyData.devicedetails}
                                        onChange={(e) => setWarrantyData({ ...warrantyData, devicedetails: e.target.value })}>
                                        <option value="">Select a model</option>
                                        {AC_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2.5">
                                    <label htmlFor="w-serial" className="field-label">Serial number</label>
                                    <input id="w-serial" required placeholder="A2627-E1046-XX1234" className="field num"
                                        value={warrantyData.deviceserial}
                                        onChange={(e) => setWarrantyData({ ...warrantyData, deviceserial: e.target.value.toUpperCase() })} />
                                    <p className="text-[13px] text-ink-dim">Printed on the sticker on the indoor unit.</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2.5">
                                <label htmlFor="w-date" className="field-label">Purchase date</label>
                                {/* max, not min: a unit bought last month must still be registerable */}
                                <input id="w-date" type="date" required max={today} className="field num"
                                    value={warrantyData.startdate}
                                    onChange={(e) => setWarrantyData({ ...warrantyData, startdate: e.target.value })} />
                            </div>

                            <label htmlFor="agreeW" className="flex items-start gap-3.5 rounded-xl border border-edge bg-ground-alt p-4 cursor-pointer">
                                <input type="checkbox" id="agreeW" className="mt-0.5 w-4 h-4 accent-[#4E86E8] cursor-pointer"
                                    checked={warrantyData.agreed}
                                    onChange={(e) => setWarrantyData({ ...warrantyData, agreed: e.target.checked })} />
                                <span className="text-[14px] text-ink-soft leading-relaxed">
                                    I confirm the serial number above matches the sticker on the unit.
                                </span>
                            </label>

                            <button type="submit" disabled={submitting || !warrantyData.agreed}
                                className="btn btn-accent w-full py-4"
                                style={{ ['--accent' as string]: 'var(--color-brand-lift)', ['--on-accent' as string]: '#06101F' }}>
                                {submitting ? 'Registering…' : 'Register warranty'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Complaint */}
            {complaintOpen && (
                <div role="dialog" aria-modal="true" aria-label="File a complaint"
                    className="fixed inset-0 z-100 flex items-end sm:items-center justify-center sm:p-6">
                    <div className="absolute inset-0 bg-ground/85 backdrop-blur-sm" onClick={() => setComplaintOpen(false)} />

                    <div className="relative card w-full max-w-2xl p-7 sm:p-10 max-h-[92vh] overflow-y-auto anim-rise">
                        <div className="flex items-start justify-between gap-6 mb-7">
                            <div>
                                <p className="kicker mb-3">Service request</p>
                                <h2 className="display text-[1.5rem] sm:text-[1.875rem]">File a complaint</h2>
                            </div>
                            <button onClick={() => setComplaintOpen(false)} aria-label="Close"
                                className="flex-none w-10 h-10 grid place-items-center rounded-full border border-edge-strong text-ink-dim hover:text-ink transition-colors cursor-pointer">
                                <CloseIcon />
                            </button>
                        </div>

                        <form onSubmit={submitComplaint} className="flex flex-col gap-5">
                            <div className="grid sm:grid-cols-2 gap-5">
                                <div className="flex flex-col gap-2.5">
                                    <label htmlFor="c-first" className="field-label">First name</label>
                                    <input id="c-first" readOnly value={complaintData.firstname} className="field" />
                                </div>
                                <div className="flex flex-col gap-2.5">
                                    <label htmlFor="c-last" className="field-label">Last name</label>
                                    <input id="c-last" readOnly value={complaintData.lastname} className="field" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2.5">
                                <label htmlFor="c-detail" className="field-label">What is happening?</label>
                                <textarea id="c-detail" required rows={5} className="field resize-y"
                                    placeholder="Which unit, what it is doing, and when it started."
                                    value={complaintData.complaint}
                                    onChange={(e) => setComplaintData({ ...complaintData, complaint: e.target.value })} />
                            </div>

                            <label htmlFor="agreeC" className="flex items-start gap-3.5 rounded-xl border border-edge bg-ground-alt p-4 cursor-pointer">
                                <input type="checkbox" id="agreeC" className="mt-0.5 w-4 h-4 accent-[#4E86E8] cursor-pointer"
                                    checked={complaintData.agreed}
                                    onChange={(e) => setComplaintData({ ...complaintData, agreed: e.target.checked })} />
                                <span className="text-[14px] text-ink-soft leading-relaxed">
                                    I confirm these details are accurate.
                                </span>
                            </label>

                            <button type="submit" disabled={submitting || !complaintData.agreed}
                                className="btn btn-accent w-full py-4"
                                style={{ ['--accent' as string]: 'var(--color-brand-lift)', ['--on-accent' as string]: '#06101F' }}>
                                {submitting ? 'Submitting…' : 'Submit complaint'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Toast */}
            {message && (
                <div role="status"
                    className="fixed bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:max-w-md z-200 anim-rise">
                    <div className={`card p-5 flex items-start gap-4 border-l-2 ${message.type === 'success' ? 'border-l-signal-good' : 'border-l-signal-bad'
                        }`}>
                        <p className={`flex-1 text-[15px] leading-relaxed ${message.type === 'success' ? 'text-signal-good' : 'text-signal-bad'
                            }`}>
                            {message.text}
                        </p>
                        <button onClick={() => setMessage(null)} aria-label="Dismiss"
                            className="flex-none text-ink-dim hover:text-ink transition-colors cursor-pointer">
                            <CloseIcon />
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}
