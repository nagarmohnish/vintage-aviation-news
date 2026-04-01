import finalImg from "@/assets/final-flight.jpg";

const FinalClose = () => {
  const scrollToSupport = () => {
    document.getElementById("support")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      <img
        src={finalImg}
        alt="Warbird silhouette in flight at sunset"
        loading="lazy"
        width={1920}
        height={800}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, hsla(220, 25%, 8%, 0.7) 0%, hsla(220, 25%, 8%, 0.88) 100%)",
        }}
      />
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <p className="font-heading text-3xl md:text-4xl lg:text-5xl text-primary-foreground/70 leading-snug mb-2">
          This isn't a subscription.
        </p>
        <p className="font-heading text-3xl md:text-4xl lg:text-5xl text-primary-foreground leading-snug mb-10">
          It's how this continues.
        </p>
        <p className="font-body text-lg md:text-xl text-primary-foreground/60 leading-relaxed mb-2">
          If this matters to you —
        </p>
        <p className="font-body text-lg md:text-xl text-primary-foreground/80 leading-relaxed mb-14">
          this is your way to keep it alive.
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

export default FinalClose;
