
type SafetyFlag = {
  type: 'security' | 'performance' | 'access';
  status: boolean;
  lastCheck: Date;
};

class SafetyControls {
  private static instance: SafetyControls;
  private safetyFlags: Map<string, SafetyFlag>;
  private authorizedUsers: Set<string>;

  private constructor() {
    this.safetyFlags = new Map();
    this.authorizedUsers = new Set();
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
