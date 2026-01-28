import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import navbarLogo from '../assets/elios-navbar.png';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { user, userData, logout } = useAuth();
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const userName = userData ? `${userData.firstname} ${userData.lastname}` : user?.email || "User";

    const navLinks = [
        { name: 'HOME', path: '/' },
        { name: 'FEATURES', path: '/#features' },
        { name: 'ABOUT US', path: '/#about' },
        { name: 'CONTACT US', path: '/#contact' },
        { name: 'CUSTOMER SUPPORT', path: '/support' },
    ];

    if (userData?.role === 'admin') {
        navLinks.push({ name: 'ADMIN', path: '/admin' });
    }

    return (
        <header
            className={`sticky top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm h-[70px]' : 'bg-white h-[85px]'
                }`}
        >
            <div className="w-full h-full flex items-center justify-between px-8 max-w-[1440px] mx-auto">
                {/* Logo */}
                <Link to="/" className="flex-shrink-0 transition-transform duration-300 hover:scale-105">
                    <img
                        src={navbarLogo}
                        alt="Elios Logo"
                        className="h-[35px] w-auto"
                    />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-10">
                    <nav className="flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="font-ui text-[15px] font-semibold text-brand-blue tracking-[0.05em] hover:text-brand-text relative group transition-colors"
                                style={{ fontFamily: 'Oswald, sans-serif' }}
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                    </nav>

                    {/* User Section (Desktop) */}
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="flex items-center gap-2 font-ui text-[15px] font-semibold text-brand-blue bg-brand-blue/5 px-4 py-2 rounded-full hover:bg-brand-blue/10 transition-all"
                                style={{ fontFamily: 'Oswald, sans-serif' }}
                            >
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                {userName}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-4 h-4 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </button>

                            {showDropdown && (
                                <div className="absolute right-0 mt-3 w-52 bg-white/95 backdrop-blur-sm border border-gray-100 shadow-xl rounded-2xl py-2 z-50 animate-fade-in-up">
                                    <button
                                        onClick={async () => {
                                            await logout();
                                            setShowDropdown(false);
                                            navigate('/');
                                        }}
                                        className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 font-ui transition-colors group"
                                        style={{ fontFamily: 'Oswald, sans-serif' }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                        </svg>
                                        <span className="group-hover:text-red-600 transition-colors">Log Out</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="flex items-center gap-3 group bg-brand-blue text-white px-6 py-2.5 rounded-full hover:bg-brand-blue-dark transition-all shadow-md hover:shadow-lg">
                            <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                                </svg>
                            </span>
                            <span className="font-ui text-[15px] font-bold tracking-wider" style={{ fontFamily: 'Oswald, sans-serif' }}>LOG IN</span>
                        </Link>
                    )}
                </div>

                {/* Mobile Hamburger Button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 text-brand-text hover:text-brand-blue focus:outline-none transition-colors"
                    >
                        <div className="w-7 h-6 relative flex flex-col justify-between items-center">
                            <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[11px]' : ''}`}></span>
                            <span className={`w-full h-0.5 bg-current rounded-full transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                            <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[11px]' : ''}`}></span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`md:hidden fixed inset-0 top-[70px] bg-white transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-[-20px]'
                }`}>
                <div className="flex flex-col gap-6 p-10">
                    {navLinks.map((link, index) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="font-ui text-[24px] font-semibold text-brand-blue tracking-wider hover:text-brand-text transition-all block animate-fade-in-up"
                            style={{
                                fontFamily: 'Oswald, sans-serif',
                                animationDelay: `${index * 0.1}s`
                            }}
                        >
                            {link.name}
                        </Link>
                    ))}

                    <div className="mt-8 pt-8 border-t border-gray-100">
                        {user ? (
                            <div className="flex flex-col gap-6">
                                <span className="font-ui text-[18px] font-medium text-gray-500 uppercase tracking-widest" style={{ fontFamily: 'Oswald, sans-serif' }}>
                                    Welcome, <span className="text-brand-blue font-bold">{userName}</span>
                                </span>
                                <button
                                    onClick={async () => {
                                        await logout();
                                        setIsMobileMenuOpen(false);
                                        navigate('/');
                                    }}
                                    className="font-ui text-[20px] font-bold text-red-500 text-left uppercase tracking-wider"
                                    style={{ fontFamily: 'Oswald, sans-serif' }}
                                >
                                    Log Out
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center gap-4 group"
                            >
                                <span className="w-10 h-10 bg-brand-blue text-white rounded-full flex items-center justify-center transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                <span className="font-ui text-brand-blue text-[24px] font-bold tracking-wider uppercase" style={{ fontFamily: 'Oswald, sans-serif' }}>Log In</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
