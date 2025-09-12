import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, BookOpen, Calendar, CheckCircle, ExternalLink, LinkedinIcon, Target, Award, Globe } from 'lucide-react';

const NewLeadersPage = () => {
  const advisors = [
    "Alejandro Gits, Boortbalt, CE Project Manager",
    "Andres Feng, Euromonitor International, Innovation Consultant", 
    "Ben Moxham, Camberwell Energy, Managing Partner",
    "Caroline Press, Penguin Young Readers, Senior Production Editor",
    "Christian Desrosiers, Visceral, Co-Founder",
    "Gary Lee, Gary Lee Enterprises, Senior Writer-Editor, CEO",
    "Heather French, GHX, General Counsel and Corporate Secretary",
    "Jae Henderson, Black Wealth Data Center, Director of Product",
    "Kathleen Murphy, Murphy Media Partners, Senior Strategic Advisor, CEO",
    "Kim Yapchai, Teichert, EVP and Chief Legal Officer",
    "Matt Meyer, Wilson Sonsini Goodrich & Rosati, Chief Business Advisor",
    "Michael Watras, Straightline International, CEO and Chairman",
    "Viq Pervaaz, Previously EY, Partner, Life Sciences"
  ];

  const alumniCompanies = [
    "https://static.wixstatic.com/media/e6a994_36966af170e74e7592d52ae86db5be33~mv2.png",
    "https://static.wixstatic.com/media/e6a994_43f756c1b4aa466e96e8198328c97443~mv2.png",
    "https://static.wixstatic.com/media/e6a994_640ed501ee4644a192e0d4860be650b1~mv2.png",
    "https://static.wixstatic.com/media/e6a994_21b9fd161fb843619a93214c4dd0b7fc~mv2.png",
    "https://static.wixstatic.com/media/e6a994_33dc5edb32bb4934831653d7792949bc~mv2.jpeg",
    "https://static.wixstatic.com/media/e6a994_de40a3cadf644e7399b1fefed26ee5bf~mv2.png",
    "https://static.wixstatic.com/media/e6a994_ce67271337854e9f81515bdc92c343f8~mv2.png",
    "https://static.wixstatic.com/media/e6a994_37a678c5b9494e139d0f8c33db476e9c~mv2.jpg",
    "https://static.wixstatic.com/media/e6a994_39406812bb474f8290f5afcd7b9dae14~mv2.jpg",
    "https://static.wixstatic.com/media/e6a994_31a2515a89ed4412b283648950e4a958~mv2.png",
    "https://static.wixstatic.com/media/e6a994_b91b19ac7c2a4803ad90f1a4e13af37e~mv2.png",
    "https://static.wixstatic.com/media/e6a994_e506e42ae034411da27bbf6635eb9a75~mv2.jpg"
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-48 pb-12 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            to="/programs-v2"
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
          {/* Hero Image Background */}
          <div className="relative mb-12 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://static.wixstatic.com/media/11062b_642d21e59e4d48cdbb705699a159c146~mv2.jpg"
              alt="New Leaders Program"
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end items-center p-8">
              <div className="text-center text-white">
                <span className="text-lg font-semibold tracking-wider uppercase mb-4 block">
                  New Leaders Program
                </span>
                <div className="mb-4">
                  <span className="text-sm opacity-90">powered by</span>
                </div>
                <img
                  src="https://static.wixstatic.com/media/e6a994_f313c27094364453afcad2fde549ecd2~mv2.png"
                  alt="Executa Group"
                  className="h-12 mx-auto"
                />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
            Unlocking Real-World Leadership
          </h1>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Are you a high potential leader in college, graduate school, or in your early career? Do you know someone who is? 
            Then the Vanguard Network New Leaders programming may be just right.
          </p>
        </motion.div>

        {/* Video Section */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="mb-16"
        >
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              See New Leaders in Action
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
                <iframe
                  src="https://player.vimeo.com/video/834411667"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  title="New Leaders Program Video"
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Program Description */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-16"
        >
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed">
              <p className="text-xl mb-6">
                New Leaders combines peer-to-peer engagement with candid insights from experienced leaders who are not shy about their mistakes. 
                <strong> No PowerPoint. No podiums. No presentations.</strong>
              </p>
              
              <p className="mb-6">
                It's all based on the powerful Vanguard platform for C-Suite leadership Forums and Roundtables that have engaged 
                thousands of top executives in dialogues on critical leadership challenges, and expanded their networks.
              </p>
              
              <p className="mb-6">
                Each module of New Leaders is carefully calibrated to build real-world leadership capabilities that will be valuable 
                for a lifetime–from self-awareness, to leading through influence, to building effective teams.
              </p>
              
              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
                <p className="font-semibold text-slate-800">
                  New Leaders integrates seamlessly with existing leadership programs in which participants may already be participating.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Three Programs Section */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-16"
        >
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              We offer three New Leaders programs:
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Core Program */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <Target size={28} className="text-blue-600" />
                  <h3 className="text-xl font-bold text-slate-900">Core Program</h3>
                </div>
                <p className="text-slate-700 mb-6 leading-relaxed">
                  This brings together individuals from varied backgrounds, businesses, colleges and universities for a Vanguard engagement. 
                  We are currently working on our 2024 offering.
                </p>
                <a
                  href="https://www.thevanguardnetwork.com/new-leaders-fall-2023"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
                >
                  Past Programs
                  <ExternalLink size={16} />
                </a>
              </div>

              {/* Enterprise Program */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <Award size={28} className="text-green-600" />
                  <h3 className="text-xl font-bold text-slate-900">Enterprise Program</h3>
                </div>
                <p className="text-slate-700 mb-6 leading-relaxed">
                  Tailored to the needs and objectives of individual companies for their new hires and early career professionals. 
                  Virtual, face-to-face, or hybrid as appropriate.
                </p>
                <a
                  href="https://www.thevanguardnetwork.com/_files/ugd/e6a994_6135cf8595124a89a23c346507bfc874.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
                >
                  Learn More
                  <ExternalLink size={16} />
                </a>
              </div>

              {/* College & University */}
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-200">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen size={28} className="text-purple-600" />
                  <h3 className="text-xl font-bold text-slate-900">College & University</h3>
                </div>
                <p className="text-slate-700 mb-6 leading-relaxed">
                  Designed to build pragmatic, long-term leadership capabilities among students as they move toward careers.
                </p>
                <a
                  href="https://www.thevanguardnetwork.com/_files/ugd/e6a994_dde1e8f7c3244a229fa8e507806a1e5e.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
                >
                  Learn More
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Testimonial Section */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-16"
        >
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <img
                  src="https://static.wixstatic.com/media/e6a994_b922da178ab646a38f19b283954f1585~mv2.jpeg"
                  alt="Emily Jiang"
                  className="w-full max-w-sm mx-auto rounded-xl shadow-lg"
                />
              </div>
              
              <div>
                <blockquote className="text-2xl italic text-slate-700 mb-8 leading-relaxed">
                  "Working to create the New Leaders Program was a formative experience. I had the opportunity to ideate and collaborate with brilliant leaders, which pushed my own thinking and confidence in a work environment. I'm excited to see this program's impact on future generations of New Leaders!"
                </blockquote>
                
                <div>
                  <div className="font-bold text-xl text-slate-900 mb-2">EMILY JIANG</div>
                  <div className="text-slate-600 mb-1">Co-creator of New Leaders</div>
                  <div className="text-slate-600 mb-1">Venture Fellow at Springdale Ventures and Notley Investments</div>
                  <div className="text-slate-600">MBA candidate, Kellogg School of Management</div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Alumni Organizations */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-16"
        >
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              New Leaders alumni are now advancing their careers at these and other organizations
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-items-center">
              {alumniCompanies.map((logoUrl, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center justify-center h-20 w-full"
                >
                  <img
                    src={logoUrl}
                    alt={`Alumni company ${index + 1}`}
                    className="max-h-12 max-w-full object-contain opacity-70 hover:opacity-100 transition-opacity duration-200"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Key Program Advisors */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mb-16"
        >
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Key Program Advisors*</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {advisors.map((advisor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.05, duration: 0.5 }}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">{advisor}</span>
                </motion.div>
              ))}
            </div>
            
            <p className="text-sm text-slate-500 mt-8 italic">
              *Other individuals have also provided important advice and counsel, which are gratefully acknowledged.
            </p>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-xl p-8 md:p-12 text-white">
            <h2 className="text-3xl font-bold mb-6">Ready to Unlock Your Leadership Potential?</h2>
            <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Join the next generation of leaders who are building real-world capabilities through peer-to-peer engagement 
              and insights from experienced executives.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                <Users size={20} />
                Get Started
              </Link>
              <Link
                to="/programs-v2"
                className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                <Calendar size={20} />
                View All Programs
              </Link>
            </div>

            <div className="border-t border-blue-400 pt-6 mt-8">
              <p className="text-blue-200 mb-4">Connect with us</p>
              <a
                href="https://www.linkedin.com/company/newleaders/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white hover:text-blue-200 transition-colors duration-200"
              >
                <LinkedinIcon size={24} />
                <span className="font-medium">Follow New Leaders on LinkedIn</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default NewLeadersPage;