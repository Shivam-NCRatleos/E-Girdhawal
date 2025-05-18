import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaArrowRight, FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ isLoggedIn, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = isLoggedIn
    ? [
        { title: 'Home', path: '/' },
        { title: 'Mobile Upload', path: '/upload' },
        { title: 'Compensation Request', path: '/compensation' },
      ]
    : [
        { title: 'About', path: '#about' },
        { title: 'Features', path: '#features' },
        { title: 'ML Model', path: '#ml-model' },
      ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.1 }}
      className={`fixed top-0 left-0 right-0 z-50 mx-4 my-2 sm:mx-8 sm:my-4 transition-all duration-200 ${
        scrolled ? 'bg-black/90' : 'bg-black/75'
      } backdrop-blur-lg rounded-2xl border border-white/10 shadow-lg`}
    >
      <div className="flex items-center justify-between h-16 px-6 sm:px-8">
        {/* App Logo and Name */}
        <motion.div whileHover={{ scale: 1.05 }} className="relative">
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"
          >
            E-Girdhawal
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center space-x-12">
          {navLinks.map((link, index) => (
            <motion.div key={index} className="relative">
              <Link
                to={link.path}
                className={`text-lg text-white/90 hover:text-green-400 transition-colors duration-300 ${
                  location.pathname === link.path ? 'text-green-400' : ''
                }`}
              >
                {link.title}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-500"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}

          {/* Login Button or User Profile */}
          {isLoggedIn ? (
            <div className="relative">
              <button
                className="flex items-center space-x-2 text-white/80 hover:text-white"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="User Profile"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <FaUserCircle className="text-2xl" />
                )}
                <span>{user.initials || 'User'}</span>
              </button>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-black/90 border border-white/10 rounded-lg shadow-lg"
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-white/80 hover:bg-black/80 hover:text-green-400"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => navigate('/logout')}
                    className="w-full text-left px-4 py-2 text-white/80 hover:bg-black/80 hover:text-red-400"
                  >
                    Sign Out
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/login"
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded-full flex items-center space-x-2 hover:shadow-lg hover:shadow-green-500/20 transition duration-300"
              >
                <span>Login</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="sm:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="sm:hidden overflow-hidden bg-black/90 rounded-lg mt-2"
          >
            <div className="flex flex-col space-y-4 px-6 py-4">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="text-white/80 hover:text-green-400"
                  onClick={() => setIsOpen(false)}
                >
                  {link.title}
                </Link>
              ))}
              {isLoggedIn && (
                <>
                  <Link
                    to="/profile"
                    className="text-white/80 hover:text-green-400"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => navigate('/logout')}
                    className="text-left text-white/80 hover:text-red-400"
                  >
                    Sign Out
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;