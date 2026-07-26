import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import navbarLogo from '../assets/elios-navbar.png';

interface AuthShellProps {
    title: string;
    intro: string;
    children: ReactNode;
    footer?: ReactNode;
    wide?: boolean;
}

/**
 * Signed-in work, so the field stays quiet and the form is the only lit thing
 * on it. The navigation is fixed, hence the top padding.
 */
export default function AuthShell({ title, intro, children, footer, wide }: AuthShellProps) {
    return (
        <main className="min-h-screen relative flex flex-col items-center justify-center px-6 pt-[100px] pb-16 overflow-hidden bg-ground">
            <div
                className="absolute inset-0 pointer-events-none"
                aria-hidden="true"
                style={{
                    background:
                        'radial-gradient(70% 55% at 78% 8%, #14295C 0%, transparent 62%), radial-gradient(60% 50% at 10% 96%, #101318 0%, transparent 60%)',
                }}
            />

            <div className={`relative w-full ${wide ? 'max-w-2xl' : 'max-w-md'} flex flex-col items-center`}>
                <Link to="/" className="mb-9" aria-label="Elios — home">
                    <img src={navbarLogo} alt="Elios" className="wordmark h-6 w-auto" />
                </Link>

                <div className="card w-full p-8 sm:p-11">
                    <p className="kicker mb-5">{intro}</p>
                    <h1 className="display text-[1.75rem] sm:text-[2.125rem] mb-8">{title}</h1>
                    {children}
                </div>

                {footer && <div className="mt-8 text-center">{footer}</div>}

                <p className="text-[11px] uppercase tracking-[0.16em] text-ink-dim mt-10 text-center">
                    © {new Date().getFullYear()} Elios · Kascon Technologies (Pvt) Ltd.
                </p>
            </div>
        </main>
    );
}
