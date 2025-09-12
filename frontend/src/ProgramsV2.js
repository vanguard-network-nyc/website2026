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

  const currentPrograms = [
    {
      name: "GC EXCHANGE",
      description: "A highly pragmatic leadership problem-solving group that meets monthly, moderated by Vanguard. Monthly, in virtual format; face-to-face sessions occur at our bi-annual Forums.",
      format: "Monthly Virtual + Bi-annual In-Person",
      audience: "General Counsel",
      category: "Legal",
      level: "Executive",
      status: "Active",
      image: "/gc-exchange-program.jpg",
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
      duration: "Ongoing",
      participants: "10-12",
      features: ["Monthly Virtual Sessions", "Problem-Solving Focus", "Peer Collaboration", "GC Reports Network"],
      icon: <BookOpen size={28} />
    },
    {
      name: "LIFE SCIENCES CEO EXCHANGES",
      description: "For Life Sciences CEOs, focusing on leadership aspects rather than day-to-day tasks. Discussions include AI in development and commercialization. Quarterly, in virtual format, with face-to-face sessions bi-annually.",
      format: "Quarterly Virtual + Bi-annual In-Person",
      audience: "Life Sciences CEOs",
      category: "Life Sciences",
      level: "Executive",
      status: "Active",
      image: "/life-sciences-ceo-program.jpg",
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
      duration: "6-12 Months",
      participants: "20-25",
      features: ["Leadership Jump-Start", "Senior Executive Led", "Pragmatic Focus", "Graduate & New Hire"],
      icon: <Users size={28} />
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
      duration: "Ongoing",
      participants: "10-25 Clients",
      icon: <Globe size={28} />
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
            className="text-7xl font-bold bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent mb-8"
          >
            Leadership Programs
          </motion.h1>
          
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl text-slate-600 max-w-5xl mx-auto leading-relaxed font-medium"
          >
            Discover our comprehensive leadership development ecosystem - from specialized exchanges to fully customized enterprise solutions.
          </motion.p>
        </div>

        {/* Current Programs Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-slate-900 mb-4">
              Current Leadership Programs
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Join our established programs designed to accelerate leadership growth through specialized exchanges and expert-led sessions.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-2xl p-8 shadow-xl mb-12 border border-slate-200">
                <div className="flex flex-col lg:flex-row gap-6 items-center">
                  {/* Search */}
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search programs, audience, or keywords..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A8E1] focus:border-transparent text-lg"
                    />
                  </div>
                  
                  {/* Filters */}
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <Filter size={20} className="text-slate-500" />
                      <span className="text-slate-600 font-medium">Industry:</span>
                      <div className="flex gap-2">
                        {categories.map(category => (
                          <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                              selectedCategory === category
                                ? 'bg-[#00A8E1] text-white shadow-lg'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <TrendingUp size={20} className="text-slate-500" />
                      <span className="text-slate-600 font-medium">Level:</span>
                      <div className="flex gap-2">
                        {levels.map(level => (
                          <button
                            key={level}
                            onClick={() => setSelectedLevel(level)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                              selectedLevel === level
                                ? 'bg-[#045184] text-white shadow-lg'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-slate-600 font-medium">
                    Showing {filteredPrograms.length} programs
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-slate-600 font-medium">View:</span>
                    <div className="flex bg-slate-100 rounded-lg p-1">
                      <button
                        onClick={() => setViewMode('cards')}
                        className={`p-2 rounded-md transition-all duration-200 ${
                          viewMode === 'cards'
                            ? 'bg-white text-[#00A8E1] shadow-sm'
                            : 'text-slate-600 hover:text-slate-800'
                        }`}
                      >
                        <Grid size={20} />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-md transition-all duration-200 ${
                          viewMode === 'list'
                            ? 'bg-white text-[#00A8E1] shadow-sm'
                            : 'text-slate-600 hover:text-slate-800'
                        }`}
                      >
                        <List size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Programs Grid */}
              <div className={`grid gap-8 ${viewMode === 'cards' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
                {filteredPrograms.map((program, index) => (
                  <motion.div
                    key={program.name}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-slate-200"
                  >
                    <div className="relative h-80 overflow-hidden">
                      <img
                        src={program.image}
                        alt={program.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                          program.status === 'Active' 
                            ? 'bg-green-500 text-white' 
                            : 'bg-yellow-500 text-white'
                        }`}>
                          {program.status}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <div className="flex items-center gap-2">
                          <div className="text-white">{program.icon}</div>
                          <span className="text-white font-bold text-lg">{program.category}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-bold text-slate-900 group-hover:text-[#045184] transition-colors">
                          {program.name}
                        </h3>
                        <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                          {program.level}
                        </span>
                      </div>
                      
                      <p className="text-slate-600 mb-6 leading-relaxed">
                        {program.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-[#00A8E1]" />
                          <span className="text-sm text-slate-600">{program.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users size={16} className="text-[#00A8E1]" />
                          <span className="text-sm text-slate-600">{program.participants}</span>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="font-semibold text-slate-800 mb-3">Key Features:</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {program.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center gap-2">
                              <CheckCircle2 size={16} className="text-green-500" />
                              <span className="text-sm text-slate-600">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {program.name === "GC EXCHANGE" ? (
                        <Link 
                          to="/gc-exchange"
                          className="w-full bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white py-4 px-6 rounded-xl font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                        >
                          Learn More
                          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                      ) : program.name === "NEW LEADERS PROGRAM" ? (
                        <Link 
                          to="/new-leaders"
                          className="w-full bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white py-4 px-6 rounded-xl font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                        >
                          Learn More
                          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                      ) : (
                        <button className="w-full bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white py-4 px-6 rounded-xl font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group">
                          Learn More
                          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
          </div>

        {/* Customized Programs Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-slate-900 mb-4">
              Customized Leadership Solutions
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Tailored programs designed specifically for your organization's unique needs and leadership challenges.
            </p>
          </div>

          <div className="grid gap-8">
            {customizedPrograms.map((program, index) => (
              <motion.div
                key={program.name}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-slate-200 group"
              >
                  <div className="grid grid-cols-1 xl:grid-cols-5 gap-0">
                    {/* Content Section */}
                    <div className="xl:col-span-3 p-10">
                      <div className="flex items-start gap-6 mb-8">
                        <motion.div 
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-r ${program.gradient} shadow-lg`}
                        >
                          <div className="text-white">{program.icon}</div>
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="text-3xl font-bold text-slate-900 mb-3 group-hover:text-[#045184] transition-colors duration-300">
                            {program.name}
                          </h3>
                          <p className="text-lg font-bold mb-2" style={{ color: program.color }}>
                            {program.target}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-slate-500">
                            <span className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-500"></div>
                              Duration: {program.duration}
                            </span>
                            <span className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                              Participants: {program.participants}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-slate-600 leading-relaxed mb-8 text-lg font-medium">
                        {program.description}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {program.benefits.map((benefit, benefitIndex) => (
                          <motion.div 
                            key={benefitIndex} 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 + benefitIndex * 0.1 }}
                            className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 group-hover:bg-slate-100 transition-colors duration-300"
                          >
                            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${program.gradient}`}></div>
                            <span className="text-slate-700 font-medium">{benefit}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Action Section */}
                    <div className={`xl:col-span-2 p-10 bg-gradient-to-br ${program.bgColor} flex items-center justify-center relative overflow-hidden`}>
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-4 right-4 w-32 h-32 rounded-full bg-white/20"></div>
                        <div className="absolute bottom-4 left-4 w-20 h-20 rounded-full bg-white/10"></div>
                      </div>
                      
                      <div className="text-center relative z-10">
                        <motion.div 
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className={`w-32 h-32 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl bg-gradient-to-r ${program.gradient}`}
                        >
                          <BookOpen size={56} className="text-white" />
                        </motion.div>
                        
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`group/btn text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl bg-gradient-to-r ${program.gradient} relative overflow-hidden`}
                        >
                          <span className="relative z-10 flex items-center gap-3">
                            Get Custom Quote
                            <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                          </span>
                          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                        </motion.button>
                        
                        <p className="text-slate-600 mt-4 text-sm font-medium">
                          Free consultation available
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Call to Action */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <div className="bg-gradient-to-r from-[#045184] to-[#00A8E1] rounded-3xl p-16 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Leadership?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join over 200+ leaders who have accelerated their growth through our proven programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#045184] px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-100 transition-all duration-300 flex items-center gap-2"
              >
                <Mail size={20} />
                Contact Us
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#045184] transition-all duration-300 flex items-center gap-2"
              >
                <BookOpen size={20} />
                View All Programs
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProgramsV2;