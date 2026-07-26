import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getFriendlyAuthError } from '../utils/authErrors';
import AuthShell from '../components/AuthShell';
import PasswordField from '../components/PasswordField';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Enter both your email and password to sign in.');
            return;
        }
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/support');
        } catch (err: any) {
            setError(getFriendlyAuthError(err.code || err.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthShell
            intro="Owner access"
            title="Sign in"
            footer={
                <p className="text-[15px] text-ink-dim">
                    No account yet?{' '}
                    <Link to="/signup" className="text-ink hover:text-brand-lift transition-colors">
                        Register your unit
                    </Link>
                </p>
            }
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                <div className="flex flex-col gap-2.5">
                    <label htmlFor="login-email" className="field-label">Email address</label>
                    <input
                        id="login-email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        className="field"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-2.5">
                    <div className="flex justify-between items-baseline gap-4">
                        <label htmlFor="login-password" className="field-label">Password</label>
                        <Link to="/reset-password" className="text-[11px] uppercase tracking-[0.18em] text-ink-dim hover:text-ink transition-colors">
                            Forgot?
                        </Link>
                    </div>
                    <PasswordField
                        id="login-password"
                        value={password}
                        onChange={setPassword}
                        autoComplete="current-password"
                    />
                </div>

                <button type="submit" disabled={loading} className="btn btn-accent w-full py-4 mt-2"
                    style={{ ['--accent' as string]: 'var(--color-brand-lift)', ['--on-accent' as string]: '#06101F' }}>
                    {loading ? 'Signing in…' : 'Sign in'}
                </button>

                {error && (
                    <p role="alert" className="text-[15px] leading-relaxed text-signal-bad border border-signal-bad/40 bg-signal-bad/8 rounded-xl px-5 py-4">
                        {error}
                    </p>
                )}
            </form>
        </AuthShell>
    );
}
