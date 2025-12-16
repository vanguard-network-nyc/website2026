import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Calendar, MapPin, CheckCircle, ExternalLink, DollarSign, Clock, Target, Award, BookOpen, Star } from 'lucide-react';

const NextGenGCPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-12 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            Back to Programs
          </Link>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="mb-8">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
              Next Generation GC Program
            </span>
          </div>
          
          <h1 className="text-3xl md:text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 leading-tight">
            Next Generation GC<br />Program
          </h1>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-8">
            A 6-month accelerator for high-potential in-house counsel, featuring 1:1 coaching from top GCs, small hand-selected cohorts, and a curriculum designed by GCs, for future GCs.
          </p>

          <div className="mb-8">
            <p className="text-sm text-slate-600 mb-4">in collaboration with</p>
            <div className="flex justify-center">
              <img 
                src="https://static.wixstatic.com/media/e6a994_d20bac6e571843849720016167961d35~mv2.png/v1/fill/w_175,h_36,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/The%20Executas%20Group_edited.png"
                alt="The Executas Group"
                className="h-9"
              />
            </div>
          </div>
        </motion.div>

        {/* Key Features */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:p-8 mb-16"
        >
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-8 text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Users className="text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">1:1 Coaching from Top GCs</h3>
            <p className="text-slate-600">Personalized guidance from experienced General Counsels</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-8 text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Target className="text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Small Hand-Selected Cohorts</h3>
            <p className="text-slate-600">Intimate learning environment with carefully chosen participants</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-8 text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Award className="text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Designed by GCs, for Future GCs</h3>
            <p className="text-slate-600">Curriculum shaped by sponsoring GCs for real-world relevance</p>
          </div>
        </motion.div>

        {/* Testimonial */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="bg-white rounded-xl shadow-lg p-4 md:p-8 mb-12"
        >
          <blockquote className="text-xl italic text-slate-700 mb-6 leading-relaxed text-center">
            "There is one thing you can be certain of–the dividends you will receive from your investment could never be more timely."
          </blockquote>
          <div className="text-center">
            <div className="font-bold text-slate-900 text-lg">BRANDON SMITH</div>
            <div className="text-slate-600">Executive Vice President & General Counsel, CHS Inc.</div>
          </div>
        </motion.div>

        {/* Custom-Built Curriculum */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="bg-white rounded-xl shadow-lg p-4 md:p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">Custom-Built Curriculum</h2>
          <div className="prose prose-lg max-w-none text-slate-700">
            <p className="text-center mb-6">
              This is no conventional training program. Rooted in the proven Vanguard Network model, each session is an immersive experience—combining candid fireside chats, rich dialogue between leaders and participants, and hands-on small group work using real-world simulations.
            </p>
            <p className="text-center">
              Program content is shaped by the sponsoring GCs, who identify the leadership qualities most essential for success. The goal: to accelerate the development of these capabilities so participants emerge as standout GC candidates earlier in their careers—and are poised to thrive in the role for years to come.
            </p>
          </div>
        </motion.div>

        {/* Program Components */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="bg-white rounded-xl shadow-lg p-4 md:p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Program Components</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:p-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Monthly Assignments</h3>
                  <p className="text-slate-600">
                    Each month participants will be assigned modest projects that build on the previous module and prepare for the next. Examples include watching exclusive videos; reading curated materials; and mentor check-ins.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <Users className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Virtual Peer Meetings</h3>
                  <p className="text-slate-600">
                    Each monthly assignment will also be the focus of a virtual, 60-minute peer group discussion. These conversations help internalize the leadership concepts and also enhance networking among participants.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <Target className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">GC Coaching Sessions</h3>
                  <p className="text-slate-600">
                    The program features two to three coaching conversations with a GC from a different organization. A flexible agenda allows participants to bring their own unique challenges and perspectives to the table.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Development Roadmap</h3>
                  <p className="text-slate-600">
                    By the final module, participants will have created a written action plan to help them develop as leaders. Featuring key insights from modules and feedback from managers and peers, this document is a road map to becoming a successful GC.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2025 Program Sessions */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="bg-white rounded-xl shadow-lg p-4 md:p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">2025 Program Sessions</h2>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Module 1: The Evolving Role of the GC</h3>
                  <p className="text-slate-600">Sep 30, noon to 7 pm EDT, Washington, DC</p>
                  <p className="text-sm text-slate-500">Followed by a networking dinner</p>
                </div>
                <MapPin className="text-blue-600" size={24} />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg p-6 border-l-4 border-slate-400">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Module 2: Personal Development Planning</h3>
                  <p className="text-slate-600">Oct 9, 2:30 pm to 5 pm EDT, Virtual</p>
                </div>
                <Calendar className="text-slate-600" size={24} />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg p-6 border-l-4 border-slate-400">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Module 3: Working With the CEO</h3>
                  <p className="text-slate-600">Nov 6, 2:30 pm to 5 pm EST, Virtual</p>
                </div>
                <Calendar className="text-slate-600" size={24} />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg p-6 border-l-4 border-slate-400">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Module 4: Building Legal Dept. Culture</h3>
                  <p className="text-slate-600">Dec 4, 2:30 pm to 5 pm EST, Virtual</p>
                </div>
                <Calendar className="text-slate-600" size={24} />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg p-6 border-l-4 border-slate-400">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Module 5: Joining the Top Leadership Team</h3>
                  <p className="text-slate-600">Jan 22, 2:30 pm to 5 pm EST, Virtual</p>
                </div>
                <Calendar className="text-slate-600" size={24} />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Module 6: Working With the Board</h3>
                  <p className="text-slate-600">Mar 2, noon to 7 pm EDT, Washington, DC</p>
                  <p className="text-sm text-slate-500">Followed by a networking dinner</p>
                </div>
                <MapPin className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <a
              href="https://www.thevanguardnetwork.com/next-gen-gc-modules"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
            >
              See Full Details
              <ExternalLink size={16} />
            </a>
          </div>
        </motion.div>

        {/* Eligibility Requirements */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="bg-white rounded-xl shadow-lg p-4 md:p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Eligibility Requirements & Time Commitment</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:p-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">All participants must...</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Be nominated by their GC and recognized as a leader in their legal department</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Report directly to their organization's most senior legal officer (with a title such as deputy or associate GC or managing attorney/counsel) or be GC of a division or region</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Be able to dedicate 6-7 hours per month. This includes attending 3-4 hours of scheduled virtual sessions and completing 2-3 hours of assignments, mentor follow ups, and peer check-ins between modules</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
              <div className="text-center">
                <Clock size={48} className="text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Time Commitment</h3>
                <p className="text-3xl font-bold text-blue-600 mb-2">6-7 hours</p>
                <p className="text-slate-600">per month</p>
                <div className="mt-4 text-sm text-slate-600">
                  <p>• 3-4 hours scheduled sessions</p>
                  <p>• 2-3 hours assignments & mentoring</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Investment Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-4 md:p-8 mb-12 text-white"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Investment</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:p-8">
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <DollarSign className="text-white" size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-4">$15,000 per participant</h3>
              <p className="text-blue-100 mb-4">
                Includes a one-year Senior In-house Counsel Network & Exchange membership for the participant valued at $10,000
              </p>
              <p className="text-blue-100">
                If the nominating GC is a current member of the Vanguard Network, a 20% discount applies
              </p>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h4 className="text-xl font-bold mb-4">What's Included:</h4>
              <ul className="space-y-2 text-blue-100">
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-300 flex-shrink-0" />
                  <span>6-month accelerator program</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-300 flex-shrink-0" />
                  <span>1:1 coaching from top GCs</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-300 flex-shrink-0" />
                  <span>Small cohort experience</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-300 flex-shrink-0" />
                  <span>Development roadmap</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-300 flex-shrink-0" />
                  <span>One-year Senior Counsel Network membership</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Additional Testimonials */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:p-8 mb-12"
        >
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-8">
            <blockquote className="text-lg italic text-slate-700 mb-6 leading-relaxed">
              "This program was beneficial for me in so many ways. It helped me better understand the actual job and critical relationships with the CEO, Peers, and Board."
            </blockquote>
            <div>
              <div className="font-bold text-slate-900">NANCY L. BERARDINELLI-KRANTZ</div>
              <div className="text-slate-600 mb-2">Senior Vice President and Chief Legal Officer, Grainger</div>
              <div className="text-sm text-blue-600">2022-2023 Vanguard Next Gen GC participant</div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-8">
            <blockquote className="text-lg italic text-slate-700 mb-6 leading-relaxed">
              "I could have used a session like this earlier in my career. I encountered so many unexpected things, especially in my first GC role."
            </blockquote>
            <div>
              <div className="font-bold text-slate-900">DOUG BARNARD</div>
              <div className="text-slate-600">Former Senior Vice President, General Counsel, and Secretary, CF Industries</div>
            </div>
          </div>
        </motion.div>

        {/* Registration CTAs */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="bg-white rounded-xl shadow-lg p-4 md:p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Ready to Join the Next Cohort?</h2>
          
          <div className="text-center mb-8">
            <p className="text-lg text-slate-600 mb-6">
              We are now accepting nominations for the program starting in September, 2025.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSeiCAO6-_L-Zopi4mYbBTGtvmcqroIj75QrePvcd5HOHyBqwA/viewform?usp=sf_link"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 md:px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                Enroll or Nominate
                <ExternalLink size={16} />
              </a>
              
              <a
                href="https://www.thevanguardnetwork.com/_files/ugd/e6a994_4be97e33222a4492a2e9adaa5ca2544f.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-slate-600 text-white px-4 md:px-8 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors duration-200"
              >
                Download PDF
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="bg-slate-100 rounded-xl p-4 md:p-8 text-center"
        >
          <h3 className="text-xl font-bold text-slate-900 mb-4">Need More Information?</h3>
          <p className="text-slate-600 mb-4">
            For more information about the Next Generation GC Program, please contact:
          </p>
          <a
            href="mailto:tony@vanguardgroup.nyc"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
          >
            Tony Powe - tony@vanguardgroup.nyc
            <ExternalLink size={16} />
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NextGenGCPage;