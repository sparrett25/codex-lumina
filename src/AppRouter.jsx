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
import PortalPreview from "@/pages/Portal/PortalPreview"; // ✅ Sacred entry

export default function AppRouter() {
  const { user, profile, loading } = useUserSync();

  // ✅ Gate rendering until Supabase has returned a defined user (null or object)
  if (loading || typeof user === "undefined") {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Syncing your Codex state...</p>
      </div>
    );
  }

  // ✅ Now safe to redirect if the user is *truly* unauthenticated
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

      <Route path="/portal" element={<PortalPreview />} /> {/* ✅ Defined Portal Entry */}

      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
