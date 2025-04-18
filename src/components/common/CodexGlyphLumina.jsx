// 📁 src/components/CodexGlyphLumina.jsx
// A reusable glowing glyph component for Codex Lumina

import React from "react";
import Lottie from "lottie-react";
import glyphAnimation from "../assets/lottie/codex-glyph-lumina.json";

export default function CodexGlyphLumina({ size = 200, speed = 1, loop = true, className = "" }) {
  return (
    <div
      className={`flex items-center justify-center pointer-events-none ${className}`}
      style={{ width: size, height: size }}
    >
      <Lottie
        animationData={glyphAnimation}
        loop={loop}
        autoplay
        style={{ width: "100%", height: "100%" }}
        speed={speed}
      />
    </div>
  );
}
