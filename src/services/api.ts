import { auth } from './firebase';

const API_BASE = '/api';

interface ApiOptions {
    method?: string;
    body?: unknown;
    /** set to false for public endpoints (contact form) */
    withAuth?: boolean;
}

export async function apiFetch<T = any>(path: string, options: ApiOptions = {}): Promise<T> {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };

    if (options.withAuth !== false) {
        const token = await auth.currentUser?.getIdToken();
        if (token) headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE}${path}`, {
        method: options.method || 'GET',
        headers,
        body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    });

    if (!res.ok) {
        let detail = `Request failed (${res.status})`;
        try {
            const data = await res.json();
            if (data?.detail) detail = typeof data.detail === 'string' ? data.detail : JSON.stringify(data.detail);
        } catch { /* keep default detail */ }
        const err = new Error(detail) as Error & { status?: number };
        err.status = res.status;
        throw err;
    }

    return res.json();
}
