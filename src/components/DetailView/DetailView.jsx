import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FlashCard from './FlashCard';

const DetailView = ({ character, onClose, onPrev, onNext, hasPrev, hasNext }) => {
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const totalFlashcards = character.flashcards.length;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [])

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
      if (e.key === 'ArrowUp') handlePrevFlashcard();
      if (e.key === 'ArrowDown') handleNextFlashcard();
      // Toggle between info and flashcards with Tab key on mobile
      if (e.key === 'Tab' && isMobile) {
        e.preventDefault();
        setShowFlashcards(!showFlashcards);
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, onPrev, onNext, hasPrev, hasNext, currentFlashcardIndex, showFlashcards, isMobile]);

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
    // Reset to info view when changing characters
    if (isMobile) {
      setShowFlashcards(false);
    }
  }, [character, isMobile]);

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
      {/* Mobile Layout */}
      {isMobile ? (
        <div className="flex flex-col h-full relative">
          {/* Top Section - Character Image and Name */}
          <div className="relative bg-white p-4 flex flex-col items-center" style={{ height: "35%" }}>
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-600 hover:bg-gray-200 rounded-full p-2 transition-colors z-10"
              onClick={onClose}
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Character Name and Department */}
            <motion.div 
              layoutId={`title-${character.name}`}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-full text-center mb-2"
            >
              <h1 className="text-2xl font-bold text-gray-800">{character.name}</h1>
              <p className="text-gray-600">Department: {character.Department}</p>
            </motion.div>
            
            {/* Character Image */}
            <motion.div 
              layoutId={`img-container-${character.name}`}
              className="w-full flex-1 flex items-center justify-center"
            >
              <motion.img
                layoutId={`img-${character.name}`}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                src={character.image}
                alt={character.name}
                className="object-contain h-full max-h-40"
              />
            </motion.div>
          </div>
          
          {/* Toggle Button - Separated from content sections */}
          <div className="relative z-10 flex justify-center">
            <motion.div
              className="bg-white rounded-full shadow-lg flex overflow-hidden border border-gray-200"
              whileHover={{ scale: 1.02 }}
              style={{ width: '180px', height: '40px', marginTop: '-20px' }}
            >
              <motion.button
                className={`flex-1 h-full flex items-center justify-center px-4 ${!showFlashcards ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
                onClick={() => setShowFlashcards(false)}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-sm font-medium">Info</span>
              </motion.button>
              
              <motion.button
                className={`flex-1 h-full flex items-center justify-center px-4 ${showFlashcards ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
                onClick={() => setShowFlashcards(true)}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-sm font-medium">Flashcards</span>
              </motion.button>
            </motion.div>
          </div>
          
          {/* Content Section */}
          <div className="flex-1 relative overflow-hidden" style={{ backgroundColor: character.color }}>
            <AnimatePresence mode="wait" initial={false}>
              {showFlashcards ? (
                // Flashcards View
                <motion.div 
                  key="flashcards"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 p-4 flex flex-col"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-white font-bold text-lg">Flashcards</h3>
                    <div className="text-white text-sm">
                      {currentFlashcardIndex + 1} of {totalFlashcards}
                    </div>
                  </div>
                  
                  {/* Current flashcard - Centered with max height */}
                  <div className="flex-1 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentFlashcardIndex}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="w-full max-h-64"
                      >
                        <FlashCard 
                          card={character.flashcards[currentFlashcardIndex]}
                          index={currentFlashcardIndex}
                          color={character.color}
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  
                  {/* Flashcard navigation - Clear buttons */}
                  <div className="flex justify-between mt-4 px-4">
                    {/* prev-button */}
                    <motion.button
                      className="px-2 py-2 bg-gray bg-opacity-20 rounded-lg text-white flex items-center"
                      onClick={handlePrevFlashcard}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                      Prev
                    </motion.button>
                    
                    {/* next-button */}
                    <motion.button
                      className="px-2 py-2 bg-gray bg-opacity-20 rounded-lg text-white flex items-center"
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
                </motion.div>
              ) : (
                // Info View - With all details
                <motion.div 
                  key="info"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 p-4 overflow-y-auto"
                >
                  {/* All character details */}
                  <div className="text-white">
                    <h3 className="font-bold text-lg mb-2">About</h3>
                    <p className="mb-4 leading-relaxed">{character.description}</p>
                    
                    {/* Add any additional details that were in desktop view */}
                    {character.details && (
                      <div className="mt-4">
                        <h4 className="font-bold mb-2">Details</h4>
                        <ul className="space-y-2">
                          {Object.entries(character.details).map(([key, value]) => (
                            <li key={key}>
                              <span className="font-semibold">{key}:</span> {value}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Character Navigation Arrows - Fixed at bottom */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-8">
            <motion.button
              className="p-2 rounded-full bg-gray bg-opacity-20 text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={hasPrev ? onPrev : null}
              style={{ opacity: hasPrev ? 1 : 0.5 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            
            <motion.button
              className="p-2 rounded-full bg-gray bg-opacity-20 text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={hasNext ? onNext : null}
              style={{ opacity: hasNext ? 1 : 0.5 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>
      ) : (
        // Desktop Layout - Original code
        <div className="flex flex-1 h-full">
          {/* Left Side - Character Image with Vertical Name */}
          <div className="w-1/3 relative flex flex-col items-center justify-center bg-white p-8">
            {/* Vertical Character Name */}
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
      )}
    </motion.div>
  );
};

export default DetailView;
