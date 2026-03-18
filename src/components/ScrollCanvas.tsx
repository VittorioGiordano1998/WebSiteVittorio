"use client";

import { useEffect, useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

function drawFrame(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  progress: number
) {
  ctx.clearRect(0, 0, width, height);

  // Dark background
  ctx.fillStyle = "#050505";
  ctx.fillRect(0, 0, width, height);

  const cx = width / 2;
  const cy = height / 2;
  const maxRadius = Math.max(width, height) * 0.6;

  // Animated particle system driven by scroll
  const particleCount = 120;
  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * Math.PI * 2 + progress * Math.PI * 4;
    const spiralFactor = (i / particleCount) * maxRadius * (0.3 + progress * 0.7);
    const wobble = Math.sin(angle * 3 + progress * 10) * 30;

    const x = cx + Math.cos(angle + progress * 2) * (spiralFactor + wobble);
    const y = cy + Math.sin(angle + progress * 2) * (spiralFactor + wobble) * 0.6;

    const size = 1 + Math.sin(progress * Math.PI + i) * 2;
    const alpha = 0.1 + (1 - i / particleCount) * 0.6;

    // Purple to blue gradient based on position
    const hue = 260 + (i / particleCount) * 40 + progress * 30;
    ctx.fillStyle = `hsla(${hue}, 80%, 65%, ${alpha})`;
    ctx.beginPath();
    ctx.arc(x, y, Math.max(0.5, size), 0, Math.PI * 2);
    ctx.fill();
  }

  // Central glowing orb
  const orbRadius = 40 + progress * 60;
  const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, orbRadius);
  gradient.addColorStop(0, `rgba(139, 92, 246, ${0.4 + progress * 0.3})`);
  gradient.addColorStop(0.5, `rgba(109, 40, 217, ${0.15 + progress * 0.1})`);
  gradient.addColorStop(1, "rgba(109, 40, 217, 0)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(cx, cy, orbRadius, 0, Math.PI * 2);
  ctx.fill();

  // Orbiting rings
  for (let r = 0; r < 3; r++) {
    const ringProgress = (progress + r * 0.33) % 1;
    const ringRadius = 80 + r * 70 + ringProgress * 40;
    ctx.strokeStyle = `rgba(139, 92, 246, ${0.08 + ringProgress * 0.12})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(
      cx,
      cy,
      ringRadius,
      ringRadius * 0.35,
      progress * Math.PI + r * 0.5,
      0,
      Math.PI * 2
    );
    ctx.stroke();
  }

  // Connection lines between nearby particles
  ctx.strokeStyle = "rgba(139, 92, 246, 0.04)";
  ctx.lineWidth = 0.5;
  const points: [number, number][] = [];
  for (let i = 0; i < 40; i++) {
    const angle = (i / 40) * Math.PI * 2 + progress * Math.PI * 4;
    const r = (i / 40) * maxRadius * (0.3 + progress * 0.7);
    const x = cx + Math.cos(angle + progress * 2) * r;
    const y = cy + Math.sin(angle + progress * 2) * r * 0.6;
    points.push([x, y]);
  }
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const dx = points[i][0] - points[j][0];
      const dy = points[i][1] - points[j][1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(points[i][0], points[i][1]);
        ctx.lineTo(points[j][0], points[j][1]);
        ctx.stroke();
      }
    }
  }
}

export default function ScrollCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const progressRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const unsubscribe = scrollYProgress.on("change", (v) => {
      progressRef.current = v;
    });

    const loop = () => {
      drawFrame(ctx, canvas.width, canvas.height, progressRef.current);
      animFrameRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener("resize", resize);
      unsubscribe();
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="h-[200vh] relative">
      <motion.div style={{ opacity }} className="sticky top-0 h-screen w-full">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
      </motion.div>
    </div>
  );
}
