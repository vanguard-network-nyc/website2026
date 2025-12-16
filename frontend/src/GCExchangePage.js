import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Calendar, MapPin, CheckCircle, ExternalLink } from 'lucide-react';

const GCExchangePage = () => {
  const [gcMembers, setGcMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGCMembers();
  }, []);

  const fetchGCMembers = async () => {
    try {
      setLoading(true);
      const backendUrl = import.meta.env?.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/gc-members`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch GC members: ${response.status} ${response.statusText}`);
      }
      
      const membersData = await response.json();
      setGcMembers(membersData);
    } catch (err) {
      console.error('Error fetching GC members:', err);
      setError(err.message);
      // Use empty array if API fails
      setGcMembers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-12 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
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
              General Counsel Exchange
            </span>
          </div>
          
          <h1 className="text-3xl md:text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 leading-tight">
            GC Exchange
          </h1>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-12">
            Executive Exchanges designed to enable GCs to meet with their peers in regularly scheduled sessions, 
            discuss common issues, share solutions, and network.
          </p>

          {/* Testimonial */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-white rounded-xl shadow-lg p-8 mb-8 max-w-4xl mx-auto"
          >
            <blockquote className="text-xl italic text-slate-700 mb-6 leading-relaxed">
              "The exchange has been a unique opportunity to work on real world leadership challenges with peer GCs. 
              It was better than many hours of expensive advisory time - and I made important additions to my network."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div>
                <div className="font-bold text-slate-900">DAVID ROBINSON</div>
                <div className="text-slate-600">Former General Counsel, The Hartford</div>
              </div>
            </div>
          </motion.div>

          <Link
            to="#apply"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Users size={20} />
            Apply to Join
          </Link>
        </motion.div>

        {/* Context Section */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-16"
        >
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Context</h2>
            <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed">
              <p className="mb-4">
                Launched in July 2022, the GC Exchange is for GC members of the Vanguard Network to hold regular 
                dialogue with peers around immediate critical issues, and a combination of problem solving and 
                networking in a smaller group with strong follow up.
              </p>
              <p className="mb-6">
                This series of Executive Exchanges is designed to enable GCs in various disciplines an opportunity 
                to meet with their peers in regularly scheduled sessions, to discuss common issues, share solutions, and network.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg">
                <p className="mb-2">
                  <a 
                    href="https://drive.google.com/file/d/1JFd42YqS13m2ZkfAB0cnPZQ9TgI0OqwN/view?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-1"
                  >
                    Click here <ExternalLink size={16} />
                  </a>
                  {" "}for a recap of some the issues that were discussed in 2024.
                </p>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Note that there is a maximum of 15 participants per exchange. New exchanges will be launched once there is a quorum of 8 participants.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Program Section */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-16"
        >
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Program</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">Attendees are General Counsels</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">Vanguard convenes and facilitates the meetings, generates meeting notes and action steps, and follows up to help ensure execution</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">Follow-up includes working with designated members of the GCs team, e.g. COO or Chief of Staff, to help ensure execution on identified priorities</span>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar size={20} className="text-blue-500 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">Sessions are held monthly and run ≈ 60-90 minutes, with the appropriate length decided by the participants</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">All aspects of the exchange are confidential</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">Topics are submitted in advance by attendees</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">Each session is handled situationally, ranging from discussion of a number of topics, to several longer modules on issues important to the entire group</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">Additional exchange groups may be formed as desired</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-blue-500 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">All meetings are currently via Zoom</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Participants Section */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-16"
        >
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Participants Include</h2>
            
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-slate-600">Loading participants...</p>
              </div>
            ) : error && gcMembers.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-600 mb-4">Unable to load participants at the moment.</p>
                <button 
                  onClick={fetchGCMembers}
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {gcMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.6 }}
                    className="text-center group"
                  >
                    <div className="mb-4">
                      {member.headshot ? (
                        <img
                          src={member.headshot}
                          alt={member.whole_name}
                          className="w-24 h-24 rounded-full mx-auto object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full mx-auto bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center shadow-lg">
                          <Users size={32} className="text-blue-600" />
                        </div>
                      )}
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1 text-sm uppercase tracking-wide">
                      {member.whole_name}
                    </h3>
                    {member.position && (
                      <p className="text-xs text-slate-600 mb-1">
                        {member.position}
                      </p>
                    )}
                    {member.company && (
                      <p className="text-xs text-slate-500">
                        {member.company}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.section>

        {/* What Vanguard Does Section */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mb-16"
        >
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">What Vanguard Does</h2>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-green-500 mt-1 flex-shrink-0" />
                <span className="text-slate-700">Handles technical set up</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-green-500 mt-1 flex-shrink-0" />
                <span className="text-slate-700">Ken Banta or another senior colleague moderates the sessions</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-green-500 mt-1 flex-shrink-0" />
                <div className="text-slate-700">
                  <span className="font-semibold">Vanguard handles the entire process, including:</span>
                  <ul className="mt-2 ml-4 space-y-1 text-sm">
                    <li>• Maintaining group membership</li>
                    <li>• Issuing invitations, reminders and notices</li>
                    <li>• Creating an agenda prior to each meeting</li>
                    <li>• Moderating and leading the sessions</li>
                    <li>• Handling follow up on agenda items with GCs and their designated executives</li>
                    <li>• Producing an anonymized record of the meeting that can be shared with your team</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Investment Section */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-16"
        >
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Investment</h2>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
              <div className="text-slate-700">
                <p className="mb-2 font-semibold">Included in an individual GC or enterprise Vanguard membership.</p>
                <p className="text-sm">Or, $14,400/year for à la carte members.</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Apply Section */}
        <motion.section
          id="apply"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-xl p-8 md:p-12 text-white">
            <h2 className="text-3xl font-bold mb-6">Ready to Join the GC Exchange?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Connect with peer General Counsels and elevate your leadership through collaborative problem-solving.
            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfMnPiPKkngbiZCeLtGCekiepzaydfas1hAguO6LSoNdeTS1Q/viewform?usp=sf_link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#045184] hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Users size={20} />
              Apply Here
              <ExternalLink size={16} />
            </a>
            <p className="mt-4 text-sm text-blue-200">
              Maximum of 15 participants per exchange • New exchanges launch with 8+ participants
            </p>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default GCExchangePage;