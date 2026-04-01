import legacyImg from "@/assets/legacy-pilot.jpg";

const LegacySection = () => {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="order-2 md:order-1">
          <p className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground leading-snug text-balance">
            Their stories are the history.
          </p>
          <p className="font-heading text-3xl md:text-4xl lg:text-5xl text-accent leading-snug mt-2">
            Help us record them.
          </p>
        </div>
        <div className="order-1 md:order-2">
          <div className="aspect-[4/3] overflow-hidden rounded-sm">
            <img
              src={legacyImg}
              alt="Veteran pilot sharing stories beside a vintage warbird"
              loading="lazy"
              width={800}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LegacySection;
