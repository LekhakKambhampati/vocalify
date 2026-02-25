import { motion } from 'motion/react';
import { TrendingUp, Wallet, ShieldCheck } from 'lucide-react';

export default function Financials() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#12121a] to-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <span className="text-cyan-400 text-xs font-bold tracking-widest uppercase mb-4 block">The Business Case</span>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">
          Scale Without Limits. <br className="md:hidden" /> Reduce Costs. Eliminate Errors.
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Scalability Card */}
          <div className="glass-card p-8 rounded-3xl text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2">
              100+
            </div>
            <div className="text-white font-semibold text-lg mb-4">Concurrent Calls</div>
            <p className="text-zinc-400 leading-relaxed">
              Handle 100 calls simultaneously without hiring a single extra staff member.
            </p>
          </div>

          {/* Cost Reduction Card */}
          <div className="glass-card p-8 rounded-3xl text-center relative overflow-hidden group border-purple-500/30">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/20">
              <Wallet className="w-8 h-8 text-white" />
            </div>
            <div className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-2">
              60%
            </div>
            <div className="text-white font-semibold text-lg mb-4">Cost Reduction</div>
            <p className="text-zinc-400 leading-relaxed">
              Reduce your cost-per-interaction by up to 60% compared to traditional call centers.
            </p>
          </div>

          {/* Accuracy Card */}
          <div className="glass-card p-8 rounded-3xl text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <div className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2">
              100%
            </div>
            <div className="text-white font-semibold text-lg mb-4">Compliance</div>
            <p className="text-zinc-400 leading-relaxed">
              Eliminate human error. Our agents follow your brand's compliance guidelines 100% of the time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
