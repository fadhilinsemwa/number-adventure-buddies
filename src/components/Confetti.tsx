
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ConfettiProps {
  active: boolean;
}

const Confetti: React.FC<ConfettiProps> = ({ active }) => {
  const [pieces, setPieces] = useState<React.ReactNode[]>([]);
  
  useEffect(() => {
    if (active) {
      const newPieces = Array.from({ length: 50 }).map((_, i) => {
        const colors = [
          'bg-game-blue',
          'bg-game-orange',
          'bg-game-purple',
          'bg-game-green',
          'bg-game-pink',
          'bg-game-yellow',
        ];
        
        const size = Math.random() * 10 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = `${Math.random() * 100}%`;
        const animationDuration = `${Math.random() * 2 + 1}s`;
        const delay = `${Math.random() * 0.5}s`;
        
        return (
          <motion.div
            key={i}
            className={`absolute ${color} rounded-md`}
            style={{
              width: size,
              height: size,
              left: left,
              top: '-20px',
            }}
            initial={{ y: 0, rotate: 0, opacity: 1 }}
            animate={{ 
              y: [0, Math.random() * -300 - 100],
              x: [0, (Math.random() - 0.5) * 200],
              rotate: [0, Math.random() * 360],
              opacity: [1, 0]
            }}
            transition={{ 
              duration: Number(animationDuration.replace('s', '')),
              delay: Number(delay.replace('s', '')),
              ease: "easeOut" 
            }}
          />
        );
      });
      
      setPieces(newPieces);
      
      // Clear confetti after animation
      const timeout = setTimeout(() => {
        setPieces([]);
      }, 3000);
      
      return () => clearTimeout(timeout);
    }
  }, [active]);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {pieces}
    </div>
  );
};

export default Confetti;
