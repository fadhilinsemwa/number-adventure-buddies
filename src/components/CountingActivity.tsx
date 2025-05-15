
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NumberDisplay from './NumberDisplay';
import Character from './Character';
import GameButton from './GameButton';
import Confetti from './Confetti';
import { ArrowRight } from "lucide-react";

interface CountingActivityProps {
  targetNumber: number;
  onComplete: () => void;
}

const CountingActivity: React.FC<CountingActivityProps> = ({ 
  targetNumber, 
  onComplete 
}) => {
  const [currentCount, setCurrentCount] = useState<number>(0);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const [audioPlayed, setAudioPlayed] = useState<boolean>(false);

  const handleTap = () => {
    if (currentCount < targetNumber) {
      // Play tap sound
      const audio = new Audio(`/sounds/pop${Math.floor(Math.random() * 3) + 1}.mp3`);
      audio.volume = 0.3;
      audio.play().catch(e => console.log('Audio play failed:', e));
      
      setCurrentCount(prev => prev + 1);
    }
  };

  useEffect(() => {
    if (currentCount === targetNumber && !audioPlayed) {
      // Trigger celebration
      setShowCelebration(true);
      
      // Play celebration sound
      const audio = new Audio('/sounds/celebration.mp3');
      audio.volume = 0.3;
      audio.play().catch(e => console.log('Audio play failed:', e));
      
      setAudioPlayed(true);
    }
  }, [currentCount, targetNumber, audioPlayed]);

  const activityItems = [];
  for (let i = 0; i < targetNumber; i++) {
    const isActive = i < currentCount;
    
    activityItems.push(
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ 
          opacity: isActive ? 1 : 0.3, 
          scale: isActive ? 1 : 0.7,
          y: isActive ? [0, -15, 0] : 0
        }}
        transition={{ 
          duration: 0.5,
          y: { duration: 0.5, type: "spring" }
        }}
        className="cursor-pointer"
        onClick={handleTap}
      >
        <Character
          type={targetNumber <= 3 ? 'monkey' : targetNumber <= 6 ? 'rabbit' : 'owl'}
          emotion={isActive ? 'excited' : 'neutral'}
          animate={isActive}
          className="text-4xl md:text-5xl"
        />
      </motion.div>
    );
  }

  return (
    <div className="relative flex flex-col items-center p-4">
      <Confetti active={showCelebration} />
      
      <div className="mb-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-1">
          Count the {targetNumber <= 3 ? 'monkeys' : targetNumber <= 6 ? 'rabbits' : 'owls'}!
        </h2>
        <p className="text-lg md:text-xl">Tap each one to count them.</p>
      </div>
      
      <div className="my-8 flex justify-center">
        <NumberDisplay number={targetNumber} size="lg" animated />
      </div>
      
      <div className="flex flex-wrap justify-center gap-4 my-4">
        {activityItems}
      </div>
      
      <div className="mt-4 flex flex-col items-center">
        <p className="text-2xl font-bold mb-2">
          Count: {currentCount} {currentCount > 0 && <span>of {targetNumber}</span>}
        </p>
        
        {currentCount === targetNumber && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <GameButton 
              onClick={onComplete} 
              color="green"
              size="lg"
            >
              Next <ArrowRight className="ml-1" size={20} />
            </GameButton>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CountingActivity;
