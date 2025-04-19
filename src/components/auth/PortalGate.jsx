import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserSync } from "@/contexts/UserSyncContext";

export default function PortalGate() {
  const { user, profile, loading } = useUserSync();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <p className="text-sm opacity-60">🧠 Syncing your Codex path...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/portal-preview" replace />;
  }

  // 🛠️ Allow onboarding routes even if profile is not ready
  if (!profile && !location.pathname.startsWith("/onboarding")) {
    return <Navigate to="/onboarding/welcome" replace />;
  }

  return <Outlet />;
}
