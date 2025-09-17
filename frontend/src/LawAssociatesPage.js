import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Clock, Target, CheckCircle, Star, Award, Briefcase } from 'lucide-react';

const LawAssociatesPage = () => {
  const coreModules = [
    {
      title: "Understanding In-House Law Departments",
      description: "What do in-house law department teams actually do? How should outside counsel operate to contribute best to clients?",
      sessions: "Three 90-minute modules"
    },
    {
      title: "The Role of the GC",
      description: "What GCs expect from in-house counsel and outside law firms. Understanding what 'business partner' means.",
      sessions: "Two 90-minute modules"
    },
    {
      title: "Critical EQ Factors",
      description: "Self-awareness, self-management, social awareness, and relationship management for legal professionals.",
      sessions: "Two 90-minute modules"
    },
    {
      title: "Situational Leadership",
      description: "Working effectively in teams and leading through influence - critical for success in legal careers.",
      sessions: "Two 90-minute modules"
    },
    {
      title: "Sector & Business Models",
      description: "How different business models shape the role of in-house counsel and law firm relationships.",
      sessions: "Two 90-minute modules"
    },
    {
      title: "Career Transitions",
      description: "Hard and soft success factors for transitioning into in-house positions or successful partner roles.",
      sessions: "Two 90-minute modules"
    },
    {
      title: "Success Pathways",
      description: "Potential career paths in corporate roles and client relationship success for partners.",
      sessions: "Two 90-minute modules"
    }
  ];

  const faculty = [
    {
      name: "Ann Kappler",
      title: "Executive VP & General Counsel",
      company: "Prudential",
      image: "https://static.wixstatic.com/media/e6a994_530d06a6898142d885db122b8337fabd~mv2.jpg/v1/fill/w_192,h_192,fp_0.56_0.25,q_75,enc_avif,quality_auto/e6a994_530d06a6898142d885db122b8337fabd~mv2.jpg"
    },
    {
      name: "Tom Sabatino",
      title: "Former Chief Legal Officer",
      company: "Rite Aid; Chair of The Vanguard GC Network",
      image: "https://static.wixstatic.com/media/e6a994_ab92d0708e7a4a32bd495d6b1b85b08e~mv2.png/v1/fill/w_192,h_192,q_75,enc_avif,quality_auto/e6a994_ab92d0708e7a4a32bd495d6b1b85b08e~mv2.png"
    },
    {
      name: "Alfreda Bradley-Coar",
      title: "General Counsel",
      company: "Obama Foundation",
      image: "https://static.wixstatic.com/media/e6a994_725cc2f6a7aa4f98bdeb404dbe189c0d~mv2.png/v1/fill/w_192,h_192,fp_0.48_0.4,q_75,enc_avif,quality_auto/e6a994_725cc2f6a7aa4f98bdeb404dbe189c0d~mv2.png"
    },
    {
      name: "Brandon Smith",
      title: "General Counsel",
      company: "CHS Inc.",
      image: "https://static.wixstatic.com/media/e6a994_7041fe6b96584dea937ffcbb578a436b~mv2.jpeg/v1/fill/w_192,h_192,q_75,enc_avif,quality_auto/e6a994_7041fe6b96584dea937ffcbb578a436b~mv2.jpeg"
    },
    {
      name: "Christian Desrosiers",
      title: "CEO",
      company: "Visceral AI",
      image: "https://static.wixstatic.com/media/e6a994_379d9cdc262c47518dabd8f8144a8ed1~mv2.jpeg/v1/fill/w_192,h_192,q_75,enc_avif,quality_auto/e6a994_379d9cdc262c47518dabd8f8144a8ed1~mv2.jpeg"
    },
    {
      name: "Craig Tooman",
      title: "CEO",
      company: "Silence Therapeutics",
      image: "https://static.wixstatic.com/media/e6a994_08d6d421426c462b9efc7537b56fd2da~mv2.jpg/v1/fill/w_192,h_192,q_75,enc_avif,quality_auto/e6a994_08d6d421426c462b9efc7537b56fd2da~mv2.jpg"
    },
    {
      name: "Gina Beredo",
      title: "EVP, General Counsel & Secretary",
      company: "Owens Corning",
      image: "https://static.wixstatic.com/media/e6a994_b8bb7b651425424294faf693545b5b15~mv2.jpeg/v1/fill/w_192,h_192,q_75,enc_avif,quality_auto/e6a994_b8bb7b651425424294faf693545b5b15~mv2.jpeg"
    },
    {
      name: "Don Hunt",
      title: "General Counsel",
      company: "The Hartford",
      image: "https://static.wixstatic.com/media/e6a994_56484c66a5574b209459ef88a3d1df70~mv2.jpg/v1/fill/w_192,h_192,fp_0.5_0.31,q_75,enc_avif,quality_auto/e6a994_56484c66a5574b209459ef88a3d1df70~mv2.jpg"
    },
    {
      name: "Heather French",
      title: "General Counsel",
      company: "Global Healthcare Exchange",
      image: "https://static.wixstatic.com/media/e6a994_b2f60f541d8749f2b78d4ba40078745a~mv2.jpeg/v1/fill/w_192,h_192,q_75,enc_avif,quality_auto/e6a994_b2f60f541d8749f2b78d4ba40078745a~mv2.jpeg"
    },
    {
      name: "Ram Charan",
      title: "Strategy Advisor",
      company: "",
      image: "https://static.wixstatic.com/media/e6a994_474ca3c2fe0343bdafda67dc2ed47523~mv2.png/v1/fill/w_192,h_192,q_75,enc_avif,quality_auto/e6a994_474ca3c2fe0343bdafda67dc2ed47523~mv2.png"
    },
    {
      name: "Heather White",
      title: "General Counsel",
      company: "Genpact",
      image: "https://static.wixstatic.com/media/e6a994_724f926b2e084788b1a425128cfba816~mv2.jpeg/v1/fill/w_192,h_192,q_75,enc_avif,quality_auto/e6a994_724f926b2e084788b1a425128cfba816~mv2.jpeg"
    },
    {
      name: "Ali Behbahani",
      title: "Partner",
      company: "New Enterprise Associates",
      image: "https://static.wixstatic.com/media/e6a994_894fc3e627d34aee999b41580d5e4add~mv2.jpg/v1/fill/w_192,h_192,fp_0.55_0.44,q_75,enc_avif,quality_auto/e6a994_894fc3e627d34aee999b41580d5e4add~mv2.jpg"
    },
    {
      name: "Patricia Astorga",
      title: "Chief Legal Officer",
      company: "Mintz Group",
      image: "https://static.wixstatic.com/media/e6a994_9aa0437d065d441ab7eaba6097c45e9a~mv2.jpg/v1/fill/w_192,h_192,fp_0.55_0.27,q_75,enc_avif,quality_auto/e6a994_9aa0437d065d441ab7eaba6097c45e9a~mv2.jpg"
    },
    {
      name: "Andrew Hall",
      title: "CEO",
      company: "Consano",
      image: "https://static.wixstatic.com/media/e6a994_86e8c174dcea431abfc8aeeb5bfa6bbf~mv2.jpeg/v1/fill/w_192,h_192,q_75,enc_avif,quality_auto/e6a994_86e8c174dcea431abfc8aeeb5bfa6bbf~mv2.jpeg"
    },
    {
      name: "David Rock",
      title: "CEO",
      company: "Neuroleadership Institute",
      image: "https://static.wixstatic.com/media/e6a994_dca1ec51388a46389188de032667b693~mv2.webp/v1/fill/w_192,h_192,fp_0.47_0.5,q_75,enc_avif,quality_auto/e6a994_dca1ec51388a46389188de032667b693~mv2.webp"
    }
  ];

  const programFeatures = [
    "Interactive faculty-led conversations",
    "No podium, no PowerPoint, no presentations",
    "Highly interactive with simulations and case studies",
    "60-90 minute peer development sessions after each module",
    "Small cohorts of up to 20 participants",
    "Tables of 4-5 individuals for maximum engagement",
    "Customizable timing and cadence",
    "Face-to-face or hybrid format options"
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
              alt="Law Associates Accelerator Program"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h2 className="text-2xl font-bold">ASSOCIATE ACCELERATOR PROGRAM</h2>
            </div>
          </div>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold text-slate-900 mb-6">
              LAW ASSOCIATES ACCELERATOR
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Associates are the future of every law firm–whether they become partners, or go in-house to corporate law departments–and thus swiftly become potential clients of the firm.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <span className="bg-[#045184] text-white px-4 py-2 rounded-full text-sm font-medium">
                Legal Professional Development
              </span>
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                Up to 20 per cohort
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
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Program Context</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <p className="text-slate-600 leading-relaxed mb-6">
                Often, associates do not receive the careful and calibrated development that will enable them to become their best on whichever track they advance. In particular, they need development support in two critical areas:
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle size={24} className="text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-800">EQ and Soft Skills</h4>
                    <p className="text-slate-600">Required to excel as high-performance professionals in today's legal environment.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={24} className="text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-800">Business Understanding</h4>
                    <p className="text-slate-600">Pragmatic understanding of what drives business and how to be an effective business partner.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-slate-100 rounded-xl p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Program Outcomes</h3>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-center gap-2">
                  <Target size={16} className="text-[#00A8E1]" />
                  Accelerated readiness for career development
                </li>
                <li className="flex items-center gap-2">
                  <Target size={16} className="text-[#00A8E1]" />
                  Enhanced leadership capabilities
                </li>
                <li className="flex items-center gap-2">
                  <Target size={16} className="text-[#00A8E1]" />
                  Confidence for new challenges
                </li>
                <li className="flex items-center gap-2">
                  <Target size={16} className="text-[#00A8E1]" />
                  Improved talent retention and attraction
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Core Curriculum */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Core Curriculum</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreModules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#045184] text-white flex items-center justify-center font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{module.title}</h3>
                    <p className="text-slate-600 mb-3 leading-relaxed">{module.description}</p>
                    <div className="flex items-center gap-2 text-sm text-[#00A8E1] font-medium">
                      <Clock size={16} />
                      {module.sessions}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Faculty Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Exceptional Faculty</h2>
          <p className="text-slate-600 text-center mb-8 max-w-4xl mx-auto leading-relaxed">
            Faculty drawn from alumni in-house counsel, GCs, CEOs, C-Suite executives, search experts, in-house coaches, and career development professionals from our network of over 300+ top executives.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {faculty.map((member, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                className="text-center"
              >
                <div className="w-24 h-24 rounded-full bg-slate-200 mx-auto mb-3 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-slate-900 mb-1 text-sm">{member.name}</h3>
                <p className="text-xs text-slate-600 mb-1">{member.title}</p>
                {member.company && (
                  <p className="text-xs text-[#00A8E1] font-medium">{member.company}</p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Program Design */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Program Design</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Based on The Vanguard Network's proven approach with top leaders across sectors. Each module features cohorts of up to 20 participants seated at tables of 4-5 individuals.
            </p>
            <div className="space-y-4">
              {programFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#045184] to-[#00A8E1] rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-6">Testimonial</h2>
            <div className="flex items-start gap-6 mb-6">
              <div className="flex-shrink-0">
                <img
                  src="https://static.wixstatic.com/media/e6a994_26e6ccbd052d412b8c76b555916d7c04~mv2.jpeg/v1/fill/w_101,h_101,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/e6a994_26e6ccbd052d412b8c76b555916d7c04~mv2.jpeg"
                  alt="Doug Barnard"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white/30"
                />
              </div>
              <blockquote className="text-lg leading-relaxed italic">
                "Over my 35 years as a partner at a top law firm and then a general counsel at three large companies, I was struck by how unprepared many law firm associates are to function as leaders and business partners—whether they were on a partner track at their law firm or moving in-house.<br/><br/>The Accelerator program responds to this challenge. Designed and led by GCs, senior counsel, corporate executives, and law firm senior partners, it focuses on critical EQ factors and business insights, from self-awareness to becoming a trusted advisor.<br/><br/>Whatever a law firm's size and focus, this program can significantly enhance the performance of its associates by focusing on what companies, their executives, their GCs, and their senior counsel value most in the attorney-client relationship."
              </blockquote>
            </div>
            <div className="border-t border-white/20 pt-4">
              <div className="font-bold text-lg">Doug Barnard</div>
              <div className="text-white/80">Former Senior Vice President, General Counsel, and Secretary</div>
              <div className="text-white/80">CF Industries</div>
            </div>
          </div>
        </motion.div>

        {/* Vanguard & Gravitas Team */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Vanguard & Gravitas Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-center"
            >
              <div className="w-48 h-48 rounded-full bg-slate-200 mx-auto mb-4 overflow-hidden">
                <img
                  src="https://static.wixstatic.com/media/e6a994_4d1d40c3300746a297c915ad5d294f7a~mv2.jpeg/v1/fill/w_225,h_225,al_c,lg_1,q_80,enc_avif,quality_auto/Helene%20Ashenberg.jpeg"
                  alt="Helene Ashenberg"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-slate-900 mb-2 text-lg">Helene Ashenberg</h3>
              <p className="text-slate-600">Founder and President</p>
              <p className="text-[#00A8E1] font-medium">Gravitas Search Partners</p>
            </motion.div>
            
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center"
            >
              <div className="w-48 h-48 rounded-full bg-slate-200 mx-auto mb-4 overflow-hidden">
                <img
                  src="https://static.wixstatic.com/media/e6a994_976059df6973424ba1feb8159a60fc31~mv2.jpg/v1/crop/x_0,y_0,w_2400,h_2396/fill/w_225,h_225,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Ken%20Banta.jpg"
                  alt="Ken Banta"
                  className="w-full h-full object-cover"
                  style={{ transform: 'scaleX(-1)' }}
                />
              </div>
              <h3 className="font-bold text-slate-900 mb-2 text-lg">Ken Banta</h3>
              <p className="text-slate-600">Founder and CEO</p>
              <p className="text-[#00A8E1] font-medium">The Vanguard Network</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Investment & Contact */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="bg-slate-900 rounded-2xl p-8 md:p-12 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Ready to Accelerate Your Associates?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your associates into confident leaders and business partners through our proven curriculum designed by GCs and industry leaders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://docs.google.com/forms/d/e/1FAIpQLSemh6GaEPGl5UnY09qJVJtPXfnVhPi7gp6OcKkL1CaMGGsbbw/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#00A8E1] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#0284c7] transition-all duration-300 flex items-center gap-2"
            >
              <Briefcase size={20} />
              Contact Us
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-slate-900 transition-all duration-300 flex items-center gap-2"
            >
              <Award size={20} />
              Learn More
            </motion.button>
          </div>
          <p className="text-white/60 mt-6 text-sm">
            Custom program design and investment structure available upon consultation
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LawAssociatesPage;