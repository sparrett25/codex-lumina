/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "bg-cyan-600",
    "hover:bg-cyan-500",
    "bg-indigo-600",
    "hover:bg-indigo-500",
    "bg-purple-600",
    "hover:bg-purple-500",
    "text-white",
    "px-5",
    "py-2",
    "rounded-lg",
    "transition",
    "animate-pulse",
    "scale-105",
    "opacity-70",
    "text-cyan-300",
    "text-cyan-200",
    "text-indigo-300"
  ],
  theme: {
    extend: {
      colors: {
        codexLight: "#fcd34d",
        codexNeutral: "#64748b",
        codexDark: "#1e1b4b",
      },
      keyframes: {
        breathPulse: {
          '0%, 100%': {
            transform: 'scale(0.95)',
            opacity: '0.6',
          },
          '50%': {
            transform: 'scale(1.1)',
            opacity: '1',
          },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1.5s ease-in-out forwards',
        fadeInSlow: 'fadeIn 3s ease-in-out forwards',
        breathPulse: 'breathPulse 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
