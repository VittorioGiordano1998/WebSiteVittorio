"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Languages",
    skills: [
      { name: "C#", level: 95 },
      { name: "Java", level: 90 },
      { name: "HTML/CSS", level: 80},
      { name: "Markdown", level: 80},
      { name: "Typescript", level: 80},
      { name: "SQL", level: 75 },
      { name: "JavaScript", level: 70 },
      { name: "Python", level: 70 },
      { name: "C++", level: 60 },
    ],
  },
  {
    title: "Tools & Technologies",
    skills: [
      { name: "Git", level: 95 },
      { name: "XML / JSON", level: 95 },
      { name: "OpenXR", level: 90 },
      { name: "Snapdragon Spaces SDK", level: 90 },
      { name: "Docmost", level: 90 },
      { name: "UML", level: 80 },
      { name: "MySQL", level: 80 },
      { name: "JDBC", level: 75 },
    ],
  },
  {
    title: "Frameworks & Engines",
    skills: [
      { name: "Unity", level: 95 },
      { name: "Visual Studio Code", level: 90 },
      { name: "Visual Studio Community", level: 90 },
      { name: "Blender", level: 75 },
      { name: "Android Studio", level: 70 },
      { name: "Java EE", level: 70 },
    ],
  },
  {
    title: "AI & Prompt Engineering",
    skills: [
      { name: "Prompt Engineering", level: 90 },
      { name: "ChatGPT / OpenAI", level: 90 },
      { name: "Claude / Anthropic", level: 90 },
      { name: "GitHub Copilot", level: 85 },
      { name: "Gemini / Google AI", level: 80 },
      { name: "AI-Assisted Development", level: 90 },
    ],
  },
  {
    title: "Soft Skills",
    skills: [
      { name: "Team Collaboration", level: 95 },
      { name: "Time Management", level: 90 },
      { name: "Problem Solving", level: 90 },
      { name: "Communication", level: 90 },
      { name: "Leadership", level: 80 },
    ],
  },
];

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="skills" ref={ref} className="py-32 relative overflow-hidden">
      <motion.div
        style={{ y: bgY }}
        className="absolute top-20 -left-10 text-[12rem] font-black text-white/[0.02] select-none leading-none pointer-events-none"
      >
        SKILLS
      </motion.div>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-accent-light font-mono text-sm tracking-wider uppercase mb-3">
            What I Work With
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Skills & Tools
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {skillCategories.map((category, ci) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: ci * 0.1 }}
              className="p-6 rounded-2xl bg-card/50 border border-border"
            >
              <h3 className="text-lg font-semibold mb-6">{category.title}</h3>
              <div className="space-y-5">
                {category.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-muted font-mono">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: ci * 0.1 + si * 0.05,
                          ease: "easeOut",
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-accent to-accent-light"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
