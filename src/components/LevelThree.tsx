
import React, { useState, useCallback } from 'react';
import CountingActivity from './CountingActivity';
import GameHeader from './GameHeader';
import LevelComplete from './LevelComplete';

interface LevelThreeProps {
  onComplete: () => void;
  onHomeClick: () => void;
}

const LevelThree: React.FC<LevelThreeProps> = ({ onComplete, onHomeClick }) => {
  const [currentActivity, setCurrentActivity] = useState<number>(1);
  const [levelCompleted, setLevelCompleted] = useState<boolean>(false);
  
  // Define the progression of numbers for level 3 (50-100)
  const numberProgression = [75, 90, 100];

  const handleActivityComplete = useCallback(() => {
    if (currentActivity < numberProgression.length) {
      setCurrentActivity(prev => prev + 1);
    } else {
      setLevelCompleted(true);
    }
  }, [currentActivity, numberProgression.length]);

  const progress = levelCompleted ? 100 : (currentActivity / numberProgression.length) * 100;

  if (levelCompleted) {
    return <LevelComplete level={3} onNextLevel={onComplete} />;
  }

  return (
    <div className="flex flex-col h-full">
      <GameHeader 
        level={3} 
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

export default LevelThree;
