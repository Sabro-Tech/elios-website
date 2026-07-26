import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '../services/api';
import { useAuth } from '../context/AuthContext';

type Brand = 'Elios' | 'Sabro';
type Tab = 'Customers' | 'Warranties' | 'Complaints' | 'Messages';

const TABS: Tab[] = ['Customers', 'Warranties', 'Complaints', 'Messages'];

const COLUMNS: Record<Tab, string[]> = {
    Customers: ['First name', 'Last name', 'Contact', 'Email', 'Address', 'City', 'Joined'],
    Warranties: ['Warranty ID', 'Customer', 'Serial no.', 'Device', 'Start', 'Ends'],
    Complaints: ['ID', 'Name / contact', 'Location', 'Date', 'Complaint', 'Status', 'Closed'],
    Messages: ['Status', 'Name / email', 'Phone', 'Message', 'Date', 'Actions'],
};

const fmtDate = (v?: string) => (v ? new Date(v).toLocaleDateString() : '—');

export default function Admin() {
    const { user, userData } = useAuth();
    const [brand, setBrand] = useState<Brand>('Elios');
    const [tab, setTab] = useState<Tab>('Customers');
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [busyId, setBusyId] = useState<string | null>(null);

    const [data, setData] = useState({
        Elios: { Customers: [] as any[], Warranties: [] as any[], Complaints: [] as any[] },
        Sabro: { Customers: [] as any[], Warranties: [] as any[], Complaints: [] as any[] },
        Messages: [] as any[],
    });

    const isGlobalAdmin = userData?.role === 'admin';

    const loadData = useCallback(async () => {
        try {
            const [customers, warranties, complaints, messages] = await Promise.all([
                apiFetch<any[]>('/admin/customers'),
                apiFetch<any[]>('/admin/warranties'),
                apiFetch<any[]>('/admin/complaints'),
                apiFetch<any[]>('/admin/messages'),
            ]);

            const byBrand = (items: any[], b: Brand) =>
                items.filter((d) => (d.brand === 'Sabro' ? 'Sabro' : 'Elios') === b);

            setData({
                Elios: {
                    Customers: byBrand(customers, 'Elios'),
                    Warranties: byBrand(warranties, 'Elios'),
                    Complaints: byBrand(complaints, 'Elios'),
                },
                Sabro: {
                    Customers: byBrand(customers, 'Sabro'),
                    Warranties: byBrand(warranties, 'Sabro'),
                    Complaints: byBrand(complaints, 'Sabro'),
                },
                Messages: messages,
            });
            setLoadError(null);
        } catch (error) {
            console.error('Failed to load admin data:', error);
            setLoadError('Could not reach the admin API. Showing the last successful load.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!user) return;
        loadData();
        const interval = setInterval(loadData, 30000);
        return () => clearInterval(interval);
    }, [user, loadData]);

    const updateRecord = async (item: any, which: Tab, field: string, value: string) => {
        setBusyId(String(item.id));
        try {
            const resource = which === 'Warranties' ? 'warranties' : 'complaints';
            await apiFetch(`/admin/${resource}/${encodeURIComponent(item.id)}`, {
                method: 'PATCH',
                body: { field, value },
            });
            await loadData();
        } catch (error) {
            console.error('Update failed:', error);
            setLoadError(`Could not update record ${item.id}. The change was not saved.`);
        } finally {
            setBusyId(null);
        }
    };

    const updateMessage = async (id: string | number, field: string, value: any) => {
        setBusyId(String(id));
        try {
            await apiFetch(`/admin/messages/${id}`, { method: 'PATCH', body: { field, value } });
            await loadData();
        } catch (error) {
            console.error('Message action failed:', error);
            setLoadError(`Could not update message ${id}. The change was not saved.`);
        } finally {
            setBusyId(null);
        }
    };

    const rows = (() => {
        const q = query.toLowerCase().trim();

        if (tab === 'Messages') {
            const msgs = data.Messages;
            if (!q) return msgs;
            return msgs.filter(
                (m) =>
                    m.firstName?.toLowerCase().includes(q) ||
                    m.email?.toLowerCase().includes(q) ||
                    m.message?.toLowerCase().includes(q)
            );
        }

        const current = data[brand][tab as Exclude<Tab, 'Messages'>];
        const scoped = isGlobalAdmin ? current : [];
        if (!q) return scoped;

        return scoped.filter(
            (item: any) =>
                item.firstname?.toLowerCase().includes(q) ||
                item.lastname?.toLowerCase().includes(q) ||
                item.phone?.includes(q) ||
                item.email?.toLowerCase().includes(q) ||
                item.id?.toLowerCase?.().includes(q) ||
                item.deviceserial?.toLowerCase().includes(q)
        );
    })();

    return (
        <main className="w-full min-h-screen">
            <div className="border-b border-edge pt-[100px] lg:pt-[110px]">
                <div className="wrap py-6 flex flex-wrap items-center justify-between gap-5">
                    <div>
                        <p className="kicker mb-2">Operations</p>
                        <h1 className="display text-[1.5rem]">Admin</h1>
                    </div>
                    <span className="text-[11px] uppercase tracking-[0.16em] text-ink-soft border border-edge-strong rounded-full px-4 py-2">
                        {userData?.role || 'admin'} · {userData?.firstname || user?.email}
                    </span>
                </div>
            </div>

            <div className="wrap py-9">
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5 mb-7">
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex flex-wrap gap-2" role="group" aria-label="Section">
                            {TABS.map((t) => (
                                <button key={t} onClick={() => setTab(t)} aria-pressed={tab === t}
                                    className={`btn ${tab === t ? 'btn-solid' : 'btn-line'}`}>
                                    {t}
                                </button>
                            ))}
                        </div>

                        {tab !== 'Messages' && (
                            <div className="flex gap-2" role="group" aria-label="Brand">
                                {(['Elios', 'Sabro'] as Brand[]).map((b) => (
                                    <button key={b} onClick={() => setBrand(b)} aria-pressed={brand === b}
                                        className={`btn btn-line ${brand === b ? 'text-brand-lift border-brand-lift/60' : ''}`}>
                                        {b}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="kicker num whitespace-nowrap">
                            {rows.length} {rows.length === 1 ? 'record' : 'records'}
                        </span>
                        <div className="relative">
                            <input type="search" aria-label={`Search ${tab.toLowerCase()}`}
                                placeholder={`Search ${tab.toLowerCase()}…`} value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="field sm:w-[300px] pr-11 py-2.5" />
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth={1.3}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-dim pointer-events-none" aria-hidden="true">
                                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {loadError && (
                    <p role="alert" className="mb-6 text-[14px] text-signal-bad border border-signal-bad/40 bg-signal-bad/8 rounded-xl px-5 py-3.5">
                        {loadError}
                    </p>
                )}

                <div className="card overflow-x-auto">
                    {loading ? (
                        <div className="py-24 flex flex-col items-center gap-4">
                            <div className="w-7 h-7 rounded-full border border-edge-strong border-t-ink animate-spin" />
                            <p className="kicker">Loading records</p>
                        </div>
                    ) : rows.length === 0 ? (
                        <div className="py-24 text-center px-6">
                            <p className="text-ink-soft">
                                {query
                                    ? `Nothing matches “${query}”.`
                                    : !isGlobalAdmin && tab !== 'Messages'
                                        ? 'Your role does not have access to these records.'
                                        : `No ${tab.toLowerCase()} yet.`}
                            </p>
                            {query && (
                                <button onClick={() => setQuery('')} className="btn btn-line mt-6">Clear search</button>
                            )}
                        </div>
                    ) : (
                        <table className="ledger min-w-[1080px]">
                            <thead>
                                <tr>{COLUMNS[tab].map((h) => <th key={h}>{h}</th>)}</tr>
                            </thead>
                            <tbody>
                                {rows.map((item: any) => {
                                    const busy = busyId === String(item.id);
                                    return (
                                        <tr key={item.id} className={busy ? 'opacity-50' : ''}>
                                            {tab === 'Customers' && (
                                                <>
                                                    <td>{item.firstname}</td>
                                                    <td>{item.lastname}</td>
                                                    <td className="num whitespace-nowrap">{item.phone}</td>
                                                    <td className="text-brand-lift break-all">{item.email}</td>
                                                    <td className="text-ink-soft">{item.address}</td>
                                                    <td>{item.city}</td>
                                                    <td className="num text-ink-dim whitespace-nowrap">{fmtDate(item.createdAt)}</td>
                                                </>
                                            )}

                                            {tab === 'Warranties' && (
                                                <>
                                                    <td className="num text-ink-dim">{item.id}</td>
                                                    <td>
                                                        <span className="block">{item.firstname} {item.lastname}</span>
                                                        <span className="block text-[13px] num text-ink-dim mt-0.5">{item.phone}</span>
                                                    </td>
                                                    <td className="num text-brand-lift whitespace-nowrap">{item.deviceserial}</td>
                                                    <td>{item.devicedetails}</td>
                                                    <td className="num text-ink-soft whitespace-nowrap">{item.startdate}</td>
                                                    <td className="num text-ink-soft whitespace-nowrap">{item.endingdate}</td>
                                                </>
                                            )}

                                            {tab === 'Complaints' && (
                                                <>
                                                    <td className="num text-ink-dim">{item.id}</td>
                                                    <td>
                                                        <span className="block">{item.firstname} {item.lastname}</span>
                                                        <span className="block text-[13px] num text-ink-dim mt-0.5">{item.phone}</span>
                                                    </td>
                                                    <td>
                                                        <span className="block">{item.city}</span>
                                                        <span className="block text-[13px] text-ink-dim mt-0.5">{item.address}</span>
                                                    </td>
                                                    <td className="num text-ink-soft whitespace-nowrap">{item.complaintdate}</td>
                                                    <td className="max-w-[220px] text-ink-soft" title={item.complaint}>
                                                        <span className="block truncate">{item.complaint}</span>
                                                    </td>
                                                    <td>
                                                        <select aria-label={`Status for complaint ${item.id}`}
                                                            value={item.complaintstatus || 'Registered'} disabled={busy}
                                                            onChange={(e) => updateRecord(item, 'Complaints', 'complaintstatus', e.target.value)}
                                                            className="field w-auto py-2 text-[13px]">
                                                            <option value="Registered">Registered</option>
                                                            <option value="In Progress">In Progress</option>
                                                            <option value="Resolved">Resolved</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <input type="date" aria-label={`Closing date for complaint ${item.id}`}
                                                            value={item.closingdate || ''} disabled={busy}
                                                            onChange={(e) => updateRecord(item, 'Complaints', 'closingdate', e.target.value)}
                                                            className="field w-auto py-2 text-[13px] num" />
                                                    </td>
                                                </>
                                            )}

                                            {tab === 'Messages' && (
                                                <>
                                                    <td>
                                                        <span className={`inline-block text-[10.5px] uppercase tracking-[0.16em] border rounded-full px-2.5 py-1 ${item.status === 'New' ? 'text-brand-lift border-brand-lift/50' : 'text-ink-dim border-edge-strong'
                                                            }`}>
                                                            {item.status || 'New'}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="block">{item.firstName} {item.lastName}</span>
                                                        <span className="block text-[13px] text-brand-lift break-all mt-0.5">{item.email}</span>
                                                    </td>
                                                    <td className="num whitespace-nowrap">{item.countryCode} {item.phone}</td>
                                                    <td className="max-w-[300px] text-ink-soft" title={item.message}>
                                                        <span className="block truncate">{item.message}</span>
                                                    </td>
                                                    <td className="num text-ink-dim whitespace-nowrap">{fmtDate(item.createdAt)}</td>
                                                    <td>
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => updateMessage(item.id, 'status', item.status === 'New' ? 'Read' : 'New')}
                                                                disabled={busy}
                                                                aria-pressed={item.status === 'Read'}
                                                                title={item.status === 'Read' ? 'Mark as unread' : 'Mark as read'}
                                                                className={`p-2 rounded-lg border transition-colors cursor-pointer ${item.status === 'Read'
                                                                    ? 'text-signal-good border-signal-good/50'
                                                                    : 'text-ink-dim border-edge-strong hover:text-ink'
                                                                    }`}>
                                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                                                                    <path d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            </button>
                                                            <button
                                                                onClick={() => updateMessage(item.id, 'starred', !item.starred)}
                                                                disabled={busy}
                                                                aria-pressed={!!item.starred}
                                                                title={item.starred ? 'Remove flag' : 'Flag message'}
                                                                className={`p-2 rounded-lg border transition-colors cursor-pointer ${item.starred
                                                                    ? 'text-ink border-ink/60'
                                                                    : 'text-ink-dim border-edge-strong hover:text-ink'
                                                                    }`}>
                                                                <svg width="16" height="16" viewBox="0 0 24 24" fill={item.starred ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.5}>
                                                                    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </main>
    );
}
