import StickyHeader from "@/components/StickyHeader";
import HeroSection from "@/components/HeroSection";
import SupportGrid from "@/components/SupportGrid";
import FragilitySection from "@/components/FragilitySection";
import LegacySection from "@/components/LegacySection";
import SupportWidget from "@/components/SupportWidget";
import FinalClose from "@/components/FinalClose";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <StickyHeader />
      <HeroSection />
      <SupportGrid />
      <FragilitySection />
      <LegacySection />
      <SupportWidget />
      <FinalClose />
    </div>
  );
};

export default Index;
