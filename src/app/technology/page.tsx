import FeatureShowcase from "@/components/FeatureShowcase";
import InteriorExperience from "@/components/InteriorExperience";

export default function TechnologyPage() {
  return (
    <main className="w-full bg-black text-white min-h-screen pt-20">
      <FeatureShowcase />
      <InteriorExperience />
      
      {/* Additional Technology Content */}
      <section className="py-24 bg-neutral-900 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6">
            Neural Drive <span className="text-velocity-red">AI</span>
          </h2>
          <p className="text-gray-400 leading-relaxed max-w-2xl mx-auto mb-16">
            The Velocity X isn't just driven; it's partnered with. Our proprietary Neural Drive AI continuously analyzes driver biometrics, road conditions, and traffic patterns at 10,000 times per second to perfectly optimize suspension, torque delivery, and aerodynamics.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-8 rounded-2xl border-t-4 border-t-velocity-red text-left">
              <div className="w-12 h-12 rounded-full bg-velocity-red/20 flex items-center justify-center mb-6 text-velocity-red">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <h4 className="text-xl font-bold uppercase mb-3">Adaptive Chassis</h4>
              <p className="text-gray-400 text-sm leading-relaxed">Magnetorheological dampers adjust instantly to cornering g-forces, keeping the car perfectly flat.</p>
            </div>
            
            <div className="glass-panel p-8 rounded-2xl border-t-4 border-t-velocity-red text-left">
              <div className="w-12 h-12 rounded-full bg-velocity-red/20 flex items-center justify-center mb-6 text-velocity-red">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
              </div>
              <h4 className="text-xl font-bold uppercase mb-3">Quantum Sensors</h4>
              <p className="text-gray-400 text-sm leading-relaxed">Lidar, Radar, and ultra-sonic arrays map the environment in real-time, anticipating hazards before they appear.</p>
            </div>
            
            <div className="glass-panel p-8 rounded-2xl border-t-4 border-t-velocity-red text-left">
              <div className="w-12 h-12 rounded-full bg-velocity-red/20 flex items-center justify-center mb-6 text-velocity-red">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              </div>
              <h4 className="text-xl font-bold uppercase mb-3">Holographic HUD</h4>
              <p className="text-gray-400 text-sm leading-relaxed">Critical telemetry is projected directly into the driver's line of sight, blending seamlessly with the road.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
