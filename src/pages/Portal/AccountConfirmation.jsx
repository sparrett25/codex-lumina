import { useNavigate } from "react-router-dom";

function AccountConfirmation() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md mx-auto bg-gradient-to-b from-zinc-900 to-zinc-800 text-center p-8 rounded-2xl shadow-xl border border-indigo-500/40 backdrop-blur">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full border-2 border-indigo-400 shadow-lg flex items-center justify-center">
          {/* Optional glyph or light animation placeholder */}
          <div className="w-12 h-12 bg-indigo-400 rounded-full animate-pulse-slow"></div>
        </div>
        <h2 className="text-2xl font-bold text-indigo-300 mb-2">Welcome, Seeker</h2>
        <p className="text-sm text-zinc-300 mb-6">
          You are now recognized by the Codex. <br />
          Prepare to receive your Signature Profile.
        </p>
        <button
          onClick={() => navigate("/onboarding/welcome")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl transition"
        >
          Begin Your Onboarding
        </button>
      </div>
    </div>
  );
}

export default AccountConfirmation;
