import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-20 min-h-screen"
      style={{
        background: 'linear-gradient(135deg, rgba(4, 81, 132, 0.06), rgba(0, 168, 225, 0.06))'
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* 404 Number */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="text-[150px] sm:text-[200px] font-bold bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent leading-none">
              404
            </span>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Page Not Found
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto">
              Sorry, the page you're looking for doesn't exist or has been moved. 
              Let's get you back on track.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <Home size={20} />
              Return to Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 bg-white text-slate-700 px-8 py-4 rounded-lg font-semibold border border-slate-200 transition-all duration-300 hover:bg-slate-50 hover:shadow-md"
            >
              <ArrowLeft size={20} />
              Go Back
            </button>
          </motion.div>

          {/* Helpful Links */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 p-8 bg-white rounded-2xl shadow-lg border border-slate-200"
          >
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center justify-center gap-2">
              <Search size={20} className="text-[#045184]" />
              Popular Pages
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Link
                to="/advisory"
                className="p-4 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-[#045184] font-medium transition-all duration-200"
              >
                Advisory
              </Link>
              <Link
                to="/programs"
                className="p-4 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-[#045184] font-medium transition-all duration-200"
              >
                Programs
              </Link>
              <Link
                to="/networking"
                className="p-4 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-[#045184] font-medium transition-all duration-200"
              >
                Networking
              </Link>
              <Link
                to="/newsroom"
                className="p-4 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-[#045184] font-medium transition-all duration-200"
              >
                Newsroom
              </Link>
            </div>
            
            {/* Contact Us */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <p className="text-slate-600 mb-3">
                Can't find what you're looking for?
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-[#045184] hover:text-[#00A8E1] font-semibold transition-colors"
              >
                Contact Us →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default NotFoundPage;
