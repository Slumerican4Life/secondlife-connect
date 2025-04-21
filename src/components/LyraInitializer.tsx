
import { useState, useEffect } from 'react';
import { LyraSystem } from '@/lib/agents/LyraSystem';
import { LyraThoughtSystem } from '@/lib/lyra/LyraThoughtSystem';
import { logShort } from '@/lib/utils/shorthandLogger';
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
        logShort("Starting Lyra initialization process", "info");
        
        // Initialize LyraThoughtSystem first (required by other systems)
        const thoughtSystem = LyraThoughtSystem.getInstance();
        logShort("LyraThoughtSystem initialized", "info");
        
        // Initialize LyraSystem next
        const lyraSystem = LyraSystem.getInstance();
        logShort("LyraSystem initialized", "info");
        
        // Generate initial thought
        thoughtSystem.generateThought(
          'system', 
          'I am now online and ready to assist users.',
          ['anticipation', 'curiosity']
        );
        
        setInitialized(true);
        logShort("Lyra initialization complete", "info");
        
        toast({
          title: "Lyra Systems Online",
          description: "Lyra's neural networks are now active and ready."
        });
      } catch (error) {
        console.error("Failed to initialize Lyra:", error);
        logShort(`Lyra initialization ERR: ${error}`, "error");
        
        toast({
          title: "Lyra Initialization Failed",
          description: "Could not start Lyra systems. See console for details.",
          variant: "destructive"
        });
      }
    };

    initializeLyra();
  }, []);

  return null; // This is a utility component that doesn't render anything
};

export default LyraInitializer;
