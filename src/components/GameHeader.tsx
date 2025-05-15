
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GameHeaderProps {
  level: number;
  maxLevel: number;
  progress: number;
  onHomeClick: () => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({ 
  level, 
  maxLevel, 
  progress,
  onHomeClick
}) => {
  return (
    <div className="bg-game-blue/50 p-4 rounded-t-3xl">
      <div className="flex justify-between items-center mb-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onHomeClick}
          className="rounded-full hover:bg-white/20"
        >
          <Home className="h-5 w-5" />
        </Button>
        
        <div className="text-center">
          <h2 className="font-bold text-lg">Level {level}</h2>
          <p className="text-sm">Numbers 1-{level * 3}</p>
        </div>
        
        <div className="w-5"></div> {/* Empty div for flex balance */}
      </div>
      
      <div className="w-full">
        <Progress value={progress} className="h-3 bg-white/50" />
      </div>
    </div>
  );
};

export default GameHeader;
