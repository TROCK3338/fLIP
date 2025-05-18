import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header, Footer, Carousel, DetailView } from './components';
import characters from './data/characters';
import './styles/global.css';

const App = () => {
  const [selected, setSelected] = useState(null);
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(characters);

  useEffect(() => {
    const s = search.trim().toLowerCase();
    if (!s) setFiltered(characters);
    else setFiltered(
      characters.filter(
        c => c.name.toLowerCase().includes(s) || 
             (c.Department && c.Department.toLowerCase().includes(s))
      )
    );
  }, [search]);

  useEffect(() => {
    if (selected) setBgColor(selected.color);
    else setBgColor('#FFFFFF');
  }, [selected]);

  const selectedIdx = filtered.findIndex(c => c.name === selected?.name);
  const hasPrev = selectedIdx > 0;
  const hasNext = selectedIdx < filtered.length - 1;
  const handlePrev = () => hasPrev && setSelected(filtered[selectedIdx - 1]);
  const handleNext = () => hasNext && setSelected(filtered[selectedIdx + 1]);

  return (
    <div 
      className="fixed inset-0 flex flex-col transition-colors duration-500" 
      style={{ background: bgColor }}
    >
      <Header search={search} setSearch={setSearch} />
      
      {/* Tagline + Description */}
      <div>
        <h1 className="text-6xl font-bold text-center text-gray-800 mb-4">Flip the card, play it smart.</h1>
        <div className="text-[#808080] text-center">
          <span className="block">Discover a fresh way to explore flashcards across all your interests.</span>
          <span className="block">Effortless, engaging, and designed to make learning feel natural.</span>
          <span className="block">Give FLIP a moment—see the difference.</span>
        </div>
      </div>

      <main className="relative flex-1 flex items-center justify-center">
        <AnimatePresence initial={false}>
          {!selected && (
            <motion.div
              key="carousel"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: 'spring', stiffness: 350, damping: 32 }}
              className="w-full"
            >
              <Carousel characters={filtered} onSelect={setSelected} />
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {selected && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 bg-black z-10"
                onClick={() => setSelected(null)}
              />
              
              <DetailView
                character={selected}
                onClose={() => setSelected(null)}
                onPrev={handlePrev}
                onNext={handleNext}
                hasPrev={hasPrev}
                hasNext={hasNext}
              />
            </>
          )}
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
};

export default App;