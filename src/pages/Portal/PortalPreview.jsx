import React from "react";
import { useNavigate } from "react-router-dom";

export default function PortalPreview() {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md space-y-6 text-center">
        <h1 className="text-3xl font-bold text-indigo-300">Enter Codex Lumina</h1>
        <p className="text-sm text-zinc-400">
          Choose your path. All who seek, begin through the Gate.
        </p>

        <div className="w-full space-y-4">
          <button
            onClick={() => navigate("/key-entry")}
            className="w-full py-3 rounded-full bg-green-600 hover:bg-green-700 transition-all"
          >
            🔑 Enter with a Codex Key
          </button>
          <button
            onClick={() => navigate("/sign-in")}
            className="w-full py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-all"
          >
            🔐 Sign In
          </button>
          <button
            onClick={() => navigate("/create-account")}
            className="w-full py-3 rounded-full bg-purple-600 hover:bg-purple-700 transition-all"
          >
            ✨ Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
