import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CharacterCard = ({ character, onSelect }) => {
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <motion.div
      layoutId={`card-${character.name}`}
      transition={{ type: 'spring', stiffness: 350, damping: 32 }}
      className="flex-shrink-0 w-64 h-60 rounded-2xl shadow-lg flex flex-col items-center justify-end p-6 cursor-pointer relative mt-15"
      style={{ 
        background: `linear-gradient(to bottom, ${character.color}70, ${character.color})`,
        color: '#FFFFFF',
        transformOrigin: 'center'
      }}
      onClick={() => onSelect(character)}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
      whileHover={{ 
        scale: 1.05, 
        boxShadow: "0px 10px 25px rgba(0,0,0,0.15)",
      }}
    >
      <motion.div 
        className="absolute -top-16 left-1/2 transform -translate-x-1/2"
        layoutId={`img-container-${character.name}`}
      >
        <motion.img 
          layoutId={`img-${character.name}`}
          transition={{ type: 'spring', stiffness: 350, damping: 32 }}
          src={character.image}
          alt={character.name}
          className="w-32 h-32 object-contain drop-shadow-md"
        />
      </motion.div>
      
      <motion.div 
        layoutId={`title-${character.name}`} 
        transition={{ type: 'spring', stiffness: 350, damping: 32 }} 
        className="mt-20 text-xl font-bold mb-1 text-center"
      >
        {character.name}
      </motion.div>
      
      <div className="text-sm opacity-80 text-center mb-4">Department: {character.Department}</div>
      
      <AnimatePresence>
        {isHovering && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-sm font-medium text-white"
          >
            View here
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CharacterCard;