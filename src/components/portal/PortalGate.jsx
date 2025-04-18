import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserSync } from "../../contexts/UserSyncContext";

export default function PortalGate() {
  const navigate = useNavigate();
  const { user, profile, loading } = useUserSync();

  useEffect(() => {
    console.groupCollapsed("🌀 [PortalGate] useEffect fired");
    console.log("🔍 loading:", loading);
    console.log("🔍 user:", user);
    console.log("🔍 profile:", profile);

    if (loading) {
      console.log("⏳ Still loading... awaiting user/profile...");
      console.groupEnd();
      return;
    }

    const hasUser = !!user;
    const hasProfile = profile !== undefined && profile !== null;

    console.log("✅ Evaluation →", { hasUser, hasProfile });

    if (!hasUser) {
      console.log("➡️ Navigating to /sign-in");
      navigate("/sign-in", { replace: true });
    } else if (hasUser && !hasProfile) {
      console.log("➡️ Navigating to /onboarding/welcome");
      navigate("/onboarding/welcome", { replace: true });
    } else if (hasUser && hasProfile) {
      console.log("➡️ Navigating to /home");
      navigate("/home", { replace: true });
    }

    console.groupEnd();
  }, [user, profile, loading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <p className="text-sm opacity-60">🧠 Syncing your Codex path...</p>
      </div>
    </div>
  );
}
