
import { useState } from "react";
import { Bot, X, Minimize, Maximize, SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([
    { 
      sender: "ai", 
      message: "Hello! I'm your SecondLife Assistant. I can help you find blood dolls, vampire masters, or navigate the virtual worlds. How can I assist you today?" 
    },
  ]);

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

    // Simulate AI response
    setTimeout(() => {
      let response;
      const lowerMessage = message.toLowerCase();
      
      if (lowerMessage.includes("blood") && lowerMessage.includes("doll")) {
        response = "I can help you find blood dolls. Would you like to browse the Blood Market or schedule a meeting with one?";
      } else if (lowerMessage.includes("vampire") || lowerMessage.includes("master")) {
        response = "Looking for vampire masters? The Blood Market has several powerful masters seeking companions.";
      } else if (lowerMessage.includes("world") || lowerMessage.includes("location")) {
        response = "There are many virtual worlds you can explore. Popular ones include Virtual Berlin, Fantasy Realm, and Tokyo Nights. Would you like me to suggest one based on your interests?";
      } else {
        response = "I'm here to assist with your SecondLife experience. Ask me about blood dolls, vampire masters, virtual worlds, or any other SecondLife-related topics.";
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
              <Avatar className="h-8 w-8 mr-2 border-2 border-virtual-300">
                <AvatarImage src="/favicon.ico" />
                <AvatarFallback className="bg-virtual-400 text-white">AI</AvatarFallback>
              </Avatar>
              <CardTitle className="text-sm">SecondLife AI Assistant</CardTitle>
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
                    placeholder="Ask me anything..." 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1"
                  />
                  <Button size="icon" onClick={handleSend} disabled={!message.trim()}>
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
