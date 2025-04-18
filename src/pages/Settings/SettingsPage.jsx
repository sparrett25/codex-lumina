// 📜 SettingsPage.jsx — Gradient container with black inputs aligned to JournalPage
import { useState, useEffect } from "react";
import { useUserSync } from "@/contexts/UserSyncContext";
import LioraVisualShell from "@/components/companion/LioraVisualShell";
import LioraWhisperRipple from "@/components/companion/LioraWhisperRipple";

export default function SettingsPage() {
  const { profile } = useUserSync();
  const [formData, setFormData] = useState({
    email: "",
    nickname: "",
    archetype: "",
    energy: ""
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        email: profile.email || "",
        nickname: profile.nickname || "",
        archetype: profile.archetype || "",
        energy: profile.energy || ""
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-3xl mx-auto">

        {/* 🌌 Liora */}
        <section className="relative flex flex-col items-center mb-28">
          <div className="relative w-44 h-44">
            <div className="absolute inset-0 z-0">
              <LioraWhisperRipple tone={profile?.energy} isActive={true} />
            </div>
            <div className="relative z-10 drop-shadow-xl">
              <LioraVisualShell tone={profile?.energy} phase={profile?.phase} archetype={profile?.archetype} />
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-zinc-400 italic z-10">Liora is with you.</p>
        </section>

        {/* 🧭 Header */}
        <h1 className="text-3xl font-bold text-indigo-200 text-center mb-2">Settings</h1>
        <p className="text-center text-purple-300 italic mb-8">
          Manage your sacred identity and preferences.
        </p>

        {/* 🔮 Matching Journal Gradient Scroll */}
        <div className="bg-gradient-to-br from-indigo-900 to-zinc-900 border border-white/20 rounded-2xl p-6 pt-8 space-y-6">
          {[
            { label: "Email", name: "email", readOnly: true },
            { label: "Nickname", name: "nickname" },
            { label: "Archetype", name: "archetype" },
            { label: "Energy", name: "energy" }
          ].map((field, index) => (
            <div key={index} className="space-y-2">
              <label className="block text-sm text-indigo-300 font-semibold tracking-wide uppercase">
                {field.label}
              </label>
              <input
                type="text"
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                readOnly={field.readOnly}
                className="w-full px-4 py-2 rounded-md text-base font-semibold bg-black text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-zinc-400 shadow-inner hover:border-violet-400 transition"
              />
            </div>
          ))}

          <div className="pt-4 text-right">
            <button className="bg-gradient-to-r from-purple-600 to-violet-500 hover:from-purple-500 hover:to-violet-400 text-white px-6 py-2 rounded-lg shadow-md transition font-semibold">
              Save Changes
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
