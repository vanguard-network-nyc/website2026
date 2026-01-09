import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Breadcrumb from '../Breadcrumb';
import SEO from '../SEO';
import { BookOpen, ExternalLink, Star, Award, CheckCircle2 } from 'lucide-react';

const BookPage = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="pt-40 pb-12 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
  >
    <SEO 
      title="Seeing Around Corners - Book"
      description="C-suite wisdom from America's most insightful leaders. Exclusive advice from legendary CEOs and industry-shaping experts on leadership challenges."
    />
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8">
      <Breadcrumb />
      {/* Hero Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 
          className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent py-2 leading-tight"
        >
          Seeing Around Corners
        </h1>
        <p className="text-2xl font-semibold mb-4" style={{ color: '#00A8E1' }}>
          C-suite Wisdom from America's Most Insightful Leaders
        </p>
        <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
          Exclusive, frank, and unfettered advice from legendary CEOs, innovative founders, and industry-shaping experts to help you navigate the most important management and leadership challenges of today.
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:p-12 items-center mb-16">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center"
        >
          <div className="w-80 h-[500px] rounded-xl shadow-lg mx-auto mb-8 overflow-hidden bg-gray-100">
            <img
              src="/book-cover.jpg"
              alt="Seeing Around Corners Book Cover - C-Suite Wisdom from Top Leaders"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex justify-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.amazon.com/Seeing-Around-Corners-Americas-Insightful/dp/B0DVRGTDFY/ref=sr_1_1?crid=1UDTUUR939EFS&dib=eyJ2IjoiMSJ9.uUAnkAmvXkDTtplju1-ThXQ0DHyhnwLwFjWvT31MoLU.3z-zY1JbDLqiOwgPc_MyAB-R0brStxvJF9eIRL0VIGA&dib_tag=se&keywords=seeing+around+corners+ken+banta&qid=1739209893&sprefix=seeing+around+corners+ken+banta,aps,82&sr=8-1"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white px-4 md:px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 inline-flex items-center gap-2 hover:shadow-lg"
            >
              Order on Amazon
              <ArrowRight size={20} />
            </motion.a>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-6" style={{ color: '#045184' }}>About the Book</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            "Seeing Around Corners" is a business book that gathers exclusive, frank, and unfettered advice, anecdotes, and insight from legendary CEOs, in-the-thick-of-it company founders, cutting-edge innovators, and industry-shaping experts. This comprehensive guide helps readers navigate the most important management and leadership issues of the day.
          </p>
          
          <h3 className="text-2xl font-bold mb-4" style={{ color: '#045184' }}>What Makes This Book Unique</h3>
          <ul className="space-y-3 mb-8">
            {[
              'Exclusive insights from legendary CEOs and industry leaders',
              '360-degree view of management and leadership challenges',
              '16 quote-filled chapters covering various leadership topics',
              'Real-world anecdotes from successful business executives',
              'Practical advice for leading with authority and vision'
            ].map((item, index) => (
              <motion.li
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                className="flex items-center gap-3 text-slate-600"
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#00A8E1' }}></div>
                {item}
              </motion.li>
            ))}
          </ul>
          
          <div className="rounded-lg p-6 shadow-lg" style={{ backgroundColor: '#045184' }}>
            <h4 className="font-bold text-white mb-2">Perfect For</h4>
            <p className="text-white/90">
              Current and aspiring executives, business leaders, entrepreneurs, and anyone looking to gain insider knowledge on navigating today's complex business landscape with wisdom from America's most successful leaders.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Author Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mb-16"
      >
        <div className="bg-white rounded-2xl p-4 md:p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:p-8 items-center">
            <div className="text-center">
              <div className="w-48 h-48 rounded-full mx-auto mb-4 overflow-hidden">
                <img 
                  src="/ken-banta-headshot.jpg" 
                alt="Ken Banta - Founder and Managing Director of The Vanguard Network" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold" style={{ color: '#045184' }}>Ken Banta</h3>
              <p className="text-slate-600">Founder & CEO</p>
              <p className="text-slate-600">The Vanguard Network</p>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#045184' }}>Meet the Author</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Ken Banta is an accomplished author and business consultant known for his deep insights into leadership and management practices. Through his extensive network and years of experience working with top executives, Ken has gathered invaluable wisdom from America's most successful business leaders.
              </p>
              <p className="text-slate-600 leading-relaxed">
                His unique ability to distill complex leadership concepts into actionable insights makes "Seeing Around Corners" an essential resource for anyone looking to excel in today's challenging business environment.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Benefits Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
        className="mb-16"
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-12" style={{ color: '#045184' }}>
          What You'll Gain
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:p-8">
          {[
            {
              title: "Leadership Mastery",
              description: "Learn how to navigate management and leadership issues with confidence and authority",
              icon: <Award size={32} />
            },
            {
              title: "Strategic Vision",
              description: "Develop the ability to see around corners and anticipate future challenges and opportunities",
              icon: <Target size={32} />
            },
            {
              title: "Executive Insights",
              description: "Access exclusive anecdotes and advice from legendary CEOs and industry-shaping experts",
              icon: <Users size={32} />
            }
          ].map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 + index * 0.2, duration: 0.8 }}
              className="bg-white rounded-xl p-6 shadow-lg text-center"
            >
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#00A8E1' }}>
                <div className="text-white">{benefit.icon}</div>
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#045184' }}>{benefit.title}</h3>
              <p className="text-slate-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="text-center rounded-2xl p-6 md:p-12"
        style={{ backgroundColor: '#045184' }}
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">Ready to See Around Corners?</h2>
        <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
          Join thousands of executives who have transformed their leadership approach with insights from America's most successful business leaders.
        </p>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="https://www.amazon.com/Seeing-Around-Corners-Americas-Insightful/dp/B0DVRGTDFY/ref=sr_1_1?crid=1UDTUUR939EFS&dib=eyJ2IjoiMSJ9.uUAnkAmvXkDTtplju1-ThXQ0DHyhnwLwFjWvT31MoLU.3z-zY1JbDLqiOwgPc_MyAB-R0brStxvJF9eIRL0VIGA&dib_tag=se&keywords=seeing+around+corners+ken+banta&qid=1739209893&sprefix=seeing+around+corners+ken+banta,aps,82&sr=8-1"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-[#045184] w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-base transition-all duration-200 hover:bg-blue-50 inline-flex items-center justify-center gap-2"
        >
          Order Your Copy Today
          <ArrowRight size={20} />
        </motion.a>
      </motion.div>
    </div>
  </motion.div>
);

// NEW HOMEPAGE COMPONENTS BASED ON REFERENCE DESIGN - LIGHT THEME

// New Hero Section

export default BookPage;
