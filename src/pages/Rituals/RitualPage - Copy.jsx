import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import RitualCard from "@/components/rituals/RitualCard";
import RitualModal from "@/components/rituals/RitualModal";
import { useUserSync } from "@/contexts/UserSyncContext";
import LioraVisualShell from "@/components/companion/LioraVisualShell";
import LioraWhisperRipple from "@/components/companion/LioraWhisperRipple";

export default function RitualPage() {
  const { profile, journalTags, user } = useUserSync();
  const [rituals, setRituals] = useState([]);
  const [ritualMeta, setRitualMeta] = useState({});
  const [selectedRitual, setSelectedRitual] = useState(null);

  useEffect(() => {
    const fetchRituals = async () => {
      const { data, error } = await supabase.from("rituals").select("*");
      if (!error) setRituals(data);
    };

    const fetchRitualLogs = async () => {
      if (!user) return;
      const { data: logs } = await supabase
        .from("ritual_logs")
        .select("ritual_id, completed_at")
        .eq("user_id", user.id);

      const meta = {};
      logs?.forEach(({ ritual_id, completed_at }) => {
        if (!meta[ritual_id]) {
          meta[ritual_id] = { lastCompleted: completed_at, count: 1 };
        } else {
          meta[ritual_id].count += 1;
          if (new Date(completed_at) > new Date(meta[ritual_id].lastCompleted)) {
            meta[ritual_id].lastCompleted = completed_at;
          }
        }
      });

      setRitualMeta(meta);
    };

    fetchRituals();
    fetchRitualLogs();
  }, [user]);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      {/* 🌌 Liora Top Presence Outside Container */}
      <div className="flex flex-col items-center mb-10">
        <div className="relative w-40 h-40">
          <div className="absolute inset-0 z-0">
            <LioraWhisperRipple tone={profile?.energy || 'neutral'} isActive={true} />
          </div>
          <div className="relative z-10 drop-shadow-xl">
            <LioraVisualShell
              tone={profile?.energy}
              phase={profile?.phase}
              archetype={profile?.archetype}
            />
          </div>
        </div>
        <p className="mt-3 text-sm text-zinc-400 italic">Liora is with you.</p>
      </div>

      <div className="max-w-7xl mx-auto bg-gradient-to-b from-indigo-900 to-zinc-900 border border-white/20 rounded-2xl p-8 relative">
        {/* 📜 Ritual Grid */}
        <h1 className="text-4xl font-bold text-center text-indigo-200 mb-8">Book of Rituals</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rituals.map((ritual) => (
            <RitualCard
              key={ritual.id}
              ritual={ritual}
              userProfile={profile}
              journalTags={journalTags}
              meta={ritualMeta[ritual.id]}
              onClick={() => setSelectedRitual(ritual)}
            />
          ))}
        </div>

        {/* 🌙 Ritual Modal */}
        {selectedRitual && (
          <RitualModal
            ritual={selectedRitual}
            onClose={() => setSelectedRitual(null)}
          />
        )}
      </div>
    </div>
  );
}
