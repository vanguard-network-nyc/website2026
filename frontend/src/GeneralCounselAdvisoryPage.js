import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Users, Shield, Target, Lightbulb, Building2, GitMerge, Scale, Play, Plus } from 'lucide-react';

const Breadcrumb = () => (
  <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
    <Link to="/" className="hover:text-[#045184] transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    </Link>
    <ChevronRight size={14} />
    <Link to="/advisory" className="hover:text-[#045184] transition-colors">Advisory</Link>
    <ChevronRight size={14} />
    <span className="text-[#045184] font-medium">General Counsel Advisory</span>
  </nav>
);

const SEO = ({ title, description }) => {
  React.useEffect(() => {
    document.title = `${title} | The Vanguard Network`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description);
  }, [title, description]);
  return null;
};

const advisors = [
  {
    name: "Ken Banta",
    title: "Founder & CEO, The Vanguard Network",
    creds: "Decades of experience in in-house and advisory leadership. Founder of Vanguard's GC, Life Sciences CEO, and Chief of Staff Networks \u2014 2,000+ senior executives.",
    linkedin: "https://www.linkedin.com/in/ken-banta-1651946/",
    photo: "/ken-banta.jpg"
  },
  {
    name: "David Robinson",
    title: "Former EVP & General Counsel",
    creds: "Former Executive Vice President & General Counsel at The Hartford, one of the nation's leading insurance and financial services companies.",
    linkedin: "https://www.linkedin.com/in/david-c-robinson-b6523a14/",
    photo: null
  },
  {
    name: "Tom Sabatino",
    title: "General Counsel & CLO (Multiple F500)",
    creds: "Held GC and CLO roles at Rite Aid, Walgreens Boots Alliance, Kraft, and Tractor Supply Company. Deep expertise in complex regulated environments.",
    linkedin: "https://www.linkedin.com/in/thomas-sabatino-aa297b16/",
    photo: null
  },
  {
    name: "Jos\u00e9 Ram\u00f3n Gonz\u00e1lez",
    title: "Former Chief Legal Officer, Equitable Holdings",
    creds: "25+ years of senior legal leadership at major publicly held corporations. Former CLO & Corporate Secretary at Equitable Holdings.",
    linkedin: "https://www.linkedin.com/in/joseramongonzalez/",
    photo: null
  },
  {
    name: "Stephen Gauster",
    title: "Former EVP & General Counsel, MetLife",
    creds: "Former EVP & GC at MetLife. Prior roles at Assurant, Prudential, and Cleary Gottlieb. Deep experience leading legal function through enterprise transformation.",
    linkedin: "https://www.linkedin.com/in/stephengauster/",
    photo: null
  },
  {
    name: "Terry Szmagala",
    title: "Former EVP & CLO, Eaton Corporation",
    creds: "Led legal and government affairs functions at Eaton ($130B market cap multinational). Founder of TGS Advisory. Trusted counsel to boards and executive management teams.",
    linkedin: "https://www.linkedin.com/in/taras-szmagala/",
    photo: null
  },
  {
    name: "Michael Watras",
    title: "Founder & CEO, Straightline",
    creds: "Trusted advisor to C-suite executives worldwide for 25+ years. Founder of leading global strategic brand consultancy Straightline. Expert in leadership positioning and organizational narrative.",
    linkedin: "https://www.linkedin.com/in/michael-watras-a8b83627/",
    photo: null
  }
];

const useCases = [
  {
    icon: <Lightbulb size={28} className="text-[#045184]" />,
    title: "AI Adoption: Balancing Benefits and Risks",
    description: "The GC needed to assess a range of AI applications and vendors to determine the best strategic approach for the department. We brought our experience in this kind of strategic decision-making to bear \u2014 assessing risks and benefits while looking around corners at future implications \u2014 resulting in a nuanced GC-led AI strategy."
  },
  {
    icon: <Building2 size={28} className="text-[#045184]" />,
    title: "New Expectations of the GC: Leading Without Authority",
    description: "The CEO tasked the GC with expanding their bandwidth to address critical 'soft' dimensions of leadership across the C-Suite. We developed a customized approach that combined probing questions with anecdotes, helping create a respected 'leader through influence' role for the GC with their peers."
  },
  {
    icon: <GitMerge size={28} className="text-[#045184]" />,
    title: "Integrating Teams: Mergers, Reorgs, and What Comes Next",
    description: "Whether driven by merger or internal reorganization, these are among the most challenging situations a GC will face. We start by analyzing the organization's specific needs and the legal team's requirements, then determine which capabilities are necessary and how the function should be organized."
  },
  {
    icon: <Scale size={28} className="text-[#045184]" />,
    title: "Navigating a Disruptive Environment",
    description: "The CEO and board are increasingly turning to the GC to help navigate legal, reputational, and governance pressures. Drawing on real-world experience, we worked with the GC to evaluate stakeholder positions, competitor postures, and long-term principles \u2014 delivering an executable strategy and action plan."
  }
];

