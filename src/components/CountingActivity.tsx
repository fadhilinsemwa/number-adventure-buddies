
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NumberDisplay from './NumberDisplay';
import Character from './Character';
import GameButton from './GameButton';
import Confetti from './Confetti';
import { ArrowRight, Volume2, VolumeX } from "lucide-react";

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
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const playSound = (sound: string) => {
    if (!soundEnabled) return;
    
    // Create the audio context on user interaction
    const audioContext = new AudioContext();
    
    // Create an oscillator for a simple beep sound
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Configure the oscillator
    switch (sound) {
      case 'tap':
        oscillator.type = 'sine';
        oscillator.frequency.value = 440 + (currentCount * 20); // Higher pitch as count increases
        gainNode.gain.value = 0.1;
        break;
      case 'complete':
        oscillator.type = 'triangle';
        oscillator.frequency.value = 600;
        gainNode.gain.value = 0.2;
        break;
      case 'button':
        oscillator.type = 'sine';
        oscillator.frequency.value = 330;
        gainNode.gain.value = 0.1;
        break;
      default:
        oscillator.frequency.value = 440;
        gainNode.gain.value = 0.1;
    }
    
    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Schedule the sound
    const now = audioContext.currentTime;
    gainNode.gain.setValueAtTime(gainNode.gain.value, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    
    // Play and stop
    oscillator.start();
    oscillator.stop(now + 0.5);
  };

  // Function to speak the current number
  const speakNumber = (number: number) => {
    if (!soundEnabled) return;
    
    // Use browser's built-in speech synthesis
    const utterance = new SpeechSynthesisUtterance(number.toString());
    utterance.rate = 0.8; // Slightly slower for better clarity
    utterance.pitch = 1.2; // Slightly higher pitch for child-friendly sound
    window.speechSynthesis.speak(utterance);
  };

  const handleTap = () => {
    if (currentCount < targetNumber) {
      // Play tap sound
      playSound('tap');
      
      // Increment the count
      const newCount = currentCount + 1;
      setCurrentCount(newCount);
      
      // Speak the number
      speakNumber(newCount);
    }
  };

  const handleButtonClick = () => {
    playSound('button');
    onComplete();
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  useEffect(() => {
    if (currentCount === targetNumber && !audioPlayed) {
      // Trigger celebration
      setShowCelebration(true);
      
      // Play celebration sound
      playSound('complete');
      
      // Speak congratulatory message
      if (soundEnabled) {
        const congratsUtterance = new SpeechSynthesisUtterance(`Great! You counted to ${targetNumber}!`);
        congratsUtterance.rate = 0.8;
        window.speechSynthesis.speak(congratsUtterance);
      }
      
      setAudioPlayed(true);
    }
  }, [currentCount, targetNumber, audioPlayed, soundEnabled]);

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
          type={targetNumber <= 10 ? 'monkey' : targetNumber <= 50 ? 'rabbit' : 'owl'}
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
      
      <div className="absolute top-2 right-4">
        <button onClick={toggleSound} className="p-2 rounded-full hover:bg-gray-100">
          {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
      </div>
      
      <div className="mb-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-1">
          Count the {targetNumber <= 10 ? 'monkeys' : targetNumber <= 50 ? 'rabbits' : 'owls'}!
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
              onClick={handleButtonClick} 
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
