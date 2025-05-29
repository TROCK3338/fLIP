import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Header, Footer, Carousel, DetailView } from './components';
import characters from './data/characters';
import './styles/global.css';

const AppContent = () => {
  const [selected, setSelected] = useState(null);
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [search, setSearch] = useState('');
  const [allCharacters, setAllCharacters] = useState(characters);
  const [filtered, setFiltered] = useState(characters);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const s = search.trim().toLowerCase();
    if (!s) setFiltered(allCharacters);
    else setFiltered(
      allCharacters.filter(
        c => c.name.toLowerCase().includes(s) || 
             (c.Department && c.Department.toLowerCase().includes(s))
      )
    );
  }, [search, allCharacters]);

  useEffect(() => {
    if (selected) {
      // Apply selected character color with theme awareness
      setBgColor(selected.color);
    } else {
      // Use theme-appropriate default background
      setBgColor(isDarkMode ? '#0f172a' : '#FFFFFF');
    }
  }, [selected, isDarkMode]);

  const handleAddCard = (newCard) => {
    setAllCharacters(prev => [...prev, newCard]);
    
    // Optional: Show a success notification
    // You could add a toast notification here
    console.log('New card added:', newCard);
  };

  const selectedIdx = filtered.findIndex(c => c.name === selected?.name);
  const hasPrev = selectedIdx > 0;
  const hasNext = selectedIdx < filtered.length - 1;
  const handlePrev = () => hasPrev && setSelected(filtered[selectedIdx - 1]);
  const handleNext = () => hasNext && setSelected(filtered[selectedIdx + 1]);

  return (
    <div
      className="min-h-screen flex flex-col transition-all duration-500 overflow-x-hidden"
      style={{ background: bgColor }}
    >
      <Header search={search} setSearch={setSearch} onAddCard={handleAddCard} />

      {/* Tagline + Description */}
      <div className="w-full flex flex-col items-center px-4 pt-6 sm:pt-12">
        <h1 className={`text-xl sm:text-4xl font-extrabold text-center leading-snug sm:leading-tight transition-colors duration-300 ${
          selected ? 'text-white' : 'theme-text-primary'
        }`}>
          Flip the card, play it smart.
        </h1>

        <p className={`text-sm sm:text-lg text-center mt-2 sm:mt-4 max-w-2xl transition-colors duration-300 ${
          selected ? 'text-white text-opacity-90' : 'theme-text-secondary'
        }`}>
          Discover a refreshing way to explore flashcards — effortless, engaging, and designed to make learning feel natural. Whether you're brushing up on topics or diving deep into something new, FLIP makes it simple and smart.
        </p>
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
              className="w-full mt-4 sm:mt-10"
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
                animate={{ opacity: isDarkMode ? 0.7 : 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 bg-black z-10"
                onClick={() => setSelected(null)}
                style={{ backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)' }}
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

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;