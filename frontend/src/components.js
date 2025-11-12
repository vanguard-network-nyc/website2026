import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ChevronRight, 
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
  ExternalLink
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
          className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 hover:opacity-80 transition-opacity duration-200"
        >
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-xs sm:text-sm font-bold text-center">
              Now incorporating the
            </span>
            <img
              src="https://static.wixstatic.com/media/e6a994_d8ffd6feab98477786e859a280b2eb5d~mv2.png/v1/fill/w_338,h_32,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/GCL.png"
              alt="Global Counsel Leaders"
              className="h-4 sm:h-6"
            />
            <span className="text-xs sm:text-sm font-bold">
              Community.
            </span>
          </div>
          <span className="text-blue-700 font-bold text-xs sm:text-sm flex items-center gap-1">
            Read more
            <ArrowRight size={12} className="sm:w-3.5 sm:h-3.5" />
          </span>
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
      path: '/networking',
      dropdown: [
        { name: 'General Counsel Network', path: '#' },
        { name: 'Senior In-House Counsel Network', path: '#' },
        { name: 'Life Sciences CEO Network', path: '#' },
        { name: 'Risk Management Network', path: '#' },
        { name: 'Senior Executive Network', path: '#' }
      ]
    },
    { name: 'PROGRAMS', path: '/programs-v2' },
    { name: 'EVENTS', path: '/upcoming-events' },
    { 
      name: 'CONTENT', 
      dropdown: [
        { name: 'Articles', path: '/articles' },
        { name: 'Podcasts', path: '/podcasts' },
        { name: 'Videos', path: '/videos' },
        { name: 'In the Press', path: '/in-the-press' },
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                className="h-16 w-auto object-contain max-w-xs"
                onError={(e) => {
                  console.error('Logo failed to load:', e);
                  e.target.style.display = 'none';
                }}
                onLoad={() => console.log('Logo loaded successfully')}
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
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
              <Link
                to="/members"
                className="text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                style={{ backgroundColor: '#00A8E1' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#0096C7'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#00A8E1'}
              >
                MEMBER SITE
              </Link>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-slate-700 pt-4 pb-4"
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.dropdown ? (
                    // Mobile dropdown
                    <div className="py-2">
                      <div className="text-white font-medium mb-2">{item.name}</div>
                      {item.dropdown.map((subItem, subIndex) => (
                        <Link
                          key={subItem.name}
                          to={subItem.path}
                          className="block text-blue-300 hover:text-blue-100 py-1 pl-4 text-sm transition-colors duration-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    // Regular mobile link - handle external links
                    item.external ? (
                      <a
                        href={item.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-white hover:text-blue-400 py-2 font-medium transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link
                        to={item.path}
                        className="block text-white hover:text-blue-400 py-2 font-medium transition-colors duration-200"
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
                transition={{ delay: 0.6 }}
              >
                <Link
                  to="/members"
                  className="block text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 mt-4 text-center"
                  style={{ backgroundColor: '#00A8E1' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#0096C7'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#00A8E1'}
                  onClick={() => setIsMenuOpen(false)}
                >
                  MEMBER SITE
                </Link>
              </motion.div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
    </>
  );
};

// Hero Section
const Hero = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Ensure video plays
      video.play().catch(e => console.log('Video play failed:', e));
      
      // Simple approach: restart video smoothly by seeking to beginning
      const handleVideoEnd = () => {
        video.currentTime = 0;
        video.play();
      };
      
      video.addEventListener('ended', handleVideoEnd);
      
      return () => {
        video.removeEventListener('ended', handleVideoEnd);
      };
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/network-dark-bg.png"
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-16 max-w-5xl mx-auto border border-white/20 shadow-2xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-6xl md:text-7xl font-bold mb-8 tracking-tight bg-gradient-to-r from-white via-[#00A8E1] to-white bg-clip-text text-transparent"
          >
            WHAT WE DO
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-2xl md:text-3xl text-white/95 mb-12 leading-relaxed max-w-4xl mx-auto font-medium"
          >
            The Vanguard Network helps current and future senior leaders transform themselves 
            and their organizations by{' '}
            <span className="font-bold bg-gradient-to-r from-[#00A8E1] to-[#0284c7] bg-clip-text text-transparent">unlocking high-performance leadership</span>.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/networking"
                className="group text-white px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-2xl relative overflow-hidden"
                style={{ 
                  background: 'linear-gradient(135deg, #00A8E1 0%, #0284c7 100%)'
                }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  NETWORKS
                  <Network size={24} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0284c7] to-[#00A8E1] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/advisory"
                className="group bg-transparent border-3 border-white text-white hover:bg-white hover:text-[#045184] px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-2xl relative overflow-hidden outline outline-2 outline-[#00A8E1]"
              >
                <span className="flex items-center gap-3">
                  ADVISORY
                  <Target size={24} className="group-hover:scale-110 transition-transform duration-300" />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ 
            y: [0, 10, 0],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="flex flex-col items-center text-white/90 cursor-pointer group"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="text-sm font-bold mb-3">Scroll to explore</span>
          <div className="w-14 h-14 rounded-full border-3 border-white/60 flex items-center justify-center hover:border-[#00A8E1] hover:bg-[#00A8E1]/20 transition-all duration-300">
            <ChevronDown size={28} className="text-[#00A8E1] group-hover:text-white transition-colors duration-300" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

// Services Section
const ServicesSection = () => {
  const services = [
    {
      title: 'ADVISORY',
      description: 'The Vanguard Network supports senior executives as they build high-performance organizations and take their leadership, and their teams, to higher levels. We also help top leaders develop a meaningful sense of purpose and culture that will deliver results for their organization — and catalyze change when needed.',
      buttonText: 'More Info',
      icon: <Target size={48} />,
      image: '/advisory-image.jpg',
      gradient: 'from-[#045184] to-[#0369a1]',
      bgGradient: 'from-[#045184]/5 to-[#0369a1]/5'
    },
    {
      title: 'NETWORKING',
      description: 'The Vanguard community is a by-invitation network for senior leaders. Become a member to fine-tune your leadership, and build new relationships, to keep growing, to keep thriving. Join the community for top leadership discussions, networking, rich content and customized resources.',
      buttonText: 'Become a Member',
      icon: <Users size={48} />,
      image: '/networking-image.jpg',
      gradient: 'from-[#00A8E1] to-[#0284c7]',
      bgGradient: 'from-[#00A8E1]/5 to-[#0284c7]/5'
    },
    {
      title: 'NEW BOOK',
      description: 'Seeing Around Corners - A comprehensive guide to developing strategic foresight and anticipating change in today\'s rapidly evolving business landscape. Learn the essential skills every leader needs to navigate uncertainty and drive organizational success.',
      buttonText: 'More Info & Order',
      icon: <BookOpen size={48} />,
      image: '/newbook-image.jpg',
      gradient: 'from-[#6366f1] to-[#8b5cf6]',
      bgGradient: 'from-[#6366f1]/5 to-[#8b5cf6]/5'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full border-2 border-transparent hover:border-slate-200"
              whileHover={{ y: -8 }}
            >
              <div 
                className="h-80 bg-cover bg-center relative overflow-hidden"
                style={{ backgroundImage: `url('${service.image}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-60`}></div>
                <div className="absolute bottom-6 left-6">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center shadow-lg text-white backdrop-blur-sm`}
                  >
                    {service.icon}
                  </motion.div>
                </div>
              </div>
              
              <div className="p-8 flex flex-col justify-between h-full">
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 group-hover:text-[#045184] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    {service.description}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group/btn w-full text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl mt-8 bg-gradient-to-r ${service.gradient} relative overflow-hidden`}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {service.buttonText}
                    <ChevronRight size={20} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className={`absolute inset-0 bg-gradient-to-l ${service.gradient} opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300`}></div>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonial Section
const TestimonnialSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-gradient-to-r from-[#045184] to-[#00A8E1]"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-gradient-to-r from-[#00A8E1] to-[#0284c7]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-12 md:p-16 shadow-xl border-2 border-transparent hover:border-[#045184]/10 transition-all duration-500"
        >
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/3">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#045184] to-[#00A8E1] rounded-full opacity-20 blur-xl"></div>
                <img
                  src="https://static.wixstatic.com/media/e6a994_ab92d0708e7a4a32bd495d6b1b85b08e~mv2.png/v1/crop/x_0,y_79,w_642,h_642/fill/w_242,h_242,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Tom%20Sabatino.png"
                  alt="Tom Sabatino"
                  className="relative w-full max-w-xs rounded-full shadow-2xl mx-auto border-4 border-[#00A8E1]"
                />
              </motion.div>
            </div>
            
            <div className="md:w-2/3">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#045184] to-[#00A8E1] flex items-center justify-center mb-6">
                  <MessageCircle size={32} className="text-white" />
                </div>
              </motion.div>
              
              <motion.blockquote
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-medium text-slate-800 italic mb-8 leading-relaxed"
              >
                "One quality sets apart successful companies and successful executives: high-performance leadership. 
                Developing great leaders, and supporting their work, is where the{' '}
                <span className="bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent font-bold">
                  Vanguard team really excels
                </span>."
              </motion.blockquote>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#045184] to-[#00A8E1] rounded-full"></div>
                <div className="pl-6">
                  <h4 className="text-2xl font-bold text-slate-900 mb-2">Tom Sabatino</h4>
                  <p className="text-lg text-slate-600 font-medium">
                    Former Chief Legal Officer, Best Buy<br />
                    and Co., Transact, Aimia, AARP, Brightpoint, United Airlines, Schwing Rough
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Video Testimonial Section
const VideoTestimonial = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-24 bg-gradient-to-br from-[#6366f1]/10 via-slate-100 to-[#8b5cf6]/10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-40 h-40 rounded-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]"></div>
        <div className="absolute bottom-20 left-20 w-28 h-28 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#6366f1]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-12 md:p-16 shadow-xl border-2 border-transparent hover:border-[#00A8E1]/10 transition-all duration-500"
        >
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl group"
              >
                {/* Video Container with Enhanced Styling */}
                <div className="relative">
                  <video
                    poster="/ken-thumbnail.png"
                    controls
                    preload="metadata"
                    className="w-full h-auto rounded-2xl"
                    style={{ maxHeight: '400px' }}
                  >
                    <source src="https://video.wixstatic.com/video/e6a994_384d4905f2a04605977d992f75273455/720p/mp4/file.mp4" type="video/mp4" />
                    <source src="https://video.wixstatic.com/video/e6a994_384d4905f2a04605977d992f75273455/480p/mp4/file.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                
                {/* Video Title */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="mt-6 text-center mb-8"
                >
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#045184]/10 to-[#00A8E1]/10 px-6 py-3 rounded-full">
                    <Video size={20} className="text-[#045184]" />
                    <span className="font-bold text-slate-700">CEO Message</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
            
            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] flex items-center justify-center mb-6">
                  <Target size={32} className="text-white" />
                </div>
              </motion.div>
              
              <motion.blockquote
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-medium text-slate-800 italic mb-8 leading-relaxed"
              >
                "Our sole focus is{' '}
                <span className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent font-bold">
                  unlocking high-performance leadership
                </span>, so that's why we don't take the cookie-cutter approach."
              </motion.blockquote>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#6366f1] to-[#8b5cf6] rounded-full"></div>
                <div className="pl-6">
                  <h4 className="text-2xl font-bold text-slate-900 mb-2">Ken Banta</h4>
                  <p className="text-lg text-slate-600 font-medium">Founder & CEO, The Vanguard Network</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Programs Section
const ProgramsSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-[#045184] via-[#0369a1] to-[#00A8E1] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/20"></div>
        <div className="absolute top-20 right-20 w-24 h-24 rounded-full bg-white/15"></div>
        <div className="absolute bottom-10 left-1/3 w-20 h-20 rounded-full bg-white/10"></div>
        <div className="absolute bottom-20 right-10 w-36 h-36 rounded-full bg-white/25"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Program Badge */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-8 py-4 rounded-full mb-8"
          >
            <Award size={24} className="text-white" />
            <span className="text-white font-bold tracking-wider text-lg">PROGRAMS</span>
          </motion.div>
          
          {/* Enhanced Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold text-white mb-12 leading-tight"
          >
            The{' '}
            <span className="relative">
              <span className="bg-gradient-to-r from-white to-[#00A8E1] bg-clip-text text-transparent">
                New Leaders Program
              </span>
            </span>
            <br />
            introduces critical leadership<br />
            challenges to select groups of<br />
            high-performance aspiring<br />
            leaders.
          </motion.h2>
          
          {/* Enhanced Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed font-medium"
          >
            A comprehensive 6-12 month program designed to accelerate leadership development 
            through practical challenges, mentorship, and real-world application.
          </motion.p>
          
          {/* Enhanced Button */}
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group bg-white text-[#045184] px-12 py-5 rounded-xl font-bold text-xl transition-all duration-300 flex items-center gap-3 mx-auto shadow-lg hover:shadow-2xl relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              LEARN MORE
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  const footerLinks = [
    { name: 'Contact Us', path: '/contact' },
    { name: 'Our Team', path: '/team' },
    { name: 'Home 2', path: '/home-2' },
    { name: 'LinkedIn', path: 'https://www.linkedin.com/company/the-vanguard-network' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Use', path: '/terms' },
    { name: 'Become a Member', path: '/networking' }
  ];

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              href="https://www.linkedin.com/company/the-vanguard-network"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-[#0077b5] transition-colors duration-200"
              title="Follow us on LinkedIn"
            >
              <Linkedin size={20} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, color: '#3b82f6' }}
              href="#"
              className="text-white/60 hover:text-blue-400 transition-colors duration-200"
            >
              <Mail size={20} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, color: '#3b82f6' }}
              href="#"
              className="text-white/60 hover:text-blue-400 transition-colors duration-200"
            >
              <Phone size={20} />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Additional Pages
const AboutPage = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="pt-40 pb-12 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
  >
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-slate-900 mb-6">About The Vanguard Network</h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          Transforming leadership through innovation, expertise, and community.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <img
            src="https://images.unsplash.com/photo-1573496130103-a442a3754d0e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwzfHxsZWFkZXJzaGlwJTIwZGV2ZWxvcG1lbnR8ZW58MHx8fGJsdWV8MTc1MDgzOTA3Nnww&ixlib=rb-4.1.0&q=85"
            alt="About Us"
            className="w-full rounded-xl shadow-lg"
          />
        </motion.div>
        
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            At The Vanguard Network, we believe that exceptional leadership is the cornerstone of organizational success. 
            Our mission is to develop high-performance leaders who can navigate complexity, inspire teams, and drive 
            meaningful change in their organizations.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Through our comprehensive advisory services, exclusive networking opportunities, and innovative programs, 
            we empower current and future executives to reach their full potential and create lasting impact.
          </p>
        </motion.div>
      </div>
    </div>
  </motion.div>
);

const AdvisoryPage = () => {
  useEffect(() => {
    // Handle hash navigation on page load
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - 165; // Account for fixed header + banner
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 300); // Give more time for page to render
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 
          className="text-5xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent"
          style={{
            backgroundImage: 'linear-gradient(45deg, #7f30cb, #01dcba)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
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

    {/* Three Approaches Section - Moved to top */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mb-20"
      >
        {/* Section Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#045184]/5 to-[#00A8E1]/5 rounded-3xl transform -skew-y-1"></div>
          <div className="relative py-12 px-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#045184] to-[#00A8E1] flex items-center justify-center mx-auto mb-6"
            >
              <Users size={32} className="text-white" />
            </motion.div>
            <h2 className="text-5xl font-bold text-slate-900 mb-6">
              Three Ways We Work With Executives<br />To Build High-Performance Organizations
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium">
              Our comprehensive approach delivers three distinct types of advisory services to accelerate your leadership impact and organizational success.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: 'Strategic Counsel',
              description: 'Direct one-on-one coaching and strategic sounding board support for senior executives. Includes both coaching relationships and confidential strategic guidance.',
              image: 'https://images.pexels.com/photos/2977565/pexels-photo-2977565.jpeg',
              gradient: 'from-[#045184] to-[#0369a1]',
              bgGradient: 'from-[#045184]/5 to-[#0369a1]/5',
              details: (
                <div className="flex gap-6">
                  <a href="#strategic-counsel" className="text-blue-600 hover:text-blue-700 font-semibold underline decoration-2 underline-offset-2 transition-colors duration-200">
                    Strategic Counsel
                  </a>
                </div>
              )
            },
            {
              title: 'Organizational Transformation',
              description: 'We help transform what your people believe, the way they work, and how they behave. Grounded in decades of experience with major multinationals and global service firms.',
              image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
              gradient: 'from-[#10b981] to-[#059669]',
              bgGradient: 'from-[#10b981]/5 to-[#059669]/5',
              backgroundImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
              details: (
                <div className="flex gap-6">
                  <a href="#organizational-transformation" className="text-blue-600 hover:text-blue-700 font-semibold underline decoration-2 underline-offset-2 transition-colors duration-200">
                    Learn More
                  </a>
                </div>
              )
            },
            {
              title: 'Client and Stakeholder Engagement',
              description: 'Leadership Exchanges that bring together clients and stakeholders in highly relevant conversations, transforming supplier relationships into peer and trusted advisor roles.',
              image: 'https://images.unsplash.com/photo-1564368587612-f303d38c9063',
              gradient: 'from-[#00A8E1] to-[#0284c7]',
              bgGradient: 'from-[#00A8E1]/5 to-[#0284c7]/5',
              details: (
                <div className="flex gap-6">
                  <a href="#client-and-stakeholder-engagement" className="text-blue-600 hover:text-blue-700 font-semibold underline decoration-2 underline-offset-2 transition-colors duration-200">
                    Learn More
                  </a>
                </div>
              )
            }
          ].map((approach, index) => (
            <motion.div
              key={approach.title}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.2, duration: 0.8 }}
              className="group bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 overflow-hidden"
              whileHover={{ y: -8 }}
            >
              {/* Image with overlaid title - matching landing page style */}
              <div className="h-48 bg-cover bg-center relative" style={{ backgroundImage: `url('${approach.image}')` }}>
                {/* Banner for Landing Page connection */}
                {approach.showBanner && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-md">
                    <span className="flex items-center gap-1">
                      <Target size={12} />
                      Featured on Landing Page
                    </span>
                  </div>
                )}
                
                {/* Landing Page Link indicator */}
                {approach.landingPageLink && !approach.showBanner && (
                  <div className="absolute top-4 left-4 bg-white/90 text-slate-700 px-3 py-1 rounded-lg text-xs font-medium border border-slate-200">
                    <span className="flex items-center gap-1">
                      <ArrowRight size={12} />
                      See details on Landing Page
                    </span>
                  </div>
                )}
                
                {/* Title overlay with gradient - matching landing page */}
                <div className="h-full bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                  <h3 className="text-2xl font-bold text-white group-hover:text-blue-200 transition-colors duration-300">
                    {approach.title}
                  </h3>
                </div>
              </div>
              
              {/* Content section */}
              <div className="p-6">
                <p className="text-slate-600 leading-relaxed font-medium text-lg mb-4">
                  {approach.description}
                </p>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {approach.details}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>

    {/* Continuation Section */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-xl text-slate-600 leading-relaxed font-medium text-center italic">
            We're pragmatic, results-driven, and focused on enabling leaders to own and sustain transformation, not on deploying large consulting teams.
          </p>
        </div>
      </motion.div>
    </div>

    {/* Main Content */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Overview Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="bg-white rounded-3xl p-12 md:p-16 shadow-xl border-2 border-transparent hover:border-[#045184]/10 transition-all duration-500 mb-16 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#045184]/5 to-[#00A8E1]/5 rounded-full transform translate-x-20 -translate-y-20"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#045184] to-[#00A8E1] flex items-center justify-center mb-6">
                <Target size={32} className="text-white" />
              </div>
            </motion.div>
            
            <h2 className="text-4xl font-bold text-slate-900 mb-8 bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent">
              Real-World Leadership Development
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6 text-lg font-medium">
              Our approach draws on the wisdom of hundreds of CEOs, board directors, and C-suite leaders - shared through powerful peer-to-peer exchanges.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6 text-lg font-medium">
              These real-world insights cut through theory, offering proven strategies for today's most pressing leadership challenges.
            </p>
            <p className="text-slate-600 leading-relaxed text-lg font-medium">
              We combine this with decades of experience advising top leadership at major multinationals and global service firms, as well as in dozens of one-on-one advisory engagements.
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#045184]/10 via-blue-50 to-[#00A8E1]/10 rounded-2xl p-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#045184]/5 to-[#00A8E1]/5"></div>
            <div className="text-center relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-7xl font-bold mb-6 bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent"
              >
                200+
              </motion.div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">CEOs & C-Suite Executives</h3>
              <p className="text-slate-600 font-medium text-lg mb-6">In our network participating in ongoing catalyzing conversations</p>
              <p className="text-slate-600 leading-relaxed text-base italic">
                Like you, we know that AI and new technologies are tools. The real differentiator is 'the human factor'. That's why we focus on people, whether in our executive networks or supporting your business.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Detailed Services */}
      <div className="space-y-12">
        
        {/* Strategic Counsel Section */}
        <motion.div
          id="strategic-counsel"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-lg"
          style={{ scrollMarginTop: '120px' }}
        >
          {/* Strategic Counsel Title */}
          <h2 className="text-4xl font-bold text-slate-900 mb-8 text-center">STRATEGIC COUNSEL</h2>
          
          {/* Coaching Subsection */}
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
                className="rounded-xl p-8" 
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
              className="mt-12 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-8"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
                    alt="Client testimonial"
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <blockquote className="text-lg italic text-slate-700 mb-4 leading-relaxed">
                    "The coaching approach helped me develop more effective decision-making skills and significantly improved how I develop my team. The insights were practical and immediately applicable."
                  </blockquote>
                  <div className="text-slate-900 font-bold">Michael Chen</div>
                  <div className="text-slate-600 text-sm">Chief Operating Officer, Global Manufacturing Corp</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sounding Board Subsection */}
          <div className="mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
                className="rounded-xl p-8" 
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
              className="mt-12 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-8"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                    alt="Client testimonial"
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <blockquote className="text-lg italic text-slate-700 mb-4 leading-relaxed">
                    "Having Ken and Richard as strategic sounding boards has been invaluable during critical decision-making moments. Their experience and perspective helped me navigate complex stakeholder challenges with confidence."
                  </blockquote>
                  <div className="text-slate-900 font-bold">Sarah Rodriguez</div>
                  <div className="text-slate-600 text-sm">Chief Executive Officer, TechForward Solutions</div>
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
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 group"
            >
              View Leadership Advisory Client Success Stories
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Organizational Transformation Section */}
        <motion.div
          id="organizational-transformation"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-lg"
          style={{ scrollMarginTop: '120px' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-6">ORGANIZATIONAL TRANSFORMATION</h2>
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
              className="rounded-xl p-8" 
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
            className="mt-12 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-8"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHw0fHxjb3Jwb3JhdGUlMjBoZWFkc2hvdHxlbnwwfHx8fDE3NTgwNTIzOTh8MA&ixlib=rb-4.1.0&q=85"
                  alt="Client testimonial"
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <blockquote className="text-lg italic text-slate-700 mb-4 leading-relaxed">
                  "The Vanguard Network's transformation approach helped us shift our entire organizational culture. Their practical methodology and hands-on guidance enabled sustainable change that our employees embraced rather than resisted."
                </blockquote>
                <div className="text-slate-900 font-bold">Jennifer Thompson</div>
                <div className="text-slate-600 text-sm">Chief Transformation Officer, GlobalTech Innovations</div>
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
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 group"
            >
              View Organizational Transformation Client Success Stories
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Client and Stakeholder Engagement Section */}
        <motion.div
          id="client-and-stakeholder-engagement"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-lg"
          style={{ scrollMarginTop: '120px' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-6">CLIENT AND STAKEHOLDER ENGAGEMENT</h2>
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
              className="rounded-xl p-8" 
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
            className="mt-12 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-8"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1642257859842-c95f9fa8121d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwzfHxjb3Jwb3JhdGUlMjBoZWFkc2hvdHxlbnwwfHx8fDE3NTgwNTIzOTh8MA&ixlib=rb-4.1.0&q=85"
                  alt="Client testimonial"
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <blockquote className="text-lg italic text-slate-700 mb-4 leading-relaxed">
                  "The client engagement programs transformed how we interact with our key stakeholders. We moved from being seen as vendors to becoming trusted strategic partners. The ROI has been exceptional and lasting."
                </blockquote>
                <div className="text-slate-900 font-bold">Marcus Williams</div>
                <div className="text-slate-600 text-sm">Chief Client Officer, Pinnacle Advisory Group</div>
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
              className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 group"
            >
              View Client & Stakeholder Engagement Client Success Stories
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Selected Advisory Engagements Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-lg"
        >
          <div className="text-center">
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="text-4xl font-bold text-slate-900 mb-8"
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

        {/* Executive Advisory Team Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-lg"
        >
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">EXECUTIVE ADVISORY TEAM</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Ken Banta */}
            <div className="text-center">
              <div className="w-48 h-48 rounded-full mx-auto mb-6 overflow-hidden shadow-lg">
                <img 
                  src="/ken-banta.jpg" 
                  alt="Ken Banta" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">KEN BANTA</h3>
              <p className="text-lg mb-4" style={{ color: '#00A8E1' }}>Founder & CEO</p>
              <p className="text-slate-600 leading-relaxed text-sm">
                Ken helped lead eleven global turnarounds, mergers, and transformations, generating more than $83 billion in accretion. He has advised on many initiatives of varying scale and global reach, with playbooks that build high-performance cultures as a hallmark of his expertise.
              </p>
              <div className="mt-4">
                <p className="text-xs text-slate-500">Rhodes Scholar | Harvard Business Review Contributor | Co-author of "Ten Must Reads for CEOs"</p>
              </div>
            </div>

            {/* Richard Hulme */}
            <div className="text-center">
              <div className="w-48 h-48 rounded-full mx-auto mb-6 overflow-hidden shadow-lg">
                <img 
                  src="/richard-hulme.jpg" 
                  alt="Richard Hulme" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">RICHARD HULME</h3>
              <p className="text-lg mb-4" style={{ color: '#00A8E1' }}>Managing Director</p>
              <p className="text-slate-600 leading-relaxed text-sm">
                Richard has over 25 years of experience in strategy consulting, global operations, and organizational excellence. During his 15 years at PricewaterhouseCoopers, he served as chief of staff to the PwC Global Board Chairman and delivered special projects for the PwC Global CEO.
              </p>
              <div className="mt-4">
                <p className="text-xs text-slate-500">Certified OKR Coach | BS William & Mary | MBA Carnegie Mellon</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Garrick Isert */}
            <div className="text-center">
              <div className="w-48 h-48 rounded-full mx-auto mb-6 overflow-hidden shadow-lg">
                <img 
                  src="/garrick-isert.jpg" 
                  alt="Garrick Isert" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">GARRICK ISERT</h3>
              <p className="text-lg mb-4" style={{ color: '#00A8E1' }}>Principal</p>
              <p className="text-slate-600 leading-relaxed text-sm">
                Garrick brings over 20 years of corporate and management consulting experience. He has worked with global senior leaders across diverse industries including hospitality, law, e-commerce, financial services, and energy, with experience at World 50, IHG, Boston Consulting Group, and General Electric.
              </p>
              <div className="mt-4">
                <p className="text-xs text-slate-500">Six Sigma Black Belt | J.D. Northwestern | MBA Kellogg</p>
              </div>
            </div>

            {/* Aileen Gonsalves */}
            <div className="text-center">
              <div className="w-48 h-48 rounded-full mx-auto mb-6 overflow-hidden shadow-lg">
                <img 
                  src="/aileen-gonsalves.jpg" 
                  alt="Aileen Gonsalves" 
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'calc(50% - 40px) 30%' }}
                />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">AILEEN GONSALVES</h3>
              <p className="text-lg mb-4" style={{ color: '#00A8E1' }}>Principal</p>
              <p className="text-slate-600 leading-relaxed text-sm">
                Aileen brings her unique leadership communication approach, the Gonsalves Method, rooted in her career as an actor and director with the Royal Shakespeare Company. She has worked with Dame Judi Dench, Sir Simon Russell Beale, and other leading performers, now applying these skills to business leadership.
              </p>
              <div className="mt-4">
                <p className="text-xs text-slate-500">Royal Shakespeare Company | RADA Professor | Author, "Shakespeare and Meisner"</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="text-center rounded-2xl p-12"
          style={{ backgroundColor: '#00A8E1' }}
        >
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Leadership?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Join the 200+ CEOs and C-suite executives who trust The Vanguard Network for their leadership development and strategic guidance.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:bg-blue-50"
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </div>
    </div>
  </motion.div>
  );
};

const NetworkingPage = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="pt-40 pb-12 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100"
  >
    {/* Hero Section */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent">
          NETWORKING & EVENTS
        </h1>
        <p className="text-2xl text-slate-700 max-w-5xl mx-auto leading-relaxed font-medium">
          Connect with an elite community of senior leaders and access exclusive networking opportunities that drive professional growth and strategic insights.
        </p>
      </motion.div>
    </div>

    {/* Main Content */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Valuable Networking Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Valuable Networking Opportunities
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              In addition to our Forums and events we can also initiate warm introductions to other Vanguard members and have a pulse on the C-suite marketplace. If you are looking to connect with members, contact Tony Powe, Vanguard COO, for an introduction to another Vanguard member.
            </p>
            <div className="flex items-center gap-4 p-4 rounded-lg" style={{ backgroundColor: '#00A8E1' }}>
              <div className="text-white">
                <Users size={32} />
              </div>
              <div>
                <p className="text-white font-semibold">Need an Introduction?</p>
                <p className="text-white/90 text-sm">Contact Tony Powe, Vanguard COO</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-slate-100 rounded-xl p-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#045184' }}>
                <Network size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Forums & Events</h3>
              <p className="text-slate-600 text-sm">Connect with peers in your region through exclusive gatherings</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Network Membership Benefits */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mb-16"
      >
        <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">
          Network Membership Benefits
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            {
              title: 'Reach Out to Peers',
              description: 'Connect with peers on specific topics and challenges',
              icon: <MessageCircle size={48} />
            },
            {
              title: 'Warm Introductions',
              description: 'Get warm introductions via the Vanguard team',
              icon: <UserCheck size={48} />
            },
            {
              title: 'Local Peer Meet-ups',
              description: 'Organize local peer meet-ups in your area',
              icon: <MapPin size={48} />
            }
          ].map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.2, duration: 0.8 }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 + index * 0.2, duration: 0.5 }}
                className="mb-6" 
                style={{ color: '#00A8E1' }}
              >
                {benefit.icon}
              </motion.div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{benefit.title}</h3>
              <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Membership Plans */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="rounded-2xl p-8 md:p-12 shadow-lg mb-12"
        style={{ backgroundColor: '#045184' }}
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-6">Membership Plans</h2>
          <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            Choose from our specialized membership networks designed for different leadership roles and industries.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "General Counsel Network",
              description: "For General Counsel and Chief Legal Officers",
              target: "GC & CLO",
            },
            {
              name: "Senior In-House Counsel Network", 
              description: "For Deputy GC and Associate GC",
              target: "Deputy GC & Associate GC",
            },
            {
              name: "Life Sciences CEO Network",
              description: "For CEOs in the life sciences community",
              target: "Life Sciences CEOs",
            },
            {
              name: "Risk Management Network",
              description: "For senior executives who lead risk-related functions",
              target: "Risk Management Leaders",
            },
            {
              name: "Associate Membership",
              description: "Join as an associate member",
              target: "Associate Members",
            }
          ].map((plan, index) => (
            <div
              key={plan.name}
              className="bg-white/15 border border-white/20 rounded-xl hover:bg-white/25 hover:border-white/30 transition-all duration-300 cursor-pointer shadow-lg"
              style={{ 
                display: 'flex',
                flexDirection: 'column',
                height: '280px'
              }}
            >
              <div style={{ 
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                padding: '1.5rem',
                textAlign: 'center'
              }}>
                {/* Icon */}
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  margin: '0 auto 1rem auto',
                  backgroundColor: '#00A8E1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Shield size={24} className="text-white" />
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                
                {/* Target */}
                <p className="text-sm font-semibold mb-4" style={{ color: '#00A8E1' }}>{plan.target}</p>
                
                {/* Description - takes remaining space */}
                <div style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <p className="text-white/90 text-sm leading-relaxed">{plan.description}</p>
                </div>
                
                {/* Button - always at bottom with full width */}
                <button 
                  className="bg-white/20 text-white rounded-lg text-sm font-semibold hover:bg-white/30 transition-colors"
                  style={{
                    width: '100%',
                    padding: '12px 24px',
                    marginTop: 'auto'
                  }}
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-white/90 mb-4">
            Each membership network provides specialized content, peer connections, and resources tailored to your specific role and industry.
          </p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            View All Membership Options
          </button>
        </div>
      </motion.div>

      {/* New Image Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="mb-12"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="flex justify-center"
          >
            <div 
              className="overflow-hidden" 
              style={{ 
                borderRadius: '20px',
                maxWidth: '100%'
              }}
            >
              <img
                src="/networking-section-image.jpg"
                alt="Networking Section"
                className="max-w-full h-auto"
                style={{ 
                  maxHeight: '600px',
                  border: 'none',
                  boxShadow: 'none',
                  background: 'transparent',
                  display: 'block'
                }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Monthly Leadership Updates */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-12"
      >
        <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">Monthly Leadership Updates</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-xl p-8" style={{ backgroundColor: '#00A8E1' }}>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 bg-white/20 flex items-center justify-center">
                <Newspaper size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Newswire</h3>
              <p className="text-white/90 leading-relaxed">
                Stay updated with the latest leadership insights, industry trends, and strategic developments from our network of executives.
              </p>
              <button className="mt-6 bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Access Newswire
              </button>
            </div>
          </div>
          
          <div className="rounded-xl p-8" style={{ backgroundColor: '#045184' }}>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 bg-white/20 flex items-center justify-center">
                <Shield size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">C-suite Confidential Series</h3>
              <p className="text-white/90 leading-relaxed">
                Exclusive insights from C-suite executives sharing confidential strategies, challenges, and solutions from the boardroom.
              </p>
              <button className="mt-6 bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                View Series
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Members Website Features */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-12"
      >
        <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">Members Website Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: '#00A8E1' }}>
              <BookOpen size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Articles/Blogs/Podcasts</h3>
            <p className="text-slate-600 leading-relaxed">
              Access premium content that can be re-purposed by you for your teams, including articles, blogs, and podcasts from industry leaders.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: '#045184' }}>
              <Video size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Live Events</h3>
            <p className="text-slate-600 leading-relaxed">
              Join live webinars and discussion groups with fellow executives to share insights and discuss current challenges.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: '#00A8E1' }}>
              <Bot size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">AI Chat Bot 'Elsie'</h3>
            <p className="text-slate-600 leading-relaxed">
              Search our leadership knowledge database using our AI Bot 'Elsie' to get insights from top leaders on almost any leadership topic.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="text-center rounded-2xl p-12"
        style={{ backgroundColor: '#00A8E1' }}
      >
        <h2 className="text-4xl font-bold text-white mb-6">Ready to Join Our Network?</h2>
        <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
          Connect with like-minded executives, access exclusive resources, and accelerate your leadership journey with The Vanguard Network.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:bg-blue-50 inline-flex items-center gap-2"
        >
          Apply for Membership
          <ArrowRight size={20} />
        </motion.button>
      </motion.div>
    </div>
  </motion.div>
);

const ProgramsPage = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [selectedLevel, setSelectedLevel] = React.useState('All');
  
  const programs = [
    {
      name: "GC EXCHANGE",
      description: "A highly pragmatic leadership problem-solving group that meets monthly, moderated by Vanguard. Monthly, in virtual format; face-to-face sessions occur at our bi-annual Forums.",
      format: "Monthly Virtual + Bi-annual In-Person",
      audience: "General Counsel",
      icon: <Shield size={28} />,
      category: "Legal",
      level: "Executive",
      status: "Active",
      image: "/gc-exchange-program.jpg",
      duration: "Ongoing",
      participants: "12-15"
    },
    {
      name: "SENIOR IN-HOUSE COUNSEL EXCHANGE",
      description: "An exchange for GCs' immediate reports to compare notes and solve problems together. Monthly, in virtual format.",
      format: "Monthly Virtual",
      audience: "Senior In-House Counsel",
      icon: <BookOpen size={28} />,
      category: "Legal",
      level: "Senior",
      status: "Active",
      image: "/senior-counsel-exchange-program.jpg",
      duration: "Ongoing",
      participants: "10-12"
    },
    {
      name: "LIFE SCIENCES CEO EXCHANGES",
      description: "For Life Sciences CEOs, focusing on leadership aspects rather than day-to-day tasks. Discussions include AI in development and commercialization. Quarterly, in virtual format, with face-to-face sessions bi-annually.",
      format: "Quarterly Virtual + Bi-annual In-Person",
      audience: "Life Sciences CEOs",
      icon: <Award size={28} />,
      category: "Life Sciences",
      level: "Executive",
      status: "Active",
      image: "/life-sciences-ceo-program.jpg",
      duration: "Ongoing",
      participants: "8-10"
    },
    {
      name: "NEXT GENERATION GC",
      description: "A six-month program to accelerate the trajectory of potential GCs, uniquely developed and led by Vanguard General Counsel Members.",
      format: "6-Month Program",
      audience: "Future General Counsel",
      icon: <Target size={28} />,
      category: "Legal",
      level: "Emerging",
      status: "Enrollment Open",
      image: "/next-generation-gc-program.jpg",
      duration: "6 Months",
      participants: "15-20"
    },
    {
      name: "NEW LEADERS PROGRAM",
      description: "A six to twelve month program to jump-start leadership capabilities among graduate students and newer hires, led by more senior executives. Highly pragmatic focus on capabilities.",
      format: "6-12 Month Program",
      audience: "Graduate Students & New Hires",
      icon: <Users size={28} />,
      category: "General",
      level: "Entry",
      status: "Enrollment Open",
      image: "/new-leaders-program.jpg",
      duration: "6-12 Months",
      participants: "20-25"
    }
  ];

  const customizedPrograms = [
    {
      name: "CEO & C-SUITE",
      description: "Customized programs to yield high-performance amongst C-suite leaders across a portfolio of companies or global teams using the Vanguard roundtable model.",
      target: "C-Suite Executives",
      benefits: ["High-Performance Leadership", "Roundtable Model", "Portfolio Companies", "Global Teams"],
      color: "#00A8E1",
      gradient: "from-[#00A8E1] to-[#0284c7]",
      bgColor: "from-[#00A8E1]/5 to-[#0284c7]/5",
      duration: "Flexible",
      participants: "8-12 Executives"
    },
    {
      name: "NEXT GENERATION C-SUITE",
      description: "Generating high-performance and a better understanding of the next Generation C-suite. Customized for enterprises using our tried and tested Next Generation C-suite modules.",
      target: "Future C-Suite Leaders",
      benefits: ["High-Performance Development", "Next-Gen Focus", "Proven Modules", "Enterprise Customization"],
      color: "#045184",
      gradient: "from-[#045184] to-[#0369a1]",
      bgColor: "from-[#045184]/5 to-[#0369a1]/5",
      duration: "6-9 Months",
      participants: "10-15 Leaders"
    },
    {
      name: "HIGH-POTENTIAL NEW HIRES",
      description: "Accelerating the success of high-potential new employees in your enterprise through a 14-week curriculum exploring leadership nuances.",
      target: "High-Potential New Employees",
      benefits: ["14-Week Curriculum", "Leadership Nuances", "New Employee Focus", "Accelerated Success"],
      color: "#00A8E1",
      gradient: "from-[#00A8E1] to-[#0284c7]",
      bgColor: "from-[#00A8E1]/5 to-[#0284c7]/5",
      duration: "14 Weeks",
      participants: "15-20 New Hires"
    },
    {
      name: "BUSINESS DEVELOPMENT",
      description: "Add value and create even stronger relationships with clients and potential clients. Executives from your company engage with 10-25 clients and/or prospects in customized Vanguard sessions, working on leadership issues that matter most to them.",
      target: "Business Development Executives",
      benefits: ["Client Relationship Building", "Customized Sessions", "Leadership Focus", "Value Creation"],
      color: "#045184",
      gradient: "from-[#045184] to-[#0369a1]",
      bgColor: "from-[#045184]/5 to-[#0369a1]/5",
      duration: "Ongoing",
      participants: "10-25 Clients"
    }
  ];

  const categories = ['All', 'Legal', 'Life Sciences', 'General'];
  const levels = ['All', 'Executive', 'Senior', 'Emerging', 'Entry'];

  const filteredPrograms = programs.filter(program => {
    const categoryMatch = selectedCategory === 'All' || program.category === selectedCategory;
    const levelMatch = selectedLevel === 'All' || program.level === selectedLevel;
    return categoryMatch && levelMatch;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-12 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100"
    >
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent">
            LEADERSHIP PROGRAMS
          </h1>
          <p className="text-2xl text-slate-700 max-w-5xl mx-auto leading-relaxed font-medium mb-8">
            Comprehensive development programs designed to accelerate leadership growth at every level through specialized exchanges and customized curricula.
          </p>
          
          {/* Quick Stats */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              { label: "Active Programs", value: "5+", icon: <Award size={24} /> },
              { label: "Program Participants", value: "200+", icon: <Users size={24} /> },
              { label: "Success Rate", value: "95%", icon: <Target size={24} /> }
            ].map((stat, index) => (
              <div key={stat.label} className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/40">
                <div className="flex items-center justify-center mb-3 text-[#045184]">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-[#045184] mb-2">{stat.value}</div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Interactive Filters */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-12"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Find Your Perfect Program</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Category Filter */}
              <div>
                <label className="block text-lg font-bold text-[#045184] mb-4">Filter by Industry</label>
                <div className="flex flex-wrap gap-3">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white shadow-lg'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Level Filter */}
              <div>
                <label className="block text-lg font-bold text-[#045184] mb-4">Filter by Level</label>
                <div className="flex flex-wrap gap-3">
                  {levels.map(level => (
                    <button
                      key={level}
                      onClick={() => setSelectedLevel(level)}
                      className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                        selectedLevel === level
                          ? 'bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white shadow-lg'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-slate-600">
                Showing <span className="font-bold text-[#045184]">{filteredPrograms.length}</span> program{filteredPrograms.length !== 1 ? 's' : ''} 
                {selectedCategory !== 'All' && <span> in <span className="font-bold">{selectedCategory}</span></span>}
                {selectedLevel !== 'All' && <span> for <span className="font-bold">{selectedLevel}</span> level</span>}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Current Leadership Programs Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-20"
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#045184] to-[#00A8E1] flex items-center justify-center">
                <Award size={24} className="text-white" />
              </div>
              <h2 className="text-4xl font-bold text-slate-900">Current Leadership Programs</h2>
            </div>
          </div>
          
          {/* Programs Grid - Optimized Card Design */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPrograms.map((program, index) => (
              <motion.div
                key={program.name}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-[#00A8E1]/20 max-w-sm mx-auto"
                whileHover={{ y: -4 }}
              >
                {/* Optimized Card Layout */}
                <div className="flex flex-col h-full">
                  {/* Image Header Section - Optimized Height */}
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
                    <img
                      src={program.image}
                      alt={program.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                    
                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                      <span className={`px-2 py-1 text-xs font-bold rounded-full backdrop-blur-sm ${
                        program.status === 'Active' 
                          ? 'bg-green-500/90 text-white' 
                          : 'bg-blue-500/90 text-white'
                      }`}>
                        {program.status}
                      </span>
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 text-xs font-bold rounded-full bg-white/90 text-slate-700 backdrop-blur-sm">
                        {program.category}
                      </span>
                    </div>
                    
                    {/* Program Icon */}
                    <div className="absolute bottom-3 left-3">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg backdrop-blur-sm" 
                        style={{ 
                          background: program.category === 'Legal' 
                            ? 'rgba(4, 81, 132, 0.9)'
                            : program.category === 'Life Sciences'
                            ? 'rgba(0, 168, 225, 0.9)'
                            : 'rgba(99, 102, 241, 0.9)'
                        }}
                      >
                        <div className="text-white text-sm">{program.icon}</div>
                      </div>
                    </div>
                  </div>

                  {/* Compact Content Section */}
                  <div className="p-4 flex flex-col flex-grow">
                    {/* Program Title */}
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#045184] transition-colors duration-300 line-clamp-2">
                      {program.name}
                    </h3>
                    
                    {/* Quick Info */}
                    <div className="flex flex-wrap items-center gap-1 mb-3 text-xs">
                      <span className="text-[#045184] font-bold">{program.level}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-500">{program.duration}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-500">{program.participants}</span>
                    </div>
                    
                    {/* Format - Compact */}
                    <div className="bg-gradient-to-r from-[#045184]/10 to-[#00A8E1]/10 rounded-lg p-2 mb-3">
                      <p className="text-xs font-bold text-[#045184]">{program.format}</p>
                    </div>
                    
                    {/* Description - Compact */}
                    <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                      {program.description}
                    </p>

                    {/* Action Button - Compact */}
                    <button className="group/btn bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white px-4 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 justify-center mt-auto">
                      <span>Learn More</span>
                      <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredPrograms.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No programs match your filters</h3>
              <p className="text-slate-600">Try adjusting your filter criteria to see more programs.</p>
            </div>
          )}
        </motion.div>

      {/* Customized Leadership Programs Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mb-20"
      >
        {/* Section Header with Different Gradient */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00A8E1]/5 to-[#045184]/5 rounded-3xl transform skew-y-1"></div>
          <div className="relative py-16 px-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#00A8E1] to-[#045184] flex items-center justify-center">
                <Target size={24} className="text-white" />
              </div>
              <span className="px-4 py-2 bg-gradient-to-r from-[#00A8E1] to-[#045184] text-white text-sm font-bold rounded-full tracking-wider">
                CUSTOM SOLUTIONS
              </span>
            </div>
            <h2 className="text-5xl font-bold text-slate-900 mb-8 leading-tight">Customized Leadership Programs</h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto font-medium leading-relaxed">
              Tailored programs designed specifically for your organization's unique needs and leadership challenges.
            </p>
          </div>
        </div>
        
        <div className="space-y-12">
          {[
            {
              name: "CEO & C-SUITE",
              description: "Customized programs to yield high-performance amongst C-suite leaders across a portfolio of companies or global teams using the Vanguard roundtable model.",
              target: "C-Suite Executives",
              benefits: ["High-Performance Leadership", "Roundtable Model", "Portfolio Companies", "Global Teams"],
              color: "#00A8E1",
              gradient: "from-[#00A8E1] to-[#0284c7]",
              bgColor: "from-[#00A8E1]/5 to-[#0284c7]/5",
              duration: "Flexible",
              participants: "8-12 Executives"
            },
            {
              name: "NEXT GENERATION C-SUITE",
              description: "Generating high-performance and a better understanding of the next Generation C-suite. Customized for enterprises using our tried and tested Next Generation C-suite modules.",
              target: "Future C-Suite Leaders",
              benefits: ["High-Performance Development", "Next-Gen Focus", "Proven Modules", "Enterprise Customization"],
              color: "#045184",
              gradient: "from-[#045184] to-[#0369a1]",
              bgColor: "from-[#045184]/5 to-[#0369a1]/5",
              duration: "6-9 Months",
              participants: "10-15 Leaders"
            },
            {
              name: "HIGH-POTENTIAL NEW HIRES",
              description: "Accelerating the success of high-potential new employees in your enterprise through a 14-week curriculum exploring leadership nuances.",
              target: "High-Potential New Employees",
              benefits: ["14-Week Curriculum", "Leadership Nuances", "New Employee Focus", "Accelerated Success"],
              color: "#00A8E1",
              gradient: "from-[#00A8E1] to-[#0284c7]",
              bgColor: "from-[#00A8E1]/5 to-[#0284c7]/5",
              duration: "14 Weeks",
              participants: "15-20 New Hires"
            },
            {
              name: "BUSINESS DEVELOPMENT",
              description: "Add value and create even stronger relationships with clients and potential clients. Executives from your company engage with 10-25 clients and/or prospects in customized Vanguard sessions, working on leadership issues that matter most to them.",
              target: "Business Development Executives",
              benefits: ["Client Relationship Building", "Customized Sessions", "Leadership Focus", "Value Creation"],
              color: "#045184",
              gradient: "from-[#045184] to-[#0369a1]",
              bgColor: "from-[#045184]/5 to-[#0369a1]/5",
              duration: "Ongoing",
              participants: "10-25 Clients"
            }
          ].map((program, index) => (
            <motion.div
              key={program.name}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.2, duration: 0.8 }}
              className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-slate-200"
              whileHover={{ y: -8 }}
            >
              <div className="grid grid-cols-1 xl:grid-cols-5 gap-0">
                {/* Content Section */}
                <div className="xl:col-span-3 p-10">
                  <div className="flex items-start gap-6 mb-8">
                    <motion.div 
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-r ${program.gradient} shadow-lg`}
                    >
                      <Award size={28} className="text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold text-slate-900 mb-3 group-hover:text-[#045184] transition-colors duration-300">{program.name}</h3>
                      <p className="text-lg font-bold mb-2" style={{ color: program.color }}>{program.target}</p>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          Duration: {program.duration}
                        </span>
                        <span className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          Participants: {program.participants}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 leading-relaxed mb-8 text-lg font-medium">{program.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {program.benefits.map((benefit, benefitIndex) => (
                      <motion.div 
                        key={benefitIndex} 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1.0 + index * 0.2 + benefitIndex * 0.1 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 group-hover:bg-slate-100 transition-colors duration-300"
                      >
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${program.gradient}`}></div>
                        <span className="text-slate-700 font-medium">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Action Section */}
                <div className={`xl:col-span-2 p-10 bg-gradient-to-br ${program.bgColor} flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 right-4 w-32 h-32 rounded-full bg-white/20"></div>
                    <div className="absolute bottom-4 left-4 w-20 h-20 rounded-full bg-white/10"></div>
                  </div>
                  
                  <div className="text-center relative z-10">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-32 h-32 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl bg-gradient-to-r ${program.gradient}`}
                    >
                      <BookOpen size={56} className="text-white" />
                    </motion.div>
                    
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`group/btn text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl bg-gradient-to-r ${program.gradient} relative overflow-hidden`}
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        Get Details
                        <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </span>
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    </motion.button>
                    
                    <p className="text-slate-600 mt-4 text-sm font-medium">
                      Custom consultation available
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Enhanced Call to Action */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
        className="text-center rounded-3xl p-16 relative overflow-hidden"
        style={{ 
          background: 'linear-gradient(135deg, #045184 0%, #00A8E1 50%, #045184 100%)'
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-8 left-8 w-24 h-24 rounded-full bg-white/20"></div>
          <div className="absolute top-16 right-16 w-16 h-16 rounded-full bg-white/15"></div>
          <div className="absolute bottom-8 left-1/3 w-20 h-20 rounded-full bg-white/10"></div>
          <div className="absolute bottom-16 right-8 w-32 h-32 rounded-full bg-white/20"></div>
        </div>
        
        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-8"
          >
            <Target size={40} className="text-white" />
          </motion.div>
          
          <h2 className="text-5xl font-bold text-white mb-8 leading-tight">Ready to Accelerate Your Leadership Journey?</h2>
          <p className="text-2xl text-white/90 mb-12 max-w-4xl mx-auto font-medium leading-relaxed">
            Join our comprehensive leadership programs and connect with like-minded executives committed to excellence and continuous growth.
          </p>
          
          <div className="flex flex-col lg:flex-row gap-6 justify-center">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-white text-[#045184] px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 shadow-lg hover:shadow-2xl relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Explore Current Programs
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-slate-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group text-white px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 border-3 border-white hover:bg-white hover:text-[#045184] relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Request Custom Program
                <Mail size={20} className="group-hover:scale-110 transition-transform duration-300" />
              </span>
            </motion.button>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { label: "Active Programs", value: "15+", icon: <Award size={24} /> },
              { label: "Industry Leaders", value: "500+", icon: <Users size={24} /> },
              { label: "Years Experience", value: "25+", icon: <Target size={24} /> }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.4 + index * 0.1 }}
                className="text-center"
              >
                <div className="flex items-center justify-center mb-3 text-white/80">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/80 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </motion.div>
);
};

const TeamPage = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="pt-40 pb-12 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 
          className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent"
          style={{
            backgroundImage: 'linear-gradient(45deg, #7f30cb, #01dcba)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Our Team
        </h1>
        <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
          Meet the experienced leadership team behind The Vanguard Network. Our team brings decades of combined experience in executive leadership, strategic consulting, and organizational development to help senior leaders achieve breakthrough results.
        </p>
      </motion.div>

      {/* Leadership Team */}
      <div className="mb-16">
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl font-bold text-center mb-12"
          style={{ color: '#045184' }}
        >
          Leadership Team
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {[
            {
              name: 'Ken Banta',
              role: 'Founder & CEO',
              image: '/ken-banta-new.jpg',
              bio: 'Ken sets the overall direction of The Vanguard Network (TVN) and how it operates to benefit members and clients. He launched TVN in 2014, and nurtured its growth from periodic meetings of healthcare leaders to today\'s organization supporting multiple networks of C-suite leaders, a robust roster of webinars and other digital content, leadership development programs, and insightful advisory services. Ken graduated from Amherst College and attended Oxford University as a Rhodes Scholar. Ken lives in the East Village in New York City and enjoys the excitement of backcountry skiing.',
              focus: 'Strategic Leadership & Organizational Development'
            },
            {
              name: 'Tony Powe',
              role: 'Co-Founder & COO',
              image: '/tony-powe-team.jpg',
              bio: 'Tony leads operations, member services, and partner relations. He has 30+ years of experience heading up operations and customer relations in eleven for- and non-profit organizations on three continents, many of them startups, and 6 of them as owner/founder. Tony has an MA in French and German from St. Andrews University in Scotland. He divides his time between the East Village in New York City and the 13th district in Paris.',
              focus: 'Operations & Member Services'
            }
          ].map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
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
                <p className="text-xs text-slate-500 mb-4 font-medium">{member.focus}</p>
              </div>
              
              <p className="text-slate-600 text-sm leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>

        {/* Senior Leadership */}
        <motion.h3
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-3xl font-bold text-center mb-8"
          style={{ color: '#045184' }}
        >
          Senior Leadership
        </motion.h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {[
            {
              name: 'Andres Feng',
              role: 'Executive Director, Programming',
              image: '/andres-feng.jpg',
              bio: 'Andres oversees key Vanguard programs including New Leaders, Next Gen GC, and the Risk Management Network, ensuring they align with Vanguard\'s mission to elevate C-suite leaders. He brings over five years of experience in innovation consulting, strategy, and stakeholder engagement, having led global initiatives for several Fortune 100 companies. Andres holds a BA in International Business from UC San Diego and dual MSc degrees in International Business and Marketing from Hult International Business School.',
              focus: 'Executive Programming & Strategy'
            },
            {
              name: 'Garrick Isert',
              role: 'Vice Principal, Executive Leadership Programs',
              image: '/garrick-isert-new.jpg',
              bio: 'Garrick is responsible for leading and facilitating programs for General Counsels and their teams with a focus on lawyers as leaders. He has over 20 years of experience in corporate, management consulting, peer networks, executive coaching and leadership development. A graduate of Wake Forest University with a BS in Business, he also earned a JD/MBA from Northwestern University. Garrick lives in Atlanta, GA with his family and is always searching for the best slice of pizza.',
              focus: 'Executive Leadership Programs'
            },
            {
              name: 'Richard Hulme',
              role: 'Senior Advisor',
              image: '/richard-hulme-new.jpg',
              bio: 'Richard is a Senior Advisor to The Vanguard Network, where he provides executive coaching for clients and consults with senior leaders on how to create a high-performance organization. He brings more than 25 years of experience in strategy, global operations, and organizational excellence, with particular expertise in leadership development. A graduate of William & Mary with a BS in biology, he also earned his MBA from Carnegie Mellon University.',
              focus: 'Executive Coaching & Organizational Excellence'
            },
            {
              name: 'Aileen Gonsalves',
              role: 'Senior Leadership Communication Coach',
              image: '/aileen-gonsalves.jpg',
              bio: 'Aileen is senior leadership communication coach to The Vanguard Network and creator of the Gonsalves Method, developed from her career as an actor and director with the Royal Shakespeare Company. She helps leaders connect authentically, read the room, and hold any audience with impact—in person or virtually. She is one of the principal coaches for The Vanguard Network\'s Pitching to Win program.',
              focus: 'Leadership Communication & Executive Presence'
            },
            {
              name: 'Dick Mosher',
              role: 'Senior Advisor',
              image: '/dick-mosher-team.jpg',
              bio: 'Dick leverages five decades of corporate and legal experience to provide valuable insights as an advisor to Vanguard\'s members and clients. He has worked as a Chief Legal Officer (CLO), General Counsel (GC), or Associate General Counsel (AGC) for public and private corporations; as a senior counsel for prominent US law firms; and led business teams at Ball, Maytag, and Hoover. Dick has a JD degree from Northwestern and is past president of the Conflict Resolution Alliance in Hawaii.',
              focus: 'Strategic Advisory & Corporate Leadership'
            },
            {
              name: 'Hope Novak',
              role: 'Executive Operations & Events Lead',
              image: '/hope-novak-team.jpg',
              bio: 'Hope is responsible for providing high-level administrative support to our CEO Ken Banta. She is also responsible for overseeing and planning events, driving new business, and strengthening Vanguard\'s unique culture. She has 10 years of experience supporting C-suite executives and 6 years managing corporate events. She graduated from Fairleigh Dickinson University with a BS in Political Science.',
              focus: 'Operations & Event Management'
            }
          ].map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0 + index * 0.1, duration: 0.8 }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                  className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 shadow-lg"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    style={{
                      objectPosition: member.image.includes('aileen') ? 'calc(center - 40px) 30%' : 
                                    member.image.includes('andres') ? 'center calc(50% + 20px)' : 'center'
                    }}
                  />
                </motion.div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{member.name}</h3>
                <p className="text-sm font-semibold mb-2" style={{ color: '#00A8E1' }}>{member.role}</p>
                <p className="text-xs text-slate-500 mb-4 font-medium">{member.focus}</p>
              </div>
              
              <p className="text-slate-600 text-sm leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>

        {/* Content & Media Team */}
        <motion.h3
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="text-3xl font-bold text-center mb-8"
          style={{ color: '#045184' }}
        >
          Content & Media Team
        </motion.h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: 'James Pallot',
              role: 'Content Director',
              image: '/james-pallot-team.jpg',
              bio: 'Jamie is responsible for the overall quality and direction of Vanguard content, including blog posts, interviews, and newsletters. He has over 25 years experience in media, having held senior editorial posts at NewsCorp, Time Inc., Microsoft and Condé Nast, where he won a National Magazine Award for General Excellence as the editor of Style.com. Jamie has a BA in English with French from the University of Sussex and an MA in Comp Lit from the University of Southampton.',
              focus: 'Content Strategy & Editorial Direction'
            },
            {
              name: 'Connor Payne',
              role: 'Manager, Operations',
              image: '/connor-payne.jpg',
              bio: 'Connor is responsible for project management for Vanguard\'s wide array of events. He also directly assists the COO, Tony, with various internal initiatives. With 8 years of experience in consulting, sales, and startups, Connor has a proven track record of delivering value to his customers, clients, and projects. Connor holds dual degrees in Business Management and Management Information Systems from Grand Valley State University.',
              focus: 'Project Management & Operations'
            },
            {
              name: 'Zarah Bautista',
              role: 'Marketing Coordinator',
              image: 'https://static.wixstatic.com/media/e6a994_59d5f5f4faa648b9a522081663fa8f77~mv2.png/v1/crop/x_70,y_0,w_940,h_940/fill/w_322,h_322,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Zarah%20Bautista.png',
              bio: 'Zarah leads the company\'s marketing, overseeing social media and content strategy to ensure consistent brand messaging, community engagement, and digital growth through targeted campaigns. With 10+ years in digital marketing as both a professional and freelancer, she brings expertise in advertising, content creation, and graphic design. She holds a BS in Information Technology from Laguna State Polytechnic University in the Philippines.',
              focus: 'Digital Marketing & Brand Strategy'
            },
            {
              name: 'Ken Stone',
              role: 'Media Director',
              image: '/ken-stone-team.jpg',
              bio: 'Ken is responsible for creating videos and podcasts from Vanguard events and also moderates Forums and other meetings. He spent 20 years in radio and television newsrooms. He then went on to teach full-time at the University of Minnesota for 7 years and currently runs his own media production company. After two years at Marquette University\'s School of Journalism, he transferred to the University of Maryland and earned a BA in Radio/TV/Film.',
              focus: 'Media Production & Content Creation'
            }
          ].map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5 + index * 0.1, duration: 0.8 }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.7 + index * 0.1, duration: 0.5 }}
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
                <p className="text-xs text-slate-500 mb-4 font-medium">{member.focus}</p>
              </div>
              
              <p className="text-slate-600 text-sm leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Our Approach */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="mb-16"
      >
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-8" style={{ color: '#045184' }}>
            Our Commitment to Excellence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#00A8E1' }}>
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
        className="text-center rounded-2xl p-12"
        style={{ backgroundColor: '#045184' }}
      >
        <h2 className="text-4xl font-bold text-white mb-6">Ready to Work with Our Team?</h2>
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
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:bg-blue-50 inline-flex items-center justify-center gap-2"
            style={{ color: '#045184' }}
          >
            Get Started Today
            <ArrowRight size={20} />
          </Link>
          <Link
            to="/advisory"
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 inline-flex items-center justify-center gap-2"
            style={{ borderColor: 'white' }}
            onMouseEnter={(e) => e.target.style.color = '#045184'}
            onMouseLeave={(e) => e.target.style.color = 'white'}
          >
            Learn About Our Services
            <Target size={20} />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  </motion.div>
);

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
      // Prepare the data payload
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        company: formData.company,
        interestArea: formData.interestArea,
        message: formData.message,
        timestamp: new Date().toISOString(),
        source: 'The Vanguard Network Contact Form'
      };

      console.log('Submitting form data:', payload);

      // Convert to form data for better Zapier compatibility
      const formDataToSend = new FormData();
      Object.keys(payload).forEach(key => {
        formDataToSend.append(key, payload[key]);
      });

      const response = await fetch('https://hooks.zapier.com/hooks/catch/18240047/umfuu73/', {
        method: 'POST',
        body: formDataToSend
      });

      console.log('Response status:', response.status);

      // Check if the response is ok (status 200-299)
      if (response.ok) {
        const responseData = await response.text();
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 
            className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(45deg, #7f30cb, #01dcba)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Contact Us
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your leadership? Get in touch with our team of experts and discover how The Vanguard Network can accelerate your executive journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#045184' }}>Send us a Message</h2>
            
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
                className="w-full text-white py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: isSubmitting ? '#6b7280' : '#00A8E1' }}
                onMouseEnter={(e) => !isSubmitting && (e.target.style.backgroundColor = '#0096C7')}
                onMouseLeave={(e) => !isSubmitting && (e.target.style.backgroundColor = '#00A8E1')}
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
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6" style={{ color: '#045184' }}>Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#00A8E1' }}>
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="font-medium" style={{ color: '#045184' }}>Email</p>
                    <p className="text-slate-600">contact@vanguardgroup.nyc</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#00A8E1' }}>
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="font-medium" style={{ color: '#045184' }}>Office</p>
                    <p className="text-slate-600">33 Irving Place<br />New York, NY 10003</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#00A8E1' }}>
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
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#00A8E1' }}>
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
            
            <div className="rounded-2xl p-8 shadow-lg" style={{ backgroundColor: '#045184' }}>
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
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 w-full bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-blue-50"
                style={{ color: '#045184' }}
              >
                Learn More About Our Services
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Leadership Team Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <h3 className="text-3xl font-bold text-center mb-8" style={{ color: '#045184' }}>Leadership Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
              <p className="text-slate-600 font-medium">Founder and CEO</p>
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
              <p className="text-slate-600 font-medium">Co-Founder and Chief Operating Officer</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Our Team Link Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="text-center bg-white rounded-3xl p-8 shadow-xl border border-slate-200"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Want to Learn More About Our Team?</h3>
          <p className="text-slate-600 mb-6 leading-relaxed max-w-2xl mx-auto">
            Meet our complete leadership team, advisory board, and the experienced professionals who make The Vanguard Network possible.
          </p>
          
          <motion.a
            href="/team"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2"
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 
          className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent"
          style={{
            backgroundImage: 'linear-gradient(45deg, #7f30cb, #01dcba)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Seeing Around Corners
        </h1>
        <p className="text-2xl font-semibold mb-4" style={{ color: '#00A8E1' }}>
          C-Suite Wisdom from America's Most Insightful Leaders
        </p>
        <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
          Exclusive, frank, and unfettered advice from legendary CEOs, innovative founders, and industry-shaping experts to help you navigate the most important management and leadership challenges of today.
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <div className="w-80 h-[500px] rounded-xl shadow-lg mx-auto lg:mx-0 mb-8 overflow-hidden bg-gray-100">
            <img
              src="/book-cover.jpg"
              alt="Seeing Around Corners Book Cover"
              className="w-full h-full object-cover"
            />
          </div>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://www.amazon.com/Seeing-Around-Corners-Americas-Insightful/dp/B0DVRGTDFY/ref=sr_1_1?crid=1UDTUUR939EFS&dib=eyJ2IjoiMSJ9.uUAnkAmvXkDTtplju1-ThXQ0DHyhnwLwFjWvT31MoLU.3z-zY1JbDLqiOwgPc_MyAB-R0brStxvJF9eIRL0VIGA&dib_tag=se&keywords=seeing+around+corners+ken+banta&qid=1739209893&sprefix=seeing+around+corners+ken+banta,aps,82&sr=8-1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 inline-flex items-center gap-2"
            style={{ backgroundColor: '#00A8E1' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#0096C7'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#00A8E1'}
          >
            Order on Amazon
            <ArrowRight size={20} />
          </motion.a>
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
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="text-center">
              <div className="w-48 h-48 rounded-full mx-auto mb-4 overflow-hidden">
                <img 
                  src="/ken-banta-headshot.jpg" 
                  alt="Ken Banta" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold" style={{ color: '#045184' }}>Ken Banta</h3>
              <p className="text-slate-600">Author & Leadership Expert</p>
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
        <h2 className="text-4xl font-bold text-center mb-12" style={{ color: '#045184' }}>
          What You'll Gain
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
        className="text-center rounded-2xl p-12"
        style={{ backgroundColor: '#045184' }}
      >
        <h2 className="text-4xl font-bold text-white mb-6">Ready to See Around Corners?</h2>
        <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
          Join thousands of executives who have transformed their leadership approach with insights from America's most successful business leaders.
        </p>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="https://www.amazon.com/Seeing-Around-Corners-Americas-Insightful/dp/B0DVRGTDFY/ref=sr_1_1?crid=1UDTUUR939EFS&dib=eyJ2IjoiMSJ9.uUAnkAmvXkDTtplju1-ThXQ0DHyhnwLwFjWvT31MoLU.3z-zY1JbDLqiOwgPc_MyAB-R0brStxvJF9eIRL0VIGA&dib_tag=se&keywords=seeing+around+corners+ken+banta&qid=1739209893&sprefix=seeing+around+corners+ken+banta,aps,82&sr=8-1"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:bg-blue-50 inline-flex items-center gap-2"
          style={{ color: '#045184' }}
        >
          Order Your Copy Today
          <ArrowRight size={20} />
        </motion.a>
      </motion.div>
    </div>
  </motion.div>
);

const ContentPage = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="pt-40 pb-12 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100"
  >
    {/* Hero Section */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent">
          CONTENT
        </h1>
        <p className="text-2xl text-slate-700 max-w-5xl mx-auto leading-relaxed font-medium">
          Discover our comprehensive collection of leadership insights through articles, podcasts, and videos created by Vanguard faculty, members, and associates.
        </p>
      </motion.div>
    </div>

    {/* Main Content */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Content Sections */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20"
      >
        {/* Articles Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="group bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-[#045184]/20 relative overflow-hidden flex flex-col h-full"
          whileHover={{ y: -8 }}
        >
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#045184]/5 to-[#00A8E1]/5 rounded-full transform translate-x-16 -translate-y-16"></div>
          
          <div className="relative z-10 flex flex-col h-full">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-r from-[#045184] to-[#0369a1] flex items-center justify-center mb-8 shadow-lg group-hover:shadow-xl transition-shadow duration-300"
            >
              <Newspaper size={40} className="text-white" />
            </motion.div>

            {/* Content */}
            <h2 className="text-3xl font-bold text-slate-900 mb-6 group-hover:text-[#045184] transition-colors duration-300">
              Articles
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg font-medium mb-8 flex-grow">
              Vanguard faculty, members, and associates create outstanding contributions to leadership learning–from how to work with a board, to knowing oneself as a leader.
            </p>

            {/* Button */}
            <motion.a
              href="https://members.thevanguardnetwork.com/articles"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group/btn inline-flex items-center gap-3 bg-gradient-to-r from-[#045184] to-[#0369a1] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden mt-auto"
            >
              <span className="relative z-10 flex items-center gap-3">
                Read Articles
                <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#0369a1] to-[#045184] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            </motion.a>
          </div>
        </motion.div>

        {/* Podcasts Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="group bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-[#00A8E1]/20 relative overflow-hidden flex flex-col h-full"
          whileHover={{ y: -8 }}
        >
          {/* Background Pattern */}
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#00A8E1]/5 to-[#0284c7]/5 rounded-full transform -translate-x-12 translate-y-12"></div>
          
          <div className="relative z-10 flex flex-col h-full">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-r from-[#00A8E1] to-[#0284c7] flex items-center justify-center mb-8 shadow-lg group-hover:shadow-xl transition-shadow duration-300"
            >
              <MessageCircle size={40} className="text-white" />
            </motion.div>

            {/* Content */}
            <h2 className="text-3xl font-bold text-slate-900 mb-6 group-hover:text-[#00A8E1] transition-colors duration-300">
              Podcasts
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg font-medium mb-8 flex-grow">
              Sometimes, voice is the best way to learn new ideas. Our podcasts bring alive important dialogues around leadership and transformation–all featuring proven leaders and leadership experts, talking about real-world challenges. Jump into one, and up your leadership game!
            </p>

            {/* Button */}
            <motion.a
              href="https://members.thevanguardnetwork.com/podcasts"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group/btn inline-flex items-center gap-3 bg-gradient-to-r from-[#00A8E1] to-[#0284c7] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden mt-auto"
            >
              <span className="relative z-10 flex items-center gap-3">
                Listen Now
                <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#0284c7] to-[#00A8E1] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            </motion.a>
          </div>
        </motion.div>

        {/* Videos Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="group bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-[#6366f1]/20 relative overflow-hidden flex flex-col h-full"
          whileHover={{ y: -8 }}
        >
          {/* Background Pattern */}
          <div className="absolute top-0 left-1/2 w-28 h-28 bg-gradient-to-bl from-[#6366f1]/5 to-[#8b5cf6]/5 rounded-full transform -translate-x-14 -translate-y-14"></div>
          
          <div className="relative z-10 flex flex-col h-full">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] flex items-center justify-center mb-8 shadow-lg group-hover:shadow-xl transition-shadow duration-300"
            >
              <Video size={40} className="text-white" />
            </motion.div>

            {/* Content */}
            <h2 className="text-3xl font-bold text-slate-900 mb-6 group-hover:text-[#6366f1] transition-colors duration-300">
              Videos
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg font-medium mb-8 flex-grow">
              At Vanguard, we work with top executives across sectors on building high-performance leadership for themselves, and in their teams. Our approach is real world, pragmatic, and outcome-focused. The following videos tell that story.
            </p>

            {/* Button */}
            <motion.a
              href="https://members.thevanguardnetwork.com/videos"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group/btn inline-flex items-center gap-3 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden mt-auto"
            >
              <span className="relative z-10 flex items-center gap-3">
                Watch Videos
                <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            </motion.a>
          </div>
        </motion.div>
      </motion.div>

      {/* Enhanced Call to Action */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="text-center rounded-3xl p-16 relative overflow-hidden"
        style={{ 
          background: 'linear-gradient(135deg, #045184 0%, #00A8E1 50%, #6366f1 100%)'
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-8 left-8 w-24 h-24 rounded-full bg-white/20"></div>
          <div className="absolute top-16 right-16 w-16 h-16 rounded-full bg-white/15"></div>
          <div className="absolute bottom-8 left-1/3 w-20 h-20 rounded-full bg-white/10"></div>
          <div className="absolute bottom-16 right-8 w-32 h-32 rounded-full bg-white/20"></div>
        </div>
        
        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.0, duration: 0.5 }}
            className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-8"
          >
            <BookOpen size={40} className="text-white" />
          </motion.div>
          
          <h2 className="text-5xl font-bold text-white mb-8 leading-tight">Explore All Our Content</h2>
          <p className="text-2xl text-white/90 mb-12 max-w-4xl mx-auto font-medium leading-relaxed">
            Dive deep into our comprehensive library of leadership resources and discover insights that will transform your leadership journey.
          </p>
          
          <div className="flex flex-col lg:flex-row gap-6 justify-center">
            <motion.a
              href="https://members.thevanguardnetwork.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-white text-[#045184] px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 shadow-lg hover:shadow-2xl relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Visit Members Portal
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-slate-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.a>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { label: "Articles Published", value: "150+", icon: <Newspaper size={24} /> },
              { label: "Podcast Episodes", value: "75+", icon: <MessageCircle size={24} /> },
              { label: "Video Resources", value: "50+", icon: <Video size={24} /> }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="text-center"
              >
                <div className="flex items-center justify-center mb-3 text-white/80">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/80 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </motion.div>
);

// NEW HOMEPAGE COMPONENTS BASED ON REFERENCE DESIGN - LIGHT THEME

// New Hero Section
const NewHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
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
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tight text-slate-900"
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
              className="text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              style={{ 
                background: 'linear-gradient(45deg, #7f30cb, #01dcba)'
              }}
            >
              Peer-to-Peer Networks
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/advisory"
              className="bg-transparent px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 relative"
              style={{ 
                color: '#045184',
                border: '3px solid transparent',
                backgroundImage: 'linear-gradient(white, white), linear-gradient(45deg, #7f30cb, #01dcba)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box'
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
    { number: "358", label: "Participating Companies" },
    { number: "1,995", label: "Top Leaders Engaged" },
    { number: "25 Years", label: "Leadership Expertise" }
  ];

  return (
    <section 
      className="py-16"
      style={{
        background: 'linear-gradient(45deg, rgba(127, 48, 203, 0.12), rgba(1, 220, 186, 0.12))'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
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
      </div>
    </section>
  );
};

// What We Do Section
// Original What Makes Us Different Section (5 boxes - for HomePage2)
const OriginalWhatWeDoSection = () => {
  const services = [
    {
      title: "Organizational Transformation",
      description: "Catalyzing change by transforming what your people believe, the way they work, and how they behave.",
      details: "We partner with senior executives to drive meaningful organizational change through leadership alignment, cultural transformation, and strategic execution.",
      image: "https://images.pexels.com/photos/2977565/pexels-photo-2977565.jpeg",
      link: "/advisory#organizational-transformation"
    },
    {
      title: "Coaching",
      description: "One-on-one coaching and confidential sounding boards for senior executives navigating complex decisions.",
      details: "Our executive coaching provides personalized guidance to help leaders enhance their effectiveness, navigate challenges, and achieve their professional goals.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
      link: "/advisory#strategic-counsel"
    },
    {
      title: "Client & Stakeholder Engagement",
      description: "Leadership Dialogues that transform supplier relationships into trusted advisor roles through relevant conversations.",
      details: "We help you engage meaningfully with your key stakeholders, building deeper relationships and positioning you as a strategic partner.",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf",
      link: "/advisory#client-and-stakeholder-engagement"
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
      link: "/programs-v2"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            What Makes Us Different
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We combine practical leadership development with authentic peer connections to drive real transformation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col h-full"
            >
              <div className="h-56 bg-cover bg-center" style={{ backgroundImage: `url('${service.image}')` }}>
                <div className="h-full bg-gradient-to-t from-black/40 to-transparent flex items-end p-6">
                  <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-slate-700 mb-4 leading-relaxed font-bold">
                  {service.description}
                </p>
                <p 
                  className="text-slate-600 text-sm mb-6 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: service.details }}
                ></p>
                
                <div className="mt-auto">
                  <Link
                    to={service.link}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                  >
                    Learn more
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Modified What Makes Us Different Section (3 boxes - for HomePage)
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
      link: "/programs-v2"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            What Makes Us Different
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Like you, we know that AI and new technologies are tools. The real differentiator is 'the human factor'. That's why we focus on people, whether in our peer-to-peer networks or supporting your business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
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

// About Section
const NewAboutSection = () => {
  return (
    <section 
      className="py-24"
      style={{
        background: 'linear-gradient(45deg, rgba(127, 48, 203, 0.12), rgba(1, 220, 186, 0.12))'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
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
          className="bg-white rounded-xl shadow-lg p-12 border border-gray-200 mb-8"
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
          className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
          className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-200"
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
              className="text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              style={{ 
                background: 'linear-gradient(45deg, #7f30cb, #01dcba)'
              }}
            >
              Apply to Join
            </Link>
            <a
              href="/networking"
              className="bg-transparent px-8 py-3 rounded-lg font-semibold transition-all duration-300"
              style={{ 
                color: '#045184',
                border: '3px solid transparent',
                backgroundImage: 'linear-gradient(white, white), linear-gradient(45deg, #7f30cb, #01dcba)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box'
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
const SubstackPostsSection = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSubstackPosts();
  }, []);

  const fetchSubstackPosts = async () => {
    try {
      setLoading(true);
      
      // Using a CORS proxy to fetch the RSS feed
      const proxyUrl = 'https://api.rss2json.com/v1/api.json?rss_url=';
      const rssUrl = 'https://kenbanta.substack.com/feed';
      const response = await fetch(proxyUrl + encodeURIComponent(rssUrl));
      
      if (!response.ok) {
        throw new Error('Failed to fetch Substack posts');
      }
      
      const data = await response.json();
      
      if (data.status === 'ok') {
        // Get only the latest 2 posts
        const latestPosts = data.items.slice(0, 2).map(item => ({
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          description: item.description,
          content: item.content,
          thumbnail: item.thumbnail || item.enclosure?.link || null
        }));
        setPosts(latestPosts);
      } else {
        throw new Error('RSS feed parsing failed');
      }
    } catch (err) {
      console.error('Error fetching Substack posts:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const stripHtmlTags = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  const getExcerpt = (content, maxLength = 200) => {
    const plainText = stripHtmlTags(content);
    return plainText.length > maxLength 
      ? plainText.substring(0, maxLength) + '...' 
      : plainText;
  };

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading latest insights...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return null; // Don't show error, just hide the section
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Latest Insights
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest leadership insights and strategic thinking from our Founder & CEO in their column Ken Banta on Leadership.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {posts.map((post, index) => (
            <motion.article
              key={post.link}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              {post.thumbnail && (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.thumbnail} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-8">
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                  <Calendar size={16} />
                  <span>{formatDate(post.pubDate)}</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium ml-2">
                    Substack
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors duration-200 leading-tight">
                  {post.title}
                </h3>
                
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {getExcerpt(post.description || post.content)}
                </p>
                
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                >
                  Read Full Article
                  <ArrowRight size={16} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://kenbanta.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            <ExternalLink size={20} />
            Visit Ken's Substack
          </a>
        </motion.div>
      </div>
    </section>
  );
};

// Specialized Executive Groups Section
const NewSpecializedGroupsSection = () => {
  const groups = [
    {
      type: "Virtual Exchange",
      title: "Risk Management Network",
      description: "A specialized peer exchange for senior managers overseeing enterprise risk functions.",
      features: [
        "Expert-led sessions with industry thought leaders",
        "Practical 'playbook' summaries for immediate implementation",
        "Cross-industry risk management best practices",
        "Confidential peer discussions on emerging threats"
      ],
      audience: "Senior Risk Managers & Chief Risk Officers"
    },
    {
      type: "Exclusive Network",
      title: "GC Exchange",
      description: "An exclusive peer network for General Counsels and senior legal leaders across global organizations.",
      features: [
        "Confidential, expert-facilitated sessions",
        "Strategic guidance on governance and compliance",
        "Risk mitigation strategies and frameworks",
        "Leadership development for legal functions"
      ],
      audience: "General Counsels & Senior Legal Leaders"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Specialized Executive Groups
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            The Network hosts targeted communities designed for specific leadership functions, providing focused expertise and peer connections in critical business areas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {groups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-6">
                <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
                  {group.type}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-4 mb-4">
                  {group.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {group.description}
                </p>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-bold text-slate-900 mb-3">Key Features:</h4>
                <ul className="space-y-2">
                  {group.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-slate-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                <h4 className="text-lg font-bold text-slate-900 mb-2">Target Audience:</h4>
                <p className="text-slate-600 font-medium">{group.audience}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16 bg-gray-50 rounded-xl p-8"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Join Your Specialized Community
          </h3>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Each specialized group fosters trust, candid conversation, and actionable insights tailored to the evolving challenges of modern leadership functions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/programs"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Explore Groups
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-slate-300 text-slate-700 hover:bg-slate-100 px-8 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Integration Announcement Section
const NewIntegrationSection = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
            Integration Announcement
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Integration with Global Counsel Leaders
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            On July 1, 2025, The Vanguard Network formally incorporated Global Counsel Leaders (GCL), bringing a global dimension to our leadership community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
              alt="Global business leaders collaboration"
              className="w-full rounded-xl shadow-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Global Leadership Excellence
            </h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Expanding our reach across 26+ countries to serve the world's most distinguished legal and business leaders.
            </p>
            
            <div className="mb-6 bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-4 text-sm text-slate-500 mb-2">
                <span className="font-medium">July 1, 2025</span>
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="font-medium text-green-600">Completed</span>
              </div>
              <h4 className="text-lg font-bold text-slate-900">Global Counsel Leaders Integration</h4>
            </div>

            <div>
              <h4 className="text-lg font-bold text-slate-900 mb-3">What This Means</h4>
              <p className="text-slate-600 mb-6 leading-relaxed">
                This integration welcomes experienced leaders from top-tier in-house legal and compliance functions across more than 26 countries, enriching our capability to deliver peer-driven leadership development at the highest level.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                  <h5 className="font-bold text-slate-900 mb-1">Global Reach</h5>
                  <p className="text-sm text-slate-600">Expanded presence across 26+ countries</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                  <h5 className="font-bold text-slate-900 mb-1">Expert Leadership</h5>
                  <p className="text-sm text-slate-600">Top-tier legal and compliance professionals</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                  <h5 className="font-bold text-slate-900 mb-1">Enhanced Capability</h5>
                  <p className="text-sm text-slate-600">Strengthened peer-driven development programs</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-lg p-8 border border-gray-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Meet Our Senior Global Advisor
              </h3>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1562935345-5080389daccd"
                  alt="E. Leigh Dance - Senior Global Advisor"
                  className="w-20 h-20 rounded-full object-cover shadow-lg"
                />
                <div>
                  <h4 className="text-xl font-bold text-slate-900">E. Leigh Dance</h4>
                  <p className="text-slate-600 font-medium">Senior Global Advisor</p>
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6">
                A recognized thought leader with 25 years of experience advising general counsel. Leigh's work has been featured in The Wall Street Journal, Financial Times, American Lawyer, and Legal Week.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-bold text-slate-900 mb-2">Featured Publications</h5>
                <ul className="space-y-1">
                  {["The Wall Street Journal", "Financial Times", "American Lawyer", "Legal Week"].map((publication) => (
                    <li key={publication} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-slate-600">{publication}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="text-center">
              <img
                src="https://images.unsplash.com/39/lIZrwvbeRuuzqOoWJUEn_Photoaday_CSD%20%281%20of%201%29-5.jpg"
                alt="Corporate network"
                className="w-full rounded-lg shadow-lg mb-6"
              />
              <h4 className="text-xl font-bold text-slate-900 mb-4">
                Experience Our Expanded Global Network
              </h4>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Discover how our integration with Global Counsel Leaders enhances leadership development opportunities for our global community.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/about"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Learn About GCL
                </Link>
                <Link
                  to="/contact"
                  className="bg-transparent border-2 border-slate-300 text-slate-700 hover:bg-slate-100 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                >
                  Contact Leigh Dance
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Original Content & Thought Leadership Section (for HomePage2)
const OriginalContentLibrarySection = () => {
  const [featuredInsights, setFeaturedInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  const contentTypes = [
    {
      title: "Articles",
      description: "In-depth analysis and thought leadership on organizational transformation and leadership excellence.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
      icon: <Newspaper size={32} />
    },
    {
      title: "Podcasts",
      description: "Conversations with industry leaders sharing insights on governance, strategy, and leadership development.",
      image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618",
      icon: <MessageCircle size={32} />
    },
    {
      title: "Videos",
      description: "Visual content featuring expert discussions and leadership development sessions from our community.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
      icon: <Video size={32} />
    }
  ];

  const fetchFeaturedInsights = async () => {
    try {
      setLoading(true);
      const backendUrl = import.meta.env?.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL;
      
      const [articlesResponse, podcastsResponse, videosResponse] = await Promise.all([
        fetch(`${backendUrl}/api/articles`),
        fetch(`${backendUrl}/api/podcasts`),
        fetch(`${backendUrl}/api/videos`)
      ]);

      const articles = await articlesResponse.json();
      const podcasts = await podcastsResponse.json();
      const videos = await videosResponse.json();

      const latestArticle = articles && articles.length > 0 ? articles[0] : null;
      const latestPodcast = podcasts && podcasts.length > 0 ? podcasts[0] : null;
      const latestVideo = videos && videos.length > 0 ? videos[0] : null;

      const insights = [];

      if (latestArticle) {
        insights.push({
          type: "Article",
          category: latestArticle.category || "Leadership",
          title: latestArticle.article_title || "Leadership Insight",
          description: latestArticle.article_excerpt || "Exploring key leadership principles.",
          author: latestArticle.author_name || "Vanguard Faculty",
          duration: `${latestArticle.estimated_reading_time || 5} min read`,
          image: latestArticle.featured_image || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
          link: `/article/${latestArticle.id}`
        });
      }

      if (latestPodcast) {
        insights.push({
          type: "Podcast",
          category: latestPodcast.category || "Leadership Dialogues",
          title: latestPodcast.podcast_title || "Leadership Conversation",
          description: latestPodcast.podcast_excerpt || "Insightful conversation with industry leaders.",
          author: latestPodcast.host_names || "Vanguard Host",
          duration: latestPodcast.duration || "45 min",
          image: latestPodcast.featured_image || "https://images.unsplash.com/photo-1478737270239-2f02b77fc618",
          link: `/podcast/${latestPodcast.id}`
        });
      }

      if (latestVideo) {
        insights.push({
          type: "Video",
          category: latestVideo.category || "Personal Awareness",
          title: latestVideo.video_description || "Leadership Development Video",
          description: latestVideo.description || "Understanding how leadership principles drive better strategic decisions.",
          author: latestVideo.featured_speakers || "Affiliate Contributor",
          duration: latestVideo.duration || "12 min watch",
          image: latestVideo.headshot || "https://images.unsplash.com/photo-1562935345-5080389daccd",
          link: `/video/${latestVideo.id}`
        });
      }

      setFeaturedInsights(insights);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching insights:', error);
      setFeaturedInsights([
        {
          type: "Article",
          category: "Leadership",
          title: "AI and Leadership Insight: Practical Tools to Unlock Your Potential",
          description: "Explore how artificial intelligence is transforming leadership development and decision-making.",
          author: "Ken Banta",
          duration: "8 min read",
          image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
          link: "/articles"
        },
        {
          type: "Podcast",
          category: "Leadership Excellence",
          title: "AI and Leadership Insight: Practical Tools to Unlock Your Potential",
          description: "Join us for an insightful conversation about navigating complex business environments.",
          author: "Vanguard Faculty",
          duration: "45 min",
          image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618",
          link: "/podcasts"
        },
        {
          type: "Video",
          category: "Organizational Excellence",
          title: "Personal Awareness in Executive Decision Making",
          description: "Understanding how leadership principles drive better strategic decisions.",
          author: "Expert Panel",
          duration: "12 min watch",
          image: "https://images.unsplash.com/photo-1562935345-5080389daccd",
          link: "/videos"
        }
      ]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedInsights();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Our Content & Thought Leadership
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Members gain access to a rich library featuring leadership insights from Vanguard faculty, members, and affiliate contributors spanning leadership development, board dynamics, and organizational transformation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contentTypes.map((type, index) => (
            <motion.div
              key={type.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200"
            >
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url('${type.image}')` }}>
                <div className="h-full bg-gradient-to-t from-black/40 to-transparent flex items-center justify-center">
                  <div className="text-white">{type.icon}</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {type.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {type.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Featured Insights
          </h3>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-slate-600">Loading insights...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredInsights.map((insight, index) => (
                <motion.div
                  key={insight.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col h-full"
                >
                  <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url('${insight.image}')` }}>
                    <div className="h-full bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <div className="text-white">
                        <span className="text-xs font-semibold uppercase tracking-wider bg-blue-600 px-2 py-1 rounded">
                          {insight.type}
                        </span>
                        <div className="mt-2 text-xs text-blue-200">
                          {insight.category}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex-grow">
                      <h4 className="text-lg font-bold text-slate-900 mb-3 leading-tight">
                        {insight.title}
                      </h4>
                      <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                        {insight.description}
                      </p>
                      <div className="flex justify-between items-center text-xs text-slate-500 mb-4">
                        <span>{insight.author}</span>
                        <span>{insight.duration}</span>
                      </div>
                    </div>
                    
                    <div className="mt-auto pt-4">
                      {insight.link ? (
                        <Link 
                          to={insight.link}
                          className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-center"
                        >
                          {insight.type === 'Article' ? 'Read more' : 
                           insight.type === 'Podcast' ? 'Listen to podcast' : 
                           insight.type === 'Video' ? 'Watch video' : 'Read More'}
                        </Link>
                      ) : (
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-xl shadow-lg p-12 text-center border border-gray-200"
        >
          <img
            src="https://images.unsplash.com/39/lIZrwvbeRuuzqOoWJUEn_Photoaday_CSD%20%281%20of%201%29-5.jpg"
            alt="Professional library"
            className="w-full max-w-md mx-auto rounded-lg shadow-lg mb-8"
          />
          
          <h3 className="text-3xl font-bold text-slate-900 mb-4">
            Access Our Complete Library
          </h3>
          <p className="text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            Unlock exclusive access to our comprehensive content library featuring the latest insights on leadership development, organizational transformation, and strategic excellence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/content"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Explore Library
            </Link>
            <Link
              to="/networking"
              className="bg-transparent border-2 border-slate-300 text-slate-700 hover:bg-slate-100 px-8 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              Member Login
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Content & Thought Leadership Section (Modified for HomePage)
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
      
      // Find the November 6 Substack post
      let substackPost = null;
      if (substackData.status === 'ok' && substackData.items) {
        substackPost = substackData.items.find(item => {
          const pubDate = new Date(item.pubDate);
          return pubDate.getMonth() === 10 && pubDate.getDate() === 6; // November is month 10
        }) || substackData.items[0]; // Fallback to latest if November 6 not found
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
          title: latestVideo.video_description || "Leadership Development Video",
          description: latestVideo.description || "Understanding how leadership principles drive better strategic decisions.",
          author: latestVideo.featured_speakers || "Affiliate Contributor",
          duration: latestVideo.duration || "12 min watch",
          image: latestVideo.headshot || "https://images.unsplash.com/photo-1562935345-5080389daccd",
          link: `/video/${latestVideo.id}`
        });
      }

      // Add Substack post from November 6
      if (substackPost) {
        // Extract description from content
        const stripHtmlTags = (html) => {
          const div = document.createElement('div');
          div.innerHTML = html;
          return div.textContent || div.innerText || '';
        };
        const description = stripHtmlTags(substackPost.description || substackPost.content);
        const excerpt = description.length > 150 ? description.substring(0, 150) + '...' : description;
        
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
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
            <div className="text-center py-12">
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
                    <div className="flex items-center justify-center text-blue-600 mb-2" style={{ height: '32px' }}>
                      {insight.type === 'Article' ? <Newspaper size={24} /> : 
                       insight.type === 'Podcast' ? <MessageCircle size={24} /> : 
                       insight.type === 'Video' ? <Video size={24} /> : 
                       <Newspaper size={24} />}
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
                    <div className="h-full bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                      <div className="text-white">
                        <span className="text-xs font-semibold uppercase tracking-wider bg-blue-600 px-2 py-1 rounded">
                          {insight.type}
                        </span>
                        <div className="mt-1 text-xs text-blue-200">
                          {insight.category}
                        </div>
                      </div>
                    </div>
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
                      <div className="flex justify-between items-center text-xs text-slate-500 mb-3">
                        <span>{insight.author}</span>
                        <span>{insight.duration}</span>
                      </div>
                    </div>
                    
                    {/* Button Area - always at bottom */}
                    <div className="mt-auto pt-3">
                      {insight.link ? (
                        insight.external ? (
                          <a 
                            href={insight.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-white py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-center"
                            style={{ background: 'linear-gradient(45deg, #7f30cb, #01dcba)' }}
                          >
                            {insight.type === 'Article' ? 'Read more' : 
                             insight.type === 'Podcast' ? 'Listen to podcast' : 
                             insight.type === 'Video' ? 'Watch video' : 
                             insight.type === 'Substack' ? 'Read on Substack' : 'Read More'}
                          </a>
                        ) : (
                          <Link 
                            to={insight.link}
                            className="block w-full text-white py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-center"
                            style={{ background: 'linear-gradient(45deg, #7f30cb, #01dcba)' }}
                          >
                            {insight.type === 'Article' ? 'Read more' : 
                             insight.type === 'Podcast' ? 'Listen to podcast' : 
                             insight.type === 'Video' ? 'Watch video' : 'Read More'}
                          </Link>
                        )
                      ) : (
                        <button 
                          className="w-full text-white py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                          style={{ background: 'linear-gradient(45deg, #7f30cb, #01dcba)' }}
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
const ExecutiveNetworksSection = () => {
  const networkBlocks = [
    {
      name: "Vanguard Leadership Network",
      description: "Our foundational network for all senior executives and board members. This inclusive network welcomes any senior leader seeking authentic peer connections and strategic insights across industries.",
      badge: "CORE NETWORK",
      icon: <Users size={40} />,
      gradient: 'from-[#6366f1] to-[#8b5cf6]',
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&q=90&auto=format&fit=crop",
      link: "/networking#core-network"
    },
    {
      name: "Specialized Networks",
      description: "Join role-specific networks designed for your leadership position: General Counsel Network, Senior In-House Counsel Network, Life Sciences CEO Network, and Risk Management Network.",
      badge: "4 NETWORKS",
      icon: <Network size={40} />,
      gradient: 'from-[#045184] to-[#00A8E1]',
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=90&auto=format&fit=crop",
      link: "/networking#specialized-networks"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Executive Networks
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Join our foundational leadership network, then choose from specialized networks designed for your specific role and industry.
          </p>
        </motion.div>

        {/* Networks Grid - 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto">
          {networkBlocks.map((network, index) => (
            <motion.div
              key={network.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link
                to={network.link}
                className="block bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-blue-400 group h-full"
              >
                {/* Clean image without overlays */}
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={network.image} 
                    alt={network.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Badge */}
                  <div className="absolute top-4 right-4">
                    <div className={`bg-gradient-to-r ${network.gradient} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg`}>
                      {network.badge}
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${network.gradient} flex items-center justify-center text-white shadow-md`}>
                      {network.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                      {network.name}
                    </h3>
                  </div>
                  
                  <p className="text-slate-600 leading-relaxed text-lg mb-6">
                    {network.description}
                  </p>
                  
                  <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors duration-300">
                    <span>Learn More</span>
                    <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-200"
        >
          <h3 className="text-3xl font-bold text-slate-900 mb-4">
            Ready to Connect?
          </h3>
          <p className="text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            Discover how our executive networks can help you connect with peers, share insights, and accelerate your leadership journey through authentic peer-to-peer exchanges.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/networking"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
            >
              View All Networks
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-slate-300 text-slate-700 hover:bg-slate-100 px-8 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              Request Information
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Leadership Advisory Section
const LeadershipAdvisorySection = () => {
  const advisoryServices = [
    {
      title: "Strategic Counsel",
      description: "One-on-one coaching and confidential strategic sounding board support for senior executives navigating complex decisions and leadership challenges.",
      icon: <Users size={32} />,
      gradient: 'from-[#045184] to-[#0369a1]',
      image: "https://images.pexels.com/photos/2977565/pexels-photo-2977565.jpeg?auto=compress&cs=tinysrgb&w=1200&h=750&dpr=2"
    },
    {
      title: "Organizational Transformation",
      description: "Transform what your people believe, the way they work, and how they behave. Grounded in decades of real-world experience with major organizations.",
      icon: <Target size={32} />,
      gradient: 'from-[#10b981] to-[#059669]',
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=90&auto=format&fit=crop"
    },
    {
      title: "Client and Stakeholder Engagement",
      description: "Leadership Dialogues that transform supplier relationships into trusted advisor roles through highly relevant conversations with clients and stakeholders.",
      icon: <Network size={32} />,
      gradient: 'from-[#00A8E1] to-[#0284c7]',
      image: "https://images.unsplash.com/photo-1564368587612-f303d38c9063?w=1200&q=90&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Leadership Advisory Services
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            We deliver three distinct types of advisory services designed to accelerate your leadership impact and drive organizational transformation through the human factor.
          </p>
        </motion.div>

        {/* Advisory Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {advisoryServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 group"
            >
              {/* Clean image without overlays */}
              <div className="h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${service.gradient} flex items-center justify-center text-white shadow-md`}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-xl shadow-lg p-12 text-center border border-gray-200"
        >
          <h3 className="text-3xl font-bold text-slate-900 mb-4">
            Transform Your Leadership Impact
          </h3>
          <p className="text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            Discover how our leadership advisory services can help you navigate complex challenges, drive organizational change, and achieve sustainable high-performance results.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/advisory"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
            >
              Explore Advisory Services
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-slate-300 text-slate-700 hover:bg-slate-100 px-8 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              Schedule Consultation
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Export all components
const Components = {
  Header,
  Hero,
  ServicesSection,
  TestimonnialSection,
  VideoTestimonial,
  ProgramsSection,
  Footer,
  AboutPage,
  AdvisoryPage,
  NetworkingPage,
  ProgramsPage,
  TeamPage,
  ContactPage,
  BookPage,
  ContentPage,
  NewHero,
  NewStatsSection,
  NewWhatWeDoSection,
  NewAboutSection,
  SubstackPostsSection,
  NewSpecializedGroupsSection,
  NewIntegrationSection,
  NewContentLibrarySection,
  OriginalContentLibrarySection,
  NewWhatWeDoSection,
  OriginalWhatWeDoSection,
  ExecutiveNetworksSection,
  LeadershipAdvisorySection,
  GCLBanner
};

export default Components;