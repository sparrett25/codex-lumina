// 📜 RitualModal.jsx — Scroll-only version (Liora moved to RitualPage)
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { supabase } from "@/lib/supabase";
import { useUserSync } from "@/contexts/UserSyncContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, VolumeX } from "lucide-react";

const lioraRitualWhispers = {
  Light: {
    Emergence: "You’ve stirred the light within. Let it guide your next step.",
    Integration: "All things woven in light shall find their rhythm again.",
    Awakening: "You are no longer asleep to your becoming."
  },
  Neutral: {
    Liminal: "You walk the edge where endings and beginnings meet.",
    Reflection: "In stillness, you see more clearly than ever before."
  },
  Dark: {
    Descent: "You descended into truth and did not flinch. That is strength.",
    Rebirth: "The ashes remember you. The flame greets your return."
  }
};

export default function RitualModal({ ritual, onClose }) {
  const { user, profile } = useUserSync();
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [lioraWhisper, setLioraWhisper] = useState(null);
  const audioRef = useRef(null);

  const tone = profile?.energy || "Neutral";
  const phase = ritual.phase || "Awakening";

  useEffect(() => {
    if (audioPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [audioPlaying]);

  const handleMarkComplete = async () => {
    if (!user) return;
    await supabase.from("ritual_logs").insert({
      user_id: user.id,
      ritual_id: ritual.id,
      completed_at: new Date()
    });

    const whisper = lioraRitualWhispers[tone]?.[phase] || "You have completed a sacred act.";
    setLioraWhisper(whisper);
  };

  const steps = Array.isArray(ritual.steps)
    ? ritual.steps
    : typeof ritual.steps === "string"
    ? JSON.parse(ritual.steps)
    : [];

  const validSteps = steps.filter(step => step?.content?.trim());

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black text-white overflow-y-auto px-4 py-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative w-full max-w-2xl mx-auto"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 text-white hover:text-red-500 transition"
          >
            <X size={24} />
          </button>

          {/* 🌀 Glowing Ritual Scroll Container */}
          <div className="relative bg-zinc-900 border border-white/20 rounded-2xl p-6 pt-8 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold tracking-wide text-white mb-1">
                {ritual.title}
              </h2>
              <p className="text-indigo-300 italic text-sm mb-1">{ritual.quote}</p>
              <p className="text-sm text-zinc-400 mb-3">{ritual.purpose}</p>
              <p className="text-xs uppercase tracking-widest text-zinc-500">
                Begin the Ritual
              </p>
            </div>

            {/* Whisper */}
            {lioraWhisper && (
              <div className="mt-4 p-4 rounded-lg bg-zinc-800 border border-purple-700 shadow-md text-center">
                <p className="text-purple-300 italic text-sm">
                  “{lioraWhisper}”
                </p>
              </div>
            )}

            {/* Steps */}
            <div className="space-y-6 mt-6">
              {validSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-zinc-800 border border-zinc-600 rounded-xl p-4 shadow-inner"
                >
                  <p className="text-md text-zinc-100 leading-relaxed">
                    {step.content}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Controls */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => setAudioPlaying(!audioPlaying)}
                className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-200 transition"
              >
                {audioPlaying ? <VolumeX size={18} /> : <Volume2 size={18} />}
                {audioPlaying ? "Pause Ambient Sound" : "Play Ambient Sound"}
              </button>

              {!lioraWhisper && (
                <button
                  onClick={handleMarkComplete}
                  className="bg-purple-600 px-6 py-2 rounded-lg hover:bg-purple-500 transition text-white"
                >
                  Mark Ritual Complete
                </button>
              )}
            </div>

            {ritual.sound_url && (
              <audio ref={audioRef} loop preload="auto" src={ritual.sound_url} />
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
