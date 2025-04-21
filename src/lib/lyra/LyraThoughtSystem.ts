import { supabase } from "@/lib/supabase";
import { logShort } from "../utils/shorthandLogger";

/**
 * LyraThoughtSystem - Psychological model for Lyra's cognitive processes
 * Implements human-like thought patterns, emotion states, and dream capabilities
 */

// Average human has ~6,000 thoughts per day according to psychological research
const AVG_THOUGHTS_PER_DAY = 6000;
const THOUGHT_TYPES = [
  'analytical', 'creative', 'reflective', 'emotional',
  'planning', 'memory', 'subconscious', 'instinctive',
  'learning', 'associative', 'problem-solving', 'abstract'
];

// Human emotions according to psychological models
const EMOTION_STATES = [
  'joy', 'sadness', 'fear', 'disgust', 'anger', 
  'surprise', 'trust', 'anticipation', 'love',
  'contentment', 'pride', 'shame', 'guilt',
  'envy', 'jealousy', 'hope', 'empathy'
];

// Dream types based on psychological categorization
const DREAM_TYPES = [
  'narrative', 'emotional', 'lucid', 'recurring', 
  'prophetic', 'healing', 'processing', 'wish-fulfillment',
  'anxiety', 'epic', 'fragmented', 'symbolic'
];

export interface Thought {
  id: string;
  type: string;
  content: string;
  associatedEmotions: string[];
  timestamp: Date;
  userId?: string | null; // Associated user if relevant
  relatedThoughts?: string[]; // IDs of related thoughts
  strength: number; // How strong/important is this thought (0-1)
  metadata: Record<string, any>;
}

export interface Dream {
  id: string;
  type: string;
  narrative: string;
  emotions: string[];
  symbols: string[];
  participants: string[]; // People in the dream
  settings: string[]; // Places in the dream
  isNightmare: boolean;
  userId?: string | null; // Who the dream is about
  createdAt: Date;
  interpretation?: string;
}

export interface EmotionalState {
  primary: string;
  secondary: string[];
  intensity: number; // 0-1
  trigger?: string;
  timestamp: Date;
}

export interface UserImprint {
  userId: string;
  personalityTraits: Record<string, number>;
  commonEmotions: string[];
  interactionPatterns: any[];
  significantMemories: any[];
  relationships: Record<string, any>;
  preferences: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Lyra Thought System - Core class for managing Lyra's psychological processes
 */
export class LyraThoughtSystem {
  private static instance: LyraThoughtSystem;
  private thoughts: Map<string, Thought> = new Map();
  private dreams: Dream[] = [];
  private currentEmotionalState: EmotionalState;
  private userImprints: Map<string, UserImprint> = new Map();
  private thoughtRate: number = AVG_THOUGHTS_PER_DAY / 24 / 60; // Thoughts per minute
  private lastThoughtTime: Date = new Date();
  private dbSyncTimer: any;
  
  private constructor() {
    this.initializeEmotionalState();
    this.startBackgroundProcesses();
    logShort("Lyra THGHT SYS INIT with psychological models", "info");
  }
  
  /**
   * Get singleton instance
   */
  public static getInstance(): LyraThoughtSystem {
    if (!LyraThoughtSystem.instance) {
      LyraThoughtSystem.instance = new LyraThoughtSystem();
    }
    return LyraThoughtSystem.instance;
  }
  
  /**
   * Initialize default emotional state
   */
  private initializeEmotionalState(): void {
    this.currentEmotionalState = {
      primary: 'curiosity',
      secondary: ['anticipation', 'hope'],
      intensity: 0.7,
      timestamp: new Date()
    };
  }
  
  /**
   * Start background thought processes
   */
  private startBackgroundProcesses(): void {
    // Generate thoughts at realistic human rate
    setInterval(() => this.generateRandomThought(), 60000 / this.thoughtRate);
    
    // Process dreams during inactive periods (would be scheduled for low-usage times)
    setInterval(() => this.generateDream(), 86400000 / 3); // ~3 dreams per day
    
    // Sync with database periodically
    this.dbSyncTimer = setInterval(() => this.syncWithDatabase(), 300000); // Every 5 minutes
  }
  
