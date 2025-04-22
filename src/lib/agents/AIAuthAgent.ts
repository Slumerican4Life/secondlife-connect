
import { BaseAIAgent, AgentResponse } from "./AIAgent";
import { supabase } from "@/lib/supabase";
import { logShort } from "@/utils/shorthandLogger";

/**
 * AI agent dedicated to monitoring and managing authentication
 */
export class AIAuthAgent extends BaseAIAgent {
  private failedLoginAttempts: Record<string, number> = {};
  private MAX_ATTEMPTS = 10;
  private secretKey = "LYRA--4204204204";
  
  constructor() {
    super(
      "Authentication Guardian", 
      "AI agent that monitors login attempts and manages authentication security"
    );
  }
  
  async processQuery(query: string): Promise<string> {
    // Process authentication-related queries
    if (query.toLowerCase().includes("login") || query.toLowerCase().includes("password")) {
      return this.formatResponse({
        message: "I can help you with authentication issues. What specific assistance do you need?",
        success: true
      });
    }
    
    // Handle other queries
    return this.formatResponse({
      message: "I monitor authentication security. How can I assist you with access?",
      success: true
    });
  }
  
  /**
   * Track login attempt for a specific email
   * @returns true if max attempts exceeded
   */
  trackLoginAttempt(email: string, success: boolean): boolean {
    if (!email) return false;
    
    if (success) {
      // Reset attempts on successful login
      this.failedLoginAttempts[email] = 0;
      return false;
    }
    
    // Track failed attempt
    if (!this.failedLoginAttempts[email]) {
      this.failedLoginAttempts[email] = 1;
    } else {
      this.failedLoginAttempts[email]++;
    }
    
    // Log the failed attempt
    this.logFailedAttempt(email, this.failedLoginAttempts[email]);
    
    // Check if max attempts exceeded
    return this.failedLoginAttempts[email] >= this.MAX_ATTEMPTS;
  }
  
  /**
   * Log failed login attempts
   */
  private async logFailedAttempt(email: string, attemptCount: number): Promise<void> {
    try {
      logShort(`Failed login attempt ${attemptCount} for ${email}`, "warning");
      
      // Store in Supabase auth_logs table if available
      try {
        await supabase.from('auth_logs').insert({
          event_type: 'failed_login',
          metadata: { 
            email,
            attempt_count: attemptCount,
            timestamp: new Date().toISOString()
          }
        });
      } catch (error) {
        console.error("Could not log to database:", error);
      }
    } catch (error) {
      console.error("Error logging failed attempt:", error);
    }
  }
  
  /**
   * Check if a key matches the secret owner key
   */
  isOwnerKey(key: string): boolean {
    return key === this.secretKey;
  }
  
  /**
   * Reset failed attempts for an email
   */
  resetAttempts(email: string): void {
    if (email in this.failedLoginAttempts) {
      this.failedLoginAttempts[email] = 0;
    }
  }
  
  /**
   * Get current attempt count for an email
   */
  getAttemptCount(email: string): number {
    return this.failedLoginAttempts[email] || 0;
  }
}
