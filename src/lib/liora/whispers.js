// File: src/lib/liora/whispers.js
export function getWhisperForTone(tone, phase) {
  const whispers = {
    Light: ["You are the dawn within your own becoming."],
    Dark: ["Even shadows cradle seeds of becoming."],
    Neutral: ["Stillness is not silence. It is listening."],
  };

  return whispers[tone] || whispers[phase] || "You are walking a beautiful unknown.";
}
