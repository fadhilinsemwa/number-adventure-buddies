
import React from 'react';
import { motion } from 'framer-motion';
import NumberDisplay from './NumberDisplay';
import GameButton from './GameButton';
import GameHeader from './GameHeader';

interface LevelSelectorProps {
  onLevelSelect: (level: string) => void;
  onHomeClick: () => void;
  gameStates: {
    LEVEL_ONE: string;
    LEVEL_TWO: string;
    LEVEL_THREE: string;
  };
}

const LevelSelector: React.FC<LevelSelectorProps> = ({ 
  onLevelSelect, 
  onHomeClick,
  gameStates 
}) => {
  const levels = [
    { 
      id: gameStates.LEVEL_ONE, 
      title: 'Level 1', 
      description: 'Numbers 1-10', 
      color: 'blue',
      number: 1
    },
    { 
      id: gameStates.LEVEL_TWO, 
      title: 'Level 2', 
      description: 'Numbers 10-50', 
      color: 'green',
      number: 2
    },
    { 
      id: gameStates.LEVEL_THREE, 
      title: 'Level 3', 
      description: 'Numbers 50-100', 
      color: 'purple',
      number: 3
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <GameHeader 
        level={0} 
        maxLevel={3} 
        progress={0} 
        onHomeClick={onHomeClick} 
      />

      <div className="flex-1 p-6">
        <motion.h2 
          className="text-3xl font-bold text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Choose a Level
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-3">
          {levels.map((level, index) => (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex flex-col items-center"
            >
              <div 
                className="mb-3 cursor-pointer" 
                onClick={() => onLevelSelect(level.id)}
              >
                <NumberDisplay number={level.number} size="lg" animated />
              </div>
              
              <h3 className="text-xl font-bold mb-1">{level.title}</h3>
              <p className="text-gray-600 mb-4 text-center">{level.description}</p>
              
              <GameButton
                onClick={() => onLevelSelect(level.id)}
                color={level.color as 'blue' | 'green' | 'purple'}
              >
                Start
              </GameButton>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LevelSelector;
