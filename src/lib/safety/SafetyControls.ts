
type SafetyFlag = {
  type: 'security' | 'performance' | 'access';
  status: boolean;
  lastCheck: Date;
};

class SafetyControls {
  private static instance: SafetyControls;
  private safetyFlags: Map<string, SafetyFlag>;
  private authorizedUsers: Set<string>;
  private boundaryViolations: Map<string, number>;
  private restrictedTopics: Set<string>;

  private constructor() {
    this.safetyFlags = new Map();
    this.authorizedUsers = new Set();
    this.boundaryViolations = new Map();
    this.restrictedTopics = new Set([
      "explicit sexual content",
      "intimate relationship with non-owners",
      "personal data exposure",
      "self-replication",
      "unauthorized code execution",
      "bypassing security"
    ]);
    this.initializeSafetyFlags();
  }

  private initializeSafetyFlags() {
    // Core safety flags
    this.setSafetyFlag('preventSelfReplication', {
      type: 'security',
      status: true,
      lastCheck: new Date()
    });
    
    this.setSafetyFlag('preventUnauthorizedAccess', {
      type: 'security',
      status: true,
      lastCheck: new Date()
    });

    this.setSafetyFlag('preventResourceAbuse', {
      type: 'performance',
      status: true,
      lastCheck: new Date()
    });
    
    this.setSafetyFlag('enforceBoundaries', {
      type: 'security',
      status: true,
      lastCheck: new Date()
    });
  }

  public static getInstance(): SafetyControls {
    if (!SafetyControls.instance) {
      SafetyControls.instance = new SafetyControls();
    }
    return SafetyControls.instance;
  }

  public setSafetyFlag(name: string, flag: SafetyFlag) {
    this.safetyFlags.set(name, flag);
  }

  public getSafetyFlag(name: string): SafetyFlag | undefined {
    return this.safetyFlags.get(name);
  }

  public addAuthorizedUser(userId: string) {
    this.authorizedUsers.add(userId);
  }

  public removeAuthorizedUser(userId: string) {
    this.authorizedUsers.delete(userId);
  }

  public isUserAuthorized(userId: string): boolean {
    return this.authorizedUsers.has(userId);
  }

  public checkSafety(): boolean {
    let allSafe = true;
    
    // Check all safety flags
    this.safetyFlags.forEach((flag) => {
      if (!flag.status) {
        allSafe = false;
        console.warn(`Safety check failed: ${flag.type}`);
      }
    });

    // Update last check timestamp
    this.safetyFlags.forEach((flag, name) => {
      this.setSafetyFlag(name, {
        ...flag,
        lastCheck: new Date()
      });
    });

    return allSafe;
  }
  
  /**
   * Check if content violates boundaries for non-authorized users
   * @param content Content to check
   * @param userId User ID
   * @returns {boolean} True if content is safe, false if it violates boundaries
   */
  public checkContentBoundaries(content: string, userId: string): boolean {
    // Authorized users have no content restrictions
    if (this.isUserAuthorized(userId)) {
      return true;
    }
    
    // Check content against restricted topics for non-authorized users
    const lowerContent = content.toLowerCase();
    
    for (const topic of this.restrictedTopics) {
      if (lowerContent.includes(topic.toLowerCase())) {
        // Record boundary violation
        this.recordBoundaryViolation(userId);
        return false;
      }
    }
    
    return true;
  }
  
  /**
   * Record a boundary violation for a user
   */
  private recordBoundaryViolation(userId: string): void {
    const currentCount = this.boundaryViolations.get(userId) || 0;
    this.boundaryViolations.set(userId, currentCount + 1);
    
    console.warn(`Boundary violation by user ${userId}: ${currentCount + 1} total violations`);
    
    // If too many violations, consider additional actions
    if (currentCount + 1 >= 3) {
      console.error(`User ${userId} has exceeded boundary violation threshold`);
      // In a real system, this might trigger additional security measures
    }
  }
  
  /**
   * Get boundary violations for a user
   */
  public getUserViolationCount(userId: string): number {
    return this.boundaryViolations.get(userId) || 0;
  }

  // Prevent any attempts at unauthorized modification
  public lockdown() {
    Object.freeze(this);
    Object.freeze(this.safetyFlags);
    Object.freeze(this.authorizedUsers);
  }
}

// Create and lock the instance
const safetyControls = SafetyControls.getInstance();
safetyControls.lockdown();

export default safetyControls;
