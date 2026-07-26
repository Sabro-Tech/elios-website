import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getFriendlyAuthError } from '../utils/authErrors';
import AuthShell from '../components/AuthShell';
import PasswordField from '../components/PasswordField';

const FIELD_LABELS: Record<string, string> = {
    firstName: 'first name',
    lastName: 'last name',
    email: 'email address',
    phone: 'phone number',
    password: 'password',
    city: 'city',
    address: 'address',
};

export default function Signup() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        city: '',
        address: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Name what is missing rather than making the visitor hunt for it
        const missing = Object.entries(formData)
            .filter(([, v]) => !v)
            .map(([k]) => FIELD_LABELS[k]);

        if (missing.length) {
            setError(
                missing.length === 1
                    ? `Add your ${missing[0]} to finish registering.`
                    : `Still needed: ${missing.join(', ')}.`
            );
            return;
        }

        setError('');
        setLoading(true);
        try {
            await signup(formData.email, formData.password, {
                firstname: formData.firstName,
                lastname: formData.lastName,
                phone: formData.phone,
                city: formData.city,
                address: formData.address,
                role: 'user',
            });
            navigate('/support');
        } catch (err: any) {
            setError(getFriendlyAuthError(err.code || err.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthShell
            wide
            intro="Owner registration"
            title="Create your account"
            footer={
                <p className="text-[15px] text-ink-dim">
                    Already registered?{' '}
                    <Link to="/login" className="text-ink hover:text-brand-lift transition-colors">Sign in</Link>
                </p>
            }
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                <p className="text-[15px] leading-relaxed text-ink-soft -mt-1">
                    An account lets you register warranties and raise complaints against your unit.
                    We use the address to route a technician if one is ever needed.
                </p>

                <div className="grid sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2.5">
                        <label htmlFor="su-first" className="field-label">First name</label>
                        <input id="su-first" name="firstName" type="text" autoComplete="given-name"
                            placeholder="First name" className="field" value={formData.firstName} onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <label htmlFor="su-last" className="field-label">Last name</label>
                        <input id="su-last" name="lastName" type="text" autoComplete="family-name"
                            placeholder="Last name" className="field" value={formData.lastName} onChange={handleChange} />
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2.5">
                        <label htmlFor="su-email" className="field-label">Email address</label>
                        <input id="su-email" name="email" type="email" autoComplete="email"
                            placeholder="you@example.com" className="field" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <label htmlFor="su-phone" className="field-label">Phone number</label>
                        <input id="su-phone" name="phone" type="tel" autoComplete="tel"
                            placeholder="0300 1234567" className="field num" value={formData.phone} onChange={handleChange} />
                    </div>
                </div>

                <div className="flex flex-col gap-2.5">
                    <label htmlFor="su-password" className="field-label">Password</label>
                    <PasswordField
                        id="su-password"
                        name="password"
                        value={formData.password}
                        onChange={(v) => setFormData({ ...formData, password: v })}
                        autoComplete="new-password"
                    />
                    <p className="text-[13px] text-ink-dim">At least 6 characters.</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2.5">
                        <label htmlFor="su-city" className="field-label">City</label>
                        <input id="su-city" name="city" type="text" autoComplete="address-level2"
                            placeholder="Islamabad" className="field" value={formData.city} onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <label htmlFor="su-address" className="field-label">Residential address</label>
                        <input id="su-address" name="address" type="text" autoComplete="street-address"
                            placeholder="House # 123, Street # 4" className="field" value={formData.address} onChange={handleChange} />
                    </div>
                </div>

                <button type="submit" disabled={loading} className="btn btn-accent w-full py-4 mt-2"
                    style={{ ['--accent' as string]: 'var(--color-brand-lift)', ['--on-accent' as string]: '#06101F' }}>
                    {loading ? 'Creating account…' : 'Create account'}
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
