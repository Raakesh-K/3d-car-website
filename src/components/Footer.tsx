import Link from 'next/link';
import { Globe, MessageCircle, Camera, Briefcase, Video } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-velocity-dark border-t border-white/10 pt-16 pb-8 text-gray-400">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-velocity-red"
              >
                <path d="m12 2-9 4.5v5c0 5.25 3.5 10 9 12 5.5-2 9-6.75 9-12v-5z" />
                <path d="m12 22v-20" />
                <path d="m12 12 4-4" />
                <path d="m12 12-4-4" />
                <path d="m12 12 4 4" />
                <path d="m12 12-4 4" />
              </svg>
              <span className="text-xl font-bold tracking-widest text-white uppercase">
                Velocity X
              </span>
            </div>
            <p className="max-w-sm mb-6 leading-relaxed">
              Experience the pinnacle of automotive engineering and design. We are pushing the boundaries of what is possible on the road.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-velocity-red transition-colors"><Globe size={20} /></a>
              <a href="#" className="hover:text-velocity-red transition-colors"><MessageCircle size={20} /></a>
              <a href="#" className="hover:text-velocity-red transition-colors"><Camera size={20} /></a>
              <a href="#" className="hover:text-velocity-red transition-colors"><Briefcase size={20} /></a>
              <a href="#" className="hover:text-velocity-red transition-colors"><Video size={20} /></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link href="/" className="hover:text-velocity-red transition-colors">Home</Link></li>
              <li><Link href="/models" className="hover:text-velocity-red transition-colors">Models</Link></li>
              <li><Link href="/performance" className="hover:text-velocity-red transition-colors">Performance</Link></li>
              <li><Link href="/technology" className="hover:text-velocity-red transition-colors">Technology</Link></li>
              <li><Link href="/gallery" className="hover:text-velocity-red transition-colors">Gallery</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-6">Legal</h3>
            <ul className="space-y-4">
              <li><Link href="/privacy" className="hover:text-velocity-red transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-velocity-red transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookie" className="hover:text-velocity-red transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Velocity X. All rights reserved.</p>
          <p className="text-sm">Designed for performance enthusiasts.</p>
        </div>
      </div>
    </footer>
  );
}
