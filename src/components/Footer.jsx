import React from 'react';

const Footer = () => {
  return (
    <div className="absolute bottom-4 left-14 z-10 flex items-center gap-8">
      <a 
        href="https://github.com/TROCK3338" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex items-center text-gray-600 hover:text-[#3d3f71] transition-colors"
      >GitHub
      </a>
      <a 
        href="https://www.linkedin.com/in/aman-singhall/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex items-center text-gray-600 hover:text-[#3d3f71] transition-colors"
      >
        LinkedIn
      </a>
    </div>
  );
};

export default Footer;