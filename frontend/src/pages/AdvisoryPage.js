import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Breadcrumb from '../Breadcrumb';
import SEO from '../SEO';
import { Users, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';

const AdvisoryPage = () => {
  const [activeTab, setActiveTab] = useState('strategic'); // 'strategic', 'organizational', 'client'

  // Map tab keys to their corresponding hash IDs
  const tabToHash = {
    'strategic': 'strategic-counsel',
    'organizational': 'organizational-transformation',
    'client': 'client-and-stakeholder-engagement'
  };

  // Handle tab change and update URL hash
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    const hash = tabToHash[tab];
    if (hash) {
      window.history.replaceState(null, '', `#${hash}`);
    }
  };

  useEffect(() => {
    // Handle hash navigation on page load
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      // Set active tab based on hash
      if (id === 'strategic-counsel') {
        setActiveTab('strategic');
      } else if (id === 'organizational-transformation') {
        setActiveTab('organizational');
      } else if (id === 'client-and-stakeholder-engagement') {
        setActiveTab('client');
      }
      // Scroll to the services section after a short delay
      setTimeout(() => {
        const element = document.getElementById('advisory-services-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
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
    <SEO 
      title="Leadership Advisory & Development"
      description="Expert leadership advisory services for C-suite executives. Organizational transformation, strategic counsel, and stakeholder engagement powered by the human factor."
    />
    {/* Hero Section */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8 mb-20">
      <Breadcrumb />
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 
          className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent py-2 leading-tight"
        >
          Leadership Advisory & Development
        </h1>
        <div className="max-w-5xl mx-auto">
          <p className="text-2xl text-slate-600 leading-relaxed font-medium mb-16">
            Leadership is the catalyst for change and transformation–powered by the human factor.
          </p>
        </div>
      </motion.div>
    </div>

    {/* Three Approaches Section with Tabs */}
    <div id="advisory-services-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8" style={{ scrollMarginTop: '100px' }}>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mb-20"
      >
        {/* Section Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#045184]/5 to-[#00A8E1]/5 rounded-3xl transform -skew-y-1"></div>
          <div className="relative py-6 md:py-12 px-4 md:px-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#045184] to-[#00A8E1] flex items-center justify-center mx-auto mb-6"
            >
              <Users size={32} className="text-white" />
            </motion.div>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Three Ways We Work With Executives<br />To Build High-Performance Organizations
            </h2>
          </div>
        </div>
        
        {/* Mobile Tab Navigation - Horizontal Tabs with Two Lines */}
        <div className="md:hidden mb-6">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide text-center mb-4">
            Select a service
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleTabChange('strategic')}
              className={`px-2 py-4 rounded-xl font-semibold text-xs transition-all duration-300 text-center leading-tight ${
                activeTab === 'strategic'
                  ? 'bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white shadow-lg'
                  : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-[#00A8E1]'
              }`}
            >
              <span className="block">Strategic</span>
              <span className="block">Counsel</span>
            </button>
            <button
              onClick={() => handleTabChange('organizational')}
              className={`px-2 py-4 rounded-xl font-semibold text-xs transition-all duration-300 text-center leading-tight ${
                activeTab === 'organizational'
                  ? 'bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white shadow-lg'
                  : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-[#00A8E1]'
              }`}
            >
              <span className="block">Organizational</span>
              <span className="block">Transformation</span>
            </button>
            <button
              onClick={() => handleTabChange('client')}
              className={`px-2 py-4 rounded-xl font-semibold text-xs transition-all duration-300 text-center leading-tight ${
                activeTab === 'client'
                  ? 'bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white shadow-lg'
                  : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-[#00A8E1]'
              }`}
            >
              <span className="block">Client</span>
              <span className="block">Engagement</span>
            </button>
          </div>
        </div>

        {/* Desktop Tab Navigation Block - Hidden on Mobile */}
        <div className="hidden md:block bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden mb-12">
          <div className="text-center py-4 bg-slate-50 border-b border-slate-200">
            <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide px-4">
              Click below to explore our advisory services
            </p>
          </div>
          <div className="grid grid-cols-3">
            {/* Strategic Counsel Tab */}
            <motion.button
              onClick={() => handleTabChange('strategic')}
              whileHover={{ scale: activeTab !== 'strategic' ? 1.02 : 1 }}
              whileTap={{ scale: 0.98 }}
              className={`p-8 text-left transition-all duration-300 cursor-pointer relative group ${
                activeTab === 'strategic'
                  ? 'bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white shadow-lg'
                  : 'bg-white text-slate-900 hover:bg-blue-50 hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className={`text-2xl font-bold mb-3 ${activeTab === 'strategic' ? 'text-white' : 'text-slate-900 group-hover:text-[#045184]'}`}>
                    Strategic Counsel
                  </h3>
                  <p className={`text-base mb-2 ${activeTab === 'strategic' ? 'text-white/90' : 'text-slate-600'}`}>
                    Work with other experienced leaders who understand your challenges. We'll help you test your thinking and verify your action plan.
                  </p>
                </div>
                <div className={`ml-4 flex-shrink-0 transition-transform duration-300 ${activeTab !== 'strategic' ? 'group-hover:translate-x-1' : ''}`}>
                  <ArrowRight size={28} className={activeTab === 'strategic' ? 'text-white' : 'text-[#00A8E1]'} />
                </div>
              </div>
              {activeTab === 'strategic' && (
                <div className="mt-3 flex items-center text-sm text-white/80">
                  <CheckCircle2 size={16} className="mr-2" />
                  Currently viewing
                </div>
              )}
              {activeTab !== 'strategic' && (
                <div className="mt-3 flex items-center text-sm text-[#00A8E1] font-semibold">
                  Click to view details →
                </div>
              )}
            </motion.button>

            {/* Organizational Transformation Tab */}
            <motion.button
              onClick={() => handleTabChange('organizational')}
              whileHover={{ scale: activeTab !== 'organizational' ? 1.02 : 1 }}
              whileTap={{ scale: 0.98 }}
              className={`p-8 text-left transition-all duration-300 cursor-pointer relative group border-l border-slate-200 ${
                activeTab === 'organizational'
                  ? 'bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white shadow-lg'
                  : 'bg-white text-slate-900 hover:bg-blue-50 hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className={`text-2xl font-bold mb-3 ${activeTab === 'organizational' ? 'text-white' : 'text-slate-900 group-hover:text-[#045184]'}`}>
                    Organizational Transformation
                  </h3>
                  <p className={`text-base mb-2 ${activeTab === 'organizational' ? 'text-white/90' : 'text-slate-600'}`}>
                    It's all about the people. Get them on board with the change agenda, and success will follow.
                  </p>
                </div>
                <div className={`ml-4 flex-shrink-0 transition-transform duration-300 ${activeTab !== 'organizational' ? 'group-hover:translate-x-1' : ''}`}>
                  <ArrowRight size={28} className={activeTab === 'organizational' ? 'text-white' : 'text-[#00A8E1]'} />
                </div>
              </div>
              {activeTab === 'organizational' && (
                <div className="mt-3 flex items-center text-sm text-white/80">
                  <CheckCircle2 size={16} className="mr-2" />
                  Currently viewing
                </div>
              )}
              {activeTab !== 'organizational' && (
                <div className="mt-3 flex items-center text-sm text-[#00A8E1] font-semibold">
                  Click to view details →
                </div>
              )}
            </motion.button>

            {/* Client and Stakeholder Engagement Tab */}
            <motion.button
              onClick={() => handleTabChange('client')}
              whileHover={{ scale: activeTab !== 'client' ? 1.02 : 1 }}
              whileTap={{ scale: 0.98 }}
              className={`p-8 text-left transition-all duration-300 cursor-pointer relative group border-l border-slate-200 ${
                activeTab === 'client'
                  ? 'bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white shadow-lg'
                  : 'bg-white text-slate-900 hover:bg-blue-50 hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className={`text-2xl font-bold mb-3 ${activeTab === 'client' ? 'text-white' : 'text-slate-900 group-hover:text-[#045184]'}`}>
                    Client & Stakeholder Engagement
                  </h3>
                  <p className={`text-base mb-2 ${activeTab === 'client' ? 'text-white/90' : 'text-slate-600'}`}>
                    Transform supplier relationships into peer and trusted advisor roles.
                  </p>
                </div>
                <div className={`ml-4 flex-shrink-0 transition-transform duration-300 ${activeTab !== 'client' ? 'group-hover:translate-x-1' : ''}`}>
                  <ArrowRight size={28} className={activeTab === 'client' ? 'text-white' : 'text-[#00A8E1]'} />
                </div>
              </div>
              {activeTab === 'client' && (
                <div className="mt-3 flex items-center text-sm text-white/80">
                  <CheckCircle2 size={16} className="mr-2" />
                  Currently viewing
                </div>
              )}
              {activeTab !== 'client' && (
                <div className="mt-3 flex items-center text-sm text-[#00A8E1] font-semibold">
                  Click to view details →
                </div>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>

    {/* Tab Content Sections - Display Directly Below Tabs */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8 -mt-[34px]">
      <div className="space-y-12">
        
        {/* Strategic Counsel Section */}
        {activeTab === 'strategic' && (
        <motion.div
          id="strategic-counsel"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative"
          style={{ scrollMarginTop: '120px' }}
        >
          {/* Upward Triangle Caret Indicator - Points to Strategic Counsel tab (1st of 3) */}
          <div className="absolute -top-4 left-[16.67%] md:left-[16.67%] transform -translate-x-1/2">
            <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[16px] border-b-[#045184]"></div>
          </div>
          
          <div className="bg-white rounded-2xl py-4 md:py-8 md:py-6 md:py-12 shadow-xl border-t-4 border-[#045184]">
          <div className="px-4 sm:px-6 lg:px-4 md:px-8">
            {/* Strategic Counsel Content */}
            <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:p-12 items-center">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.8 }}
              >
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Strategic Counsel</h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  From our decades of experience as top leaders, we know the critical dimensions of your role–from dealing with a delicate internal issue, to managing external pressures on the business, to making a complex transaction work, and so much more.
                </p>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Our services are distinguishable from those of a typical large strategy or management consultancy. We are a small, focused senior team that understands what you are facing.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  We don't bring hundreds of charts or data analysis to the situation. Instead, we engage in an intimate, structured conversation that helps to clarify your insights, recommendations, and decisions. We will help you test your thinking and verify your action plan. And we can help you turn that plan into performance.
                </p>
              </motion.div>
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="rounded-xl p-4 md:p-8" 
                style={{ backgroundColor: '#045184' }}
              >
                <h4 className="text-2xl font-bold text-white mb-4">Examples</h4>
                <ul className="space-y-3 text-white">
                  {[
                    "Making the tough calls",
                    "C-suite dynamics", 
                    "Board relations",
                    "Succession planning",
                    "Stakeholder management"
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
            
            {/* Ram Charan Testimonial */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="mt-12 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-4 md:p-8"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <img 
                    src="https://customer-assets.emergentagent.com/job_ux-revamp-suite/artifacts/kzouq217_Ram.jpeg"
                    alt="Ram Charan testimonial"
                    className="w-20 h-20 rounded-full object-cover shadow-lg"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <blockquote className="text-lg italic text-slate-700 mb-4 leading-relaxed">
                    "Asking the right questions is often the most important role a trusted advisor can play. Not many consultants have this capability. Ken Banta is world-class."
                  </blockquote>
                  <div className="text-slate-900 font-bold">Ram Charan</div>
                  <div className="text-slate-600 text-sm">Business Consultant and Best-Selling Author, Charan Associates</div>
                </div>
              </div>
            </motion.div>

            {/* Jim Jenson Testimonial */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2.0, duration: 0.8 }}
              className="mt-8 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-4 md:p-8"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <img 
                    src="https://customer-assets.emergentagent.com/job_ux-revamp-suite/artifacts/wctgezyh_Jim%20Jenson.jpg"
                    alt="Jim Jenson testimonial"
                    className="w-20 h-20 rounded-full object-cover shadow-lg"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <blockquote className="text-lg italic text-slate-700 mb-4 leading-relaxed">
                    "Too often in my experience, consultants deliver generic advice -- or recommendations that are disconnected from our reality. Vanguard is different. An hour of Ken's time can be worth several days of conventional consulting."
                  </blockquote>
                  <div className="text-slate-900 font-bold">Jim Jenson</div>
                  <div className="text-slate-600 text-sm">CEO, Morphoceuticals</div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Case Study Link */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            className="mt-8 text-center"
          >
            <Link
              to="/success-stories?category=leadership-advisory"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white px-4 md:px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 group"
            >
              Success Stories
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
          </div>
          </div>
        </motion.div>
        )}

        {/* Organizational Transformation Section */}
        {activeTab === 'organizational' && (
        <motion.div
          id="organizational-transformation"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative"
          style={{ scrollMarginTop: '120px' }}
        >
          {/* Upward Triangle Caret Indicator - Points to Organizational Transformation tab (2nd of 3) */}
          <div className="absolute -top-4 left-1/2 md:left-1/2 transform -translate-x-1/2">
            <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[16px] border-b-[#045184]"></div>
          </div>
          
          <div className="bg-white rounded-2xl py-4 md:py-8 md:py-6 md:py-12 shadow-xl border-t-4 border-[#045184]">
          <div className="px-4 sm:px-6 lg:px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:p-12 items-center">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Organizational Transformation</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                We'll help you clarify the shape of the future, and how to get there. Then, we will work with you to engage your teams, earn their trust, and build high performance for the long-term.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                Our approach is grounded in decades of experience with organizations ranging from earlier stage enterprises to Fortune 100 companies.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We're not a conventional large strategy consulting firm. Instead, we are a lean and focused senior team with decades of real-world success in catalyzing organizational change that sticks and delivers measurable results.
              </p>
            </motion.div>
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="rounded-xl p-4 md:p-8" 
              style={{ backgroundColor: '#045184' }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">Examples</h3>
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
            className="mt-12 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-4 md:p-8"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <img 
                  src="https://customer-assets.emergentagent.com/job_ux-revamp-suite/artifacts/xlsk8jvy_Mohamed%20Ladha.jpeg"
                  alt="Mohamed Ladha testimonial"
                  className="w-20 h-20 rounded-full object-cover shadow-lg"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <blockquote className="text-lg italic text-slate-700 mb-4 leading-relaxed">
                  "Ken and his team at Vanguard played a very important role in building alignment on our leadership team and assisting me to further build my CEO bandwidth -- all in a lean and focused fashion."
                </blockquote>
                <div className="text-slate-900 font-bold">Mohamed Ladha</div>
                <div className="text-slate-600 text-sm">President and General Manager, North America, Recordati Rare Diseases</div>
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
              to="/success-stories?category=organizational-transformation"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white px-4 md:px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 group"
            >
              Success Stories
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
          </div>
          </div>
        </motion.div>
        )}

        {/* Client and Stakeholder Engagement Section */}
        {activeTab === 'client' && (
        <motion.div
          id="client-and-stakeholder-engagement"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative"
          style={{ scrollMarginTop: '120px' }}
        >
          {/* Upward Triangle Caret Indicator - Points to Client Engagement tab (3rd of 3) */}
          <div className="absolute -top-4 left-[83.33%] md:left-[83.33%] transform -translate-x-1/2">
            <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[16px] border-b-[#045184]"></div>
          </div>
          
          <div className="bg-white rounded-2xl py-4 md:py-8 md:py-6 md:py-12 shadow-xl border-t-4 border-[#045184]">
          <div className="px-4 sm:px-6 lg:px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:p-12 items-center">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Client and Stakeholder Engagement</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                We understand the critical importance of getting close to clients, prospects, and other stakeholders. And we know how to do it.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We apply ten years of catalyzing leadership conversations among our C-suite members to building the same kinds of interactions for you. Over working dinners and small group dialogues curated by Vanguard, you build trusted relationships and interact as a peer with selected participants. Never a PowerPoint or credentials presentation; you demonstrate what you can do.
              </p>
            </motion.div>
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="rounded-xl p-4 md:p-8" 
              style={{ backgroundColor: '#045184' }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">Examples</h3>
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
            className="mt-12 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-4 md:p-8"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <img 
                  src="https://customer-assets.emergentagent.com/job_ux-revamp-suite/artifacts/0g7g48xr_goodman_mark_lo1.jpg"
                  alt="Mark Goodman testimonial"
                  className="w-20 h-20 rounded-full object-cover shadow-lg"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <blockquote className="text-lg italic text-slate-700 mb-4 leading-relaxed">
                  "It's remarkable, but TVN does it: By facilitating close, substantive interactions on a regular basis, TVN helps our firm ensure that general counsels always view us as a trusted peer and partner and never as a vendor."
                </blockquote>
                <div className="text-slate-900 font-bold">Mark Goodman</div>
                <div className="text-slate-600 text-sm">Partner, Debevoise & Plimpton</div>
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
              to="/success-stories?category=client-stakeholder-engagement"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white px-4 md:px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 group"
            >
              Success Stories
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
          </div>
          </div>
        </motion.div>
        )}
      </div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mt-12 mb-12"
      >
      </motion.div>
    </div>

    {/* Overview Section */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8 mb-16">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="bg-white rounded-3xl p-6 md:p-12 md:p-16 shadow-xl border-2 border-transparent hover:border-[#045184]/10 transition-all duration-500 mb-16 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#045184]/5 to-[#00A8E1]/5 rounded-full transform translate-x-20 -translate-y-20"></div>
        
        <div className="relative z-10">
          <div className="bg-gradient-to-br from-[#045184]/10 via-blue-50 to-[#00A8E1]/10 rounded-2xl p-6 md:p-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#045184]/5 to-[#00A8E1]/5"></div>
            <div className="text-center relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-5xl md:text-7xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent"
              >
                2,000+
              </motion.div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 md:mb-4">CEOs and C-suite Executive Members and Participants</h3>
              <p className="text-slate-600 font-medium text-base md:text-lg mb-4 md:mb-6">Their experience and insights, combined with ours, is what creates Vanguard's edge as trusted advisors to senior leaders.</p>
            </div>
          </div>
          
          {/* Brandon Smith Testimonial */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-8 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-4 md:p-8"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <img 
                  src="https://customer-assets.emergentagent.com/job_menu-redesign-10/artifacts/f05c23mk_1616816784873.jpeg"
                  alt="Brandon Smith testimonial"
                  className="w-20 h-20 rounded-full object-cover shadow-lg"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <blockquote className="text-lg italic text-slate-700 mb-4 leading-relaxed">
                  "Vanguard delivers exceptional outcomes for its members by accumulating insight from outstanding leaders across professions, industries and geographies."
                </blockquote>
                <div className="text-slate-900 font-bold">Brandon Smith</div>
                <div className="text-slate-600 text-sm">Executive Vice President and General Counsel, CHS Inc.</div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>

    {/* Selected Advisory Engagements Section */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8 mb-16">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="bg-white rounded-2xl p-4 md:p-8 md:p-6 md:p-12 shadow-lg"
        >
          <div className="text-center">
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-8"
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
                src="https://customer-assets.emergentagent.com/job_menu-redesign-10/artifacts/8761e9d6_TVN%20Advisory.png"
                alt="Selected Advisory Engagements"
                className="w-full h-auto rounded-lg"
                style={{ 
                  border: 'none',
                  boxShadow: 'none',
                  background: 'transparent',
                  imageRendering: 'auto'
                }}
              />
            </motion.div>
          </div>
        </motion.div>
    </div>

    {/* Executive Advisory Team Section */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8 mb-16">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="bg-white rounded-2xl p-4 md:p-8 md:p-6 md:p-12 shadow-lg"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-slate-900 mb-12">EXECUTIVE ADVISORY TEAM</h2>
          
          {/* Mobile & Desktop Layout - Vertical Cards */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 md:p-8 auto-rows-fr md:hidden xl:grid">
            {/* Ken Banta */}
            <div className="bg-white rounded-2xl p-6 shadow-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300" style={{ height: '680px' }}>
              <div className="w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden shadow-md">
                <img 
                  src="/ken-banta.jpg" 
                alt="Ken Banta - Founder and Managing Director of The Vanguard Network" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 text-center">KEN BANTA</h3>
              <p className="text-base mb-4 text-center font-semibold" style={{ color: '#045184' }}>Founder & CEO</p>
              <div style={{ height: '260px', marginBottom: '16px' }}>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Ken helped lead eleven global turnarounds, mergers, and transformations, generating more than $83 billion in accretion. He has advised on many initiatives of varying scale and global reach, with playbooks that build high-performance cultures as a hallmark of his expertise.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-500 text-center">Rhodes Scholar | Harvard Business Review Contributor | Co-author of "Ten Must Reads for CEOs"</p>
              </div>
            </div>

            {/* Richard Hulme */}
            <div className="bg-white rounded-2xl p-6 shadow-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300" style={{ height: '680px' }}>
              <div className="w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden shadow-md">
                <img 
                  src="/richard-hulme.jpg" 
                  alt="Richard Hulme - Senior Advisor at The Vanguard Network" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 text-center">RICHARD HULME</h3>
              <p className="text-base mb-4 text-center font-semibold" style={{ color: '#045184' }}>Managing Director</p>
              <div style={{ height: '260px', marginBottom: '16px' }}>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Richard has over 25 years of experience in strategy consulting, global operations, and organizational excellence. During his 15 years at PricewaterhouseCoopers, he served as chief of staff to the PwC Global Board Chairman and delivered special projects for the PwC Global CEO.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-500 text-center">Certified OKR Coach | BS William & Mary | MBA Carnegie Mellon</p>
              </div>
            </div>

            {/* Garrick Isert */}
            <div className="bg-white rounded-2xl p-6 shadow-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300" style={{ height: '680px' }}>
              <div className="w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden shadow-md">
                <img 
                  src="/garrick-isert.jpg" 
                  alt="Garrick Isert - Senior Advisor at The Vanguard Network" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 text-center">GARRICK ISERT</h3>
              <p className="text-base mb-4 text-center font-semibold" style={{ color: '#045184' }}>Principal</p>
              <div style={{ height: '260px', marginBottom: '16px' }}>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Garrick brings over 20 years of corporate and management consulting experience. He has worked with global senior leaders across diverse industries including hospitality, law, e-commerce, financial services, and energy, with experience at World 50, IHG, Boston Consulting Group, and General Electric.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-500 text-center">Six Sigma Black Belt | J.D. Northwestern | MBA Kellogg</p>
              </div>
            </div>

            {/* Aileen Gonsalves */}
            <div className="bg-white rounded-2xl p-6 shadow-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300" style={{ height: '680px' }}>
              <div className="w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden shadow-md">
                <img 
                  src="/aileen-gonsalves.jpg" 
                  alt="Aileen Gonsalves - Executive Coach and Leadership Advisor" 
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'calc(50% - 20px) 20%' }}
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 text-center">AILEEN GONSALVES</h3>
              <p className="text-base mb-4 text-center font-semibold" style={{ color: '#045184' }}>Principal</p>
              <div style={{ height: '260px', marginBottom: '16px' }}>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Aileen brings her unique leadership communication approach, the Gonsalves Method, rooted in her career as an actor and director with the Royal Shakespeare Company. She has worked with Dame Judi Dench, Sir Simon Russell Beale, and other leading performers, now applying these skills to business leadership.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-500 text-center">Royal Shakespeare Company | RADA Professor | Author, "Shakespeare and Meisner"</p>
              </div>
            </div>
          </div>

          {/* Tablet Layout - Horizontal Full-Width Cards */}
          <div className="hidden md:block xl:hidden space-y-6">
            {/* Ken Banta - Horizontal */}
            <div className="bg-white rounded-2xl p-6 shadow-2xl flex items-start gap-6">
              <div className="w-32 h-32 rounded-full flex-shrink-0 overflow-hidden shadow-md">
                <img src="/ken-banta.jpg" alt="Ken Banta" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-1">KEN BANTA</h3>
                <p className="text-base mb-3 font-semibold" style={{ color: '#045184' }}>Founder & CEO</p>
                <p className="text-slate-600 leading-relaxed text-sm mb-3">
                  Ken helped lead eleven global turnarounds, mergers, and transformations, generating more than $83 billion in accretion. He has advised on many initiatives of varying scale and global reach, with playbooks that build high-performance cultures as a hallmark of his expertise.
                </p>
                <p className="text-xs text-slate-500 pt-3 border-t border-slate-200">Rhodes Scholar | Harvard Business Review Contributor | Co-author of "Ten Must Reads for CEOs"</p>
              </div>
            </div>

            {/* Richard Hulme - Horizontal */}
            <div className="bg-white rounded-2xl p-6 shadow-2xl flex items-start gap-6">
              <div className="w-32 h-32 rounded-full flex-shrink-0 overflow-hidden shadow-md">
                <img src="/richard-hulme.jpg" alt="Richard Hulme" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-1">RICHARD HULME</h3>
                <p className="text-base mb-3 font-semibold" style={{ color: '#045184' }}>Managing Director</p>
                <p className="text-slate-600 leading-relaxed text-sm mb-3">
                  Richard has over 25 years of experience in strategy consulting, global operations, and organizational excellence. During his 15 years at PricewaterhouseCoopers, he served as chief of staff to the PwC Global Board Chairman and delivered special projects for the PwC Global CEO.
                </p>
                <p className="text-xs text-slate-500 pt-3 border-t border-slate-200">Certified OKR Coach | BS William & Mary | MBA Carnegie Mellon</p>
              </div>
            </div>

            {/* Garrick Isert - Horizontal */}
            <div className="bg-white rounded-2xl p-6 shadow-2xl flex items-start gap-6">
              <div className="w-32 h-32 rounded-full flex-shrink-0 overflow-hidden shadow-md">
                <img src="/garrick-isert.jpg" alt="Garrick Isert" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-1">GARRICK ISERT</h3>
                <p className="text-base mb-3 font-semibold" style={{ color: '#045184' }}>Principal</p>
                <p className="text-slate-600 leading-relaxed text-sm mb-3">
                  Garrick brings over 20 years of corporate and management consulting experience. He has worked with global senior leaders across diverse industries including hospitality, law, e-commerce, financial services, and energy, with experience at World 50, IHG, Boston Consulting Group, and General Electric.
                </p>
                <p className="text-xs text-slate-500 pt-3 border-t border-slate-200">Six Sigma Black Belt | J.D. Northwestern | MBA Kellogg</p>
              </div>
            </div>

            {/* Aileen Gonsalves - Horizontal */}
            <div className="bg-white rounded-2xl p-6 shadow-2xl flex items-start gap-6">
              <div className="w-32 h-32 rounded-full flex-shrink-0 overflow-hidden shadow-md">
                <img src="/aileen-gonsalves.jpg" alt="Aileen Gonsalves" className="w-full h-full object-cover" style={{ objectPosition: 'calc(50% - 20px) 20%' }} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-1">AILEEN GONSALVES</h3>
                <p className="text-base mb-3 font-semibold" style={{ color: '#045184' }}>Principal</p>
                <p className="text-slate-600 leading-relaxed text-sm mb-3">
                  Aileen brings her unique leadership communication approach, the Gonsalves Method, rooted in her career as an actor and director with the Royal Shakespeare Company. She has worked with Dame Judi Dench, Sir Simon Russell Beale, and other leading performers, now applying these skills to business leadership.
                </p>
                <p className="text-xs text-slate-500 pt-3 border-t border-slate-200">Royal Shakespeare Company | RADA Professor | Author, "Shakespeare and Meisner"</p>
              </div>
            </div>
          </div>
        </motion.div>
    </div>

    {/* Call to Action */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8 mb-16">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="text-center rounded-2xl p-6 md:p-12 bg-gradient-to-r from-[#045184] to-[#00A8E1]"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">Ready to Transform Your Leadership?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Join the 2,000+ CEOs and C-suite executives who trust The Vanguard Network for their leadership development and strategic guidance.
          </p>
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#045184] w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-base transition-all duration-200 hover:bg-blue-50"
            >
              Contact Us
            </motion.button>
          </Link>
        </motion.div>
    </div>
  </motion.div>
  );
};

export default AdvisoryPage;
