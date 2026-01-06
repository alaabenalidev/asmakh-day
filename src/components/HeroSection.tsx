"use client"

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Calendar, Users, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { FloatingShapes, CircleShape, SquareShape, TriangleShape, StarShape, DonutShape, ZigzagLine } from "@/components/AbstractShapes";
import Image from "next/image";

const HeroSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section
            ref={sectionRef}
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 section-shapes"
        >
            {/* Playful Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted shape-circles" />

            {/* Abstract Floating Shapes */}
            <FloatingShapes />

            {/* Additional Decorative Shapes */}
            <motion.div style={{ y: backgroundY }} className="absolute top-20 left-[10%]">
                <CircleShape size={80} color="primary" className="opacity-20 blur-sm" animate />
            </motion.div>
            <motion.div style={{ y: backgroundY }} className="absolute bottom-32 right-[15%]">
                <DonutShape size={100} color="secondary" strokeWidth={6} className="opacity-25" animate />
            </motion.div>
            <motion.div style={{ y: backgroundY }} className="absolute top-40 right-[20%]">
                <SquareShape size={40} color="fun-yellow" rounded={8} className="opacity-30" animate />
            </motion.div>
            <motion.div style={{ y: backgroundY }} className="absolute bottom-48 left-[20%]">
                <TriangleShape size={50} color="accent" className="opacity-25" animate />
            </motion.div>
            <motion.div style={{ y: backgroundY }} className="absolute top-[60%] right-[8%]">
                <StarShape size={36} color="fun-pink" className="opacity-35" animate />
            </motion.div>

            {/* Zigzag Lines */}
            <div className="absolute top-[30%] left-0 opacity-20">
                <ZigzagLine width={150} color="primary" animate />
            </div>
            <div className="absolute bottom-[25%] right-0 opacity-15 rotate-180">
                <ZigzagLine width={120} color="secondary" animate />
            </div>

            {/* Floating Fun Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className={`absolute w-3 h-3 rounded-full ${
                            i % 4 === 0 ? 'bg-primary' :
                                i % 4 === 1 ? 'bg-secondary' :
                                    i % 4 === 2 ? 'bg-accent' : 'bg-fun-yellow'
                        }`}
                        style={{
                            left: `${5 + i * 8}%`,
                            top: `${10 + (i % 5) * 18}%`,
                            opacity: 0.3,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 3 + i * 0.3,
                            repeat: Infinity,
                            delay: i * 0.2,
                        }}
                    />
                ))}
            </div>

            <div className="mx-auto px-6 lg:px-12 relative z-10 w-screen">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Text Content */}
                    <motion.div
                        style={{ y: textY, opacity }}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center lg:text-left"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 dark:bg-white/10 backdrop-blur-xl border border-white/30 dark:border-white/10 mb-8"
                        >
                            <PartyPopper className="w-4 h-4 text-secondary" />
                            <span className="font-medium text-sm">Every Last Tuesday</span>
                        </motion.div>

                        {/* Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
                        >
                            Join the{" "}
                            <span className="text-gradient-accent">Journey to Laugh</span>
                            <br />
                            <div className="capitalize text-muted-foreground font-normal mt-8">with Al Asmakh</div>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed"
                        >
                            Monthly team building events bringing all departments together for
                            fun, games, and unforgettable moments.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        >
                            <a href="#register">
                                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                                    Register Now
                                </Button>
                            </a>
                            <a href="#events">
                                <Button variant="glass" size="xl" className="w-full sm:w-auto">
                                    View Schedule
                                </Button>
                            </a>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex gap-8 md:gap-12 mt-14 justify-center lg:justify-start"
                        >
                            {[
                                { icon: Calendar, value: "12", label: "Events/Year" },
                                { icon: Users, value: "200+", label: "Participants" },
                                { icon: PartyPopper, value: "50+", label: "Prizes Won" },
                            ].map((stat) => (
                                <div key={stat.label} className="text-center lg:text-left">
                                    <div className="flex items-center gap-2 mb-1 justify-center lg:justify-start">
                                        <stat.icon className="w-5 h-5 text-secondary" />
                                        <span className="font-display text-3xl font-bold text-foreground">
                      {stat.value}
                    </span>
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                    {stat.label}
                  </span>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Hero Image with Glass Frame */}
                    <motion.div
                        style={{ y: imageY }}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="relative"
                    >
                        {/* Glow Effect Behind */}
                        <div className="absolute -inset-8 bg-gradient-to-br from-secondary/30 via-accent/20 to-transparent rounded-[3rem] blur-3xl" />

                        {/* Glass Frame */}
                        <div className="relative p-3 rounded-[2rem] bg-white/40 dark:bg-white/10 backdrop-blur-xl border border-white/40 dark:border-white/20 shadow-[0_20px_60px_hsl(220_70%_15%/0.15)]">
                            <Image
                                src={"/assets/images/events/main3.jpg"}
                                width={1000}
                                height={1000}
                                alt="Team celebrating together at Journey to Laugh event"
                                className="relative rounded-[1.5rem] w-full shadow-lg aspect-video object-cover"
                            />

                            {/* Floating Badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.8 }}
                                className="absolute -bottom-6 -left-6 px-6 py-4 rounded-2xl bg-white/80 dark:bg-navy-dark/80 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-lg"
                            >
                                <p className="text-sm font-medium text-muted-foreground">Next Event</p>
                                <p className="text-lg font-bold text-foreground">Jan 27, 2026</p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex flex-col items-center gap-2"
                >
          <span className="text-xs text-muted-foreground tracking-widest uppercase">
            Scroll to explore
          </span>
                    <div className="w-10 h-10 rounded-full bg-white/60 dark:bg-white/10 backdrop-blur-xl border border-white/30 dark:border-white/10 flex items-center justify-center">
                        <ArrowDown className="w-4 h-4 text-foreground" />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default HeroSection;
