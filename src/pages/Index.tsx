
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GameContainer from '@/components/GameContainer';
import WelcomeScreen from '@/components/WelcomeScreen';
import LevelOne from '@/components/LevelOne';
import LevelTwo from '@/components/LevelTwo';
import LevelThree from '@/components/LevelThree';
import GameButton from '@/components/GameButton';
import LevelSelector from '@/components/LevelSelector';

const GameStates = {
  WELCOME: 'welcome',
  LEVEL_SELECTOR: 'level_selector',
  LEVEL_ONE: 'level_one',
  LEVEL_TWO: 'level_two',
  LEVEL_THREE: 'level_three',
  GAME_COMPLETE: 'game_complete',
};

const Index = () => {
  const [gameState, setGameState] = useState<string>(GameStates.WELCOME);
  
  // Create sounds directory for our game sounds
  useEffect(() => {
    // This would be where you'd preload audio files
    // But for now we'll just ensure the sounds directory structure exists
    console.log("Game initialized");
  }, []);

  const handleStartGame = () => {
    setGameState(GameStates.LEVEL_SELECTOR);
  };

  const handleLevelSelect = (level: string) => {
    setGameState(level);
  };

  const handleLevelOneComplete = () => {
    setGameState(GameStates.LEVEL_SELECTOR);
  };

  const handleLevelTwoComplete = () => {
    setGameState(GameStates.LEVEL_SELECTOR);
  };

  const handleLevelThreeComplete = () => {
    setGameState(GameStates.GAME_COMPLETE);
  };

  const handleHomeClick = () => {
    setGameState(GameStates.WELCOME);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-8">
      <motion.div
        className="w-full max-w-3xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <GameContainer>
          {gameState === GameStates.WELCOME && (
            <WelcomeScreen onStartGame={handleStartGame} />
          )}
          
          {gameState === GameStates.LEVEL_SELECTOR && (
            <LevelSelector 
              onLevelSelect={handleLevelSelect} 
              onHomeClick={handleHomeClick}
              gameStates={GameStates}
            />
          )}
          
          {gameState === GameStates.LEVEL_ONE && (
            <LevelOne 
              onComplete={handleLevelOneComplete} 
              onHomeClick={handleHomeClick}
            />
          )}

          {gameState === GameStates.LEVEL_TWO && (
            <LevelTwo 
              onComplete={handleLevelTwoComplete} 
              onHomeClick={handleHomeClick}
            />
          )}

          {gameState === GameStates.LEVEL_THREE && (
            <LevelThree 
              onComplete={handleLevelThreeComplete} 
              onHomeClick={handleHomeClick}
            />
          )}
          
          {gameState === GameStates.GAME_COMPLETE && (
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <h2 className="text-3xl font-bold mb-4">Great Job!</h2>
              <p className="text-xl mb-6">You've completed all levels and can count to 100!</p>
              <GameButton onClick={handleHomeClick} color="blue">
                Back to Home
              </GameButton>
            </div>
          )}
        </GameContainer>
      </motion.div>
    </div>
  );
};

export default Index;
