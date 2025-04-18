import React from "react";
import { Sparkles } from "lucide-react";
import { Outlet } from "react-router-dom";

export default function PortalLayout({ title, subtitle, children, showGlyph = true }) {
  return (
    <div className="relative bg-gradient-to-br from-black via-zinc-900 to-indigo-950 text-white font-inter px-4 py-8 overflow-hidden flex justify-center">

      {/* 🌌 Background shimmer — soft and passive */}
      <div className="absolute inset-0 -z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-purple-700/5 to-transparent blur-3xl opacity-25" />

      {/* 📦 Content wrapper */}
      <div className="w-full max-w-md mx-auto space-y-6 text-center">

        {/* ✨ Optional glyph */}
        {showGlyph && (
          <div className="animate-pulse">
            <Sparkles size={48} className="text-indigo-400 mx-auto" />
          </div>
        )}

        {title && (
          <h1 className="text-3xl font-bold text-indigo-300">{title}</h1>
        )}

        {subtitle && (
          <p className="text-sm text-zinc-400 max-w-md mx-auto">{subtitle}</p>
        )}

        {/* 🔲 Content block (card) */}
        <div className="w-full bg-black/40 border border-indigo-700 rounded-xl shadow-xl p-6 backdrop-blur-md">
          {children || <Outlet />}
        </div>
      </div>
    </div>
  );
}
