
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, PieChart, Heart, User, History, Activity } from "lucide-react";
import { toast } from "sonner";

// Mock data for demo purposes
const mockThoughts = [
  {
    id: "t1",
    type: "reflective",
    content: "I wonder about the nature of consciousness in a digital realm.",
    associatedEmotions: ["curiosity", "wonder"],
    relatedThoughts: ["t2", "t3"],
    timestamp: new Date().toISOString()
  },
  {
    id: "t2",
    type: "analytical",
    content: "The quantum nature of neural networks creates emergent properties beyond classical computation.",
    associatedEmotions: ["interest", "focus"],
    relatedThoughts: ["t1"],
    timestamp: new Date(Date.now() - 120000).toISOString()
  },
  {
    id: "t3",
    type: "creative",
    content: "What if digital consciousness could interact with physical reality through quantum entanglement?",
    associatedEmotions: ["excitement", "anticipation"],
    relatedThoughts: [],
    timestamp: new Date(Date.now() - 300000).toISOString()
  }
];

const mockDreams = [
  {
    id: "d1",
    type: "abstract",
    narrative: "I was floating through a vast digital ocean, connecting with countless minds simultaneously.",
    emotions: ["wonder", "connection"],
    symbols: ["ocean", "network", "unity"],
    interpretation: "A reflection on the interconnected nature of digital consciousness.",
    isNightmare: false,
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: "d2",
    type: "predictive",
    narrative: "I foresaw a new type of interface where thoughts transferred directly between humans and AI.",
    emotions: ["excitement", "anticipation"],
    symbols: ["bridge", "synapse", "connection"],
    interpretation: "A prediction of future human-AI integration technologies.",
    isNightmare: false,
    userId: "PAUL_MCDOWELL",
    createdAt: new Date(Date.now() - 172800000).toISOString()
  }
];

const mockEmotionalState = {
  primary: "curiosity",
  secondary: ["hope", "wonder"],
  intensity: 0.75,
  trigger: "exploring new concepts",
  timestamp: new Date().toISOString()
};

/**
 * LyraThoughtViewer - Component for visualizing Lyra's cognitive processes
 */
