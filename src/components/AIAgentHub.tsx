
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { AgentManager } from "@/lib/agents/AgentManager";
import { 
  Bot, HelpCircle, FileText, BarChart3, Heart, Home, 
  ShoppingBag, Brain, DollarSign, Shield, Newspaper, Eye 
} from "lucide-react";
import { toast } from "sonner";

// Agent tab configuration for better organization
const AGENT_TABS = [
  { id: "help", icon: HelpCircle, label: "Help", description: "Get help with platform features and issues" },
  { id: "posting", icon: FileText, label: "Posts", description: "Create engaging posts and optimize content" },
  { id: "advertising", icon: BarChart3, label: "Ads", description: "Organize and optimize your advertisements" },
  { id: "dating", icon: Heart, label: "Dating", description: "Find compatible matches and improve your dating profile" },
  { id: "realestate", icon: Home, label: "Homes", description: "Discover and evaluate virtual properties" },
  { id: "marketplace", icon: ShoppingBag, label: "Market", description: "Buy and sell items with AI assistance" },
  { id: "intelligence", icon: Brain, label: "Intel", description: "Access platform trends and insights" },
  { id: "monetization", icon: DollarSign, label: "Money", description: "Maximize revenue streams and monetization options" },
  { id: "monitor", icon: Eye, label: "Watch", description: "System monitoring and issue detection" },
];

// AgentTab component for better organization
const AgentTab = ({ tab }) => (
  <TabsTrigger value={tab.id} className="flex flex-col items-center text-xs p-2">
    <tab.icon className="h-4 w-4 mb-1" />
    {tab.label}
  </TabsTrigger>
);

// AgentContent component for better organization
const AgentContent = ({ 
  tab, 
  query, 
  setQuery, 
  handleQuerySubmit, 
  isProcessing, 
  response,
  handleSuggestionClick 
}) => (
  <TabsContent key={tab.id} value={tab.id} className="mt-4">
    <Card className="border-none shadow-none">
      <CardHeader className="p-3">
        <CardTitle className="text-sm">
          {tab.label} Assistant
        </CardTitle>
        <CardDescription className="text-xs">
          {tab.description}
        </CardDescription>
      </CardHeader>
    </Card>
    
    <form onSubmit={handleQuerySubmit} className="space-y-4 mt-2">
      <div className="flex gap-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Ask the ${tab.label.toLowerCase()} assistant...`}
          className="flex-1"
        />
        <Button type="submit" disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Send"}
        </Button>
      </div>
    </form>
    
    {response && <ResponseDisplay response={response} onSuggestionClick={handleSuggestionClick} />}
  </TabsContent>
);

// ResponseDisplay component for better organization
const ResponseDisplay = ({ response, onSuggestionClick }) => (
  <Card className="mt-4 bg-muted/50">
    <CardContent className="p-4">
      <p>{response.message}</p>
      
      {response.data && (
        <div className="mt-2 text-sm">
          <pre className="bg-black/20 p-2 rounded overflow-auto">
            {JSON.stringify(response.data, null, 2)}
          </pre>
        </div>
      )}
      
      {response.suggestions && response.suggestions.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Suggestions:</p>
          <div className="flex flex-wrap gap-2">
            {response.suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => onSuggestionClick(suggestion)}
                className="text-xs"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}
    </CardContent>
  </Card>
);

