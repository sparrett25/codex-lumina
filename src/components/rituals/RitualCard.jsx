import { motion } from "framer-motion";

export default function RitualCard({ ritual, userProfile, journalTags, meta, onClick }) {
  const { unlock_phase, required_tags = [] } = ritual;
  const userPhase = userProfile?.phase;
  const hasRequiredTags = required_tags?.every(tag => journalTags?.includes(tag));
  const isUnlocked = (!unlock_phase || unlock_phase === userPhase) && hasRequiredTags;

  return (
    <motion.div
      className={`relative p-5 rounded-2xl border cursor-pointer transition-all duration-300 overflow-hidden group
        ${isUnlocked
          ? "bg-zinc-900/80 border-white/20 hover:border-purple-500 hover:shadow-xl"
          : "bg-zinc-800/50 border-zinc-700 blur-[1px] cursor-not-allowed"
        }`}
      onClick={isUnlocked ? onClick : null}
      whileHover={isUnlocked ? { scale: 1.03 } : {}}
    >
      <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition mb-1">
        {ritual.title}
      </h3>
      <p className="text-sm text-zinc-400 italic mb-1">
        {ritual.phase} • {ritual.archetype}
      </p>
      <p className="text-sm text-zinc-300 mb-2 line-clamp-2">{ritual.purpose}</p>

      {meta?.lastCompleted && (
        <p className="text-xs text-zinc-500">Last used: {new Date(meta.lastCompleted).toLocaleDateString()}</p>
      )}
      {meta?.count > 0 && (
        <p className="text-xs text-zinc-500">Completed {meta.count} {meta.count === 1 ? "time" : "times"}</p>
      )}

      {!isUnlocked && (
        <div className="absolute top-2 right-2 text-xs text-red-400 font-semibold">
          🔒 Locked
        </div>
      )}
    </motion.div>
  );
}
