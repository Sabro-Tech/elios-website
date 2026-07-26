import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../services/firebase';
import { getFriendlyAuthError } from '../utils/authErrors';
import AuthShell from '../components/AuthShell';

export default function ResetPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            setMessage({ type: 'error', text: 'Enter the email address your account uses.' });
            return;
        }

        setLoading(true);
        setMessage(null);
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage({
                type: 'success',
                text: 'Sent. Open the link in that email to set a new password — check spam if it has not arrived in a few minutes.',
            });
            setEmail('');
        } catch (err: any) {
            setMessage({ type: 'error', text: getFriendlyAuthError(err.code || err.message) });
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthShell
            intro="Account recovery"
            title="Reset your password"
            footer={
                <Link to="/login" className="text-[15px] text-ink-dim hover:text-ink transition-colors">
                    Back to sign in
                </Link>
            }
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                <p className="text-[15px] leading-relaxed text-ink-soft -mt-1">
                    Give us the address on the account and we will email a link to set a new password.
                </p>

                <div className="flex flex-col gap-2.5">
                    <label htmlFor="reset-email" className="field-label">Email address</label>
                    <input
                        id="reset-email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        className="field"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <button type="submit" disabled={loading} className="btn btn-accent w-full py-4"
                    style={{ ['--accent' as string]: 'var(--color-brand-lift)', ['--on-accent' as string]: '#06101F' }}>
                    {loading ? 'Sending…' : 'Send reset link'}
                </button>

                {message && (
                    <p role="status"
                        className={`text-[15px] leading-relaxed border rounded-xl px-5 py-4 ${message.type === 'success'
                            ? 'text-signal-good border-signal-good/40 bg-signal-good/8'
                            : 'text-signal-bad border-signal-bad/40 bg-signal-bad/8'
                            }`}>
                        {message.text}
                    </p>
                )}
            </form>
        </AuthShell>
    );
}
