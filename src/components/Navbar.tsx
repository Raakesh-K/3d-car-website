"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ContactModal from './ContactModal';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'glass-panel py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-velocity-red animate-pulse"
          >
            <path d="m12 2-9 4.5v5c0 5.25 3.5 10 9 12 5.5-2 9-6.75 9-12v-5z" />
            <path d="m12 22v-20" />
            <path d="m12 12 4-4" />
            <path d="m12 12-4-4" />
            <path d="m12 12 4 4" />
            <path d="m12 12-4 4" />
          </svg>
          <span className="text-2xl font-bold tracking-widest text-white uppercase">
            Velocity X
          </span>
        </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wider text-gray-300 uppercase">
        <Link href="/" className="hover:text-velocity-red transition-colors">Home</Link>
        <Link href="/models" className="hover:text-velocity-red transition-colors">Models</Link>
        <Link href="/performance" className="hover:text-velocity-red transition-colors">Performance</Link>
        <Link href="/technology" className="hover:text-velocity-red transition-colors">Technology</Link>
        <Link href="/gallery" className="hover:text-velocity-red transition-colors">Gallery</Link>
        <button onClick={() => setContactModalOpen(true)} className="hover:text-velocity-red transition-colors uppercase">Contact Us</button>
      </div>

        {/* CTA */}
        <div className="hidden md:block">
          <button className="px-6 py-2 bg-velocity-red text-white text-sm font-bold uppercase tracking-wider hover:bg-red-600 transition-colors">
            Configure
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full glass-panel py-6 px-6 flex flex-col gap-4 border-t border-white/10 md:hidden">
          <Link href="/" className="block text-gray-300 hover:text-velocity-red py-2" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link href="/models" className="block text-gray-300 hover:text-velocity-red py-2" onClick={() => setMobileMenuOpen(false)}>Models</Link>
          <Link href="/performance" className="block text-gray-300 hover:text-velocity-red py-2" onClick={() => setMobileMenuOpen(false)}>Performance</Link>
          <Link href="/technology" className="block text-gray-300 hover:text-velocity-red py-2" onClick={() => setMobileMenuOpen(false)}>Technology</Link>
          <Link href="/gallery" className="block text-gray-300 hover:text-velocity-red py-2" onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
          <button onClick={() => { setMobileMenuOpen(false); setContactModalOpen(true); }} className="block text-left text-gray-300 hover:text-velocity-red py-2 uppercase">Contact Us</button>
          <button className="w-full mt-4 px-6 py-3 bg-velocity-red text-white text-sm font-bold uppercase tracking-wider">
            Configure
          </button>
        </div>
      )}
      
      <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </motion.nav>
  );
}
