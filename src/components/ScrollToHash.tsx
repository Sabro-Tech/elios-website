import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Height of the fixed navigation bar. */
const NAV_OFFSET = 57;

export default function ScrollToHash() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (!hash) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const id = decodeURIComponent(hash.replace('#', ''));

        // The target may not be mounted yet when arriving from another route,
        // so retry across a couple of frames before giving up.
        let frames = 0;
        const tryScroll = () => {
            const el = document.getElementById(id);
            if (el) {
                const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
                window.scrollTo({ top, behavior: 'smooth' });
                return;
            }
            if (frames++ < 20) requestAnimationFrame(tryScroll);
        };
        requestAnimationFrame(tryScroll);
    }, [pathname, hash]);

    return null;
}
