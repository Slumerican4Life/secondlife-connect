
import { Session, User } from '@supabase/supabase-js';

export interface MFAPreferences {
  email: boolean;
  phone: boolean;
  authenticator: boolean;
}

export interface SecurityLevel {
  level: 'basic' | 'standard' | 'enhanced' | 'quantum';
  requirements: {
    mfaRequired: boolean;
    minFactors: number;
    passwordStrength: number;
  };
}

export interface UserSubscription {
  tier: 'free' | 'premium' | 'royal' | 'quantum';
  expiresAt: string | null;
}

export interface AuthContextType {
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
