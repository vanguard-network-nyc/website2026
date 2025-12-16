import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';
import { 
  Users, 
  Network, 
  Target, 
  MessageCircle,
  Shield,
  BookOpen,
  Video,
  Bot,
  ArrowRight,
  Mail,
  Phone,
  Star,
  CheckCircle2,
  Globe,
  Award
} from 'lucide-react';

const NetworkingV2Page = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const membershipNetworks = [
    {
      name: "General Counsel Network",
      description: "For General Counsel and Chief Legal Officers seeking strategic leadership development and peer connections.",
      target: "GC & CLO",
      icon: <Shield size={32} />,
      gradient: 'from-[#045184] to-[#00A8E1]',
      features: ["Monthly Virtual Exchanges", "Bi-annual Forums", "Strategic Sounding Board", "Leadership Advisory"],
      image: "/vanguard-boston-1.jpg",
      link: "https://members.thevanguardnetwork.com/network-details-general-counsel/general-counsel-network/r/recGzsDNANlxLtqIC"
    },
    {
      name: "Senior In-House Counsel Network", 
      description: "For Deputy General Counsel and Associate General Counsel looking to advance their leadership skills.",
      target: "Deputy GC & Associate GC",
      icon: <Users size={32} />,
      gradient: 'from-[#913D88] to-[#6B2D66]',
      features: ["Problem-Solving Sessions", "Career Development", "Peer Networking", "Leadership Coaching"],
      image: "/vanguard-boston-4.jpg",
      link: "https://members.thevanguardnetwork.com/network-details-senior-counsel/senior-in-house-counsel-network/r/rec4wMsveeZoUvTOa"
    },
    {
      name: "Life Sciences CEO Network",
      description: "For CEOs in the life sciences community addressing industry-specific leadership challenges.",
      target: "Life Sciences CEOs",
      icon: <Target size={32} />,
      gradient: 'from-[#01C219] to-[#047857]',
      features: ["Industry-Specific Content", "Regulatory Insights", "Innovation Discussions", "Strategic Partnerships"],
      image: "/vanguard-boston-3.jpg",
      link: "https://members.thevanguardnetwork.com/network-details-life-sciences/life-sciences-ceo-network/r/recPIzI9n0K7LkMaw"
    },
    {
      name: "Risk Management Network",
      description: "A peer network for senior executives who lead risk-related functions and navigate enterprise risk across various industries.",
      target: "Risk Management Leaders",
      icon: <Shield size={32} />,
      gradient: 'from-[#FF6D00] to-[#d97706]',
      features: ["Risk Assessment Tools", "Compliance Updates", "Crisis Management", "Best Practice Sharing"],
      image: "/vanguard-boston-5.jpg",
      link: "https://members.thevanguardnetwork.com/network-details-risk-management/risk-management-network/r/recv0BDur4fZPVSp7"
    },
    {
      name: "Senior Leaders Network",
      description: "A community for senior leaders from diverse industries, bringing together a wide range of experience and skills.",
      target: "All Other Senior Leaders & Board Members",
      icon: <Users size={32} />,
      gradient: 'from-[#14B8A6] to-[#0F766E]',
      features: ["Foundational Community Access", "Cross-Industry Networking", "Leadership Discussions & Peer Support", "Board Member Connections"],
      image: "/vanguard-boston-1.jpg",
      link: "https://members.thevanguardnetwork.com/network-details-board/senior-leaders-network/r/recmEciU5mwqEPJt5"
    }
  ];

  const memberWebsiteFeatures = [
    {
      title: "Articles/Podcasts/Videos",
      description: "Access premium content that can be re-purposed by you for your teams, including articles, podcasts, and videos from industry leaders.",
      icon: <BookOpen size={32} />,
      gradient: 'from-[#913D88] to-[#6B2D66]'
    },
    {
      title: "Live Events",
      description: "Join live webinars and discussion groups with fellow executives to share insights and discuss current challenges.",
      icon: <Video size={32} />,
      gradient: 'from-[#01C219] to-[#047857]'
    },
    {
      title: "Digital Assistant 'Elsie'",
      description: "Search our leadership knowledge database using our Digital Assistant 'Elsie' to get insights from top leaders on almost any leadership topic.",
      icon: <Bot size={32} />,
      gradient: 'from-[#FF6D00] to-[#d97706]'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-12 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100"
    >
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <Breadcrumb />
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent mb-8 py-2 leading-tight"
          >
            Networking & Community
          </motion.h1>
          
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-5xl mx-auto"
          >
            <p className="text-2xl text-slate-600 max-w-5xl mx-auto leading-relaxed font-medium mb-8">
              Networking built on the human factor — where leaders connect beyond roles and titles to exchange real experiences through confidential, peer-to-peer conversations based on trust rather than performance.
            </p>
          </motion.div>
        </div>
      </div>

      {/* The Human Factor Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="bg-white rounded-3xl p-4 sm:p-8 md:p-12 lg:p-16 shadow-xl border-2 border-transparent hover:border-[#045184]/10 transition-all duration-500 mb-16"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#045184] to-[#00A8E1] flex items-center justify-center mx-auto mb-6"
            >
              <MessageCircle size={32} className="text-white" />
            </motion.div>
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-8 bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent">
              Beyond Traditional Networking
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-slate-700 leading-relaxed mb-8 font-medium">
              Each exchange — whether in a Forum, roundtable, or off-the-record session — brings leaders face to face with the challenges and opportunities they won't find in the headlines. The result: <span className="font-bold text-blue-600">authentic connection, sharper foresight, and the kind of practical wisdom that only comes from shared experience.</span>
            </p>
            
            {/* Testimonial */}
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-4 md:p-8 mb-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <img 
                    src="https://customer-assets.emergentagent.com/job_layout-repair-20/artifacts/dwx24vf5_xZBfFpdm64Rh34PqxTf2PrcixrwcMZGVfl7QH2gPdaE.jpg"
                    alt="Ann Kappler testimonial"
                    className="w-20 h-20 rounded-full object-cover shadow-lg"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <blockquote className="text-lg italic text-slate-700 mb-4 leading-relaxed">
                    "What sets The Vanguard Network apart are the conversations about real-world leadership challenges we face as senior executives. We are among others who've been where we are, who know the pressure of leading at the top, and who are ready to help us see around corners."
                  </blockquote>
                  <div className="text-slate-900 font-bold">Ann Kappler</div>
                  <div className="text-slate-600 text-sm">Executive Vice President and General Counsel, Prudential Financial</div>
                </div>
              </div>
            </div>
            
            <p className="text-lg text-slate-600 leading-relaxed text-center">
              <span className="font-semibold text-slate-900">If you believe that leadership starts with listening, empathy, and courage, you'll find your peers here.</span>
            </p>
          </div>
        </motion.div>

        {/* Call to Action - First Instance */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="text-center rounded-2xl p-6 md:p-12 bg-gradient-to-r from-[#045184] to-[#00A8E1] mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.6, duration: 0.5 }}
            className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6"
          >
            <Star size={32} className="text-white" />
          </motion.div>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">Join Us — Where Real Conversations Create Real Impact</h2>
          <p className="text-xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
            Be part of a community where real conversations create real impact. Connect with leaders who understand the demands of leadership at the top and are ready to share their wisdom and experience.
          </p>
          <motion.a
            href="/application"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-[#045184] px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:bg-blue-50 inline-flex items-center gap-2 shadow-lg"
          >
            Apply to Join
            <ArrowRight size={20} />
          </motion.a>
        </motion.div>

        {/* Valuable Networking Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="bg-white rounded-3xl p-4 sm:p-8 md:p-12 lg:p-16 shadow-xl border-2 border-transparent hover:border-[#045184]/10 transition-all duration-500 mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0, duration: 0.6 }}
                  className="flex-shrink-0"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#045184] to-[#00A8E1] flex items-center justify-center">
                    <Users size={32} className="text-white" />
                  </div>
                </motion.div>
                
                <h2 className="text-2xl md:text-4xl font-bold text-slate-900 bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent">
                  Valuable Networking Opportunities
                </h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6 text-lg font-medium">
                In addition to our Forums and events we can also initiate warm introductions to other Vanguard members and have a pulse on the C-suite marketplace.
              </p>
              <p className="text-slate-600 leading-relaxed text-lg font-medium">
                If you are looking to connect with members, contact Tony Powe, Vanguard COO, for an introduction to another Vanguard member.
              </p>
              
              <a 
                href="mailto:tony@vanguardgroup.nyc"
                className="mt-8 flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-[#045184] to-[#00A8E1] hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="text-white">
                  <Users size={32} />
                </div>
                <div>
                  <p className="text-white font-semibold">Need an Introduction?</p>
                  <p className="text-white/90 text-sm">Contact Tony Powe, Co-Founder & COO</p>
                </div>
              </a>
            </div>
            
            <div className="bg-gradient-to-br from-[#045184]/10 via-blue-50 to-[#00A8E1]/10 rounded-2xl p-6 md:p-10 relative overflow-hidden">
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="text-5xl md:text-7xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent"
                >
                  200+
                </motion.div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 md:mb-4">Senior Executives</h3>
                <p className="text-slate-600 font-medium text-base md:text-lg mb-4 md:mb-6">In our network participating in ongoing catalyzing conversations</p>
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#045184] to-[#00A8E1] flex items-center justify-center">
                    <Network size={32} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Membership Networks Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#045184] to-[#00A8E1] flex items-center justify-center mx-auto mb-6"
            >
              <Award size={32} className="text-white" />
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Membership Networks</h2>
          </div>

          {/* All Networks Grid */}
          <div className="flex flex-wrap gap-8 justify-center max-w-7xl mx-auto">
            {/* All Network Cards */}
            {membershipNetworks.map((network, index) => (
              <motion.div
                key={network.name}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.5 + index * 0.1, duration: 0.8 }}
                className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 overflow-hidden group w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)] flex flex-col"
                whileHover={{ y: -5 }}
              >
                {/* Image Header */}
                <div className="h-48 bg-cover bg-center relative" style={{ backgroundImage: `url('${network.image}')` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${network.gradient} opacity-60`}></div>
                  
                  {/* Icon and Title Overlay */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-white"
                      >
                        {network.icon}
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors duration-300">{network.name}</h3>
                        <p className="text-sm font-semibold text-white/80">{network.target}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <p className="text-slate-600 leading-relaxed mb-6 font-medium">
                    {network.description}
                  </p>
                  
                  {/* Features */}
                  <div className="mb-6 flex-grow">
                    <h4 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">Key Features</h4>
                    <div className="flex flex-col gap-2">
                      {network.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-slate-600">
                          <CheckCircle2 size={14} className="text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <motion.a
                    href={network.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r ${network.gradient} hover:shadow-lg mt-auto`}
                  >
                    Learn More
                    <ArrowRight size={16} />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Members Website Features */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.8 }}
          className="bg-white rounded-3xl p-4 sm:p-8 md:p-12 lg:p-16 shadow-xl border-2 border-transparent hover:border-[#045184]/10 transition-all duration-500 mb-16"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 2.2, duration: 0.5 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#045184] to-[#00A8E1] flex items-center justify-center mx-auto mb-6"
            >
              <Globe size={32} className="text-white" />
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Members Website Features</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
              Access exclusive digital resources and tools designed to enhance your leadership capabilities and support your professional development.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {memberWebsiteFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2.4 + index * 0.2, duration: 0.8 }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mx-auto mb-6 shadow-lg text-white`}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.6, duration: 0.8 }}
          className="text-center rounded-2xl p-12 bg-gradient-to-r from-[#045184] to-[#00A8E1]"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2.8, duration: 0.5 }}
            className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6"
          >
            <Star size={32} className="text-white" />
          </motion.div>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">Join Us — Where Real Conversations Create Real Impact</h2>
          <p className="text-xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
            Be part of a community where real conversations create real impact. Connect with leaders who understand the demands of leadership at the top and are ready to share their wisdom and experience.
          </p>
          <motion.a
            href="/application"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-[#045184] px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:bg-blue-50 inline-flex items-center gap-2 shadow-lg"
          >
            Apply to Join
            <ArrowRight size={20} />
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NetworkingV2Page;