
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NumberDisplayProps {
  number: number;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  animated?: boolean;
}

const NumberDisplay: React.FC<NumberDisplayProps> = ({ 
  number, 
  size = 'md', 
  onClick,
  animated = false
}) => {
  const colors = [
    'bg-game-blue text-blue-700',
    'bg-game-orange text-orange-700',
    'bg-game-purple text-purple-700',
    'bg-game-green text-green-700',
    'bg-game-pink text-pink-700',
    'bg-game-yellow text-yellow-700',
    'bg-game-leaf text-green-600',
    'bg-game-blue text-blue-700',
    'bg-game-orange text-orange-700',
    'bg-game-purple text-purple-700',
  ];

  const sizeClasses = {
    sm: 'w-12 h-12 text-2xl',
    md: 'w-20 h-20 text-4xl',
    lg: 'w-32 h-32 text-6xl',
  };

  const colorClass = colors[(number - 1) % colors.length];
  const sizeClass = sizeClasses[size];

  const baseClasses = cn(
    'rounded-full flex items-center justify-center font-bold shadow-md cursor-pointer transition-transform transform',
    colorClass,
    sizeClass,
    onClick && 'hover:scale-110 active:scale-95',
  );

  if (animated) {
    return (
      <motion.div 
        className={baseClasses}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
      >
        {number}
      </motion.div>
    );
  }

  return (
    <div className={baseClasses} onClick={onClick}>
      {number}
    </div>
  );
};

export default NumberDisplay;
