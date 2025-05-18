import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import CharacterCard from './CharacterCard';

const Carousel = ({ characters, onSelect }) => {
  const carouselRef = useRef(null);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  
  const getVisibleCardCount = () => {
    if (!carouselRef.current) return 3;
    const containerWidth = carouselRef.current.clientWidth;
    const cardWidth = 256 + 40; // Card width (w-64) + gap (gap-10)
    return Math.floor(containerWidth / cardWidth);
  };
  
  const scrollToIndex = (index) => {
    if (!carouselRef.current) return;
    
    const maxIndex = characters.length - getVisibleCardCount();
    const boundedIndex = Math.max(0, Math.min(index, maxIndex));
    
    const cardWidth = 256 + 40;
    const newScrollLeft = boundedIndex * cardWidth;
    
    carouselRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
    
    setVisibleIndex(boundedIndex);
    updateScrollButtons(boundedIndex);
  };
  
  const updateScrollButtons = (index) => {
    setCanScrollLeft(index > 0);
    setCanScrollRight(index < characters.length - getVisibleCardCount());
  };
  
  const handleScroll = () => {
    if (!carouselRef.current) return;
    
    const { scrollLeft } = carouselRef.current;
    const cardWidth = 256 + 40;
    const currentIndex = Math.round(scrollLeft / cardWidth);
    
    setVisibleIndex(currentIndex);
    updateScrollButtons(currentIndex);
  };
  
  useEffect(() => {
    updateScrollButtons(visibleIndex);
    
    const handleResize = () => {
      updateScrollButtons(visibleIndex);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [visibleIndex]);

  return (
    <div className="w-full relative">
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 flex justify-between w-full px-4 pointer-events-none">
        <motion.button
          className={`w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center pointer-events-auto ${!canScrollLeft ? 'opacity-0' : 'opacity-100'}`}
          initial={{ x: -20, opacity: 0 }}
          animate={{ 
            x: canScrollLeft ? 0 : -20,
            opacity: canScrollLeft ? 1 : 0
          }}
          onClick={() => scrollToIndex(visibleIndex - 1)}
          disabled={!canScrollLeft}
          whileHover={{ scale: 1.1, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>
        
        <motion.button
          className={`w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center pointer-events-auto ${!canScrollRight ? 'opacity-0' : 'opacity-100'}`}
          initial={{ x: 20, opacity: 0 }}
          animate={{ 
            x: canScrollRight ? 0 : 20,
            opacity: canScrollRight ? 1 : 0
          }}
          onClick={() => scrollToIndex(visibleIndex + 1)}
          disabled={!canScrollRight}
          whileHover={{ scale: 1.1, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>
      
      <div 
        ref={carouselRef}
        className="flex overflow-x-auto gap-10 pb-10 pt-20 px-8 no-scrollbar"
        onScroll={handleScroll}
      >
        {characters.map((char) => (
          <CharacterCard 
            key={char.name} 
            character={char} 
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;