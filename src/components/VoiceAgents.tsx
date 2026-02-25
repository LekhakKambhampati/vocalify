import { motion } from 'motion/react';
import { Brain, Zap, Database, Languages } from 'lucide-react';

export default function VoiceAgents() {
  return (
    <section id="voice-agents" className="py-24 bg-gradient-to-b from-[#0a0a0f] to-[#12121a]">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Column: Visual */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="order-2 lg:order-1 relative"
        >
          <div className="relative mx-auto w-[300px] h-[600px] bg-black border-[8px] border-zinc-800 rounded-[3rem] shadow-2xl overflow-hidden z-10">
             <div className="absolute inset-0 bg-zinc-900 flex flex-col">
                {/* Call Interface */}
                <div className="flex-1 flex flex-col items-center pt-20 px-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-1 mb-6 relative">
                    <img src="https://picsum.photos/seed/sarah/200/200" alt="Agent" className="w-full h-full rounded-full object-cover border-4 border-black" referrerPolicy="no-referrer" />
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-black flex items-center justify-center">
                       <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-1">Agent Sarah</h3>
                  <p className="text-indigo-400 text-sm mb-8">Sales Representative</p>
                  
                  {/* Live Transcript */}
                  <div className="w-full bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/5 mb-8">
                    <p className="text-zinc-500 text-xs uppercase mb-2">Live Transcript</p>
                    <p className="text-white text-sm leading-relaxed">
                      "Yes, I can definitely help you with that upgrade. Based on your usage, the Enterprise plan would save you about 20% annually."
                    </p>
                  </div>
                  
                  {/* Waveform */}
                  <div className="flex items-center justify-center gap-1 h-12 w-full">
                     {[...Array(20)].map((_, i) => (
                       <motion.div 
                         key={i}
                         animate={{ height: [10, 40, 10] }}
                         transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.05 }}
                         className="w-1 bg-indigo-500/80 rounded-full"
                       />
                     ))}
                  </div>
                </div>
                
                {/* Controls */}
                <div className="h-24 bg-zinc-900 flex items-center justify-around px-8 pb-4">
                   <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white"><span className="text-xl">🎙️</span></div>
                   <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center text-white shadow-lg shadow-red-500/30"><span className="text-2xl">📞</span></div>
                   <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white"><span className="text-xl">🔊</span></div>
                </div>
             </div>
          </div>
          
          {/* Floating Cards */}
          <motion.div 
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-20 -left-10 z-20 glass-card p-4 rounded-xl flex items-center gap-3 max-w-[200px]"
          >
            <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400"><Brain size={20} /></div>
            <div>
              <div className="text-white text-sm font-bold">Contextual</div>
              <div className="text-zinc-500 text-xs">Remembers history</div>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 6, repeat: Infinity, delay: 1 }}
            className="absolute bottom-40 -right-10 z-20 glass-card p-4 rounded-xl flex items-center gap-3 max-w-[200px]"
          >
            <div className="p-2 bg-green-500/20 rounded-lg text-green-400"><Database size={20} /></div>
            <div>
              <div className="text-white text-sm font-bold">CRM Synced</div>
              <div className="text-zinc-500 text-xs">Auto-logging</div>
            </div>
          </motion.div>
          
          {/* Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-600/20 blur-[100px] -z-10" />
        </motion.div>

        {/* Right Column: Content */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="order-1 lg:order-2"
        >
          <span className="text-cyan-400 text-xs font-bold tracking-widest uppercase mb-4 block">Core Service</span>
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
            Stop losing leads to wait times. <br/>
            <span className="text-zinc-500">Scale with AI Voice Agents.</span>
          </h2>
          <p className="text-zinc-400 text-lg mb-10">
            Replace rigid IVR systems with intelligent conversations that adapt in real-time. Our agents handle thousands of concurrent calls with natural, human-like inflection.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                icon: <Brain className="w-6 h-6 text-white" />,
                bg: "bg-purple-500",
                title: "Contextual Intelligence",
                desc: "Understand intent and handle interruptions naturally."
              },
              {
                icon: <Zap className="w-6 h-6 text-white" />,
                bg: "bg-cyan-500",
                title: "Sub-500ms Latency",
                desc: "Lag-free conversations indistinguishable from humans."
              },
              {
                icon: <Database className="w-6 h-6 text-white" />,
                bg: "bg-purple-500",
                title: "CRM Integration",
                desc: "Auto-log outcomes to Salesforce, HubSpot, or Zoho."
              },
              {
                icon: <Languages className="w-6 h-6 text-white" />,
                bg: "bg-cyan-500",
                title: "Native Regional Support",
                desc: "Fluent in Hindi, Telugu, Tamil, Kannada, and 8+ dialects with local cultural nuances."
              }
            ].map((feature, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl hover:border-purple-500/30 group">
                <div className={`w-12 h-12 rounded-full ${feature.bg} flex items-center justify-center mb-4 shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
