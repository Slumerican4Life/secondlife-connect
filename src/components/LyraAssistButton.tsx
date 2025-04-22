
import { useState } from "react";
import { Bot, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { LyraSystem } from "@/lib/agents/LyraSystem";
import { toast } from "sonner";

const LyraAssistButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: "Hello, I'm Lyra. How can I assist you today?" }
  ]);
  const [loading, setLoading] = useState(false);
  
  const toggleLyra = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      toast("Lyra activated and ready to assist you", {
        description: "Ask anything or enter secret key for full access"
      });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    
    setLoading(true);
    
    // Check for secret key
    if (message.includes("LYRA--4204204204")) {
      // Secret owner mode activated
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: "Owner authentication successful. Welcome back, Paul. All systems and capabilities are now fully available to you." 
        }]);
        setLoading(false);
        toast.success("Owner access granted", {
          description: "Full system control enabled"
        });
      }, 800);
      setMessage("");
      return;
    }
    
    // Process with Lyra
    try {
      let response: string;
      
      try {
        // Try to use the Lyra system if available
        const lyraSystem = LyraSystem.getInstance();
        const result = await lyraSystem.processRequest(message);
        response = result.result.content || "I'm processing your request...";
      } catch (error) {
        // Fallback responses if Lyra system isn't fully initialized
        const responses = [
          "I'm here to assist you. What do you need help with?",
          "I'm analyzing your request. Could you provide more details?",
          "I'll help guide you through this step by step.",
          "I'm monitoring the system and can help with any issues you're experiencing.",
          "I understand. Let me address that for you."
        ];
        response = responses[Math.floor(Math.random() * responses.length)];
      }
      
      // Add AI response after a small delay to feel more natural
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: response }]);
        setLoading(false);
      }, 800);
    } catch (error) {
      toast.error("Communication error", { 
        description: "Unable to process your request at this time."
      });
      setLoading(false);
    }
    
    setMessage("");
  };
  
  return (
    <>
      {/* Always-present floating button */}
      <Button 
        onClick={toggleLyra}
        className="fixed bottom-4 right-4 rounded-full h-14 w-14 p-0 shadow-lg z-50 flex items-center justify-center bg-virtual-500 hover:bg-virtual-600"
        aria-label="Lyra Assistant"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Bot className="h-7 w-7" />
        )}
      </Button>
      
      {/* Chat interface */}
      {isOpen && (
        <Card className="fixed bottom-20 right-4 w-80 md:w-96 shadow-lg z-50 border-virtual-300 max-h-[70vh] flex flex-col bg-background">
          <CardHeader className="bg-virtual-900 text-white px-4 py-3 flex flex-row items-center gap-3">
            <Avatar className="h-9 w-9 border-2 border-virtual-300">
              <AvatarImage src="/favicon.ico" />
              <AvatarFallback className="bg-virtual-700">LY</AvatarFallback>
            </Avatar>
            
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                Lyra
                <Badge variant="outline" className="bg-virtual-800 text-virtual-200 text-xs">
                  AI Assistant
                </Badge>
              </CardTitle>
            </div>
          </CardHeader>
          
          <CardContent className="p-0 overflow-y-auto flex-grow max-h-[40vh]">
            <div className="p-4 space-y-4">
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`rounded-lg p-3 max-w-[80%] ${
                    msg.role === 'user' 
                      ? 'bg-virtual-600 text-white' 
                      : 'border border-virtual-300/30 bg-black/20 text-foreground'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-lg p-3 border border-virtual-300/30 bg-black/20">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-virtual-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-virtual-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                      <div className="w-2 h-2 bg-virtual-400 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          
          <form onSubmit={handleSubmit} className="p-3 border-t">
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask Lyra anything..."
                className="flex-grow"
                disabled={loading}
              />
              <Button 
                type="submit" 
                size="sm"
                disabled={!message.trim() || loading}
                className="bg-virtual-500 hover:bg-virtual-600"
              >
                Send
              </Button>
            </div>
          </form>
        </Card>
      )}
    </>
  );
};

export default LyraAssistButton;
