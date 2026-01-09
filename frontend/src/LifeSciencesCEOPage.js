import React from 'react';
import { motion } from 'framer-motion';
import SEO from './SEO';
import { 
  Award, 
  Users, 
  Calendar, 
  Globe, 
  TrendingUp, 
  Brain,
  Microscope,
  ArrowRight,
  CheckCircle,
  Star,
  MessageCircle,
  ChevronRight
} from 'lucide-react';

const LifeSciencesCEOPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-12 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
    >
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8 mb-16">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center shadow-xl"
            >
              <Award size={40} className="text-white" />
            </motion.div>
            <h1 
              className="text-3xl md:text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent py-2 leading-tight"
            >
              Life Sciences CEO Exchanges
            </h1>
          </div>
          
          <p className="text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium">
            An exclusive peer network for Life Sciences CEOs focusing on leadership excellence, strategic innovation, and industry transformation
          </p>
        </motion.div>

        {/* Program Overview */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="bg-white rounded-3xl p-6 md:p-12 shadow-xl mb-16 border border-slate-200"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:p-12">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-6">Program Overview</h2>
              <p className="text-slate-600 leading-relaxed text-base md:text-lg mb-6">
                The Life Sciences CEO Exchanges bring together senior executives from the life sciences industry to focus on leadership aspects rather than day-to-day operational tasks. Our discussions include cutting-edge topics like AI in development and commercialization, strategic leadership challenges, and industry transformation.
              </p>
              <p className="text-slate-600 leading-relaxed text-base md:text-lg">
                This executive forum meets quarterly in virtual format, with face-to-face sessions held bi-annually, creating an intimate environment for peer learning and strategic collaboration.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-4 md:p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Program Details</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="text-purple-600" size={24} />
                  <div>
                    <p className="font-semibold text-slate-900">Format</p>
                    <p className="text-slate-600">Quarterly Virtual + Bi-annual In-Person</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="text-blue-600" size={24} />
                  <div>
                    <p className="font-semibold text-slate-900">Participants</p>
                    <p className="text-slate-600">8-10 Life Sciences CEOs</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="text-green-600" size={24} />
                  <div>
                    <p className="font-semibold text-slate-900">Duration</p>
                    <p className="text-slate-600">Ongoing Membership</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="text-orange-600" size={24} />
                  <div>
                    <p className="font-semibold text-slate-900">Status</p>
                    <p className="text-slate-600">Active Program</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Focus Areas */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="bg-white rounded-3xl p-6 md:p-12 shadow-xl mb-16 border border-slate-200"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-center text-slate-900 mb-12">Key Focus Areas</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:p-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-100"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mx-auto mb-4">
                <Brain size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">AI in Development</h3>
              <p className="text-slate-600">
                Leveraging artificial intelligence in drug development and commercialization strategies
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-green-50 border border-blue-100"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Strategic Leadership</h3>
              <p className="text-slate-600">
                Executive leadership strategies for navigating complex industry challenges
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-teal-50 border border-green-100"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center mx-auto mb-4">
                <Microscope size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Innovation Focus</h3>
              <p className="text-slate-600">
                Driving innovation in life sciences through executive leadership and vision
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-4">
                <Globe size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Global Perspective</h3>
              <p className="text-slate-600">
                International market dynamics and global leadership challenges
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Program Features */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="bg-white rounded-3xl p-6 md:p-12 shadow-xl mb-16 border border-slate-200"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-center text-slate-900 mb-12">Program Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:p-8">
            {[
              {
                title: "Quarterly CEO Sessions",
                description: "Regular virtual sessions designed specifically for Life Sciences CEOs to address industry-specific challenges and opportunities",
                icon: <Calendar size={24} />
              },
              {
                title: "AI Focus",
                description: "Deep dives into artificial intelligence applications in drug development, commercialization, and business transformation",
                icon: <Brain size={24} />
              },
              {
                title: "Leadership Development",
                description: "Executive leadership development tailored to the unique challenges of the life sciences industry",
                icon: <TrendingUp size={24} />
              },
              {
                title: "Industry-Specific",
                description: "Content and discussions specifically designed for the life sciences sector and its unique regulatory and business environment",
                icon: <Microscope size={24} />
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ x: index % 2 === 0 ? -30 : 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.0 + index * 0.1, duration: 0.6 }}
                className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#045184] to-[#00A8E1] flex items-center justify-center flex-shrink-0">
                  <div className="text-white">{feature.icon}</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonial */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="bg-gradient-to-br from-[#045184] to-[#00A8E1] rounded-3xl p-6 md:p-12 text-white mb-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 md:p-8 right-8 w-32 h-32 rounded-full bg-white/20"></div>
            <div className="absolute bottom-8 left-8 w-24 h-24 rounded-full bg-white/10"></div>
          </div>
          
          <div className="relative z-10 text-center">
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={32} className="text-yellow-400 fill-current" />
              ))}
            </div>
            
            <blockquote className="text-2xl font-medium mb-8 italic max-w-4xl mx-auto leading-relaxed">
              "The Life Sciences CEO Exchanges provide an invaluable forum for strategic thinking and peer learning. The focus on AI and innovation has been particularly relevant as we navigate industry transformation."
            </blockquote>
            
            <div className="text-lg">
              <p className="font-semibold">Dr. Sarah Chen</p>
              <p className="text-white/80">CEO, BioInnovate Therapeutics</p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center bg-white rounded-3xl p-6 md:p-12 shadow-xl border border-slate-200"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-6">Ready to Join Our Executive Community?</h2>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect with fellow Life Sciences CEOs in meaningful discussions about leadership, innovation, and industry transformation. By invitation only.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white px-4 md:px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2 justify-center"
            >
              <MessageCircle size={20} />
              Apply for Membership
            </motion.a>
            <motion.a
              href="/programs"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-slate-300 text-slate-700 hover:bg-slate-100 px-4 md:px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-2 justify-center"
            >
              View All Programs
              <ChevronRight size={20} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LifeSciencesCEOPage;