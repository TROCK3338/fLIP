import React from 'react';

const Footer = () => {
  return (
    <div className="hidden sm:flex relative w-full mt-6 justify-center sm:justify-start sm:absolute sm:bottom-4 sm:left-14 z-10 gap-6 sm:gap-8">
      <a 
        href="https://github.com/TROCK3338" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-gray-600 hover:text-[#3d3f71] transition-colors"
      >
        GitHub
      </a>
      <a 
        href="https://www.linkedin.com/in/aman-singhall/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-gray-600 hover:text-[#3d3f71] transition-colors"
      >
        LinkedIn
      </a>
    </div>
  );
};

export default Footer;