import React, { useState } from "react";
import { supabase } from "../../lib/supabase";
import { Eye, EyeOff } from "lucide-react";
import Lottie from "lottie-react";
import glyphGlow from "@/assets/lottie/codex-glyph-glow.json";
import PortalLayout from "../../layouts/shells/PortalLayout";

export default function PortalSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      location.reload(); // ✅ Reloads to sync Supabase session with UserSyncContext
    }
  };

  return (
    <PortalLayout
      title="Return to the Codex"
      subtitle="Welcome back, traveler. Enter your credentials to resume the journey."
      showGlyph={false}
    >
      <div className="flex flex-col space-y-6 items-center">

        {/* 🌌 Glowing sigil */}
        <div className="relative w-20 h-20 mb-2">
          <Lottie
            animationData={glyphGlow}
            loop
            className="absolute inset-0 w-full h-full opacity-90 z-0"
          />
          <img
            src="/assets/glyphs/codex-sigil.svg"
            alt="Codex Glyph"
            className="relative z-10 w-full h-full"
          />
        </div>

        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/90 text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 pr-10 rounded-xl bg-white/90 text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600 hover:text-gray-800"
            aria-label="Toggle password visibility"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {errorMsg && <p className="text-sm text-red-400 mt-2">{errorMsg}</p>}

        <button
          onClick={handleSignIn}
          disabled={loading}
          className={`w-full px-6 py-3 rounded-xl font-bold transition-all ${
            loading
              ? "bg-indigo-400 cursor-wait"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          {loading ? "Entering..." : "Enter the Codex"}
        </button>

        <p className="text-sm text-indigo-400 mt-4">
          Not yet initiated?{" "}
          <a href="/create-account" className="underline hover:text-white">
            Request Access
          </a>
        </p>
      </div>
    </PortalLayout>
  );
}
