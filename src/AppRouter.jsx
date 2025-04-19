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

// Portal Pages
import PortalPreview from "@/pages/Portal/PortalPreview";
import PortalSignIn from "@/pages/Portal/PortalSignIn";
import KeyEntryView from "@/pages/Portal/KeyEntryView";
import CreateAccount from "@/pages/Portal/CreateAccount";
import AccountConfirmation from "@/pages/Portal/AccountConfirmation";

// Gate
import PortalGate from "@/components/auth/PortalGate";

export default function AppRouter() {
  const { loading } = useUserSync();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        🌌 Syncing your Codex state...
      </div>
    );
  }

  return (
    <Routes>
      {/* Sacred Entry Portal */}
      <Route path="/portal-preview" element={<PortalPreview />} />
      <Route path="/sign-in" element={<PortalSignIn />} />
      <Route path="/key-entry" element={<KeyEntryView />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/create-account/confirmation" element={<AccountConfirmation />} />

      {/* Protected Routes via PortalGate */}
      <Route path="/*" element={
        <PortalGate>
          <MainLayout />
        </PortalGate>
      }>
        <Route path="home" element={<HomePage />} />
        <Route path="journal" element={<JournalPage />} />
        <Route path="rituals" element={<RitualPage />} />
        <Route path="companion" element={<CompanionPage />} />
        <Route path="rhythm" element={<LivingRhythmPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="onboarding/*" element={<OnboardingRouter />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/portal-preview" replace />} />
    </Routes>
  );
}
