
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
  
  // Define the progression of numbers for this level (1-10)
  const numberProgression = [3, 5, 10];

  const handleActivityComplete = useCallback(() => {
    if (currentActivity < numberProgression.length) {
      setCurrentActivity(prev => prev + 1);
    } else {
      setLevelCompleted(true);
    }
  }, [currentActivity, numberProgression.length]);

  const progress = levelCompleted ? 100 : (currentActivity / numberProgression.length) * 100;

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
          targetNumber={numberProgression[currentActivity - 1]}
          onComplete={handleActivityComplete}
        />
      </div>
    </div>
  );
};

export default LevelOne;
