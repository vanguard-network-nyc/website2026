import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, ArrowRight } from 'lucide-react';

const NewHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-32 md:pt-0">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/39/lIZrwvbeRuuzqOoWJUEn_Photoaday_CSD%20%281%20of%201%29-5.jpg"
          alt="Executive leadership team in a peer networking session"
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
            The Human Factor<br />Unlocking the Power of Leadership
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-slate-700 mb-12 leading-relaxed max-w-4xl mx-auto"
          >
            We help build high-performance leadership through advisory services, peer-to-peer networks, custom programs, and curated content.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
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
            <Link
              to="/networking"
              className="bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white px-4 md:px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
            >
              Peer-to-Peer Networks
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Statistics Section

export default NewHero;
