import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Globe, Users, BookOpen, Calendar, ExternalLink } from 'lucide-react';

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
            <div className="bg-slate-800 rounded-lg p-6 inline-block mb-6">
              <img
                src="https://static.wixstatic.com/media/e6a994_d8ffd6feab98477786e859a280b2eb5d~mv2.png/v1/fill/w_338,h_32,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/GCL.png"
                alt="Global Counsel Leaders"
                className="h-12"
              />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
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
              <Globe size={32} className="text-blue-600" />
              <h2 className="text-3xl font-bold text-slate-900">Global Integration</h2>
            </div>
            
            <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed">
              <p className="mb-6">
                Through the integration of Global Counsel Leaders, The Vanguard Network now includes distinguished 
                leadership members from top-tier organizations across more than 26 countries on every continent. 
                This strategic integration leverages GCL's proven track record of successful roundtables and conferences 
                that have connected legal and compliance leaders worldwide.
              </p>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border-l-4 border-blue-600">
                <h3 className="font-bold text-slate-900 mb-3">Enhanced Global Capabilities</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>Access to leadership expertise across 26+ countries</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>Proven frameworks for international peer-to-peer learning</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>Enhanced networking opportunities for legal and compliance executives</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>Strengthened position as the premier leadership development provider</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Leadership Section */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-16"
        >
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Users size={32} className="text-blue-600" />
                  <h2 className="text-3xl font-bold text-slate-900">Leadership Excellence</h2>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Meet Our Senior Global Advisor
                </h3>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1562935345-5080389daccd"
                      alt="E. Leigh Dance"
                      className="w-16 h-16 rounded-full object-cover shadow-lg"
                    />
                    <div>
                      <h4 className="text-xl font-bold text-slate-900">E. Leigh Dance</h4>
                      <p className="text-slate-600 font-medium">Senior Global Advisor</p>
                    </div>
                  </div>
                  
                  <p className="text-slate-700 mb-4 leading-relaxed">
                    GCL was founded by recognized thought leader E. Leigh Dance, who brings 25 years of experience 
                    helping in-house legal chiefs around the world. Leigh continues with TVN as Senior Global Advisor, 
                    ensuring continuity of expertise and global perspective.
                  </p>
                  
                  <div className="border-t pt-4">
                    <h5 className="font-semibold text-slate-900 mb-2">Published In</h5>
                    <div className="flex flex-wrap gap-2">
                      {['The Wall Street Journal', 'Financial Times', 'American Lawyer', 'Legal Week'].map((publication) => (
                        <span key={publication} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {publication}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
                  alt="Global legal leaders collaboration"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Impact & Benefits */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-16"
        >
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <BookOpen size={32} className="text-blue-600" />
              <h2 className="text-3xl font-bold text-slate-900">Enhanced Value Proposition</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">For Legal & Compliance Leaders</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <span className="text-slate-700">Access to global peer networks across multiple jurisdictions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <span className="text-slate-700">Best practices sharing from diverse legal and regulatory environments</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <span className="text-slate-700">Enhanced problem-solving through international perspectives</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <span className="text-slate-700">Proven methodologies for leadership development in legal functions</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">For The Vanguard Network</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span className="text-slate-700">Expanded global reach with experienced international leaders</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span className="text-slate-700">Enhanced expertise in legal and compliance leadership development</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span className="text-slate-700">Strengthened position as premier leadership development provider</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span className="text-slate-700">Access to GCL's legacy of successful roundtables and conferences</span>
                  </li>
                </ul>
              </div>
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
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-xl p-8 md:p-12 text-white">
            <h2 className="text-3xl font-bold mb-6">Experience Enhanced Global Leadership Development</h2>
            <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Discover how the integration of Global Counsel Leaders enhances our ability to serve senior executives 
              in legal, compliance, and leadership functions worldwide.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/gc-exchange"
                className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                <Users size={20} />
                Join GC Exchange
              </Link>
              <Link
                to="/programs"
                className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                <Calendar size={20} />
                View All Programs
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Learn More
                <ExternalLink size={16} />
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default GlobalCounselLeadersPage;