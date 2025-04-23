
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export function useMFA() {
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

  return {
    setupTwoFactor,
    verifyTwoFactor
  };
}
