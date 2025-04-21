
import { BaseAIAgent } from "./AIAgent";
import { AgentManager } from "./AgentManager";

/**
 * An advanced monitoring agent that observes system behavior,
 * detects anomalies, and assists in problem resolution
 */
export class AIMonitorAgent extends BaseAIAgent {
  private incidentLog: Record<string, any>[] = [];
  private agentMgr: AgentManager;
  private probAnalyzer: ProblemAnalyzer;
  
  constructor(agentManager: AgentManager) {
    super(
      "Monitor", 
      "Observes system events, detects issues, and assists in problem resolution"
    );
    this.agentMgr = agentManager;
    this.probAnalyzer = new ProblemAnalyzer();
  }
  
  /**
   * Proc query & return structured resp
   */
  async processQuery(query: string): Promise<string> {
    const qLow = query.toLowerCase();
    
    if (qLow.includes("monitor") || qLow.includes("watch")) {
      return this.formatResponse({
        message: "Monitoring active. I'm watching system events and interactions.",
        success: true,
        data: {
          activeMonitoring: true,
          incidentCount: this.incidentLog.length,
          systemStatus: this.getSystemHealth()
        }
      });
    }
    
    if (qLow.includes("incident") || qLow.includes("issue")) {
      return this.formatResponse({
        message: "Recent incident log:",
        success: true,
        data: {
          incidents: this.incidentLog.slice(-5),
          summary: this.getIncidentSummary()
        }
      });
    }
    
    // Default response
    return this.formatResponse({
      message: "Monitor agent ready. What would you like me to observe?",
      success: true,
      suggestions: [
        "Show active monitoring",
        "View recent incidents",
        "Analyze system health",
        "Start focused observation"
      ]
    });
  }
  
  /**
   * Record witnessed event with context
   */
  recordEvent(event: {
    type: string;
    source: string;
    details: any;
    timestamp?: Date;
  }): void {
    const timestamp = event.timestamp || new Date();
    
    this.incidentLog.push({
      ...event,
      timestamp,
      id: `inc-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    });
    
    console.log(`[Monitor] Recorded ${event.type} from ${event.source}`);
    
    // Analyze if this is a potential issue
    if (this.isAnomaly(event)) {
      this.notifyIssue(event);
    }
  }
  
  /**
   * Analyze potential problem causes
   */
  analyzeProblemCauses(issue: string): {cause: string, probability: number}[] {
    return this.probAnalyzer.analyze(issue, this.incidentLog);
  }
  
  /**
   * Check if event is anomalous
   */
  private isAnomaly(event: any): boolean {
    // Pattern detection for common issues
    if (event.type === "error" || event.type === "exception") {
      return true;
    }
    
    if (event.details?.status >= 400) {
      return true;
    }
    
    // Resource util anomalies
    if (event.type === "resource" && 
        event.details?.usage > event.details?.threshold) {
      return true;
    }
    
    return false;
  }
  
  /**
   * Alert relevant agents of detected issue
   */
  private notifyIssue(event: any): void {
    // Determine which agents need to know
    const relevantAgents = this.determineRelevantAgents(event);
    
    // Share intel with those agents
    this.agentMgr.shareIntelligence({
      type: "anomaly_detected",
      data: {
        event,
        analysis: this.probAnalyzer.quickAnalysis(event),
        recommendations: this.probAnalyzer.suggestFixes(event)
      }
    }, relevantAgents);
    
    console.log(`[Monitor] Notified ${relevantAgents.join(", ")} about anomaly`);
  }
  
  /**
   * Get current system health metrics
   */
  private getSystemHealth(): Record<string, any> {
    // Simplified health metrics
    return {
      status: "optimal",
      errorRate: this.calcErrorRate(),
      responseTime: "120ms",
      loadLevel: "moderate",
      lastCheck: new Date().toISOString()
    };
  }
  
  /**
   * Calculate error rate from recent logs
   */
  private calcErrorRate(): number {
    const recentLogs = this.incidentLog.filter(log => 
      (new Date().getTime() - new Date(log.timestamp).getTime()) < 3600000
    );
    
    const errorLogs = recentLogs.filter(log => 
      log.type === "error" || log.type === "exception"
    );
    
    return recentLogs.length > 0 ? 
      parseFloat((errorLogs.length / recentLogs.length).toFixed(2)) : 0;
  }
  
  /**
   * Get summary of incident patterns
   */
  private getIncidentSummary(): Record<string, any> {
    // Group incidents by type
    const byType: Record<string, number> = {};
    
    this.incidentLog.forEach(inc => {
      byType[inc.type] = (byType[inc.type] || 0) + 1;
    });
    
    return {
      byType,
      mostCommon: Object.entries(byType)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([type, count]) => ({ type, count }))
    };
  }
  
  /**
   * Find relevant agents for an issue
   */
  private determineRelevantAgents(event: any): string[] {
    const agents = ["intelligence"];
    
    // Add specialized agents based on event type
    if (event.source === "marketplace" || event.type.includes("item")) {
      agents.push("marketplace");
    }
    
    if (event.source === "auth" || event.type.includes("user")) {
      agents.push("help");
    }
    
    if (event.source === "content" || event.type.includes("post")) {
      agents.push("posting");
    }
    
    // Always include monitor in notifications
    return agents;
  }
}

/**
 * Utility class for problem analysis
 */
class ProblemAnalyzer {
  analyze(issue: string, logs: any[]): {cause: string, probability: number}[] {
    // Simplified analysis
    const causes = [
      { cause: "Network connectivity", probability: 0.2 },
      { cause: "Authentication failure", probability: 0.3 },
      { cause: "Resource limitation", probability: 0.15 },
      { cause: "Input validation error", probability: 0.25 },
      { cause: "External service failure", probability: 0.1 }
    ];
    
    // In a real implementation, this would use log data to refine probabilities
    return causes.sort((a, b) => b.probability - a.probability);
  }
  
  quickAnalysis(event: any): string {
    if (event.type === "error" && event.details?.message) {
      if (event.details.message.includes("auth")) {
        return "Likely authentication issue";
      }
      if (event.details.message.includes("timeout")) {
        return "Possible network or service timeout";
      }
    }
    
    return "Requires further investigation";
  }
  
  suggestFixes(event: any): string[] {
    const suggestions = [];
    
    if (event.type === "error") {
      suggestions.push("Check service availability");
      suggestions.push("Verify authentication credentials");
    }
    
    if (event.source === "api") {
      suggestions.push("Validate API request parameters");
      suggestions.push("Check API response format");
    }
    
    if (suggestions.length === 0) {
      suggestions.push("Collect more diagnostic information");
    }
    
    return suggestions;
  }
}
