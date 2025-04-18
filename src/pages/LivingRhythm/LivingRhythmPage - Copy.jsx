import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUserSync } from "../../contexts/UserSyncContext";
import { supabase } from "../../lib/supabase";
import LioraVisualShell from "../../components/companion/LioraVisualShell";
import LioraWhisperRipple from "../../components/companion/LioraWhisperRipple";

const rhythmBlocks = [
  {
    id: 'morning',
    label: '🌞 Morning Alignment',
    time: '7:00 AM – 9:00 AM',
    ritual: 'Inner Breath Ritual',
    journal: 'Tone Reflection',
    prompt: 'Begin with breath — what energy flows through you today?'
  },
  {
    id: 'midday',
    label: '🌿 Midday Flow',
    time: '12:00 PM – 2:00 PM',
    ritual: 'Guided Scroll Practice',
    journal: 'Awareness Check-in',
    prompt: 'Where does stillness arise in your movement today?'
  },
  {
    id: 'evening',
    label: '🔥 Evening Integration',
    time: '8:00 PM – 10:00 PM',
    ritual: 'Gratitude Flame',
    journal: 'Sacred Closure Entry',
    prompt: 'What deserves to be honored as the day fades?' 
  }
];

export default function LivingRhythmPage() {
  const [completed, setCompleted] = useState({});
  const { profile, user } = useUserSync();

  const tone = profile?.energy || "neutral";
  const phase = profile?.phase || "Awakening";
  const archetype = profile?.archetype || "The Seeker";

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchCompletions = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from("daily_rhythm_log")
        .select("block_id")
        .eq("user_id", user.id)
        .eq("date", today);

      if (!error && data) {
        const initial = {};
        data.forEach(({ block_id }) => {
          initial[block_id] = true;
        });
        setCompleted(initial);
      }
    };

    fetchCompletions();
  }, [user]);

  const toggleComplete = async (blockId) => {
    const updated = { ...completed };

    if (completed[blockId]) {
      // Unmark: delete from Supabase
      const { error } = await supabase
        .from("daily_rhythm_log")
        .delete()
        .eq("user_id", user.id)
        .eq("date", today)
        .eq("block_id", blockId);

      if (!error) {
        delete updated[blockId];
        setCompleted(updated);
      }
    } else {
      // Mark complete: insert into Supabase
      const { error } = await supabase.from("daily_rhythm_log").insert({
        user_id: user.id,
        date: today,
        block_id: blockId,
      });

      if (!error) {
        updated[blockId] = true;
        setCompleted(updated);
      }
    }
  };

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
        <h1 className="text-3xl font-bold text-indigo-200 text-center mb-2">Living Rhythm</h1>
        <p className="text-center text-indigo-400 italic mb-6">
          Shape your day in resonance with your truth
        </p>

        {/* 🌀 Container */}
        <section className="relative bg-gradient-to-br from-indigo-900 to-zinc-900 border border-white/20 rounded-2xl p-6 pt-8 mb-10 z-0">
          {rhythmBlocks.map((block) => (
            <motion.div
              key={block.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-black/80 border border-indigo-700 rounded-xl p-5 mb-6 shadow-md backdrop-blur-md"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-indigo-300">{block.label}</h2>
                <span className="text-sm text-zinc-400">{block.time}</span>
              </div>
              <p className="text-zinc-300 mb-1">
                <strong className="text-indigo-400">Ritual:</strong> {block.ritual}
              </p>
              <p className="text-zinc-300 mb-1">
                <strong className="text-indigo-400">Journal:</strong> {block.journal}
              </p>
              <p className="italic text-sm text-amber-300 mb-4">“{block.prompt}”</p>
              <button
                onClick={() => toggleComplete(block.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  completed[block.id]
                    ? 'bg-emerald-600 hover:bg-emerald-500'
                    : 'bg-indigo-700 hover:bg-indigo-600'
                }`}
              >
                {completed[block.id] ? '✅ Completed' : 'Mark Complete'}
              </button>
            </motion.div>
          ))}

          <div className="text-center mt-8">
            <button className="text-sm text-zinc-400 hover:text-amber-400">
              + Add Custom Practice (Coming Soon)
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}