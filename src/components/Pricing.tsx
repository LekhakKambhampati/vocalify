import React from 'react';
import { Check } from 'lucide-react';
import { useModal } from '../context/ModalContext';

export default function Pricing() {
  const { openBookDemo } = useModal();

  return (
    <section id="pricing" className="py-24 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-cyan-400 text-xs font-bold tracking-widest uppercase mb-4 block">Transparent Pricing</span>
          <h2 className="text-4xl font-bold text-white mb-4">Invest in Growth, Not Overhead</h2>
          <p className="text-zinc-400">No hidden charges. Pay only for what you use.</p>
        </div>

        <div className="max-w-5xl mx-auto glass border border-white/10 rounded-3xl overflow-hidden">
          <div className="grid grid-cols-3 text-left">
            {/* Headers */}
            <div className="p-6 md:p-8 bg-white/5 border-b border-white/10 text-zinc-400 font-medium">Feature</div>
            <div className="p-6 md:p-8 bg-white/5 border-b border-white/10 border-l border-r text-white font-bold text-lg">Starter (Business)</div>
            <div className="p-6 md:p-8 bg-gradient-to-b from-purple-900/20 to-white/5 border-b border-purple-500/30 text-white font-bold text-lg relative">
              Enterprise (Custom)
              <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
            </div>

            {/* Rows */}
            {[
              { feature: "WhatsApp Agent Setup", starter: "-", enterprise: "-" },
              { feature: "Voice Agent Setup", starter: "-", enterprise: "-" },
              { feature: "Annual Platform Fee", starter: "-", enterprise: "-" },
              { feature: "Usage Rate", starter: "₹9/min (Pay-as-you-go)", enterprise: "Volume Discounts" },
              { feature: "WhatsApp Meta Charges", starter: "At Actuals*", enterprise: "At Actuals*" },
              { feature: "Integrations", starter: "Webhooks & Basic CRM", enterprise: "Full API & Custom ERP" },
              { feature: "Concurrent Calls", starter: "Up to 10", enterprise: "Unlimited" },
              { feature: "Support", starter: "Email + Chat", enterprise: "Dedicated Account Manager" },
            ].map((row, i) => (
              <React.Fragment key={i}>
                <div className="p-4 md:p-6 text-zinc-400 text-sm border-b border-white/5 flex items-center bg-[#0a0a0f]/50">
                  {row.feature}
                </div>
                <div className="p-4 md:p-6 text-white text-sm border-b border-white/5 border-l border-r border-white/5 flex items-center bg-[#0a0a0f]/30">
                  {row.starter}
                </div>
                <div className="p-4 md:p-6 text-white text-sm border-b border-white/5 border-purple-500/10 flex items-center font-medium bg-purple-900/5">
                  {row.enterprise === "Unlimited" ? (
                    <span className="text-cyan-400 font-bold flex items-center gap-2">
                       Unlimited <Check className="w-4 h-4" />
                    </span>
                  ) : row.enterprise}
                </div>
              </React.Fragment>
            ))}
            
            {/* CTA Row */}
            <div className="p-6 md:p-8 bg-[#0a0a0f]/50"></div>
            <div className="p-6 md:p-8 border-l border-r border-white/10 bg-[#0a0a0f]/30">
              <button 
                onClick={openBookDemo}
                className="w-full py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-colors"
              >
                Get Started
              </button>
            </div>
            <div className="p-6 md:p-8 bg-purple-900/5 border-purple-500/10">
              <button 
                onClick={openBookDemo}
                className="w-full py-3 rounded-full bg-gradient-primary text-white font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
          <p className="text-zinc-400 text-sm">
            *WhatsApp Meta Conversation Charges apply as per actual usage. Billing is completely transparent—no markup on Meta fees.
          </p>
        </div>
      </div>
    </section>
  );
}
