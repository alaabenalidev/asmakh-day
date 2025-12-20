import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EventsSection from "@/components/EventsSection";
import GamesSection from "@/components/GamesSection";
import PrizesSection from "@/components/PrizesSection";
import RegistrationSection from "@/components/RegistrationSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <GamesSection />
      <PrizesSection />
      <RegistrationSection />
      <Footer />
    </main>
  );
};

export default Index;
