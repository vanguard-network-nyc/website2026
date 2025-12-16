import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Calendar, MapPin, CheckCircle, ExternalLink, DollarSign, Clock, Target } from 'lucide-react';

const SeniorCounselExchangePage = () => {
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
              Senior Leadership Program
            </span>
          </div>
          
          <h1 className="text-3xl md:text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 leading-tight">
            Senior In-House Counsel<br />Network & Exchange
          </h1>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-12">
            A leadership program for Deputy General Counsels and other Senior In-House Counsels, designed to address the unique challenges of supporting the GC, advising the C-suite, and leading legal teams.
          </p>
        </motion.div>

        {/* Context Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="bg-white rounded-xl shadow-lg p-4 md:p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">Context</h2>
          <div className="prose prose-lg max-w-none text-slate-700">
            <p className="text-center mb-6">
              Deputy General Counsel and other Senior In-House Counsel hold important and challenging leadership positions. They support and advise not only the GC but also other members of the C-suite and, sometimes, the Board. At the same time, Senior Counsels are business partners with the rest of the enterprise and have their own teams to lead.
            </p>
            <p className="text-center">
              However, as we have heard from many of these leaders and their GCs, there are often very limited opportunities to discuss these leadership challenges with each other and to explore them with experts. To respond to these needs, The Vanguard Network is launching this new Senior In-House Counsel Network and Exchange.
            </p>
          </div>
        </motion.div>

        {/* Program Overview */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="bg-white rounded-xl shadow-lg p-4 md:p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">The Program</h2>
          <div className="prose prose-lg max-w-none text-slate-700">
            <p className="mb-4">
              The network draws on the successful models of Vanguard's existing networks for GC, Life Sciences CEOs, and Chief Sustainability Officers.
            </p>
            <p className="mb-4">
              As with these networks, the core activities centre around a monthly exchange. An intimate conversation among peers on leadership topics that really matter to them–from building Executive Presence to time and priority management, growing their EQ, and being a valued business partner.
            </p>
            <p className="mb-4">
              The conversations are catalyzed during 90-minute, monthly virtual meetings, then extended and reinforced via leadership content (videos, podcasts), side conversations, and other elements.
            </p>
            <p className="mb-4">
              As the participants determine, outside contributors may be periodically invited to join the discussion. Examples of such contributors can range from GCs to external stakeholders, to CEOs, to behavioral psychologists–any perspective or experience that can enrich the participants' leadership.
            </p>
            <p>
              Among the exchange's valuable outputs are monthly playbooks summarizing the key takeaways from the leadership conversations. The playbook content is non-attributed, in line with the Chatham House Rules principles applied to all aspects of the exchange.
            </p>
          </div>
        </motion.div>

        {/* Testimonial */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="bg-white rounded-xl shadow-lg p-4 md:p-8 mb-12"
        >
          <blockquote className="text-xl italic text-slate-700 mb-6 leading-relaxed text-center">
            "Networking plays a critical part in our roles today. Vanguard provides a unique platform for senior counsel where candid conversations about real issues can take place and lasting introductions made. I certainly benefited from this on my journey to GC."
          </blockquote>
          <div className="text-center">
            <div className="font-bold text-slate-900 text-lg">HEATHER FRENCH</div>
            <div className="text-slate-600 mb-2">Chief Legal Officer and Corporate Secretary</div>
            <div className="text-slate-600 mb-2">GHX</div>
            <div className="text-sm text-blue-600 font-medium">2022-2023 Vanguard Next Gen GC participant</div>
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="bg-white rounded-xl shadow-lg p-4 md:p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:p-8 mb-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Selective Membership</h3>
              <p className="text-slate-600">
                Membership includes concurrence by the GC/CLO to whom the Senior Counsel reports
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Monthly Exchanges</h3>
              <p className="text-slate-600">
                90-minute virtual exchange meetings that run monthly throughout the year
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Target className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Capped Groups</h3>
              <p className="text-slate-600">
                Seats for each exchange group are capped at 20 for intimate discussions
              </p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-slate-700">
            <p className="text-center mb-4">
              Vanguard manages all aspects of the network and moderates the monthly exchanges, applying the expertise it has developed in over a decade of working with hundreds of top executives on leadership programming.
            </p>
            <p className="text-center mb-4">
              More than one Senior Counsel from an organization may participate in an exchange "group", provided that the respective GC/CLO agrees.
            </p>
            <p className="text-center">
              The initial commitment to the Network is one year, renewable thereafter. Additional groups will be formed based on demand.
            </p>
          </div>
        </motion.div>

        {/* Investment Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-4 md:p-8 mb-12 text-white"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Investment & Benefits</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:p-8">
            <div>
              <div className="flex items-center justify-center mb-6">
                <div className="bg-white bg-opacity-20 rounded-full w-20 h-20 flex items-center justify-center">
                  <DollarSign className="text-white" size={40} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-center mb-4">Annual Membership: $10,000</h3>
              <p className="text-blue-100 text-center">
                The fee for this program has been kept low by subsidizing it through more established programs and partner underwriting.
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-4">Membership Includes:</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-green-300 mt-0.5 flex-shrink-0" />
                  <span>Membership in the Vanguard network for Senior In-House Counsel</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-green-300 mt-0.5 flex-shrink-0" />
                  <span>Monthly virtual peer-to-peer executive exchanges</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-green-300 mt-0.5 flex-shrink-0" />
                  <span>Curated leadership insights</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-green-300 mt-0.5 flex-shrink-0" />
                  <span>Live & on-demand executive dialogues with top executives</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-green-300 mt-0.5 flex-shrink-0" />
                  <span>Premium networking & social events</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-green-300 mt-0.5 flex-shrink-0" />
                  <span>Exclusive leadership data & strategic insights</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-green-300 mt-0.5 flex-shrink-0" />
                  <span>20% savings on Vanguard development programs</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Criteria */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="bg-white rounded-xl shadow-lg p-4 md:p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">Membership Criteria</h2>
          <div className="text-center">
            <p className="text-lg text-slate-700">
              Members must report directly to their organization's most-senior legal officer, and generally have a title such as deputy general counsel, associate general counsel, managing attorney or counsel.
            </p>
          </div>
        </motion.div>

        {/* Registration CTAs */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="bg-white rounded-xl shadow-lg p-4 md:p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Get Started</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:p-8">
            <div className="text-center">
              <h3 className="text-xl font-bold text-slate-900 mb-4">For General Counsels</h3>
              <p className="text-slate-600 mb-6">Nominate qualified participants from your legal team</p>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfnL6we0cjUiNT0vJxwBIbquCBd27GFNrxKkIAiNoIWQPP58A/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 md:px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                Nominate Participants
                <ExternalLink size={16} />
              </a>
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-bold text-slate-900 mb-4">For Senior Counsels</h3>
              <p className="text-slate-600 mb-6">Register directly for the program</p>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSe0wbTyZqRuFckkL1bAVQhzULty10OAdGpQ7lYeaBav9OGKJA/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-4 md:px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
              >
                Register Here
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="bg-slate-100 rounded-xl p-4 md:p-8 text-center"
        >
          <h3 className="text-xl font-bold text-slate-900 mb-4">Need More Information?</h3>
          <p className="text-slate-600 mb-4">
            If you'd like more information about the Senior In-House Counsel Network & Exchange, please contact:
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

export default SeniorCounselExchangePage;