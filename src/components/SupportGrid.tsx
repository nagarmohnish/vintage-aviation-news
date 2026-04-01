import archiveImg from "@/assets/grid-archive.jpg";
import peopleImg from "@/assets/grid-people.jpg";
import restorationImg from "@/assets/grid-restoration.jpg";
import nextgenImg from "@/assets/grid-nextgen.jpg";

const items = [
  {
    image: archiveImg,
    alt: "Historic black and white aircraft photograph",
    title: "Stories that would otherwise disappear",
  },
  {
    image: peopleImg,
    alt: "Pilot sharing aviation stories beside a vintage aircraft",
    title: "People who've lived, flown, and restored these aircraft",
  },
  {
    image: restorationImg,
    alt: "Vintage aircraft being restored in a hangar workshop",
    title: "Projects keeping warbirds in the air",
  },
  {
    image: nextgenImg,
    alt: "Young enthusiast looking up at a warbird in a hangar",
    title: "The next generation discovering them",
  },
];

const SupportGrid = () => {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium text-foreground text-center mb-4">
          What you're supporting
        </h2>
        <div className="w-12 h-px bg-accent mx-auto mb-16" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, i) => (
            <div key={i} className="group">
              <div className="aspect-[4/3] overflow-hidden rounded-sm mb-4">
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportGrid;
