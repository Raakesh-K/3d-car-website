import PerformanceStats from "@/components/PerformanceStats";

export default function PerformancePage() {
  return (
    <main className="w-full bg-black text-white min-h-screen pt-20">
      <PerformanceStats />
      
      {/* Additional Performance Content */}
      <section className="py-24 bg-neutral-950 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6">
                Engineered for <span className="text-velocity-red">Dominance</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                The heart of the Velocity X is a custom-built V8 hybrid powertrain, delivering instantaneous torque and screaming top-end power. Every component, from the forged pistons to the titanium exhaust, is meticulously crafted to eliminate weight and maximize output.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-4 border-b border-white/10 pb-4">
                  <span className="text-velocity-red font-bold tracking-wider">01 //</span>
                  <span className="text-gray-300">Twin-Turbocharged 4.0L V8</span>
                </li>
                <li className="flex items-center gap-4 border-b border-white/10 pb-4">
                  <span className="text-velocity-red font-bold tracking-wider">02 //</span>
                  <span className="text-gray-300">Direct-Drive Electric Motor Assist</span>
                </li>
                <li className="flex items-center gap-4 border-b border-white/10 pb-4">
                  <span className="text-velocity-red font-bold tracking-wider">03 //</span>
                  <span className="text-gray-300">Active Aerodynamic Drag Reduction</span>
                </li>
              </ul>
            </div>
            
            <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden glass-panel border border-white/10">
              <div className="absolute inset-0 bg-[url('/images/sequence/ezgif-frame-005.jpg')] bg-cover bg-center opacity-50 mix-blend-luminosity"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              
              {/* Overlay graphics */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex justify-between items-end border-b border-velocity-red/50 pb-4 mb-4">
                  <span className="text-xs tracking-[0.2em] text-velocity-red uppercase font-bold">Telemetry</span>
                  <span className="font-mono text-sm">LIVE</span>
                </div>
                <div className="flex gap-2">
                  <div className="h-1 flex-1 bg-white/20 overflow-hidden"><div className="h-full bg-velocity-red w-[85%]"></div></div>
                  <div className="h-1 flex-1 bg-white/20 overflow-hidden"><div className="h-full bg-velocity-red w-[60%]"></div></div>
                  <div className="h-1 flex-1 bg-white/20 overflow-hidden"><div className="h-full bg-velocity-red w-[92%]"></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
