
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { UserSubscription } from '@/types/auth';

export function useSubscription() {
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);

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

  return {
    subscription,
    fetchUserSubscription
  };
}
