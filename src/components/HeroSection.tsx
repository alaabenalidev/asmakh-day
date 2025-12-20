import { motion } from "framer-motion";
import { ArrowDown, Calendar, Users, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-celebration.jpg";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background */}
      <div className="absolute inset-0 confetti-bg" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/20 animate-float" />
      <div className="absolute top-40 right-20 w-16 h-16 rounded-full bg-secondary/20 animate-float-delayed" />
      <div className="absolute bottom-40 left-20 w-12 h-12 rounded-full bg-accent/30 animate-bounce-slow" />
      <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-primary/10 animate-float" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6"
            >
              <PartyPopper className="w-4 h-4" />
              <span className="font-medium text-sm">Every Last Thursday</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
            >
              Join the{" "}
              <span className="text-gradient">Journey to Laugh</span>
              <br />
              with Al Asmakh
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0"
            >
              Monthly team building events bringing all departments together for
              fun, games, and unforgettable moments!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a href="#register">
                <Button variant="hero" size="xl">
                  Register for Next Event
                </Button>
              </a>
              <a href="#events">
                <Button variant="outline" size="xl">
                  View Schedule
                </Button>
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-8 mt-12 justify-center lg:justify-start"
            >
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="font-display text-2xl font-bold text-foreground">
                    12
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Events/Year
                </span>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Users className="w-5 h-5 text-secondary" />
                  <span className="font-display text-2xl font-bold text-foreground">
                    200+
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Participants
                </span>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <PartyPopper className="w-5 h-5 text-accent" />
                  <span className="font-display text-2xl font-bold text-foreground">
                    50+
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Prizes Won
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-3xl blur-2xl" />
              <img
                src={heroImage}
                alt="Team celebrating together at Journey to Laugh event"
                className="relative rounded-3xl shadow-2xl w-full"
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-sm">Scroll to explore</span>
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
