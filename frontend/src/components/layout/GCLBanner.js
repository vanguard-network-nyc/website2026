import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

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

export default GCLBanner;