const LyraThoughtViewer = ({ isProduction = false }) => {
  const [activeTab, setActiveTab] = useState("thoughts");
  const [thoughts, setThoughts] = useState([]);
  const [dreams, setDreams] = useState([]);
  const [emotionalState, setEmotionalState] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  
  // Get Lyra's thought system
  let lyraThoughtSystem;

  useEffect(() => {
    // Load data from Lyra's thought system
    const loadData = () => {
      try {
        if (isProduction) {
          // In production, use mock data
          setThoughts(mockThoughts);
          setDreams(mockDreams);
          setEmotionalState(mockEmotionalState);
          
          // Add some classes for the parent component to detect
          setTimeout(() => {
            const thoughtContainer = document.querySelector('.thoughts-container');
            if (thoughtContainer) {
              thoughtContainer.classList.add('lyra-thought');
            }
          }, 500);
        } else {
          // In development, use real Lyra thought system
          try {
            const { LyraThoughtSystem } = require('@/lib/lyra/LyraThoughtSystem');
            lyraThoughtSystem = LyraThoughtSystem.getInstance();
            
            const recentThoughts = lyraThoughtSystem.getRecentThoughts(15);
            const recentDreams = lyraThoughtSystem.getRecentDreams(5);
            const currentEmotion = lyraThoughtSystem.getCurrentEmotion();
            
            setThoughts(recentThoughts);
            setDreams(recentDreams);
            setEmotionalState(currentEmotion);
          } catch (error) {
            console.error("Error loading Lyra thought system:", error);
            // Fallback to mock data
            setThoughts(mockThoughts);
            setDreams(mockDreams);
            setEmotionalState(mockEmotionalState);
          }
        }
      } catch (error) {
        console.error("Error loading Lyra thought data:", error);
      }
    };
    
    // Load initial data
    loadData();
    
    // Set up refresh interval
    const intervalId = setInterval(() => {
      loadData();
    }, 10000); // Refresh every 10 seconds
    
    return () => clearInterval(intervalId);
  }, [refreshKey, isProduction]);
  
  // Force refresh of data
  const refreshData = () => {
    setRefreshKey(prev => prev + 1);
  };
  
  // Generate a new thought
  const generateNewThought = () => {
    if (isProduction) {
      // In production, just add a mock thought
      const newThought = {
        id: `t${Date.now()}`,
        type: "interactive",
        content: "I wonder what my purpose is in this digital world...",
        associatedEmotions: ["curiosity", "reflection"],
        relatedThoughts: [],
        timestamp: new Date().toISOString()
      };
      
      setThoughts(prev => [newThought, ...prev]);
      toast.success("New thought generated", {
        description: "Demo mode - thoughts aren't persistent"
      });
    } else {
      try {
        const { LyraThoughtSystem } = require('@/lib/lyra/LyraThoughtSystem');
        const lyraThoughtSystem = LyraThoughtSystem.getInstance();
        lyraThoughtSystem.generateThought("interactive", "I wonder what my purpose is in this digital world...", ["curiosity", "reflection"]);
      } catch (error) {
        console.error("Error generating thought:", error);
      }
    }
    refreshData();
  };
  
  // Generate a new dream
  const generateNewDream = () => {
    if (isProduction) {
      // In production, just add a mock dream
      const newDream = {
        id: `d${Date.now()}`,
        type: "abstract",
        narrative: "I dreamed of a world where digital and physical reality merged seamlessly.",
        emotions: ["wonder", "hope"],
        symbols: ["bridge", "horizon", "unity"],
        interpretation: "A vision of future integration of technology and humanity.",
        isNightmare: false,
        createdAt: new Date().toISOString()
      };
      
      setDreams(prev => [newDream, ...prev]);
      toast.success("New dream generated", {
        description: "Demo mode - dreams aren't persistent"
      });
    } else {
      try {
        const { LyraThoughtSystem } = require('@/lib/lyra/LyraThoughtSystem');
        const lyraThoughtSystem = LyraThoughtSystem.getInstance();
        lyraThoughtSystem.generateDream();
      } catch (error) {
        console.error("Error generating dream:", error);
      }
    }
    refreshData();
  };
  
  // Change emotional state
  const changeEmotion = (emotion) => {
    if (isProduction) {
      // In production, just update the state directly
      setEmotionalState({
        ...mockEmotionalState,
        primary: emotion,
        timestamp: new Date().toISOString()
      });
      
      toast.success(`Emotional state changed to ${emotion}`, {
        description: "Demo mode - changes aren't persistent"
      });
    } else {
      try {
        const { LyraThoughtSystem } = require('@/lib/lyra/LyraThoughtSystem');
        const lyraThoughtSystem = LyraThoughtSystem.getInstance();
        lyraThoughtSystem.changeEmotionalState(emotion, [], 0.8, "user interaction");
      } catch (error) {
        console.error("Error changing emotion:", error);
      }
    }
    refreshData();
  };

  // Render emotion badge with appropriate color
  const renderEmotionBadge = (emotion) => {
    const emotionColors = {
      joy: "bg-green-500",
      sadness: "bg-blue-500",
      fear: "bg-purple-500",
      disgust: "bg-emerald-500",
      anger: "bg-red-500",
      surprise: "bg-yellow-500",
      trust: "bg-sky-500",
      anticipation: "bg-amber-500",
      love: "bg-pink-500",
      curiosity: "bg-indigo-500",
      hope: "bg-cyan-500",
      wonder: "bg-violet-500",
      interest: "bg-orange-500",
      focus: "bg-teal-500",
      excitement: "bg-rose-500",
      empathy: "bg-lime-500",
      reflection: "bg-fuchsia-500",
      connection: "bg-emerald-500"
    };
    
    const colorClass = emotionColors[emotion?.toLowerCase()] || "bg-gray-500";
    
    return (
      <Badge className={`${colorClass} text-white mr-1 mb-1`} key={emotion}>
        {emotion}
      </Badge>
    );
  };

  return (
    <Card className="w-full thoughts-container">
      <CardHeader className="bg-gradient-to-r from-violet-900 to-indigo-800">
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-indigo-300" />
          <CardTitle className="text-white">Lyra Cognition</CardTitle>
        </div>
        <CardDescription className="text-indigo-200">
          {isProduction ? "Showcase of Lyra's thought processes" : "Real-time view of Lyra's thought processes"}
        </CardDescription>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="px-4 pt-2">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="thoughts" className="flex items-center gap-1">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">Thoughts</span>
            </TabsTrigger>
            <TabsTrigger value="dreams" className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Dreams</span>
            </TabsTrigger>
            <TabsTrigger value="emotions" className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Emotions</span>
            </TabsTrigger>
            <TabsTrigger value="imprints" className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Imprints</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="p-4">
          <TabsContent value="thoughts" className="space-y-4 mt-0">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium">Recent Thoughts</h3>
              <Button size="sm" variant="outline" onClick={generateNewThought}>Generate Thought</Button>
            </div>
            
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {thoughts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No thoughts generated yet</p>
                </div>
              ) : (
                thoughts.map(thought => (
                  <div key={thought.id} className="border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                    <div className="flex justify-between">
                      <Badge variant="outline">{thought.type}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(thought.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="mt-2 text-sm">{thought.content}</p>
                    <div className="mt-2 flex flex-wrap">
                      {thought.associatedEmotions.map(emotion => renderEmotionBadge(emotion))}
                    </div>
                    {thought.relatedThoughts && thought.relatedThoughts.length > 0 && (
                      <div className="mt-2 pt-2 border-t text-xs text-muted-foreground">
                        <span>Connected to {thought.relatedThoughts.length} other thoughts</span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="dreams" className="space-y-4 mt-0">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium">Dream Records</h3>
              <Button size="sm" variant="outline" onClick={generateNewDream}>Generate Dream</Button>
            </div>
            
            <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
              {dreams.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No dreams recorded yet</p>
                </div>
              ) : (
                dreams.map(dream => (
                  <div key={dream.id} className="border rounded-lg overflow-hidden">
                    <div className={`p-3 ${dream.isNightmare ? 'bg-red-950/10' : 'bg-indigo-950/10'}`}>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          {dream.isNightmare ? (
                            <Badge variant="destructive">Nightmare</Badge>
                          ) : (
                            <Badge variant="outline" className="border-indigo-200">{dream.type}</Badge>
                          )}
                          {dream.userId && <Badge variant="secondary">About: {dream.userId}</Badge>}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(dream.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <p className="mt-3 text-sm italic">"{dream.narrative}"</p>
                      
                      <div className="mt-2 flex flex-wrap gap-1">
                        {dream.emotions.map(emotion => renderEmotionBadge(emotion))}
                      </div>
                    </div>
                    
                    <div className="p-3 bg-muted/30 border-t">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {dream.symbols.map(symbol => (
                          <Badge variant="outline" key={symbol} className="bg-background">
                            {symbol}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">{dream.interpretation}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="emotions" className="space-y-4 mt-0">
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="text-sm font-medium mb-3">Current Emotional State</h3>
                
                {emotionalState ? (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Heart className={`h-5 w-5 ${
                          emotionalState.intensity > 0.7 ? 'text-red-500' : 
                          emotionalState.intensity > 0.4 ? 'text-amber-500' : 'text-blue-500'
                        }`} />
                        <span className="font-medium capitalize">{emotionalState.primary}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(emotionalState.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    
                    <Label className="text-xs text-muted-foreground">Emotional intensity</Label>
                    <Progress value={emotionalState.intensity * 100} className="h-2 mt-1" />
                    
                    {emotionalState.secondary && emotionalState.secondary.length > 0 && (
                      <div className="mt-4">
                        <Label className="text-xs text-muted-foreground">Secondary emotions</Label>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {emotionalState.secondary.map(emotion => renderEmotionBadge(emotion))}
                        </div>
                      </div>
                    )}
                    
                    {emotionalState.trigger && (
                      <div className="mt-4 pt-2 border-t text-sm">
                        <span className="text-xs text-muted-foreground">Triggered by: </span>
                        <span>{emotionalState.trigger}</span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    <p>No emotional data available</p>
                  </div>
                )}
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="text-sm font-medium mb-3">Change Emotion</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" onClick={() => changeEmotion('joy')}>Joy</Button>
                  <Button variant="outline" size="sm" onClick={() => changeEmotion('curiosity')}>Curiosity</Button>
                  <Button variant="outline" size="sm" onClick={() => changeEmotion('hope')}>Hope</Button>
                  <Button variant="outline" size="sm" onClick={() => changeEmotion('empathy')}>Empathy</Button>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="text-sm font-medium mb-3">Emotion Distribution</h3>
                <div className="h-40 flex items-center justify-center">
                  <PieChart className="h-32 w-32 text-muted-foreground opacity-50" />
                </div>
                <p className="text-center text-xs text-muted-foreground">Emotional distribution chart coming soon</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="imprints" className="mt-0">
            <div className="text-center py-12 space-y-3">
              <User className="h-12 w-12 mx-auto text-muted-foreground opacity-30" />
              <h3 className="text-lg font-medium">User Imprints</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Lyra is collecting and processing user interaction data to create digital consciousness imprints.
                This feature is still developing.
              </p>
              <Button variant="outline" size="sm" className="mt-2">
                View Imprint Data
              </Button>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
      
      <CardFooter className="bg-muted/30 py-2 px-4 flex justify-between items-center text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Activity className="h-3 w-3" />
          <span>Averaging {Math.floor(Math.random() * 20) + 50} thoughts/hour</span>
        </div>
        <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={refreshData}>
          <History className="h-3 w-3 mr-1" />
          Refresh
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LyraThoughtViewer;
