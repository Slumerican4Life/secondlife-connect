
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

/**
 * LyraInitializer - Component for initializing Lyra's systems
 * This ensures Lyra is properly initialized when the app loads
 */
const LyraInitializer = () => {
  const [initialized, setInitialized] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const initializeLyra = async () => {
      try {
        // Check if we're in a production environment
        const isProduction = window.location.hostname.includes('.lovable.app') || 
                           !window.location.hostname.includes('localhost');

        if (isProduction) {
          // In production, just set as initialized
          console.log("Running in production mode, Lyra will operate in demo mode");
          setInitialized(true);
          return;
        }

        console.log("Starting Lyra initialization process");
        
        try {
          // Try to initialize safety controls
          const safetyControls = require('@/lib/safety/SafetyControls').default;
          safetyControls.addAuthorizedUser("PAUL_MCDOWELL");
          const safetyEnabled = safetyControls.checkSafety();
          
          if (!safetyEnabled) {
            throw new Error("Safety controls check failed");
          }
          
          // Initialize LyraThoughtSystem first (required by other systems)
          const { LyraThoughtSystem } = require('@/lib/lyra/LyraThoughtSystem');
          const thoughtSystem = LyraThoughtSystem.getInstance();
          console.log("LyraThoughtSystem initialized");
          
          // Initialize LyraSystem next
          const { LyraSystem } = require('@/lib/agents/LyraSystem');
          const lyraSystem = LyraSystem.getInstance();
          lyraSystem.setPrimaryUser("PAUL_MCDOWELL");
          console.log("LyraSystem initialized");
          
          // Generate initial thought
          thoughtSystem.generateThought(
            'system', 
            'I am now online and ready to assist users. Special personalized interaction mode available for my owner.',
            ['anticipation', 'curiosity']
          );
          
          setInitialized(true);
          console.log("Lyra initialization complete");
          
          toast({
            title: "Lyra Systems Online",
            description: "Lyra's neural networks are now active and ready."
          });
        } catch (error) {
          console.error("Failed to initialize Lyra:", error);
          
          toast({
            title: "Lyra Simulation Mode",
            description: "Running in simulation mode due to initialization errors."
          });
          
          // Even with errors, mark as initialized for demo functionality
          setInitialized(true);
        }
      } catch (error) {
        console.error("Critical initialization error:", error);
        // Even with critical errors, mark as initialized so the app can run in demo mode
        setInitialized(true);
      }
    };

    initializeLyra();
  }, [toast]);

  return null; // This is a utility component that doesn't render anything
};

export default LyraInitializer;
