import Seo from '../components/Seo';
import Breadcrumbs from '../components/Breadcrumbs';

export default function PrivacyPolicy() {
    return (
        <div className="w-full bg-white">
            <Seo
                title="Privacy Policy"
                description="How Elios (Kascon Technologies) collects, uses, and protects your information across our website, customer support, and WhatsApp communications."
                canonicalPath="/privacy-policy"
            />
            <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

            <section className="w-full bg-[#f8fafc] py-24 px-6">
                <div className="max-w-[900px] mx-auto">
                    <h1 className="font-heading font-bold text-[40px] md:text-[56px] text-brand-blue uppercase leading-tight tracking-tight mb-4">
                        Privacy Policy
                    </h1>
                    <p className="font-questrial text-gray-500 text-lg mb-16">
                        Last updated: July 30, 2026
                    </p>

                    <div className="flex flex-col gap-10 font-questrial text-gray-700 text-lg leading-relaxed">
                        <p>
                            This policy explains what information Elios (a brand of <b>Kascon Technologies (Pvt) Ltd.</b>) collects
                            through eliospk.com and our customer service channels, why we collect it, and how you can control it.
                            It applies to our website, our customer support process, and marketing messages we send with your consent.
                        </p>

                        <div>
                            <h2 className="font-heading font-bold text-2xl text-brand-blue mb-3">Information We Collect</h2>
                            <p className="mb-3">We collect information you provide directly to us:</p>
                            <ul className="list-disc pl-6 flex flex-col gap-2">
                                <li><b>Contact form submissions</b> — name, email, phone number, and your message.</li>
                                <li><b>Warranty registrations and support requests</b> — name, phone, email, device details, serial number, and a description of the issue.</li>
                                <li><b>Customer and purchase records</b> — for customers who buy Elios products, we keep a record of the purchase (product, serial number, date) to support your warranty and any future service requests.</li>
                                <li><b>Account information</b> — if you create an account to use the customer support portal, we store your name, contact details, and login credentials (managed securely through our authentication provider).</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="font-heading font-bold text-2xl text-brand-blue mb-3">WhatsApp Communications</h2>
                            <p className="mb-3">
                                We use WhatsApp to send order updates, support responses, and — only where you've separately given consent —
                                promotional or marketing messages about our products. We do not add phone numbers to our marketing list without
                                an explicit opt-in.
                            </p>
                            <p>
                                If you'd like to stop receiving marketing messages from us on WhatsApp at any time, contact us using the details
                                below and we'll remove you promptly. This doesn't affect order-related or support messages tied to an active
                                warranty claim or service request.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-heading font-bold text-2xl text-brand-blue mb-3">Website Analytics</h2>
                            <p>
                                We use Google Analytics to understand how visitors use our website — pages viewed, general location (derived
                                from IP address, not exact), device type, and how you arrived at our site. This helps us improve the site and
                                doesn't identify you personally. You can control this through your browser's cookie/tracking settings or
                                Google's own opt-out tools.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-heading font-bold text-2xl text-brand-blue mb-3">How We Use Your Information</h2>
                            <ul className="list-disc pl-6 flex flex-col gap-2">
                                <li>Responding to your inquiries, warranty registrations, and support/complaint requests.</li>
                                <li>Keeping a record of your purchases so we can honor warranty terms without asking you to re-submit proof each time.</li>
                                <li>Sending order and service updates relevant to your purchase or open support request.</li>
                                <li>Sending marketing messages only to contacts who have opted in, and only until you opt out.</li>
                                <li>Understanding overall website traffic and usage patterns to improve our site and support.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="font-heading font-bold text-2xl text-brand-blue mb-3">Who We Share Information With</h2>
                            <p className="mb-3">We don't sell your information. We share it only with the service providers that make our systems work:</p>
                            <ul className="list-disc pl-6 flex flex-col gap-2">
                                <li><b>Meta (WhatsApp, Facebook, Instagram)</b> — to deliver WhatsApp messages you've consented to receive, and to manage our social media presence.</li>
                                <li><b>Google (Analytics, Search Console)</b> — for the website analytics described above.</li>
                                <li>Our authentication and hosting providers, solely to operate the website and customer portal securely.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="font-heading font-bold text-2xl text-brand-blue mb-3">How We Protect Your Information</h2>
                            <p>
                                Your information is stored in a secured database with access restricted to authorized Elios/Kascon staff who
                                need it to do their jobs — customer support, warranty processing, and marketing communications you've opted into.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-heading font-bold text-2xl text-brand-blue mb-3">Your Choices</h2>
                            <ul className="list-disc pl-6 flex flex-col gap-2">
                                <li>Ask what information we hold about you, or request that we correct it.</li>
                                <li>Opt out of WhatsApp marketing messages at any time — contact us and we'll remove you.</li>
                                <li>Request deletion of your information, subject to what we're required to keep for warranty, tax, or legal record-keeping purposes.</li>
                            </ul>
                        </div>

                        <div id="data-deletion">
                            <h2 className="font-heading font-bold text-2xl text-brand-blue mb-3">Requesting Deletion of Your Data</h2>
                            <p className="mb-3">
                                If you'd like us to delete the information we hold about you (contact form submissions, warranty/support
                                records, or WhatsApp marketing contact details), email{' '}
                                <a href="mailto:support@elios.com.pk" className="text-brand-blue font-bold">support@elios.com.pk</a> with
                                the subject line "Data Deletion Request" and the name/phone number/email associated with your record.
                            </p>
                            <p>
                                We'll confirm your identity, process the deletion, and reply once it's done — typically within 30 days.
                                Some information may be retained where we're required to for warranty, tax, or legal record-keeping
                                purposes, as noted above; we'll tell you if that applies to your request.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-heading font-bold text-2xl text-brand-blue mb-3">Contact Us</h2>
                            <p>
                                For any questions about this policy or your information, reach us at{' '}
                                <a href="mailto:support@elios.com.pk" className="text-brand-blue font-bold">support@elios.com.pk</a>,
                                or write to us at Plot # 77, Street 10, Sector I-9/2, Islamabad Capital Territory, Pakistan.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-heading font-bold text-2xl text-brand-blue mb-3">Changes to This Policy</h2>
                            <p>
                                We may update this policy as our services change. We'll update the "Last updated" date above when we do.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
