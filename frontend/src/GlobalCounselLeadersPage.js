import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Globe, Users, BookOpen, Calendar, Mail } from 'lucide-react';

const GlobalCounselLeadersPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-48 pb-12 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="mb-8">
            <div className="inline-block mb-6">
              <img
                src="https://static.wixstatic.com/media/e6a994_d8ffd6feab98477786e859a280b2eb5d~mv2.png/v1/fill/w_338,h_32,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/GCL.png"
                alt="Global Counsel Leaders"
                className="h-12"
              />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent mb-8 leading-tight">
            Bringing New Leaders Of The World's<br />
            Best-In-Class Legal & Compliance Functions Into TVN
          </h1>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            The integration of Global Counsel Leaders (GCL) brings enhanced global reach and expertise to The Vanguard Network, 
            expanding our leadership development capabilities for senior executives worldwide.
          </p>
        </motion.div>

        {/* Integration Overview */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-16"
        >
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <Globe size={32} className="text-[#045184]" />
              <h2 className="text-3xl font-bold text-slate-900">Global Integration</h2>
            </div>
            
            <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed">
              <p className="mb-6">
                With the integration of Global Counsel Leaders (GCL), TVN gains important new top leadership members and takes advantage of GCL's legacy of successful, highly-rated roundtables and conferences in more than 26 countries across every continent.
              </p>
              
              <p className="mb-6">
                GCL was founded by thought leader E. Leigh Dance, who has 25 years of experience helping in-house legal chiefs around the world. Leigh's articles on issues facing general counsel have appeared in The Wall Street Journal, Financial Times, American Lawyer, and Legal Week. Leigh continues with TVN as Senior Global Advisor.
              </p>
              
              <p>
                GCL further enriches TVN's position as the premier provider of peer-to-peer leadership development for senior executives in corporate law, the life sciences, and other domains.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-[#045184] to-[#00A8E1] rounded-3xl p-16 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-6">Experience Enhanced Global Leadership Development</h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto">
                Discover how the integration of Global Counsel Leaders enhances our ability to serve senior executives 
                in legal, compliance, and leadership functions worldwide.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/gc-exchange">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-[#045184] px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-100 transition-all duration-300 flex items-center gap-2 border-2 border-white"
                  >
                    <Users size={20} />
                    Join GC Exchange
                  </motion.button>
                </Link>
                <Link to="/programs">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-transparent text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#045184] transition-all duration-300 flex items-center gap-2 border-2 border-white"
                  >
                    <BookOpen size={20} />
                    View All Programs
                  </motion.button>
                </Link>
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-[#045184] px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-100 transition-all duration-300 flex items-center gap-2 border-2 border-white"
                  >
                    <Mail size={20} />
                    Contact Us
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default GlobalCounselLeadersPage;