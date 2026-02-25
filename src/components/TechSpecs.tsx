import { Shield, Phone, Cpu, Server, Languages } from 'lucide-react';

export default function TechSpecs() {
  return (
    <section className="py-20 bg-[#12121a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <span className="text-cyan-400 text-xs font-bold tracking-widest uppercase mb-4 block">Technical Excellence</span>
        <h2 className="text-3xl font-bold text-white mb-12">Built for Enterprise-Grade Reliability</h2>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              icon: <Shield className="w-8 h-8 text-indigo-500" />,
              title: "Security",
              desc: "End-to-end encryption on all WhatsApp data."
            },
            {
              icon: <Languages className="w-8 h-8 text-cyan-500" />,
              title: "Multilingual Engine",
              desc: "Native support for 10+ Indian languages including Telugu, Tamil, & Hindi."
            },
            {
              icon: <Cpu className="w-8 h-8 text-purple-500" />,
              title: "Intelligence",
              desc: "Powered by custom-tuned LLMs for high-accuracy intent recognition."
            },
            {
              icon: <Server className="w-8 h-8 text-green-500" />,
              title: "Uptime",
              desc: "99.9% SLA guarantee with redundant infrastructure."
            }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center p-6 rounded-2xl hover:bg-white/5 transition-colors">
              <div className="mb-4 p-3 bg-white/5 rounded-xl border border-white/5">
                {item.icon}
              </div>
              <h3 className="text-white font-semibold mb-2">{item.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
