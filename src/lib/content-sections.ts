
/**
 * Content sections configuration for the platform
 */

import { Bot, Droplet, PieChart, Globe, AlertTriangle, Newspaper, Music, Coins, Calendar, Activity, Scale, Zap, Layers, Microscope, ScrollText, LucideIcon, Star, Moon, Sparkles, Telescope, Atom, Orbit } from 'lucide-react';

export interface ContentSection {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  path: string;
  requiresAuth?: boolean; // Sections that require login
  isPremium?: boolean;    // Premium content requiring subscription
  badge?: 'new' | 'hot' | 'updated';
  color?: string;
}

// Main content sections for the platform
export const contentSections: ContentSection[] = [
  {
    id: 'uap-watch',
    name: 'UAP/UFO Watch',
    description: 'Track and report UFO and UAP sightings worldwide with our interactive map',
    icon: Globe,
    path: '/uap-watch',
    badge: 'new',
    color: 'text-blue-500'
  },
  {
    id: 'conspiracy',
    name: 'Conspiracy Forum',
    description: 'Discuss and explore conspiracy theories in a moderated environment',
    icon: AlertTriangle,
    path: '/conspiracy',
    color: 'text-amber-500'
  },
  {
    id: 'ancient-news',
    name: 'Ancient Mysteries',
    description: 'Exploring historical mysteries and ancient knowledge',
    icon: ScrollText,
    path: '/ancient',
    color: 'text-orange-600'
  },
  {
    id: 'paranormal',
    name: 'Paranormal',
    description: 'Explore supernatural phenomena, hauntings, and unexplained events',
    icon: Sparkles,
    path: '/paranormal',
    badge: 'new',
    color: 'text-violet-600'
  },
  {
    id: 'spiritual',
    name: 'Spiritual Wisdom',
    description: 'Explore spiritual practices, meditation techniques, and consciousness expansion',
    icon: Star,
    path: '/spiritual',
    badge: 'new',
    color: 'text-indigo-400'
  },
  {
    id: 'astronomy',
    name: 'Space Tracking',
    description: 'Track celestial events, meteors, asteroids, and other near-Earth objects',
    icon: Telescope,
    path: '/astronomy',
    badge: 'new',
    color: 'text-sky-600'
  },
  {
    id: 'astrology',
    name: 'Astrology',
    description: 'Daily horoscopes, zodiac insights, and celestial influences',
    icon: Moon,
    path: '/astrology',
    badge: 'new',
    color: 'text-purple-400'
  },
  {
    id: 'politics',
    name: 'Politics & Rights',
    description: 'Stay informed on political developments and civil liberties',
    icon: Scale,
    path: '/politics',
    color: 'text-red-500'
  },
  {
    id: 'ai-tech',
    name: 'AI & Quantum',
    description: 'Latest developments in artificial intelligence and quantum technologies',
    icon: Bot,
    path: '/ai-quantum',
    badge: 'hot',
    color: 'text-purple-500'
  },
  {
    id: 'advanced-tech',
    name: 'Advanced Tech',
    description: 'Cutting-edge technology and future innovations',
    icon: Zap,
    path: '/advanced-tech',
    color: 'text-cyan-500'
  },
  {
    id: 'quantum-physics',
    name: 'Quantum Physics',
    description: 'Explore quantum mechanics, theoretical physics, and breakthrough research',
    icon: Atom,
    path: '/quantum-physics',
    color: 'text-blue-400'
  },
  {
    id: 'health',
    name: 'Health Research',
    description: 'Cancer research, treatments, and breakthrough medical technologies',
    icon: Activity,
    path: '/health',
    color: 'text-green-500'
  },
  {
    id: 'music',
    name: 'Music Corner',
    description: 'Discover new artists and revisit classics',
    icon: Music,
    path: '/music',
    color: 'text-pink-500'
  },
  {
    id: 'crypto',
    name: 'Crypto Hub',
    description: 'Cryptocurrency news, trading information, and blockchain technology',
    icon: Coins,
    path: '/crypto',
    isPremium: true,
    color: 'text-yellow-500'
  },
  {
    id: 'events',
    name: 'Events Calendar',
    description: 'Upcoming events, conferences, and important dates',
    icon: Calendar,
    path: '/events',
    color: 'text-indigo-500'
  },
  {
    id: 'space',
    name: 'Space Exploration',
    description: 'Latest discoveries and missions in space science',
    icon: Orbit,
    path: '/space',
    color: 'text-slate-500'
  },
  {
    id: 'news',
    name: 'News Center',
    description: 'Breaking news and in-depth analysis across all topics',
    icon: Newspaper,
    path: '/news',
    badge: 'updated',
    color: 'text-blue-600'
  },
  {
    id: 'police-watch',
    name: 'Police Accountability',
    description: 'Tracking police actions and accountability issues',
    icon: PieChart,
    path: '/police-watch',
    color: 'text-gray-500'
  },
  {
    id: 'blood-bank',
    name: 'Blood Bank',
    description: 'Virtual blood bank and donation tracking system',
    icon: Droplet,
    path: '/blood-bank',
    requiresAuth: true,
    color: 'text-red-600'
  },
  {
    id: 'science',
    name: 'Scientific Research',
    description: 'Latest scientific breakthroughs and research papers',
    icon: Microscope,
    path: '/science',
    color: 'text-emerald-600'
  }
];

// Helper function to get a content section by ID
export const getContentSectionById = (id: string): ContentSection | undefined => {
  return contentSections.find(section => section.id === id);
};

// Helper function to get featured content sections (for homepage)
export const getFeaturedContentSections = (count: number = 6): ContentSection[] => {
  // Priority to sections with badges
  const badged = contentSections.filter(s => s.badge);
  const others = contentSections.filter(s => !s.badge);
  
  return [...badged, ...others].slice(0, count);
};
