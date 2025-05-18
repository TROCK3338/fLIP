import React from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const Header = ({ search, setSearch }) => {
  return (
    <header className="flex items-center justify-between p-2 m-2">
      <div className="flex items-center gap-2">
        <img src={logo} alt="fLIP" className="w-35 h-25 rounded-full" />
      </div>
      
      <div className="flex-1 max-w-lg justify-center align-center mr-25">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name or department..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-full bg-white bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0</svg>z"></path>
            </svg>
          </div>
        </div>
      </div>
      
      <motion.button 
        className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md"
        whileHover={{ scale: 1.1, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" }}
        whileTap={{ scale: 0.95 }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
      </motion.button>
    </header>
  );
};

export default Header;