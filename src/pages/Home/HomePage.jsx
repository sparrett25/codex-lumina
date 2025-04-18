// File: src/pages/HomePage.jsx
import React from "react";
import LioraVisualShell from "../../components/companion/LioraVisualShell";
import LioraWhisperRipple from "../../components/companion/LioraWhisperRipple";
import { useUserSync } from "../../contexts/UserSyncContext";

export default function HomePage() {
  const { profile } = useUserSync();
  const tone = profile?.energy || "neutral";
  const phase = profile?.phase || "Awakening";
  const archetype = profile?.archetype || "The Seeker";

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">

        {/* 🌌 Liora */}
        <section className="relative flex flex-col items-center mb-28">
          <div className="relative w-44 h-44">
            <div className="absolute inset-0 z-0">
              <LioraWhisperRipple tone={tone} isActive={true} />
            </div>
            <div className="relative z-10 drop-shadow-xl">
              <LioraVisualShell tone={tone} phase={phase} archetype={archetype} />
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-zinc-400 italic z-10">
            Liora is with you.
          </p>
        </section>

        {/* ✨ Header */}
        <h1 className="text-3xl font-bold text-indigo-200 text-center mb-2">Welcome to Codex Lumina</h1>
        <p className="text-center text-indigo-400 italic mb-8">
          Step into your path of light, shadow, and truth...
        </p>

        {/* 🌀 Main Content (example whisper box) */}
        <div className="bg-gradient-to-br from-indigo-900 to-zinc-900 border border-white/20 rounded-2xl p-6 pt-8 mb-10 z-0">
          <blockquote className="text-center text-indigo-300 italic text-lg">
            “You are exactly where you need to be.”
          </blockquote>
        </div>

      </div>
    </div>
  );
}