import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';
import SEO from './SEO';
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
      image: "https://customer-assets.emergentagent.com/job_4fab1a4c-02f5-469e-a1ed-d1849b158ebf/artifacts/sgxk7zcq_1.jpeg",
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
      title: "Events",
      description: "Join webinars and discussion groups with fellow executives to share insights and discuss current challenges.",
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
    <div
      className="pt-40 pb-12 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100"
    >
      <SEO 
        title="Peer-to-Peer Leadership Networks"
        description="Join exclusive peer-to-peer networks for General Counsel, Senior Leaders, and executives. Connect with 2,000+ leaders through meaningful conversations."
        faq={[
          {
            question: "What is The Vanguard Network?",
            answer: "The Vanguard Network is a premier executive leadership organization offering peer-to-peer networks for General Counsel, Senior Leaders, and C-suite executives. We connect over 2,000 leaders through meaningful conversations focused on real-world leadership challenges."
          },
          {
            question: "Who can join the peer networks?",
            answer: "Our networks are designed for senior executives including General Counsel, Chief Legal Officers, Deputy GC, Associate GC, and Senior Leaders across various industries. Each network is tailored to specific leadership roles and career stages."
          },
          {
            question: "What benefits do members receive?",
            answer: "Members gain access to monthly virtual exchanges, bi-annual forums, strategic sounding boards, leadership advisory services, problem-solving sessions, career development resources, and exclusive peer networking opportunities."
          },
          {
            question: "How do the peer exchanges work?",
            answer: "Our exchanges are candid, confidential conversations among peers facing similar challenges. There are no podiums, no PowerPoints, no presentations - just meaningful discussions about real leadership challenges led by experienced facilitators."
          },
          {
            question: "Is membership confidential?",
            answer: "Yes, all discussions within our networks operate under strict confidentiality. This allows members to speak openly about challenges and receive honest feedback from their peers."
          }
        ]}
      />
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8">
        <Breadcrumb />
        <div className="text-center">
          <h1 
            className="text-3xl md:text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent mb-8 py-2 leading-tight"
          >
            A Community of Leaders
          </h1>
          
          {/* Ann Kappler Testimonial - Moved to top */}
          <div 
            className="w-full"
          >
            <div className="bg-[#ffffff] rounded-xl p-6 md:p-8 shadow-lg">
              <div className="flex flex-col md:flex-row items-center gap-6 max-w-5xl mx-auto">
                <div className="flex-shrink-0">
                  <img 
                    src="https://customer-assets.emergentagent.com/job_layout-repair-20/artifacts/dwx24vf5_xZBfFpdm64Rh34PqxTf2PrcixrwcMZGVfl7QH2gPdaE.jpg"
                alt="Ann Kappler - Executive Vice President and General Counsel at Prudential Financial"
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
          </div>
          
          <div 
            className="max-w-5xl mx-auto mt-[60px] mb-[60px]"
          >
            <p className="text-2xl text-slate-600 max-w-5xl mx-auto leading-relaxed font-medium">
              What began more than a decade ago as periodic conversations among healthcare executives has grown into a powerful community of senior leaders across industries–united by a core belief: <span className="font-bold">high-performance leadership drives organizational success.</span>
            </p>
          </div>
        </div>
      </div>

      {/* The Human Factor Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="bg-white rounded-3xl p-4 sm:p-4 md:p-8 md:p-6 md:p-12 lg:p-16 shadow-xl border-2 border-transparent hover:border-[#045184]/10 transition-all duration-500 mb-16"
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
              Members-Driven
            </h2>
          </div>

          <div className="max-w-5xl mx-auto">
            <p className="text-xl text-slate-700 leading-relaxed mb-6 font-medium">
              In a rapidly changing world, leaders come together here to stay agile, relevant, and effective. As our community has grown, so too has the breadth and depth of peer-to-peer leadership insights, shaped directly by the real challenges our members face.
            </p>
            <p className="text-xl text-slate-700 leading-relaxed mb-6 font-medium">
              Over time, those shared needs and experiences have given rise to different networks, each focused on critical executive roles and responsibilities. Whether in General Counsel, Risk Management, Life Sciences Leadership, or other executive domains, members connect with peers who understand their world, and push their leadership forward.
            </p>
            <p className="text-xl text-slate-700 leading-relaxed mb-6 font-medium">
              There is no podium, no PowerPoint, no presentations. Just candid, expert-to-expert dialogue, where leaders learn with and from one another across every interaction and channel.
            </p>
            <p className="text-xl text-slate-700 leading-relaxed mb-8 font-medium">
              Today, The Vanguard Network brings together top executives who know that leadership is not a solo pursuit, but a collective discipline, strengthened by experience, reflection, and the willingness to share what works.
            </p>
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
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Member Networks</h2>
          </div>

          {/* All Networks Grid */}
          <div className="flex flex-wrap gap-4 md:p-8 justify-center max-w-7xl mx-auto">
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
                <div className="p-4 md:p-8 flex flex-col flex-grow">
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
          className="bg-white rounded-3xl p-4 sm:p-4 md:p-8 md:p-6 md:p-12 lg:p-16 shadow-xl border-2 border-transparent hover:border-[#045184]/10 transition-all duration-500 mb-16"
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
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Member Resources</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
              Exclusive digital resources and tools by and for Vanguard members.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:p-8">
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

        {/* Related Pages Section - Internal Linking */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.4, duration: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-xl font-bold text-slate-900 mb-6">Explore More</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/programs" className="group p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-slate-100">
              <h4 className="font-semibold text-slate-900 group-hover:text-[#045184] transition-colors">Leadership Programs</h4>
              <p className="text-sm text-slate-600 mt-1">Customized programs to accelerate leadership development</p>
            </Link>
            <Link to="/upcoming-events" className="group p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-slate-100">
              <h4 className="font-semibold text-slate-900 group-hover:text-[#045184] transition-colors">Upcoming Events</h4>
              <p className="text-sm text-slate-600 mt-1">Join our forums, exchanges, and leadership gatherings</p>
            </Link>
            <Link to="/articles" className="group p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-slate-100">
              <h4 className="font-semibold text-slate-900 group-hover:text-[#045184] transition-colors">Articles & Insights</h4>
              <p className="text-sm text-slate-600 mt-1">Leadership perspectives from top executives</p>
            </Link>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.6, duration: 0.8 }}
          className="text-center rounded-2xl p-6 md:p-12 bg-gradient-to-r from-[#045184] to-[#00A8E1]"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-8">Ready to Learn More?</h2>
          <motion.a
            href="/application"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-[#045184] px-4 md:px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:bg-blue-50 inline-flex items-center gap-2 shadow-lg"
          >
            Contact Us
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default NetworkingV2Page;