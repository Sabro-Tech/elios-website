import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="w-full bg-[#f8fafc] pt-24 pb-12 px-6 border-t border-gray-100">
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">

                {/* Brand & Address */}
                <div className="flex flex-col gap-6 md:col-span-1">
                    <h3 className="font-heading font-black text-2xl text-brand-blue uppercase tracking-tighter">
                        ELIOS
                    </h3>
                    <div className="flex flex-col gap-2">
                        <p className="font-ui text-gray-500 font-bold uppercase tracking-widest text-xs">Headquarters</p>
                        <p className="font-questrial text-gray-600 leading-relaxed">
                            Plot # 77, Street 10, Sector I-9/2,<br />Islamabad Capital Territory, Pakistan.
                        </p>
                    </div>
                    <div className="rounded-2xl overflow-hidden border border-gray-100 h-[140px]">
                        <iframe
                            title="Elios headquarters map"
                            src="https://maps.google.com/maps?q=33.659742,73.046783&output=embed"
                            className="w-full h-full border-0"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                    <a
                        href="https://www.google.com/maps/dir/?api=1&destination=33.659742,73.046783"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-questrial text-brand-blue font-bold text-sm hover:underline w-fit"
                    >
                        Get Directions →
                    </a>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col gap-6">
                    <p className="font-ui text-brand-blue font-bold uppercase tracking-widest text-sm">Navigation</p>
                    <nav className="flex flex-col gap-3">
                        <Link to="/" className="font-questrial text-gray-500 hover:text-brand-blue transition-colors">Home</Link>
                        <a href="/#features" className="font-questrial text-gray-500 hover:text-brand-blue transition-colors">Features</a>
                        <a href="/#about" className="font-questrial text-gray-500 hover:text-brand-blue transition-colors">About Us</a>
                        <a href="/#contact" className="font-questrial text-gray-500 hover:text-brand-blue transition-colors">Contact</a>
                    </nav>
                </div>

                {/* Contact & Social */}
                <div className="flex flex-col gap-6">
                    <p className="font-ui text-brand-blue font-bold uppercase tracking-widest text-sm">Get in Touch</p>
                    <div className="flex flex-col gap-3">
                        <a href="mailto:contact@Sabro.com.pk" className="font-questrial text-gray-500 hover:text-brand-blue transition-colors">support@elios.com.pk</a>
                        <p className="font-questrial text-gray-600">+92 308 1911579</p>
                        <p className="font-questrial text-gray-600">+92 321 8548557</p>
                        <p className="font-questrial text-gray-600">+92 324 8250610</p>
                    </div>
                    <div className="flex gap-4 mt-2">
                        <a href="#" className="w-10 h-10 rounded-full bg-brand-blue/5 flex items-center justify-center text-brand-blue hover:bg-brand-blue hover:text-white transition-all duration-300 transform hover:-translate-y-1">FB</a>
                        <a href="#" className="w-10 h-10 rounded-full bg-brand-blue/5 flex items-center justify-center text-brand-blue hover:bg-brand-blue hover:text-white transition-all duration-300 transform hover:-translate-y-1">LI</a>
                        <a href="#" className="w-10 h-10 rounded-full bg-brand-blue/5 flex items-center justify-center text-brand-blue hover:bg-brand-blue hover:text-white transition-all duration-300 transform hover:-translate-y-1">IG</a>
                    </div>
                </div>

                {/* Opening Hours */}
                <div className="flex flex-col gap-6">
                    <p className="font-ui text-brand-blue font-bold uppercase tracking-widest text-sm">Business Hours</p>
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="font-questrial text-gray-400">Mon - Fri:</span>
                            <span className="font-questrial text-brand-blue font-bold">09:00 - 17:00</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="font-questrial text-gray-400">Sat:</span>
                            <span className="font-questrial text-brand-blue font-bold">10:00 - 16:00</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="max-w-[1200px] mx-auto mt-24 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
                <p className="font-questrial">© {new Date().getFullYear()} Elios. All rights reserved.</p>
                <p className="font-questrial">Designed by Sabro Tech</p>
            </div>
        </footer>
    );
}
