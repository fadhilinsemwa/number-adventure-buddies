
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GameButton from './GameButton';
import Character from './Character';

interface WelcomeScreenProps {
  onStartGame: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartGame }) => {
  const [audioPermission, setAudioPermission] = useState<boolean>(false);
  
  const handleStartClick = () => {
    // Try to play a silent audio to request audio permission
    const audio = new Audio('/sounds/pop1.mp3');
    audio.volume = 0.1;
    
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setAudioPermission(true);
          onStartGame();
        })
        .catch(error => {
          console.log('Audio permission not granted:', error);
          // Still allow game to start even without audio permission
          onStartGame();
        });
    } else {
      // Fallback for browsers where play() doesn't return a promise
      onStartGame();
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center text-center p-6 h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1 
        className="text-4xl md:text-5xl font-bold mb-4 text-blue-600"
        animate={{ y: [0, -10, 0] }}
        transition={{ 
          repeat: Infinity, 
          duration: 3, 
          repeatType: "reverse"
        }}
      >
        Number Adventure Land
      </motion.h1>
      
      <motion.div 
        className="mb-8 relative"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
      >
        <div className="flex justify-center gap-4">
          <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.2 }}>
            <Character type="monkey" emotion="happy" animate={false} />
          </motion.div>
          <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}>
            <Character type="guide" emotion="happy" animate={false} />
          </motion.div>
          <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.8 }}>
            <Character type="rabbit" emotion="happy" animate={false} />
          </motion.div>
        </div>
      </motion.div>
      
      <motion.p 
        className="text-xl md:text-2xl mb-8 max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        Join our friendly animals and learn to count from 1 to 3!
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <GameButton 
          onClick={handleStartClick} 
          color="green"
          size="lg"
        >
          Start Adventure
        </GameButton>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeScreen;
