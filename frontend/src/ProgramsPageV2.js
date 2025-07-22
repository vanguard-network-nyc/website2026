import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search,
  Filter,
  Grid,
  List,
  Clock,
  Users,
  Target,
  BookOpen,
  ArrowRight,
  Mail,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';

const ProgramsPageV2 = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'list'

  const programsData = [
    {
      name: "GC Exchange Program",
      category: "Legal",
      level: "Senior",
      duration: "6 months",
      participants: "12-15",
      status: "Active",
      format: "Roundtable Sessions",
      description: "Connect with fellow General Counsels to share best practices, navigate complex legal challenges, and develop strategic leadership capabilities in a confidential peer setting.",
      keyTakeaways: ["Strategic Legal Leadership", "Risk Management", "Stakeholder Communication", "Board Relations"],
      nextStart: "March 2025",
      price: "$12,500",
      icon: "⚖️",
      image: "/gc-exchange-program.jpg",
      features: ["Monthly Roundtables", "Case Study Analysis", "Expert Guest Speakers", "Confidential Peer Network"]
    },
    {
      name: "Senior Counsel Exchange Program",
      category: "Legal",
      level: "Mid-Senior",
      duration: "4 months",
      participants: "15-20",
      status: "Active",
      format: "Interactive Workshops",
      description: "Designed for senior counsel ready to step into general counsel roles, focusing on business acumen, leadership skills, and strategic thinking.",
      keyTakeaways: ["Business Acumen", "Leadership Development", "Strategic Planning", "Executive Presence"],
      nextStart: "April 2025",
      price: "$8,500",
      icon: "📚",
      image: "/senior-counsel-exchange-program.jpg",
      features: ["Bi-weekly Sessions", "Leadership Assessments", "Mentorship Program", "Career Development Planning"]
    },
    {
      name: "Life Sciences CEO Program",
      category: "Life Sciences",
      level: "C-Suite",
      duration: "8 months",
      participants: "8-12",
      status: "Active",
      format: "Executive Roundtables",
      description: "Elite program for Life Sciences CEOs tackling industry-specific challenges including regulatory compliance, innovation management, and market access strategies.",
      keyTakeaways: ["Regulatory Strategy", "Innovation Leadership", "Market Access", "Investor Relations"],
      nextStart: "February 2025",
      price: "$25,000",
      icon: "🧬",
      image: "/life-sciences-ceo-program.jpg",
      features: ["Monthly CEO Roundtables", "Industry Expert Sessions", "FDA Regulatory Updates", "Investment Strategy Reviews"]
    },
    {
      name: "Next Generation GC Program",
      category: "Legal",
      level: "Emerging",
      duration: "5 months",
      participants: "20-25",
      status: "Active",
      format: "Cohort Learning",
      description: "Accelerate your legal career with comprehensive training in business fundamentals, leadership skills, and modern legal practice management.",
      keyTakeaways: ["Legal Operations", "Technology Integration", "Team Leadership", "Client Relations"],
      nextStart: "May 2025",
      price: "$6,500",
      icon: "🚀",
      image: "/next-generation-gc-program.jpg",
      features: ["Weekly Learning Sessions", "Peer Collaboration", "Technology Training", "Career Coaching"]
    },
    {
      name: "New Leaders Program",
      category: "General",
      level: "Emerging",
      duration: "3 months",
      participants: "25-30",
      status: "Active",
      format: "Intensive Bootcamp",
      description: "Foundation program for emerging leaders across industries, focusing on core leadership principles, communication skills, and team management.",
      keyTakeaways: ["Leadership Fundamentals", "Communication Skills", "Team Building", "Performance Management"],
      nextStart: "March 2025",
      price: "$4,500",
      icon: "💡",
      image: "/new-leaders-program.jpg",
      features: ["Interactive Workshops", "360° Feedback", "Leadership Projects", "Peer Learning Groups"]
    }
  ];

  const categories = ['All', ...new Set(programsData.map(p => p.category))];
  const levels = ['All', ...new Set(programsData.map(p => p.level))];

  const filteredPrograms = programsData.filter(program => {
    const matchesCategory = selectedCategory === 'All' || program.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || program.level === selectedLevel;
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.keyTakeaways.some(takeaway => takeaway.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesLevel && matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-12 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Modern Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#045184] to-[#00A8E1] flex items-center justify-center shadow-lg"
            >
              <BookOpen size={32} className="text-white" />
            </motion.div>
            <div className="h-1 w-20 bg-gradient-to-r from-[#045184] to-[#00A8E1] rounded-full"></div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent">
            Leadership Programs V2
          </h1>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium">
            Discover our comprehensive suite of leadership development programs designed to accelerate your career and enhance your strategic impact. Enhanced with modern interactive features.
          </p>
        </motion.div>

        {/* Enhanced Search and Filter Bar */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-12 border border-slate-200"
        >
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-2xl mx-auto">
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search programs, skills, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-200 focus:border-[#00A8E1] focus:outline-none text-lg font-medium transition-all duration-300"
              />
            </div>
          </div>

          {/* Filters and View Toggle */}
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-bold text-slate-600 mr-2 flex items-center">
                <Filter size={16} className="mr-1" />
                Category:
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
            <div className="flex flex-wrap gap-2">
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
          <div className="mt-4 text-center">
            <p className="text-slate-600 font-medium">
              Showing <span className="font-bold text-[#045184]">{filteredPrograms.length}</span> program{filteredPrograms.length !== 1 ? 's' : ''} 
              {selectedCategory !== 'All' && <span> in <span className="font-bold">{selectedCategory}</span></span>}
              {selectedLevel !== 'All' && <span> for <span className="font-bold">{selectedLevel}</span> level</span>}
              {searchTerm && <span> matching "<span className="font-bold">{searchTerm}</span>"</span>}
            </p>
          </div>
        </motion.div>

        {/* Programs Display */}
        {viewMode === 'cards' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredPrograms.map((program, index) => (
              <motion.div
                key={program.name}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
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
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
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
                    <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl shadow-lg">
                      {program.icon}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white px-3 py-1 rounded-lg text-sm font-bold shadow-lg">
                      {program.price}
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
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#045184] transition-colors duration-300">
                    {program.name}
                  </h3>

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

                  {/* Key Takeaways */}
                  <div className="mb-6">
                    <h4 className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1">
                      <Target size={12} />
                      KEY TAKEAWAYS
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {program.keyTakeaways.slice(0, 3).map((takeaway, i) => (
                        <span key={i} className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-medium">
                          {takeaway}
                        </span>
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

                  {/* Next Start Date */}
                  <p className="text-center text-xs text-slate-500 mt-3 font-medium">
                    Next session starts: <span className="font-bold text-[#045184]">{program.nextStart}</span>
                  </p>
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
                transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
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
                      <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                        {program.status}
                      </span>
                    </div>
                    
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

                  {/* Price and CTA */}
                  <div className="lg:col-span-1 text-center">
                    <div className="text-2xl font-bold text-[#045184] mb-2">{program.price}</div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white px-4 py-2 rounded-lg font-bold text-sm transition-all duration-300 shadow-md hover:shadow-lg group/btn"
                    >
                      <span className="flex items-center gap-1">
                        Apply
                        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </span>
                    </motion.button>
                    <p className="text-xs text-slate-500 mt-1">
                      Starts {program.nextStart}
                    </p>
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
          </motion.div>
        )}

        {/* Enhanced CTA Section */}
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
            
            <h2 className="text-5xl font-bold text-white mb-8">Ready to Elevate Your Leadership?</h2>
            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of leaders who have transformed their careers through our proven programs. Take the next step in your leadership journey today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-white text-[#045184] px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                <span className="flex items-center justify-center gap-3">
                  Browse All Programs
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 border-2 border-white hover:bg-white hover:text-[#045184]"
              >
                <span className="flex items-center justify-center gap-3">
                  Contact Our Team
                  <Mail size={20} className="group-hover:scale-110 transition-transform duration-300" />
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProgramsPageV2;