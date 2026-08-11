import Seo from '../components/Seo';
import Breadcrumbs from '../components/Breadcrumbs';

export default function TermsOfService() {
    return (
        <div className="w-full bg-white">
            <Seo
                title="Terms of Service"
                description="Terms governing use of the Elios (Kascon Technologies) website, warranty registration, customer support portal, and related services."
                canonicalPath="/terms-of-service"
            />
            <Breadcrumbs items={[{ label: 'Terms of Service' }]} />

            <section className="w-full bg-[#f8fafc] py-24 px-6">
                <div className="max-w-[900px] mx-auto">
                    <h1 className="font-heading font-bold text-[40px] md:text-[56px] text-brand-blue uppercase leading-tight tracking-tight mb-4">
                        Terms of Service
                    </h1>
                    <p className="font-questrial text-gray-500 text-lg mb-16">
                        Last updated: July 31, 2026
                    </p>

                    <div className="flex flex-col gap-10 font-questrial text-gray-700 text-lg leading-relaxed">
                        <p>
                            These terms govern your use of eliospk.com and the services offered by <b>Kascon Technologies (Pvt) Ltd.</b>
                            ("Elios," "we," "us") — browsing our products, registering a warranty, submitting a support request, and using
                            our customer support portal. By using this website, you agree to these terms.
                        </p>

                        <div>
                            <h2 className="font-heading font-bold text-2xl text-brand-blue mb-3">Using Our Website</h2>
                            <p>
                                This site is provided for browsing our Elios inverter air conditioner and geyser product range, registering
                                product warranties, and reaching our customer support team. You agree to use it only for these purposes,
                                to provide accurate information when registering a warranty or submitting a support request, and not to
                                misuse the site (including attempting to access other users' accounts or disrupt normal operation).
                            </p>
                        </div>

                        <div>
                            <h2 className="font-heading font-bold text-2xl text-brand-blue mb-3">Product Information</h2>
                            <p>
                                We aim to keep product specifications, pricing availability, and feature descriptions on this site accurate
                                and current, but specifications may change without notice as products are updated. Current pricing isn't
                                published on the site — the "Book Now" option on our Products page is an inquiry, not a completed purchase;
                                a member of our team will follow up with you directly regarding availability and pricing.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-heading font-bold text-2xl text-brand-blue mb-3">Warranty Terms</h2>
                            <p className="mb-3">
                                Standard warranty coverage for Elios inverter air conditioners (subject to the terms provided with your unit
                                at purchase, which take precedence over this summary):
                            </p>
                            <ul className="list-disc pl-6 flex flex-col gap-2">
                                <li><b>Compressor</b> — 10 years</li>
                                <li><b>PCB (control board)</b> — 4 years</li>
                                <li><b>Other parts</b> — 1 year</li>
                            </ul>
                            <p className="mt-3">
                                Warranty registration through this site requires accurate device details and serial number. Warranty coverage
                                may be voided by unauthorized repairs, misuse, or failure to register the product. Registering a warranty or
                                submitting a complaint does not guarantee a specific resolution or timeline — our support team will assess
                                each case.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-heading font-bold text-2xl text-brand-blue mb-3">Your Account</h2>
                            <p>
                                If you create an account to use our customer support portal, you're responsible for keeping your login
                                credentials confidential and for activity that happens under your account. Let us know immediately if you
                                believe your account has been accessed without your permission.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-heading font-bold text-2xl text-brand-blue mb-3">Intellectual Property</h2>
                            <p>
                                The content on this site — text, images, logos, and product designs — belongs to Kascon Technologies (Pvt)
                                Ltd. or its licensors. You may view and share it for personal, non-commercial reference, but not
                                reproduce it for commercial purposes without our permission.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-heading font-bold text-2xl text-brand-blue mb-3">Limitation of Liability</h2>
                            <p>
                                We provide this website and its content on an "as available" basis. To the extent permitted by law, we
                                aren't liable for indirect or consequential losses arising from your use of the site, though this doesn't
                                limit any warranty rights or protections you're entitled to under applicable consumer protection law or the
                                specific warranty terms provided with your product.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-heading font-bold text-2xl text-brand-blue mb-3">Governing Law</h2>
                            <p>
                                These terms are governed by the laws of Pakistan. Any disputes will be handled in accordance with
                                applicable Pakistani law.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-heading font-bold text-2xl text-brand-blue mb-3">Changes to These Terms</h2>
                            <p>
                                We may update these terms as our services change. We'll update the "Last updated" date above when we do.
                                Continued use of the site after a change means you accept the updated terms.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-heading font-bold text-2xl text-brand-blue mb-3">Contact Us</h2>
                            <p>
                                Questions about these terms? Reach us at{' '}
                                <a href="mailto:support@elios.com.pk" className="text-brand-blue font-bold">support@elios.com.pk</a>,
                                or write to us at Plot # 77, Street 10, Sector I-9/2, Islamabad Capital Territory, Pakistan.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
