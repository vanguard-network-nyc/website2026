import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';
import Slider from 'react-slick';
import ReactMarkdown from 'react-markdown';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { 
  Menu, 
  X, 
  ChevronRight,
  ChevronLeft, 
  ChevronDown,
  Play, 
  Users, 
  Target, 
  BookOpen, 
  Award,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Star,
  Network,
  MessageCircle,
  UserCheck,
  Newspaper,
  Shield,
  Video,
  Bot,
  Search,
  Filter,
  Grid,
  List,
  Clock,
  TrendingUp,
  CheckCircle2,
  Linkedin,
  Globe,
  Calendar,
  ExternalLink,
  Headphones,
  FileText
} from 'lucide-react';

// GCL Banner Component
const GCLBanner = () => {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 w-full bg-gray-200 text-slate-800 py-2 sm:py-3 px-2 sm:px-4 border-b border-gray-300 z-50"
    >
      <div className="max-w-7xl mx-auto">
        <Link 
          to="/global-counsel-leaders"
          className="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 hover:opacity-80 transition-opacity duration-200"
        >
          {/* Mobile: Line 1 - "Now incorporating the" centered */}
          <span className="text-xs font-bold text-center sm:hidden">
            Now incorporating the
          </span>
          {/* Mobile: Line 2 - Logo + Community + Read more */}
          <div className="flex items-center justify-center gap-1 sm:hidden">
            <img
              src="https://static.wixstatic.com/media/e6a994_d8ffd6feab98477786e859a280b2eb5d~mv2.png/v1/fill/w_338,h_32,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/GCL.png"
              alt="Global Counsel Leaders"
              className="h-4"
            />
            <span className="text-xs font-bold">Community.</span>
            <span className="text-blue-700 font-bold text-xs flex items-center gap-0.5">
              Read more
              <ArrowRight size={12} />
            </span>
          </div>
          {/* Desktop: All on one line */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-sm font-bold">
              Now incorporating the
            </span>
            <img
              src="https://static.wixstatic.com/media/e6a994_d8ffd6feab98477786e859a280b2eb5d~mv2.png/v1/fill/w_338,h_32,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/GCL.png"
              alt="Global Counsel Leaders"
              className="h-6"
            />
            <span className="text-sm font-bold">
              Community.
            </span>
            <span className="text-blue-700 font-bold text-sm flex items-center gap-1">
              Read more
              <ArrowRight size={14} />
            </span>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

// Animation variants for consistent scroll and page load animations
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const slideInLeftVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const slideInRightVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Custom hook for scroll-triggered animations
const useScrollAnimation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return { ref, isInView };
};

// Header Component
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
        { name: 'Client Success Stories', path: '/case-studies' }
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
                      {item.dropdown.map((subItem, subIndex) => (
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

        {/* Mobile Navigation (phones only < 768px) - Full Screen */}
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

        {/* Tablet Navigation (768px - 1279px) - Full Screen */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="hidden md:flex xl:hidden fixed left-0 right-0 bottom-0 bg-gradient-to-r from-[#0c2340] to-[#045184] z-40 flex-col"
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
      </div>
    </motion.header>
    </>
  );
};

// Hero Section
const Footer = () => {
  const footerLinks = [
    { name: 'Contact Us', path: '/contact' },
    { name: 'Our Team', path: '/team' },
    { name: 'LinkedIn', path: 'https://www.linkedin.com/company/thevanguardnetwork/' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Use', path: '/terms' },
    { name: 'Become a Member', path: '/networking' }
  ];

  return (
    <footer className="bg-slate-900 text-white py-6 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          {footerLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              {link.path.startsWith('http') ? (
                <a
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-blue-400 transition-colors duration-200 text-sm"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  to={link.path}
                  className="text-white/70 hover:text-blue-400 transition-colors duration-200 text-sm"
                >
                  {link.name}
                </Link>
              )}
            </motion.div>
          ))}
        </div>
        
        <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm mb-4 md:mb-0">
            © 2025 The Vanguard Network
          </p>
          
          <div className="flex items-center space-x-4">
            <motion.a
              whileHover={{ scale: 1.1, color: '#0077b5' }}
              href="https://www.linkedin.com/company/thevanguardnetwork/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-[#0077b5] transition-colors duration-200"
              title="Follow us on LinkedIn"
            >
              <Linkedin size={20} />
            </motion.a>
            <Link to="/contact">
              <motion.div
                whileHover={{ scale: 1.1, color: '#3b82f6' }}
                className="text-white/60 hover:text-blue-400 transition-colors duration-200 cursor-pointer"
              >
                <Mail size={20} />
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Additional Pages
const AdvisoryPage = () => {
  const [activeTab, setActiveTab] = useState('strategic'); // 'strategic', 'organizational', 'client'

  // Map tab keys to their corresponding hash IDs
  const tabToHash = {
    'strategic': 'strategic-counsel',
    'organizational': 'organizational-transformation',
    'client': 'client-and-stakeholder-engagement'
  };

  // Handle tab change and update URL hash
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    const hash = tabToHash[tab];
    if (hash) {
      window.history.replaceState(null, '', `#${hash}`);
    }
  };

  useEffect(() => {
    // Handle hash navigation on page load
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      // Set active tab based on hash
      if (id === 'strategic-counsel') {
        setActiveTab('strategic');
      } else if (id === 'organizational-transformation') {
        setActiveTab('organizational');
      } else if (id === 'client-and-stakeholder-engagement') {
        setActiveTab('client');
      }
      // Scroll to the services section after a short delay
      setTimeout(() => {
        const element = document.getElementById('advisory-services-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-12 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100"
      style={{ visibility: 'visible' }}
    >
    {/* Hero Section */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8 mb-20">
      <Breadcrumb />
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 
          className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent py-2 leading-tight"
        >
          Leadership Advisory & Development
        </h1>
        <div className="max-w-5xl mx-auto">
          <p className="text-2xl text-slate-600 leading-relaxed font-medium mb-16">
            We know that leadership is the catalyst for change and transformation, powered by the human factor that drives authentic connections between leaders and their teams.
          </p>
        </div>
      </motion.div>
    </div>

    {/* Three Approaches Section with Tabs */}
    <div id="advisory-services-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8" style={{ scrollMarginTop: '100px' }}>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mb-20"
      >
        {/* Section Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#045184]/5 to-[#00A8E1]/5 rounded-3xl transform -skew-y-1"></div>
          <div className="relative py-6 md:py-12 px-4 md:px-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#045184] to-[#00A8E1] flex items-center justify-center mx-auto mb-6"
            >
              <Users size={32} className="text-white" />
            </motion.div>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Three Ways We Work With Executives<br />To Build High-Performance Organizations
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium">
              Our comprehensive approach delivers three distinct types of advisory services to accelerate your leadership impact and organizational success.
            </p>
          </div>
        </div>
        
        {/* Mobile Tab Navigation - Horizontal Tabs with Two Lines */}
        <div className="md:hidden mb-6">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide text-center mb-4">
            Select a service
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleTabChange('strategic')}
              className={`px-2 py-4 rounded-xl font-semibold text-xs transition-all duration-300 text-center leading-tight ${
                activeTab === 'strategic'
                  ? 'bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white shadow-lg'
                  : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-[#00A8E1]'
              }`}
            >
              <span className="block">Strategic</span>
              <span className="block">Counsel</span>
            </button>
            <button
              onClick={() => handleTabChange('organizational')}
              className={`px-2 py-4 rounded-xl font-semibold text-xs transition-all duration-300 text-center leading-tight ${
                activeTab === 'organizational'
                  ? 'bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white shadow-lg'
                  : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-[#00A8E1]'
              }`}
            >
              <span className="block">Organizational</span>
              <span className="block">Transformation</span>
            </button>
            <button
              onClick={() => handleTabChange('client')}
              className={`px-2 py-4 rounded-xl font-semibold text-xs transition-all duration-300 text-center leading-tight ${
                activeTab === 'client'
                  ? 'bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white shadow-lg'
                  : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-[#00A8E1]'
              }`}
            >
              <span className="block">Client</span>
              <span className="block">Engagement</span>
            </button>
          </div>
        </div>

        {/* Desktop Tab Navigation Block - Hidden on Mobile */}
        <div className="hidden md:block bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden mb-12">
          <div className="text-center py-4 bg-slate-50 border-b border-slate-200">
            <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide px-4">
              Click below to explore our advisory services
            </p>
          </div>
          <div className="grid grid-cols-3">
            {/* Strategic Counsel Tab */}
            <motion.button
              onClick={() => handleTabChange('strategic')}
              whileHover={{ scale: activeTab !== 'strategic' ? 1.02 : 1 }}
              whileTap={{ scale: 0.98 }}
              className={`p-8 text-left transition-all duration-300 cursor-pointer relative group ${
                activeTab === 'strategic'
                  ? 'bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white shadow-lg'
                  : 'bg-white text-slate-900 hover:bg-blue-50 hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className={`text-2xl font-bold mb-3 ${activeTab === 'strategic' ? 'text-white' : 'text-slate-900 group-hover:text-[#045184]'}`}>
                    Strategic Counsel
                  </h3>
                  <p className={`text-base mb-2 ${activeTab === 'strategic' ? 'text-white/90' : 'text-slate-600'}`}>
                    Direct one-on-one coaching and strategic sounding board support for senior executives.
                  </p>
                </div>
                <div className={`ml-4 flex-shrink-0 transition-transform duration-300 ${activeTab !== 'strategic' ? 'group-hover:translate-x-1' : ''}`}>
                  <ArrowRight size={28} className={activeTab === 'strategic' ? 'text-white' : 'text-[#00A8E1]'} />
                </div>
              </div>
              {activeTab === 'strategic' && (
                <div className="mt-3 flex items-center text-sm text-white/80">
                  <CheckCircle2 size={16} className="mr-2" />
                  Currently viewing
                </div>
              )}
              {activeTab !== 'strategic' && (
                <div className="mt-3 flex items-center text-sm text-[#00A8E1] font-semibold">
                  Click to view details →
                </div>
              )}
            </motion.button>

            {/* Organizational Transformation Tab */}
            <motion.button
              onClick={() => handleTabChange('organizational')}
              whileHover={{ scale: activeTab !== 'organizational' ? 1.02 : 1 }}
              whileTap={{ scale: 0.98 }}
              className={`p-8 text-left transition-all duration-300 cursor-pointer relative group border-l border-slate-200 ${
                activeTab === 'organizational'
                  ? 'bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white shadow-lg'
                  : 'bg-white text-slate-900 hover:bg-blue-50 hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className={`text-2xl font-bold mb-3 ${activeTab === 'organizational' ? 'text-white' : 'text-slate-900 group-hover:text-[#045184]'}`}>
                    Organizational Transformation
                  </h3>
                  <p className={`text-base mb-2 ${activeTab === 'organizational' ? 'text-white/90' : 'text-slate-600'}`}>
                    Transform what your people believe, the way they work, and how they behave.
                  </p>
                </div>
                <div className={`ml-4 flex-shrink-0 transition-transform duration-300 ${activeTab !== 'organizational' ? 'group-hover:translate-x-1' : ''}`}>
                  <ArrowRight size={28} className={activeTab === 'organizational' ? 'text-white' : 'text-[#00A8E1]'} />
                </div>
              </div>
              {activeTab === 'organizational' && (
                <div className="mt-3 flex items-center text-sm text-white/80">
                  <CheckCircle2 size={16} className="mr-2" />
                  Currently viewing
                </div>
              )}
              {activeTab !== 'organizational' && (
                <div className="mt-3 flex items-center text-sm text-[#00A8E1] font-semibold">
                  Click to view details →
                </div>
              )}
            </motion.button>

            {/* Client and Stakeholder Engagement Tab */}
            <motion.button
              onClick={() => handleTabChange('client')}
              whileHover={{ scale: activeTab !== 'client' ? 1.02 : 1 }}
              whileTap={{ scale: 0.98 }}
              className={`p-8 text-left transition-all duration-300 cursor-pointer relative group border-l border-slate-200 ${
                activeTab === 'client'
                  ? 'bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white shadow-lg'
                  : 'bg-white text-slate-900 hover:bg-blue-50 hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className={`text-2xl font-bold mb-3 ${activeTab === 'client' ? 'text-white' : 'text-slate-900 group-hover:text-[#045184]'}`}>
                    Client & Stakeholder Engagement
                  </h3>
                  <p className={`text-base mb-2 ${activeTab === 'client' ? 'text-white/90' : 'text-slate-600'}`}>
                    Leadership Exchanges that transform supplier relationships into peer and trusted advisor roles.
                  </p>
                </div>
                <div className={`ml-4 flex-shrink-0 transition-transform duration-300 ${activeTab !== 'client' ? 'group-hover:translate-x-1' : ''}`}>
                  <ArrowRight size={28} className={activeTab === 'client' ? 'text-white' : 'text-[#00A8E1]'} />
                </div>
              </div>
              {activeTab === 'client' && (
                <div className="mt-3 flex items-center text-sm text-white/80">
                  <CheckCircle2 size={16} className="mr-2" />
                  Currently viewing
                </div>
              )}
              {activeTab !== 'client' && (
                <div className="mt-3 flex items-center text-sm text-[#00A8E1] font-semibold">
                  Click to view details →
                </div>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>

    {/* Tab Content Sections - Display Directly Below Tabs */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8 -mt-[34px]">
      <div className="space-y-12">
        
        {/* Strategic Counsel Section */}
        {activeTab === 'strategic' && (
        <motion.div
          id="strategic-counsel"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative"
          style={{ scrollMarginTop: '120px' }}
        >
          {/* Upward Triangle Caret Indicator - Points to Strategic Counsel tab (1st of 3) */}
          <div className="absolute -top-4 left-[16.67%] md:left-[16.67%] transform -translate-x-1/2">
            <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[16px] border-b-[#045184]"></div>
          </div>
          
          <div className="bg-white rounded-2xl py-4 md:py-8 md:py-6 md:py-12 shadow-xl border-t-4 border-[#045184]">
          <div className="px-4 sm:px-6 lg:px-4 md:px-8">
            {/* Strategic Counsel Title */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-8 text-center">Strategic Counsel</h2>
            
            {/* Coaching Subsection */}
            <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:p-12 items-center">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.8 }}
              >
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Coaching</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  We work with leaders on specific development goals to help them be more effective decision-makers and developers of their people. This can include exploring additional personal or professional growth areas, creating and implementing organizational strategies for incremental improvement, and contributing to enterprise transformational change.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  We also help leaders similarly with their teams, developing high performance and overcoming barriers. This work can include customized training and development programs, building effective working cultures, and carrying out talent assessments and development plans.
                </p>
              </motion.div>
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="rounded-xl p-4 md:p-8" 
                style={{ backgroundColor: '#045184' }}
              >
                <h4 className="text-2xl font-bold text-white mb-4">Key Focus Areas</h4>
                <ul className="space-y-3 text-white">
                  {[
                    "Effective decision-making",
                    "People development", 
                    "Organizational strategy",
                    "Transformational change",
                    "Team development"
                  ].map((item, index) => (
                    <motion.li
                      key={item}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
                      className="flex items-center"
                    >
                      <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00A8E1' }}></div>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
            
            {/* Coaching Testimonial */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="mt-12 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-4 md:p-8"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <img 
                    src="https://customer-assets.emergentagent.com/job_ux-revamp-suite/artifacts/wctgezyh_Jim%20Jenson.jpg"
                    alt="Jim Jenson testimonial"
                    className="w-20 h-20 rounded-full object-cover shadow-lg"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <blockquote className="text-lg italic text-slate-700 mb-4 leading-relaxed">
                    "Too often in my experience, consultants deliver generic advice -- or recommendations that are disconnected from our reality. Vanguard is different. An hour of Ken's time can be worth several days of conventional consulting."
                  </blockquote>
                  <div className="text-slate-900 font-bold">Jim Jenson</div>
                  <div className="text-slate-600 text-sm">CEO, Morphoceuticals</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sounding Board Subsection */}
          <div className="mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:p-12 items-center">
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.8 }}
              >
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Sounding Board</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  This approach is typically most appropriate for the senior leader in the organization or team and their direct reports.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  TVN's Ken Banta and Richard Hulme have decades of experience supporting CEOs and C-suite executives and their reports as they work through specific challenges and develop strategy and execution plans for themselves and their teams.
                </p>
              </motion.div>
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.8 }}
                className="rounded-xl p-4 md:p-8" 
                style={{ backgroundColor: '#045184' }}
              >
                <h4 className="text-2xl font-bold text-white mb-4">Key Focus Areas</h4>
                <ul className="space-y-3 text-white">
                  {[
                    "CEO and C-suite support",
                    "Leadership team dynamics",
                    "Strategic decision-making",
                    "Board relations",
                    "Stakeholder management"
                  ].map((item, index) => (
                    <motion.li
                      key={item}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.8 + index * 0.1, duration: 0.5 }}
                      className="flex items-center"
                    >
                      <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00A8E1' }}></div>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
            
            {/* Sounding Board Testimonial */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="mt-12 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-4 md:p-8"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <img 
                    src="https://customer-assets.emergentagent.com/job_ux-revamp-suite/artifacts/kzouq217_Ram.jpeg"
                    alt="Ram Charan testimonial"
                    className="w-20 h-20 rounded-full object-cover shadow-lg"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <blockquote className="text-lg italic text-slate-700 mb-4 leading-relaxed">
                    "Asking the right questions is often the most important role a trusted advisor can play. Not many consultants have this capability. Ken Banta is world-class."
                  </blockquote>
                  <div className="text-slate-900 font-bold">Ram Charan</div>
                  <div className="text-slate-600 text-sm">Business Consultant and Best-Selling Author, Charan Associates</div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Case Study Link */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.0, duration: 0.8 }}
            className="mt-8 text-center"
          >
            <Link
              to="/case-studies?category=leadership-advisory"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white px-4 md:px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 group"
            >
              View Leadership Advisory Client Success Stories
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
          </div>
          </div>
        </motion.div>
        )}

        {/* Organizational Transformation Section */}
        {activeTab === 'organizational' && (
        <motion.div
          id="organizational-transformation"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative"
          style={{ scrollMarginTop: '120px' }}
        >
          {/* Upward Triangle Caret Indicator - Points to Organizational Transformation tab (2nd of 3) */}
          <div className="absolute -top-4 left-1/2 md:left-1/2 transform -translate-x-1/2">
            <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[16px] border-b-[#045184]"></div>
          </div>
          
          <div className="bg-white rounded-2xl py-4 md:py-8 md:py-6 md:py-12 shadow-xl border-t-4 border-[#045184]">
          <div className="px-4 sm:px-6 lg:px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:p-12 items-center">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Organizational Transformation</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                We help transform what your people believe, the way they work, and how they behave. Our approach is grounded in decades of experience with major multinationals and global service firms.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We're not a conventional large strategic consultancy. Instead, we're a lean and focused team with deep, real-world experience in catalyzing organizational change that sticks and delivers measurable results.
              </p>
            </motion.div>
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="rounded-xl p-4 md:p-8" 
              style={{ backgroundColor: '#045184' }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">Key Focus Areas</h3>
              <ul className="space-y-3 text-white">
                {[
                  "Cultural transformation",
                  "Change management", 
                  "Process optimization",
                  "Leadership alignment",
                  "Performance enhancement"
                ].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.6 + index * 0.1, duration: 0.5 }}
                    className="flex items-center"
                  >
                    <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00A8E1' }}></div>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
          
          {/* Organizational Transformation Testimonial */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="mt-12 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-4 md:p-8"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <img 
                  src="https://customer-assets.emergentagent.com/job_ux-revamp-suite/artifacts/xlsk8jvy_Mohamed%20Ladha.jpeg"
                  alt="Mohamed Ladha testimonial"
                  className="w-20 h-20 rounded-full object-cover shadow-lg"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <blockquote className="text-lg italic text-slate-700 mb-4 leading-relaxed">
                  "Ken and his team at Vanguard played a very important role in building alignment on our leadership team and assisting me to further build my CEO bandwidth -- all in a lean and focused fashion."
                </blockquote>
                <div className="text-slate-900 font-bold">Mohamed Ladha</div>
                <div className="text-slate-600 text-sm">President and General Manager, North America, Recordati Rare Diseases</div>
              </div>
            </div>
          </motion.div>
          
          {/* Organizational Transformation Case Study Link */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.0, duration: 0.8 }}
            className="mt-8 text-center"
          >
            <Link
              to="/case-studies?category=organizational-transformation"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white px-4 md:px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 group"
            >
              View Organizational Transformation Client Success Stories
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
          </div>
          </div>
        </motion.div>
        )}

        {/* Client and Stakeholder Engagement Section */}
        {activeTab === 'client' && (
        <motion.div
          id="client-and-stakeholder-engagement"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative"
          style={{ scrollMarginTop: '120px' }}
        >
          {/* Upward Triangle Caret Indicator - Points to Client Engagement tab (3rd of 3) */}
          <div className="absolute -top-4 left-[83.33%] md:left-[83.33%] transform -translate-x-1/2">
            <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[16px] border-b-[#045184]"></div>
          </div>
          
          <div className="bg-white rounded-2xl py-4 md:py-8 md:py-6 md:py-12 shadow-xl border-t-4 border-[#045184]">
          <div className="px-4 sm:px-6 lg:px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:p-12 items-center">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Client and Stakeholder Engagement</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Leadership Exchanges that bring together clients and stakeholders in highly relevant conversations, transforming supplier relationships into peer and trusted advisor roles.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We apply our signature approaches to leadership interactions to build and deepen external relationships through curated conversations and strategic dinner discussions that deliver measurable business impact.
              </p>
            </motion.div>
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="rounded-xl p-4 md:p-8" 
              style={{ backgroundColor: '#045184' }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">Key Focus Areas</h3>
              <ul className="space-y-3 text-white">
                {[
                  "Strategic relationship building",
                  "Stakeholder alignment", 
                  "Client partnership development",
                  "Executive engagement programs",
                  "Trusted advisor positioning"
                ].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.6 + index * 0.1, duration: 0.5 }}
                    className="flex items-center"
                  >
                    <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00A8E1' }}></div>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
          
          {/* Client and Stakeholder Engagement Testimonial */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="mt-12 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-4 md:p-8"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <img 
                  src="https://customer-assets.emergentagent.com/job_ux-revamp-suite/artifacts/0g7g48xr_goodman_mark_lo1.jpg"
                  alt="Mark Goodman testimonial"
                  className="w-20 h-20 rounded-full object-cover shadow-lg"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <blockquote className="text-lg italic text-slate-700 mb-4 leading-relaxed">
                  "It's remarkable, but TVN does it: By facilitating close, substantive interactions on a regular basis, TVN helps our firm ensure that general counsels always view us as a trusted peer and partner and never as a vendor."
                </blockquote>
                <div className="text-slate-900 font-bold">Mark Goodman</div>
                <div className="text-slate-600 text-sm">Partner, Debevoise & Plimpton</div>
              </div>
            </div>
          </motion.div>
          
          {/* Client and Stakeholder Engagement Case Study Link */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.0, duration: 0.8 }}
            className="mt-8 text-center"
          >
            <Link
              to="/case-studies?category=client-stakeholder-engagement"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white px-4 md:px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 group"
            >
              View Client & Stakeholder Engagement Client Success Stories
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
          </div>
          </div>
        </motion.div>
        )}
      </div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mt-12 mb-12"
      >
        <div className="max-w-7xl mx-auto">
          <p className="text-slate-600 leading-relaxed font-bold text-center italic" style={{ fontSize: '21px' }}>
            We're pragmatic, results-driven, and focused on enabling leaders to own and sustain transformation, not on deploying large consulting teams.
          </p>
        </div>
      </motion.div>
    </div>

    {/* Overview Section */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8 mb-16">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="bg-white rounded-3xl p-6 md:p-12 md:p-16 shadow-xl border-2 border-transparent hover:border-[#045184]/10 transition-all duration-500 mb-16 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#045184]/5 to-[#00A8E1]/5 rounded-full transform translate-x-20 -translate-y-20"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:p-12 items-center relative z-10">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex-shrink-0"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#045184] to-[#00A8E1] flex items-center justify-center">
                  <Target size={32} className="text-white" />
                </div>
              </motion.div>
              
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent">
                Real-World Leadership Development
              </h2>
            </div>
            <p className="text-slate-600 leading-relaxed mb-6 text-lg font-medium">
              Our approach draws on the wisdom of hundreds of CEOs, board directors, and C-suite leaders - shared through powerful peer-to-peer exchanges.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6 text-lg font-medium">
              These real-world insights cut through theory, offering proven strategies for today's most pressing leadership challenges.
            </p>
            <p className="text-slate-600 leading-relaxed text-base md:text-lg font-medium">
              We combine this with decades of experience advising top leadership at major multinationals and global service firms, as well as in dozens of one-on-one advisory engagements.
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#045184]/10 via-blue-50 to-[#00A8E1]/10 rounded-2xl p-6 md:p-6 md:p-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#045184]/5 to-[#00A8E1]/5"></div>
            <div className="text-center relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-5xl md:text-7xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent"
              >
                2,000+
              </motion.div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 md:mb-4">CEOs & C-Suite Executives</h3>
              <p className="text-slate-600 font-medium text-base md:text-lg mb-4 md:mb-6">In our network participating in ongoing catalyzing conversations</p>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base italic">
                Like you, we know that AI and new technologies are tools. The real differentiator is 'the human factor'. That's why we focus on people, whether in our executive networks or supporting your business.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>

    {/* Selected Advisory Engagements Section */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8 mb-16">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="bg-white rounded-2xl p-4 md:p-8 md:p-6 md:p-12 shadow-lg"
        >
          <div className="text-center">
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-8"
            >
              SELECTED ADVISORY ENGAGEMENTS
            </motion.h2>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="flex justify-center"
            >
              <img
                src="/selected-advisory-engagements.jpg"
                alt="Selected Advisory Engagements"
                className="max-w-full h-auto rounded-lg"
                style={{ 
                  maxHeight: '600px',
                  border: 'none',
                  boxShadow: 'none',
                  background: 'transparent'
                }}
              />
            </motion.div>
          </div>
        </motion.div>
    </div>

    {/* Executive Advisory Team Section */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8 mb-16">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="bg-white rounded-2xl p-4 md:p-8 md:p-6 md:p-12 shadow-lg"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-slate-900 mb-12">EXECUTIVE ADVISORY TEAM</h2>
          
          {/* Mobile & Desktop Layout - Vertical Cards */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 md:p-8 auto-rows-fr md:hidden xl:grid">
            {/* Ken Banta */}
            <div className="bg-white rounded-2xl p-6 shadow-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300" style={{ height: '680px' }}>
              <div className="w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden shadow-md">
                <img 
                  src="/ken-banta.jpg" 
                  alt="Ken Banta" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 text-center">KEN BANTA</h3>
              <p className="text-base mb-4 text-center font-semibold" style={{ color: '#045184' }}>Founder & CEO</p>
              <div style={{ height: '260px', marginBottom: '16px' }}>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Ken helped lead eleven global turnarounds, mergers, and transformations, generating more than $83 billion in accretion. He has advised on many initiatives of varying scale and global reach, with playbooks that build high-performance cultures as a hallmark of his expertise.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-500 text-center">Rhodes Scholar | Harvard Business Review Contributor | Co-author of "Ten Must Reads for CEOs"</p>
              </div>
            </div>

            {/* Richard Hulme */}
            <div className="bg-white rounded-2xl p-6 shadow-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300" style={{ height: '680px' }}>
              <div className="w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden shadow-md">
                <img 
                  src="/richard-hulme.jpg" 
                  alt="Richard Hulme" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 text-center">RICHARD HULME</h3>
              <p className="text-base mb-4 text-center font-semibold" style={{ color: '#045184' }}>Managing Director</p>
              <div style={{ height: '260px', marginBottom: '16px' }}>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Richard has over 25 years of experience in strategy consulting, global operations, and organizational excellence. During his 15 years at PricewaterhouseCoopers, he served as chief of staff to the PwC Global Board Chairman and delivered special projects for the PwC Global CEO.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-500 text-center">Certified OKR Coach | BS William & Mary | MBA Carnegie Mellon</p>
              </div>
            </div>

            {/* Garrick Isert */}
            <div className="bg-white rounded-2xl p-6 shadow-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300" style={{ height: '680px' }}>
              <div className="w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden shadow-md">
                <img 
                  src="/garrick-isert.jpg" 
                  alt="Garrick Isert" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 text-center">GARRICK ISERT</h3>
              <p className="text-base mb-4 text-center font-semibold" style={{ color: '#045184' }}>Principal</p>
              <div style={{ height: '260px', marginBottom: '16px' }}>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Garrick brings over 20 years of corporate and management consulting experience. He has worked with global senior leaders across diverse industries including hospitality, law, e-commerce, financial services, and energy, with experience at World 50, IHG, Boston Consulting Group, and General Electric.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-500 text-center">Six Sigma Black Belt | J.D. Northwestern | MBA Kellogg</p>
              </div>
            </div>

            {/* Aileen Gonsalves */}
            <div className="bg-white rounded-2xl p-6 shadow-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300" style={{ height: '680px' }}>
              <div className="w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden shadow-md">
                <img 
                  src="/aileen-gonsalves.jpg" 
                  alt="Aileen Gonsalves" 
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'calc(50% - 40px) 30%' }}
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 text-center">AILEEN GONSALVES</h3>
              <p className="text-base mb-4 text-center font-semibold" style={{ color: '#045184' }}>Principal</p>
              <div style={{ height: '260px', marginBottom: '16px' }}>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Aileen brings her unique leadership communication approach, the Gonsalves Method, rooted in her career as an actor and director with the Royal Shakespeare Company. She has worked with Dame Judi Dench, Sir Simon Russell Beale, and other leading performers, now applying these skills to business leadership.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-500 text-center">Royal Shakespeare Company | RADA Professor | Author, "Shakespeare and Meisner"</p>
              </div>
            </div>
          </div>

          {/* Tablet Layout - Horizontal Full-Width Cards */}
          <div className="hidden md:block xl:hidden space-y-6">
            {/* Ken Banta - Horizontal */}
            <div className="bg-white rounded-2xl p-6 shadow-2xl flex items-start gap-6">
              <div className="w-32 h-32 rounded-full flex-shrink-0 overflow-hidden shadow-md">
                <img src="/ken-banta.jpg" alt="Ken Banta" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-1">KEN BANTA</h3>
                <p className="text-base mb-3 font-semibold" style={{ color: '#045184' }}>Founder & CEO</p>
                <p className="text-slate-600 leading-relaxed text-sm mb-3">
                  Ken helped lead eleven global turnarounds, mergers, and transformations, generating more than $83 billion in accretion. He has advised on many initiatives of varying scale and global reach, with playbooks that build high-performance cultures as a hallmark of his expertise.
                </p>
                <p className="text-xs text-slate-500 pt-3 border-t border-slate-200">Rhodes Scholar | Harvard Business Review Contributor | Co-author of "Ten Must Reads for CEOs"</p>
              </div>
            </div>

            {/* Richard Hulme - Horizontal */}
            <div className="bg-white rounded-2xl p-6 shadow-2xl flex items-start gap-6">
              <div className="w-32 h-32 rounded-full flex-shrink-0 overflow-hidden shadow-md">
                <img src="/richard-hulme.jpg" alt="Richard Hulme" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-1">RICHARD HULME</h3>
                <p className="text-base mb-3 font-semibold" style={{ color: '#045184' }}>Managing Director</p>
                <p className="text-slate-600 leading-relaxed text-sm mb-3">
                  Richard has over 25 years of experience in strategy consulting, global operations, and organizational excellence. During his 15 years at PricewaterhouseCoopers, he served as chief of staff to the PwC Global Board Chairman and delivered special projects for the PwC Global CEO.
                </p>
                <p className="text-xs text-slate-500 pt-3 border-t border-slate-200">Certified OKR Coach | BS William & Mary | MBA Carnegie Mellon</p>
              </div>
            </div>

            {/* Garrick Isert - Horizontal */}
            <div className="bg-white rounded-2xl p-6 shadow-2xl flex items-start gap-6">
              <div className="w-32 h-32 rounded-full flex-shrink-0 overflow-hidden shadow-md">
                <img src="/garrick-isert.jpg" alt="Garrick Isert" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-1">GARRICK ISERT</h3>
                <p className="text-base mb-3 font-semibold" style={{ color: '#045184' }}>Principal</p>
                <p className="text-slate-600 leading-relaxed text-sm mb-3">
                  Garrick brings over 20 years of corporate and management consulting experience. He has worked with global senior leaders across diverse industries including hospitality, law, e-commerce, financial services, and energy, with experience at World 50, IHG, Boston Consulting Group, and General Electric.
                </p>
                <p className="text-xs text-slate-500 pt-3 border-t border-slate-200">Six Sigma Black Belt | J.D. Northwestern | MBA Kellogg</p>
              </div>
            </div>

            {/* Aileen Gonsalves - Horizontal */}
            <div className="bg-white rounded-2xl p-6 shadow-2xl flex items-start gap-6">
              <div className="w-32 h-32 rounded-full flex-shrink-0 overflow-hidden shadow-md">
                <img src="/aileen-gonsalves.jpg" alt="Aileen Gonsalves" className="w-full h-full object-cover" style={{ objectPosition: 'calc(50% - 40px) 30%' }} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-1">AILEEN GONSALVES</h3>
                <p className="text-base mb-3 font-semibold" style={{ color: '#045184' }}>Principal</p>
                <p className="text-slate-600 leading-relaxed text-sm mb-3">
                  Aileen brings her unique leadership communication approach, the Gonsalves Method, rooted in her career as an actor and director with the Royal Shakespeare Company. She has worked with Dame Judi Dench, Sir Simon Russell Beale, and other leading performers, now applying these skills to business leadership.
                </p>
                <p className="text-xs text-slate-500 pt-3 border-t border-slate-200">Royal Shakespeare Company | RADA Professor | Author, "Shakespeare and Meisner"</p>
              </div>
            </div>
          </div>
        </motion.div>
    </div>

    {/* Call to Action */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8 mb-16">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="text-center rounded-2xl p-6 md:p-12 bg-gradient-to-r from-[#045184] to-[#00A8E1]"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">Ready to Transform Your Leadership?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Join the 2,000+ CEOs and C-suite executives who trust The Vanguard Network for their leadership development and strategic guidance.
          </p>
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#045184] w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-base transition-all duration-200 hover:bg-blue-50"
            >
              Get Started Today
            </motion.button>
          </Link>
        </motion.div>
    </div>
  </motion.div>
  );
};

const TeamPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState({});

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/team`);
        if (!response.ok) throw new Error('Failed to fetch team members');
        const data = await response.json();
        
        // Group team members by section
        const grouped = data.reduce((acc, member) => {
          const section = member.section || 'Other';
          if (!acc[section]) {
            acc[section] = [];
          }
          acc[section].push(member);
          return acc;
        }, {});
        
        setSections(grouped);
        setTeamMembers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching team members:', error);
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  if (loading) {
    return (
      <div className="pt-40 pb-12 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#045184] mx-auto mb-4"></div>
          <p className="text-slate-600 text-base md:text-lg">Loading team members...</p>
        </div>
      </div>
    );
  }

  return (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="pt-40 pb-12 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8">
      <Breadcrumb />
      {/* Hero Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 
          className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent py-2 leading-tight"
        >
          Our Team
        </h1>
        <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
          Meet the experienced leadership team behind The Vanguard Network. Our team brings decades of combined experience in executive leadership, strategic consulting, and organizational development to help senior leaders achieve breakthrough results.
        </p>
      </motion.div>

      {/* Dynamic Team Sections */}
      {Object.entries(sections)
        .sort(([sectionA], [sectionB]) => {
          // Define custom order
          const order = {
            'Leadership Team': 1,
            'Senior Leadership Team': 2,
            'Content & Media Team': 3
          };
          
          // Get order values, default to 999 for unknown sections
          const orderA = order[sectionA] || 999;
          const orderB = order[sectionB] || 999;
          
          return orderA - orderB;
        })
        .map(([sectionName, members], sectionIndex) => (
        <div key={sectionName} className="mb-16">
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 + (sectionIndex * 0.2), duration: 0.8 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-12"
            style={{ color: '#045184' }}
          >
            {sectionName}
          </motion.h2>
          
          <div className={`${sectionName === 'Leadership Team' ? 'grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-7xl xl:max-w-4xl mx-auto' : 'flex flex-wrap gap-8 justify-center max-w-7xl mx-auto mb-12'}`}>
          {members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 + (sectionIndex * 0.3) + (index * 0.1), duration: 0.8 }}
              className={`bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${sectionName !== 'Leadership Team' ? 'w-full md:w-[calc(50%-1rem)] xl:w-[calc(33.333%-1.334rem)]' : ''}`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 shadow-lg"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{member.name}</h3>
                <p className="text-sm font-semibold mb-2" style={{ color: '#00A8E1' }}>{member.role}</p>
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-[#045184] to-[#00A8E1] hover:shadow-lg transition-all duration-300"
                  >
                    <Linkedin className="text-white" size={20} />
                  </a>
                )}
              </div>
              
              {member.bio && <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">{member.bio}</p>}
            </motion.div>
          ))}
        </div>
        </div>
      ))}

      {/* Our Approach */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="mb-16"
      >
        <div className="bg-white rounded-2xl p-4 md:p-8 md:p-6 md:p-12 shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-8" style={{ color: '#045184' }}>
            Our Commitment to Excellence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:p-8">
            {[
              {
                title: 'Proven Experience',
                description: 'Our team brings decades of combined experience in executive leadership, strategic consulting, and organizational development.',
                icon: <Award size={48} />
              },
              {
                title: 'Personalized Approach',
                description: 'We tailor our programs and coaching to meet the unique needs and challenges of each leader and organization.',
                icon: <Target size={48} />
              },
              {
                title: 'Lasting Impact',
                description: 'We focus on creating sustainable change and long-term success for our members and their organizations.',
                icon: <Users size={48} />
              }
            ].map((approach, index) => (
              <motion.div
                key={approach.title}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.5 + index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-gradient-to-r from-[#045184] to-[#00A8E1]">
                  <div className="text-white">{approach.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{approach.title}</h3>
                <p className="text-slate-600 leading-relaxed">{approach.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.8 }}
        className="text-center rounded-2xl p-6 md:p-12"
        style={{ backgroundColor: '#045184' }}
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">Ready to Work with Our Team?</h2>
        <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
          Connect with our experienced leadership team to explore how we can help you unlock high-performance leadership and drive transformational change in your organization.
        </p>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.9, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/contact"
            className="bg-white text-[#045184] w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-base transition-all duration-200 hover:bg-blue-50 inline-flex items-center justify-center gap-2"
          >
            Get Started Today
            <ArrowRight size={20} />
          </Link>
          <Link
            to="/advisory"
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#045184] w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-base transition-all duration-200 inline-flex items-center justify-center gap-2"
          >
            Learn About Our Services
            <Target size={20} />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  </motion.div>
  );
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    interestArea: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
      
      // Prepare the data payload
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        company: formData.company,
        interestArea: formData.interestArea,
        message: formData.message,
        source: 'The Vanguard Network Contact Form'
      };

      console.log('Submitting form data:', payload);

      const response = await fetch(`${backendUrl}/api/contact/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      console.log('Response status:', response.status);

      // Check if the response is ok (status 200-299)
      if (response.ok) {
        const responseData = await response.json();
        console.log('Success response:', responseData);
        
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          email: '',
          company: '',
          interestArea: '',
          message: ''
        });
      } else {
        const errorText = await response.text();
        console.error('Error response:', response.status, errorText);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-12 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8">
        <Breadcrumb />
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent py-2 leading-tight"
          >
            Contact Us
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your leadership? Get in touch with our team of experts and discover how The Vanguard Network can accelerate your executive journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:p-12 mb-16">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-white rounded-2xl p-4 md:p-4 md:p-8 shadow-lg"
          >
            <h2 className="text-xl md:text-2xl font-bold mb-6" style={{ color: '#045184' }}>Send us a Message</h2>
            
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg"
              >
                <p className="font-medium">Message sent successfully!</p>
                <p className="text-sm">We'll get back to you within 24 hours.</p>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
              >
                <p className="font-medium">Error sending message.</p>
                <p className="text-sm">Please try again or contact us directly.</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <label className="block font-medium mb-2" style={{ color: '#045184' }}>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg transition-colors duration-200"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#00A8E1';
                    e.target.style.boxShadow = `0 0 0 2px rgba(0, 168, 225, 0.2)`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="Enter your full name"
                />
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <label className="block font-medium mb-2" style={{ color: '#045184' }}>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg transition-colors duration-200"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#00A8E1';
                    e.target.style.boxShadow = `0 0 0 2px rgba(0, 168, 225, 0.2)`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="Enter your email"
                />
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <label className="block font-medium mb-2" style={{ color: '#045184' }}>Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg transition-colors duration-200"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#00A8E1';
                    e.target.style.boxShadow = `0 0 0 2px rgba(0, 168, 225, 0.2)`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="Enter your company"
                />
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <label className="block font-medium mb-2" style={{ color: '#045184' }}>Interest Area</label>
                <select
                  name="interestArea"
                  value={formData.interestArea}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg transition-colors duration-200"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#00A8E1';
                    e.target.style.boxShadow = `0 0 0 2px rgba(0, 168, 225, 0.2)`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="">Select your area of interest</option>
                  <option value="advisory">Advisory Services</option>
                  <option value="networking">Networking & Events</option>
                  <option value="programs">Leadership Programs</option>
                  <option value="book">Book & Resources</option>
                  <option value="membership">Membership Information</option>
                  <option value="other">Other</option>
                </select>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                <label className="block font-medium mb-2" style={{ color: '#045184' }}>Message *</label>
                <textarea
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg transition-colors duration-200"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#00A8E1';
                    e.target.style.boxShadow = `0 0 0 2px rgba(0, 168, 225, 0.2)`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="Tell us about your leadership development needs and how we can help you achieve your goals"
                ></textarea>
              </motion.div>
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full text-white py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isSubmitting ? 'bg-gray-500' : 'bg-gradient-to-r from-[#045184] to-[#00A8E1] hover:shadow-lg'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl p-4 md:p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6" style={{ color: '#045184' }}>Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#045184] to-[#00A8E1]">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="font-medium" style={{ color: '#045184' }}>Email</p>
                    <a 
                      href="mailto:contact@vanguardgroup.nyc"
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                      contact@vanguardgroup.nyc
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#045184] to-[#00A8E1]">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="font-medium" style={{ color: '#045184' }}>Office</p>
                    <p className="text-slate-600">216 E 7th Street, #8<br />New York, NY 10009</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#045184] to-[#00A8E1]">
                    <Globe className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="font-medium" style={{ color: '#045184' }}>Website</p>
                    <a 
                      href="https://www.thevanguardnetwork.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                      www.thevanguardnetwork.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#045184] to-[#00A8E1]">
                    <Linkedin className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="font-medium" style={{ color: '#045184' }}>LinkedIn</p>
                    <a 
                      href="https://www.linkedin.com/company/40948215" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                      Follow us on LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-2xl p-4 md:p-8 shadow-lg" style={{ backgroundColor: '#045184' }}>
              <h3 className="text-2xl font-bold mb-4 text-white">Why Choose The Vanguard Network?</h3>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#00A8E1' }}></div>
                  <span>Proven track record with Fortune 500 executives</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#00A8E1' }}></div>
                  <span>Personalized leadership development programs</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#00A8E1' }}></div>
                  <span>Exclusive networking with top-tier professionals</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#00A8E1' }}></div>
                  <span>Comprehensive advisory services and support</span>
                </li>
              </ul>
              <Link to="/advisory">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 w-full bg-white px-6 py-3 rounded-lg font-semibold text-base transition-all duration-200 hover:bg-blue-50"
                  style={{ color: '#045184' }}
                >
                  Learn More About Our Services
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Leadership Team Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="bg-white rounded-2xl p-4 md:p-8 shadow-lg mb-12"
        >
          <h3 className="text-3xl font-bold text-center mb-8" style={{ color: '#045184' }}>Leadership Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:p-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="text-center"
            >
              <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden shadow-lg">
                <img 
                  src="/ken-banta.jpg" 
                  alt="Ken Banta" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-xl font-bold mb-2" style={{ color: '#045184' }}>Ken Banta</h4>
              <p className="text-slate-600 font-medium mb-3">Founder and CEO</p>
              <a
                href="https://www.linkedin.com/in/kenbanta/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-[#045184] to-[#00A8E1] hover:shadow-lg transition-all duration-300"
              >
                <Linkedin className="text-white" size={20} />
              </a>
            </motion.div>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="text-center"
            >
              <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden shadow-lg">
                <img 
                  src="/tony-powe-team.jpg" 
                  alt="Tony Powe" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-xl font-bold mb-2" style={{ color: '#045184' }}>Tony Powe</h4>
              <p className="text-slate-600 font-medium mb-3">Co-Founder and Chief Operating Officer</p>
              <a
                href="https://www.linkedin.com/in/tonypowe/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-[#045184] to-[#00A8E1] hover:shadow-lg transition-all duration-300"
              >
                <Linkedin className="text-white" size={20} />
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Our Team Link Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="text-center bg-white rounded-3xl p-4 md:p-8 shadow-xl border border-slate-200"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Want to Learn More About Our Team?</h3>
          <p className="text-slate-600 mb-6 leading-relaxed max-w-2xl mx-auto">
            Meet our complete leadership team, advisory board, and the experienced professionals who make The Vanguard Network possible.
          </p>
          
          <motion.a
            href="/team"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-base hover:shadow-lg transition-all duration-300 inline-flex items-center justify-center gap-2"
          >
            <Users size={20} />
            Meet Our Team
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
};

const BookPage = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="pt-40 pb-12 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
  >
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8">
      <Breadcrumb />
      {/* Hero Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 
          className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent py-2 leading-tight"
        >
          Seeing Around Corners
        </h1>
        <p className="text-2xl font-semibold mb-4" style={{ color: '#00A8E1' }}>
          C-suite Wisdom from America's Most Insightful Leaders
        </p>
        <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
          Exclusive, frank, and unfettered advice from legendary CEOs, innovative founders, and industry-shaping experts to help you navigate the most important management and leadership challenges of today.
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:p-12 items-center mb-16">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center"
        >
          <div className="w-80 h-[500px] rounded-xl shadow-lg mx-auto mb-8 overflow-hidden bg-gray-100">
            <img
              src="/book-cover.jpg"
              alt="Seeing Around Corners Book Cover"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex justify-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.amazon.com/Seeing-Around-Corners-Americas-Insightful/dp/B0DVRGTDFY/ref=sr_1_1?crid=1UDTUUR939EFS&dib=eyJ2IjoiMSJ9.uUAnkAmvXkDTtplju1-ThXQ0DHyhnwLwFjWvT31MoLU.3z-zY1JbDLqiOwgPc_MyAB-R0brStxvJF9eIRL0VIGA&dib_tag=se&keywords=seeing+around+corners+ken+banta&qid=1739209893&sprefix=seeing+around+corners+ken+banta,aps,82&sr=8-1"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white px-4 md:px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 inline-flex items-center gap-2 hover:shadow-lg"
            >
              Order on Amazon
              <ArrowRight size={20} />
            </motion.a>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-6" style={{ color: '#045184' }}>About the Book</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            "Seeing Around Corners" is a business book that gathers exclusive, frank, and unfettered advice, anecdotes, and insight from legendary CEOs, in-the-thick-of-it company founders, cutting-edge innovators, and industry-shaping experts. This comprehensive guide helps readers navigate the most important management and leadership issues of the day.
          </p>
          
          <h3 className="text-2xl font-bold mb-4" style={{ color: '#045184' }}>What Makes This Book Unique</h3>
          <ul className="space-y-3 mb-8">
            {[
              'Exclusive insights from legendary CEOs and industry leaders',
              '360-degree view of management and leadership challenges',
              '16 quote-filled chapters covering various leadership topics',
              'Real-world anecdotes from successful business executives',
              'Practical advice for leading with authority and vision'
            ].map((item, index) => (
              <motion.li
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                className="flex items-center gap-3 text-slate-600"
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#00A8E1' }}></div>
                {item}
              </motion.li>
            ))}
          </ul>
          
          <div className="rounded-lg p-6 shadow-lg" style={{ backgroundColor: '#045184' }}>
            <h4 className="font-bold text-white mb-2">Perfect For</h4>
            <p className="text-white/90">
              Current and aspiring executives, business leaders, entrepreneurs, and anyone looking to gain insider knowledge on navigating today's complex business landscape with wisdom from America's most successful leaders.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Author Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mb-16"
      >
        <div className="bg-white rounded-2xl p-4 md:p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:p-8 items-center">
            <div className="text-center">
              <div className="w-48 h-48 rounded-full mx-auto mb-4 overflow-hidden">
                <img 
                  src="/ken-banta-headshot.jpg" 
                  alt="Ken Banta" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold" style={{ color: '#045184' }}>Ken Banta</h3>
              <p className="text-slate-600">Founder & CEO</p>
              <p className="text-slate-600">The Vanguard Network</p>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#045184' }}>Meet the Author</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Ken Banta is an accomplished author and business consultant known for his deep insights into leadership and management practices. Through his extensive network and years of experience working with top executives, Ken has gathered invaluable wisdom from America's most successful business leaders.
              </p>
              <p className="text-slate-600 leading-relaxed">
                His unique ability to distill complex leadership concepts into actionable insights makes "Seeing Around Corners" an essential resource for anyone looking to excel in today's challenging business environment.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Benefits Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
        className="mb-16"
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-12" style={{ color: '#045184' }}>
          What You'll Gain
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:p-8">
          {[
            {
              title: "Leadership Mastery",
              description: "Learn how to navigate management and leadership issues with confidence and authority",
              icon: <Award size={32} />
            },
            {
              title: "Strategic Vision",
              description: "Develop the ability to see around corners and anticipate future challenges and opportunities",
              icon: <Target size={32} />
            },
            {
              title: "Executive Insights",
              description: "Access exclusive anecdotes and advice from legendary CEOs and industry-shaping experts",
              icon: <Users size={32} />
            }
          ].map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 + index * 0.2, duration: 0.8 }}
              className="bg-white rounded-xl p-6 shadow-lg text-center"
            >
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#00A8E1' }}>
                <div className="text-white">{benefit.icon}</div>
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#045184' }}>{benefit.title}</h3>
              <p className="text-slate-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="text-center rounded-2xl p-6 md:p-12"
        style={{ backgroundColor: '#045184' }}
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">Ready to See Around Corners?</h2>
        <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
          Join thousands of executives who have transformed their leadership approach with insights from America's most successful business leaders.
        </p>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="https://www.amazon.com/Seeing-Around-Corners-Americas-Insightful/dp/B0DVRGTDFY/ref=sr_1_1?crid=1UDTUUR939EFS&dib=eyJ2IjoiMSJ9.uUAnkAmvXkDTtplju1-ThXQ0DHyhnwLwFjWvT31MoLU.3z-zY1JbDLqiOwgPc_MyAB-R0brStxvJF9eIRL0VIGA&dib_tag=se&keywords=seeing+around+corners+ken+banta&qid=1739209893&sprefix=seeing+around+corners+ken+banta,aps,82&sr=8-1"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-[#045184] w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-base transition-all duration-200 hover:bg-blue-50 inline-flex items-center justify-center gap-2"
        >
          Order Your Copy Today
          <ArrowRight size={20} />
        </motion.a>
      </motion.div>
    </div>
  </motion.div>
);

// NEW HOMEPAGE COMPONENTS BASED ON REFERENCE DESIGN - LIGHT THEME

// New Hero Section
const NewHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-32 md:pt-0">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/39/lIZrwvbeRuuzqOoWJUEn_Photoaday_CSD%20%281%20of%201%29-5.jpg"
          alt="Professional executives"
          className="w-full h-full object-cover opacity-25"
        />
        {/* Gradient overlay - subtle dark gradient for depth and readability */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: 'linear-gradient(to bottom, rgba(4, 81, 132, 0.15) 0%, rgba(4, 81, 132, 0.05) 50%, rgba(4, 81, 132, 0.15) 100%)'
          }}
        ></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-7xl font-bold mb-8 tracking-tight text-slate-900"
          >
            The Human Factor:<br />Unlocking the Power of Leadership
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-slate-700 mb-12 leading-relaxed max-w-4xl mx-auto"
          >
            We unlock high-performance leadership through advisory services, peer-to-peer networks, custom programs, and curated content.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link
              to="/networking"
              className="bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white px-4 md:px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              Peer-to-Peer Networks
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/advisory"
              className="px-4 md:px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 relative"
              style={{ 
                color: '#045184',
                background: 'linear-gradient(white, white) padding-box, linear-gradient(to right, #045184, #00A8E1) border-box',
                border: '2px solid transparent'
              }}
            >
              Leadership Advisory
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Statistics Section
const NewStatsSection = () => {
  const stats = [
    { number: "37+", label: "Countries Represented" },
    { number: "358+", label: "Participating Companies" },
    { number: "1,995+", label: "Top Leaders Engaged" },
    { number: "25 Years", label: "Leadership Expertise" }
  ];

  return (
    <section 
      className="py-8 md:py-16"
      style={{
        background: 'linear-gradient(135deg, #f8fafc, #f0f9ff)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:p-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="p-6"
            >
              <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                {stat.number}
              </div>
              <div className="text-lg text-slate-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-right mt-6">
          <p className="text-sm italic text-slate-500">
            *Data current as of November 2025. Figures are updated quarterly.
          </p>
        </div>
      </div>
    </section>
  );
};

// What We Do Section
// Original What Makes Us Different Section (5 boxes - for HomePage2)
const NewWhatWeDoSection = () => {
  const services = [
    {
      title: "Leadership Advisory",
      description: "We deliver three complementary advisory services to accelerate your leadership impact and drive organizational transformation.",
      details: [
        { 
          text: "<span class='font-semibold'>Organizational Transformation:</span> Catalyzing change by transforming what your people believe, the way they work, and how they behave.",
          anchor: "organizational-transformation"
        },
        { 
          text: "<span class='font-semibold'>Strategic Counsel:</span> One-on-one coaching and confidential sounding boards for senior executives navigating complex decisions.",
          anchor: "strategic-counsel"
        },
        { 
          text: "<span class='font-semibold'>Client & Stakeholder Engagement:</span> Leadership Dialogues that transform supplier relationships into trusted advisor roles through relevant conversations with clients and stakeholders.",
          anchor: "client-and-stakeholder-engagement"
        }
      ],
      image: "https://images.pexels.com/photos/2977565/pexels-photo-2977565.jpeg",
      link: "/advisory"
    },
    {
      title: "Peer-to-Peer Networks",
      description: "Participation in Forums, Leadership Dialogues, and our virtual platform, allows members to engage in intimate, cross-sector peer discussions.",
      details: "Focus on tackling real-world leadership challenges through structured peer exchanges and collaborative problem-solving sessions.",
      image: "https://images.pexels.com/photos/3184416/pexels-photo-3184416.jpeg",
      link: "/networking"
    },
    {
      title: "Custom Programs",
      description: "We offer special leadership and career development programs tailored to your organization's unique needs and challenges.",
      details: "We also offer specialized leadership and career-development programs–including the flagship <span class='font-semibold'>Next Generation GC</span> program, widely recognized as the gold standard for developing high-potential legal leaders.",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
      link: "/programs"
    }
  ];

  return (
    <section className="pt-24 pb-0 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            What Makes Us Different
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Like you, we know that AI and new technologies are simply tools. The real differentiator in exceptional leadership is 'the human factor'. That's why we focus on people, whether in our peer-to-peer networks or supporting your business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:p-8">
          {services.slice(0, 3).map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200"
            >
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url('${service.image}')` }}>
                <div className="h-full bg-gradient-to-t from-black/40 to-transparent flex items-end p-6">
                  <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-slate-700 mb-4 leading-relaxed font-bold">
                  {service.description}
                </p>
                {service.title === "Leadership Advisory" && Array.isArray(service.details) ? (
                  <div className="text-slate-600 text-sm mb-6 leading-relaxed space-y-4">
                    {service.details.map((item, idx) => (
                      <p key={idx}>
                        <span dangerouslySetInnerHTML={{ __html: item.text }}></span>
                        {' '}
                        <Link
                          to="/advisory"
                          onClick={() => {
                            setTimeout(() => {
                              const element = document.getElementById(item.anchor);
                              if (element) {
                                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                                const offsetPosition = elementPosition - 165;
                                window.scrollTo({
                                  top: offsetPosition,
                                  behavior: 'smooth'
                                });
                              }
                            }, 100);
                          }}
                          className="text-blue-600 hover:text-blue-700 font-semibold"
                        >
                          Learn more
                        </Link>
                      </p>
                    ))}
                  </div>
                ) : (
                  <p 
                    className="text-slate-600 text-sm mb-6 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: service.details }}
                  ></p>
                )}
                {service.title === "Organizational Transformation" ? (
                  <Link
                    to="/advisory"
                    onClick={() => {
                      setTimeout(() => {
                        const element = document.getElementById('organizational-transformation');
                        if (element) {
                          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                          const offsetPosition = elementPosition - 165; // Account for fixed header + banner + optimal spacing
                          window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                          });
                        }
                      }, 100);
                    }}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                  >
                    Learn more
                    <ArrowRight size={16} />
                  </Link>
                ) : service.title === "Leadership Advisory" ? (
                  <a
                    href="/advisory"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                  >
                    Learn more
                    <ArrowRight size={16} />
                  </a>
                ) : service.title === "Client and Stakeholder Engagement" ? (
                  <Link
                    to="/advisory"
                    onClick={() => {
                      setTimeout(() => {
                        const element = document.getElementById('client-and-stakeholder-engagement');
                        if (element) {
                          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                          const offsetPosition = elementPosition - 165; // Account for fixed header + banner + optimal spacing
                          window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                          });
                        }
                      }, 100);
                    }}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                  >
                    Learn more
                    <ArrowRight size={16} />
                  </Link>
                ) : (
                  <a
                    href={service.link}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                  >
                    Learn more
                    <ArrowRight size={16} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Second row for remaining services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:p-8 mt-8">
          {services.slice(3).map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (index + 3) * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200"
            >
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url('${service.image}')` }}>
                <div className="h-full bg-gradient-to-t from-black/40 to-transparent flex items-end p-6">
                  <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-slate-700 mb-4 leading-relaxed font-bold">
                  {service.description}
                </p>
                <p 
                  className="text-slate-600 text-sm mb-6 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: service.details }}
                ></p>
                {service.title === "Client and Stakeholder Engagement" ? (
                  <Link
                    to="/advisory"
                    onClick={() => {
                      setTimeout(() => {
                        const element = document.getElementById('client-and-stakeholder-engagement');
                        if (element) {
                          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                          const offsetPosition = elementPosition - 165; // Account for fixed header + banner + optimal spacing
                          window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                          });
                        }
                      }, 100);
                    }}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                  >
                    Learn more
                    <ArrowRight size={16} />
                  </Link>
                ) : (
                  <a
                    href={service.link}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                  >
                    Learn more
                    <ArrowRight size={16} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Video Quote Section
const VideoQuoteSection = () => {
  const videoRef = React.useRef(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <section 
      className="py-24"
      style={{
        background: 'linear-gradient(135deg, #f8fafc, #f0f9ff)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-6 md:p-12 items-center">
          {/* Video Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-slate-900">
              <video 
                ref={videoRef}
                className="w-full h-full object-cover"
                controls
                controlsList="nodownload nofullscreen noremoteplayback"
                disablePictureInPicture
                playsInline
                poster="/ken-banta-thumbnail.jpg"
              >
                <source src="/ken-banta-welcome.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>

          {/* Quote Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <div className="relative">
              <svg className="absolute -top-6 -left-4 w-16 h-16 text-[#7f30cb] opacity-20" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <blockquote className="text-2xl md:text-3xl font-light text-slate-800 mb-8 leading-relaxed italic">
                "Our sole focus is unlocking high-performance leadership, so that's why we don't take the cookie-cutter approach."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden shadow-md">
                  <img 
                    src="/ken-banta.jpg" 
                    alt="Ken Banta" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-lg text-slate-900">Ken Banta</p>
                  <p className="text-slate-600">Founder & CEO, The Vanguard Network</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// About Section
const NewAboutSection = () => {
  return (
    <section 
      className="py-24"
      style={{
        background: 'linear-gradient(135deg, #f8fafc, #f0f9ff)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            About The Vanguard Network
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            More than a professional association, we are a high-impact platform where senior leaders connect, grow, and lead with purpose through tailored advisory programs and exclusive peer forums.
          </p>
        </motion.div>

        {/* Quote Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-lg p-6 md:p-12 border border-gray-200 mb-8"
        >
          <div className="flex flex-col items-center text-center">
            {/* Round Image Frame - Larger and Centered */}
            <img 
              src="https://lh3.googleusercontent.com/d/1cTYAE87qaYRSVj76h66H0zLDHbancsSf"
              alt="Tom Sabatino"
              className="w-40 h-40 rounded-full object-cover shadow-lg mb-6"
              crossOrigin="anonymous"
            />
            
            {/* Quote and Attribution */}
            <div className="max-w-4xl">
              <blockquote className="text-2xl text-slate-700 italic leading-relaxed mb-6">
                "One quality sets apart successful companies and successful executives: high-performance leadership. Developing great leaders, and supporting their work, is where the Vanguard team really excels."
              </blockquote>
              
              {/* Attribution */}
              <div className="text-center">
                <p className="text-xl font-bold text-slate-900 mb-1">Tom Sabatino</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Past Chief Legal Officer, Rite Aid<br />
                  Past GC, Tenneco, Aetna, Hertz, Walgreens, United Airlines, Schering-Plough
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Three Boxes Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-lg p-4 md:p-8 border border-gray-200 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:p-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h4 className="text-lg font-bold text-slate-900 mb-2">By Invitation Only</h4>
              <p className="text-slate-600">
                An exclusive community designed specifically for senior and C-suite leaders who are committed to elevating their leadership impact and driving organizational success.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h4 className="text-lg font-bold text-slate-900 mb-2">Global Reach</h4>
              <p className="text-slate-600">
                Our integrated platform welcomes experienced leaders from top-tier organizations across more than 26 countries, fostering diverse perspectives and global insights.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h4 className="text-lg font-bold text-slate-900 mb-2">Proven Excellence</h4>
              <p className="text-slate-600">
                Through candid conversation, peer insight, and actionable plans, we turn strategic vision into measurable impact that sustains long-term organizational success.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-lg p-4 md:p-8 text-center border border-gray-200"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Unlock Your Leadership Potential
          </h3>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Join a community of senior executives who are transforming their organizations and driving extraordinary outcomes through collaborative leadership development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/application"
              className="bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white px-4 md:px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Apply to Join
            </Link>
            <a
              href="/networking"
              className="px-4 md:px-8 py-3 rounded-lg font-semibold transition-all duration-300"
              style={{ 
                color: '#045184',
                background: 'linear-gradient(white, white) padding-box, linear-gradient(to right, #045184, #00A8E1) border-box',
                border: '2px solid transparent'
              }}
            >
              Learn More
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Substack Posts Section
const NewContentLibrarySection = () => {
  const [featuredInsights, setFeaturedInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedInsights();
  }, []);

  const fetchFeaturedInsights = async () => {
    try {
      setLoading(true);
      const backendUrl = import.meta.env?.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL;
      
      // Fetch latest from each content type and Substack
      const [articlesResponse, podcastsResponse, videosResponse, substackResponse] = await Promise.all([
        fetch(`${backendUrl}/api/articles`),
        fetch(`${backendUrl}/api/podcasts`),
        fetch(`${backendUrl}/api/videos`),
        fetch('https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent('https://kenbanta.substack.com/feed'))
      ]);

      const articles = await articlesResponse.json();
      const podcasts = await podcastsResponse.json();
      const videos = await videosResponse.json();
      const substackData = await substackResponse.json();

      // Get the latest entry from each type
      const latestArticle = articles && articles.length > 0 ? articles[0] : null;
      const latestPodcast = podcasts && podcasts.length > 0 ? podcasts[0] : null;
      const latestVideo = videos && videos.length > 0 ? videos[0] : null;
      
      // Get the latest Substack post
      let substackPost = null;
      if (substackData.status === 'ok' && substackData.items && substackData.items.length > 0) {
        substackPost = substackData.items[0]; // Always use the latest post
      }

      const insights = [];

      // Add latest article
      if (latestArticle) {
        insights.push({
          type: "Article",
          category: latestArticle.category || "Leadership Development",
          title: latestArticle.blog_title || latestArticle.title,
          description: latestArticle.description || latestArticle.summary || "Exploring leadership insights and organizational transformation.",
          author: latestArticle.author || "Vanguard Faculty",
          duration: `${Math.ceil((latestArticle.blog_title?.length || 100) / 10)} min read`,
          image: latestArticle.photo || "https://images.unsplash.com/photo-1543132220-7bc04a0e790a",
          link: `/article/${latestArticle.id}`
        });
      }

      // Add latest podcast
      if (latestPodcast) {
        insights.push({
          type: "Podcast",
          category: latestPodcast.category || "Board Dynamics",
          title: latestPodcast.title || "Leadership Insights Podcast",
          description: latestPodcast.description || "A candid discussion with experienced leaders about governance and strategy.",
          author: latestPodcast.featured_speaker || "Member Contributor",
          duration: latestPodcast.duration || "45 min listen",
          image: latestPodcast.thumbnail || "https://images.unsplash.com/photo-1579525109384-ddf54825044f",
          link: `/podcast/${latestPodcast.id}`
        });
      }

      // Add latest video
      if (latestVideo) {
        insights.push({
          type: "Video",
          category: latestVideo.category || "Personal Awareness",
          title: latestVideo.vimeo_name || latestVideo.video_description || "Leadership Development Video",
          description: latestVideo.description || "Understanding how leadership principles drive better strategic decisions.",
          author: latestVideo.featured_speakers || "Affiliate Contributor",
          duration: latestVideo.duration || "12 min watch",
          image: latestVideo.headshot || "https://images.unsplash.com/photo-1562935345-5080389daccd",
          link: `/video/${latestVideo.id}`
        });
      }

      // Add latest Substack post
      if (substackPost) {
        // Extract description from content
        const stripHtmlTags = (html) => {
          const div = document.createElement('div');
          div.innerHTML = html;
          return div.textContent || div.innerText || '';
        };
        const description = stripHtmlTags(substackPost.description || substackPost.content);
        const excerpt = description.length > 300 ? description.substring(0, 300) + '...' : description;
        
        insights.push({
          type: "Substack",
          category: "Ken Banta on Leadership",
          title: substackPost.title || "Leadership Insights",
          description: excerpt,
          author: "Ken Banta",
          duration: new Date(substackPost.pubDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          image: substackPost.thumbnail || substackPost.enclosure?.link || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
          link: substackPost.link,
          external: true
        });
      }

      setFeaturedInsights(insights);
    } catch (error) {
      console.error('Error fetching featured insights:', error);
      // Fallback to hardcoded data if API fails
      setFeaturedInsights([
        {
          type: "Article",
          category: "Leadership Development",
          title: "The Future of C-Suite Leadership in Uncertain Times",
          description: "Exploring how today's senior executives can navigate complexity while driving organizational transformation and maintaining stakeholder trust.",
          author: "Vanguard Faculty",
          duration: "8 min read",
          image: "https://images.unsplash.com/photo-1543132220-7bc04a0e790a"
        },
        {
          type: "Podcast",
          category: "Board Dynamics",
          title: "Board Dynamics: Building Effective Governance",
          description: "A candid discussion with three experienced board chairs about creating high-performing governance structures.",
          author: "Member Contributor",
          duration: "45 min listen",
          image: "https://images.unsplash.com/photo-1579525109384-ddf54825044f"
        },
        {
          type: "Video",
          category: "Personal Awareness",
          title: "Personal Awareness in Executive Decision Making",
          description: "Understanding how self-awareness drives better strategic decisions and enhances leadership effectiveness.",
          author: "Affiliate Contributor",
          duration: "12 min watch",
          image: "https://images.unsplash.com/photo-1562935345-5080389daccd"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const contentTypes = [
    {
      title: "Articles",
      description: "In-depth analysis and thought leadership on organizational transformation and leadership excellence.",
      icon: <Newspaper size={32} />
    },
    {
      title: "Podcasts",
      description: "Conversations with industry leaders sharing insights on governance, strategy, and leadership development.",
      icon: <MessageCircle size={32} />
    },
    {
      title: "Videos",
      description: "Visual content featuring expert discussions and leadership development sessions from our community.",
      icon: <Video size={32} />
    },
    {
      title: "Ken Banta's Substack",
      description: "Stay updated with the latest leadership insights and strategic thinking from our Founder & CEO column, <strong>Ken Banta on Leadership</strong>.",
      icon: <Newspaper size={32} />
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Our Content & Thought Leadership
          </h2>
          <p className="text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Members gain access to a rich library featuring leadership insights from Vanguard faculty, members, and affiliate contributors spanning leadership development, board dynamics, and organizational transformation.
          </p>
        </motion.div>

        {/* Integrated Content Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          {loading ? (
            <div className="text-center py-6 md:py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-slate-600">Loading latest insights...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredInsights.map((insight, index) => (
                <motion.div
                  key={insight.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col h-full"
                >
                  {/* Intro Header Section */}
                  <div className="bg-gradient-to-r from-blue-50 to-slate-50 border-b border-gray-200 p-4">
                    <div className="flex items-center justify-center text-[#045184] mb-2" style={{ height: '32px' }}>
                      {insight.type === 'Article' ? <Newspaper size={24} /> : 
                       insight.type === 'Podcast' ? <Headphones size={24} /> : 
                       insight.type === 'Video' ? <Video size={24} /> : 
                       <FileText size={24} />}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2 text-center whitespace-nowrap overflow-hidden" style={{ height: '24px', lineHeight: '24px' }}>
                      {insight.type === 'Article' ? 'Articles' : 
                       insight.type === 'Podcast' ? 'Podcasts' : 
                       insight.type === 'Video' ? 'Videos' : 
                       "Ken Banta's Substack"}
                    </h3>
                    <div className="flex items-start justify-center" style={{ height: '80px' }}>
                      <p className="text-xs text-slate-600 leading-relaxed text-center" dangerouslySetInnerHTML={{ 
                        __html: insight.type === 'Article' ? 'In-depth analysis and thought leadership on organizational transformation and leadership excellence.' : 
                                insight.type === 'Podcast' ? 'Conversations with industry leaders sharing insights on governance, strategy, and leadership development.' : 
                                insight.type === 'Video' ? 'Visual content featuring expert discussions and leadership development sessions from our community.' : 
                                'Stay updated with the latest leadership insights and strategic thinking from our Founder & CEO column, <strong>Ken Banta on Leadership</strong>.'
                      }}>
                      </p>
                    </div>
                  </div>

                  {/* Image Section */}
                  <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url('${insight.image}')` }}>
                    <div className="h-full bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  
                  <div className="p-4 flex flex-col flex-grow">
                    {/* Content Area - grows to fill available space */}
                    <div className="flex-grow">
                      <h4 className="text-base font-bold text-slate-900 mb-2 leading-tight">
                        {insight.title}
                      </h4>
                      <p className="text-slate-600 text-xs mb-3 leading-relaxed">
                        {insight.description}
                      </p>
                    </div>
                    
                    {/* Button Area - always at bottom */}
                    <div className="mt-auto pt-3">
                      {insight.link ? (
                        insight.external ? (
                          <a 
                            href={insight.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-center"
                          >
                            {insight.type === 'Article' ? 'Read more' : 
                             insight.type === 'Podcast' ? 'Listen to podcast' : 
                             insight.type === 'Video' ? 'Watch video' : 
                             insight.type === 'Substack' ? 'Read on Substack' : 'Read More'}
                          </a>
                        ) : (
                          <Link 
                            to={insight.link}
                            className="block w-full bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-center"
                          >
                            {insight.type === 'Article' ? 'Read more' : 
                             insight.type === 'Podcast' ? 'Listen to podcast' : 
                             insight.type === 'Video' ? 'Watch video' : 'Read More'}
                          </Link>
                        )
                      ) : (
                        <button 
                          className="w-full bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          {insight.type === 'Article' ? 'Read more' : 
                           insight.type === 'Podcast' ? 'Listen to podcast' : 
                           insight.type === 'Video' ? 'Watch video' : 'Read More'}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

// Executive Networks Section
const NewsroomSliderSection = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewsroomArticles();
  }, []);

  const fetchNewsroomArticles = async () => {
    try {
      setLoading(true);
      const backendUrl = import.meta.env?.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/newsroom`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch newsroom articles: ${response.status}`);
      }
      
      const articleData = await response.json();
      
      // Get only the top 6 most recent articles
      const recentArticles = articleData.slice(0, 6).map((article) => ({
        id: article.id,
        title: article.blog_title,
        description: article.description_teaser || "Read more about this newsroom update...",
        image: article.photo || "https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=News",
        date: formatDate(article.publish_by),
        link: `/newsroom-item/${article.id}`,
        type: article.type_of_news || "NEWS"
      }));
      
      setNewsArticles(recentArticles);
    } catch (err) {
      console.error('Error fetching newsroom articles:', err);
      // Use fallback articles if fetch fails
      setNewsArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Recent';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Recent';
    }
  };

  // Custom arrow components for slider
  const CustomPrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
      aria-label="Previous slide"
    >
      <ChevronLeft size={24} className="text-slate-700" />
    </button>
  );

  const CustomNextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
      aria-label="Next slide"
    >
      <ChevronRight size={24} className="text-slate-700" />
    </button>
  );

  const sliderSettings = {
    dots: true,
    infinite: newsArticles.length > 3,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: newsArticles.length > 2,
          adaptiveHeight: false,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: newsArticles.length > 1,
          adaptiveHeight: false,
        }
      }
    ]
  };

  if (loading) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (newsArticles.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-900">
              Latest From Our Newsroom
            </h2>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Stay updated with the latest news, announcements, and exclusive content
          </p>
        </motion.div>

        {/* Desktop Slider - Hidden on Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="newsroom-slider hidden md:block relative"
        >
          <Slider {...sliderSettings}>
            {newsArticles.map((article) => (
              <div key={article.id} className="px-4 py-4 md:py-8 h-full">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-slate-100 flex flex-col h-full min-h-[630px]">
                  {/* Article Image */}
                  <div className="relative h-[324px] overflow-hidden bg-slate-100 flex-shrink-0">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Article Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-4 group-hover:text-blue-600 transition-colors leading-tight" style={{minHeight: '5.5rem'}}>
                      {article.title}
                    </h3>
                    
                    <div className="text-slate-600 text-sm mb-4 leading-relaxed line-clamp-5 prose prose-sm max-w-none flex-grow">
                      <ReactMarkdown
                        components={{
                          p: ({node, ...props}) => <span {...props} />,
                          strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                          em: ({node, ...props}) => <em className="italic" {...props} />,
                        }}
                      >
                        {article.description}
                      </ReactMarkdown>
                    </div>
                    
                    <Link
                      to={article.link}
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm group-hover:gap-3 transition-all"
                    >
                      <span>Read More</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </motion.div>

        {/* Mobile Stack Layout - Show only on Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="md:hidden space-y-6"
        >
          {newsArticles.slice(0, 3).map((article, index) => (
            <Link key={article.id} to={article.link} className="block">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-slate-100 flex">
                {/* Article Image */}
                <div className="relative w-28 h-28 flex-shrink-0 overflow-hidden bg-slate-100">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Article Content */}
                <div className="p-4 flex flex-col justify-center flex-grow">
                  <h3 className="text-sm font-bold text-slate-900 mb-2 line-clamp-2 leading-tight">
                    {article.title}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-blue-600 font-semibold text-xs">
                    Read More
                    <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <Link
            to="/newsroom"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white px-4 md:px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300"
          >
            <span>View All Updates</span>
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>

      {/* Custom Slider Styles */}
      <style jsx>{`
        .newsroom-slider .slick-dots {
          bottom: -50px;
        }
        .newsroom-slider .slick-dots li button:before {
          font-size: 12px;
          color: #64748b;
        }
        .newsroom-slider .slick-dots li.slick-active button:before {
          color: #2563eb;
        }
        .newsroom-slider .slick-prev,
        .newsroom-slider .slick-next {
          width: 48px;
          height: 48px;
          z-index: 10;
        }
        .newsroom-slider .slick-prev {
          left: -60px;
        }
        .newsroom-slider .slick-next {
          right: -60px;
        }
        .newsroom-slider .slick-prev:before,
        .newsroom-slider .slick-next:before {
          font-size: 48px;
          color: #045184;
          opacity: 1;
        }
        .newsroom-slider .slick-prev:hover:before,
        .newsroom-slider .slick-next:hover:before {
          opacity: 0.8;
        }
        @media (max-width: 1280px) {
          .newsroom-slider .slick-prev {
            left: -40px;
          }
          .newsroom-slider .slick-next {
            right: -40px;
          }
        }
        @media (max-width: 768px) {
          .newsroom-slider .slick-prev {
            left: 10px;
          }
          .newsroom-slider .slick-next {
            right: 10px;
          }
        }
      `}</style>
    </section>
  );
};


// Export all components
const Components = {
  Header,
  Footer,
  AdvisoryPage,
  TeamPage,
  ContactPage,
  BookPage,
  NewHero,
  NewStatsSection,
  NewWhatWeDoSection,
  NewAboutSection,
  NewContentLibrarySection,
  GCLBanner,
  VideoQuoteSection,
  NewsroomSliderSection
};

export default Components;
