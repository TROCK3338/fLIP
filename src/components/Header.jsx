import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

const Header = ({ search, setSearch }) => {
  const [showSearch, setShowSearch] = useState(false);
  const inputRef = useRef(null);

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

  return (
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
                className="flex-1 px-4 py-2 rounded-full bg-white bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm transition-all duration-150"
              />
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
                className="text-gray-600"
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

              {/* Plus Icon */}
              <motion.button 
                className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </motion.button>
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
            className="w-full px-4 py-2 rounded-full bg-white bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Plus Icon */}
        <motion.button 
          className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
        </motion.button>
      </div>
    </header>
  );
};

export default Header;