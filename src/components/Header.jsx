import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import logo from '../assets/logo.png';
import AddCardForm from './AddCardForm';

const Header = ({ search, setSearch, onAddCard }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const inputRef = useRef(null);
  const { isDarkMode, toggleTheme } = useTheme();

  // Close search on outside click (mobile)
  useEffect(() => {
    const handleClickOutside = e => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    };
    if (showSearch) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSearch]);

  const handleAddCard = (newCard) => {
    onAddCard(newCard);
    setShowAddForm(false);
  };

  // Theme toggle icon component
  const ThemeToggleIcon = () => (
    <motion.button 
      onClick={toggleTheme}
      className="theme-toggle"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDarkMode ? 180 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {isDarkMode ? (
          // Sun icon for light mode
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          // Moon icon for dark mode
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </motion.div>
    </motion.button>
  );

  return (
    <>
      <header className="flex items-center justify-between p-2 m-2 gap-2 sm:gap-4">
        
        {/* Mobile View */}
        <div className="flex sm:hidden w-full items-center justify-between">
          <AnimatePresence mode="wait">
            {showSearch ? (
              <motion.div
                ref={inputRef}
                key="searchInput"
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="flex items-center gap-2 w-full"
              >
                <input
                  autoFocus
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-full theme-input shadow-sm transition-all duration-150"
                />
                <ThemeToggleIcon />
              </motion.div>
            ) : (
              <motion.div
                key="defaultHeader"
                layout
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="flex w-full items-center justify-between"
              >
                {/* Search Icon */}
                <button
                  onClick={() => setShowSearch(true)}
                  className="theme-text-secondary hover:theme-text-primary transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>

                {/* Premium Logo */}
                <img
                  src={logo}
                  alt="fLIP"
                  className="w-24 h-14 rounded-full object-contain drop-shadow-md"
                />

                {/* Theme Toggle + Plus Icon */}
                <div className="flex items-center gap-2">
                  <ThemeToggleIcon />
                  
                  <motion.button 
                    onClick={() => setShowAddForm(true)}
                    className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md relative overflow-hidden"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      whileHover={{ rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </motion.div>
                    
                    {/* Ripple effect */}
                    <motion.div
                      className="absolute inset-0 bg-white rounded-full"
                      initial={{ scale: 0, opacity: 0.3 }}
                      whileTap={{ scale: 2, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop View */}
        <div className="hidden sm:flex w-full items-center justify-between gap-4">
          {/* Enhanced Logo */}
          <img
            src={logo}
            alt="fLIP"
            className="w-28 h-16 rounded-full object-contain drop-shadow-md"
          />

          {/* Search Bar */}
          <div className="flex-1 max-w-lg relative">
            <input
              type="text"
              placeholder="Search by name or department..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-4 py-2 rounded-full theme-input shadow-sm"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-4 h-4 theme-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Theme Toggle + Plus Icon */}
          <div className="flex items-center gap-3">
            <ThemeToggleIcon />
            
            <motion.button 
              onClick={() => setShowAddForm(true)}
              className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md relative overflow-hidden group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </motion.div>
              
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              
              {/* Ripple effect */}
              <motion.div
                className="absolute inset-0 bg-white rounded-full"
                initial={{ scale: 0, opacity: 0.3 }}
                whileTap={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Add Card Form Modal */}
      <AddCardForm
        isOpen={showAddForm}
        onClose={() => setShowAddForm(false)}
        onSubmit={handleAddCard}
      />
    </>
  );
};

export default Header;