
import { useEffect, useState } from 'react';
import { Award, Star } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Progress } from '@/components/ui/progress';

const PointsDisplay = () => {
  const [points, setPoints] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    // For demo purposes, fetch points from localStorage
    const storedPoints = parseInt(localStorage.getItem('userPoints') || '0');
    setPoints(storedPoints);
    
    // Add event listener for point changes (in a real app this would be from a database/state)
    const checkForPointChanges = setInterval(() => {
      const currentPoints = parseInt(localStorage.getItem('userPoints') || '0');
      if (currentPoints !== points) {
        setPoints(currentPoints);
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 1000);
      }
    }, 1000);
    
    return () => clearInterval(checkForPointChanges);
  }, [points]);

  // Calculate level and progress
  const level = Math.floor(points / 100) + 1;
  const progress = (points % 100);
  
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className={`flex items-center gap-2 cursor-pointer ${isAnimating ? 'point-animate' : ''}`}>
          <Award className="w-5 h-5 text-yellow-400" />
          <span className="font-bold gradient-text">{points}</span>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Level {level}</span>
            <div className="flex items-center">
              {Array(Math.min(level, 5)).fill(0).map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-sm">{progress}/100 points to Level {level + 1}</p>
          <div className="pt-2 space-y-1">
            <h4 className="text-sm font-medium">How to earn points:</h4>
            <ul className="text-sm space-y-1">
              <li className="flex justify-between">
                <span>• Daily login</span>
                <span>10 points</span>
              </li>
              <li className="flex justify-between">
                <span>• Share with friends</span>
                <span>15 points</span>
              </li>
              <li className="flex justify-between">
                <span>• Create a post</span>
                <span>5 points</span>
              </li>
              <li className="flex justify-between">
                <span>• Receive likes</span>
                <span>2 points each</span>
              </li>
            </ul>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default PointsDisplay;
