import { Navigate } from "react-router-dom";
import { useUserSync } from "@/contexts/UserSyncContext";

export default function PortalGate({ children }) {
  const { user, profile, loading } = useUserSync();

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

  if (user && !profile) {
    return <Navigate to="/onboarding/welcome" replace />;
  }

  return children;
}
