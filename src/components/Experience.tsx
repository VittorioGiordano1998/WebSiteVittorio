"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SpotlightCard from "./SpotlightCard";

const experiences = [
  {
    role: "Junior Software Developer",
    company: "Youbiquo",
    period: "Aug 2025 — Present",
    description:
      "Developing cross-platform applications and XR experiences using Unity. Building software solutions in C#, C++, Python, and web technologies with a focus on scalability, performance, and code quality.",
    tags: ["Unity", "C#", "C++", "Python", "XR", "Web"],
    current: true,
  },
  {
    role: "XR Intern",
    company: "Youbiquo",
    period: "2024 — 2025",
    description:
      "Research and preliminary development of Hand Tracking techniques for XR applications. Explored cutting-edge interaction paradigms for immersive environments.",
    tags: ["Hand Tracking", "XR", "R&D", "Unity"],
    current: false,
  },
];

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="experience" ref={ref} className="py-32 relative overflow-hidden">
      <motion.div
        style={{ y: bgY }}
        className="absolute top-20 -right-10 text-[12rem] font-black text-white/[0.02] select-none leading-none pointer-events-none"
      >
        CAREER
      </motion.div>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-accent-light font-mono text-sm tracking-wider uppercase mb-3">
            Career Path
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Experience
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[7px] md:left-[11px] top-0 bottom-0 w-px bg-gradient-to-b from-accent-light/50 via-accent/30 to-transparent" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative pl-10 md:pl-14"
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-0 md:left-1 top-2 w-[15px] h-[15px] md:w-[23px] md:h-[23px] rounded-full border-2 ${
                    exp.current
                      ? "border-accent-light bg-accent-light/20"
                      : "border-border bg-background"
                  }`}
                >
                  {exp.current && (
                    <div className="absolute inset-1 rounded-full bg-accent-light animate-pulse" />
                  )}
                </div>

                <SpotlightCard>
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold">{exp.role}</h3>
                        <p className="text-accent-light font-medium">
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-muted text-sm font-mono mt-1 md:mt-0">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-muted leading-relaxed mb-4">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-mono bg-accent/10 text-accent-light rounded-full border border-accent/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
