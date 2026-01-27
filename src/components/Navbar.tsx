import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import navbarLogo from '../assets/elios-navbar.png';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { user, userData, logout } = useAuth();
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const userName = userData ? `${userData.firstname} ${userData.lastname}` : user?.email || "User";

    const navLinks = [
        { name: 'HOME', path: '/' },
        { name: 'FEATURES', path: '/#features' },
        { name: 'CUSTOMER SUPPORT', path: '/support' },
        { name: 'ABOUT US', path: '/#about' },
        { name: 'CONTACT US', path: '/#contact' },
    ];

    if (userData?.role === 'admin') {
        navLinks.push({ name: 'ADMIN', path: '/admin' });
    }

    return (
        <header className="sticky top-0 w-full z-50 bg-white shadow-sm">
            <div className="w-full h-[70px] flex items-center justify-between px-8">
                {/* Logo */}
                <Link to="/" className="flex-shrink-0">
                    <img
                        src={navbarLogo}
                        alt="Elios Logo"
                        className="h-[33px] w-auto"
                    />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <nav className="flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="font-ui text-[16px] font-medium text-brand-blue tracking-wide hover:text-brand-text transition-colors"
                                style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600 }}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* User Section (Desktop) */}
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="flex items-center gap-2 font-ui text-[16px] font-medium text-brand-blue hover:text-brand-text transition-colors"
                                style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600 }}
                            >
                                {userName}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </button>

                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md py-1 z-50">
                                    <button
                                        onClick={async () => {
                                            await logout();
                                            setShowDropdown(false);
                                            navigate('/');
                                        }}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-ui"
                                        style={{ fontFamily: 'Oswald, sans-serif' }}
                                    >
                                        Log Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="flex items-center gap-2 group">
                            <span className="w-[22px] h-[22px] bg-brand-text rounded-full flex items-center justify-center group-hover:bg-brand-blue transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-3 h-3">
                                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                                </svg>
                            </span>
                            <span className="font-ui text-brand-blue text-[16px] font-medium tracking-wide group-hover:text-brand-text transition-colors" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600 }}>Log In</span>
                        </Link>
                    )}
                </div>

                {/* Mobile Hamburger Button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-brand-text hover:text-brand-blue focus:outline-none"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-[100px] left-0 w-full bg-white border-t border-gray-100 shadow-lg py-4 px-8 flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="font-ui text-[16px] font-medium text-brand-blue tracking-wide hover:text-brand-text transition-colors block py-2"
                            style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600 }}
                        >
                            {link.name}
                        </Link>
                    ))}

                    <div className="border-t border-gray-100 pt-4 mt-2">
                        {user ? (
                            <div className="flex flex-col gap-3">
                                <span className="font-ui text-[16px] font-medium text-brand-text" style={{ fontFamily: 'Oswald, sans-serif' }}>
                                    Hello, {userName}
                                </span>
                                <button
                                    onClick={async () => {
                                        await logout();
                                        setIsMobileMenuOpen(false);
                                        navigate('/');
                                    }}
                                    className="font-ui text-[16px] font-medium text-red-600 text-left"
                                    style={{ fontFamily: 'Oswald, sans-serif' }}
                                >
                                    Log Out
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center gap-2 group"
                            >
                                <span className="w-[22px] h-[22px] bg-brand-text rounded-full flex items-center justify-center group-hover:bg-brand-blue transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-3 h-3">
                                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                <span className="font-ui text-brand-blue text-[16px] font-medium tracking-wide group-hover:text-brand-text transition-colors" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600 }}>Log In</span>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
