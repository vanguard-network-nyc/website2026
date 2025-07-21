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
  Bot
} from 'lucide-react';

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
    { name: 'ADVISORY', path: '/advisory' },
    { name: 'NETWORKING', path: '/networking' },
    { name: 'PROGRAMS', path: '/programs' },
    { name: 'CONTENT', path: '/content' },
    { name: 'CONTACT', path: '/contact' },
    { name: 'BOOK', path: '/book' }
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg' : 'bg-slate-900'
      }`}
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
                    <button className="text-white hover:text-blue-400 font-medium transition-colors duration-200 relative group flex items-center">
                      {item.name}
                      <ChevronDown size={16} className="ml-1" />
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
                    </button>
                    {/* Dropdown content */}
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      {item.dropdown.map((subItem, subIndex) => (
                        <a
                          key={subItem.name}
                          href={subItem.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-3 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Regular link
                  <Link
                    to={item.path}
                    className="text-white hover:text-blue-400 font-medium transition-colors duration-200 relative group"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
                  </Link>
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
                        <a
                          key={subItem.name}
                          href={subItem.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-blue-300 hover:text-blue-100 py-1 pl-4 text-sm transition-colors duration-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </div>
                  ) : (
                    // Regular mobile link
                    <Link
                      to={item.path}
                      className="block text-white hover:text-blue-400 py-2 font-medium transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
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
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group text-white px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-2xl relative overflow-hidden"
              style={{ 
                background: 'linear-gradient(135deg, #00A8E1 0%, #0284c7 100%)'
              }}
            >
              <span className="relative z-10 flex items-center gap-3">
                LEARN MORE
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#0284c7] to-[#00A8E1] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/team"
                className="group bg-transparent border-3 border-white text-white hover:bg-white hover:text-[#045184] px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-2xl relative overflow-hidden outline outline-2 outline-[#00A8E1]"
              >
                <span className="flex items-center gap-3">
                  OUR TEAM
                  <Users size={24} className="group-hover:scale-110 transition-transform duration-300" />
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
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
                  className="relative w-full max-w-xs rounded-full shadow-2xl mx-auto border-4 border-white"
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
    <section className="py-24 bg-gradient-to-br from-[#045184]/10 via-slate-100 to-[#00A8E1]/10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-40 h-40 rounded-full bg-gradient-to-r from-[#00A8E1] to-[#0284c7]"></div>
        <div className="absolute bottom-20 left-20 w-28 h-28 rounded-full bg-gradient-to-r from-[#045184] to-[#0369a1]"></div>
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
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#045184]/20 to-[#00A8E1]/20 rounded-2xl"></div>
                  <video
                    poster="/ken-thumbnail.png"
                    controls={isPlaying}
                    onClick={() => setIsPlaying(true)}
                    className="w-full h-auto rounded-2xl cursor-pointer"
                  >
                    <source src="https://video.wixstatic.com/video/e6a994_384d4905f2a04605977d992f75273455/720p/mp4/file.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Play Button Overlay */}
                  {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-20 h-20 bg-gradient-to-r from-[#045184] to-[#00A8E1] rounded-full flex items-center justify-center shadow-2xl cursor-pointer"
                      >
                        <ChevronRight size={32} className="text-white ml-1" />
                      </motion.div>
                    </div>
                  )}
                </div>
                
                {/* Video Title */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="mt-6 text-center"
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
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#00A8E1] to-[#0284c7] flex items-center justify-center mb-6">
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
                <span className="bg-gradient-to-r from-[#00A8E1] to-[#0284c7] bg-clip-text text-transparent font-bold">
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
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#00A8E1] to-[#0284c7] rounded-full"></div>
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
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-white to-[#00A8E1] rounded-full"></div>
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
          
          {/* Program Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {[
              { label: "Program Duration", value: "6-12 Months", icon: <Users size={28} /> },
              { label: "Participants", value: "Select Groups", icon: <Target size={28} /> },
              { label: "Focus Area", value: "Leadership Challenges", icon: <Award size={28} /> }
            ].map((feature, index) => (
              <motion.div
                key={feature.label}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex items-center justify-center mb-4 text-white">
                  {feature.icon}
                </div>
                <div className="text-2xl font-bold text-white mb-2">{feature.value}</div>
                <div className="text-white/80 font-medium">{feature.label}</div>
              </motion.div>
            ))}
          </motion.div>
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
    { name: 'LinkedIn', path: '#' },
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
              <Link
                to={link.path}
                className="text-white/70 hover:text-blue-400 transition-colors duration-200 text-sm"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm mb-4 md:mb-0">
            © 2025 The Vanguard Network
          </p>
          
          <div className="flex items-center space-x-4">
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
    className="pt-32 pb-12 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
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

const AdvisoryPage = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="pt-32 pb-12 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100"
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
          LEADERSHIP ADVISORY & DEVELOPMENT
        </h1>
        <p className="text-2xl text-slate-700 max-w-5xl mx-auto leading-relaxed font-medium">
          Through its advisory work, The Vanguard Network (TVN) collaborates with senior and up-and-coming executives to effectively unlock their full potential as leaders through a real-world approach of one-to-one coaching and contextual business insights.
        </p>
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
              This work is based on decades of project experience working with top leadership on advisory and development assignments in large multinationals and global service firms and dozens of individual advisory engagements.
            </p>
            <p className="text-slate-600 leading-relaxed text-lg font-medium">
              TVN has a robust network of current and former CEOs and C-suite leaders who interface regularly with TVN CEO Ken Banta and his senior colleagues via face-to-face forums, virtual meetings, and webinars. This group of more than 200 CEOs and C-suite executives participates throughout the year in a robust series of catalyzing conversations.
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
              <p className="text-slate-600 font-medium text-lg">In our network participating in ongoing catalyzing conversations</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Three Approaches Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mb-20"
      >
        {/* Section Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#045184]/5 to-[#00A8E1]/5 rounded-3xl transform -skew-y-1"></div>
          <div className="relative py-12 px-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#045184] to-[#00A8E1] flex items-center justify-center mx-auto mb-6"
            >
              <Users size={32} className="text-white" />
            </motion.div>
            <h2 className="text-5xl font-bold text-slate-900 mb-6">
              Three Ways We Work With Executives
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium">
              Our comprehensive approach combines coaching, strategic guidance, and peer learning to accelerate leadership development.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: 'Coaching Relationship',
              description: 'Direct one-on-one coaching to develop leadership capabilities and effectiveness.',
              icon: <Target size={48} />,
              gradient: 'from-[#045184] to-[#0369a1]',
              bgGradient: 'from-[#045184]/5 to-[#0369a1]/5'
            },
            {
              title: 'Sounding Board',
              description: 'Strategic guidance and decision-making support for leadership challenges.',
              icon: <Users size={48} />,
              gradient: 'from-[#00A8E1] to-[#0284c7]',
              bgGradient: 'from-[#00A8E1]/5 to-[#0284c7]/5'
            },
            {
              title: 'Peer Learning',
              description: 'Collaborative learning experiences with other executives facing similar challenges.',
              icon: <Network size={48} />,
              gradient: 'from-[#6366f1] to-[#8b5cf6]',
              bgGradient: 'from-[#6366f1]/5 to-[#8b5cf6]/5'
            }
          ].map((approach, index) => (
            <motion.div
              key={approach.title}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.2, duration: 0.8 }}
              className="group bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-slate-200 relative overflow-hidden"
              whileHover={{ y: -8 }}
            >
              {/* Background Pattern */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${approach.bgGradient} rounded-full transform translate-x-16 -translate-y-16`}></div>
              
              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.2, duration: 0.5 }}
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${approach.gradient} flex items-center justify-center mb-8 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                >
                  <div className="text-white group-hover:scale-110 transition-transform duration-300">
                    {approach.icon}
                  </div>
                </motion.div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-6 group-hover:text-[#045184] transition-colors duration-300">
                  {approach.title}
                </h3>
                <p className="text-slate-600 leading-relaxed font-medium text-lg">
                  {approach.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Detailed Services */}
      <div className="space-y-12">
        
        {/* Coaching Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-lg"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-6">COACHING</h2>
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
              <h3 className="text-2xl font-bold text-white mb-4">Key Focus Areas</h3>
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

        {/* Sounding Board Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-lg"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-xl p-8" style={{ backgroundColor: '#00A8E1' }}>
              <h3 className="text-2xl font-bold text-white mb-4">Perfect For</h3>
              <ul className="space-y-3 text-white">
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-white mr-3"></div>
                  Senior leaders in organizations
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-white mr-3"></div>
                  Team leaders and their direct reports
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-white mr-3"></div>
                  CEOs and C-suite executives
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">SOUNDING BOARD</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                This approach is typically most appropriate for the senior leader in the organization or team and their direct reports.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                TVN's Ken Banta and Richard Hulme have decades of experience supporting CEOs and C-suite executives and their reports as they work through specific challenges and develop strategy and execution plans for themselves and their teams.
              </p>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Example Topics:</h3>
              <ul className="space-y-2 text-slate-600">
                <li>• Reinventing the leadership team and roles of direct reports</li>
                <li>• Self-assessment and reflection on leadership strengths</li>
                <li>• Developing insights around Board relations and stakeholder management</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Next Generation Leader Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="rounded-2xl p-8 md:p-12 shadow-lg"
          style={{ backgroundColor: '#045184' }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-6">NEXT GENERATION LEADER</h2>
            <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              "What got you here won't get you there."
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-white/90 leading-relaxed mb-6">
                Based on our top leadership work, our C-suite members asked us to develop a curriculum geared towards helping high-potentials move from "next level" roles into a C-suite or Partner position.
              </p>
              <p className="text-white/90 leading-relaxed mb-6">
                All the technical and managerial competencies that drive success at other levels are insufficient at the higher organizational levels, which rely on indirect influence and insightful decision-making.
              </p>
              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Program Features</h3>
                <ul className="space-y-3 text-white/90">
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00A8E1' }}></div>
                    Six-month modular program
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00A8E1' }}></div>
                    Face-to-face and virtual elements
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00A8E1' }}></div>
                    Runs concurrently with full-time jobs
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00A8E1' }}></div>
                    Customized to role or organization
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Module Topics</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: '#00A8E1' }}>
                    <span className="text-white font-semibold">1</span>
                  </div>
                  <span className="text-white/90">Developing personal EQ</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: '#00A8E1' }}>
                    <span className="text-white font-semibold">2</span>
                  </div>
                  <span className="text-white/90">Leading by influence</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: '#00A8E1' }}>
                    <span className="text-white font-semibold">3</span>
                  </div>
                  <span className="text-white/90">Working with a CEO</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: '#00A8E1' }}>
                    <span className="text-white font-semibold">4</span>
                  </div>
                  <span className="text-white/90">Interactive conversations with C-suite executives</span>
                </div>
              </div>
            </div>
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
                  style={{ objectPosition: 'center 30%' }}
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

const NetworkingPage = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="pt-32 pb-12 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100"
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
              icon: <Shield size={32} />
            },
            {
              name: "Senior In-House Counsel Network",
              description: "For Deputy GC and Associate GC",
              target: "Deputy GC & Associate GC",
              icon: <BookOpen size={32} />
            },
            {
              name: "Life Sciences CEO Network",
              description: "For CEOs in the life sciences community",
              target: "Life Sciences CEOs",
              icon: <Award size={32} />
            },
            {
              name: "Risk Management Network",
              description: "For senior executives who lead risk-related functions",
              target: "Risk Management Leaders",
              icon: <Target size={32} />
            },
            {
              name: "Associate Membership",
              description: "Join as an associate member",
              target: "Associate Members",
              icon: <Users size={32} />
            }
          ].map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0 + index * 0.1, duration: 0.8 }}
              className="bg-white/10 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 cursor-pointer"
            >
              <div className="text-center">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#00A8E1' }}>
                  <div className="text-white">{plan.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-sm font-semibold mb-3" style={{ color: '#00A8E1' }}>{plan.target}</p>
                <p className="text-white/90 text-sm leading-relaxed">{plan.description}</p>
                <button className="mt-4 bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white/30 transition-colors">
                  Learn More
                </button>
              </div>
            </motion.div>
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

const ProgramsPage = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="pt-32 pb-12 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100"
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
          LEADERSHIP PROGRAMS
        </h1>
        <p className="text-2xl text-slate-700 max-w-5xl mx-auto leading-relaxed font-medium">
          Comprehensive development programs designed to accelerate leadership growth at every level through specialized exchanges and customized curricula.
        </p>
      </motion.div>
    </div>

    {/* Main Content */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Current Leadership Programs Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mb-24"
      >
        {/* Section Header with Gradient Background */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#045184]/5 to-[#00A8E1]/5 rounded-3xl transform -skew-y-1"></div>
          <div className="relative py-16 px-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#045184] to-[#00A8E1] flex items-center justify-center">
                <Award size={24} className="text-white" />
              </div>
              <span className="px-4 py-2 bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white text-sm font-bold rounded-full tracking-wider">
                ONGOING PROGRAMS
              </span>
            </div>
            <h2 className="text-5xl font-bold text-slate-900 mb-8 leading-tight">Current Leadership Programs</h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto font-medium leading-relaxed">
              Ongoing programs designed for specific leadership roles and industries, featuring regular exchanges and development opportunities.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {[
            {
              name: "GC EXCHANGE",
              description: "A highly pragmatic leadership problem-solving group that meets monthly, moderated by Vanguard. Monthly, in virtual format; face-to-face sessions occur at our bi-annual Forums.",
              format: "Monthly Virtual + Bi-annual In-Person",
              audience: "General Counsel",
              icon: <Shield size={28} />,
              category: "Legal",
              level: "Executive",
              status: "Active",
              image: "/gc-exchange-program.jpg"
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
              image: "/senior-counsel-exchange-program.jpg"
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
              image: "/life-sciences-ceo-program.jpg"
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
              image: "/next-generation-gc-program.jpg"
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
              image: "/new-leaders-program.jpg"
            }
          ].map((program, index) => (
            <motion.div
              key={program.name}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.8 }}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col h-full border-2 border-transparent hover:border-[#00A8E1]/20 relative overflow-hidden"
              whileHover={{ scale: 1.02, y: -8 }}
            >
              {/* Program Image */}
              <div className="relative h-64 overflow-hidden rounded-t-2xl">
                <img
                  src={program.image}
                  alt={program.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full backdrop-blur-sm ${
                    program.status === 'Active' 
                      ? 'bg-green-500/90 text-white' 
                      : 'bg-blue-500/90 text-white'
                  }`}>
                    {program.status}
                  </span>
                </div>

                {/* Program Icon Overlay */}
                <div className="absolute bottom-4 left-4">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                    className="w-16 h-16 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm group-hover:shadow-xl transition-all duration-300" 
                    style={{ 
                      background: program.category === 'Legal' 
                        ? 'rgba(4, 81, 132, 0.9)'
                        : program.category === 'Life Sciences'
                        ? 'rgba(0, 168, 225, 0.9)'
                        : 'rgba(99, 102, 241, 0.9)'
                    }}
                  >
                    <div className="text-white group-hover:scale-110 transition-transform duration-300">{program.icon}</div>
                  </motion.div>
                </div>
              </div>

              {/* Program Content */}
              <div className="p-8 flex-1 flex flex-col">
                {/* Program Header */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#045184] transition-colors duration-300">{program.name}</h3>
                  <p className="text-sm font-bold mb-2" style={{ color: '#045184' }}>{program.audience}</p>
                  <div className="flex items-center justify-start gap-4 text-xs text-slate-500 mb-4">
                    <span className="bg-slate-100 px-3 py-1 rounded-full">{program.category}</span>
                    <span className="bg-slate-100 px-3 py-1 rounded-full">{program.level}</span>
                  </div>
                  <p className="text-sm text-slate-600 font-medium bg-slate-50 px-4 py-2 rounded-lg">{program.format}</p>
                </div>

                {/* Program Description */}
                <div className="flex-grow mb-8">
                  <p className="text-slate-600 leading-relaxed font-medium">{program.description}</p>
                </div>

                {/* Action Button */}
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group/btn w-full text-white px-6 py-4 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-xl mt-auto relative overflow-hidden"
                  style={{ 
                    background: 'linear-gradient(135deg, #045184 0%, #00A8E1 100%)',
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Learn More
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00A8E1] to-[#045184] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
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

const TeamPage = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="pt-32 pb-12 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: '#045184' }}>
          OUR TEAM
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
              bio: 'Ken sets the overall direction of The Vanguard Network (TVN) and how it operates to benefit members and clients. He launched TVN in 2014, and nurtured its growth from periodic meetings of healthcare leaders to today\'s organization supporting multiple networks of C-suite leaders. Ken graduated from Amherst College and attended Oxford University as a Rhodes Scholar.',
              focus: 'Strategic Leadership & Organizational Development'
            },
            {
              name: 'Tony Powe',
              role: 'Co-Founder & COO',
              image: '/tony-powe-team.jpg',
              bio: 'Tony leads operations, member services, and partner relations. He has 30+ years of experience heading up operations and customer relations in eleven for- and non-profit organizations on three continents, many of them startups, and 6 of them as owner/founder.',
              focus: 'Operations & Member Services'
            },
            {
              name: 'Richard Hulme',
              role: 'Managing Director',
              image: '/richard-hulme-new.jpg',
              bio: 'Richard is responsible for providing strategic direction for Vanguard\'s service offerings with a focus on high-quality execution and client satisfaction. During his 25+ years in strategy consulting, practice operations, and organizational effectiveness, he has worked as a chief-of-staff for the PwC Board chair.',
              focus: 'Strategic Direction & Client Success'
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
              name: 'Garrick Isert',
              role: 'Vice Principal, Executive Leadership Programs',
              image: '/garrick-isert-new.jpg',
              bio: 'Garrick is responsible for leading and facilitating programs for General Counsels and their teams with a focus on lawyers as leaders. He has over 20 years of experience in corporate, management consulting, peer networks, executive coaching and leadership development.',
              focus: 'Executive Leadership Programs'
            },
            {
              name: 'Dick Mosher',
              role: 'Senior Advisor',
              image: '/dick-mosher-team.jpg',
              bio: 'Dick leverages five decades of corporate and legal experience to provide valuable insights as an advisor to Vanguard\'s members and clients. He has worked as a Chief Legal Officer (CLO), General Counsel (GC), or Associate General Counsel (AGC) for public and private corporations.',
              focus: 'Strategic Advisory & Corporate Leadership'
            },
            {
              name: 'Hope Novak',
              role: 'Executive Operations & Events Lead',
              image: '/hope-novak-team.jpg',
              bio: 'Hope is responsible for providing high-level administrative support to our CEO Ken Banta. She is also responsible for overseeing and planning events, driving new business, and strengthening Vanguard\'s unique culture.',
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
                      objectPosition: member.image.includes('aileen') ? 'center 30%' : 'center'
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
              bio: 'Jamie is responsible for the overall quality and direction of Vanguard content, including blog posts, interviews, and newsletters. He has over 25 years experience in media, having held senior editorial posts at NewsCorp, Time Inc., Microsoft and Condé Nast.',
              focus: 'Content Strategy & Editorial Direction'
            },
            {
              name: 'Connor Payne',
              role: 'Manager, Operations',
              image: '/connor-payne.jpg',
              bio: 'Connor is responsible for project management for Vanguard\'s wide array of events. He also directly assists the COO, Tony, with various internal initiatives. With 8 years of experience in consulting, sales, and startups, Connor has a proven track record of delivering value.',
              focus: 'Project Management & Operations'
            },
            {
              name: 'Ken Stone',
              role: 'Media Director',
              image: '/ken-stone-team.jpg',
              bio: 'Ken is responsible for creating videos and podcasts from Vanguard events and also moderates Forums and other meetings. He spent 20 years in radio and television newsrooms, then taught full-time at the University of Minnesota for 7 years.',
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

const ContactPage = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="pt-32 pb-12 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
  >
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold mb-6" style={{ color: '#045184' }}>Contact Us</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Ready to transform your leadership? Get in touch with our team of experts and discover how The Vanguard Network can accelerate your executive journey.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#045184' }}>Send us a Message</h2>
          <form className="space-y-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <label className="block font-medium mb-2" style={{ color: '#045184' }}>Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg transition-colors duration-200"
                style={{ 
                  focusRingColor: '#00A8E1',
                  focusBorderColor: '#00A8E1'
                }}
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
              <label className="block font-medium mb-2" style={{ color: '#045184' }}>Email</label>
              <input
                type="email"
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
              <label className="block font-medium mb-2" style={{ color: '#045184' }}>Message</label>
              <textarea
                rows="4"
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full text-white py-3 rounded-lg font-semibold transition-all duration-200"
              style={{ backgroundColor: '#00A8E1' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#0096C7'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#00A8E1'}
            >
              Send Message
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
                  <p className="text-slate-600">info@thevanguardnetwork.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#00A8E1' }}>
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <p className="font-medium" style={{ color: '#045184' }}>Phone</p>
                  <p className="text-slate-600">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#00A8E1' }}>
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <p className="font-medium" style={{ color: '#045184' }}>Office</p>
                  <p className="text-slate-600">New York, NY</p>
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
    </div>
  </motion.div>
);

const BookPage = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="pt-32 pb-12 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
  >
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: '#045184' }}>
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
    className="pt-32 pb-12 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100"
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
  ContentPage
};

export default Components;