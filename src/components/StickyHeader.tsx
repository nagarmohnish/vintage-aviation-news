import { useState, useEffect } from "react";
import vanLogo from "@/assets/van-logo.png";

const StickyHeader = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSupport = () => {
    document.getElementById("support")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-full pointer-events-none"
      }`}
    >
      <div className="bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-2 flex items-center justify-between">
          <img
            src={vanLogo}
            alt="Vintage Aviation News"
            className="h-10 md:h-12 w-auto"
          />
          <button
            onClick={scrollToSupport}
            className="font-body text-sm md:text-base font-medium px-5 py-2 bg-accent text-accent-foreground rounded-sm hover:opacity-90 transition-opacity duration-200"
          >
            Become a Supporter
          </button>
        </div>
      </div>
    </header>
  );
};

export default StickyHeader;
