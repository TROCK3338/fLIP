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
      className="min-h-screen flex flex-col transition-colors duration-500 overflow-x-hidden"
      style={{ background: bgColor }}
    >
      <Header search={search} setSearch={setSearch} />

      {/* Tagline + Description */}
      <div className="w-full flex flex-col items-center px-4 pt-6 sm:pt-12">
        <h1 className="text-xl sm:text-4xl font-extrabold text-center leading-snug sm:leading-tight">
          Flip the card, play it smart.
        </h1>

        <p className="text-sm sm:text-lg text-gray-600 text-center mt-2 sm:mt-4 max-w-2xl">
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