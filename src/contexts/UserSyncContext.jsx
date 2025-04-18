import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const UserSyncContext = createContext();

export function UserSyncProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [codexKey, setCodexKey] = useState(null);
  const [codexReflection, setCodexReflection] = useState(null);

  const navigate = useNavigate();

  const refetchProfile = async () => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const currentUser = sessionData?.session?.user;

      setUser(currentUser ?? null);

      if (!currentUser) {
        setProfile(null);
        setLoading(false); // ✅ Only release loading once resolved
        return;
      }

      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single();

      if (error) {
        console.error('🔥 Profile fetch failed:', error.message);
        setProfile(null);
      } else {
        setProfile(profileData ?? null);
      }

      setLoading(false); // ✅ After profile is fetched or fails
    } catch (err) {
      console.error("Unexpected error in refetchProfile:", err);
      setUser(null);
      setProfile(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    refetchProfile();

    const stored = sessionStorage.getItem('codexReflection');
    if (stored) {
      try {
        setCodexReflection(JSON.parse(stored));
      } catch (e) {
        console.warn('⚠️ Failed to parse codexReflection from session');
      }
    }
  }, []);

  const value = {
    user,
    profile,
    loading,
    codexKey,
    setCodexKey,
    codexReflection,
    refetchProfile,
  };

  console.log('🧠 Rendering UserSyncContext.Provider', value);

  return (
    <UserSyncContext.Provider value={value}>
      {children}
    </UserSyncContext.Provider>
  );
}

export function useUserSync() {
  return useContext(UserSyncContext);
}
