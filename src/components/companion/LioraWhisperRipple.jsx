import React from "react";
import clsx from "clsx";

export default function LioraWhisperRipple({ tone = "neutral", isActive = false }) {
  const rippleColors = {
    light: "from-cyan-400 via-blue-500 to-indigo-600",
    dark: "from-purple-700 via-indigo-800 to-black",
    neutral: "from-indigo-600 via-purple-700 to-indigo-900",
  };

  return (
    <div className="relative w-48 h-48">
      <div
        className={clsx(
          "absolute inset-0 rounded-full blur-3xl opacity-70",
          "bg-gradient-to-br transition-all duration-500",
          rippleColors[tone.toLowerCase()] || rippleColors.neutral,
          isActive ? "animate-pulse scale-105" : "opacity-40 scale-100"
        )}
      />
    </div>
  );
}
