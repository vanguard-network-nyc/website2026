import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Lightbulb, GitMerge, Target, Plus, CheckCircle2, Users } from 'lucide-react';
import SEO from './SEO';

const Breadcrumb = () => (
  <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
    <Link to="/" className="hover:text-[#045184] transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    </Link>
    <ChevronRight size={14} />
    <Link to="/advisory" className="hover:text-[#045184] transition-colors">Advisory</Link>
    <ChevronRight size={14} />
    <span className="text-[#045184] font-medium">CEO Advisory</span>
  </nav>
);

const challenges = [
  {
    title: "High-Stakes Decisions",
    description: "Strategic choices rarely arrive with perfect information. CEOs need to weigh competing priorities, anticipate consequences, and make decisions that can shape the organization for years."
  },
  {
    title: "No Truly Neutral Sounding Board",
    description: "Executives, directors, investors, and advisors all bring their own perspectives and interests. It can be difficult for a CEO to find someone experienced enough to challenge their thinking with no agenda other than getting to the right answer."
  },
  {
    title: "Leadership Beyond Strategy",
    description: "Strategy is only part of the job. Talent, culture, organizational dynamics, board relationships, succession, and the performance of the senior team can determine whether even the best strategy succeeds."
  }
];

const steps = [
  { num: "01", title: "We Listen First", description: "Every organization and every CEO is different. We start by understanding the situation, the people involved, the pressures you are facing, and what success needs to look like." },
  { num: "02", title: "We Pressure-Test the Thinking", description: "We ask difficult questions, challenge assumptions, bring relevant experience to the table, and help you look around corners before committing to a course of action." },
  { num: "03", title: "We Help Turn Decisions Into Action", description: "The objective isn't a presentation or a report. It is a better decision and a practical path forward. Where useful, we stay involved to help drive implementation and strengthen the internal capabilities needed to sustain the result." }
];

const useCases = [
  {
    icon: <Lightbulb size={28} className="text-[#045184]" />,
    title: "A Trusted Advisor to the CEO",
    description: "Sometimes the issue isn't a lack of information. It's having someone independent to talk it through with. We work one-on-one with CEOs as a confidential sounding board on the issues that can be difficult to discuss elsewhere \u2014 from major strategic decisions and board dynamics to talent, succession, organizational politics, and personal leadership challenges. The objective is not to tell the CEO what to do. It is to ask the right questions, challenge assumptions, bring relevant experience to the conversation, and help the CEO reach a better decision."
  },
  {
    icon: <Users size={28} className="text-[#045184]" />,
    title: "Pressure-Testing the Senior Leadership Team",
    description: "A strong executive team can still fall into established patterns of thinking. We work with CEOs and leadership teams to test assumptions, surface disagreements, identify blind spots, and determine whether the organization is truly aligned around its priorities. By bringing an independent senior perspective into the room, we can help move the conversation beyond consensus and toward the questions that actually need to be addressed."
  },
  {
    icon: <Target size={28} className="text-[#045184]" />,
    title: "Evaluating Strategic Options",
    description: "The most important strategic decisions rarely have an obvious answer. Whether considering a new direction, responding to disruption, evaluating an acquisition, reshaping a portfolio, or deciding where to invest, we help CEOs examine the choices in front of them and the assumptions behind them. Rather than producing another strategy deck, we help leadership teams clarify the real alternatives, understand their implications, and determine what it will take to execute successfully."
  },
  {
    icon: <GitMerge size={28} className="text-[#045184]" />,
    title: "Catalyzing Organizational Change",
    description: "Transformation succeeds or fails through people. We help CEOs translate strategic intent into organizational action by identifying the leadership, talent, cultural, and capability changes required to deliver the desired outcome. Where appropriate, we stay involved through implementation, helping leadership teams maintain momentum while building the internal capabilities needed to sustain high performance."
  }
];

