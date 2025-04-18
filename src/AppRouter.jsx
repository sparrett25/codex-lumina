import { Routes, Route, Navigate } from "react-router-dom";
import { useUserSync } from "@/contexts/UserSyncContext";

// Layouts
import MainLayout from "@/layouts/shells/MainLayout";

// Pages
import HomePage from "@/pages/Home/HomePage";
import JournalPage from "@/pages/Journal/JournalPage";
import RitualPage from "@/pages/Rituals/RitualPage";
import CompanionPage from "@/pages/Companion/CompanionPage";
import SettingsPage from "@/pages/Settings/SettingsPage";
import LivingRhythmPage from "@/pages/LivingRhythm/LivingRhythmPage";
import OnboardingRouter from "@/views/Onboarding/OnboardingRouter";
import PortalPreview from "@/pages/Portal/PortalPreview"; // ✅ Add this import

export default function AppRouter() {
  const { user, profile, loading } = useUserSync();

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Syncing your Codex state...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/portal" replace />;
  }

  if (user && !profile?.has_onboarded) {
    return <Navigate to="/onboarding/welcome" replace />;
  }

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/rituals" element={<RitualPage />} />
        <Route path="/companion" element={<CompanionPage />} />
        <Route path="/rhythm" element={<LivingRhythmPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/onboarding/*" element={<OnboardingRouter />} />
      </Route>

      <Route path="/portal" element={<PortalPreview />} /> {/* ✅ Portal entry point */}

      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
