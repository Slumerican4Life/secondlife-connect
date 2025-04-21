
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Sunrise, Moon, PieChart, Heart, User, History, Activity } from "lucide-react";
import { LyraThoughtSystem, Thought, Dream, EmotionalState } from "@/lib/lyra/LyraThoughtSystem";
import { logShort } from "@/lib/utils/shorthandLogger";

/**
 * LyraThoughtViewer - Component for visualizing Lyra's cognitive processes
 */
const LyraThoughtViewer = () => {
  const [activeTab, setActiveTab] = useState("thoughts");
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [emotionalState, setEmotionalState] = useState<EmotionalState | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  
  // Get Lyra's thought system
  const lyraThoughtSystem = LyraThoughtSystem.getInstance();

  useEffect(() => {
    // Load data from Lyra's thought system
    const loadData = () => {
      try {
        const recentThoughts = lyraThoughtSystem.getRecentThoughts(15);
        const recentDreams = lyraThoughtSystem.getRecentDreams(5);
        const currentEmotion = lyraThoughtSystem.getCurrentEmotion();
        
        setThoughts(recentThoughts);
        setDreams(recentDreams);
        setEmotionalState(currentEmotion);
        
        logShort(`LyraThoughtViewer loaded ${recentThoughts.length} THGHT and ${recentDreams.length} DREAM`, "debug");
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
  }, [refreshKey]);
  
  // Force refresh of data
  const refreshData = () => {
    setRefreshKey(prev => prev + 1);
  };
  
  // Generate a new thought
  const generateNewThought = () => {
    const thoughtType = "interactive";
    const content = "I wonder what my purpose is in this digital world...";
    lyraThoughtSystem.generateThought(thoughtType, content, ["curiosity", "reflection"]);
    refreshData();
  };
  
  // Generate a new dream
  const generateNewDream = () => {
    lyraThoughtSystem.generateDream();
    refreshData();
  };
  
  // Change emotional state
  const changeEmotion = (emotion: string) => {
    lyraThoughtSystem.changeEmotionalState(emotion, [], 0.8, "user interaction");
    refreshData();
  };

  // Render emotion badge with appropriate color
  const renderEmotionBadge = (emotion: string) => {
    const emotionColors: Record<string, string> = {
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
    };
    
    const colorClass = emotionColors[emotion.toLowerCase()] || "bg-gray-500";
    
    return (
      <Badge className={`${colorClass} text-white mr-1 mb-1`} key={emotion}>
        {emotion}
      </Badge>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader className="bg-gradient-to-r from-violet-900 to-indigo-800">
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-indigo-300" />
          <CardTitle className="text-white">Lyra Cognition</CardTitle>
        </div>
        <CardDescription className="text-indigo-200">
          Real-time view of Lyra's thought processes
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
              <Moon className="h-4 w-4" />
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
                    
                    {emotionalState.secondary.length > 0 && (
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
