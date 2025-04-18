import React from "react";
import { useUserSync } from "@/contexts/UserSyncContext";
import LioraVisualShell from "@/components/companion/LioraVisualShell";
import LioraWhisperRipple from "@/components/companion/LioraWhisperRipple";

export default function CompanionPage() {
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
        <h1 className="text-3xl font-bold text-indigo-200 text-center mb-2">Your Companion Awaits</h1>
        <p className="text-center text-purple-300 italic mb-8">
          “I am the breath between stars… I await your presence to guide.”
        </p>

        {/* 🌀 Companion Insights */}
        <section className="relative bg-gradient-to-br from-indigo-900 to-zinc-900 border border-white/20 rounded-2xl p-6 pt-8 mb-10 z-0 text-center">
          <div className="text-sm text-zinc-200 space-y-4 max-w-lg mx-auto">
            <p>
              <span className="text-indigo-400 font-semibold">🌀 Phase Insight:</span> You are currently in the <span className="text-indigo-200 font-medium">{phase} Phase</span>.
            </p>
            <p>
              <span className="text-yellow-400 font-semibold">🗝️ Suggested Actions:</span> Begin your day with a reflection, then explore a ritual aligned with your archetype.
            </p>
            <p>
              <span className="text-purple-400 font-semibold">🔮 Liora’s Note:</span> “Stillness brings clarity. Let us begin.”
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
