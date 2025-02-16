import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Paslaugos', path: '/services' },
    { name: 'Galerija', path: '/gallery' },
    { name: 'Rezervuoti', path: '/booking' }
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2">
            <Sun className="h-8 w-8 text-elida-gold" />
            <span className="font-playfair text-2xl font-bold text-elida-gold">ÉLIDA</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-lato text-sm tracking-wide ${
                  location.pathname === link.path
                    ? 'text-elida-gold'
                    : 'text-gray-600 hover:text-elida-gold'
                } transition-colors duration-300`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-elida-gold"
                    initial={false}
                  />
                )}
              </Link>
            ))}
            <Link
              to="/booking"
              className="px-6 py-2 bg-elida-gold text-white rounded-full font-medium text-sm hover:bg-elida-accent transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Rezervuoti Laiką
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-elida-gold hover:bg-gray-100"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, height: "auto" },
          closed: { opacity: 0, height: 0 }
        }}
        className="md:hidden overflow-hidden bg-white border-t"
      >
        <div className="px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === link.path
                  ? 'text-elida-gold bg-elida-beige/50'
                  : 'text-gray-600 hover:text-elida-gold hover:bg-gray-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/booking"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center mt-4 px-6 py-3 bg-elida-gold text-white rounded-full font-medium hover:bg-elida-accent transition-colors duration-300"
          >
            Rezervuoti Laiką
          </Link>
        </div>
      </motion.div>
    </nav>
  );
}