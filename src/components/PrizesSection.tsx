import { motion } from "framer-motion";
import { Gift, Crown, Medal, Award } from "lucide-react";

const prizes = [
  {
    icon: Crown,
    place: "Grand Prize",
    prize: "Weekend Staycation",
    description: "Luxury hotel stay for 2 with dinner included",
    color: "from-golden to-accent",
    iconBg: "bg-accent/20 text-accent",
  },
  {
    icon: Medal,
    place: "2nd Place",
    prize: "500 QAR Shopping Voucher",
    description: "Valid at any major mall in Qatar",
    color: "from-secondary to-teal-dark",
    iconBg: "bg-secondary/20 text-secondary",
  },
  {
    icon: Award,
    place: "3rd Place",
    prize: "Tech Gadget Bundle",
    description: "Wireless earbuds + power bank combo",
    color: "from-primary to-coral-dark",
    iconBg: "bg-primary/20 text-primary",
  },
];

const additionalPrizes = [
  "Coffee shop gift cards",
  "Movie tickets for family",
  "Spa & wellness vouchers",
  "Restaurant dining experiences",
  "Electronic accessories",
  "And many more surprises!",
];

const PrizesSection = () => {
  return (
    <section id="prizes" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block bg-golden/20 text-golden-dark px-4 py-2 rounded-full text-sm font-medium mb-4">
            Rewards & Recognition
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Amazing <span className="text-accent">Prizes</span> Await
          </h2>
          <p className="text-lg text-muted-foreground">
            Every month we give away incredible prizes to our lucky winners.
            Play games, participate in events, and enter the draw!
          </p>
        </motion.div>

        {/* Main Prizes */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {prizes.map((prize, index) => (
            <motion.div
              key={prize.place}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative overflow-hidden rounded-3xl p-8 text-center ${
                index === 0 ? "md:order-2 md:scale-105" : ""
              }`}
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${prize.color} opacity-10`}
              />
              
              <div className="relative z-10">
                <div
                  className={`w-20 h-20 rounded-2xl ${prize.iconBg} flex items-center justify-center mx-auto mb-6`}
                >
                  <prize.icon className="w-10 h-10" />
                </div>
                
                <span className="inline-block bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm font-medium mb-3">
                  {prize.place}
                </span>
                
                <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                  {prize.prize}
                </h3>
                
                <p className="text-muted-foreground">{prize.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Prizes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card-festive max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Gift className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground">
              Plus Many More Prizes
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {additionalPrizes.map((prize, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                <span className="text-sm">{prize}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PrizesSection;
