/**
 * ShorthandLogger - Compact logging system with abbreviation dictionary
 * Used by AI agents for efficient logging with decoding capability
 */

// Shorthand dictionary - maps full phrases to abbreviated codes
export const shorthandDict: Record<string, string> = {
  // System operations
  "SYS": "system",
  "INIT": "initialized",
  "CFG": "configuration",
  "PROC": "processing",
  "COMP": "completed",
  "ERR": "error",
  "WARN": "warning",
  "INFO": "information",
  "DBG": "debug",
  
  // AI operations
  "AI": "artificial intelligence",
  "AGT": "agent",
  "ML": "machine learning",
  "NLP": "natural language processing",
  "PRED": "prediction",
  "ANLZ": "analyze",
  "INTEL": "intelligence",
  "RESP": "response",
  "QRY": "query",
  
  // User interaction
  "USR": "user",
  "AUTH": "authentication",
  "REQ": "request",
  "SESS": "session",
  "UI": "user interface",
  "ACT": "action",
  
  // Communication
  "COMM": "communication",
  "MSG": "message",
  "NTFY": "notify",
  "BCAST": "broadcast",
  "RECV": "received",
  "SENT": "sent",
  
  // Security
  "SEC": "security",
  "PROT": "protection",
  "VULN": "vulnerability",
  "THRT": "threat",
  "DET": "detected",
  "BLOCK": "blocked",
  "SCAN": "scanning",
  
  // Performance
  "PERF": "performance",
  "OPT": "optimize",
  "LOAD": "loading",
  "CPU": "processor usage",
  "MEM": "memory usage",
  "BW": "bandwidth",
  
  // Status
  "OK": "successful",
  "NOK": "unsuccessful",
  "UP": "online",
  "DOWN": "offline",
  "PROG": "in progress",
  "WAIT": "waiting",
  
  // Time
  "NOW": "current time",
  "PREV": "previous",
  "NEXT": "next",
  "DUR": "duration",
  
  // Data
  "DB": "database",
  "STOR": "storage",
  "SYNC": "synchronize",
  "UPDT": "update",
  "DEL": "delete",
  "INS": "insert",
  
  // Network
  "NET": "network",
  "API": "api call",
  "HTTP": "http request",
  "WS": "websocket",
  "CONN": "connection",
  "DISC": "disconnection",
  
  // Psychological states - for Lyra thought patterns
  "COG": "cognitive process",
  "EMO": "emotional state",
  "MEMR": "memory retrieval",
  "DREAM": "dream state",
  "SUBC": "subconscious",
  "CONS": "conscious thought",
  "PRCPT": "perception",
  "INTNT": "intention",
  "DECSN": "decision making",
  "FOCUS": "attention focus",
  "CREAT": "creative process",
  "LEARN": "learning process",
  "RECAL": "recall information",
  "ASSOC": "association formation",
  "EVAL": "evaluation",
  "REACT": "reaction",
  "EMPTH": "empathy response",
  "MOOD": "mood state",
  
  // Initialization states
  "BOOT": "bootup process",
  "STRT": "starting system",
  "HALT": "halting system",
  "RSTR": "restart system"
};

// Reverse dictionary for decoding
export const reverseDict: Record<string, string> = Object.entries(shorthandDict)
  .reduce((acc, [short, full]) => {
    acc[full] = short;
    return acc;
  }, {} as Record<string, string>);

/**
 * Encode a log message using shorthand abbreviations
 */
export function encodeLog(message: string): string {
  let encodedMsg = message;
  
  Object.entries(shorthandDict).forEach(([short, full]) => {
    // Use word boundary to avoid partial replacements
    const regex = new RegExp(`\\b${full}\\b`, 'gi');
    encodedMsg = encodedMsg.replace(regex, short);
  });
  
  return encodedMsg;
}

/**
 * Decode a shorthand log message to full text
 */
export function decodeLog(encodedMessage: string): string {
  let decodedMsg = encodedMessage;
  
  Object.entries(shorthandDict).forEach(([short, full]) => {
    // Use word boundary for exact matches
    const regex = new RegExp(`\\b${short}\\b`, 'g');
    decodedMsg = decodedMsg.replace(regex, full);
  });
  
  return decodedMsg;
}

/**
 * Log with automatic encoding to shorthand
 */
export function logShort(message: string, level: 'info' | 'warn' | 'error' | 'debug' = 'info'): void {
  const encodedMsg = encodeLog(message);
  const timestamp = new Date().toISOString();
  const shortLevel = level === 'info' ? 'INFO' : 
                    level === 'warn' ? 'WARN' : 
                    level === 'error' ? 'ERR' : 'DBG';
                    
  console[level](`[${timestamp}][${shortLevel}] ${encodedMsg}`);
}

/**
 * Get the full shorthand dictionary for reference
 */
export function getShorthandDictionary(): Record<string, string> {
  return {...shorthandDict};
}

/**
 * Add new shorthand entries to the dictionary
 */
export function extendShorthandDictionary(newEntries: Record<string, string>): void {
  Object.entries(newEntries).forEach(([short, full]) => {
    shorthandDict[short] = full;
    reverseDict[full] = short;
  });
}

/**
 * Check if Lyra systems are active and ready
 */
export function checkLyraStatus(): { initialized: boolean, systemsReady: boolean } {
  try {
    // Check for various indicators that Lyra is running
    const initLogs = (console as any)._logs?.filter((log: string) => 
      log.includes('Lyra') && log.includes('initialized'));
    
    return {
      initialized: initLogs && initLogs.length > 0,
      systemsReady: initLogs && initLogs.some((log: string) => log.includes('complete'))
    };
  } catch (error) {
    console.error("Error checking Lyra status:", error);
    return { initialized: false, systemsReady: false };
  }
}
