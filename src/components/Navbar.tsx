import React from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useModal } from '../context/ModalContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { openBookDemo } = useModal();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/50 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight text-white">
            VOCALIFY<span className="text-indigo-500">.</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { name: 'Voice Agents', href: '#voice-agents' },
            { name: 'WhatsApp Agents', href: '#whatsapp-agents' },
            { name: 'Pricing', href: '#pricing' }
          ].map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-zinc-300 hover:text-white transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <button 
            onClick={openBookDemo}
            className="bg-gradient-primary text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-indigo-500/25 transition-all hover:scale-105"
          >
            Book a Demo
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-20 left-0 right-0 bg-[#0a0a0f] border-b border-white/10 p-6 flex flex-col gap-4"
        >
          {[
            { name: 'Voice Agents', href: '#voice-agents' },
            { name: 'WhatsApp Agents', href: '#whatsapp-agents' },
            { name: 'Pricing', href: '#pricing' }
          ].map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-lg font-medium text-zinc-300 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              openBookDemo();
            }}
            className="bg-gradient-primary text-white px-6 py-3 rounded-full font-semibold text-sm w-full"
          >
            Book a Demo
          </button>
        </motion.div>
      )}
    </nav>
  );
}
