import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  TrendingUp, 
  Globe, 
  BookOpen, 
  Target, 
  Shield, 
  Award, 
  MessageCircle,
  ArrowRight,
  Briefcase,
  Network,
  Star
} from 'lucide-react';

const AboutPage = () => {
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
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent mb-8 py-2 leading-tight"
            style={{
              backgroundImage: 'linear-gradient(45deg, #7f30cb, #01dcba)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            The Vanguard Network
          </motion.h1>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-6">The HumanFactor</h2>
            <p className="text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium">
              We champion the extraordinary in leadership.
            </p>
            <p className="text-xl text-slate-600 max-w-5xl mx-auto leading-relaxed mt-6">
              The Vanguard Network is a by-invitation professional community designed for senior and C-suite leaders aiming to elevate their leadership impact through transformation, advisory, and peer networks.
            </p>
          </motion.div>
        </div>

        {/* What We Do Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-3xl p-12 shadow-xl mb-16 border border-slate-200"
        >
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-slate-900 mb-6">What We Do</h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              We unlock high-performance leadership through advisory services, networking opportunities, custom programs, and curated content that fosters organizational transformation.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Organizational Transformation */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gradient-to-br from-[#045184]/5 to-[#00A8E1]/5 rounded-2xl p-8 border border-slate-200"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#045184] to-[#00A8E1] flex items-center justify-center">
                  <TrendingUp size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Organizational Transformation</h3>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                We work with leaders to align strategy, culture, and execution so that organizations can adapt and thrive in fast-changing environments.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Through facilitated leadership dialogues, cross-functional workshops, and targeted advisory support, we help senior teams identify critical opportunities, remove barriers to performance, and embed practices that sustain long-term success. Our approach is grounded in candid conversation, peer insight, and actionable plans that turn strategic vision into measurable impact.
              </p>
            </motion.div>

            {/* Leadership Advisory */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 border border-slate-200"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                  <Target size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Leadership Advisory</h3>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                We collaborate closely with executives through one-on-one coaching relationships, candid feedback sessions, and our Next Generation Leader curriculum.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Our approach unlocks leadership potential and drives strategic change through personalized coaching and development programs tailored for senior executives.
              </p>
            </motion.div>

            {/* Peer Networks & Forums */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 border border-slate-200"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
                  <Users size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Peer Networks & Forums</h3>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                Participation in Forums, Leadership Dialogues, and TVN, our virtual platform, allows members to engage in intimate, cross-sector peer discussions.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Focus on tackling real-world leadership challenges through structured peer exchanges and collaborative problem-solving sessions.
              </p>
            </motion.div>

            {/* Custom Member Services */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border border-slate-200"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                  <Briefcase size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Custom Member Services</h3>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                Beyond membership, we offer tailored services, from warm introductions and curated content libraries to bespoke roundtables and events.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Personalized services designed to help members maximize the value of the Network through customized experiences and connections.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Specialized Executive Groups */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="bg-white rounded-3xl p-12 shadow-xl mb-16 border border-slate-200"
        >
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-slate-900 mb-6">Specialized Executive Groups</h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              The Network hosts targeted communities designed for specific leadership roles and challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Risk Management Network */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border-2 border-red-100 hover:border-red-200 transition-colors duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
                  <Shield size={28} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Risk Management Network</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                A virtual peer exchange for senior managers overseeing enterprise risk functions, featuring expert-led sessions and practical "playbook" summaries.
              </p>
            </motion.div>

            {/* GC Exchange */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-blue-100 hover:border-blue-200 transition-colors duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                  <Award size={28} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">GC Exchange</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                An exclusive peer network for General Counsels and senior legal leaders. Members meet regularly in confidential, expert-facilitated sessions to share strategies on governance, compliance, risk mitigation, and leadership in the legal function. The exchange fosters trust, candid conversation, and actionable insights tailored to the evolving role of the modern GC.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Global Counsel Leaders Integration */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="bg-gradient-to-br from-[#045184] to-[#00A8E1] rounded-3xl p-12 text-white mb-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-8 right-8 w-32 h-32 rounded-full bg-white/20"></div>
            <div className="absolute bottom-8 left-8 w-24 h-24 rounded-full bg-white/10"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                <Globe size={32} className="text-white" />
              </div>
              <h2 className="text-4xl font-bold">Integration with Global Counsel Leaders (GCL)</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-xl text-white/90 leading-relaxed mb-6">
                  On July 1, 2025, The Vanguard Network formally incorporated Global Counsel Leaders (GCL). This integration brings a global dimension to our leadership community, welcoming experienced leaders from top-tier in-house legal and compliance functions across more than 26 countries.
                </p>
                <p className="text-lg text-white/80 leading-relaxed">
                  GCL was founded by E. Leigh Dance, a recognized thought leader with 25 years of experience advising general counsel, whose work has been featured in The Wall Street Journal, Financial Times, American Lawyer, and Legal Week. Leigh continues to serve TVN as Senior Global Advisor, enriching our capability to deliver peer-driven leadership development at the highest level.
                </p>
              </div>
              
              <div className="text-center lg:text-right">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">26+</div>
                    <div className="text-white/80 font-medium">Countries</div>
                  </div>
                  <div className="w-px h-12 bg-white/20 mx-4"></div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">25</div>
                    <div className="text-white/80 font-medium">Years Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content & Thought Leadership */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="bg-white rounded-3xl p-12 shadow-xl mb-16 border border-slate-200"
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <BookOpen size={32} className="text-white" />
              </div>
              <h2 className="text-4xl font-bold text-slate-900">Our Content & Thought Leadership</h2>
            </div>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Members gain access to a rich library of articles, podcasts, and videos featuring leadership insights from Vanguard faculty, members, and affiliate contributors. Topics span leadership development, board dynamics, personal awareness, and organizational transformation.
            </p>
          </div>
        </motion.div>

        {/* Closing Statement */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="text-center bg-gradient-to-r from-slate-50 to-blue-50 rounded-3xl p-12 border border-slate-200"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">More Than a Professional Association</h2>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              The Vanguard Network is a high-impact platform where senior leaders connect, grow, and lead with purpose. Through tailored advisory programs, exclusive peer forums, and personalized services, the Network empowers its members to thrive in complex leadership environments.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2"
              >
                <MessageCircle size={20} />
                Connect With Us
              </motion.a>
              <motion.a
                href="/upcoming-events"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-[#045184] text-[#045184] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#045184] hover:text-white transition-all duration-300 flex items-center gap-2"
              >
                <Star size={20} />
                Explore Events
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutPage;