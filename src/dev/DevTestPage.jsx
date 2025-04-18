// 📄 src/dev/DevTestPage.jsx (with CodexPaths)

import { useUserSync } from "../contexts/UserSyncContext";
import { CodexPaths } from "../codex/paths";
import { useEffect } from "react";

export default function DevTestPage() {
  const { user, profile, codexKey } = useUserSync();

  useEffect(() => {
    console.log("🧪 DevTestPage Loaded");
    console.log("👤 User:", user);
    console.log("🧬 Profile:", profile);
    console.log("🔑 CodexKey:", codexKey);
  }, [user, profile, codexKey]);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4">🧪 Codex Dev Test Page</h1>
      <pre className="bg-zinc-900 text-green-400 p-4 rounded text-sm whitespace-pre-wrap">
        {JSON.stringify({ user, profile, codexKey }, null, 2)}
      </pre>
      <p className="mt-6 text-sm opacity-70">
        Imported via <code>CodexPaths.contexts.UserSyncContext</code>
      </p>
    </div>
  );
}
