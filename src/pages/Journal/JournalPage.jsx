// File: src/pages/JournalPage.jsx
import React, { useState, useEffect } from "react";
import { useUserSync } from "../../contexts/UserSyncContext";
import LioraVisualShell from "../../components/companion/LioraVisualShell";
import LioraWhisperRipple from "../../components/companion/LioraWhisperRipple";
import JournalList from "../../components/journal/JournalList";
import JournalCalendarMap from "../../components/journal/JournalCalendarMap";

export default function JournalPage() {
  const { profile: userProfile } = useUserSync();
  const [entry, setEntry] = useState("");
  const [entries, setEntries] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);

  const tone = userProfile?.energy || "neutral";
  const phase = userProfile?.phase || "Awakening";
  const archetype = userProfile?.archetype || "The Seeker";

  useEffect(() => {
    const mockEntries = JSON.parse(localStorage.getItem("codexJournal")) || [];
    setEntries(mockEntries);
  }, []);

  const handleSubmit = () => {
    if (!entry.trim()) return;
    const newEntry = {
      text: entry.trim(),
      date: new Date().toLocaleDateString(),
    };
    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem("codexJournal", JSON.stringify(updatedEntries));
    setEntry("");
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
        <h1 className="text-3xl font-bold text-indigo-200 text-center mb-2">Journal</h1>
        <p className="text-center text-indigo-400 italic mb-8">
          Write your reflection below and whisper it into the Codex...
        </p>

        {/* 📝 Journal Entry */}
        <section className="relative bg-gradient-to-br from-indigo-900 to-zinc-900 border border-white/20 rounded-2xl p-6 pt-8 mb-10 z-0">
          <textarea
            rows={6}
            placeholder="Let your thoughts flow..."
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            className="w-full bg-black text-white border border-indigo-400 rounded-lg p-4 focus:outline-none mb-4"
          />
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg transition"
          >
            Save Entry
          </button>
          <p className="text-indigo-300 italic mt-3">
            “Even a single whisper can echo through eternity...”
          </p>
        </section>

        {/* 📜 Reflections + Calendar */}
        <div className="mb-6">
          <div className="flex justify-between items-center px-2 mb-4">
            <h3 className="text-lg font-semibold text-indigo-300">Your Past Reflections</h3>
            <select className="bg-black border border-indigo-400 text-white px-2 py-1 rounded-md">
              <option>Newest</option>
              <option>Oldest</option>
            </select>
          </div>

          <JournalList entries={entries} />

          {/* Calendar Toggle */}
          <div className="text-center mt-6">
            <button
              className="text-indigo-400 text-sm underline"
              onClick={() => setShowCalendar((prev) => !prev)}
            >
              {showCalendar ? "Hide Calendar View" : "Show Calendar View"}
            </button>
          </div>

          {/* Calendar Map */}
          {showCalendar && <JournalCalendarMap entries={entries} />}
        </div>
      </div>
    </div>
  );
}
