import Hero from '../components/Hero';
import FeaturesIntro from '../components/FeaturesIntro';
import Features from '../components/Features';
import CustomerSupport from '../components/CustomerSupport';
import AboutUs from '../components/AboutUs';
import ContactForm from '../components/ContactForm';
import Seo from '../components/Seo';

export default function Home() {
    return (
        <div className="w-full">
            <Seo
                title="Inverter Air Conditioners"
                description="Elios inverter air conditioners for Pakistan — 1 Ton and 1.5 Ton split units, energy-efficient, with real customer support and warranty backing."
                canonicalPath="/"
            />
            <Hero />
            <FeaturesIntro />
            <div id="features">
                <Features />
            </div>
            <div id="support">
                <CustomerSupport />
            </div>
            <div id="about">
                <AboutUs />
            </div>
            <div id="contact">
                <ContactForm />
            </div>
        </div>
    );
}
