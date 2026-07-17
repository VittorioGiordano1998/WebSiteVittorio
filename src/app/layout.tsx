import type { Metadata } from "next";
import "./globals.css";
import DarkVeil from "@/components/DarkVeil";

export const metadata: Metadata = {
  title: "Vittorio Giordano — Software Developer",
  description:
    "XR & Software Developer specializing in Unity, C#, Java, C++, and web technologies.",
  icons: "/favicon.svg",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="fixed inset-0 z-0">
          <DarkVeil
            hueShift={270}
            noiseIntensity={0.05}
            scanlineIntensity={0.3}
            speed={0.4}
            scanlineFrequency={0}
            warpAmount={0}
            resolutionScale={1}
          />
        </div>
        <div className="grain" />
        {children}
      </body>
    </html>
  );
}
