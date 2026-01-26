
export default function Footer() {
    return (
        <footer className="bg-[#e5e5e5] py-20 px-6">
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20">

                {/* Column 1: Address */}
                <div className="flex flex-col gap-6">
                    <h3 className="font-heading font-bold text-2xl text-[#1e4186] uppercase">
                        Address
                    </h3>
                    <p className="font-questrial text-[18px] text-black leading-relaxed">
                        Street 10, Sector I-9/2,<br />
                        Islamabad Capital Territory,<br />
                        Pakistan
                    </p>
                </div>

                {/* Column 2: Contact */}
                <div className="flex flex-col gap-6">
                    <h3 className="font-heading font-bold text-2xl text-[#1e4186] uppercase">
                        Contact
                    </h3>
                    <div className="flex flex-col gap-4">
                        <p className="font-questrial text-[18px] text-black">
                            +92 308 1911579
                        </p>
                        <div className="flex gap-4 mt-2">
                            {/* Facebook */}
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#1e4186] hover:scale-110 transition-transform">
                                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            {/* LinkedIn */}
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[#1e4186] hover:scale-110 transition-transform">
                                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.58c-1.14 0-2.06-.93-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.13-.92 2.06-2.06 2.06zM20.45 20.45h-3.56v-5.61c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.15 1.46-2.15 2.96v5.71h-3.56V9h3.42v1.56h.05c.48-.91 1.65-1.86 3.39-1.86 3.63 0 4.29 2.39 4.29 5.5v6.25z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Column 3: Opening Hours */}
                <div className="flex flex-col gap-6">
                    <h3 className="font-heading font-bold text-2xl text-[#1e4186] uppercase">
                        Opening Hours
                    </h3>
                    <div className="flex justify-between max-w-[280px]">
                        <span className="font-questrial text-[18px] text-black">Mon - Sat</span>
                        <span className="font-questrial text-[18px] text-black">9:00 Am - 5:00 Pm</span>
                    </div>
                </div>

            </div>

            {/* Copyright */}
            <div className="max-w-[1200px] mx-auto mt-16 pt-8 border-t border-black/10 text-center">
                <p className="font-questrial text-sm text-[#888888]">
                    &copy; {new Date().getFullYear()} Elios. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
