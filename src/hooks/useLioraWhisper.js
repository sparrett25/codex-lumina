// File: src/hooks/useLioraWhisper.js
import { useEffect, useState } from "react";
import { getWhisperForTone } from "@/lib/liora/whispers";

export default function useLioraWhisper(tone, phase) {
  const [whisper, setWhisper] = useState(null);

  useEffect(() => {
    if (tone || phase) {
      const result = getWhisperForTone(tone, phase);
      setWhisper(result);
    }
  }, [tone, phase]);

  return whisper;
}
