import { motion } from 'motion/react';
import { ArrowRight, TrendingUp, Users, Clock } from 'lucide-react';
import { useModal } from '../context/ModalContext';

const caseStudies = [
  {
    company: "EduRise",
    industry: "EdTech",
    logoColor: "bg-orange-500",
    problem: "Sales team was overwhelmed by 5,000+ daily leads, resulting in a 48-hour callback delay and low conversion.",
    solution: "Deployed Vocalify Voice Agents to instantly qualify leads within 2 minutes of registration.",
    result: "40% increase in lead conversion and reduced CAC by 35%.",
    stat: "40%",
    statLabel: "Conversion Lift",
    icon: <TrendingUp className="w-5 h-5 text-white" />
  },
  {
    company: "RupeeFast",
    industry: "Fintech",
    logoColor: "bg-blue-500",
    problem: "Customer support costs were skyrocketing due to repetitive queries about loan status and KYC.",
    solution: "Implemented WhatsApp Automation flows for document collection and status updates.",
    result: "70% reduction in support tickets and 24/7 query resolution.",
    stat: "70%",
    statLabel: "Cost Savings",
    icon: <Users className="w-5 h-5 text-white" />
  },
  {
    company: "FreshMart",
    industry: "D2C / E-commerce",
    logoColor: "bg-green-500",
    problem: "High cart abandonment rates on the mobile app and low email open rates for recovery.",
    solution: "Used WhatsApp API for abandoned cart recovery with one-click checkout links.",
    result: "25% revenue recovery from abandoned carts in the first month.",
    stat: "25%",
    statLabel: "Rev. Recovery",
    icon: <Clock className="w-5 h-5 text-white" />
  }
];

export default function CaseStudies() {
  const { openBookDemo } = useModal();

  return (
    <section id="case-studies" className="py-24 bg-[#0a0a0f] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px] translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-cyan-400 text-xs font-bold tracking-widest uppercase mb-4 block">Success Stories</span>
          <h2 className="text-4xl font-bold text-white mb-4">Proven Results for Indian Enterprises</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            See how leading brands are transforming their customer engagement with Vocalify.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-8 rounded-3xl flex flex-col h-full group hover:border-indigo-500/30"
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-xl ${study.logoColor} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                  {study.company[0]}
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{study.company}</h3>
                  <span className="text-zinc-500 text-xs uppercase tracking-wider">{study.industry}</span>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4 mb-8 flex-1">
                <div>
                  <span className="text-zinc-500 text-xs font-semibold uppercase">Problem</span>
                  <p className="text-zinc-300 text-sm mt-1 leading-relaxed">{study.problem}</p>
                </div>
                <div>
                  <span className="text-zinc-500 text-xs font-semibold uppercase">Solution</span>
                  <p className="text-zinc-300 text-sm mt-1 leading-relaxed">{study.solution}</p>
                </div>
              </div>

              {/* Result/Footer */}
              <div className="mt-auto pt-6 border-t border-white/5">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                      {study.stat}
                    </div>
                    <div className="text-zinc-500 text-xs font-medium">{study.statLabel}</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                    {study.icon}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
