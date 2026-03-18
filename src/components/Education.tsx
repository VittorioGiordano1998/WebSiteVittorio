"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const education = [
  {
    degree: "Bachelor's Degree in Computer Science",
    institution: "Università degli Studi di Salerno",
    location: "Salerno, Italy",
    period: "2021 — 2025",
    grade: "92/110",
    icon: "🎓",
  },
  {
    degree: "Scientific High School Diploma",
    institution: "Liceo Scientifico A. Genoino",
    location: "Cava de' Tirreni, Italy",
    period: "2012 — 2017",
    grade: null,
    icon: "📚",
  },
  {
    degree: "English B2 Certification",
    institution: "Oxford College Program",
    location: "Oxford, United Kingdom",
    period: "2014",
    grade: "B2 Level",
    icon: "🌍",
  },
];

export default function Education() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="education" ref={ref} className="py-32 relative overflow-hidden">
      <motion.div
        style={{ y: bgY }}
        className="absolute top-20 -right-10 text-[12rem] font-black text-white/[0.02] select-none leading-none pointer-events-none"
      >
        STUDY
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
            Academic Background
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Education
          </h2>
        </motion.div>

        <div className="space-y-6">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative p-8 rounded-2xl bg-card/50 border border-border hover:border-accent-light/30 hover:bg-card-hover transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="text-4xl">{edu.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">{edu.degree}</h3>
                  <p className="text-accent-light font-medium">
                    {edu.institution}
                  </p>
                  <p className="text-muted text-sm">{edu.location}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm text-muted">{edu.period}</p>
                  {edu.grade && (
                    <p className="mt-1 text-accent-light font-semibold text-lg">
                      {edu.grade}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
