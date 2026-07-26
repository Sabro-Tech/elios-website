import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import navbarLogo from '../assets/elios-navbar.png';
import { useAuth } from '../context/AuthContext';
import { useField } from '../context/FieldContext';
import { isLight, fieldVars, type Field } from '../theme/fields';

const DARK: Field = {
    unit: '#000000',
    ground: '#0B0C0E',
    ink: '#F4F4F2',
    accent: '#4E86E8',
    haze: '#1B2430',
};

export default function Navbar() {
    const { user, userData, logout } = useAuth();
    const { field } = useField();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [showDropdown, setShowDropdown] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [pastHero, setPastHero] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Over the hero the bar rides the product's field; past it, it settles dark.
    useEffect(() => {
        const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.72);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [pathname]);

    useEffect(() => {
        if (!showDropdown) return;
        const onClick = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setShowDropdown(false);
        };
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setShowDropdown(false);
        document.addEventListener('mousedown', onClick);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('mousedown', onClick);
            document.removeEventListener('keydown', onKey);
        };
    }, [showDropdown]);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    useEffect(() => { setMenuOpen(false); }, [pathname]);

    const active = !pastHero && field ? field : DARK;
    const lightField = isLight(active.ground);
    const userName = userData ? `${userData.firstname} ${userData.lastname}` : user?.email || 'Account';

    const navLinks = [
        { name: 'About', path: '/#about' },
        { name: 'Technology', path: '/#features' },
        { name: 'The App', path: '/#app' },
        { name: 'Range', path: '/products' },
        { name: 'Support', path: '/support' },
    ];
    if (userData?.role === 'admin') navLinks.push({ name: 'Admin', path: '/admin' });

    const handleLogout = async () => {
        await logout();
        setShowDropdown(false);
        setMenuOpen(false);
        navigate('/');
    };

    return (
        <header style={fieldVars(active)} className="fixed inset-x-0 top-0 z-50">
            <div
                className="backdrop-blur-xl border-b transition-[background-color,color,border-color] duration-700"
                style={{
                    background: 'color-mix(in srgb, var(--ground) 74%, transparent)',
                    color: 'var(--ink)',
                    borderBottomColor: 'color-mix(in srgb, var(--ink) 10%, transparent)',
                }}
            >
                <div className="wrap flex items-center justify-between gap-5 py-3.5">
                    <Link to="/" aria-label="Elios — home" className="flex-none">
                        <img
                            src={navbarLogo}
                            alt="Elios"
                            className={`h-[17px] w-auto wordmark ${lightField ? 'wordmark-dark' : ''}`}
                        />
                    </Link>

                    <nav className="hidden lg:flex gap-7 text-[13px] font-medium" aria-label="Main">
                        {navLinks.map((l) => (
                            <Link
                                key={l.name}
                                to={l.path}
                                className="relative py-1 opacity-70 hover:opacity-100 transition-opacity after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-current after:transition-[width] after:duration-500 hover:after:w-full"
                            >
                                {l.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden lg:flex items-center gap-3">
                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    aria-expanded={showDropdown}
                                    aria-haspopup="menu"
                                    className="btn btn-line max-w-[230px]"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full flex-none" style={{ background: 'var(--accent)' }} />
                                    <span className="truncate normal-case tracking-normal">{userName}</span>
                                </button>

                                {showDropdown && (
                                    <div role="menu" className="absolute right-0 mt-2 w-56 card overflow-hidden py-1.5 anim-rise">
                                        <Link
                                            to="/support"
                                            role="menuitem"
                                            onClick={() => setShowDropdown(false)}
                                            className="block px-5 py-3 text-[14px] text-ink-soft hover:text-ink hover:bg-card-lift transition-colors"
                                        >
                                            My support
                                        </Link>
                                        <button
                                            role="menuitem"
                                            onClick={handleLogout}
                                            className="w-full text-left px-5 py-3 text-[14px] text-ink-soft hover:text-ink hover:bg-card-lift transition-colors cursor-pointer"
                                        >
                                            Sign out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" className="btn btn-line">Sign in</Link>
                        )}
                        <Link
                            to="/products"
                            className="btn"
                            style={{ background: active.ink, color: active.ground }}
                        >
                            Book on WhatsApp
                        </Link>
                    </div>

                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={menuOpen}
                        className="lg:hidden p-2 -mr-2 cursor-pointer"
                    >
                        <span className="block w-6 h-4 relative">
                            <span className={`absolute left-0 top-0 w-full h-px bg-current transition-transform duration-500 ${menuOpen ? 'translate-y-[7.5px] rotate-45' : ''}`} />
                            <span className={`absolute left-0 top-1/2 w-full h-px bg-current transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                            <span className={`absolute left-0 bottom-0 w-full h-px bg-current transition-transform duration-500 ${menuOpen ? '-translate-y-[7.5px] -rotate-45' : ''}`} />
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile sheet */}
            <div
                className={`lg:hidden fixed inset-x-0 top-[57px] bottom-0 overflow-y-auto transition-all duration-500 ${menuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-2'
                    }`}
                style={{ background: 'var(--ground)', color: 'var(--ink)' }}
            >
                <nav className="wrap flex flex-col pt-8 pb-14" aria-label="Mobile">
                    {navLinks.map((l) => (
                        <Link
                            key={l.name}
                            to={l.path}
                            onClick={() => setMenuOpen(false)}
                            className="display text-[1.75rem] py-4 border-b opacity-90 hover:opacity-100 transition-opacity"
                            style={{ borderColor: 'color-mix(in srgb, var(--ink) 14%, transparent)' }}
                        >
                            {l.name}
                        </Link>
                    ))}

                    <div className="mt-9 flex flex-col gap-3">
                        <Link
                            to="/products"
                            onClick={() => setMenuOpen(false)}
                            className="btn w-full"
                            style={{ background: active.ink, color: active.ground }}
                        >
                            Book on WhatsApp
                        </Link>
                        {user ? (
                            <button onClick={handleLogout} className="btn btn-line w-full">Sign out</button>
                        ) : (
                            <Link to="/login" onClick={() => setMenuOpen(false)} className="btn btn-line w-full">
                                Sign in
                            </Link>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}
