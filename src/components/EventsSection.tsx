import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const getNextLastThursdays = () => {
  const events = [];
  const now = new Date();
  
  for (let i = 0; i < 6; i++) {
    const month = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0);
    const lastThursday = new Date(lastDay);
    
    const dayOfWeek = lastDay.getDay();
    const diff = (dayOfWeek + 7 - 2) % 7;
    lastThursday.setDate(lastDay.getDate() - diff);
    
    events.push({
      date: lastThursday,
      month: lastThursday.toLocaleDateString("en-US", { month: "long" }),
      day: lastThursday.getDate(),
      year: lastThursday.getFullYear(),
      isPast: lastThursday < now,
      isNext: i === 0 && lastThursday >= now,
    });
  }
  
  return events.filter(e => !e.isPast || e.isNext);
};

const EventsSection = () => {
  const events = getNextLastThursdays();

  return (
    <section id="events" className="py-20 md:py-32">
      <div className=" mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            Event Calendar
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Upcoming <span className="text-secondary">Journey Dates</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Mark your calendars! Join us every last Tuesday of the month for an
            unforgettable experience.
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={`${event.month}-${event.year}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative rounded-sm overflow-hidden ${
                event.isNext
                  ? "bg-gradient-to-br from-primary to-coral-dark text-primary-foreground"
                  : "bg-card border-2 border-border"
              }`}
            >
              {event.isNext && (
                <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold">
                  NEXT EVENT
                </div>
              )}
              
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div
                    className={`text-center p-4 rounded-2xl ${
                      event.isNext
                        ? "bg-primary-foreground/20"
                        : "bg-primary/10"
                    }`}
                  >
                    <span
                      className={`font-display text-3xl font-bold ${
                        event.isNext ? "text-primary-foreground" : "text-primary"
                      }`}
                    >
                      {event.day}
                    </span>
                  </div>
                  <div>
                    <h3
                      className={`font-display text-xl font-bold mb-1 ${
                        event.isNext ? "text-primary-foreground" : "text-foreground"
                      }`}
                    >
                      {event.month} {event.year}
                    </h3>
                    <div
                      className={`flex items-center gap-2 text-sm ${
                        event.isNext
                          ? "text-primary-foreground/80"
                          : "text-muted-foreground"
                      }`}
                    >
                      <Clock className="w-4 h-4" />
                      <span>4:00 PM - 7:00 PM</span>
                    </div>
                  </div>
                </div>

                <div
                  className={`mt-6 space-y-3 ${
                    event.isNext
                      ? "text-primary-foreground/80"
                      : "text-muted-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>Al Asmakh Real Estate HQ</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 flex-shrink-0" />
                    <span>All departments welcome</span>
                  </div>
                </div>

                <Button
                  variant={event.isNext ? "accent" : "outline"}
                  className="w-full mt-6"
                >
                  {event.isNext ? "Register Now" : "Set Reminder"}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
