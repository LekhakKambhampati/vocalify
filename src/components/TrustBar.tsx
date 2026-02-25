import { motion } from 'motion/react';

const logos = [
  "Razorpay", "Zoho", "Salesforce", "HubSpot", "Meta", "Jio", "Airtel"
];

export default function TrustBar() {
  return (
    <section className="py-12 border-y border-white/5 bg-[#0a0a0f] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-zinc-500 text-xs font-bold tracking-widest uppercase mb-8">
          Powering Communication For
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50">
          {logos.map((logo, index) => (
            <motion.div 
              key={index}
              whileHover={{ opacity: 1, scale: 1.05 }}
              className="text-xl md:text-2xl font-bold text-white cursor-default select-none"
            >
              {/* Using text for logos as placeholders since we don't have SVGs, 
                  but styling them to look like logos */}
              <span className="font-sans tracking-tight">{logo}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
