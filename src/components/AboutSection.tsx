import { motion } from "framer-motion";
import { Heart, Users, Target, Lightbulb } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Build Connections",
    description:
      "Strengthen bonds between departments and create lasting friendships across the organization.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Users,
    title: "Team Spirit",
    description:
      "Foster collaboration and unity through fun activities that bring everyone together.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: Target,
    title: "Win Prizes",
    description:
      "Compete in exciting games for a chance to win amazing rewards and recognition.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Lightbulb,
    title: "Create Memories",
    description:
      "Experience unforgettable moments that you'll talk about for years to come.",
    color: "bg-coral/10 text-coral",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-4">
            About the Event
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            More Than Just a <span className="text-primary">Team Event</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Every last Thursday of the month, Al Asmakh Real Estate transforms
            into a celebration of teamwork, laughter, and friendly competition.
            It's our way of saying thank you to our amazing team!
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card-festive text-center group cursor-pointer"
            >
              <div
                className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Video/Image Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 relative rounded-3xl overflow-hidden"
        >
          <div className="aspect-video bg-gradient-to-r from-primary via-secondary to-accent opacity-10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mx-auto mb-4 animate-pulse-glow cursor-pointer hover:scale-110 transition-transform">
                <svg
                  className="w-8 h-8 text-primary-foreground ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-muted-foreground font-medium">
                Watch highlights from our previous events
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
