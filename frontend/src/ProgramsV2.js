import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  BookOpen, 
  Award, 
  Target, 
  Users, 
  ArrowRight,
  Mail,
  Filter,
  Grid,
  List,
  Clock,
  TrendingUp,
  CheckCircle2,
  Search,
  Star,
  Zap,
  Briefcase,
  Globe
} from 'lucide-react';

const ProgramsV2 = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [viewMode, setViewMode] = useState('cards');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('current'); // 'current' or 'customized'

  const currentPrograms = [
    {
      name: "GENERAL COUNSEL EXCHANGE",
      description: "A highly pragmatic leadership problem-solving group that meets monthly, moderated by Vanguard. Monthly, in virtual format; face-to-face sessions occur at our bi-annual Forums.",
      format: "Monthly Virtual + Bi-annual In-Person",
      audience: "General Counsel",
      category: "Legal",
      level: "Executive",
      status: "Active",
      image: "/gc-exchange-program.jpg",
      backgroundImage: "https://images.unsplash.com/photo-1729459101598-9baa041bd27b",
      duration: "Ongoing",
      participants: "12-15",
      features: ["Monthly Problem-Solving Sessions", "Bi-annual Forums", "Peer Networking", "Vanguard Moderation"],
      icon: <Shield size={28} />
    },
    {
      name: "SENIOR IN-HOUSE COUNSEL EXCHANGE",
      description: "An exchange for GCs' immediate reports to compare notes and solve problems together. Monthly, in virtual format.",
      format: "Monthly Virtual",
      audience: "Senior In-House Counsel",
      category: "Legal",
      level: "Senior",
      status: "Active",
      image: "/senior-counsel-exchange-program.jpg",
      backgroundImage: "https://images.unsplash.com/photo-1736325263301-488931888151",
      duration: "Ongoing",
      participants: "10-12",
      features: ["Monthly Virtual Sessions", "Problem-Solving Focus", "Peer Collaboration", "GC Reports Network"],
      icon: <BookOpen size={28} />
    },
    {
      name: "LIFE SCIENCES CEO EXCHANGE",
      description: "For Life Sciences CEOs, focusing on leadership aspects rather than day-to-day tasks. Discussions include AI in development and commercialization. Quarterly, in virtual format, with face-to-face sessions bi-annually.",
      format: "Quarterly Virtual + Bi-annual In-Person",
      audience: "Life Sciences CEOs",
      category: "Life Sciences",
      level: "Executive",
      status: "Active",
      image: "/life-sciences-ceo-program.jpg",
      backgroundImage: "https://images.unsplash.com/photo-1658567695327-8ee7a1452f84",
      duration: "Ongoing",
      participants: "8-10",
      features: ["Quarterly CEO Sessions", "AI Focus", "Leadership Development", "Industry-Specific"],
      icon: <Award size={28} />
    },
    {
      name: "NEXT GENERATION GC",
      description: "A six-month program to accelerate the trajectory of potential GCs, uniquely developed and led by Vanguard General Counsel Members.",
      format: "6-Month Program",
      audience: "Future General Counsel",
      category: "Legal",
      level: "Emerging",
      status: "Enrollment Open",
      image: "/next-generation-gc-program.jpg",
      backgroundImage: "https://images.unsplash.com/photo-1709626011485-6fe000ea2dbc",
      duration: "6 Months",
      participants: "15-20",
      features: ["6-Month Acceleration", "GC-Led Development", "Career Trajectory", "Vanguard Exclusive"],
      icon: <Target size={28} />
    },
    {
      name: "NEW LEADERS PROGRAM",
      description: "A six to twelve month program to jump-start leadership capabilities among graduate students and newer hires, led by more senior executives. Highly pragmatic focus on capabilities.",
      format: "6-12 Month Program",
      audience: "Graduate Students & New Hires",
      category: "General",
      level: "Entry",
      status: "Enrollment Open",
      image: "/new-leaders-program.jpg",
      backgroundImage: "https://images.unsplash.com/photo-1659948782648-72d1583efcf2",
      duration: "6-12 Months",
      participants: "20-25",
      features: ["Leadership Jump-Start", "Senior Executive Led", "Pragmatic Focus", "Graduate & New Hire"],
      icon: <Users size={28} />
    },
    {
      name: "LAW ASSOCIATES ACCELERATOR",
      description: "A comprehensive program designed to accelerate the success of law firm associates through EQ development and business understanding, led by GCs and business leaders.",
      format: "Modular Program",
      audience: "Law Firm Associates",
      category: "Legal",
      level: "Professional Development",
      status: "Enrollment Open",
      image: "/law-associates-program.jpg",
      backgroundImage: "https://images.pexels.com/photos/1544947/pexels-photo-1544947.jpeg",
      duration: "Flexible",
      participants: "Up to 20 per cohort",
      features: ["Interactive Faculty Sessions", "Peer Development", "Business Partnership Focus", "EQ & Leadership Skills"],
      icon: <Shield size={28} />
    },
    {
      name: "RISK MANAGEMENT EXCHANGE",
      description: "A peer network for senior executives with strategic accountability for risk across law, compliance, finance, cybersecurity, and operations.",
      format: "Monthly Virtual Exchanges",
      audience: "Risk Management Leaders",
      category: "Risk Management",
      level: "Executive",
      status: "Enrollment Open",
      image: "/risk-management-program.jpg",
      backgroundImage: "https://images.pexels.com/photos/18069160/pexels-photo-18069160.png",
      duration: "Annual Membership",
      participants: "Senior Risk Leaders",
      features: ["Monthly Virtual Exchanges", "Guest Expert Insights", "Confidential Peer Discussions", "Actionable Playbooks"],
      icon: <Shield size={28} />
    }
  ];

  const customizedPrograms = [
    {
      name: "CEO & C-SUITE",
      description: "Customized programs to yield high-performance amongst C-suite leaders across a portfolio of companies or global teams using the Vanguard roundtable model.",
      target: "C-Suite Executives",
      benefits: ["High-Performance Leadership", "Roundtable Model", "Portfolio Companies", "Global Teams"],
      color: "#00A8E1",
      gradient: "from-[#00A8E1] to-[#0284c7]",
      bgColor: "from-[#00A8E1]/5 to-[#0284c7]/5",
      backgroundImage: "https://images.unsplash.com/photo-1729459101598-9baa041bd27b",
      duration: "Flexible",
      participants: "8-12 Executives",
      icon: <Star size={28} />
    },
    {
      name: "NEXT GENERATION C-SUITE",
      description: "Generating high-performance and a better understanding of the next Generation C-suite. Customized for enterprises using our tried and tested Next Generation C-suite modules.",
      target: "Future C-Suite Leaders",
      benefits: ["High-Performance Development", "Next-Gen Focus", "Proven Modules", "Enterprise Customization"],
      color: "#045184",
      gradient: "from-[#045184] to-[#0369a1]",
      bgColor: "from-[#045184]/5 to-[#0369a1]/5",
      backgroundImage: "https://images.unsplash.com/photo-1736325263301-488931888151",
      duration: "6-9 Months",
      participants: "10-15 Leaders",
      icon: <Zap size={28} />
    },
    {
      name: "HIGH-POTENTIAL NEW HIRES",
      description: "Accelerating the success of high-potential new employees in your enterprise through a 14-week curriculum exploring leadership nuances.",
      target: "High-Potential New Employees",
      benefits: ["14-Week Curriculum", "Leadership Nuances", "New Employee Focus", "Accelerated Success"],
      color: "#00A8E1",
      gradient: "from-[#00A8E1] to-[#0284c7]",
      bgColor: "from-[#00A8E1]/5 to-[#0284c7]/5",
      backgroundImage: "https://images.unsplash.com/photo-1704986528748-bf7ac93bd0d3",
      duration: "14 Weeks",
      participants: "15-20 New Hires",
      icon: <Briefcase size={28} />
    },
    {
      name: "BUSINESS DEVELOPMENT",
      description: "Add value and create even stronger relationships with clients and potential clients. Executives from your company engage with 10-25 clients and/or prospects in customized Vanguard sessions, working on leadership issues that matter most to them.",
      target: "Business Development Executives",
      benefits: ["Client Relationship Building", "Customized Sessions", "Leadership Focus", "Value Creation"],
      color: "#045184",
      gradient: "from-[#045184] to-[#0369a1]",
      bgColor: "from-[#045184]/5 to-[#0369a1]/5",
      backgroundImage: "https://images.unsplash.com/photo-1729459101598-9baa041bd27b",
      duration: "Ongoing",
      participants: "10-25 Clients",
      icon: <Globe size={28} />
    },
    {
      name: "NEXT GENERATION LEADER",
      description: "Based on our top leadership work, helping high-potentials move from 'next level' roles into a C-suite or Partner position. All the technical and managerial competencies that drive success at other levels are insufficient at the higher organizational levels.",
      target: "High-Potential Leaders",
      benefits: ["Six-Month Modular Program", "Face-to-Face & Virtual Elements", "Runs Concurrently with Full-Time Jobs", "Customized to Role or Organization"],
      color: "#00A8E1",
      gradient: "from-[#00A8E1] to-[#0284c7]",
      bgColor: "from-[#00A8E1]/5 to-[#0284c7]/5",
      backgroundImage: "https://images.unsplash.com/photo-1736325263301-488931888151",
      duration: "6 Months",
      participants: "15-20 Leaders",
      icon: <TrendingUp size={28} />
    }
  ];

  const categories = ['All', 'Legal', 'Life Sciences', 'General'];
  const levels = ['All', 'Executive', 'Senior', 'Emerging', 'Entry'];

  const filteredPrograms = currentPrograms.filter(program => {
    const categoryMatch = selectedCategory === 'All' || program.category === selectedCategory;
    const levelMatch = selectedLevel === 'All' || program.level === selectedLevel;
    const searchMatch = searchTerm === '' || 
      program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.audience.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && levelMatch && searchMatch;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-12 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100"
    >
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent mb-8 py-2 leading-tight"
          >
            Leadership Programs
          </motion.h1>
          
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl text-slate-600 max-w-5xl mx-auto leading-relaxed font-medium"
          >
            Discover our comprehensive leadership development ecosystem built on the human factor - from specialized exchanges to fully customized enterprise solutions that prioritize authentic peer connections.
          </motion.p>
        </div>

        {/* Combined Programs Section with Tabs */}
        <div className="mb-16">
          {/* Tab Navigation Block */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden mb-12">
            <div className="text-center py-4 bg-slate-50 border-b border-slate-200">
              <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                Click below to explore our programs
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Current Leadership Programs Tab */}
              <motion.button
                onClick={() => setActiveTab('current')}
                whileHover={{ scale: activeTab !== 'current' ? 1.02 : 1 }}
                whileTap={{ scale: 0.98 }}
                className={`p-8 text-left transition-all duration-300 cursor-pointer relative group ${
                  activeTab === 'current'
                    ? 'bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white shadow-lg'
                    : 'bg-white text-slate-900 hover:bg-blue-50 hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className={`text-3xl font-bold mb-3 ${activeTab === 'current' ? 'text-white' : 'text-slate-900 group-hover:text-[#045184]'}`}>
                      Current Leadership Programs
                    </h2>
                    <p className={`text-lg mb-2 ${activeTab === 'current' ? 'text-white/90' : 'text-slate-600'}`}>
                      Join our established programs designed to accelerate leadership growth through specialized exchanges and expert-led sessions.
                    </p>
                  </div>
                  <div className={`ml-4 flex-shrink-0 transition-transform duration-300 ${activeTab !== 'current' ? 'group-hover:translate-x-1' : ''}`}>
                    <ArrowRight size={28} className={activeTab === 'current' ? 'text-white' : 'text-[#00A8E1]'} />
                  </div>
                </div>
                {activeTab === 'current' && (
                  <div className="mt-3 flex items-center text-sm text-white/80">
                    <CheckCircle2 size={16} className="mr-2" />
                    Currently viewing
                  </div>
                )}
                {activeTab !== 'current' && (
                  <div className="mt-3 flex items-center text-sm text-[#00A8E1] font-semibold">
                    Click to view programs →
                  </div>
                )}
              </motion.button>

              {/* Customized Leadership Solutions Tab */}
              <motion.button
                onClick={() => setActiveTab('customized')}
                whileHover={{ scale: activeTab !== 'customized' ? 1.02 : 1 }}
                whileTap={{ scale: 0.98 }}
                className={`p-8 text-left transition-all duration-300 cursor-pointer relative group border-t md:border-t-0 md:border-l border-slate-200 ${
                  activeTab === 'customized'
                    ? 'bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white shadow-lg'
                    : 'bg-white text-slate-900 hover:bg-blue-50 hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className={`text-3xl font-bold mb-3 ${activeTab === 'customized' ? 'text-white' : 'text-slate-900 group-hover:text-[#045184]'}`}>
                      Customized Leadership Solutions
                    </h2>
                    <p className={`text-lg mb-2 ${activeTab === 'customized' ? 'text-white/90' : 'text-slate-600'}`}>
                      Tailored programs designed specifically for your organization's unique needs and leadership challenges.
                    </p>
                  </div>
                  <div className={`ml-4 flex-shrink-0 transition-transform duration-300 ${activeTab !== 'customized' ? 'group-hover:translate-x-1' : ''}`}>
                    <ArrowRight size={28} className={activeTab === 'customized' ? 'text-white' : 'text-[#00A8E1]'} />
                  </div>
                </div>
                {activeTab === 'customized' && (
                  <div className="mt-3 flex items-center text-sm text-white/80">
                    <CheckCircle2 size={16} className="mr-2" />
                    Currently viewing
                  </div>
                )}
                {activeTab !== 'customized' && (
                  <div className="mt-3 flex items-center text-sm text-[#00A8E1] font-semibold">
                    Click to view programs →
                  </div>
                )}
              </motion.button>
            </div>
          </div>

          {/* Current Programs Content */}
          {activeTab === 'current' && (
            <>
              {/* Programs Grid */}
              <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {currentPrograms.map((program, index) => (
                  <motion.div
                    key={program.name}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 overflow-hidden group flex flex-col"
                    whileHover={{ y: -5 }}
                  >
                    {/* Image Header */}
                    <div className="h-48 bg-cover bg-center relative" style={{ backgroundImage: `url('${program.backgroundImage}')` }}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-[#045184] to-[#00A8E1] opacity-60"></div>
                      
                      {/* Icon and Title Overlay */}
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center gap-4">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-white"
                          >
                            {program.icon}
                          </motion.div>
                          <div>
                            <h3 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors duration-300">{program.name}</h3>
                            <p className="text-sm font-semibold text-white/80">{program.audience}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-8 flex flex-col flex-grow">
                      <p className="text-slate-600 leading-relaxed mb-6 font-medium">
                        {program.description}
                      </p>
                      
                      {/* Program Details */}
                      <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                        <span className="flex items-center gap-2">
                          <Clock size={16} />
                          {program.duration}
                        </span>
                        <span className="flex items-center gap-2">
                          <Users size={16} />
                          {program.participants}
                        </span>
                      </div>
                      
                      {/* Features */}
                      <div className="space-y-3 mb-8 flex-grow">
                        {program.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-start gap-3">
                            <CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-700 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      {/* Action Button */}
                      {program.name === "GENERAL COUNSEL EXCHANGE" ? (
                        <Link to="/gc-exchange" onClick={() => window.scrollTo(0, 0)}>
                          <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#045184] to-[#00A8E1] hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                          >
                            Learn More
                            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                          </motion.button>
                        </Link>
                      ) : program.name === "SENIOR IN-HOUSE COUNSEL EXCHANGE" ? (
                        <Link to="/senior-counsel-exchange" onClick={() => window.scrollTo(0, 0)}>
                          <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#045184] to-[#00A8E1] hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                          >
                            Learn More
                            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                          </motion.button>
                        </Link>
                      ) : program.name === "LIFE SCIENCES CEO EXCHANGE" ? (
                        <Link to="/life-sciences-ceo" onClick={() => window.scrollTo(0, 0)}>
                          <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#045184] to-[#00A8E1] hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                          >
                            Learn More
                            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                          </motion.button>
                        </Link>
                      ) : program.name === "NEXT GENERATION GC" ? (
                        <Link to="/next-gen-gc" onClick={() => window.scrollTo(0, 0)}>
                          <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#045184] to-[#00A8E1] hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                          >
                            Learn More
                            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                          </motion.button>
                        </Link>
                      ) : program.name === "NEW LEADERS PROGRAM" ? (
                        <Link to="/new-leaders" onClick={() => window.scrollTo(0, 0)}>
                          <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#045184] to-[#00A8E1] hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                          >
                            Learn More
                            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                          </motion.button>
                        </Link>
                      ) : program.name === "LAW ASSOCIATES ACCELERATOR" ? (
                        <Link to="/law-associates" onClick={() => window.scrollTo(0, 0)}>
                          <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#045184] to-[#00A8E1] hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                          >
                            Learn More
                            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                          </motion.button>
                        </Link>
                      ) : program.name === "RISK MANAGEMENT EXCHANGE" ? (
                        <Link to="/risk-management" onClick={() => window.scrollTo(0, 0)}>
                          <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#045184] to-[#00A8E1] hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                          >
                            Learn More
                            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                          </motion.button>
                        </Link>
                      ) : (
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#045184] to-[#00A8E1] hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                        >
                          Learn More
                          <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}

          {/* Customized Programs Content */}
          {activeTab === 'customized' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {customizedPrograms.map((program, index) => (
                <motion.div
                  key={program.name}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 overflow-hidden group flex flex-col"
                  whileHover={{ y: -5 }}
                >
                  {/* Image Header */}
                  <div className="h-48 bg-cover bg-center relative" style={{ backgroundImage: `url('${program.backgroundImage}')` }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className={`absolute inset-0 bg-gradient-to-br ${program.gradient} opacity-60`}></div>
                    
                    {/* Icon and Title Overlay */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center gap-4">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-white"
                        >
                          {program.icon}
                        </motion.div>
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors duration-300">{program.name}</h3>
                          <p className="text-sm font-semibold text-white/80">{program.target}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-8 flex flex-col flex-grow">
                    <p className="text-slate-600 leading-relaxed mb-6 font-medium">
                      {program.description}
                    </p>
                    
                    {/* Program Details */}
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                      <span className="flex items-center gap-2">
                        <Clock size={16} />
                        {program.duration}
                      </span>
                      <span className="flex items-center gap-2">
                        <Users size={16} />
                        {program.participants}
                      </span>
                    </div>
                    
                    {/* Benefits */}
                    <div className="space-y-3 mb-8 flex-grow">
                      {program.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-start gap-3">
                          <CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Action Button */}
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#045184] to-[#00A8E1] hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                    >
                      Get Custom Quote
                      <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Call to Action */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <div className="bg-gradient-to-r from-[#045184] to-[#00A8E1] rounded-3xl p-16 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Leadership?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join over 200+ leaders who have accelerated their growth through our proven programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-[#045184] px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-100 transition-all duration-300 flex items-center gap-2"
                >
                  <Mail size={20} />
                  Contact Us
                </motion.button>
              </Link>
              <Link to="/programs" onClick={() => window.scrollTo(0, 0)}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#045184] transition-all duration-300 flex items-center gap-2"
                >
                  <BookOpen size={20} />
                  View All Programs
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProgramsV2;