import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

export default function NotFound() {
    return (
        <div className="w-full bg-white">
            <Seo
                title="Page Not Found"
                description="The page you're looking for doesn't exist or may have moved."
                noindex
            />

            <section className="w-full bg-[#f8fafc] py-32 px-6 min-h-[60vh] flex items-center">
                <div className="max-w-[700px] mx-auto text-center flex flex-col items-center gap-6">
                    <span className="font-heading font-black text-[100px] md:text-[140px] text-brand-blue/15 leading-none select-none">
                        404
                    </span>
                    <h1 className="font-heading font-bold text-[32px] md:text-[44px] text-brand-blue uppercase leading-tight tracking-tight -mt-8">
                        Page Not Found
                    </h1>
                    <p className="font-questrial text-gray-600 text-lg leading-relaxed max-w-[520px]">
                        The page you're looking for doesn't exist, may have been moved, or the link might be broken.
                        Let's get you back on track.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center mt-4">
                        <Link
                            to="/"
                            className="bg-brand-blue text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-brand-blue-dark transition-all shadow-xl hover:-translate-y-1 active:translate-y-0"
                        >
                            BACK TO HOME
                        </Link>
                        <Link
                            to="/products"
                            className="bg-white text-brand-blue border-2 border-brand-blue/20 px-10 py-4 rounded-full font-bold text-lg hover:bg-brand-blue/5 transition-all"
                        >
                            EXPLORE PRODUCTS
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
