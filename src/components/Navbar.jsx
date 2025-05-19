import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { AuthContext } from '../main'; // Adjust this path if needed

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Determine if admin
  const isAdmin = user?.userType === 'admin';

  const navLinks = user
    ? isAdmin
      ? [
          { title: 'Profile', path: '/profile' },
          { title: 'Users', path: '/admin/users' },
          { title: 'Tickets', path: '/admin/tickets' },
          { title: 'Graphs & Matrices', path: '/admin/graphs' },
          { title: 'Remove User', path: '/admin/remove-user' },
        ]
      : [
          { title: 'Home', path: '/' },
          { title: 'Mobile Upload', path: '/upload' },
          { title: 'Forms', path: '/forms' },
        ]
    : [
        { title: 'About', path: '/About' },
        { title: 'Features', path: '/#features' },
        { title: 'ML Model', path: '/#ml-model' },
      ];

  const handleSignOut = () => {
    logout();
    setDropdownOpen(false);
    navigate('/'); // Redirect to home after logout
  };

  const handleAuthClick = () => {
    navigate('/auth'); // Redirect to AuthPage
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl shadow-lg px-6 py-4">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-green-400">
          E-Girdhawal
        </Link>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="text-white hover:text-green-400 transition"
            >
              {link.title}
            </Link>
          ))}

          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 text-white"
              >
                {user?.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="User Profile"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <FaUserCircle className="text-2xl" />
                )}
                <span>{user?.name || user?.email || 'User'}</span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-black rounded-lg shadow-lg z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-white hover:bg-green-400"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-white hover:bg-red-400"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleAuthClick}
              className="bg-green-400 text-white px-6 py-2 rounded-full"
            >
              Login / Sign Up
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden text-white"
        >
          {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>
      </div>

      {isOpen && (
        <div className="sm:hidden mt-4 space-y-2">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="block text-white hover:text-green-400"
              onClick={() => setIsOpen(false)}
            >
              {link.title}
            </Link>
          ))}
          {user ? (
            <>
              <Link
                to="/profile"
                className="block text-white hover:text-green-400"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleSignOut();
                }}
                className="block w-full text-left text-white hover:text-red-400"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setIsOpen(false);
                handleAuthClick();
              }}
              className="block w-full text-white hover:text-green-400 text-left"
            >
              Login / Sign Up
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;