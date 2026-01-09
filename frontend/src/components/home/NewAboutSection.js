import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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
            What Makes Us Different
          </h2>
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
      </div>
    </section>
  );
};

// Substack Posts Section

export default NewAboutSection;