const AIAgentHub = () => {
  const [activeAgentTab, setActiveAgentTab] = useState("help");
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [agentManager, setAgentManager] = useState(null);

  useEffect(() => {
    // Initialize agent manager
    const manager = AgentManager.getInstance();
    setAgentManager(manager);
    
    // Log initialization for monitor
    if (manager) {
      try {
        const monitorAgent = manager.getMonitorAgent();
        if (monitorAgent) {
          monitorAgent.recordEvent({
            type: "system_init",
            source: "ai_agent_hub",
            details: {
              timestamp: new Date(),
              component: "AIAgentHub",
              status: "initialized"
            }
          });
        }
      } catch (e) {
        console.error("Failed to log initialization to monitor:", e);
      }
    }
  }, []);

  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    
    if (!query.trim() || !agentManager) return;
    
    setIsProcessing(true);
    
    try {
      // Log the query to monitor
      try {
        const monitorAgent = agentManager.getMonitorAgent();
        monitorAgent?.recordEvent({
          type: "query_submitted",
          source: "ai_agent_hub",
          details: {
            query,
            agent: activeAgentTab,
            timestamp: new Date()
          }
        });
      } catch (e) {
        console.error("Monitor logging failed:", e);
      }
      
      // Process query with selected agent
      let agentResponse;
      
      switch (activeAgentTab) {
        case "help":
          agentResponse = await agentManager.getHelpAgent().processQuery(query);
          break;
        case "posting":
          agentResponse = await agentManager.getPostingAgent().processQuery(query);
          break;
        case "advertising":
          agentResponse = await agentManager.getAdvertisingAgent().processQuery(query);
          break;
        case "dating":
          agentResponse = await agentManager.getDatingAgent().processQuery(query);
          break;
        case "realestate":
          agentResponse = await agentManager.getRealEstateAgent().processQuery(query);
          break;
        case "marketplace":
          agentResponse = await agentManager.getMarketplaceAgent().processQuery(query);
          break;
        case "intelligence":
          agentResponse = await agentManager.getIntelligenceAgent().processQuery(query);
          break;
        case "monetization":
          agentResponse = await agentManager.getMonetizationAgent().processQuery(query);
          break;
        case "monitor":
          agentResponse = await agentManager.getMonitorAgent().processQuery(query);
          break;
        default:
          agentResponse = '{"message": "Select an agent first", "success": false}';
      }
      
      const parsedResponse = JSON.parse(agentResponse);
      setResponse(parsedResponse);
      
      // Log the response to monitor
      try {
        const monitorAgent = agentManager.getMonitorAgent();
        monitorAgent?.recordEvent({
          type: "query_response",
          source: "ai_agent_hub",
          details: {
            agent: activeAgentTab,
            success: parsedResponse.success,
            timestamp: new Date()
          }
        });
      } catch (e) {
        console.error("Monitor logging failed:", e);
      }
      
      if (parsedResponse.success) {
        toast.success("AI Agent responded successfully");
      } else {
        toast.error("AI Agent encountered an issue");
      }
    } catch (error) {
      console.error("Error processing query:", error);
      toast.error("Failed to process your request");
      
      // Log error to monitor
      try {
        const monitorAgent = agentManager.getMonitorAgent();
        monitorAgent?.recordEvent({
          type: "query_error",
          source: "ai_agent_hub",
          details: {
            agent: activeAgentTab,
            error: error.message,
            timestamp: new Date()
          },
          severity: "error"
        });
      } catch (e) {
        console.error("Monitor error logging failed:", e);
      }
      
      setResponse({
        message: "There was an error processing your request. Please try again.",
        success: false
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto glass-morphism">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-6 w-6 text-virtual-400" />
          AI Agent Hub
        </CardTitle>
        <CardDescription>
          Interact with specialized AI agents to get help across different aspects of SecondLife
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeAgentTab} onValueChange={setActiveAgentTab} className="w-full">
          <TabsList className="grid grid-cols-9">
            {AGENT_TABS.map(tab => (
              <AgentTab key={tab.id} tab={tab} />
            ))}
          </TabsList>
          
          {AGENT_TABS.map(tab => (
            <AgentContent 
              key={tab.id}
              tab={tab} 
              query={query} 
              setQuery={setQuery}
              handleQuerySubmit={handleQuerySubmit}
              isProcessing={isProcessing}
              response={response}
              handleSuggestionClick={handleSuggestionClick}
            />
          ))}
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-between text-xs text-muted-foreground">
        <p>AI Agent system is in beta</p>
        <Button variant="link" size="sm" className="p-0 h-auto text-xs">
          Learn more about our AI agents
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AIAgentHub;
