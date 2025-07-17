import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ChevronRight, 
  Play, 
  Users, 
  Target, 
  BookOpen, 
  Award,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Star
} from 'lucide-react';

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
              >
                <Link
                  to={item.path}
                  className="text-white hover:text-blue-400 font-medium transition-colors duration-200 relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
                </Link>
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
                  <Link
                    to={item.path}
                    className="block text-white hover:text-blue-400 py-2 font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
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
      {/* Background Video with Fallback */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/hero-video-fallback.png"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          {/* Fallback image for browsers that don't support video */}
          <img
            src="/hero-video-fallback.png"
            alt="Hero background fallback"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: -1 }}
          />
        </video>
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-blue-900/60"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-12 max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            WHAT WE DO
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto"
          >
            The Vanguard Network helps current and future senior leaders transform themselves 
            and their organizations by{' '}
            <span className="font-semibold" style={{ color: '#00A8E1' }}>unlocking high-performance leadership</span>.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0, 168, 225, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-2"
              style={{ backgroundColor: '#00A8E1' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#0096C7'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#00A8E1'}
            >
              LEARN MORE
              <ArrowRight size={20} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(255, 255, 255, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              OUR TEAM
              <Users size={20} />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
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
      image: '/advisory-image.jpg'
    },
    {
      title: 'NETWORKING',
      description: 'The Vanguard community is a by-invitation network for senior leaders. Become a member to fine-tune your leadership, and build new relationships, to keep growing, to keep thriving. Join the community for top leadership discussions, networking, rich content and customized resources.',
      buttonText: 'Become a Member',
      icon: <Users size={48} />,
      image: '/networking-image.jpg'
    },
    {
      title: 'NEW BOOK',
      description: 'Seeing Around Corners - A comprehensive guide to developing strategic foresight and anticipating change in today\'s rapidly evolving business landscape. Learn the essential skills every leader needs to navigate uncertainty and drive organizational success.',
      buttonText: 'More Info & Order',
      icon: <BookOpen size={48} />,
      image: '/newbook-image.jpg'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group flex flex-col h-full"
            >
              <div 
                className="h-80 bg-cover bg-center relative"
                style={{ backgroundImage: `url('${service.image}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  {service.icon}
                </div>
              </div>
              
              <div className="p-6 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 -mt-6"
                  style={{ backgroundColor: '#00A8E1' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#0096C7'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#00A8E1'}
                >
                  {service.buttonText}
                  <ChevronRight size={16} />
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
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center gap-12"
        >
          <div className="md:w-1/3">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src="https://static.wixstatic.com/media/e6a994_ab92d0708e7a4a32bd495d6b1b85b08e~mv2.png/v1/crop/x_0,y_79,w_642,h_642/fill/w_242,h_242,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Tom%20Sabatino.png"
              alt="Tom Sabatino"
              className="w-full max-w-xs rounded-full shadow-lg mx-auto"
            />
          </div>
          
          <div className="md:w-2/3">
            <motion.blockquote
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-light text-slate-700 italic mb-6 leading-relaxed"
            >
              "One quality sets apart successful companies and successful executives: high-performance leadership. 
              Developing great leaders, and supporting their work, is where the Vanguard team really excels."
            </motion.blockquote>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-bold text-slate-900 mb-1">Tom Sabatino</h4>
              <p className="text-slate-600">
                Former Chief Legal Officer, Best Buy<br />
                and Co., Transact, Aimia, AARP, Brightpoint, United Airlines, Schwing Rough
              </p>
            </motion.div>
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
    <section className="py-20 bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center gap-12"
        >
          <div className="md:w-1/2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative rounded-xl overflow-hidden shadow-2xl"
            >
              <video
                preload="none"
                playsInline
                controls
                poster="/ken-thumbnail.png"
                className="w-full h-80 object-cover"
              >
                <source src="https://video.wixstatic.com/video/e6a994_384d4905f2a04605977d992f75273455/720p/mp4/file.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </div>
          
          <div className="md:w-1/2">
            <motion.blockquote
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-light text-slate-700 italic mb-6 leading-relaxed"
            >
              "Our sole focus is unlocking high-performance leadership, so that's why we don't take the cookie-cutter approach."
            </motion.blockquote>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-bold text-slate-900 mb-1">Ken Banta</h4>
              <p className="text-slate-600">Founder & CEO, The Vanguard Network</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Programs Section
const ProgramsSection = () => {
  return (
    <section className="py-20" style={{ backgroundColor: '#045184' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-block bg-white/10 px-4 py-2 rounded-full mb-6">
            <span className="text-white/80 font-semibold tracking-wider">PROGRAMS</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
            The <span style={{ color: '#00A8E1' }}>New Leaders Program</span><br />
            introduces critical leadership<br />
            challenges to select groups of<br />
            high-performance aspiring<br />
            leaders.
          </h2>
          
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(255, 255, 255, 0.2)' }}
            whileTap={{ scale: 0.95 }}
            className="text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center gap-2 mx-auto"
            style={{ backgroundColor: '#00A8E1' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#0096C7'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#00A8E1'}
          >
            LEARN MORE
            <ArrowRight size={20} />
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
    className="pt-32 pb-12 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
  >
    {/* Hero Section */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: '#045184' }}>
          LEADERSHIP ADVISORY & DEVELOPMENT
        </h1>
        <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
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
        className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Real-World Leadership Development
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              This work is based on decades of project experience working with top leadership on advisory and development assignments in large multinationals and global service firms and dozens of individual advisory engagements.
            </p>
            <p className="text-slate-600 leading-relaxed">
              TVN has a robust network of current and former CEOs and C-suite leaders who interface regularly with TVN CEO Ken Banta and his senior colleagues via face-to-face forums, virtual meetings, and webinars. This group of more than 200 CEOs and C-suite executives participates throughout the year in a robust series of catalyzing conversations.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-slate-100 rounded-xl p-8">
            <div className="text-center">
              <div className="text-6xl font-bold mb-4" style={{ color: '#00A8E1' }}>200+</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">CEOs & C-Suite Executives</h3>
              <p className="text-slate-600">In our network participating in ongoing catalyzing conversations</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Three Approaches Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mb-16"
      >
        <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">
          Three Ways We Work With Executives
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Coaching Relationship',
              description: 'Direct one-on-one coaching to develop leadership capabilities and effectiveness.',
              icon: <Target size={48} />
            },
            {
              title: 'Sounding Board',
              description: 'Strategic guidance and decision-making support for leadership challenges.',
              icon: <Users size={48} />
            },
            {
              title: 'Next Generation Leader',
              description: 'Specialized curriculum designed to develop high potentials for C-suite roles.',
              icon: <Award size={48} />
            }
          ].map((approach, index) => (
            <motion.div
              key={approach.title}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.2, duration: 0.8 }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-6" style={{ color: '#00A8E1' }}>{approach.icon}</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{approach.title}</h3>
              <p className="text-slate-600 leading-relaxed">{approach.description}</p>
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
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">COACHING</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                We work with leaders on specific development goals to help them be more effective decision-makers and developers of their people. This can include exploring additional personal or professional growth areas, creating and implementing organizational strategies for incremental improvement, and contributing to enterprise transformational change.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We also help leaders similarly with their teams, developing high performance and overcoming barriers. This work can include customized training and development programs, building effective working cultures, and carrying out talent assessments and development plans.
              </p>
            </div>
            <div className="rounded-xl p-8" style={{ backgroundColor: '#045184' }}>
              <h3 className="text-2xl font-bold text-white mb-4">Key Focus Areas</h3>
              <ul className="space-y-3 text-white">
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00A8E1' }}></div>
                  Effective decision-making
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00A8E1' }}></div>
                  People development
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00A8E1' }}></div>
                  Organizational strategy
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00A8E1' }}></div>
                  Transformational change
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00A8E1' }}></div>
                  Team development
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Sounding Board Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
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
              <div className="w-48 h-48 rounded-full mx-auto mb-6 bg-gradient-to-br from-blue-100 to-slate-200 flex items-center justify-center">
                <div className="text-6xl font-bold" style={{ color: '#045184' }}>KB</div>
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
              <div className="w-48 h-48 rounded-full mx-auto mb-6 bg-gradient-to-br from-blue-100 to-slate-200 flex items-center justify-center">
                <div className="text-6xl font-bold" style={{ color: '#045184' }}>RH</div>
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
              <div className="w-48 h-48 rounded-full mx-auto mb-6 bg-gradient-to-br from-blue-100 to-slate-200 flex items-center justify-center">
                <div className="text-6xl font-bold" style={{ color: '#045184' }}>GI</div>
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
              <div className="w-48 h-48 rounded-full mx-auto mb-6 bg-gradient-to-br from-blue-100 to-slate-200 flex items-center justify-center">
                <div className="text-6xl font-bold" style={{ color: '#045184' }}>AG</div>
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
    className="pt-32 pb-12 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
  >
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-slate-900 mb-6">Exclusive Network</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Join an elite community of senior leaders committed to excellence and continuous growth
        </p>
      </motion.div>

      <div className="bg-white rounded-2xl p-12 shadow-lg mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Member Benefits</h2>
            <ul className="space-y-4">
              {[
                'Exclusive access to senior executive events',
                'Peer-to-peer learning opportunities',
                'Industry insights and trend analysis',
                'Customized leadership resources',
                'One-on-one mentoring sessions',
                'Strategic networking connections'
              ].map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  className="flex items-center gap-3 text-slate-600"
                >
                  <Star className="text-blue-600 fill-current" size={16} />
                  {benefit}
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <img
              src="https://images.pexels.com/photos/5475750/pexels-photo-5475750.jpeg"
              alt="Networking"
              className="w-full rounded-xl shadow-lg"
            />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="text-center"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 inline-flex items-center gap-2"
          style={{ backgroundColor: '#00A8E1' }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#0096C7'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#00A8E1'}
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
    className="pt-32 pb-12 min-h-screen bg-gradient-to-br from-blue-50 to-slate-100"
  >
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-slate-900 mb-6">Leadership Programs</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Comprehensive development programs designed to accelerate leadership growth at every level
        </p>
      </motion.div>

      <div className="space-y-12">
        {[
          {
            title: 'New Leaders Program',
            description: 'An intensive program for high-potential emerging leaders, focusing on critical leadership challenges and real-world application.',
            features: ['12-week intensive curriculum', 'Peer-to-peer learning', 'Executive mentorship', 'Leadership assessments'],
            image: 'https://images.unsplash.com/photo-1573496130103-a442a3754d0e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwzfHxsZWFkZXJzaGlwJTIwZGV2ZWxvcG1lbnR8ZW58MHx8fGJsdWV8MTc1MDgzOTA3Nnww&ixlib=rb-4.1.0&q=85'
          },
          {
            title: 'Next Generation C-Suite',
            description: 'Preparing future executives for the challenges of C-level leadership through customized modules and strategic planning.',
            features: ['Executive presence training', 'Strategic decision making', 'Crisis leadership', 'Board interaction skills'],
            image: 'https://images.pexels.com/photos/7616608/pexels-photo-7616608.jpeg'
          }
        ].map((program, index) => (
          <motion.div
            key={program.title}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.3, duration: 0.8 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-8">
                <h3 className="text-3xl font-bold text-slate-900 mb-4">{program.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{program.description}</p>
                <ul className="space-y-2 mb-6">
                  {program.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3 text-slate-600">
                      <Star className="text-blue-600 fill-current" size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 inline-flex items-center gap-2"
                  style={{ backgroundColor: '#00A8E1' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#0096C7'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#00A8E1'}
                >
                  Learn More
                  <ArrowRight size={16} />
                </motion.button>
              </div>
              <div className="lg:p-8">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-64 lg:h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
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
        <h1 className="text-5xl font-bold text-slate-900 mb-6">Contact Us</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Ready to transform your leadership? Get in touch with our team of experts.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-slate-700 font-medium mb-2">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-medium mb-2">Company</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="Enter your company"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-medium mb-2">Message</label>
              <textarea
                rows="4"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="Tell us about your leadership development needs"
              ></textarea>
            </div>
            <motion.button
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
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Mail className="text-blue-600" size={24} />
                <div>
                  <p className="font-medium text-slate-900">Email</p>
                  <p className="text-slate-600">info@thevanguardnetwork.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="text-blue-600" size={24} />
                <div>
                  <p className="font-medium text-slate-900">Phone</p>
                  <p className="text-slate-600">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="text-blue-600" size={24} />
                <div>
                  <p className="font-medium text-slate-900">Office</p>
                  <p className="text-slate-600">New York, NY</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Connect With Us</h3>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="text-white p-3 rounded-lg transition-colors duration-200"
                style={{ backgroundColor: '#00A8E1' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#0096C7'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#00A8E1'}
              >
                <Mail size={24} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="text-white p-3 rounded-lg transition-colors duration-200"
                style={{ backgroundColor: '#00A8E1' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#0096C7'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#00A8E1'}
              >
                <Phone size={24} />
              </motion.a>
            </div>
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
    className="pt-32 pb-12 min-h-screen bg-gradient-to-br from-blue-50 to-slate-100"
  >
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-slate-900 mb-6">Seeing Around Corners</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          A comprehensive guide to developing strategic foresight in an uncertain world
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <img
            src="https://images.pexels.com/photos/7616608/pexels-photo-7616608.jpeg"
            alt="Seeing Around Corners Book Cover"
            className="w-80 h-96 object-cover rounded-xl shadow-lg mx-auto lg:mx-0 mb-8"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 inline-flex items-center gap-2"
            style={{ backgroundColor: '#00A8E1' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#0096C7'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#00A8E1'}
          >
            Order Now
            <ArrowRight size={20} />
          </motion.button>
        </motion.div>
        
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-6">About the Book</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            In today's rapidly changing business landscape, the ability to anticipate and prepare for future challenges 
            is more critical than ever. "Seeing Around Corners" provides leaders with practical frameworks and tools 
            to develop strategic foresight and navigate uncertainty with confidence.
          </p>
          
          <h3 className="text-2xl font-bold text-slate-900 mb-4">What You'll Learn</h3>
          <ul className="space-y-3 mb-8">
            {[
              'How to identify early warning signals of change',
              'Frameworks for strategic scenario planning',
              'Building organizational resilience',
              'Leading through uncertainty and ambiguity',
              'Creating adaptive leadership cultures'
            ].map((item, index) => (
              <motion.li
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                className="flex items-center gap-3 text-slate-600"
              >
                <Star className="text-blue-600 fill-current" size={16} />
                {item}
              </motion.li>
            ))}
          </ul>
          
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className="font-bold text-slate-900 mb-2">Featured Review</h4>
            <p className="text-slate-600 italic">
              "An essential read for any leader navigating today's complex business environment. 
              The insights are practical, actionable, and immediately applicable."
            </p>
            <p className="text-slate-500 text-sm mt-2">- Business Leadership Review</p>
          </div>
        </motion.div>
      </div>
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
  ContactPage,
  BookPage
};

export default Components;