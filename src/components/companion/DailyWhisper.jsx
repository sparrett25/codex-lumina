import React from "react";

const whispers = {
  neutral: [
    "You are exactly where you need to be.",
    "Stillness reveals the next step.",
    "Balance is not a destination — it's a rhythm."
  ],
  light: [
    "Shine gently, and the world responds in kind.",
    "You carry the dawn within you.",
    "Your light awakens hidden pathways."
  ],
  dark: [
    "Within shadow, truth is waiting.",
    "Descent is not defeat — it is initiation.",
    "You are not lost; you are becoming."
  ]
};

export default function DailyWhisper({ tone = "neutral", phase = "Awakening", archetype = "The Seeker" }) {
  const options = whispers[tone] || whispers["neutral"];
  const randomWhisper = options[Math.floor(Math.random() * options.length)];

  return (
    <div className="text-center text-indigo-300 italic text-lg">
      “{randomWhisper}”
    </div>
  );
}
