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
      
      {/* Decorative Elements - Subtle and elegant */}
      <div className="absolute top-32 left-16 w-24 h-24 rounded bg-primary/5 rotate-12 animate-float" />
      <div className="absolute top-48 right-24 w-20 h-20 rounded bg-secondary/10 -rotate-6 animate-float-delayed" />
      <div className="absolute bottom-48 left-24 w-16 h-16 rounded bg-accent/10 rotate-3 animate-bounce-slow" />

      <div className="mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
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
              className="inline-flex items-center gap-2 bg-muted border border-border text-foreground px-5 py-2 rounded mb-8"
            >
              <PartyPopper className="w-4 h-4 text-secondary" />
              <span className="font-medium text-sm uppercase tracking-wider">Every Last Thursday</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 leading-tight"
            >
              Join the{" "}
              <span className="text-gradient">Journey to Laugh</span>
              <br />
              <span className="text-muted-foreground">with Al Asmakh</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              Monthly team building events bringing all departments together for
              fun, games, and unforgettable moments.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a href="#register">
                <Button variant="hero" size="xl">
                  Register Now
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
              className="flex gap-12 mt-14 justify-center lg:justify-start"
            >
              <div className="text-center lg:text-left">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-5 h-5 text-secondary" />
                  <span className="font-display text-3xl font-semibold text-foreground">
                    12
                  </span>
                </div>
                <span className="text-sm text-muted-foreground uppercase tracking-wide">
                  Events/Year
                </span>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-5 h-5 text-secondary" />
                  <span className="font-display text-3xl font-semibold text-foreground">
                    200+
                  </span>
                </div>
                <span className="text-sm text-muted-foreground uppercase tracking-wide">
                  Participants
                </span>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center gap-2 mb-1">
                  <PartyPopper className="w-5 h-5 text-secondary" />
                  <span className="font-display text-3xl font-semibold text-foreground">
                    50+
                  </span>
                </div>
                <span className="text-sm text-muted-foreground uppercase tracking-wide">
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
              <div className="absolute -inset-4 bg-gradient-to-br from-secondary/20 via-accent/10 to-transparent rounded-lg blur-2xl" />
              <img
                src={heroImage}
                alt="Team celebrating together at Journey to Laugh event"
                className="relative rounded-lg shadow-2xl w-full border border-border"
              />
            </div>
          </motion.div>
        </div>
      </div>
        {/* Scroll Indicator */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex flex-col items-center gap-2 text-muted-foreground"
            >
                <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
                <ArrowDown className="w-4 h-4" />
            </motion.div>
        </motion.div>
    </section>
  );
};

export default HeroSection;