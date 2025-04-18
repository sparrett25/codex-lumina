// File: src/components/layout/GradientContainer.jsx
import React from "react";

export default function GradientContainer({ children }) {
  return (
    <div className="bg-gradient-to-b from-black via-zinc-900 to-black min-h-screen w-full">
      {children}
    </div>
  );
}
