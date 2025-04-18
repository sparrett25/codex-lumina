// File: src/components/journal/JournalEntryForm.jsx
import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import LioraWhisper from "@/components/companion/LioraWhisper";
import { getWhisperForTone } from "@/lib/liora/whispers";

export default function JournalEntryForm({ user, tone, phase }) {
  const [entryText, setEntryText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [whisper, setWhisper] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase.from("journal_entries").insert({
      user_id: user.id,
      content: entryText,
      tone,
      phase,
    });

    if (!error) {
      const generatedWhisper = getWhisperForTone(tone, phase);
      setWhisper(generatedWhisper);
      setEntryText("");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <textarea
          value={entryText}
          onChange={(e) => setEntryText(e.target.value)}
          className="w-full min-h-[120px] p-4 bg-zinc-800 text-white rounded-xl border border-zinc-700"
          placeholder="Speak your truth..."
        />
        <button
          type="submit"
          disabled={isSubmitting || !entryText.trim()}
          className="self-end bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-2 rounded-xl"
        >
          Submit Entry
        </button>
      </form>

      {/* 🌀 Whisper response */}
      {whisper && <LioraWhisper whisper={whisper} />}
    </div>
  );
}
