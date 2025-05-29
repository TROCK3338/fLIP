import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const FlashCard = ({ card, index, color }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [status, setStatus] = useState(null); // null, 'know', 'dont-know'
  const [responseHistory, setResponseHistory] = useState([]);
  const { isDarkMode } = useTheme();

  const handleFlip = () => {
    if (!isFlipped) {
      setIsFlipped(true);
    }
  };
  
  const handleKnow = (e) => {
    e.stopPropagation();
    setStatus('know');
    setResponseHistory([...responseHistory, { index, status: 'know' }]);
    setTimeout(() => {
      setIsFlipped(false);
    }, 1000);
  };
  
  const handleDontKnow = (e) => {
    e.stopPropagation();
    setStatus('dont-know');
    setResponseHistory([...responseHistory, { index, status: 'dont-know' }]);
    setTimeout(() => {
      setIsFlipped(false);
    }, 1000);
  };
  
  useEffect(() => {
    setIsFlipped(false);
    // Don't reset status here to maintain the indicator
  }, [card]);

  // Check if current card has a response in history
  const currentResponse = responseHistory.find(r => r.index === index);

  // Adjust gradient opacity for dark mode
  const frontGradient = isDarkMode 
    ? `linear-gradient(135deg, ${color}40, ${color}60), linear-gradient(135deg, rgba(15,23,42,0.8), rgba(30,41,59,0.6))`
    : `linear-gradient(135deg, ${color}60, ${color}90), linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1))`;

  return (
    <div className="perspective-1000 w-full h-64 mb-6 cursor-pointer" onClick={handleFlip}>
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className={`relative w-full h-full preserve-3d shadow-lg rounded-xl ${
          currentResponse?.status === 'know' ? 'shadow-green-200 border-2 border-green-500' : 
          currentResponse?.status === 'dont-know' ? 'shadow-red-200 border-2 border-red-500' : ''
        }`}
      >
        {/* Front of card */}
        <div 
          className="absolute w-full h-full backface-hidden rounded-xl p-6 flex flex-col"
          style={{ 
            background: frontGradient,
          }}
        >
          <div className="text-sm text-white opacity-80 mb-2">Question {index + 1}</div>
          <div className="text-xl font-bold text-white mb-4">{card.question}</div>
          <div className="text-white opacity-80 flex-1 flex items-center justify-center text-center">
            {!isFlipped && "Click to reveal answer"}
          </div>
          <div className="mt-4 flex justify-center">
            <motion.div 
              className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center"
              animate={{ rotate: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </div>
        </div>
        
        {/* Back of card */}
        <div 
          className={`absolute w-full h-full backface-hidden rounded-xl p-6 flex flex-col rotate-y-180 ${
            isDarkMode ? 'theme-card' : ''
          }`}
          style={{ 
            backgroundColor: isDarkMode ? 'var(--bg-card)' : "#FFFFFF",
            border: isDarkMode ? '1px solid var(--border-color)' : 'none'
          }}
        >
          <div className={`text-sm opacity-80 mb-2 ${
            isDarkMode ? 'theme-text-secondary' : 'text-gray-600'
          }`}>
            Answer {index + 1}
          </div>
          <div className={`text-xl font-bold mb-4 ${
            isDarkMode ? 'theme-text-primary' : 'text-gray-800'
          }`}>
            Answer:
          </div>
          <div className={`flex-1 overflow-auto ${
            isDarkMode ? 'theme-text-secondary' : 'text-gray-700'
          }`}>
            {card.answer}
          </div>
          
          {/* Response buttons */}
          <div className="mt-4 flex justify-between gap-4">
            <motion.button
              className={`flex-1 py-3 rounded-lg font-medium transition-all duration-200 ${
                isDarkMode 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-red-500 hover:bg-red-600 text-white'
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleDontKnow}
            >
              Don't Know
            </motion.button>
            
            <motion.button
              className={`flex-1 py-3 rounded-lg font-medium transition-all duration-200 ${
                isDarkMode 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleKnow}
            >
              Know
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FlashCard;