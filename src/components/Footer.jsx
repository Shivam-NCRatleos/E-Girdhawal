import React from "react";

// This matches the style/content of the Homepage footer.
// Adjust logo, links, and copyright as needed.

const Footer = () => (
  <footer className="bg-gray-900 text-white mt-10">
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row justify-between items-center border-t border-gray-700">
      <div className="flex items-center space-x-2">
        {/* Logo/Icon can be replaced with your own */}
        <img src="/logo192.png" alt="Logo" className="w-8 h-8" />
        <span className="font-bold text-lg">E-Girdhawal</span>
      </div>
      <div className="flex space-x-4 mt-4 sm:mt-0">
        <a href="/" className="hover:text-green-400 transition">Home</a>
        <a href="/about" className="hover:text-green-400 transition">About</a>
        <a href="/contact" className="hover:text-green-400 transition">Contact</a>
        <a href="/gallery" className="hover:text-green-400 transition">Gallery</a>
      </div>
      <div className="mt-4 sm:mt-0 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} E-Girdhawal. All Rights Reserved.
      </div>
    </div>
  </footer>
);

export default Footer;