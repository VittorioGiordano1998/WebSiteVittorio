"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SpotlightCard from "./SpotlightCard";

const projects = [
  {
    title: "XR Hand Tracking System",
    description:
      "Research and development of advanced hand tracking techniques for XR environments, enabling natural gesture-based interaction.",
    tags: ["Unity", "XR", "C#", "Computer Vision"],
    gradient: "from-purple-500/20 to-blue-500/20",
  },
  {
    title: "Cross-Platform App Framework",
    description:
      "Multi-platform software framework supporting scalable application deployment across desktop and mobile environments.",
    tags: ["C++", "C#", "Cross-Platform", "Architecture"],
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Immersive XR Experiences",
    description:
      "Design and development of immersive mixed reality experiences combining 3D environments with real-world interaction.",
    tags: ["Unity", "Mixed Reality", "3D", "UX"],
    gradient: "from-cyan-500/20 to-emerald-500/20",
  },
  {
    title: "Web Application Platform",
    description:
      "Full-stack web application built with modern technologies, featuring responsive design and database integration.",
    tags: ["JavaScript", "JSP", "MySQL", "JDBC"],
    gradient: "from-emerald-500/20 to-yellow-500/20",
  },
  {
    title: "Game Development Projects",
    description:
      "Personal game development projects exploring interactive storytelling, physics systems, and procedural generation.",
    tags: ["Unity", "C#", "Game Design", "Shaders"],
    gradient: "from-yellow-500/20 to-orange-500/20",
  },
  {
    title: "Desktop Windows Applications",
    description:
      "Native Windows desktop applications focused on performance, clean architecture, and excellent user experience.",
    tags: ["C#", "C++", ".NET", "Windows"],
    gradient: "from-orange-500/20 to-red-500/20",
  },
];

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="projects" ref={ref} className="py-32 relative overflow-hidden">
      <motion.div
        style={{ y: bgY }}
        className="absolute top-20 -left-10 text-[12rem] font-black text-white/[0.02] select-none leading-none pointer-events-none"
      >
        WORKS
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
            Selected Work
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Projects
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <SpotlightCard>
                {/* Gradient top bar */}
                <div
                  className={`h-1 w-full bg-gradient-to-r ${project.gradient}`}
                />

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold leading-tight">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-muted text-sm leading-relaxed mb-5">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono text-muted bg-white/5 px-2.5 py-1 rounded-full"
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
    </section>
  );
}
