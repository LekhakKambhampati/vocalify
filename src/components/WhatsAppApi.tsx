import { motion } from 'motion/react';
import { CheckCircle, LayoutGrid, Send, CreditCard } from 'lucide-react';

export default function WhatsAppApi() {
  return (
    <section id="whatsapp-agents" className="py-24 bg-[#0a0a0f] relative overflow-hidden">
      {/* Background Orb */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-600/15 rounded-full blur-[120px] translate-y-1/4 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Column: Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-cyan-400 text-xs font-bold tracking-widest uppercase mb-4 block">Official Meta Partner</span>
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
            Meet your customers where they are. <br/>
            <span className="text-zinc-500">Full-funnel WhatsApp Automation.</span>
          </h2>
          <p className="text-zinc-400 text-lg mb-10">
            Move beyond simple 'Away Messages'. Use the Official WhatsApp Business API with green tick verification to drive sales and support.
          </p>

          <div className="space-y-6">
            {[
              {
                icon: <CheckCircle className="w-5 h-5 text-green-500" />,
                title: "Official Green Tick",
                desc: "Establish instant trust with a Verified Business Profile (subject to Meta approval)."
              },
              {
                icon: <LayoutGrid className="w-5 h-5 text-purple-500" />,
                title: "Interactive Flows",
                desc: "Guide customers through product discovery with list menus and carousels."
              },
              {
                icon: <Send className="w-5 h-5 text-cyan-500" />,
                title: "Precision Broadcasting",
                desc: "Send personalized notifications with 90%+ open rates in India."
              },
              {
                icon: <CreditCard className="w-5 h-5 text-purple-500" />,
                title: "Secure Payment Links",
                desc: "Send Razorpay/Stripe links directly in chat to close sales instantly."
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="mt-1 bg-white/5 p-2 rounded-lg h-fit border border-white/5">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                  <p className="text-zinc-400 text-sm mt-1 max-w-md">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg inline-block">
            <p className="text-yellow-200 text-xs font-medium">
              *Meta Conversation Charges apply as per actual usage.
            </p>
          </div>
        </motion.div>

        {/* Right Column: Visual */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
           <div className="relative mx-auto w-[300px] h-[600px] bg-black border-[8px] border-zinc-800 rounded-[3rem] shadow-2xl overflow-hidden z-10">
              <div className="bg-[#0b141a] h-full w-full flex flex-col">
                 {/* Header */}
                 <div className="bg-[#202c33] p-4 flex items-center justify-between shadow-md z-20">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">V</div>
                       <div>
                          <div className="text-white font-medium flex items-center gap-1">
                             Vocalify <CheckCircle className="w-3 h-3 text-green-500 fill-current" />
                          </div>
                          <div className="text-zinc-400 text-xs">Official Business Account</div>
                       </div>
                    </div>
                 </div>

                 {/* Chat Area */}
                 <div className="flex-1 p-4 space-y-4 overflow-y-auto relative">
                    <div className="absolute inset-0 opacity-5 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat pointer-events-none"></div>
                    
                    {/* Product Carousel Mockup */}
                    <div className="bg-[#202c33] p-2 rounded-lg rounded-tl-none max-w-[90%] self-start relative z-10">
                       <div className="bg-zinc-800 h-32 rounded-md mb-2 overflow-hidden relative">
                          <img src="https://picsum.photos/seed/product/300/200" alt="Product" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-white text-xs">
                             Premium Plan - ₹15,000/yr
                          </div>
                       </div>
                       <p className="text-white text-sm mb-2 px-1">Ready to upgrade? Secure your enterprise plan now.</p>
                       <div className="grid grid-cols-2 gap-2">
                          <button className="bg-[#202c33] border border-white/10 text-cyan-400 text-xs py-2 rounded text-center hover:bg-white/5">View Details</button>
                          <button className="bg-[#202c33] border border-white/10 text-cyan-400 text-xs py-2 rounded text-center hover:bg-white/5">Buy Now</button>
                       </div>
                    </div>

                    {/* Payment Link */}
                    <div className="bg-[#202c33] p-3 rounded-lg rounded-tl-none max-w-[85%] self-start text-white text-sm relative z-10 border-l-4 border-green-500">
                       <div className="text-xs text-zinc-400 mb-1">Payment Request</div>
                       <div className="font-medium">₹15,000.00</div>
                       <div className="text-xs text-zinc-400 mt-1">Due today</div>
                       <button className="w-full mt-2 bg-green-600 text-white text-xs py-2 rounded font-medium">Pay with Razorpay</button>
                    </div>
                 </div>
              </div>
           </div>

           {/* Floating Stats */}
           <motion.div 
             animate={{ y: [-10, 10, -10] }}
             transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
             className="absolute top-32 -right-4 z-20 glass-card px-5 py-3 rounded-xl border-l-4 border-green-500"
           >
             <div className="text-2xl font-bold text-white">90%</div>
             <div className="text-zinc-400 text-xs uppercase tracking-wider">Open Rate</div>
           </motion.div>

           <motion.div 
             animate={{ y: [10, -10, 10] }}
             transition={{ duration: 6, repeat: Infinity, delay: 1.5 }}
             className="absolute bottom-32 -left-4 z-20 glass-card px-5 py-3 rounded-xl flex items-center gap-2"
           >
             <div className="w-3 h-3 bg-blue-500 rounded-full" />
             <div className="text-white text-sm font-bold">Razorpay Integrated</div>
           </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
