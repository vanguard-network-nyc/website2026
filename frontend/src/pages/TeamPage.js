import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Breadcrumb from '../Breadcrumb';
import SEO from '../SEO';
import { Users, Linkedin, Globe, Mail, ChevronRight, ChevronDown, X, ExternalLink } from 'lucide-react';

const TeamPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState({});

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/team`);
        if (!response.ok) throw new Error('Failed to fetch team members');
        const data = await response.json();
        
        // Group team members by section
        const grouped = data.reduce((acc, member) => {
          const section = member.section || 'Other';
          if (!acc[section]) {
            acc[section] = [];
          }
          acc[section].push(member);
          return acc;
        }, {});
        
        setSections(grouped);
        setTeamMembers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching team members:', error);
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  if (loading) {
    return (
      <div className="pt-40 pb-12 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#045184] mx-auto mb-4"></div>
          <p className="text-slate-600 text-base md:text-lg">Loading team members...</p>
        </div>
      </div>
    );
  }

  return (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="pt-40 pb-12 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
  >
    <SEO 
      title="Our Team"
      description="Meet the leadership team behind The Vanguard Network. Experienced executives dedicated to helping leaders grow through peer connections and advisory services."
    />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8">
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
          Our Team
        </h1>
        <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
          Meet the experienced leadership team behind The Vanguard Network. Our team brings decades of combined experience in executive leadership, strategic consulting, and organizational development to help senior leaders achieve breakthrough results.
        </p>
      </motion.div>

      {/* Dynamic Team Sections */}
      {(() => {
        // Separate Leadership Team from others
        const leadershipTeam = sections['Leadership Team'] || [];
        const seniorLeadership = sections['Senior Leadership Team'] || [];
        const contentMedia = sections['Content & Media Team'] || [];
        
        // Combine Senior Leadership and Content & Media teams
        const combinedTeam = [...seniorLeadership, ...contentMedia].sort((a, b) => {
          // Sort by last name
          const lastNameA = a.name.split(' ').slice(-1)[0].toLowerCase();
          const lastNameB = b.name.split(' ').slice(-1)[0].toLowerCase();
          return lastNameA.localeCompare(lastNameB);
        });
        
        return (
          <>
            {/* Leadership Team - Ken Banta and Tony Powe */}
            {leadershipTeam.length > 0 && (
              <div className="mb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-7xl xl:max-w-4xl mx-auto">
                  {leadershipTeam.map((member, index) => (
                    <motion.div
                      key={member.id}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + (index * 0.1), duration: 0.8 }}
                      className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="text-center mb-6">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                          className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 shadow-lg"
                        >
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{member.name}</h3>
                        <p className="text-sm font-semibold mb-2" style={{ color: '#00A8E1' }}>{member.role}</p>
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-[#045184] to-[#00A8E1] hover:shadow-lg transition-all duration-300"
                          >
                            <Linkedin className="text-white" size={20} />
                          </a>
                        )}
                      </div>
                      {member.bio && <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">{member.bio}</p>}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Combined Team - Sorted alphabetically by last name */}
            {combinedTeam.length > 0 && (
              <div className="mb-16">
                <div className="flex flex-wrap gap-8 justify-center max-w-7xl mx-auto mb-12">
                  {combinedTeam.map((member, index) => (
                    <motion.div
                      key={member.id}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.8 + (index * 0.1), duration: 0.8 }}
                      className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 w-full md:w-[calc(50%-1rem)] xl:w-[calc(33.333%-1.334rem)]"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="text-center mb-6">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 1.0 + index * 0.1, duration: 0.5 }}
                          className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 shadow-lg"
                        >
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{member.name}</h3>
                        <p className="text-sm font-semibold mb-2" style={{ color: '#00A8E1' }}>{member.role}</p>
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-[#045184] to-[#00A8E1] hover:shadow-lg transition-all duration-300"
                          >
                            <Linkedin className="text-white" size={20} />
                          </a>
                        )}
                      </div>
                      {member.bio && <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">{member.bio}</p>}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </>
        );
      })()}

      {/* Our Approach */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="mb-16"
      >
        <div className="bg-white rounded-2xl p-4 md:p-8 md:p-6 md:p-12 shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-8" style={{ color: '#045184' }}>
            Our Commitment to Excellence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:p-8">
            {[
              {
                title: 'Proven Experience',
                description: 'Our team brings decades of combined experience in executive leadership, strategic consulting, and organizational development.',
                icon: <Award size={48} />
              },
              {
                title: 'Personalized Approach',
                description: 'We tailor our programs and coaching to meet the unique needs and challenges of each leader and organization.',
                icon: <Target size={48} />
              },
              {
                title: 'Lasting Impact',
                description: 'We focus on creating sustainable change and long-term success for our members and their organizations.',
                icon: <Users size={48} />
              }
            ].map((approach, index) => (
              <motion.div
                key={approach.title}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.5 + index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-gradient-to-r from-[#045184] to-[#00A8E1]">
                  <div className="text-white">{approach.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{approach.title}</h3>
                <p className="text-slate-600 leading-relaxed">{approach.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.8 }}
        className="text-center rounded-2xl p-6 md:p-12"
        style={{ backgroundColor: '#045184' }}
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">Ready to Work with Our Team?</h2>
        <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
          Connect with our experienced leadership team to explore how we can help you unlock high-performance leadership and drive transformational change in your organization.
        </p>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.9, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/contact"
            className="bg-white text-[#045184] w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-base transition-all duration-200 hover:bg-blue-50 inline-flex items-center justify-center gap-2"
          >
            Get Started Today
            <ArrowRight size={20} />
          </Link>
          <Link
            to="/advisory"
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#045184] w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-base transition-all duration-200 inline-flex items-center justify-center gap-2"
          >
            Learn About Our Services
            <Target size={20} />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  </motion.div>
  );
};


export default TeamPage;
