import { AIHelpAgent } from "./AIHelpAgent";
import { AIPostingAgent } from "./AIPostingAgent";
import { AIAdvertisingAgent } from "./AIAdvertisingAgent";
import { AIDatingAgent } from "./AIDatingAgent";
import { AIRealEstateAgent } from "./AIRealEstateAgent";
import { AIMarketplaceAgent } from "./AIMarketplaceAgent";
import { AIIntelligenceAgent } from "./AIIntelligenceAgent";
import { AIMonetizationAgent } from "./AIMonetizationAgent";
import { AIContentAgent } from "./AIContentAgent";  
import { AINewsAgent } from "./AINewsAgent";        
import { AIResearchAgent } from "./AIResearchAgent"; 
import { AILindenAgent } from "./AILindenAgent";  
import { AIMonitorAgent } from "./AIMonitorAgent";  // Added import

/**
 * Central manager for all AI agents in the system.
 * Coordinates interactions between agents and provides a unified interface.
 */
export class AgentManager {
  private static instance: AgentManager;
  
  private helpAgent: AIHelpAgent;
  private postingAgent: AIPostingAgent;
  private advertisingAgent: AIAdvertisingAgent;
  private datingAgent: AIDatingAgent;
  private realEstateAgent: AIRealEstateAgent;
  private marketplaceAgent: AIMarketplaceAgent;
  private intelligenceAgent: AIIntelligenceAgent;
  private monetizationAgent: AIMonetizationAgent;
  private contentAgent: AIContentAgent;
  private newsAgent: AINewsAgent;
  private researchAgent: AIResearchAgent;
  private lindenAgent: AILindenAgent;
  private monitorAgent: AIMonitorAgent;  // Added property

  private constructor() {
    // Initialize all agents
    this.helpAgent = new AIHelpAgent();
    this.postingAgent = new AIPostingAgent();
    this.advertisingAgent = new AIAdvertisingAgent();
    this.datingAgent = new AIDatingAgent();
    this.realEstateAgent = new AIRealEstateAgent();
    this.marketplaceAgent = new AIMarketplaceAgent();
    this.intelligenceAgent = new AIIntelligenceAgent(this);
    this.monetizationAgent = new AIMonetizationAgent();
    this.contentAgent = new AIContentAgent();
    this.newsAgent = new AINewsAgent();
    this.researchAgent = new AIResearchAgent();
    this.lindenAgent = new AILindenAgent();
    this.monitorAgent = new AIMonitorAgent(this);  // Initialize monitor agent
  }

  public static getInstance(): AgentManager {
    if (!AgentManager.instance) {
      AgentManager.instance = new AgentManager();
    }
    return AgentManager.instance;
  }

  public getHelpAgent(): AIHelpAgent {
    return this.helpAgent;
  }

  public getPostingAgent(): AIPostingAgent {
    return this.postingAgent;
  }

  public getAdvertisingAgent(): AIAdvertisingAgent {
    return this.advertisingAgent;
  }

  public getDatingAgent(): AIDatingAgent {
    return this.datingAgent;
  }

  public getRealEstateAgent(): AIRealEstateAgent {
    return this.realEstateAgent;
  }

  public getMarketplaceAgent(): AIMarketplaceAgent {
    return this.marketplaceAgent;
  }

  public getIntelligenceAgent(): AIIntelligenceAgent {
    return this.intelligenceAgent;
  }
  
  public getMonetizationAgent(): AIMonetizationAgent {
    return this.monetizationAgent;
  }
  
  public getContentAgent(): AIContentAgent {
    return this.contentAgent;
  }
  
  public getNewsAgent(): AINewsAgent {
    return this.newsAgent;
  }
  
  public getResearchAgent(): AIResearchAgent {
    return this.researchAgent;
  }

  public getLindenAgent(): AILindenAgent {
    return this.lindenAgent;
  }

  public getMonitorAgent(): AIMonitorAgent {
    return this.monitorAgent;
  }

  public shareIntelligence(data: any, targetAgents: string[]): void {
    // Implementation for sharing intelligence data between agents
    console.log(`Sharing intelligence data with ${targetAgents.join(', ')}`);
    
    // Process the data and distribute to relevant agents
    targetAgents.forEach(agent => {
      switch(agent) {
        case 'help':
          this.helpAgent.receiveIntelligence(data);
          break;
        case 'posting':
          this.postingAgent.receiveIntelligence(data);
          break;
        case 'advertising':
          this.advertisingAgent.receiveIntelligence(data);
          break;
        case 'dating':
          this.datingAgent.receiveIntelligence(data);
          break;
        case 'realEstate':
          this.realEstateAgent.receiveIntelligence(data);
          break;
        case 'marketplace':
          this.marketplaceAgent.receiveIntelligence(data);
          break;
        case 'monetization':
          this.monetizationAgent.receiveIntelligence(data);
          break;
        case 'content':
          this.contentAgent.receiveIntelligence(data);
          break;
        case 'news':
          this.newsAgent.receiveIntelligence(data);
          break;
        case 'research':
          this.researchAgent.receiveIntelligence(data);
          break;
        case 'linden':
          this.lindenAgent.receiveIntelligence(data);
          break;
        case 'intelligence':
          this.intelligenceAgent.receiveIntelligence(data);
          break;
        case 'monitor':
          this.monitorAgent.receiveIntelligence(data);
          break;
      }
    });
    
    // Also record this sharing as an event
    this.monitorAgent.recordEvent({
      type: "intel_share",
      source: "agent_manager",
      details: {
        targets: targetAgents,
        dataType: data.type,
        timestamp: new Date()
      }
    });
  }
}
