import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        setStatus('success');
        setTimeout(() => {
          setStatus('idle');
          setFormData({ name: '', phone: '', service: '' });
          onClose();
        }, 2000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-md bg-velocity-dark border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-2xl font-bold uppercase tracking-wider text-white">Contact Us</h2>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-velocity-red transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-velocity-red transition-colors"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider">
                  Service
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-velocity-red transition-colors appearance-none"
                >
                  <option value="" disabled className="text-gray-500">Select a service</option>
                  <option value="test-drive">Test Drive</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="consultation">Consultation</option>
                  <option value="support">Support</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="w-full py-4 bg-velocity-red text-white font-bold uppercase tracking-widest rounded-lg hover:bg-red-600 transition-colors mt-4 disabled:opacity-50"
              >
                {status === 'loading' ? 'Submitting...' : status === 'success' ? 'Request Sent!' : 'Submit Request'}
              </button>
              {status === 'error' && (
                <p className="text-red-500 text-sm mt-2 text-center">Something went wrong. Please try again.</p>
              )}
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
