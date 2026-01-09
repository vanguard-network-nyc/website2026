import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import GCLBanner from './GCLBanner';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { 
      name: 'ADVISORY', 
      path: '/advisory',
      dropdown: [
        { name: 'Advisory Services', path: '/advisory' },
        { name: 'Success Stories', path: '/success-stories' }
      ]
    },
    { 
      name: 'NETWORKS', 
      path: '/networking'
    },
    { name: 'PROGRAMS', path: '/programs' },
    { name: 'EVENTS', path: '/upcoming-events' },
    { 
      name: 'CONTENT', 
      dropdown: [
        { name: 'Articles', path: '/articles' },
        { name: 'Podcasts', path: '/podcasts' },
        { name: 'Videos', path: '/videos' },
        { name: 'Book', path: '/book' }
      ]
    },
    { name: 'NEWSROOM', path: '/newsroom' },
    { 
      name: 'CONTACT', 
      path: '/contact',
      dropdown: [
        { name: 'Contact Us', path: '/contact' },
        { name: 'Our Team', path: '/team' }
      ]
    }
  ];

  return (
    <>
      <GCLBanner />
      <motion.header
        className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'backdrop-blur-md shadow-lg' : ''
        }`}
        style={{ 
          top: '48px',
          backgroundColor: isScrolled ? 'rgba(4, 81, 132, 0.95)' : '#045184'
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center"
            >
              <img
                src="/logo.png"
                alt="The Vanguard Network Logo"
                className="h-10 md:h-16 w-auto object-contain max-w-[140px] md:max-w-xs"
                onError={(e) => {
                  console.error('Logo failed to load:', e);
                  e.target.style.display = 'none';
                }}
                onLoad={() => console.log('Logo loaded successfully')}
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                {item.dropdown ? (
                  // Dropdown menu
                  <div className="relative">
                    <Link 
                      to={item.path || '#'}
                      className="text-white hover:text-blue-400 font-medium transition-colors duration-200 relative group flex items-center"
                    >
                      {item.name}
                      <ChevronDown size={16} className="ml-1" />
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
                    </Link>
                    {/* Dropdown content */}
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.path}
                          className="block px-4 py-3 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Regular link - handle external links
                  item.external ? (
                    <a
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-blue-400 font-medium transition-colors duration-200 relative group"
                    >
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
                    </a>
                  ) : (
                    <Link
                      to={item.path}
                      className="text-white hover:text-blue-400 font-medium transition-colors duration-200 relative group"
                    >
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
                    </Link>
                  )
                )}
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <a
                href="https://members.thevanguardnetwork.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                style={{ backgroundColor: '#00A8E1' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#0096C7'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#00A8E1'}
              >
                MEMBER SITE
              </a>
            </motion.div>
          </nav>

          {/* Mobile/Tablet Menu Button */}
          <button
            className="xl:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

      </div>
    </motion.header>

      {/* Mobile Navigation (phones only < 768px) - Full Screen - Outside header for proper fixed positioning */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed left-0 right-0 bottom-0 bg-gradient-to-r from-[#0c2340] to-[#045184] z-50 flex flex-col overflow-y-auto"
            style={{ top: '120px' }}
          >
            <div className="px-4 py-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  {item.dropdown ? (
                    <div className="border-b border-slate-600/30 py-1.5">
                      <div className="text-white font-medium">{item.name}</div>
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.path}
                          className="block text-blue-300 hover:text-blue-100 pl-4 text-sm transition-colors duration-200 py-0.5"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    item.external ? (
                      <a
                        href={item.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-white hover:text-blue-400 font-medium transition-colors duration-200 border-b border-slate-600/30 py-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link
                        to={item.path}
                        className="block text-white hover:text-blue-400 font-medium transition-colors duration-200 border-b border-slate-600/30 py-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-4"
              >
                <a
                  href="https://members.thevanguardnetwork.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-center"
                  style={{ backgroundColor: '#00A8E1' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#0096C7'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#00A8E1'}
                  onClick={() => setIsMenuOpen(false)}
                >
                  MEMBER SITE
                </a>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Tablet Navigation (768px - 1279px) - Full Screen - Outside header for proper fixed positioning */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="hidden md:flex xl:hidden fixed left-0 right-0 bottom-0 bg-gradient-to-r from-[#0c2340] to-[#045184] z-50 flex-col"
            style={{ top: '140px' }}
          >
            <div className="px-8 py-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {item.dropdown ? (
                    <div className="border-b border-slate-600/30 py-2 lg:py-3">
                      <div className="text-white font-medium text-lg lg:text-xl">{item.name}</div>
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.path}
                          className="block text-blue-300 hover:text-blue-100 pl-4 text-base lg:text-lg transition-colors duration-200 py-1 lg:py-1.5"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    item.external ? (
                      <a
                        href={item.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-white hover:text-blue-400 font-medium text-lg lg:text-xl transition-colors duration-200 border-b border-slate-600/30 py-3 lg:py-4"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link
                        to={item.path}
                        className="block text-white hover:text-blue-400 font-medium text-lg lg:text-xl transition-colors duration-200 border-b border-slate-600/30 py-3 lg:py-4"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-4"
              >
                <a
                  href="https://members.thevanguardnetwork.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-white px-6 py-3 rounded-lg font-medium text-lg lg:text-xl transition-colors duration-200"
                  style={{ backgroundColor: '#00A8E1' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#0096C7'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#00A8E1'}
                  onClick={() => setIsMenuOpen(false)}
                >
                  MEMBER SITE
                </a>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
