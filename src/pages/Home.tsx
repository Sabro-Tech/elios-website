import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import AboutUs from '../components/AboutUs';
import FeaturesIntro from '../components/FeaturesIntro';
import Features from '../components/Features';
import FinishLadder from '../components/FinishLadder';
import CustomerSupport from '../components/CustomerSupport';
import ContactForm from '../components/ContactForm';

export default function Home() {
    const navigate = useNavigate();

    return (
        <main className="w-full">
            <Hero />
            <Marquee />
            <AboutUs />
            <FeaturesIntro />
            <Features />
            <FinishLadder onSelect={(key) => navigate(`/products?finish=${key}`)} />
            <CustomerSupport />
            <ContactForm />
        </main>
    );
}
