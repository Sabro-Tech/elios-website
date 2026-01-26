import Hero from '../components/Hero';
import FeaturesIntro from '../components/FeaturesIntro';
import Features from '../components/Features';
import CustomerSupport from '../components/CustomerSupport';
import AboutUs from '../components/AboutUs';
import ContactForm from '../components/ContactForm';

export default function Home() {
    return (
        <div className="w-full">
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
