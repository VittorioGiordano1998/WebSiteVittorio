"use client";

import { useEffect, useState } from "react";
import GlassSurface from "./GlassSurface";

export default function CursorGlass() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch("ontouchstart" in window);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const style = document.createElement("style");
    style.id = "cursor-glass-style";
    style.textContent = "*, *::before, *::after { cursor: none !important; }";
    document.head.appendChild(style);

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      document.getElementById("cursor-glass-style")?.remove();
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [isTouch]);

  if (isTouch) return null;

  const size = 40;

  return (
    <div
      style={{
        position: "fixed",
        left: pos.x - size / 2,
        top: pos.y - size / 2,
        width: size,
        height: size,
        pointerEvents: "none",
        zIndex: 9998,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.15s ease",
      }}
    >
      <GlassSurface
        width="100%"
        height="100%"
        borderRadius={size / 2}
        borderWidth={0.04}
        brightness={60}
        opacity={0.6}
        blur={8}
        displace={0.5}
        distortionScale={-120}
        redOffset={0}
        greenOffset={8}
        blueOffset={16}
        backgroundOpacity={0}
        saturation={1.2}
        mixBlendMode="difference"
        xChannel="R"
        yChannel="G"
      />
    </div>
  );
}
