
import React from 'react';
import { Card } from '@/components/ui/card';

interface GameContainerProps {
  children: React.ReactNode;
}

const GameContainer: React.FC<GameContainerProps> = ({ children }) => {
  return (
    <Card className="w-full max-w-3xl mx-auto overflow-hidden rounded-3xl shadow-xl bg-white/90 border-4 border-game-purple">
      {children}
    </Card>
  );
};

export default GameContainer;