const differentiators = [
  { title: "Senior people, not junior teams.", description: "You work directly with experienced executives and advisors." },
  { title: "Conversation before presentation.", description: "We focus on the questions, decisions, and actions that matter rather than producing hundreds of pages of analysis." },
  { title: "Independent perspective.", description: "We have no internal constituency and no predetermined answer. Our role is to help you see the situation more clearly." },
  { title: "Advice grounded in execution.", description: "We understand that a decision is only valuable if the organization can actually deliver it." }
];

const CEOAdvisoryPage = () => {
  // Inject Service structured data
  React.useEffect(() => {
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Vanguard CEO Advisory Service",
      "description": "Confidential, senior advisory for CEOs navigating the most consequential decisions in leadership, strategy, talent, organizational performance, and the boardroom.",
      "provider": {
        "@type": "Organization",
        "name": "The Vanguard Network",
        "url": "https://thevanguardnetwork.com"
      },
      "serviceType": "Executive Advisory",
      "areaServed": "Worldwide",
      "audience": {
        "@type": "Audience",
        "audienceType": "CEOs, Chief Executive Officers, C-suite Leaders"
      }
    };

    const serviceScript = document.createElement('script');
    serviceScript.type = 'application/ld+json';
    serviceScript.setAttribute('data-schema-type', 'service');
    serviceScript.textContent = JSON.stringify(serviceSchema);
    document.head.appendChild(serviceScript);

    return () => {
      document.head.removeChild(serviceScript);
    };
  }, []);

  return (
    <div className="pt-40 pb-12 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100" data-testid="ceo-advisory-page">
      <SEO
        title="CEO Advisory"
        description="Confidential advisory for CEOs navigating the most consequential decisions in leadership, strategy, talent, organizational performance, and the boardroom. Complimentary 60-minute consultation."
        breadcrumbs={[
          { name: "Home", url: "https://thevanguardnetwork.com/" },
          { name: "Advisory", url: "https://thevanguardnetwork.com/advisory" },
          { name: "CEO Advisory", url: "https://thevanguardnetwork.com/ceo-advisory" }
        ]}
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
          <p className="text-sm font-semibold tracking-widest uppercase text-[#00A8E1] mb-6">Vanguard CEO Advisory Service</p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent py-2 leading-tight">
            The Trusted Advisor Every CEO Needs
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
              Confidential. Senior. Experienced. Real World. An advisory relationship for CEOs navigating the most consequential decisions in leadership, strategy, talent, organizational performance, and the boardroom.
            </p>
          </div>
        </motion.div>
      </div>

      {/* CTA Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8 mb-16">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-center"
        >
          <Link to="/contact" data-testid="ceo-advisory-hero-cta">
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
            The CEO Role Can Be a Lonely Place
          </h2>
          <div className="text-slate-600 leading-relaxed text-base md:text-lg max-w-3xl mb-12 space-y-4">
            <p>CEOs are expected to make consequential decisions with incomplete information, competing perspectives, and little room for error.</p>
            <p>Your executive team brings expertise, but also individual responsibilities and points of view. Your board provides oversight, but it is not always the place to work through an idea before it is fully formed. Traditional consultants can provide analysis, but often lack the personal experience of actually leading through complex situations.</p>
            <p>Sometimes what a CEO needs most is an experienced, independent advisor who understands the realities of leadership and is prepared to challenge their thinking.</p>
          </div>

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

      {/* Our Approach Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8 mb-16">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="bg-white rounded-3xl p-6 md:p-12 shadow-xl"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-[#00A8E1] mb-4">Our Approach</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
            Not Consultants. Trusted Advisors.
          </h2>
          <div className="text-slate-600 leading-relaxed text-base md:text-lg max-w-3xl mb-12 space-y-4">
            <p>We are a small, focused senior team that understands the issues CEOs face because we have spent decades leading, transforming, and advising complex organizations.</p>
            <p>We don't bring armies of junior consultants, hundreds of charts, or generic frameworks.</p>
            <p>Instead, we engage in intimate, structured conversations that help you clarify your thinking, challenge assumptions, evaluate options, and make better decisions.</p>
            <p>And when the situation requires more than advice, we can help turn those decisions into action while building the internal capabilities needed for sustainable high performance.</p>
          </div>

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

      {/* The Team Section — Advisor Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8 mb-16">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="bg-white rounded-3xl p-6 md:p-12 shadow-xl"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-[#00A8E1] mb-4">The Team</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
            Senior Advisors Who Understand What It Means to Lead
          </h2>
          <p className="text-slate-600 leading-relaxed text-base md:text-lg max-w-3xl mb-12">
            Vanguard brings together senior executives and advisors with decades of experience leading major organizations, navigating transformations, working with boards, building leadership teams, and advising CEOs through moments of significant change.
          </p>

          {/* Horizontal Cards Layout - matches /advisory */}
          <div className="space-y-6" data-testid="ceo-advisory-team-gallery">
            {/* Ken Banta */}
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-2xl flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full flex-shrink-0 overflow-hidden shadow-md">
                <img src="/ken-banta.jpg?v=2" alt="Ken Banta - Founder and Managing Director of The Vanguard Network" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3">KEN BANTA</h3>
                <p className="text-slate-600 leading-relaxed text-sm mb-3">
                  Ken helped lead eleven global turnarounds, mergers, and transformations, generating more than $83 billion in accretion. He has advised on many initiatives of varying scale and global reach, with playbooks that build high-performance cultures as a hallmark of his expertise.
                </p>
                <p className="text-xs text-slate-500 pt-3 border-t border-slate-200">Rhodes Scholar | Harvard Business Review Contributor | Co-author of "Ten Must Reads for CEOs"</p>
              </div>
            </div>

            {/* Judy Gawlik Brown */}
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-2xl flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full flex-shrink-0 overflow-hidden shadow-md">
                <img src="https://customer-assets.emergentagent.com/job_9392fb78-3fab-49ff-87cb-83766cde3627/artifacts/vtkscabk_Judy%20Gawlik%20Brown.jpg" alt="Judy Gawlik Brown - Executive Advisor" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3">JUDY GAWLIK BROWN</h3>
                <p className="text-slate-600 leading-relaxed text-sm mb-3">
                  Judy is a seasoned executive leader and board director with more than 25 years of experience driving strategic transformation, financial performance, and enterprise value across global healthcare, biotechnology, and manufacturing sectors. As Senior Vice President of Corporate Affairs at Amgen and former EVP and CFO at Perrigo, she has led enterprise transformation, ESG strategy, and global finance organizations with a steady focus on performance and purpose.
                </p>
                <p className="text-xs text-slate-500 pt-3 border-t border-slate-200">CPA | MBA, University of Chicago Booth School of Business | BS Accountancy, University of Illinois | Independent Director at Agilent Technologies and Belden Inc. | Advisor to MannaTree Partners</p>
              </div>
            </div>

            {/* Aileen Gonsalves */}
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-2xl flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full flex-shrink-0 overflow-hidden shadow-md">
                <img src="/aileen-gonsalves.jpg" alt="Aileen Gonsalves - Leadership Engagement Coach" className="w-full h-full object-cover" style={{ objectPosition: 'calc(50% - 20px) 20%' }} />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3">AILEEN GONSALVES</h3>
                <p className="text-slate-600 leading-relaxed text-sm mb-3">
                  Aileen brings her unique leadership communication approach, the Gonsalves Method, rooted in her career as an actor and director with the Royal Shakespeare Company. She has worked with Dame Judi Dench, Sir Simon Russell Beale, and other leading performers, now applying these skills to business leadership.
                </p>
                <p className="text-xs text-slate-500 pt-3 border-t border-slate-200">Royal Shakespeare Company | RADA Professor | Author, "Shakespeare and Meisner"</p>
              </div>
            </div>

            {/* Tom Hartman */}
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-2xl flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full flex-shrink-0 overflow-hidden shadow-md">
                <img src="https://customer-assets-rejwkqb3.emergentagent.net/job_95c11ed2-04fc-4e03-90f5-5a9265b65d8d/artifacts/x6slyocl_Tom%20Hartman.jpg" alt="Tom Hartman - Executive Coach at The Vanguard Network" className="w-full h-full object-cover" style={{ objectPosition: '50% 15%' }} />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3">TOM HARTMAN</h3>
                <p className="text-slate-600 leading-relaxed text-sm mb-3">
                  As a coach, Tom supports CXO member-clients in identifying and achieving their professional goals through the power of asking bold questions that expand what's possible for them. Tom brings to his coaching practice three decades in sales leadership working with clients in virtually every industry. He has managed teams responsible for up to $1 billion in annual revenue at global media companies including The Walt Disney Company and Conde Nast, and at technology companies such as DoubleClick (now Google), Innovid, and VideoAmp.
                </p>
                <p className="text-xs text-slate-500 pt-3 border-t border-slate-200">ICF Professional Coach Certification | MBA, The Wharton School, University of Pennsylvania | BA with Honors, University of Texas at Austin | DISC Assessment Practitioner | Hogan Leadership Provider</p>
              </div>
            </div>

            {/* Mohamed Ladha */}
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-2xl flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full flex-shrink-0 overflow-hidden shadow-md">
                <img src="https://customer-assets-rejwkqb3.emergentagent.net/job_95c11ed2-04fc-4e03-90f5-5a9265b65d8d/artifacts/s0wsneqa_1585009745531.jpeg" alt="Mohamed Ladha - Senior Advisor at The Vanguard Network" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3">MOHAMED LADHA</h3>
                <p className="text-slate-600 leading-relaxed text-sm mb-3">
                  Mohamed brings more than 25 years of global and U.S. biopharmaceutical leadership experience to his advisory practice, helping life sciences organizations strengthen commercial performance, accelerate growth, and turn strategy into execution. He has held senior leadership roles spanning commercial strategy, general management, market access, medical affairs, business development, supply chain, and enterprise transformation across emerging and established biopharmaceutical companies. Most recently, he served as President & General Manager, North America for Recordati Rare Diseases, where he led the company's largest fully integrated affiliate across the U.S. and Canada, with full P&L accountability for a nine-product portfolio expected to exceed $750 million in annual revenue. Today, Mohamed partners with life sciences organizations as a fractional enterprise and commercial executive, helping leadership teams accelerate transformation, optimize portfolio value, strengthen cross-functional alignment, and build high-performing organizations across oncology, hematology, rare disease, and specialty care markets.
                </p>
                <p className="text-xs text-slate-500 pt-3 border-t border-slate-200">MBA, Kellogg School of Management, Northwestern University | MPA, Harvard Kennedy School, Harvard University | 25+ Years Biopharmaceutical Leadership | Commercial Strategy & General Management | Full P&L Leadership | Market Access & Medical Affairs | Business Development & Portfolio Strategy | Supply Chain & Enterprise Transformation</p>
              </div>
            </div>

            {/* Richard Hulme */}
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-2xl flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full flex-shrink-0 overflow-hidden shadow-md">
                <img src="/richard-hulme.jpg" alt="Richard Hulme - Senior Advisor at The Vanguard Network" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3">RICHARD HULME</h3>
                <p className="text-slate-600 leading-relaxed text-sm mb-3">
                  Richard has over 25 years of experience in strategy consulting, global operations, and organizational excellence. During his 15 years at PricewaterhouseCoopers, he served as chief of staff to the PwC Global Board Chairman and delivered special projects for the PwC Global CEO.
                </p>
                <p className="text-xs text-slate-500 pt-3 border-t border-slate-200">Certified OKR Coach | BS William & Mary | MBA Carnegie Mellon</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Schedule a Call - Standalone Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8 mb-16">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl text-center"
        >
          <div className="w-14 h-14 rounded-full bg-[#00A8E1]/10 flex items-center justify-center mx-auto mb-5">
            <Plus size={28} className="text-[#00A8E1]" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">Want to learn more about our advisory team?</h3>
          <p className="text-slate-600 text-base mb-6 max-w-xl mx-auto">Get in touch to discuss your specific situation and the experience that would be most useful.</p>
          <Link
            to="/contact"
            className="inline-block font-semibold text-sm text-white bg-gradient-to-r from-[#045184] to-[#00A8E1] px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-200"
            data-testid="ceo-advisory-schedule-call"
          >
            Schedule a Call
          </Link>
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
          <p className="text-sm font-semibold tracking-widest uppercase text-[#00A8E1] mb-4">Where CEOs Have Found This Most Valuable</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
            Real Situations. Experienced Guidance.
          </h2>
          <p className="text-slate-600 leading-relaxed text-base md:text-lg max-w-3xl mb-12">
            Every CEO's situation is different, but there are recurring moments when an independent, experienced perspective can be particularly valuable. Here are four ways CEOs and senior leadership teams have worked with Vanguard.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((uc, index) => (
              <motion.div
                key={uc.title}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.15, duration: 0.6 }}
                className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 border-t-4 border-[#045184]"
                data-testid={`ceo-use-case-${index}`}
              >
                <div className="mb-4">{uc.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{uc.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{uc.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Why Vanguard? — Differentiators */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8 mb-16">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="bg-white rounded-3xl p-6 md:p-12 shadow-xl"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-[#00A8E1] mb-4">Why Vanguard?</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
            Experience Without the Consulting Machine
          </h2>
          <div className="text-slate-600 leading-relaxed text-base md:text-lg max-w-3xl mb-12 space-y-4">
            <p>Between our senior advisors, Vanguard brings decades of experience addressing complex leadership challenges from inside major organizations and alongside the executives leading them.</p>
            <p>Our model is deliberately different from a traditional strategy or management consultancy.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {differentiators.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                className="flex gap-4 p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50"
                data-testid={`ceo-differentiator-${index}`}
              >
                <CheckCircle2 size={24} className="text-[#00A8E1] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base md:text-lg font-bold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8 mb-16">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center rounded-3xl p-8 md:p-16 bg-gradient-to-r from-[#045184] to-[#00A8E1]"
          data-testid="ceo-advisory-cta-section"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-white/70 mb-4">Start With a Conversation</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">Experience the Vanguard Approach</h2>
          <div className="text-lg text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed space-y-3">
            <p>The best way to understand how Vanguard CEO Advisory works is to experience it.</p>
            <p>We would be pleased to learn more about the leadership or strategic challenge you are facing and explore whether our experience could be useful.</p>
            <p>We offer CEOs a complimentary 60-minute confidential consultation with a senior Vanguard advisor. Bring a real issue. We'll bring an independent perspective, relevant experience, and the questions that may help you see it differently.</p>
          </div>
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#045184] px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:bg-blue-50"
              data-testid="ceo-advisory-bottom-cta"
            >
              Request Your Complimentary 60-Minute Consultation
            </motion.button>
          </Link>
          <p className="text-white/50 text-sm mt-4">No pitch. No obligation. Strictly confidential.</p>
        </motion.div>
      </div>

      {/* Trust Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8 mb-8">
        <div className="text-center py-6">
          <p className="text-slate-500" style={{ fontSize: '18px' }}>
            A service of <span className="font-bold text-slate-700">The Vanguard Network</span> &mdash; trusted by <span className="font-bold text-slate-700">2,000+ senior executives</span> across industries since 2019.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CEOAdvisoryPage;
