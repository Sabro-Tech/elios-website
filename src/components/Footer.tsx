import { Link } from 'react-router-dom';
import navbarLogo from '../assets/elios-navbar.png';

const NAV = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/#features', label: 'Technology' },
    { to: '/#app', label: 'The app' },
    { to: '/#about', label: 'About' },
    { to: '/support', label: 'Support' },
];

const PHONES = ['+92 308 1911579', '+92 321 8548557', '+92 324 8250610'];

export default function Footer() {
    return (
        <footer className="bg-ground-alt border-t border-edge pt-20 pb-8">
            <div className="wrap">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10 mb-16">

                    <div>
                        <img src={navbarLogo} alt="Elios" className="wordmark h-5 w-auto mb-5" />
                        <p className="text-[14px] leading-relaxed text-ink-dim max-w-[26ch]">
                            Digital inverter air conditioning and air-source water heating, made in
                            Pakistan.
                        </p>
                    </div>

                    <nav aria-label="Footer">
                        <h2 className="kicker mb-5">Navigation</h2>
                        <ul className="flex flex-col gap-3">
                            {NAV.map((n) => (
                                <li key={n.label}>
                                    <Link to={n.to} className="text-[14px] text-ink-soft hover:text-ink transition-colors">
                                        {n.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div>
                        <h2 className="kicker mb-5">Get in touch</h2>
                        <ul className="flex flex-col gap-3">
                            <li>
                                <a href="mailto:support@elios.com.pk" className="text-[14px] text-ink-soft hover:text-ink transition-colors break-all">
                                    support@elios.com.pk
                                </a>
                            </li>
                            {PHONES.map((p) => (
                                <li key={p}>
                                    <a href={`tel:${p.replace(/\s/g, '')}`} className="text-[14px] num text-ink-soft hover:text-ink transition-colors">
                                        {p}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="kicker mb-5">Headquarters</h2>
                        <address className="not-italic text-[14px] leading-relaxed text-ink-soft mb-7">
                            Plot&nbsp;#&nbsp;77, Street&nbsp;10,<br />
                            Sector I-9/2, Islamabad<br />
                            Capital Territory, Pakistan
                        </address>

                        <h2 className="kicker mb-4">Business hours</h2>
                        <dl className="flex flex-col gap-2.5 text-[14px]">
                            <div className="flex justify-between gap-4 border-b border-edge pb-2">
                                <dt className="text-ink-dim">Mon – Fri</dt>
                                <dd className="num">09:00 – 17:00</dd>
                            </div>
                            <div className="flex justify-between gap-4 border-b border-edge pb-2">
                                <dt className="text-ink-dim">Saturday</dt>
                                <dd className="num">10:00 – 16:00</dd>
                            </div>
                        </dl>
                    </div>
                </div>

                <div className="border-t border-edge pt-7 flex flex-col sm:flex-row justify-between gap-3 text-[11.5px] uppercase tracking-[0.14em] text-ink-dim">
                    <p>© {new Date().getFullYear()} Elios · A brand by Kascon Technologies (Pvt) Ltd.</p>
                    <p>Designed by Sabro Tech</p>
                </div>
            </div>
        </footer>
    );
}
