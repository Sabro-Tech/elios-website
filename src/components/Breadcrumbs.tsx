import { Link } from 'react-router-dom';

const SITE_URL = 'https://eliospk.com';

export interface Crumb {
    label: string;
    path?: string; // omit on the last (current-page) crumb
}

// Renders a visible breadcrumb trail AND the matching BreadcrumbList JSON-LD in
// one place — same "structured data must match visible content" rule as
// Faq.tsx. Home is always the implicit first crumb.
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
    const trail: Crumb[] = [{ label: 'Home', path: '/' }, ...items];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: trail.map((c, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: c.label,
            item: c.path ? `${SITE_URL}${c.path === '/' ? '' : c.path}` : undefined,
        })),
    };

    return (
        <nav aria-label="Breadcrumb" className="w-full bg-[#f8fafc] px-6 py-4 border-b border-gray-100">
            <ol className="max-w-[1200px] mx-auto flex flex-wrap items-center gap-2 font-questrial text-sm text-gray-500">
                {trail.map((c, i) => (
                    <li key={i} className="flex items-center gap-2">
                        {i > 0 && <span className="text-gray-300">/</span>}
                        {c.path && i < trail.length - 1 ? (
                            <Link to={c.path} className="hover:text-brand-blue transition-colors">{c.label}</Link>
                        ) : (
                            <span className="text-brand-blue font-bold" aria-current="page">{c.label}</span>
                        )}
                    </li>
                ))}
            </ol>
            <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        </nav>
    );
}
