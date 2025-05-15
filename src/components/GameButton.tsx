
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GameButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  color?: 'blue' | 'green' | 'orange' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const GameButton: React.FC<GameButtonProps> = ({ 
  children, 
  onClick, 
  color = 'blue',
  size = 'md',
  animated = true
}) => {
  const colorClasses = {
    blue: 'bg-game-blue hover:bg-blue-400 text-blue-800 border-blue-400',
    green: 'bg-game-green hover:bg-green-400 text-green-800 border-green-400',
    orange: 'bg-game-orange hover:bg-orange-400 text-orange-800 border-orange-400',
    purple: 'bg-game-purple hover:bg-purple-400 text-purple-800 border-purple-400',
  };

  const sizeClasses = {
    sm: 'text-lg py-1 px-3',
    md: 'text-xl py-2 px-6',
    lg: 'text-2xl py-3 px-8',
  };

  const buttonClasses = cn(
    'rounded-full font-bold border-2 shadow-md transition-all',
    colorClasses[color],
    sizeClasses[size]
  );

  const handleClick = () => {
    // Play button sound using Web Audio API
    try {
      const audioContext = new AudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.value = 330;
      gainNode.gain.value = 0.1;
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      const now = audioContext.currentTime;
      gainNode.gain.setValueAtTime(gainNode.gain.value, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      
      oscillator.start();
      oscillator.stop(now + 0.2);
    } catch (e) {
      console.log('Audio play failed:', e);
    }
    
    // Call the original onClick handler
    onClick();
  };

  if (animated) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          onClick={handleClick}
          className={buttonClasses}
        >
          {children}
        </Button>
      </motion.div>
    );
  }

  return (
    <Button 
      onClick={handleClick}
      className={buttonClasses}
    >
      {children}
    </Button>
  );
};

export default GameButton;
