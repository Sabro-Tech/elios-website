import { useEffect, useRef, type ReactNode } from 'react';

type Tag = 'div' | 'section' | 'article' | 'li' | 'header';

interface RevealProps {
    children: ReactNode;
    className?: string;
    /** ms of stagger against siblings in the same group */
    delay?: number;
    as?: Tag;
    id?: string;
    style?: React.CSSProperties;
}

/**
 * The one reveal grammar. Content is always in the DOM — it arrives rather
 * than appears — and anyone who asked for stillness gets it immediately.
 */
export default function Reveal({
    children,
    className = '',
    delay = 0,
    as: Tag = 'div',
    id,
    style,
}: RevealProps) {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (
            typeof IntersectionObserver === 'undefined' ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
            el.classList.add('in');
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;
                    el.style.transitionDelay = `${delay}ms`;
                    el.classList.add('in');
                    observer.unobserve(el);
                }
            },
            { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [delay]);

    return (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <Tag ref={ref as any} id={id} style={style} className={`rv ${className}`}>
            {children}
        </Tag>
    );
}
