
import React from 'react';
import { motion } from 'framer-motion';

interface CharacterProps {
  type: 'monkey' | 'rabbit' | 'owl' | 'guide';
  emotion?: 'happy' | 'excited' | 'neutral';
  className?: string;
  animate?: boolean;
}

const Character: React.FC<CharacterProps> = ({ 
  type, 
  emotion = 'neutral',
  className = '',
  animate = true
}) => {
  // Character images would ideally be custom illustrations
  // Using placeholder images for now
  const characterImages = {
    monkey: {
      neutral: "🐵",
      happy: "🐵",
      excited: "🙉"
    },
    rabbit: {
      neutral: "🐰",
      happy: "🐰",
      excited: "🐇"
    },
    owl: {
      neutral: "🦉",
      happy: "🦉",
      excited: "🦉"
    },
    guide: {
      neutral: "🦊",
      happy: "🦊",
      excited: "🦊"
    }
  };

  const emoji = characterImages[type][emotion];

  if (animate) {
    return (
      <motion.div 
        className={`text-6xl ${className}`}
        animate={{ y: [0, -8, 0] }}
        transition={{ 
          repeat: Infinity, 
          duration: 2,
          repeatType: "reverse"
        }}
      >
        {emoji}
      </motion.div>
    );
  }

  return <div className={`text-6xl ${className}`}>{emoji}</div>;
};

export default Character;
