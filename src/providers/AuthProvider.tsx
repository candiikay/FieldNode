'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { SupabaseStorage } from '@/services/supabase-storage';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, username: string) => Promise<void>;
  signInWithMagicLink: (email: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  updateEmail: (newEmail: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  userProfile: any | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signOut: async () => {},
  signInWithEmail: async () => {},
  signUpWithEmail: async () => {},
  signInWithMagicLink: async () => {},
  signInWithGoogle: async () => {},
  updateEmail: async () => {},
  updatePassword: async () => {},
  resetPassword: async () => {},
  userProfile: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any | null>(null);

  const loadUserProfile = async (userId: string) => {
    try {
      const profile = await SupabaseStorage.getUserProfile(userId);
      setUserProfile(profile);
      return profile;
    } catch (error: any) {
      // If profile doesn't exist, return null
      setUserProfile(null);
      return null;
    }
  };

  const createProfileFromOAuth = async (user: User) => {
    try {
      // Check if profile already exists
      const existingProfile = await SupabaseStorage.getUserProfile(user.id);
      if (existingProfile) {
        setUserProfile(existingProfile);
        return;
      }

      // Extract name from Google OAuth metadata
      const fullName = user.user_metadata?.full_name || 
                      user.user_metadata?.name || 
                      user.user_metadata?.display_name ||
                      user.email?.split('@')[0] || 
                      'user';

      // Generate username from name (sanitize for username format)
      let username = fullName
        .toLowerCase()
        .replace(/[^a-z0-9_]/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '');

      // Ensure username meets requirements (3-30 chars, alphanumeric + underscore)
      if (username.length < 3) {
        username = username.padEnd(3, '_');
      }
      if (username.length > 30) {
        username = username.substring(0, 30);
      }

      // If username is still invalid, use email prefix
      if (!/^[a-zA-Z0-9_]+$/.test(username) || username.length < 3) {
        username = (user.email?.split('@')[0] || 'user')
          .toLowerCase()
          .replace(/[^a-z0-9_]/g, '_')
          .substring(0, 30);
      }

      // Add random suffix if username already exists (we'll handle conflicts)
      let finalUsername = username;
      let attempts = 0;
      while (attempts < 10) {
        try {
          await SupabaseStorage.createUserProfile(user.id, finalUsername, fullName);
          const newProfile = await SupabaseStorage.getUserProfile(user.id);
          setUserProfile(newProfile);
          return;
        } catch (error: any) {
          // If username conflict, append number
          if (error.code === '23505' && attempts < 10) {
            finalUsername = `${username}${Math.floor(Math.random() * 1000)}`;
            attempts++;
          } else {
            throw error;
          }
        }
      }
    } catch (error) {
      console.error('Failed to create profile from OAuth:', error);
    }
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        try {
          const profile = await loadUserProfile(session.user.id);
          
          // If no profile exists and user has OAuth metadata, create profile
          if (!profile) {
            const isOAuth = session.user.app_metadata?.provider !== 'email';
            if (isOAuth) {
              await createProfileFromOAuth(session.user);
            }
          }
        } catch (error) {
          console.error('Error loading initial session:', error);
        }
      }
      
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        try {
          // Try to load existing profile
          const profile = await loadUserProfile(session.user.id);
          
          // If no profile exists and it's a new OAuth sign-in, create one
          if (!profile && (event === 'SIGNED_IN' || event === 'USER_UPDATED')) {
            // Check if this is an OAuth provider (has user_metadata with provider)
            const isOAuth = session.user.app_metadata?.provider !== 'email';
            if (isOAuth) {
              await createProfileFromOAuth(session.user);
            }
          }
        } catch (error) {
          console.error('Error handling auth state change:', error);
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }
  };

  const signUpWithEmail = async (email: string, password: string, username: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    // Create user profile
    if (data.user) {
      await SupabaseStorage.createUserProfile(data.user.id, username);
    }
  };

  const signInWithMagicLink = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      throw new Error(error.message);
    }
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      throw new Error(error.message);
    }
  };

  const updateEmail = async (newEmail: string) => {
    const { error } = await supabase.auth.updateUser({
      email: newEmail,
    });

    if (error) {
      throw new Error(error.message);
    }
  };

  const updatePassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      throw new Error(error.message);
    }
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) {
      throw new Error(error.message);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUserProfile(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        session, 
        loading, 
        signOut, 
        signInWithEmail, 
        signUpWithEmail, 
        signInWithMagicLink,
        signInWithGoogle,
        updateEmail,
        updatePassword,
        resetPassword,
        userProfile 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
