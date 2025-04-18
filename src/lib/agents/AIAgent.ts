
export interface AIAgent {
  name: string;
  description: string;
  
  // Core methods all agents should implement
  processQuery(query: string): Promise<string>;
  receiveIntelligence(data: any): void;
  
  // Agent-specific functionality will be added in individual implementations
}

export interface AgentResponse {
  message: string;
  success: boolean;
  data?: any;
  suggestions?: string[];
}

// Base class for all AI agents
export abstract class BaseAIAgent implements AIAgent {
  name: string;
  description: string;
  
  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
  
  abstract processQuery(query: string): Promise<string>;
  
  receiveIntelligence(data: any): void {
    console.log(`${this.name} received intelligence data`, data);
    // Base implementation - to be overridden by specific agents as needed
  }
  
  protected async formatResponse(response: AgentResponse): Promise<string> {
    // Format response in a consistent way
    return JSON.stringify(response);
  }
}