const challenges = [
  {
    title: "Rising Complexity",
    description: "From AI governance to regulatory scrutiny, the GC's mandate now extends far beyond legal counsel into enterprise strategy and risk leadership."
  },
  {
    title: "No Neutral Sounding Board",
    description: "Internal colleagues have competing interests. Outside counsel has billable incentives. Peers are often competitors. The trusted confidant is missing."
  },
  {
    title: "The Expectation Gap",
    description: "CEOs and boards expect GCs to operate as enterprise leaders. Most GCs want to \u2014 but need experienced support to make that transition decisively."
  }
];

const steps = [
  { num: "01", title: "We Listen First", description: "We understand your specific situation before offering any perspective. No templates. No assumptions." },
  { num: "02", title: "We Engage Deeply", description: "Through structured conversation, we help you clarify your thinking, stress-test your assumptions, and sharpen your plan." },
  { num: "03", title: "You Lead the Outcome", description: "We don't hand you a report. We help you reach your own best decision \u2014 and own it with confidence." }
];

const GeneralCounselAdvisoryPage = () => {
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef(null);

  const handleVideoReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setVideoEnded(false);
    }
  };

  return (
    <div className="pt-40 pb-12 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100" data-testid="gc-advisory-page">
      <SEO
        title="Vanguard Strategic Counsel Service"
        description="Confidential advisory for General Counsel navigating the most complex dimensions of their role. Senior, experienced advisors who speak your language."
      />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8 mb-20">
        <Breadcrumb />
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-[#00A8E1] mb-6">Vanguard Strategic Counsel Service</p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent py-2 leading-tight">
            The Trusted Advisor Every General Counsel Deserves &mdash; But Rarely Has
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
              Confidential. Senior. Experienced. A private advisory relationship built for GCs navigating the most complex dimensions of their role.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Video Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8 mb-16">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="bg-white rounded-3xl p-6 md:p-12 shadow-xl border-2 border-transparent hover:border-[#045184]/10 transition-all duration-500 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#045184]/5 to-[#00A8E1]/5 rounded-full transform translate-x-20 -translate-y-20"></div>
          <div className="relative z-10">
            {/* Video placeholder - will be replaced with actual video */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-slate-900 flex items-center justify-center" data-testid="gc-advisory-video-placeholder">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border-2 border-white/30 mx-auto mb-4">
                  <Play size={36} className="text-white/70 ml-1" />
                </div>
                <p className="text-white/50 text-sm tracking-wide uppercase">Video coming soon</p>
                <p className="text-white/30 text-xs mt-2">Ken, David & Tom introduce the service</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CTA Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8 mb-20">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center"
        >
          <Link to="/contact" data-testid="gc-advisory-hero-cta">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-xl"
            >
              Request Your Complimentary 60-Minute Consultation
            </motion.button>
          </Link>
          <p className="text-slate-500 text-sm mt-4">No pitch. No obligation. Strictly confidential.</p>
        </motion.div>
      </div>

      {/* The Challenge Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8 mb-16">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="bg-white rounded-3xl p-6 md:p-12 shadow-xl"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-[#00A8E1] mb-4">The Challenge</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
            The GC Role Has Never Been More Demanding
          </h2>
          <p className="text-slate-600 leading-relaxed text-base md:text-lg max-w-3xl mb-12">
            Today's General Counsel is expected to be a legal expert, a business strategist, a people leader, and a board-facing executive &mdash; often simultaneously. The stakes are high and the issues are sensitive. Most GCs can't talk candidly about these challenges with colleagues, direct reports, or even their CEO. That's exactly the gap we were built to fill.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {challenges.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.15, duration: 0.6 }}
                className="border-l-4 border-[#00A8E1] pl-6"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8 mb-16">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="bg-white rounded-3xl p-6 md:p-12 shadow-xl"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-[#00A8E1] mb-4">Our Approach</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
            Not Consultants. Confidants.
          </h2>
          <p className="text-slate-600 leading-relaxed text-base md:text-lg max-w-3xl mb-12">
            We are a small, focused senior team. We don't bring hundreds of charts or data analysis. We engage in an intimate, structured conversation that helps to clarify your insights, recommendations, and decisions &mdash; and helps you test your thinking and verify your action plan.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.15, duration: 0.6 }}
                className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 text-center"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent mb-4">{step.num}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Advisors Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8 mb-16">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="bg-white rounded-3xl p-6 md:p-12 shadow-xl"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-[#00A8E1] mb-4">The Team</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
            Seven Senior Advisors. Decades of Real Experience.
          </h2>
          <p className="text-slate-600 leading-relaxed text-base md:text-lg max-w-3xl mb-12">
            Every advisor on our team has held, or closely supported, the GC role at major corporations. We speak your language because we've lived in your seat.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advisors.map((advisor, index) => (
              <motion.div
                key={advisor.name}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                data-testid={`advisor-card-${index}`}
              >
                {/* Photo placeholder */}
                <div className="w-full aspect-square bg-slate-200 flex items-center justify-center overflow-hidden">
                  {advisor.photo ? (
                    <img src={advisor.photo} alt={advisor.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <Users size={32} className="text-slate-400 mx-auto mb-2" />
                      <span className="text-xs text-slate-400 uppercase tracking-wider">Photo</span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{advisor.name}</h3>
                  <p className="text-xs font-semibold text-[#00A8E1] uppercase tracking-wide mb-3">{advisor.title}</p>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{advisor.creds}</p>
                  <a
                    href={advisor.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-xs font-semibold text-[#0077b5] border border-[#0077b5] px-3 py-1.5 rounded hover:bg-[#0077b5] hover:text-white transition-all duration-200"
                  >
                    LinkedIn
                  </a>
                </div>
              </motion.div>
            ))}

            {/* "Learn more" card */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="bg-gradient-to-br from-slate-100 to-blue-50 rounded-2xl flex items-center justify-center min-h-[280px]"
            >
              <div className="text-center p-6">
                <div className="w-12 h-12 rounded-full bg-[#00A8E1]/10 flex items-center justify-center mx-auto mb-4">
                  <Plus size={24} className="text-[#00A8E1]" />
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">Want to learn more about our full advisory team?</p>
                <Link
                  to="/contact"
                  className="inline-block text-xs font-semibold text-[#045184] border border-[#045184] px-4 py-2 rounded hover:bg-[#045184] hover:text-white transition-all duration-200"
                >
                  Schedule a Call
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Use Cases Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8 mb-16">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="bg-white rounded-3xl p-6 md:p-12 shadow-xl"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-[#00A8E1] mb-4">Where GCs Have Found This Most Valuable</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
            Real Situations. Experienced Guidance.
          </h2>
          <p className="text-slate-600 leading-relaxed text-base md:text-lg max-w-3xl mb-12">
            We've always found use cases helpful. Here are four situations where GCs have engaged the Vanguard Strategic Counsel Service.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((uc, index) => (
              <motion.div
                key={uc.title}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.15, duration: 0.6 }}
                className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 border-t-4 border-[#045184]"
                data-testid={`use-case-${index}`}
              >
                <div className="mb-4">{uc.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{uc.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{uc.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8 mb-16">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center rounded-3xl p-8 md:p-16 bg-gradient-to-r from-[#045184] to-[#00A8E1]"
          data-testid="gc-advisory-cta-section"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-white/70 mb-4">Start With a Conversation</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">Experience It Before You Commit</h2>
          <p className="text-lg text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            We offer every prospective client a complimentary 60-minute consultation &mdash; no pitch, no obligation. Just a candid conversation to see if this is the right fit for you.
          </p>
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#045184] px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:bg-blue-50"
              data-testid="gc-advisory-bottom-cta"
            >
              Schedule Your Complimentary Consultation
            </motion.button>
          </Link>
          <p className="text-white/50 text-sm mt-4">All conversations are strictly confidential.</p>
        </motion.div>
      </div>

      {/* Trust Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8 mb-8">
        <div className="text-center py-6">
          <p className="text-slate-500 text-sm">
            A service of <span className="font-bold text-slate-700">The Vanguard Network</span> &mdash; trusted by <span className="font-bold text-slate-700">2,000+ senior executives</span> across industries since 2019.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GeneralCounselAdvisoryPage;
