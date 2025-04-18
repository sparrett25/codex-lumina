// 📄 src/codex/paths.js
// Centralized import registry for Codex Lumina

export const CodexPaths = {
  layouts: {
    MainLayout: "../layouts/MainLayout",
    PortalLayout: "../layouts/PortalLayout",
  },
  pages: {
    HomePage: "../pages/HomePage",
    JournalPage: "../pages/JournalPage",
    RedirectGate: "../pages/RedirectGate",
    SignupPage: "../pages/Portal/SignupPage",
    SignInPage: "../pages/Portal/PortalSignIn",
  },
  views: {
    OnboardingRouter: "../views/Onboarding/OnboardingRouter",
  },
  components: {
    DailyAlignmentPanel: "../components/home/DailyAlignmentPanel",
  },
  lib: {
    supabase: "../lib/supabase",
  },
  dev: {
    DevTestPage: "../dev/DevTestPage",
    DevTestMemoryEntry: "../dev/DevTest_LogMemoryEntry",
  },
  contexts: {
    UserSyncContext: "../contexts/UserSyncContext",
  }
};
