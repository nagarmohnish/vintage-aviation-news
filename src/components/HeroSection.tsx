import heroImage from "@/assets/hero-warbird.jpg";

const HeroSection = () => {
  const scrollToSupport = () => {
    document.getElementById("support")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <img
        src={heroImage}
        alt="P-51 Mustang warbird in flight at golden hour"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--hero-overlay)" }}
      />
      <div className="absolute inset-0 mix-blend-overlay opacity-[0.08]"
        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')" }}
      />
      <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
        <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-primary-foreground leading-tight tracking-tight mb-8">
          Keep aviation history alive.
        </h1>
        <p className="font-body text-xl md:text-2xl text-primary-foreground/80 leading-relaxed max-w-2xl mx-auto mb-12">
          Support the stories, the people, and the warbirds that still fly
          — because they don't preserve themselves.
        </p>
        <button
          onClick={scrollToSupport}
          className="inline-block font-body text-base md:text-lg font-medium tracking-wide px-10 py-5 bg-accent text-accent-foreground rounded-sm hover:opacity-90 transition-opacity duration-200"
        >
          Become a Supporter
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
