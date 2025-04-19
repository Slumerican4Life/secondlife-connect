
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface MFAPreferences {
  email: boolean;
  phone: boolean;
  authenticator: boolean;
}

interface SecurityLevel {
  level: 'basic' | 'standard' | 'enhanced' | 'quantum';
  requirements: {
    mfaRequired: boolean;
    minFactors: number;
    passwordStrength: number;
  };
}

interface UserSubscription {
  tier: 'free' | 'premium' | 'royal' | 'quantum';
  expiresAt: string | null;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, phoneNumber?: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  setupTwoFactor: () => Promise<string>;
  verifyTwoFactor: (token: string) => Promise<boolean>;
  requiresMFA: boolean;
  mfaPreferences: MFAPreferences;
  updateMFAPreferences: (prefs: Partial<MFAPreferences>) => Promise<void>;
  securityLevel: SecurityLevel;
  subscription: UserSubscription | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [requiresMFA, setRequiresMFA] = useState(false);
  const [mfaPreferences, setMFAPreferences] = useState<MFAPreferences>({
    email: false,
    phone: false,
    authenticator: false,
  });
  const [securityLevel, setSecurityLevel] = useState<SecurityLevel>({
    level: 'basic',
    requirements: {
      mfaRequired: false,
      minFactors: 0,
      passwordStrength: 1,
    }
  });
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Set up session listener
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserSecuritySettings(session.user.id);
        fetchUserSubscription(session.user.id);
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
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

  const fetchUserSecuritySettings = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_security_settings')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching security settings:', error);
        return;
      }

      if (data) {
        setMFAPreferences({
          email: data.mfa_email || false,
          phone: data.mfa_phone || false,
          authenticator: data.mfa_authenticator || false
        });

        setSecurityLevel({
          level: data.security_level || 'basic',
          requirements: {
            mfaRequired: data.mfa_required || false,
            minFactors: data.min_factors || 0,
            passwordStrength: data.password_strength || 1
          }
        });

        setRequiresMFA(data.mfa_required || false);
      }
    } catch (err) {
      console.error('Error in fetchUserSecuritySettings:', err);
    }
  };

  const fetchUserSubscription = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching subscription:', error);
        return;
      }

      if (data) {
        setSubscription({
          tier: data.tier || 'free',
          expiresAt: data.expires_at
        });
      }
    } catch (err) {
      console.error('Error in fetchUserSubscription:', err);
    }
  };

  const updateMFAPreferences = async (prefs: Partial<MFAPreferences>) => {
    if (!user?.id) {
      toast.error('User not authenticated');
      return;
    }

    const newPrefs = { ...mfaPreferences, ...prefs };
    setMFAPreferences(newPrefs);

    try {
      const { error } = await supabase
        .from('user_security_settings')
        .upsert({
          user_id: user.id,
          mfa_email: newPrefs.email,
          mfa_phone: newPrefs.phone,
          mfa_authenticator: newPrefs.authenticator,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (error) {
        console.error('Error updating MFA preferences:', error);
        toast.error('Failed to update security settings');
        return;
      }

      toast.success('Security settings updated');
    } catch (err) {
      console.error('Error in updateMFAPreferences:', err);
      toast.error('An error occurred while updating security settings');
    }
  };

  const signUp = async (email: string, password: string, phoneNumber?: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        phone: phoneNumber,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) throw error;
      
      // Create default security settings for new user
      // Note: This will be properly populated after the user confirms their email
      if (phoneNumber) {
        toast.success('Account created! Verification required for both email and phone.');
      } else {
        toast.success('Account created! Please verify your email.');
      }
    } catch (error: any) {
      toast.error(`Sign up failed: ${error.message}`);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast.success('Signed in successfully');
      
      // MFA check will happen after fetching user security settings
    } catch (error: any) {
      toast.error(`Sign in failed: ${error.message}`);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setSubscription(null);
      navigate('/');
      toast.info('Signed out successfully');
    } catch (error: any) {
      toast.error(`Sign out failed: ${error.message}`);
      throw error;
    }
  };

  // Set up 2FA
  const setupTwoFactor = async () => {
    try {
      const { data, error } = await supabase.rpc('generate_totp');
      if (error) throw error;
      
      toast.success('2FA setup initiated, please scan QR code');
      return data;
    } catch (error: any) {
      toast.error(`2FA setup failed: ${error.message}`);
      throw error;
    }
  };

  // Verify 2FA token
  const verifyTwoFactor = async (token: string) => {
    try {
      const { data, error } = await supabase.rpc('verify_totp', {
        token,
      });
      if (error) throw error;
      
      if (data) {
        toast.success('2FA verification successful');
      } else {
        toast.error('Invalid 2FA code');
      }
      
      return data;
    } catch (error: any) {
      toast.error(`2FA verification failed: ${error.message}`);
      throw error;
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
