import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Clock, Target, CheckCircle, Star, Award, Briefcase, Shield, Globe, TrendingUp, AlertTriangle } from 'lucide-react';

const RiskManagementPage = () => {
  const networkBenefits = [
    {
      title: "Monthly Virtual Exchanges",
      description: "90-minute sessions moderated by Vanguard and shaped by member input",
      icon: <Users size={24} />
    },
    {
      title: "Guest Expert Insights",
      description: "Leading experts join conversations for deep, specialized insights",
      icon: <Star size={24} />
    },
    {
      title: "Confidential Peer Discussions",
      description: "Candid dialogue on critical and emerging risk issues with trusted peers",
      icon: <Shield size={24} />
    },
    {
      title: "Actionable Playbooks",
      description: "Anonymized summaries to share with your internal teams",
      icon: <Briefcase size={24} />
    },
    {
      title: "Proprietary Resources",
      description: "Access to Vanguard's leadership videos, briefings, and content",
      icon: <Award size={24} />
    },
    {
      title: "External Profile Building",
      description: "Opportunities via Vanguard's Unlocking Leadership video series",
      icon: <TrendingUp size={24} />
    }
  ];

  const whyJoinReasons = [
    "Share insights with peers tackling similar high-stakes issues in real time",
    "Gain special insights from guest experts across multiple disciplines",
    "Build a cross-functional lens on risk–systems, early warnings, board engagement",
    "Exchange practical strategies, not just theory",
    "Connect with a trusted circle of senior risk professionals",
    "Shape the agenda and drive timely, relevant conversations"
  ];

  const membershipIncludes = [
    "Membership in the Vanguard Network for Risk Management Leaders",
    "Monthly virtual peer-to-peer executive exchanges",
    "Curated leadership insights and strategic content",
    "Live & on-demand executive dialogues with top executives",
    "Premium networking & social events",
    "Exclusive leadership data & strategic insights",
    "20% savings on Vanguard development programs"
  ];

  const targetAudience = [
    {
      title: "Risk Identification & Mitigation",
      description: "Executives responsible for identifying, mitigating, and communicating enterprise risk"
    },
    {
      title: "Strategic Oversight",
      description: "Leaders shaping strategy and oversight across multiple business functions"
    },
    {
      title: "Resilience & Opportunity",
      description: "Professionals driving resilience and turning disruption into opportunity"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-40 pb-16 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            to="/programs-v2"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-[#045184] transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            Back to Programs
          </Link>
        </motion.div>

        {/* Hero Section */}
        <div className="relative mb-16">
          {/* Hero Image */}
          <div className="relative h-96 rounded-2xl overflow-hidden mb-8">
            <img
              src="https://static.wixstatic.com/media/11062b_642d21e59e4d48cdbb705699a159c146~mv2.jpg/v1/fill/w_1919,h_1150,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/11062b_642d21e59e4d48cdbb705699a159c146~mv2.jpg"
              alt="Risk Management Network"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h2 className="text-2xl font-bold">RISK MANAGEMENT NETWORK & EXCHANGE</h2>
              <p className="text-lg mt-2">A Peer Network for Senior Leaders Navigating Enterprise Risk</p>
            </div>
          </div>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold text-slate-900 mb-6">
              RISK MANAGEMENT NETWORK
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Preparing Leaders to Navigate–and Leverage–Risk in the Age of Disruption. A network which brings together senior executives who lead risk-related functions across law, compliance, finance, cybersecurity, and operations.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <span className="bg-[#045184] text-white px-4 py-2 rounded-full text-sm font-medium">
                Risk Management
              </span>
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                Monthly Virtual
              </span>
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                Enrollment Open
              </span>
            </div>
          </motion.div>
        </div>

        {/* Context Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">The New Risk Landscape</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <p className="text-slate-600 leading-relaxed mb-6">
                Risk has moved to the center of the enterprise agenda. In today's volatile environment, understanding and managing risk is not just a defensive necessity–it's a strategic imperative.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                Whether it's driven by AI, cybersecurity, regulatory shifts, or global competition, the ability to anticipate, mitigate, and turn risk into opportunity has become essential for senior leaders across every sector.
              </p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <AlertTriangle size={24} className="text-orange-500" />
                Critical Risk Areas
              </h3>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  AI adoption and governance
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  Cybersecurity threats
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  Regulatory compliance shifts
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  Geopolitical complexity
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* What the Network Offers */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">What the Network Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {networkBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-[#045184] mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{benefit.title}</h3>
                <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Join Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="bg-gradient-to-br from-[#045184] to-[#00A8E1] rounded-2xl p-8 md:p-12 text-white mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Why Join?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyJoinReasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                className="flex items-start gap-3"
              >
                <CheckCircle size={20} className="text-[#00A8E1] mt-1 flex-shrink-0" />
                <span className="text-white/90 leading-relaxed">{reason}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonial Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Expert Insight</h2>
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <img
                src="https://static.wixstatic.com/media/e6a994_4eca26453771428a95c70f3a0d8caabf~mv2.jpg/v1/fill/w_387,h_346,al_c,lg_1,q_80,enc_avif,quality_auto/e6a994_4eca26453771428a95c70f3a0d8caabf~mv2.jpg"
                alt="Avi Gesser"
                className="w-48 h-48 rounded-full object-cover border-4 border-slate-200"
              />
            </div>
            <div>
              <blockquote className="text-lg text-slate-700 leading-relaxed mb-6 italic">
                "We are seeing increasing complexity associated with the enterprise risks that our clients are facing, like the risks of moving too quickly (and of not moving quickly enough) on AI adoption. These risks often involve a mix of business, legal, technical, cultural and political considerations, and so, an investment of time and resources by management to come up with an overall strategy for managing these kinds of risks can really help in addressing them."
              </blockquote>
              <div className="border-t border-slate-200 pt-4">
                <div className="font-bold text-lg text-slate-900">Avi Gesser</div>
                <div className="text-slate-600">Partner</div>
                <div className="text-[#00A8E1] font-medium">Debevoise & Plimpton</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Network Advisors */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Network Advisors</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              {
                name: "Jay Cohen",
                title: "Chief Compliance Officer",
                company: "QBE",
                image: "https://static.wixstatic.com/media/e6a994_5147cca1a60e481ab3b2fd7d0e91ff2f~mv2.png/v1/fill/w_155,h_183,fp_1.95_1.62,q_75,enc_avif,quality_auto/e6a994_5147cca1a60e481ab3b2fd7d0e91ff2f~mv2.png"
              },
              {
                name: "Brenda Fischer",
                title: "Associate GC, Data Strategy & Security",
                company: "Guardian Life",
                image: "https://static.wixstatic.com/media/e6a994_dbd23deba47a4ee19d938f0f7db74414~mv2.jpeg/v1/fill/w_184,h_184,fp_0.82_0.6,q_75,enc_avif,quality_auto/e6a994_dbd23deba47a4ee19d938f0f7db74414~mv2.jpeg"
              },
              {
                name: "Stephen Gauster",
                title: "President & CEO",
                company: "The Beekman Estate",
                image: "https://static.wixstatic.com/media/e6a994_bbfcfda6af1c4c359a2e0d6ed7f2b655~mv2.jpg/v1/fill/w_184,h_184,fp_0.9_0.52,q_75,enc_avif,quality_auto/e6a994_bbfcfda6af1c4c359a2e0d6ed7f2b655~mv2.jpg"
              },
              {
                name: "Avi Gesser",
                title: "Partner",
                company: "Debevoise & Plimpton",
                image: "https://static.wixstatic.com/media/e6a994_20a674c273e745269716b017875152bc~mv2.jpg/v1/fill/w_184,h_184,q_75,enc_avif,quality_auto/e6a994_20a674c273e745269716b017875152bc~mv2.jpg"
              },
              {
                name: "David Robinson",
                title: "Past General Counsel",
                company: "The Hartford",
                image: "https://static.wixstatic.com/media/e6a994_9ea8a2d45ba4471bbdd025770e8cdf4c~mv2.jpeg/v1/fill/w_184,h_184,fp_0.31_0.28,q_75,enc_avif,quality_auto/e6a994_9ea8a2d45ba4471bbdd025770e8cdf4c~mv2.jpeg"
              }
            ].map((advisor, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                className="text-center"
              >
                <div className="w-24 h-24 rounded-full bg-slate-200 mx-auto mb-3 overflow-hidden">
                  <img
                    src={advisor.image}
                    alt={advisor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-slate-900 mb-1 text-sm">{advisor.name}</h3>
                <p className="text-xs text-slate-600 mb-1">{advisor.title}</p>
                <p className="text-xs text-[#00A8E1] font-medium">{advisor.company}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Member Organizations */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Our Members Are Leaders From These And Other Organizations</h2>
          <div className="flex justify-center">
            <img
              src="https://static.wixstatic.com/media/e6a994_d968320bc0c846969ab5219d3ca40c0f~mv2.png/v1/fill/w_980,h_556,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/members.png"
              alt="Member Organizations Logos"
              className="max-w-full h-auto rounded-lg"
            />
          </div>
        </motion.div>

        {/* Target Audience */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Who Should Join?</h2>
          <p className="text-center text-slate-600 mb-8 max-w-3xl mx-auto">
            Executives with enterprise-level responsibility for risk management across multiple functions
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {targetAudience.map((audience, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                className="bg-white rounded-xl p-6 shadow-lg text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#045184] text-white flex items-center justify-center mx-auto mb-4">
                  <Target size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{audience.title}</h3>
                <p className="text-slate-600 leading-relaxed">{audience.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Membership Details */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="bg-slate-900 rounded-2xl p-8 md:p-12 text-white mb-16"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Annual Network Membership</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="text-4xl font-bold text-[#00A8E1] mb-2">$10,000</div>
              <p className="text-white/80 mb-4">Annual membership fee</p>
              <div className="bg-green-500 text-white px-4 py-2 rounded-lg inline-block mb-6">
                <span className="font-bold">Special Offer:</span> First 20 members save 50% for first 2 years
              </div>
              <p className="text-white/90 leading-relaxed">
                Given the collaborative nature of risk management, the lead executive may invite other team members to take the seat for relevant sessions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Membership Includes:</h3>
              <div className="space-y-3">
                {membershipIncludes.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-[#00A8E1] mt-1 flex-shrink-0" />
                    <span className="text-white/90 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="bg-gradient-to-r from-[#045184] to-[#00A8E1] rounded-2xl p-8 md:p-12 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Ready to Join the Network?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect with senior risk leaders and turn enterprise risk into strategic advantage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://forms.gle/JxfducHuD8dyQYdc8"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#045184] px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-100 transition-all duration-300 flex items-center gap-2"
            >
              <Users size={20} />
              Contact Us to Join
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:tony@vanguardgroup.nyc?subject=Risk%20Management%20Network%20Inquiry"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#045184] transition-all duration-300 flex items-center gap-2"
            >
              <Briefcase size={20} />
              Email Tony Powe
            </motion.a>
          </div>
          <p className="text-white/60 mt-6 text-sm">
            Can be included in enterprise membership plans
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RiskManagementPage;