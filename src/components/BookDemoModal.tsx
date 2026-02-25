import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useModal } from '../context/ModalContext';

export default function BookDemoModal() {
  const { isBookDemoOpen, closeBookDemo } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    business: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('idle');

    try {
      const response = await fetch('/api/book-demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to submit');

      setStatus('success');
      setTimeout(() => {
        closeBookDemo();
        setStatus('idle');
        setFormData({ name: '', email: '', contact: '', business: '' });
      }, 2000);
    } catch (error) {
      console.error(error);
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isBookDemoOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBookDemo}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-[70] p-4"
          >
            <div className="bg-[#12121a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative">
              {/* Close Button */}
              <button
                onClick={closeBookDemo}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
              >
                <X size={20} />
              </button>

              <div className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">Book a Demo</h2>
                  <p className="text-zinc-400 text-sm">
                    See how Vocalify can transform your business communication.
                  </p>
                </div>

                {status === 'success' ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-white font-semibold text-lg">Request Received!</h3>
                    <p className="text-zinc-400 text-sm mt-2">
                      Our team will contact you shortly to schedule your personalized demo.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5">
                        Full Name
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5">
                        Work Email
                      </label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                        placeholder="john@company.com"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5">
                        Contact Number
                      </label>
                      <input
                        required
                        type="tel"
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5">
                        Business Type
                      </label>
                      <select
                        required
                        value={formData.business}
                        onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                        className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all appearance-none"
                      >
                        <option value="" disabled>Select your industry</option>
                        <option value="EdTech">EdTech</option>
                        <option value="Fintech">Fintech</option>
                        <option value="E-commerce">E-commerce / D2C</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {status === 'error' && (
                      <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-3 rounded-lg">
                        <AlertCircle size={16} />
                        <span>Something went wrong. Please try again.</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3.5 rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Schedule Demo'
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
