import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EventsSection from "@/components/EventsSection";
import GamesSection from "@/components/GamesSection";
import GallerySection from "@/components/GallerySection";
import LeaderboardSection from "@/components/LeaderboardSection";
import PrizesSection from "@/components/PrizesSection";
import RegistrationSection from "@/components/RegistrationSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <GamesSection />
      <GallerySection />
      <LeaderboardSection />
      <PrizesSection />
      <RegistrationSection />
      <Footer />
    </main>
  );
}
