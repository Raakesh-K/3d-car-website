import GallerySection from "@/components/GallerySection";

export default function GalleryPage() {
  return (
    <main className="w-full bg-neutral-950 text-white min-h-screen pt-20">
      <div className="pt-24 pb-8 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
          Visual <span className="text-velocity-red">Perfection</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Every angle of the Velocity X has been sculpted to slice through the air while maintaining an impossibly aggressive stance. Explore the full gallery below.
        </p>
      </div>
      
      {/* We reuse the GallerySection component but we could easily expand this 
          with more masonry grids or video features later */}
      <GallerySection />
      
    </main>
  );
}
