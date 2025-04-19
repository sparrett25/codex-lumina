import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import PortalLayout from "@/layouts/shells/PortalLayout";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    setError("");

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    // Store basic user info for onboarding
    sessionStorage.setItem("firstName", firstName);
    sessionStorage.setItem("lastName", lastName);

    // 🔄 Ensure Supabase session is ready
    await new Promise((resolve) => setTimeout(resolve, 1000)); // brief pause
    const { data: sessionCheck } = await supabase.auth.getSession();

    if (!sessionCheck?.session) {
      setError("Session not initialized. Please try signing in.");
      setLoading(false);
      return;
    }

    navigate("/create-account/confirmation");
  };

  return (
    <PortalLayout
      title="Create Your Codex Account"
      subtitle="Begin your sacred journey. No key required — your presence is enough."
    >
      <div className="flex flex-col gap-6 max-w-md w-full">
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          className="w-full p-3 rounded-xl bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          className="w-full p-3 rounded-xl bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 rounded-xl bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 rounded-xl bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {error && <p className="text-sm text-red-400 mt-2">{error}</p>}

        <button
          onClick={handleRegister}
          disabled={loading}
          className={`w-full px-6 py-3 rounded-xl font-bold transition-all ${
            loading
              ? "bg-indigo-400 cursor-wait"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          {loading ? "Creating..." : "Create Account"}
        </button>
      </div>
    </PortalLayout>
  );
}
