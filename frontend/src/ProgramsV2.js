import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';
import SEO from './SEO';
import { 
  Shield, 
  BookOpen, 
  Award, 
  Target, 
  Users, 
  ArrowRight,
  Mail,
  Clock,
  TrendingUp,
  CheckCircle2,
  Star,
  Zap,
  Briefcase,
  Globe
} from 'lucide-react';

const ProgramsV2 = () => {
  const [activeTab, setActiveTab] = useState('current'); // 'current' or 'customized'

  // Map tab keys to their corresponding hash IDs
  const tabToHash = {
    'current': 'current-programs',
    'customized': 'customized-solutions'
  };

  // Handle tab change and update URL hash
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    const hash = tabToHash[tab];
    if (hash) {
      window.history.replaceState(null, '', `#${hash}`);
    }
  };

  // Handle hash navigation on page load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      if (id === 'current-programs') {
        setActiveTab('current');
      } else if (id === 'customized-solutions') {
        setActiveTab('customized');
      }
      // Scroll to the programs section after a short delay
      setTimeout(() => {
        const element = document.getElementById('programs-tabs-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  }, []);

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
      backgroundImage: "https://customer-assets.emergentagent.com/job_tab-interface-ui/artifacts/tgsz0vgk_1.jpg",
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
      backgroundImage: "https://customer-assets.emergentagent.com/job_tab-interface-ui/artifacts/m8lgl096_2.png",
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
      backgroundImage: "https://customer-assets.emergentagent.com/job_tab-interface-ui/artifacts/ktdnet3n_3.jpg",
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
      backgroundImage: "https://customer-assets.emergentagent.com/job_tab-interface-ui/artifacts/xve7cseq_4.png",
      duration: "6 Months",
      participants: "15-20",
      features: ["6-Month Acceleration", "GC-Led Development", "Career Trajectory", "Vanguard Exclusive"],
      icon: <Target size={28} />
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
      backgroundImage: "https://customer-assets.emergentagent.com/job_tab-interface-ui/artifacts/87tq6qrj_6.png",
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
      backgroundImage: "https://customer-assets.emergentagent.com/job_tab-interface-ui/artifacts/oue0cjec_7.jpg",
      duration: "Annual Membership",
      participants: "Senior Risk Leaders",
      features: ["Monthly Virtual Exchanges", "Guest Expert Insights", "Confidential Peer Discussions", "Actionable Playbooks"],
      icon: <Shield size={28} />
    }
  ];

  const customizedPrograms = [
    {
      name: "NEW LEADERS PROGRAM",
      description: "A six to twelve month program to jump-start leadership capabilities among graduate students and newer hires, led by more senior executives. Highly pragmatic focus on capabilities.",
      target: "Graduate Students & New Hires",
      benefits: ["Leadership Jump-Start", "Senior Executive Led", "Pragmatic Focus", "Graduate & New Hire"],
      color: "#00A8E1",
      gradient: "from-[#00A8E1] to-[#0284c7]",
      bgColor: "from-[#00A8E1]/5 to-[#0284c7]/5",
      backgroundImage: "https://customer-assets.emergentagent.com/job_tab-interface-ui/artifacts/0ctnnbou_5.jpg",
      duration: "6-12 Months",
      participants: "20-25",
      icon: <Users size={28} />
    },
    {
      name: "CEO & C-SUITE",
      description: "Customized programs to yield high-performance amongst C-suite leaders across a portfolio of companies or global teams using the Vanguard roundtable model.",
      target: "C-Suite Executives",
      benefits: ["High-Performance Leadership", "Roundtable Model", "Portfolio Companies", "Global Teams"],
      color: "#00A8E1",
      gradient: "from-[#00A8E1] to-[#0284c7]",
      bgColor: "from-[#00A8E1]/5 to-[#0284c7]/5",
      backgroundImage: "https://customer-assets.emergentagent.com/job_tab-interface-ui/artifacts/4gftt4re_8.jpeg",
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
      backgroundImage: "https://customer-assets.emergentagent.com/job_tab-interface-ui/artifacts/8v0udasx_9.jpg",
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
      backgroundImage: "https://customer-assets.emergentagent.com/job_tab-interface-ui/artifacts/4qxgffga_10.jpg",
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
      backgroundImage: "https://customer-assets.emergentagent.com/job_tab-interface-ui/artifacts/j0blfj1g_11.jpg",
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
      backgroundImage: "https://customer-assets.emergentagent.com/job_tab-interface-ui/artifacts/negymstw_12.jpg",
      duration: "6 Months",
      participants: "15-20 Leaders",
      icon: <TrendingUp size={28} />
    }
  ];

  return (
    <div className="pt-40 pb-12 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100"
    >
      <SEO 
        title="Leadership Programs"
        description="Transform your leadership with our customized programs for GCs, senior counsel, and executives. Real-world focused, led by experienced CEOs and senior leaders."
        faq={[
          {
            question: "What types of leadership programs does The Vanguard Network offer?",
            answer: "We offer a variety of programs including the Vanguard Accelerator for General Counsel, Next Level for Senior Counsel, New Leaders Program for graduates and new hires, CEO & C-Suite roundtables, Next Generation C-Suite development, and customized programs for high-potential leaders."
          },
          {
            question: "How long are the leadership programs?",
            answer: "Program durations vary based on objectives. The Vanguard Accelerator runs for 6-9 months, the Next Level program is 6-12 months, New Leaders Program is 6-12 months, and the High-Potential New Hires curriculum is 14 weeks. Custom programs can be tailored to your organization's needs."
          },
          {
            question: "Who leads the leadership programs?",
            answer: "Our programs are led by experienced CEOs, senior executives, and leadership development experts. They bring real-world experience and focus on practical, applicable leadership skills rather than theoretical concepts."
          },
          {
            question: "Can programs be customized for our organization?",
            answer: "Yes, all our programs can be customized to meet your organization's specific needs. We work with enterprises to tailor content, duration, and format to align with your leadership development goals and company culture."
          },
          {
            question: "What is the format of the programs?",
            answer: "Programs combine face-to-face sessions with virtual elements, allowing participants to continue their full-time roles while developing their leadership capabilities. Formats include peer exchanges, roundtables, one-on-one coaching, and group problem-solving sessions."
          }
        ]}
      />
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8 mb-16">
        <Breadcrumb />
        <div className="text-center mb-16">
          <h1 
            className="text-3xl md:text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent mb-8 py-2 leading-tight"
          >
            Leadership Programs
          </h1>
          
          <motion.p 
          <p
            className="text-2xl text-slate-600 max-w-5xl mx-auto leading-relaxed font-medium"
          >
          </p>
        </div>

        {/* Combined Programs Section with Tabs */}
        <div className="mb-16">
          {/* Mobile Tab Navigation - Horizontal Tabs */}
          <div id="programs-tabs-section-mobile" className="md:hidden mb-6" style={{ scrollMarginTop: '100px' }}>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide text-center mb-4">
              Select a program type
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleTabChange('current')}
                className={`px-3 py-4 rounded-xl font-semibold text-xs transition-all duration-300 text-center leading-tight ${
                  activeTab === 'current'
                    ? 'bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white shadow-lg'
                    : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-[#00A8E1]'
                }`}
              >
                <span className="block">Current</span>
                <span className="block">Programs</span>
              </button>
              <button
                onClick={() => handleTabChange('customized')}
                className={`px-3 py-4 rounded-xl font-semibold text-xs transition-all duration-300 text-center leading-tight ${
                  activeTab === 'customized'
                    ? 'bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white shadow-lg'
                    : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-[#00A8E1]'
                }`}
              >
                <span className="block">Customized</span>
                <span className="block">Solutions</span>
              </button>
            </div>
          </div>

          {/* Desktop Tab Navigation Block - Hidden on Mobile */}
          <div id="programs-tabs-section" className="hidden md:block bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden mb-12" style={{ scrollMarginTop: '100px' }}>
            <div className="text-center py-4 bg-slate-50 border-b border-slate-200">
              <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide px-4">
                Click below to explore our programs
              </p>
            </div>
            <div className="grid grid-cols-2">
              {/* Current Leadership Programs Tab */}
              <motion.button
                onClick={() => handleTabChange('current')}
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
                      Leadership Programs
                    </h2>
                    <p className={`text-lg mb-2 ${activeTab === 'current' ? 'text-white/90' : 'text-slate-600'}`}>
                      Most leadership programs are business school or consultancy driven, with familiar content. Ours are very different. We accelerate the GC readiness of key in-house senior counsel, and help to transform law firm associates from lawyers into valued business partners. All through interactive sessions with GCs and other top executives around real-world challenges.
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
                onClick={() => handleTabChange('customized')}
                whileHover={{ scale: activeTab !== 'customized' ? 1.02 : 1 }}
                whileTap={{ scale: 0.98 }}
                className={`p-8 text-left transition-all duration-300 cursor-pointer relative group border-l border-slate-200 ${
                  activeTab === 'customized'
                    ? 'bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white shadow-lg'
                    : 'bg-white text-slate-900 hover:bg-blue-50 hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className={`text-3xl font-bold mb-3 ${activeTab === 'customized' ? 'text-white' : 'text-slate-900 group-hover:text-[#045184]'}`}>
                      Customized Solutions
                    </h2>
                    <p className={`text-lg mb-2 ${activeTab === 'customized' ? 'text-white/90' : 'text-slate-600'}`}>
                      Every organization is different. We start with our proven leadership curriculums, and tailor the focus and structure to your specific context, priorities, and leadership challenges. The work is practical and grounded in real-world situations, led by experienced CEOs, GCs and senior executives. Our sessions build business understanding, judgment, and the ability to lead effectively from where the organization is today to where it needs to be.
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
              <div className="grid gap-4 md:p-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
                      <div className="absolute inset-0 bg-[#045184]/60"></div>
                      
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
                    <div className="p-4 md:p-8 flex flex-col flex-grow">
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
                        <a href="https://members.thevanguardnetwork.com/network-details-general-counsel/general-counsel-network/r/recGzsDNANlxLtqIC" target="_blank" rel="noopener noreferrer">
                          <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#045184] to-[#00A8E1] hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                          >
                            Learn More
                            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                          </motion.button>
                        </a>
                      ) : program.name === "SENIOR IN-HOUSE COUNSEL EXCHANGE" ? (
                        <a href="https://members.thevanguardnetwork.com/network-details-senior-counsel/senior-in-house-counsel-network/r/rec4wMsveeZoUvTOa" target="_blank" rel="noopener noreferrer">
                          <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#045184] to-[#00A8E1] hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                          >
                            Learn More
                            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                          </motion.button>
                        </a>
                      ) : program.name === "LIFE SCIENCES CEO EXCHANGE" ? (
                        <a href="https://members.thevanguardnetwork.com/network-details-life-sciences/life-sciences-ceo-network/r/recPIzI9n0K7LkMaw" target="_blank" rel="noopener noreferrer">
                          <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#045184] to-[#00A8E1] hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                          >
                            Learn More
                            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                          </motion.button>
                        </a>
                      ) : program.name === "NEXT GENERATION GC" ? (
                        <a href="https://members.thevanguardnetwork.com/next-gen-gc" target="_blank" rel="noopener noreferrer">
                          <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#045184] to-[#00A8E1] hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                          >
                            Learn More
                            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                          </motion.button>
                        </a>
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
                        <a href="https://members.thevanguardnetwork.com/network-details-risk-management/risk-management-network/r/recv0BDur4fZPVSp7" target="_blank" rel="noopener noreferrer">
                          <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#045184] to-[#00A8E1] hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                          >
                            Learn More
                            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                          </motion.button>
                        </a>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:p-8">
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
                    <div className="absolute inset-0 bg-[#045184]/60"></div>
                    
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
                  <div className="p-4 md:p-8 flex flex-col flex-grow">
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
                    <div className="space-y-3 flex-grow">
                      {program.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-start gap-3">
                          <CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related Pages Section - Internal Linking */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8 mb-16"
      >
        <h3 className="text-xl font-bold text-slate-900 mb-6">Explore Related Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/networking" className="group p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-slate-100">
            <h4 className="font-semibold text-slate-900 group-hover:text-[#045184] transition-colors">Peer-to-Peer Networks</h4>
            <p className="text-sm text-slate-600 mt-1">Connect with senior executives through our membership networks</p>
          </Link>
          <Link to="/advisory" className="group p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-slate-100">
            <h4 className="font-semibold text-slate-900 group-hover:text-[#045184] transition-colors">Advisory Services</h4>
            <p className="text-sm text-slate-600 mt-1">One-on-one leadership advisory and organizational transformation</p>
          </Link>
          <Link to="/success-stories" className="group p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-slate-100">
            <h4 className="font-semibold text-slate-900 group-hover:text-[#045184] transition-colors">Success Stories</h4>
            <p className="text-sm text-slate-600 mt-1">See how we've helped executives and organizations transform</p>
          </Link>
        </div>
      </motion.div>

      {/* Enhanced Call to Action */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8 text-center"
      >
        <div className="bg-gradient-to-r from-[#045184] to-[#00A8E1] rounded-3xl p-6 md:p-16 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8">To Find Out More</h2>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
              <Link to="/contact" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-[#045184] px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-sm md:text-lg hover:bg-slate-100 transition-all duration-300 flex items-center justify-center gap-2 border-2 border-white w-full"
                >
                  <Mail size={18} />
                  <span>Contact Us</span>
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProgramsV2;