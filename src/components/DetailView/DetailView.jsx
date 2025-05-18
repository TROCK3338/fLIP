import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FlashCard from './FlashCard';

const DetailView = ({ character, onClose, onPrev, onNext, hasPrev, hasNext }) => {
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const totalFlashcards = character.flashcards.length;

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
      if (e.key === 'ArrowUp') handlePrevFlashcard();
      if (e.key === 'ArrowDown') handleNextFlashcard();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, onPrev, onNext, hasPrev, hasNext, currentFlashcardIndex]);

  const handleNextFlashcard = () => {
    if (currentFlashcardIndex < totalFlashcards - 1) {
      setCurrentFlashcardIndex(currentFlashcardIndex + 1);
    } else {
      setCurrentFlashcardIndex(0);
    }
  };

  const handlePrevFlashcard = () => {
    if (currentFlashcardIndex > 0) {
      setCurrentFlashcardIndex(currentFlashcardIndex - 1);
    } else {
      setCurrentFlashcardIndex(totalFlashcards - 1);
    }
  };

  useEffect(() => {
    setCurrentFlashcardIndex(0);
  }, [character]);

  return (
    <motion.div
      layoutId={`card-${character.name}`}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 30,
        mass: 1
      }}
      className="fixed inset-4 mx-auto my-6 max-w-5xl rounded-3xl shadow-2xl flex flex-col overflow-hidden z-20 bg-white"
    >

      {/* Main Content */}
      <div className="flex flex-1 h-full">
        {/* Left Side - Character Image with Vertical Name */}
        <div className="w-1/3 relative flex flex-col items-center justify-center bg-white p-8">
          {/* Vertical Character Name - MOVED TO LEFT SIDE */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2" 
               style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
            <h2 className="text-2xl font-bold tracking-wider text-gray-600 mb-4">{character.name}</h2>
          </div>

          
          {/* Character Image */}
          <motion.div 
            layoutId={`img-container-${character.name}`}
            className="w-full h-full flex items-center justify-center"
          >
            <motion.img
              layoutId={`img-${character.name}`}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              src={character.image}
              alt={character.name}
              className="w-full h-full object-contain max-h-96"
            />
          </motion.div>

          
          {/* Navigation Arrow */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <button
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg"
              onClick={hasPrev ? onPrev : onNext}
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Right Side - Character Info */}
        <div className="flex-1 p-8 flex flex-col" style={{ backgroundColor: character.color }}>
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
            onClick={onClose}
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Character Header */}
          <motion.div 
            layoutId={`title-${character.name}`}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="mb-1"
          >
            <h1 className="text-4xl font-bold text-white">{character.name}</h1>
          </motion.div>
          
          <div className="text-white text-lg mb-2">Department: {character.Department}</div>
          
          {/* Character Description */}
          <div className="text-white mb-8 leading-relaxed max-w-lg">
            {character.description}
          </div>
          
          {/* Flashcards Section */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-bold text-xl">Flashcards</h3>
              <div className="text-white">
                {currentFlashcardIndex + 1} of {totalFlashcards}
              </div>
            </div>
            
            {/* Current flashcard */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFlashcardIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <FlashCard 
                  card={character.flashcards[currentFlashcardIndex]}
                  index={currentFlashcardIndex}
                  color={character.color}
                />
              </motion.div>
            </AnimatePresence>
            
            {/* Flashcard navigation */}
            <div className="flex justify-between mt-4">
              <motion.button
                className="px-4 py-2 bg-gray bg-opacity-20 rounded-lg text-white flex items-center"
                onClick={handlePrevFlashcard}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </motion.button>
              
              <motion.button
                className="px-4 py-2 bg-gray bg-opacity-20 rounded-lg text-white flex items-center"
                onClick={handleNextFlashcard}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Next
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DetailView;