
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { MFAPreferences, SecurityLevel } from '@/types/auth';
import { toast } from 'sonner';

export function useSecuritySettings(userId: string | undefined) {
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
  
  const [requiresMFA, setRequiresMFA] = useState(false);

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

  const updateMFAPreferences = async (prefs: Partial<MFAPreferences>) => {
    if (!userId) {
      toast.error('User not authenticated');
      return;
    }

    const newPrefs = { ...mfaPreferences, ...prefs };
    setMFAPreferences(newPrefs);

    try {
      const { error } = await supabase
        .from('user_security_settings')
        .upsert({
          user_id: userId,
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

  return {
    mfaPreferences,
    securityLevel,
    requiresMFA,
    fetchUserSecuritySettings,
    updateMFAPreferences,
    setRequiresMFA
  };
}
