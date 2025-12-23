import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import TeamSection from '@/components/sections/TeamSection';
import ImpactSection from '@/components/sections/ImpactSection';
import NewsSection from '@/components/sections/NewsSection';
import GallerySection from '@/components/sections/GallerySection';
import GetInvolvedSection from '@/components/sections/GetInvolvedSection';
import DonateSection from '@/components/sections/DonateSection';
import LocationsSection from '@/components/sections/LocationsSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <TeamSection />
      <ImpactSection />
      <NewsSection />
      <GallerySection />
      <GetInvolvedSection />
      <DonateSection />
      <LocationsSection />
    </main>
  );
}
