
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Character from './Character';
import GameButton from './GameButton';
import { StarIcon } from 'lucide-react';

interface LevelCompleteProps {
  level: number;
  onNextLevel: () => void;
}

const LevelComplete: React.FC<LevelCompleteProps> = ({ level, onNextLevel }) => {
  useEffect(() => {
    // Play celebration sound when component mounts
    const audio = new Audio('/sounds/level-complete.mp3');
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Audio play failed:', e));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center p-6 text-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring" }}
        className="mb-4"
      >
        <Character type="guide" emotion="excited" />
      </motion.div>

      <motion.h2 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-3xl md:text-4xl font-bold mb-4 text-purple-700"
      >
        Level {level} Complete!
      </motion.h2>

      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.7, type: "spring" }}
        className="flex justify-center gap-2 my-4"
      >
        {[...Array(3)].map((_, i) => (
          <motion.div 
            key={i}
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 20, -20, 0] }}
            transition={{ 
              delay: 0.9 + i * 0.2, 
              duration: 0.6,
              type: "spring"
            }}
          >
            <StarIcon size={40} className="text-yellow-400 fill-yellow-400" />
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-xl md:text-2xl mb-6"
      >
        You're doing amazing! Ready for the next adventure?
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2 }}
        whileHover={{ scale: 1.05 }}
      >
        <GameButton onClick={onNextLevel} color="purple" size="lg">
          Continue to Level {level + 1}
        </GameButton>
      </motion.div>
    </motion.div>
  );
};

export default LevelComplete;
