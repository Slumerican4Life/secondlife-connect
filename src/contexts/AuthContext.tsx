
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { AuthContextType, MFAPreferences } from '@/types/auth';
import { useSecuritySettings } from '@/hooks/useSecuritySettings';
import { useSubscription } from '@/hooks/useSubscription';
import { useMFA } from '@/hooks/useMFA';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Use our custom hooks
  const { 
    mfaPreferences, 
    securityLevel, 
    requiresMFA,
    fetchUserSecuritySettings,
    updateMFAPreferences,
  } = useSecuritySettings(user?.id);
  
  const { subscription, fetchUserSubscription } = useSubscription();
  const { setupTwoFactor, verifyTwoFactor } = useMFA();
  
  const navigate = useNavigate();

  useEffect(() => {
    // First set up the auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserSecuritySettings(session.user.id);
        fetchUserSubscription(session.user.id);
      }
      setLoading(false);
    });

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session check:", session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserSecuritySettings(session.user.id);
        fetchUserSubscription(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, phoneNumber?: string) => {
    try {
      setLoading(true);
      console.log("Signing up with:", email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        phone: phoneNumber,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) throw error;
      
      console.log("Sign up result:", data);
      
      if (phoneNumber) {
        toast.success('Account created! Verification required for both email and phone.');
      } else {
        toast.success('Account created! Please verify your email.');
      }
      
      return data;
    } catch (error: any) {
      console.error("Sign up error:", error);
      toast.error(`Sign up failed: ${error.message}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log("Signing in with:", email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      console.log("Sign in result:", data);
      toast.success('Signed in successfully');
      navigate('/');
      
      return data;
    } catch (error: any) {
      console.error("Sign in error:", error);
      toast.error(`Sign in failed: ${error.message}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      navigate('/login');
      toast.info('Signed out successfully');
    } catch (error: any) {
      console.error("Sign out error:", error);
      toast.error(`Sign out failed: ${error.message}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        signIn,
        signUp,
        signOut,
        loading,
        setupTwoFactor,
        verifyTwoFactor,
        requiresMFA,
        mfaPreferences,
        updateMFAPreferences,
        securityLevel,
        subscription
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
