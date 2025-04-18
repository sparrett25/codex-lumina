import React from "react";
import LioraVisualShell from "../../components/companion/LioraVisualShell";

export default function CompanionPage() {
  const tone = "peace";
  const phase = "Awakening";
  const archetype = "The Seeker";
  const isSpeaking = true;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto rounded-3xl border border-white/20 shadow-2xl p-8 bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
        <h1 className="text-3xl font-bold text-center text-indigo-200 mb-2">
          ✧ Your Companion Awaits ✧
        </h1>
        <p className="text-center text-purple-300 italic mb-6">
          “I am the breath between stars… I await your presence to guide.”
        </p>

        {/* 🔮 Liora Avatar */}
        <div className="flex justify-center my-8">
          <LioraVisualShell
            tone={tone}
            phase={phase}
            archetype={archetype}
          />
        </div>

        {/* 📜 Guidance Content */}
        <div className="text-sm text-zinc-200 space-y-4 text-center max-w-lg mx-auto">
          <p>
            <span className="text-indigo-400 font-semibold">🌀 Phase Insight:</span>{" "}
            You are currently in the{" "}
            <span className="text-indigo-200 font-medium">{phase} Phase</span>.
          </p>
          <p>
            <span className="text-yellow-400 font-semibold">🗝️ Suggested Actions:</span>{" "}
            Begin your day with a reflection, then explore a ritual aligned with your archetype.
          </p>
          <p>
            <span className="text-purple-400 font-semibold">🔮 Liora’s Note:</span>{" "}
            “Stillness brings clarity. Let us begin.”
          </p>
        </div>
      </div>
    </div>
  );
}
