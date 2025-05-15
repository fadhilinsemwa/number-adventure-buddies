
import React, { useState, useCallback } from 'react';
import CountingActivity from './CountingActivity';
import GameHeader from './GameHeader';
import LevelComplete from './LevelComplete';

interface LevelOneProps {
  onComplete: () => void;
  onHomeClick: () => void;
}

const LevelOne: React.FC<LevelOneProps> = ({ onComplete, onHomeClick }) => {
  const [currentActivity, setCurrentActivity] = useState<number>(1);
  const [levelCompleted, setLevelCompleted] = useState<boolean>(false);

  const handleActivityComplete = useCallback(() => {
    if (currentActivity < 3) {
      setCurrentActivity(prev => prev + 1);
    } else {
      setLevelCompleted(true);
    }
  }, [currentActivity]);

  const progress = levelCompleted ? 100 : (currentActivity / 3) * 100;

  if (levelCompleted) {
    return <LevelComplete level={1} onNextLevel={onComplete} />;
  }

  return (
    <div className="flex flex-col h-full">
      <GameHeader 
        level={1} 
        maxLevel={3} 
        progress={progress} 
        onHomeClick={onHomeClick} 
      />
      
      <div className="flex-1">
        <CountingActivity
          targetNumber={currentActivity}
          onComplete={handleActivityComplete}
        />
      </div>
    </div>
  );
};

export default LevelOne;
