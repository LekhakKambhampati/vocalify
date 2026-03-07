import { motion } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';
import { useModal } from '../context/ModalContext';

export default function Hero() {
  const { openBookDemo } = useModal();

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#0a0a0f]">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10"
        >
          <div className="inline-block mb-4">
          </div>
          
          <h1 className="text-5xl lg:text-[64px] font-extrabold leading-[1.1] text-white mb-6">
            <span className="text-gradient">Human-Grade</span> AI Voice & WhatsApp Automation for Scaling Businesses.
          </h1>
          
          <p className="text-zinc-400 text-lg lg:text-xl leading-relaxed max-w-xl mb-10">
            Automate your sales and support with sub-500ms latency voice agents fluent in <span className="text-white font-medium">Hindi, Telugu, Tamil, Kannada</span>, and English. 24/7 engagement with zero human overhead.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button 
              onClick={openBookDemo}
              className="bg-gradient-primary text-white px-8 py-4 rounded-full font-semibold text-base shadow-lg shadow-indigo-500/25 hover:scale-105 transition-transform flex items-center justify-center gap-2"
            >
              Book a Demo <ArrowRight className="w-4 h-4" />
            </button>
            <a 
              href="#pricing"
              className="bg-transparent border border-white/10 text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" /> View Pricing
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0a0a0f] bg-zinc-800 overflow-hidden">
                  <img src={`https://picsum.photos/seed/${i}/100/100`} alt="User" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
            <div className="text-sm text-zinc-500">
              <span className="block text-white font-semibold">Trusted by 500+ Indian businesses</span>
              <div className="flex gap-1 text-yellow-500 text-xs">★★★★★</div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Visual */}
        <div className="relative h-[600px] hidden lg:block">
          {/* Decorative Circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl" />
          
          {/* Floating Phone Mockups */}
          <motion.div 
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 right-10 w-[280px] z-20"
          >
            <div className="bg-black border-[8px] border-zinc-800 rounded-[3rem] overflow-hidden shadow-2xl shadow-black/50 h-[580px] relative">
              {/* WhatsApp UI Mockup */}
              <div className="bg-[#0b141a] h-full w-full flex flex-col">
                <div className="bg-[#202c33] p-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">V</div>
                  <div>
                    <div className="text-white text-sm font-medium flex items-center gap-1">Vocalify <span className="text-green-500 text-[10px]">✔</span></div>
                    <div className="text-zinc-400 text-xs">Official Business Account</div>
                  </div>
                </div>
                <div className="flex-1 p-4 space-y-4 overflow-hidden relative">
                  <div className="absolute inset-0 opacity-5 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat"></div>
                  
                  <div className="bg-[#202c33] p-3 rounded-lg rounded-tl-none max-w-[85%] self-start text-white text-sm relative z-10">
                    Hello! How can I help you scale your business today?
                    <div className="text-[10px] text-zinc-500 text-right mt-1">10:00 AM</div>
                  </div>
                  
                  <div className="bg-[#005c4b] p-3 rounded-lg rounded-tr-none max-w-[85%] self-end ml-auto text-white text-sm relative z-10">
                    I'm interested in the AI Voice Agents. Can they handle Hindi?
                    <div className="text-[10px] text-green-200 text-right mt-1">10:01 AM</div>
                  </div>

                  <div className="bg-[#202c33] p-3 rounded-lg rounded-tl-none max-w-[85%] self-start text-white text-sm relative z-10">
                    Absolutely! Our agents are fluent in English, Hindi, and Hinglish with native accents. Would you like a demo call?
                    <div className="text-[10px] text-zinc-500 text-right mt-1">10:01 AM</div>
                  </div>
                  
                  <div className="bg-[#202c33] p-2 rounded-lg max-w-[85%] self-start text-cyan-400 text-sm text-center border border-white/5 relative z-10 cursor-pointer hover:bg-white/5">
                    📞 Schedule Demo Call
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Background Phone (Voice UI) */}
          <motion.div 
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-20 left-0 w-[260px] z-10 opacity-60 scale-90 blur-[1px]"
          >
             <div className="bg-black border-[8px] border-zinc-800 rounded-[3rem] overflow-hidden shadow-2xl h-[550px]">
                <div className="bg-gradient-to-b from-indigo-900 to-black h-full w-full flex flex-col items-center justify-center p-6 relative">
                  <div className="w-20 h-20 rounded-full bg-indigo-500/20 flex items-center justify-center mb-6 animate-pulse">
                    <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                      <span className="text-2xl">AI</span>
                    </div>
                  </div>
                  <div className="text-white text-xl font-semibold mb-2">Agent Sarah</div>
                  <div className="text-indigo-300 text-sm mb-8">00:42 • Active Call</div>
                  
                  {/* Waveform */}
                  <div className="flex items-center gap-1 h-12 mb-12">
                     {[...Array(10)].map((_, i) => (
                       <motion.div 
                         key={i}
                         animate={{ height: [10, 30, 10] }}
                         transition={{ duration: 0.5 + Math.random() * 0.5, repeat: Infinity }}
                         className="w-1.5 bg-indigo-400 rounded-full"
                       />
                     ))}
                  </div>
                </div>
             </div>
          </motion.div>

          {/* Floating Badge */}
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute bottom-32 left-10 z-30 glass px-6 py-3 rounded-xl flex items-center gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <div>
              <div className="text-white text-sm font-bold">Sub-500ms</div>
              <div className="text-zinc-400 text-xs">Ultra-low latency</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
