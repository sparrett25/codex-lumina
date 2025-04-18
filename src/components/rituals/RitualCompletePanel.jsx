// File: src/components/rituals/RitualCompletionPanel.jsx
import React from "react";
import LioraWhisper from "@/components/companion/LioraWhisper";
import useLioraWhisper from "@/hooks/useLioraWhisper";

export default function RitualCompletionPanel({ tone, phase }) {
  const whisper = useLioraWhisper(tone, phase);

  return (
    <div className="mt-12 text-center space-y-4">
      <div className="text-indigo-300 text-xl font-bold tracking-wide">
        🌟 You have completed this sacred ritual
      </div>

      {whisper && <LioraWhisper whisper={whisper} />}
    </div>
  );
}
