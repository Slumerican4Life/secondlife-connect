
import { useEffect, useState } from 'react';
import safetyControls from '../lib/safety/SafetyControls';
import { supabase } from '../lib/supabase';

export interface EncryptedDataOptions {
  encryptionEnabled: boolean;
  encryptionLevel: 'standard' | 'high' | 'quantum';
  autoDecrypt: boolean;
}

export const useSafety = (userId?: string) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isSafe, setIsSafe] = useState(false);
  const [encryptedData, setEncryptedData] = useState<Record<string, any>>({});
  const [encryptionOptions, setEncryptionOptions] = useState<EncryptedDataOptions>({
    encryptionEnabled: true,
    encryptionLevel: 'standard',
    autoDecrypt: false,
  });

  useEffect(() => {
    // Check authorization if userId is provided
    if (userId) {
      setIsAuthorized(safetyControls.isUserAuthorized(userId));
      
      // Fetch encryption options for this user
      fetchUserEncryptionOptions(userId);
    }

    // Perform safety checks
    const checkSafety = () => {
      const safetyStatus = safetyControls.checkSafety();
      setIsSafe(safetyStatus);
    };

    // Initial check
    checkSafety();

    // Regular safety checks
    const interval = setInterval(checkSafety, 5000);

    return () => clearInterval(interval);
  }, [userId]);

  // Fetch user's encryption options from database
  const fetchUserEncryptionOptions = async (uid: string) => {
    try {
      const { data, error } = await supabase
        .from('user_security_settings')
        .select('encryption_enabled, encryption_level, auto_decrypt')
        .eq('user_id', uid)
        .single();

      if (error) {
        console.error('Error fetching encryption options:', error);
        return;
      }

      if (data) {
        setEncryptionOptions({
          encryptionEnabled: data.encryption_enabled ?? true,
          encryptionLevel: data.encryption_level ?? 'standard',
          autoDecrypt: data.auto_decrypt ?? false,
        });
      }
    } catch (err) {
      console.error('Error in fetchUserEncryptionOptions:', err);
    }
  };

  // Store encrypted data in the database
  const storeEncryptedData = async (dataType: string, data: any) => {
    if (!userId || !isAuthorized) {
      console.error('User not authorized to store encrypted data');
      return false;
    }

    try {
      // Enhanced security for financial data
      const sensitiveDataTypes = ['banking_info', 'payment_details', 'api_keys'];
      const shouldEnhanceSecurity = sensitiveDataTypes.includes(dataType);
      
      // For sensitive data, always enforce encryption regardless of user settings
      const enforceEncryption = shouldEnhanceSecurity ? true : encryptionOptions.encryptionEnabled;
      const encryptionLevel = shouldEnhanceSecurity ? 'high' : encryptionOptions.encryptionLevel;
      
      // In a real implementation, we would encrypt the data here
      const encryptedValue = enforceEncryption 
        ? encryptData(data, encryptionLevel) 
        : data;

      const { error } = await supabase
        .from('encrypted_user_data')
        .upsert({
          user_id: userId,
          data_type: dataType,
          encrypted_value: encryptedValue,
          encryption_level: enforceEncryption ? encryptionLevel : null,
          updated_at: new Date().toISOString(),
          is_sensitive: shouldEnhanceSecurity
        }, {
          onConflict: 'user_id, data_type'
        });

      if (error) {
        console.error('Error storing encrypted data:', error);
        return false;
      }

      // Update local cache
      setEncryptedData(prev => ({
        ...prev,
        [dataType]: encryptedValue
      }));

      return true;
    } catch (err) {
      console.error('Error in storeEncryptedData:', err);
      return false;
    }
  };

  // Retrieve encrypted data from database
  const retrieveEncryptedData = async (dataType: string) => {
    if (!userId) {
      console.error('User ID required to retrieve encrypted data');
      return null;
    }

    try {
      // Check if we have it cached and should return it
      if (encryptedData[dataType] && !encryptionOptions.autoDecrypt) {
        return encryptedData[dataType];
      }

      const { data, error } = await supabase
        .from('encrypted_user_data')
        .select('encrypted_value, encryption_level, is_sensitive')
        .eq('user_id', userId)
        .eq('data_type', dataType)
        .single();

      if (error) {
        if (error.code === 'PGRST116') { // No rows returned
          return null;
        }
        console.error('Error retrieving encrypted data:', error);
        return null;
      }

      if (data) {
        const value = data.encrypted_value;
        
        // Auto-decrypt if enabled and authorized
        const canDecrypt = encryptionOptions.autoDecrypt && isAuthorized;
        
        // Add additional security check for sensitive data
        if (data.is_sensitive && !isAuthorized) {
          console.error('User not authorized to access sensitive data');
          return null;
        }
        
        if (canDecrypt && data.encryption_level) {
          const decrypted = decryptData(value, data.encryption_level);
          
          // Update cached value
          setEncryptedData(prev => ({
            ...prev,
            [dataType]: decrypted
          }));
          
          return decrypted;
        }
        
        // Return encrypted value
        setEncryptedData(prev => ({
          ...prev,
          [dataType]: value
        }));
        
        return value;
      }

      return null;
    } catch (err) {
      console.error('Error in retrieveEncryptedData:', err);
      return null;
    }
  };

  // Update user encryption options
  const updateEncryptionOptions = async (options: Partial<EncryptedDataOptions>) => {
    if (!userId) {
      console.error('User ID required to update encryption options');
      return false;
    }

    const newOptions = { ...encryptionOptions, ...options };
    setEncryptionOptions(newOptions);

    try {
      const { error } = await supabase
        .from('user_security_settings')
        .upsert({
          user_id: userId,
          encryption_enabled: newOptions.encryptionEnabled,
          encryption_level: newOptions.encryptionLevel,
          auto_decrypt: newOptions.autoDecrypt,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (error) {
        console.error('Error updating encryption options:', error);
        return false;
      }

      return true;
    } catch (err) {
      console.error('Error in updateEncryptionOptions:', err);
      return false;
    }
  };

  // Encrypt data function (simplified for demo)
  const encryptData = (data: any, level: string) => {
    // In a real app, use a proper encryption library based on the level
    // This is just a simple simulation
    if (typeof data === 'string') {
      return `encrypted_${level}_${btoa(data)}`;
    }
    return `encrypted_${level}_${btoa(JSON.stringify(data))}`;
  };

  // Decrypt data function (simplified for demo)
  const decryptData = (encryptedValue: string, level: string) => {
    // In a real app, use proper decryption based on the level
    // This is just a simple simulation
    if (typeof encryptedValue === 'string' && encryptedValue.startsWith(`encrypted_${level}_`)) {
      const base64 = encryptedValue.replace(`encrypted_${level}_`, '');
      try {
        const decoded = atob(base64);
        try {
          // Try to parse as JSON if it was an object
          return JSON.parse(decoded);
        } catch {
          // If not valid JSON, return as string
          return decoded;
        }
      } catch {
        return encryptedValue;
      }
    }
    return encryptedValue;
  };

  return {
    isAuthorized,
    isSafe,
    safetyControls,
    encryptionOptions,
    storeEncryptedData,
    retrieveEncryptedData,
    updateEncryptionOptions
  };
};
