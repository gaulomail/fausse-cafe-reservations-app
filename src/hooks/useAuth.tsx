import { useState, useEffect, createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  profile: any | null;
  role: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

// Inferred from Supabase types, but we add role?: string for admin logic
interface Profile {
  created_at: string;
  full_name: string | null;
  id: string;
  phone: string | null;
  updated_at: string;
  user_id: string;
  role?: string; // <-- add this
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [role, setRole] = useState<string | null>(null);

  // Local admin bypass
  useEffect(() => {
    setLoading(true);
    if (localStorage.getItem('admin_bypass') === 'true') {
      setUser({
        id: 'admin-bypass',
        email: 'admin@cafefausse.com',
        aud: '',
        app_metadata: {},
        user_metadata: {},
        created_at: '',
        confirmed_at: '',
        last_sign_in_at: '',
        role: 'admin',
        identities: [],
        phone: null,
      } as any);
      setProfile({
        created_at: '',
        full_name: 'Admin',
        id: 'admin-bypass',
        phone: null,
        updated_at: '',
        user_id: 'admin-bypass',
        role: 'admin',
      });
      setRole('admin');
      setLoading(false);
      return;
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (localStorage.getItem('admin_bypass') === 'true') return; // skip Supabase fetch
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (localStorage.getItem('admin_bypass') === 'true') return; // skip Supabase fetch
    async function fetchProfile() {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
        if (!error && data) {
          setProfile(data as Profile);
          setRole(data.role || null);
        } else {
          setProfile(null);
          setRole(null);
        }
      } else {
        setProfile(null);
        setRole(null);
      }
    }
    fetchProfile();
  }, [user]);

  const signOut = async () => {
    try {
      localStorage.removeItem('admin_bypass');
      // Clean up any local storage
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          localStorage.removeItem(key);
        }
      });
      // Sign out from Supabase
      await supabase.auth.signOut({ scope: 'global' });
      // Force page reload for clean state
      window.location.href = '/auth';
    } catch (error) {
      console.error('Error signing out:', error);
      // Force redirect even if signOut fails
      window.location.href = '/auth';
    }
  };

  const value = {
    user,
    session,
    loading,
    signOut,
    profile,
    role,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};