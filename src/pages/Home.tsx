import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import VoiceAgents from '../components/VoiceAgents';
import WhatsAppApi from '../components/WhatsAppApi';
import CaseStudies from '../components/CaseStudies';
import Financials from '../components/Financials';
import Pricing from '../components/Pricing';
import TechSpecs from '../components/TechSpecs';
import Footer from '../components/Footer';
import ChatWidget from '../components/ChatWidget';
import BookDemoModal from '../components/BookDemoModal';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white selection:bg-indigo-500/30">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <VoiceAgents />
        <WhatsAppApi />
        <CaseStudies />
        <Financials />
        <Pricing />
        <TechSpecs />
      </main>
      <Footer />
      <ChatWidget />
      <BookDemoModal />
    </div>
  );
}
