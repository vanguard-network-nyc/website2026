import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Linkedin, Mail } from 'lucide-react';

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
            © 2026 The Vanguard Network
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

export default Footer;
