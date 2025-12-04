import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Target, Users, CheckCircle, Building2, Globe, Award } from 'lucide-react';

const CaseStudiesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Initialize category from URL parameters
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && ['all', 'leadership-advisory', 'organizational-transformation', 'client-stakeholder-engagement'].includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  // Update URL when category changes
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  const caseStudies = [
    {
      id: 1,
      title: "Executing a Global Turnaround",
      category: "Organizational Transformation",
      categorySlug: "organizational-transformation",
      summary: "As advisors to the CEO and top team, we led the leadership and culture reset for a global company in crisis, transforming organizational dynamics and performance across all business units.",
      challenge: "A global company faced a critical performance crisis with deep-seated cultural conflicts and fragmented leadership. Organization charts were not the answer - we needed to diagnose the cultural conflicts and build a unifying Sense of Purpose that could drive sustainable transformation.",
      approach: [
        "Developed and implemented a bold action agenda for comprehensive organizational change",
        "Established high-performance behaviors and standards from CEO to frontline employees",
        "Created leadership alignment processes to ensure consistent execution across global operations",
        "Built cultural transformation initiatives that addressed core conflict areas and reinforced new behaviors"
      ],
      outcome: "In three years, the company achieved a dramatic transformation, rising from worst to best performer in its peer group. The cultural reset created sustained competitive advantage and established a foundation for continued growth and market leadership.",
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12",
      icon: <TrendingUp size={24} />,
      color: "from-green-500 to-emerald-600"
    },
    {
      id: 7,
      title: "Transforming Siloed Country Leaders into a High Performance Network",
      category: "Organizational Transformation",
      categorySlug: "organizational-transformation",
      summary: "We were asked by the head of a global biopharma company to help launch an initiative to transform approximately 100 stand-alone country operations into a more integrated network where capabilities, best practices, and other assets would be shared to strengthen the organization's competitive edge.",
      challenge: "A global biopharma company needed to transform approximately 100 siloed country operations into an integrated network capable of sharing capabilities, best practices, and assets to enhance competitive advantage.",
      approach: [
        "Worked with the executive team to devise interactive sessions among country operation leaders",
        "Facilitated sharing of transferable success stories and practices between country operations",
        "Generated practical, operational insights and improvements across the network",
        "Established foundation for peer networks among leaders to encourage ongoing collaboration"
      ],
      outcome: "For the first time, country leaders began reaching out to peers in other countries to share ideas and seek support. This leadership behavior change takes up to three years to operationalize, but once embedded, the new way of working can be sustained and expanded through internal champions without external consultants.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
      icon: <TrendingUp size={24} />,
      color: "from-green-500 to-emerald-600"
    },
    {
      id: 2,
      title: "Sounding Board Role with CEO",
      category: "Leadership Advisory",
      categorySlug: "leadership-advisory",
      summary: "We served as a sounding board and strategic advisor to a C-suite leader driving major change in a global corporation.",
      challenge: "Together, we defined what success would look like at one and three years, then built a flexible agenda to get there.",
      approach: [
        "Removing cultural and process barriers to high performance",
        "Turning bold ideas into action",
        "Clarifying priorities and aligning the right team members to execute"
      ],
      outcome: "After several years, success far exceeded expectations.",
      image: "https://images.pexels.com/photos/2182981/pexels-photo-2182981.jpeg",
      icon: <Target size={24} />,
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: 3,
      title: "Advising an Incoming Global CEO",
      category: "Leadership Advisory",
      categorySlug: "leadership-advisory",
      summary: "With the arrival of a first-time CEO at a troubled global company, we served as advisor and sounding board.",
      challenge: "Guiding a first-time CEO through critical early decisions and transformation strategy.",
      approach: [
        "Executive Team dynamics and alignment",
        "A bold first 300 days action plan",
        "Transformation strategy for the Board",
        "Internal and external leadership communications to drive engagement"
      ],
      outcome: "The company shifted from a downward spiral to sustained growth, ultimately being acquired at a significant premium.",
      image: "https://images.pexels.com/photos/4342498/pexels-photo-4342498.jpeg", 
      icon: <Target size={24} />,
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: 4,
      title: "Aligning the Board",
      category: "Leadership Advisory",
      categorySlug: "leadership-advisory",
      summary: "The experienced CEO of a growing biotech company outside Boston enlisted our assistance in assessing the causes and solutions for the fragmented and sometimes dysfunctional board.",
      challenge: "We executed extensive interviews and research to identify strategic differences and personal conflicts.",
      approach: [
        "Identified significant strategic differences as well as personal conflicts",
        "Determined that an underlying issue was a respected but somewhat disengaged board chair who was not a fit for the rapidly growing company and fractious board",
        "Recommended a change in the Board chair to support the growth of the organization, with experience to manage a challenging board"
      ],
      outcome: "With our counsel a new Board Chair was recruited with the requisite capabilities. This drove significant board alignment. The new Chair also played a valuable internal and external role with the company assisting in strategic priority setting and business development.",
      image: "https://images.unsplash.com/photo-1589639293663-f9399bb41721",
      icon: <Target size={24} />,
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: 5,
      title: "Engaging Thought Leaders on the Rural Health Crisis",
      category: "Client and Stakeholder Engagement",
      categorySlug: "client-stakeholder-engagement",
      summary: "We worked with The Nantucket Project to create a high-impact gathering in New York City around the health crisis affecting 20% of Americans who live in healthcare-deprived rural areas, and potential solutions offered by new technologies.",
      challenge: "The rural health crisis affects 20% of Americans living in healthcare-deprived areas, requiring innovative solutions and expert collaboration to address complex systemic challenges.",
      approach: [
        "Transformed a conventional panel presentation into an interactive leadership discussion",
        "Assembled fifty carefully selected attendees including healthcare systems leaders",
        "Featured five top healthcare systems and technology experts as key participants",
        "Facilitated focused dialogue on pragmatic, real-world solutions"
      ],
      outcome: "The session generated pragmatic, real-world insights and action steps, creating meaningful collaboration between thought leaders and establishing a foundation for addressing rural healthcare challenges through technology innovation.",
      image: "https://images.unsplash.com/photo-1521737711867-e3b94467d2eb",
      icon: <Users size={24} />,
      color: "from-cyan-500 to-blue-600"
    },
    {
      id: 6,
      title: "Building Long-Term Client Relationships",
      category: "Client and Stakeholder Engagement",
      categorySlug: "client-stakeholder-engagement",
      summary: "We executed an assignment with a leading law firm to bring them together with current and potential senior clients, in a format that conveyed the strengths of the firm's partners as business advisors, not just a legal resource.",
      challenge: "The firm needed to differentiate itself by positioning partners as strategic business advisors rather than transactional legal service providers, requiring a transformation in client relationship dynamics.",
      approach: [
        "Brought invited executives together with senior partners of the firm",
        "Created intimate conversation formats focused on leadership challenges",
        "Curated discussion topics relevant to executive-level strategic concerns",
        "Led facilitated dialogues to showcase partner expertise as business advisors"
      ],
      outcome: "The program effectively repositioned the firm's partners as advisors and peers, versus legal vendors, leading to strengthened relationships and new engagements with both existing and prospective clients.",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0",
      icon: <Users size={24} />,
      color: "from-cyan-500 to-blue-600"
    }
  ];

  const categories = [
    { name: 'All Case Studies', slug: 'all', icon: <Award size={20} />, color: 'from-slate-500 to-gray-600' },
    { name: 'Leadership Advisory', slug: 'leadership-advisory', icon: <Target size={20} />, color: 'from-blue-500 to-indigo-600' },
    { name: 'Organizational Transformation', slug: 'organizational-transformation', icon: <TrendingUp size={20} />, color: 'from-green-500 to-emerald-600' },
    { name: 'Client and Stakeholder Engagement', slug: 'client-stakeholder-engagement', icon: <Users size={20} />, color: 'from-cyan-500 to-blue-600' }
  ];

  const filteredCaseStudies = selectedCategory === 'all' 
    ? caseStudies 
    : caseStudies.filter(study => study.categorySlug === selectedCategory);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-16 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent mb-8 py-2 leading-tight text-center"
          >
            Case Studies
          </h1>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Real-world examples of how the human factor drives transformational results for executives and organizations through our advisory services.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => handleCategoryChange(category.slug)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedCategory === category.slug
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Case Studies Grid */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {filteredCaseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.8 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 group"
            >
              {/* Image Header */}
              <div className="h-48 bg-cover bg-center relative" style={{ backgroundImage: `url('${study.image}')` }}>
                <div className="absolute top-4 left-4">
                  <span className={`bg-gradient-to-r ${study.color} text-white px-3 py-1 rounded-lg text-sm font-semibold shadow-md flex items-center gap-2`}>
                    {study.icon}
                    {study.category}
                  </span>
                </div>
                <div className="h-full bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <h3 className="text-2xl font-bold text-white group-hover:text-blue-200 transition-colors duration-300">
                    {study.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                  {study.summary}
                </p>

                <div className="mb-6">
                  <h4 className="text-lg font-bold text-slate-900 mb-3">Challenge</h4>
                  <p className="text-slate-600 leading-relaxed">
                    {study.challenge}
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-bold text-slate-900 mb-3">Our Approach</h4>
                  <ul className="space-y-2">
                    {study.approach.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-600">
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-slate-200 pt-6">
                  <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Award size={20} className="text-yellow-500" />
                    Result
                  </h4>
                  <p className="text-slate-700 leading-relaxed font-medium bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                    {study.outcome}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Ready to Transform Your Organization?
            </h2>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              These success stories represent just a fraction of the transformational work we do with executives and organizations. Let's discuss how we can help you achieve similar results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/advisory"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg"
              >
                <Target size={20} />
                Explore Our Advisory Services
              </Link>
              <a
                href="mailto:info@thevanguardnetwork.com"
                className="inline-flex items-center gap-2 bg-slate-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-700 transition-colors duration-200 shadow-lg"
              >
                <Building2 size={20} />
                Contact Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CaseStudiesPage;