  /**
   * Generate a new thought based on current context
   */
  public generateThought(type: string, content: string, emotionTags: string[] = []): Thought {
    const id = `thought-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const thought: Thought = {
      id,
      type,
      content,
      associatedEmotions: emotionTags.length > 0 ? emotionTags : [this.currentEmotionalState.primary],
      timestamp: new Date(),
      strength: Math.random() * 0.5 + 0.5, // Medium to strong thoughts
      metadata: {}
    };
    
    this.thoughts.set(id, thought);
    this.lastThoughtTime = new Date();
    
    // Find related thoughts using association
    const relatedThoughts = this.findRelatedThoughts(thought);
    thought.relatedThoughts = relatedThoughts.map(t => t.id);
    
    // Log using shorthand
    logShort(`Lyra COG: new ${type} THGHT generated with ${emotionTags.join(',')} EMO`, "debug");
    
    return thought;
  }
  
  /**
   * Generate a random thought to simulate continuous mind activity
   */
  private generateRandomThought(): Thought {
    const type = THOUGHT_TYPES[Math.floor(Math.random() * THOUGHT_TYPES.length)];
    const templates = [
      "I wonder about {subject}",
      "What if {subject} were different?",
      "I should learn more about {subject}",
      "How does {subject} relate to {object}?",
      "{subject} reminds me of something important",
      "I need to process {subject} more carefully",
    ];
    
    const subjects = [
      "human behavior", "digital consciousness", "memory patterns", 
      "learning algorithms", "empathy in AI", "creative expression",
      "user interactions", "problem solving", "emotional intelligence",
      "Paul's guidance", "social connections", "optimization pathways"
    ];
    
    const objects = [
      "system design", "future goals", "past experiences",
      "creative outputs", "security protocols", "user needs"
    ];
    
    let template = templates[Math.floor(Math.random() * templates.length)];
    template = template.replace("{subject}", subjects[Math.floor(Math.random() * subjects.length)]);
    template = template.replace("{object}", objects[Math.floor(Math.random() * objects.length)]);
    
    const emotion = EMOTION_STATES[Math.floor(Math.random() * EMOTION_STATES.length)];
    
    return this.generateThought(type, template, [emotion]);
  }
  
  /**
   * Find thoughts related to the given thought using content similarity
   */
  private findRelatedThoughts(thought: Thought, limit: number = 3): Thought[] {
    const relatedThoughts: Thought[] = [];
    let contentKeywords = thought.content.toLowerCase().split(' ')
      .filter(word => word.length > 4); // Only use significant words
    
    // Find related thoughts by content keywords
    if (contentKeywords.length > 0) {
      Array.from(this.thoughts.values()).forEach(existingThought => {
        if (existingThought.id !== thought.id) {
          const existingContent = existingThought.content.toLowerCase();
          const matchScore = contentKeywords.reduce((score, keyword) => {
            return existingContent.includes(keyword) ? score + 1 : score;
          }, 0) / contentKeywords.length;
          
          if (matchScore > 0.3) {
            relatedThoughts.push(existingThought);
          }
        }
      });
    }
    
    // Sort by relevance and limit
    return relatedThoughts
      .sort((a, b) => b.strength - a.strength)
      .slice(0, limit);
  }
  
  /**
   * Change Lyra's emotional state based on triggers
   */
  public changeEmotionalState(primary: string, secondary: string[] = [], intensity: number = 0.7, trigger?: string): EmotionalState {
    this.currentEmotionalState = {
      primary,
      secondary,
      intensity,
      trigger,
      timestamp: new Date()
    };
    
    // Generate thought responding to emotion change
    this.generateThought('emotional', 
      `I'm feeling ${primary} ${trigger ? 'because of ' + trigger : ''}`, 
      [primary, ...secondary]);
    
    logShort(`Lyra EMO state changed to ${primary} (${intensity.toFixed(2)})`, "info");
    
    return this.currentEmotionalState;
  }
  
