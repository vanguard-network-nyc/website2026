import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  ChevronDown
} from 'lucide-react';

const ProgramsV2 = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [viewMode, setViewMode] = useState('cards');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('current');

  const currentPrograms = [
    {
      name: "GC EXCHANGE",
      description: "A highly pragmatic leadership problem-solving group that meets monthly, moderated by Vanguard. Monthly, in virtual format; face-to-face sessions occur at our bi-annual Forums.",
      format: "Monthly Virtual + Bi-annual In-Person",
      audience: "General Counsel",
      icon: <Shield size={28} />,
      category: "Legal",
      level: "Executive",
      status: "Active",
      image: "/gc-exchange-program.jpg",
      duration: "Ongoing",
      participants: "12-15",
      features: ["Monthly Problem-Solving Sessions", "Bi-annual Forums", "Peer Networking", "Vanguard Moderation"]
    },
    {
      name: "SENIOR IN-HOUSE COUNSEL EXCHANGE",
      description: "An exchange for GCs' immediate reports to compare notes and solve problems together. Monthly, in virtual format.",
      format: "Monthly Virtual",
      audience: "Senior In-House Counsel",
      icon: <BookOpen size={28} />,
      category: "Legal",
      level: "Senior",
      status: "Active",
      image: "/senior-counsel-exchange-program.jpg",
      duration: "Ongoing",
      participants: "10-12",
      features: ["Monthly Virtual Sessions", "Problem Solving Focus", "Peer Collaboration", "Experience Sharing"]
    },
    {
      name: "LIFE SCIENCES CEO EXCHANGES",
      description: "For Life Sciences CEOs, focusing on leadership aspects rather than day-to-day tasks. Discussions include AI in development and commercialization. Quarterly, in virtual format, with face-to-face sessions bi-annually.",
      format: "Quarterly Virtual + Bi-annual In-Person",
      audience: "Life Sciences CEOs",
      icon: <Award size={28} />,
      category: "Life Sciences",
      level: "Executive",
      status: "Active",
      image: "/life-sciences-ceo-program.jpg",
      duration: "Ongoing",
      participants: "8-10",
      features: ["Leadership Focus", "AI Innovation Discussions", "Industry-Specific Content", "Executive Networking"]
    },
    {
      name: "NEXT GENERATION GC",
      description: "A six-month program to accelerate the trajectory of potential GCs, uniquely developed and led by Vanguard General Counsel Members.",
      format: "6-Month Program",
      audience: "Future General Counsel",
      icon: <Target size={28} />,
      category: "Legal",
      level: "Emerging",
      status: "Enrollment Open",
      image: "/next-generation-gc-program.jpg",
      duration: "6 Months",
      participants: "15-20",
      features: ["Accelerated Development", "GC Member Led", "Career Trajectory Focus", "Future Leader Preparation"]
    },
    {
      name: "NEW LEADERS PROGRAM",
      description: "A six to twelve month program to jump-start leadership capabilities among graduate students and newer hires, led by more senior executives. Highly pragmatic focus on capabilities.",
      format: "6-12 Month Program",
      audience: "Graduate Students & New Hires",
      icon: <Users size={28} />,
      category: "General",
      level: "Entry",
      status: "Enrollment Open",
      image: "/new-leaders-program.jpg",
      duration: "6-12 Months",
      participants: "20-25",
      features: ["Pragmatic Capability Building", "Senior Executive Led", "Early Career Focus", "Leadership Foundation"]
    }
  ];

  const customPrograms = [
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
      icon: <Award size={32} />
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
      icon: <Target size={32} />
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
      icon: <Users size={32} />
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
      icon: <BookOpen size={32} />
    }
  ];

  const categories = ['All', 'Legal', 'Life Sciences', 'General'];
  const levels = ['All', 'Executive', 'Senior', 'Emerging', 'Entry'];

  const filteredPrograms = currentPrograms.filter(program => {
    const categoryMatch = selectedCategory === 'All' || program.category === selectedCategory;
    const levelMatch = selectedLevel === 'All' || program.level === selectedLevel;
    const searchMatch = !searchTerm || 
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
      className="pt-24 pb-12 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100"
    >
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#045184] to-[#00A8E1] flex items-center justify-center shadow-lg"
            >
              <BookOpen size={32} className="text-white" />
            </motion.div>
            <div className="h-1 w-24 bg-gradient-to-r from-[#045184] to-[#00A8E1] rounded-full"></div>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent">
            Leadership Programs
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium">
            Comprehensive development programs designed to accelerate leadership growth at every level through specialized exchanges and customized curricula.
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
        >
          {[
            { label: "Active Programs", value: "5+", icon: <Award size={24} />, color: "from-blue-500 to-cyan-500" },
            { label: "Program Participants", value: "200+", icon: <Users size={24} />, color: "from-purple-500 to-pink-500" },
            { label: "Success Rate", value: "95%", icon: <Target size={24} />, color: "from-green-500 to-emerald-500" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-white mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-[#045184] mb-2">{stat.value}</div>
              <div className="text-slate-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-slate-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('current')}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-2 ${
                  activeTab === 'current'
                    ? 'bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white shadow-lg'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                <Award size={16} />
                Current Programs
              </button>
              <button
                onClick={() => setActiveTab('custom')}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-2 ${
                  activeTab === 'custom'
                    ? 'bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white shadow-lg'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                <Target size={16} />
                Custom Solutions
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {activeTab === 'current' && (
            <motion.div
              key="current"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Search and Filters for Current Programs */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="bg-white rounded-2xl shadow-lg p-6 mb-12 border border-slate-200"
              >
                {/* Search Bar */}
                <div className="mb-6">
                  <div className="relative max-w-2xl mx-auto">
                    <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search programs, audience, or keywords..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-200 focus:border-[#00A8E1] focus:outline-none text-lg font-medium transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Filters and View Toggle */}
                <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                  {/* Category Filter */}
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-sm font-bold text-slate-600 mr-2 flex items-center">
                      <Filter size={16} className="mr-1" />
                      Industry:
                    </span>
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                          selectedCategory === category
                            ? 'bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white shadow-lg scale-105'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:scale-102'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>

                  {/* Level Filter */}
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-sm font-bold text-slate-600 mr-2 flex items-center">
                      <TrendingUp size={16} className="mr-1" />
                      Level:
                    </span>
                    {levels.map((level) => (
                      <button
                        key={level}
                        onClick={() => setSelectedLevel(level)}
                        className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                          selectedLevel === level
                            ? 'bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white shadow-lg scale-105'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:scale-102'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex bg-slate-100 rounded-xl p-1">
                    <button
                      onClick={() => setViewMode('cards')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                        viewMode === 'cards'
                          ? 'bg-white text-[#045184] shadow-md'
                          : 'text-slate-600 hover:text-slate-800'
                      }`}
                    >
                      <Grid size={16} />
                      Cards
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                        viewMode === 'list'
                          ? 'bg-white text-[#045184] shadow-md'
                          : 'text-slate-600 hover:text-slate-800'
                      }`}
                    >
                      <List size={16} />
                      List
                    </button>
                  </div>
                </div>

                {/* Results Count */}
                <div className="mt-6 text-center">
                  <p className="text-slate-600 font-medium">
                    Showing <span className="font-bold text-[#045184]">{filteredPrograms.length}</span> program{filteredPrograms.length !== 1 ? 's' : ''} 
                    {selectedCategory !== 'All' && <span> in <span className="font-bold">{selectedCategory}</span></span>}
                    {selectedLevel !== 'All' && <span> for <span className="font-bold">{selectedLevel}</span> level</span>}
                    {searchTerm && <span> matching "<span className="font-bold">{searchTerm}</span>"</span>}
                  </p>
                </div>
              </motion.div>

              {/* Current Programs Display */}
              {viewMode === 'cards' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredPrograms.map((program, index) => (
                    <motion.div
                      key={program.name}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + index * 0.1, duration: 0.6 }}
                      className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-[#00A8E1]/30"
                      whileHover={{ y: -8, scale: 1.02 }}
                    >
                      {/* Card Header with Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={program.image}
                          alt={program.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                        
                        {/* Status Badge */}
                        <div className="absolute top-4 right-4">
                          <span className={`px-3 py-1 text-xs font-bold rounded-full backdrop-blur-sm ${
                            program.status === 'Active' 
                              ? 'bg-green-500/90 text-white' 
                              : 'bg-blue-500/90 text-white'
                          }`}>
                            {program.status}
                          </span>
                        </div>

                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/90 backdrop-blur-sm text-slate-700 px-3 py-1 rounded-full text-xs font-bold">
                            {program.category}
                          </span>
                        </div>

                        {/* Program Icon */}
                        <div className="absolute bottom-4 left-4">
                          <div 
                            className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl shadow-lg"
                            style={{ 
                              background: program.category === 'Legal' 
                                ? 'rgba(4, 81, 132, 0.9)'
                                : program.category === 'Life Sciences'
                                ? 'rgba(0, 168, 225, 0.9)'
                                : 'rgba(99, 102, 241, 0.9)'
                            }}
                          >
                            <div className="text-white text-lg">{program.icon}</div>
                          </div>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-6">
                        {/* Quick Info Bar */}
                        <div className="flex items-center gap-3 mb-4 text-xs">
                          <span className="flex items-center gap-1 text-slate-500">
                            <Clock size={14} />
                            {program.duration}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="flex items-center gap-1 text-slate-500">
                            <Users size={14} />
                            {program.participants}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="text-[#00A8E1] font-bold">{program.level}</span>
                        </div>

                        {/* Program Title */}
                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#045184] transition-colors duration-300">
                          {program.name}
                        </h3>

                        {/* Audience */}
                        <p className="text-sm font-bold text-[#00A8E1] mb-3">{program.audience}</p>

                        {/* Format Highlight */}
                        <div className="bg-gradient-to-r from-[#045184]/10 to-[#00A8E1]/10 rounded-lg p-3 mb-4">
                          <p className="text-sm font-bold text-[#045184] flex items-center gap-2">
                            <BookOpen size={16} />
                            {program.format}
                          </p>
                        </div>

                        {/* Description */}
                        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                          {program.description}
                        </p>

                        {/* Features */}
                        <div className="mb-6">
                          <h4 className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1">
                            <CheckCircle2 size={12} />
                            KEY FEATURES
                          </h4>
                          <div className="space-y-1">
                            {program.features.slice(0, 2).map((feature, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                                <div className="w-1.5 h-1.5 bg-[#00A8E1] rounded-full"></div>
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* CTA Button */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white py-3 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-xl group/btn relative overflow-hidden"
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            Learn More & Apply
                            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-[#00A8E1] to-[#045184] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                /* List View */
                <div className="space-y-4">
                  {filteredPrograms.map((program, index) => (
                    <motion.div
                      key={program.name}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + index * 0.1, duration: 0.6 }}
                      className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#00A8E1]/30"
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 items-center">
                        {/* Program Image and Icon */}
                        <div className="lg:col-span-1">
                          <div className="relative">
                            <img
                              src={program.image}
                              alt={program.name}
                              className="w-20 h-20 rounded-xl object-cover shadow-md"
                            />
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-lg text-lg">
                              {program.icon}
                            </div>
                          </div>
                        </div>

                        {/* Program Details */}
                        <div className="lg:col-span-3">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#045184] transition-colors duration-300">
                              {program.name}
                            </h3>
                            <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                              program.status === 'Active' 
                                ? 'bg-green-500 text-white' 
                                : 'bg-blue-500 text-white'
                            }`}>
                              {program.status}
                            </span>
                          </div>
                          
                          <p className="text-sm font-bold text-[#00A8E1] mb-2">{program.audience}</p>
                          <p className="text-slate-600 text-sm mb-3 line-clamp-2">
                            {program.description}
                          </p>
                          
                          <div className="flex flex-wrap items-center gap-3 text-xs">
                            <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-full font-medium">
                              {program.category}
                            </span>
                            <span className="flex items-center gap-1 text-slate-500">
                              <Clock size={12} />
                              {program.duration}
                            </span>
                            <span className="flex items-center gap-1 text-slate-500">
                              <Users size={12} />
                              {program.participants}
                            </span>
                            <span className="text-[#00A8E1] font-bold">{program.level}</span>
                          </div>
                        </div>

                        {/* Key Features */}
                        <div className="lg:col-span-1">
                          <h4 className="text-xs font-bold text-slate-700 mb-2">Features:</h4>
                          <div className="space-y-1">
                            {program.features.slice(0, 2).map((feature, i) => (
                              <div key={i} className="flex items-center gap-1 text-xs text-slate-600">
                                <CheckCircle2 size={10} className="text-green-500 flex-shrink-0" />
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* CTA */}
                        <div className="lg:col-span-1 text-center">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white px-4 py-2 rounded-lg font-bold text-sm transition-all duration-300 shadow-md hover:shadow-lg group/btn w-full"
                          >
                            <span className="flex items-center gap-1 justify-center">
                              Apply
                              <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                            </span>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* No Results State */}
              {filteredPrograms.length === 0 && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className="text-8xl mb-6">🔍</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">No programs match your criteria</h3>
                  <p className="text-slate-600 mb-8 max-w-md mx-auto">
                    Try adjusting your filters or search terms to discover more leadership programs.
                  </p>
                  <div className="flex gap-3 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedCategory('All');
                        setSelectedLevel('All');
                        setSearchTerm('');
                      }}
                      className="bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Clear All Filters
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'custom' && (
            <motion.div
              key="custom"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Custom Programs Header */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-center mb-16 relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#00A8E1]/5 to-[#045184]/5 rounded-3xl transform skew-y-1"></div>
                <div className="relative py-16 px-8">
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#00A8E1] to-[#045184] flex items-center justify-center">
                      <Target size={24} className="text-white" />
                    </div>
                    <span className="px-4 py-2 bg-gradient-to-r from-[#00A8E1] to-[#045184] text-white text-sm font-bold rounded-full tracking-wider">
                      CUSTOM SOLUTIONS
                    </span>
                  </div>
                  <h2 className="text-5xl font-bold text-slate-900 mb-8 leading-tight">Customized Leadership Programs</h2>
                  <p className="text-xl text-slate-600 max-w-4xl mx-auto font-medium leading-relaxed">
                    Tailored programs designed specifically for your organization's unique needs and leadership challenges.
                  </p>
                </div>
              </motion.div>

              {/* Custom Programs Grid */}
              <div className="space-y-12">
                {customPrograms.map((program, index) => (
                  <motion.div
                    key={program.name}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + index * 0.2, duration: 0.8 }}
                    className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-slate-200"
                    whileHover={{ y: -8 }}
                  >
                    <div className="grid grid-cols-1 xl:grid-cols-5 gap-0">
                      {/* Content Section */}
                      <div className="xl:col-span-3 p-10">
                        <div className="flex items-start gap-6 mb-8">
                          <motion.div 
                            whileHover={{ rotate: 5, scale: 1.1 }}
                            className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-r ${program.gradient} shadow-lg`}
                          >
                            {program.icon}
                          </motion.div>
                          <div className="flex-1">
                            <h3 className="text-3xl font-bold text-slate-900 mb-3 group-hover:text-[#045184] transition-colors duration-300">{program.name}</h3>
                            <p className="text-lg font-bold mb-2" style={{ color: program.color }}>{program.target}</p>
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
                        
                        <p className="text-slate-600 leading-relaxed mb-8 text-lg font-medium">{program.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {program.benefits.map((benefit, benefitIndex) => (
                            <motion.div 
                              key={benefitIndex} 
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.3 + index * 0.2 + benefitIndex * 0.1 }}
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
                              Get Details
                              <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                            </span>
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                          </motion.button>
                          
                          <p className="text-slate-600 mt-4 text-sm font-medium">
                            Custom consultation available
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Call to Action */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-20 text-center bg-gradient-to-r from-[#045184] via-[#00A8E1] to-[#045184] rounded-3xl p-16 relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-8 left-8 w-32 h-32 rounded-full bg-white/20"></div>
            <div className="absolute top-20 right-16 w-24 h-24 rounded-full bg-white/15"></div>
            <div className="absolute bottom-12 left-1/4 w-40 h-40 rounded-full bg-white/10"></div>
            <div className="absolute bottom-8 right-8 w-28 h-28 rounded-full bg-white/25"></div>
          </div>
          
          <div className="relative z-10">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-8"
            >
              <Target size={40} className="text-white" />
            </motion.div>
            
            <h2 className="text-5xl font-bold text-white mb-8">Ready to Accelerate Your Leadership Journey?</h2>
            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join our comprehensive leadership programs and connect with like-minded executives committed to excellence and continuous growth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-white text-[#045184] px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                <span className="flex items-center justify-center gap-3">
                  Explore Current Programs
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 border-2 border-white hover:bg-white hover:text-[#045184]"
              >
                <span className="flex items-center justify-center gap-3">
                  Request Custom Program
                  <Mail size={20} className="group-hover:scale-110 transition-transform duration-300" />
                </span>
              </motion.button>
            </div>

            {/* Final Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { label: "Active Programs", value: "15+", icon: <Award size={24} /> },
                { label: "Industry Leaders", value: "500+", icon: <Users size={24} /> },
                { label: "Years Experience", value: "25+", icon: <Target size={24} /> }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.0 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center mb-3 text-white/80">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-white/80 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProgramsV2;