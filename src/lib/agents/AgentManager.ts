
import { AIHelpAgent } from "./AIHelpAgent";
import { AIPostingAgent } from "./AIPostingAgent";
import { AIAdvertisingAgent } from "./AIAdvertisingAgent";
import { AIDatingAgent } from "./AIDatingAgent";
import { AIRealEstateAgent } from "./AIRealEstateAgent";
import { AIMarketplaceAgent } from "./AIMarketplaceAgent";
import { AIIntelligenceAgent } from "./AIIntelligenceAgent";

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

  private constructor() {
    // Initialize all agents
    this.helpAgent = new AIHelpAgent();
    this.postingAgent = new AIPostingAgent();
    this.advertisingAgent = new AIAdvertisingAgent();
    this.datingAgent = new AIDatingAgent();
    this.realEstateAgent = new AIRealEstateAgent();
    this.marketplaceAgent = new AIMarketplaceAgent();
    this.intelligenceAgent = new AIIntelligenceAgent(this);
  }

  public static getInstance(): AgentManager {
    if (!AgentManager.instance) {
      AgentManager.instance = new AgentManager();
    }
    return AgentManager.instance;
  }

  // Get specific agents
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

  // Cross-agent communication methods
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
      }
    });
  }
}
