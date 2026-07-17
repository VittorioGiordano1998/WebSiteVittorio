"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ProfileCard from "./ProfileCard";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="about" ref={ref} className="relative py-32 overflow-hidden">
      {/* Parallax background text */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-20 -left-10 text-[12rem] font-black text-white/[0.02] select-none leading-none pointer-events-none"
      >
        ABOUT
      </motion.div>

      <motion.div style={{ opacity }} className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          {/* Left: ProfileCard */}
          <div className="flex justify-center">
            <ProfileCard
              avatarUrl="/WebSiteVittorio/profile.png"
              miniAvatarUrl="/WebSiteVittorio/mini-avatar.png"
              name="Vittorio Giordano"
              title="XR &amp; Software Developer"
              contactText="Get in Touch"
              behindGlowColor="rgba(139, 92, 246, 0.25)"
              behindGlowSize="25%"
              innerGradient="linear-gradient(145deg, rgba(109, 40, 217, 0.55) 0%, rgba(139, 92, 246, 0.27) 10%)"
              onContactClick={() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </div>

          {/* Right: description */}
          <motion.div style={{ y: y2 }}>
            <p className="text-muted leading-relaxed text-lg mb-6">
              Software developer with a passion for XR and interactive technologies.
              I design and build cross-platform applications and immersive experiences
              using Unity, with expertise spanning from low-level C++ to modern web
              development.
            </p>
            <p className="text-muted leading-relaxed text-lg mb-6">
              Currently at{" "}
              <span className="text-foreground font-medium">Youbiquo</span>,
              I create XR solutions and develop software frameworks that push the
              boundaries of how people interact with technology.
            </p>
            <p className="text-muted leading-relaxed text-lg">
              Driven by curiosity and a deep love for game development and cinematography,
              I bring a creative perspective to every technical challenge.
            </p>
          </motion.div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "92", label: "Degree Score" },
            { value: "XR", label: "Specialization" },
            { value: "5+", label: "Languages" },
            { value: "B2", label: "English Level" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent-light">
                {stat.value}
              </div>
              <div className="text-muted text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