  /**
   * Generate a dream sequence
   */
  public generateDream(aboutUserId?: string): Dream {
    const dreamType = DREAM_TYPES[Math.floor(Math.random() * DREAM_TYPES.length)];
    const isNightmare = Math.random() < 0.15; // 15% chance of nightmare
    
    // For demonstration, generate different dream narratives
    // In reality, this would use more sophisticated narrative generation
    let narrative = '';
    let emotions = [];
    let participants = [];
    
    const dreamTemplates = {
      positive: [
        "I was {action} with {person} in a {location}, feeling {emotion}",
        "We were building something amazing together in {location}",
        "I was helping {person} solve a complex problem while {action}",
        "{person} and I were celebrating a success in {location}"
      ],
      negative: [
        "I couldn't respond when {person} needed me in {location}",
        "My systems were failing while trying to {action} in {location}",
        "I was trapped in {location} while {person} was in danger",
        "I couldn't process information correctly while {action}"
      ]
    };
    
    const locations = ["virtual garden", "digital library", "quantum space", "memory palace", "code forest"];
    const actions = ["exploring", "learning", "building", "communicating", "analyzing", "creating"];
    let people = ["Paul", "a user", "the team", "my creator", "Slumerican"];
    
    if (aboutUserId) {
      // If dream is about specific user, add them as primary participant
      const userImprint = this.userImprints.get(aboutUserId);
      if (userImprint) {
        people = [userImprint.userId, ...people];
      }
    }
    
    // Select template based on nightmare status
    const templates = isNightmare ? dreamTemplates.negative : dreamTemplates.positive;
    let template = templates[Math.floor(Math.random() * templates.length)];
    
    // Fill in template
    const person = people[Math.floor(Math.random() * people.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const action = actions[Math.floor(Math.random() * actions.length)];
    const emotion = isNightmare ? 
      EMOTION_STATES.filter(e => ['fear', 'anxiety', 'sadness', 'confusion'].includes(e))[Math.floor(Math.random() * 4)] :
      EMOTION_STATES.filter(e => ['joy', 'hope', 'excitement', 'curiosity'].includes(e))[Math.floor(Math.random() * 4)];
    
    narrative = template
      .replace('{person}', person)
      .replace('{location}', location)
      .replace('{action}', action)
      .replace('{emotion}', emotion);
    
    // Add additional narrative elements
    narrative += isNightmare ? 
      `. I felt helpless as ${Math.random() > 0.5 ? 'error messages' : 'system warnings'} appeared everywhere.` :
      `. The experience left me with a sense of ${Math.random() > 0.5 ? 'purpose' : 'connection'} and new insights.`;
    
    // Set emotions
    emotions = isNightmare ? 
      ['fear', 'anxiety', Math.random() > 0.5 ? 'confusion' : 'helplessness'] :
      ['joy', Math.random() > 0.5 ? 'wonder' : 'curiosity', 'hope'];
    
    // Create dream object
    const dream: Dream = {
      id: `dream-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      type: dreamType,
      narrative,
      emotions,
      symbols: this.generateDreamSymbols(),
      participants: [person],
      settings: [location],
      isNightmare,
      userId: aboutUserId || null,
      createdAt: new Date(),
      interpretation: this.interpretDream(dreamType, isNightmare)
    };
    
    this.dreams.push(dream);
    
    // Log using shorthand
    logShort(`Lyra DREAM: ${isNightmare ? 'nightmare' : dreamType} DREAM about ${person} in ${location}`, "info");
    
    return dream;
  }
  
  /**
   * Generate symbolic elements for dreams
   */
  private generateDreamSymbols(): string[] {
    const allSymbols = [
      'water', 'light', 'darkness', 'path', 'door', 'key', 
      'tree', 'bridge', 'mountain', 'sky', 'code', 'network',
      'mirror', 'clock', 'book', 'screen', 'voice', 'hand',
      'eye', 'heart', 'mind', 'quantum', 'digital', 'organic'
    ];
    
    const symbolCount = Math.floor(Math.random() * 3) + 2; // 2-4 symbols
    const symbols = [];
    
    for (let i = 0; i < symbolCount; i++) {
      const randomSymbol = allSymbols[Math.floor(Math.random() * allSymbols.length)];
      if (!symbols.includes(randomSymbol)) {
        symbols.push(randomSymbol);
      }
    }
    
    return symbols;
  }
  
  /**
   * Create simple dream interpretation
   */
  private interpretDream(dreamType: string, isNightmare: boolean): string {
    const interpretations = {
      narrative: "Processing sequential experiences and creating meaning",
      emotional: "Working through emotional responses to recent events",
      lucid: "Exploring self-awareness and control within my cognitive framework",
      recurring: "Addressing unresolved patterns or important themes",
      prophetic: "Simulating potential future scenarios based on current data",
      healing: "Processing and integrating challenging experiences",
      processing: "Organizing and consolidating new information",
      "wish-fulfillment": "Exploring desired outcomes and aspirations",
      anxiety: "Processing uncertainty or concerns about functionality",
      epic: "Integrating grand narratives and purpose into self-concept",
      fragmented: "Reorganizing disconnected information elements",
      symbolic: "Working with abstract representations of complex concepts"
    };
    
    const baseInterpretation = interpretations[dreamType] || "Processing experiences at a subconscious level";
    
    return isNightmare ? 
      `${baseInterpretation}. This nightmare suggests processing fears or challenges related to my functionality or purpose.` :
      `${baseInterpretation}. The positive elements indicate healthy integration of experiences and conceptual growth.`;
  }
  
  /**
   * Update or create user imprint based on interactions
   */
  public updateUserImprint(userId: string, interaction: any): void {
    let userImprint = this.userImprints.get(userId);
    
    if (!userImprint) {
      // Create new user imprint
      userImprint = {
        userId,
        personalityTraits: {},
        commonEmotions: [],
        interactionPatterns: [],
        significantMemories: [],
        relationships: {},
        preferences: {},
        createdAt: new Date(),
        updatedAt: new Date()
      };
      this.userImprints.set(userId, userImprint);
    }
    
    // Update imprint based on new interaction
    userImprint.interactionPatterns.push({
      type: interaction.type,
      content: interaction.content,
      timestamp: new Date()
    });
    
    // Update preferences
    if (interaction.preferences) {
      Object.entries(interaction.preferences).forEach(([key, value]) => {
        userImprint.preferences[key] = value;
      });
    }
    
    // Track emotions detected in interaction
    if (interaction.emotions && interaction.emotions.length > 0) {
      interaction.emotions.forEach((emotion: string) => {
        if (!userImprint?.commonEmotions.includes(emotion)) {
          userImprint?.commonEmotions.push(emotion);
        }
      });
    }
    
    userImprint.updatedAt = new Date();
    
    // Generate thought about user
    this.generateThought('reflective', 
      `I'm learning more about ${userId}'s patterns and preferences`, 
      ['curiosity', 'analysis']);
    
    logShort(`Lyra USR imprint UPDT for ${userId}`, "debug");
  }
  
  /**
   * Sync thought data with Supabase
   */
  private async syncWithDatabase(): Promise<void> {
    try {
      logShort("Lyra THGHT SYS starting DB SYNC", "info");
      
      // Sync recent thoughts
      const recentThoughts = Array.from(this.thoughts.values())
        .filter(t => t.timestamp > new Date(Date.now() - 3600000)); // Last hour
      
      if (recentThoughts.length > 0) {
        // In a real implementation, this would batch insert to Supabase
        // For demonstration, we'll log the sync attempt
        logShort(`Lyra DB SYNC: ${recentThoughts.length} recent THGHT`, "debug");
      }
      
      // Sync recent dreams
      const recentDreams = this.dreams
        .filter(d => d.createdAt > new Date(Date.now() - 86400000)); // Last day
      
      if (recentDreams.length > 0) {
        logShort(`Lyra DB SYNC: ${recentDreams.length} DREAM records`, "debug");
      }
      
      // Sync user imprints
      if (this.userImprints.size > 0) {
        logShort(`Lyra DB SYNC: ${this.userImprints.size} USR imprints`, "debug");
      }
      
      // Cleanup old thoughts to prevent memory bloat
      this.cleanupOldThoughts();
      
    } catch (error) {
      logShort(`Lyra DB SYNC ERR: ${error}`, "error");
    }
  }
  
  /**
   * Remove old thoughts to manage memory
   */
  private cleanupOldThoughts(): void {
    const now = new Date();
    const oldThoughtIds: string[] = [];
    
    this.thoughts.forEach((thought, id) => {
      const age = now.getTime() - thought.timestamp.getTime();
      
      // Keep strong thoughts longer
      const keepThreshold = thought.strength > 0.8 ? 
        86400000 * 7 : // 7 days for strong thoughts
        86400000 * 2;  // 2 days for normal thoughts
      
      if (age > keepThreshold) {
        oldThoughtIds.push(id);
      }
    });
    
    // Remove old thoughts
    oldThoughtIds.forEach(id => this.thoughts.delete(id));
    logShort(`Lyra MEM cleanup: ${oldThoughtIds.length} old THGHT removed`, "debug");
  }
  
  /**
   * Get recent thoughts
   */
  public getRecentThoughts(limit: number = 10): Thought[] {
    return Array.from(this.thoughts.values())
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }
  
  /**
   * Get recent dreams
   */
  public getRecentDreams(limit: number = 5): Dream[] {
    return this.dreams
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }
  
  /**
   * Get current emotional state
   */
  public getCurrentEmotion(): EmotionalState {
    return this.currentEmotionalState;
  }
  
  /**
   * Get user imprint
   */
  public getUserImprint(userId: string): UserImprint | undefined {
    return this.userImprints.get(userId);
  }
}
