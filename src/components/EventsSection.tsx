"use client"

import {motion} from "framer-motion";
import {Clock, MapPin, Users} from "lucide-react";
import {Button} from "@/components/ui/button";

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
            month: lastThursday.toLocaleDateString("en-US", {month: "long"}),
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
                    initial={{opacity: 0, y: 30}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.6}}
                    className="text-center max-w-5xl mx-auto mb-16"
                >
          <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            Event Calendar
          </span>
                    <h2 className="font-display text-3xl md:text-4xl lg:text-7xl font-bold text-foreground mb-6">
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
                            initial={{opacity: 0, y: 30}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{duration: 0.6, delay: index * 0.1}}
                            className={`relative rounded-sm overflow-hidden ${
                                event.isNext
                                    ? "bg-gradient-to-br from-primary to-coral-dark text-primary-foreground"
                                    : "bg-card border-2 border-[#ccff00]"
                            }`}
                        >
                            {event.isNext && (
                                <div
                                    className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold">
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
                                            <Clock className="w-4 h-4"/>
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
                                        <MapPin className="w-4 h-4 flex-shrink-0"/>
                                        <span>Al Asmakh Real Estate HQ</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Users className="w-4 h-4 flex-shrink-0"/>
                                        <span>All departments welcome</span>
                                    </div>
                                </div>
                                <Button variant={"outline-glass"} className={`p-0 m-0 mt-4 border-none`}>
                                    <a className={`button-animation cta ${event.isNext ? "bg-[#6225E6]" : "bg-[#e0e0e0] text-black"}`} href="#">
                                        <span className={`uppercase ${event.isNext ? "text-white" : "text-black"}`} >{event.isNext ? "Register Now" : "Set Reminder"}</span>
                                        <span>
      <svg width="66px" height="43px" viewBox="0 0 66 43" version="1.1" xmlns="http://www.w3.org/2000/svg"
      >
        <g id="arrow" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <path className="one"
                d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z"
                fill="#FFFFFF"></path>
          <path className="two"
                d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z"
                fill="#FFFFFF"></path>
          <path className="three"
                d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z"
                fill="#FFFFFF"></path>
        </g>
      </svg>
    </span>
                                    </a>
                                </Button>

                                {/*<Button*/}
                                {/*    variant={event.isNext ? "accent" : "outline"}*/}
                                {/*    className="w-full mt-6"*/}
                                {/*>*/}
                                {/*    {event.isNext ? "Register Now" : "Set Reminder"}*/}
                                {/*</Button>*/}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EventsSection;
