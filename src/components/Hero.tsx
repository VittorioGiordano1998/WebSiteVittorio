"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollCanvas from "./ScrollCanvas";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <section ref={ref} className="relative">
      <ScrollCanvas />

      {/* Parallax text overlay */}
      <motion.div
        style={{ y, opacity: textOpacity, scale }}
        className="absolute inset-0 h-screen flex flex-col items-center justify-center z-10 pointer-events-none top-0"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-accent-light font-mono text-sm tracking-[0.3em] uppercase mb-4"
        >
          Software Developer
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-center leading-none"
        >
          Vittorio
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-light to-purple-400">
            Giordano
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-6 text-muted text-lg md:text-xl max-w-md text-center leading-relaxed"
        >
          XR Developer &bull; Unity &bull; C# &bull; C++ &bull; Python
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-12 flex gap-4 pointer-events-auto"
        >
          <a
            href="#contact"
            className="px-8 py-3 bg-accent-light hover:bg-accent text-white text-sm font-medium rounded-full transition-colors"
          >
            Get in Touch
          </a>
          <a
            href="#projects"
            className="px-8 py-3 border border-white/20 hover:border-white/40 text-sm font-medium rounded-full transition-colors"
          >
            View Work
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center pt-1"
          >
            <div className="w-1 h-2 bg-white/40 rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
