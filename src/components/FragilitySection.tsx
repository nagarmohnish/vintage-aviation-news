import fragilityImg from "@/assets/fragility.jpg";

const FragilitySection = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={fragilityImg}
          alt="Worn aircraft metal surface showing age and patina"
          loading="lazy"
          width={1920}
          height={800}
          className="w-full h-full object-cover opacity-20 saturate-50"
        />
        <div className="absolute inset-0 bg-primary/90" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="max-w-xl">
          <p className="font-heading text-3xl md:text-4xl lg:text-5xl text-primary-foreground leading-snug mb-6">
            These aircraft won't last forever.
          </p>
          <p className="font-heading text-3xl md:text-4xl lg:text-5xl text-primary-foreground/70 leading-snug mb-10">
            Neither will the knowledge around them.
          </p>
          <p className="font-body text-lg md:text-xl text-accent font-medium">
            Without support, this fades.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FragilitySection;
