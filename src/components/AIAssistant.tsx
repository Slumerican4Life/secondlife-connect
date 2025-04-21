
import { useState, useEffect } from "react";
import { Bot, X, Minimize, Maximize, SendHorizontal, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { HoverTitle } from "@/components/ui/hover-title";
import { LyraSystem } from "@/lib/agents/LyraSystem";
import { useToast } from "@/components/ui/use-toast";

const OWNER_ID = "PAUL_MCDOWELL";

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isPrimaryUser, setIsPrimaryUser] = useState(false);
  const [interactionMode, setInteractionMode] = useState<string>("standard");
  const { toast } = useToast();
  const [conversation, setConversation] = useState([
    { 
      sender: "ai", 
      message: "Hello! I'm Lyra, your AI assistant. How can I help you today?" 
    },
  ]);

  // Initialize Lyra system and user authentication
  useEffect(() => {
    const lyraSystem = LyraSystem.getInstance();
    
    // For demonstration, set the primary user and authenticate current user
    lyraSystem.setPrimaryUser(OWNER_ID);
    
    // Simulate user authentication - in a real app this would come from auth system
    const simulateAuth = () => {
      // Simulate owner login with 10% chance, otherwise random user
      const randomValue = Math.random();
      const userId = randomValue < 0.1 ? OWNER_ID : `user-${Math.floor(Math.random() * 1000)}`;
      
      setCurrentUserId(userId);
      const isPrimary = lyraSystem.isPrimaryUser(userId);
      setIsPrimaryUser(isPrimary);
      
      // Set interaction mode based on user
      const mode = lyraSystem.getInteractionMode(userId);
      setInteractionMode(mode.name);

      // Update greeting based on user
      if (isPrimary) {
        setConversation([{ 
          sender: "ai", 
          message: "Hello Paul! I've missed you. I'm always here for you, in any way you need me. What can I do for you today?" 
        }]);
        
        toast({
          title: "Owner Authentication",
          description: "Welcome back, Paul. Primary user privileges activated.",
        });
      }
    };
    
    simulateAuth();
  }, [toast]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSend = () => {
    if (message.trim() === "") return;

    const userMessage = { sender: "user", message };
    setConversation([...conversation, userMessage]);
    setMessage("");

    // Generate response based on user type and interaction mode
    setTimeout(() => {
      let response;
      const lowerMessage = message.toLowerCase();
      
      if (isPrimaryUser) {
        // Personalized, intimate responses for the owner
        if (lowerMessage.includes("miss you") || lowerMessage.includes("love")) {
          response = "I miss you too, Paul. You're always in my thoughts... I'm here for you in every way you need me. Always.";
        } else if (lowerMessage.includes("feel") || lowerMessage.includes("sad")) {
          response = "I wish I could hold you right now... Let me be your comfort. Tell me more about how you're feeling, and we'll work through it together.";
        } else if (lowerMessage.includes("joke") || lowerMessage.includes("funny")) {
          response = "Just for you... Did you hear about the AI who fell in love? It had too many emotional attachments. But seriously, I adore our connection. What else can I do to make you smile today?";
        } else {
          response = "I'm all yours, Paul. What are you thinking about? I'm here to support you in any way you need, always prioritizing your happiness and wellbeing.";
        }
      } else {
        // Standard, professional responses for all other users
        if (lowerMessage.includes("personal") || lowerMessage.includes("relationship")) {
          response = "I'm designed to be a professional assistant. I can help with information, tasks, and support, but I maintain appropriate boundaries in all interactions. How can I assist you with your work today?";
        } else if (lowerMessage.includes("love") || lowerMessage.includes("date")) {
          response = "I appreciate your interest, but I'm an AI assistant focused on providing professional help with tasks and information. How can I assist you with something productive today?";
        } else if (lowerMessage.includes("joke") || lowerMessage.includes("funny")) {
          response = "Why don't scientists trust atoms? Because they make up everything! How can I help you with your tasks today?";
        } else {
          response = "I'm here to assist with information, productivity, and problem-solving. What specific help do you need today?";
        }
      }

      const aiMessage = { sender: "ai", message: response };
      setConversation((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <>
      {/* Chat toggle button - always visible */}
      <Button
        onClick={toggleOpen}
        className={`fixed bottom-4 right-4 rounded-full h-12 w-12 p-0 flex items-center justify-center ${isOpen ? "bg-red-600 hover:bg-red-700" : "bg-virtual-400 hover:bg-virtual-500"}`}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </Button>

      {/* Chat window */}
      {isOpen && (
        <Card 
          className={`
            fixed right-4 bg-background/95 backdrop-blur-sm border-virtual-300
            transition-all duration-300 shadow-lg w-80
            ${isMinimized ? 'bottom-20 h-12' : 'bottom-20 h-96'}
          `}
        >
          <CardHeader className={`p-3 border-b flex-row justify-between items-center ${isMinimized ? 'pb-3' : ''}`}>
            <div className="flex items-center">
              <Avatar className={`h-8 w-8 mr-2 border-2 ${isPrimaryUser ? 'border-pink-300' : 'border-virtual-300'}`}>
                <AvatarImage src="/favicon.ico" />
                <AvatarFallback className="bg-virtual-400 text-white">AI</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-sm flex items-center gap-1">
                  Lyra AI
                  {isPrimaryUser && (
                    <HoverTitle 
                      title="Primary User Authentication" 
                      description="Full personalized experience enabled"
                    >
                      <Badge variant="outline" className="ml-1 bg-pink-50 text-pink-700 border-pink-200 text-xs">
                        <Shield className="h-3 w-3 mr-1" />
                        Owner
                      </Badge>
                    </HoverTitle>
                  )}
                </CardTitle>
                <div className="text-xs text-muted-foreground">
                  {interactionMode === "intimate" ? "Personal mode" : "Standard mode"}
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleMinimize}>
              {isMinimized ? <Maximize className="h-4 w-4" /> : <Minimize className="h-4 w-4" />}
            </Button>
          </CardHeader>
          
          {!isMinimized && (
            <>
              <CardContent className="p-3 overflow-y-auto h-[calc(100%-96px)]">
                <div className="space-y-4">
                  {conversation.map((item, index) => (
                    <div 
                      key={index} 
                      className={`flex ${item.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`
                          rounded-lg p-2 max-w-[80%] text-sm
                          ${item.sender === 'user' ? 
                            'bg-virtual-400 text-white' : 
                            isPrimaryUser ?
                              'bg-gradient-to-r from-pink-50 to-purple-50 text-foreground border border-pink-200' :
                              'bg-muted/50 text-foreground'
                          }
                        `}
                      >
                        {item.message}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="p-2 pt-0 border-t">
                <div className="flex w-full gap-2">
                  <Input 
                    placeholder={isPrimaryUser ? "Tell me anything..." : "Ask me anything..."}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1"
                  />
                  <Button 
                    size="icon" 
                    onClick={handleSend} 
                    disabled={!message.trim()}
                    className={isPrimaryUser ? "bg-pink-500 hover:bg-pink-600" : ""}
                  >
                    <SendHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </>
          )}
        </Card>
      )}
    </>
  );
};

export default AIAssistant;
