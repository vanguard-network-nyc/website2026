import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, Users, BookOpen, ArrowRight } from 'lucide-react';

const NewWhatWeDoSection = () => {
  const services = [
    {
      title: "Leadership Advisory",
      description: "We focus on leadership advisory services in three areas:",
      details: [
        { 
          text: "Organizational Transformation",
          anchor: "organizational-transformation"
        },
        { 
          text: "Strategic Counsel",
          anchor: "strategic-counsel"
        },
        { 
          text: "Client & Stakeholder Engagement",
          anchor: "client-and-stakeholder-engagement"
        }
      ],
      image: "https://customer-assets.emergentagent.com/job_4fab1a4c-02f5-469e-a1ed-d1849b158ebf/artifacts/3fsauvqm_Vanguard%20GC%20may%206th-49.jpg",
      link: "/advisory"
    },
    {
      title: "Peer-to-Peer Networks",
      description: "Our members engage in peer-to-peer conversations around leadership topics that matter most:",
      details: [
        "No podium",
        "No PowerPoint",
        "No presentations"
      ],
      image: "https://customer-assets.emergentagent.com/job_4fab1a4c-02f5-469e-a1ed-d1849b158ebf/artifacts/drlsgrja_Vanguard%20GC%20may%206th-152.jpg",
      link: "/networking"
    },
    {
      title: "Custom Programs",
      description: "Leadership programs developed with our C-suite members:",
      details: [
        "Lead by top Executives",
        "Driven by peer-to-peer interactions",
        "Centered on real-world challenges"
      ],
      image: "https://customer-assets.emergentagent.com/job_4fab1a4c-02f5-469e-a1ed-d1849b158ebf/artifacts/u5kuh7ms_vanguard%20chicago122.jpeg",
      link: "/programs"
    }
  ];

  return (
    <section className="pt-0 pb-0 bg-white">
      {/* Hero Image Section - Full Width */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-16 w-full"
      >
        <img 
          src="https://customer-assets.emergentagent.com/job_4fab1a4c-02f5-469e-a1ed-d1849b158ebf/artifacts/h5eblom2_hero.png"
          alt="Senior executives engaged in leadership conversations and peer networking at The Vanguard Network"
          className="w-full"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            What We Do
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Like you, we recognize that AI and new technologies are transformational tools and capabilities. But technology alone does not generate high performance. It takes powerful leadership to apply those capabilities with purpose, and to make them a force multiplier for your teams. That's why the people factor is at the center of everything we do, from our peer-to-peer networks to advising C-suite executives and their teams.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:p-8">
          {services.slice(0, 3).map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200"
            >
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url('${service.image}')` }}>
                <div className="h-full bg-gradient-to-t from-black/40 to-transparent flex items-end p-6">
                  <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-slate-700 mb-4 leading-relaxed font-bold">
                  {service.description}
                </p>
                {service.title === "Leadership Advisory" && Array.isArray(service.details) ? (
                  <ul className="text-slate-600 text-sm mb-6 leading-relaxed space-y-2 list-disc list-inside">
                    {service.details.map((item, idx) => (
                      <li key={idx}>
                        <Link
                          to={`/advisory#${item.anchor}`}
                          onClick={() => {
                            setTimeout(() => {
                              const element = document.getElementById(item.anchor);
                              if (element) {
                                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                                const offsetPosition = elementPosition - 165;
                                window.scrollTo({
                                  top: offsetPosition,
                                  behavior: 'smooth'
                                });
                              }
                            }, 100);
                          }}
                          className="text-blue-600 hover:text-blue-700 font-semibold"
                        >
                          {item.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : service.title === "Peer-to-Peer Networks" && Array.isArray(service.details) ? (
                  <ul className="text-slate-600 text-sm mb-6 leading-relaxed space-y-1 list-disc list-inside">
                    {service.details.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                ) : service.title === "Custom Programs" && Array.isArray(service.details) ? (
                  <ul className="text-slate-600 text-sm mb-6 leading-relaxed space-y-1 list-disc list-inside">
                    {service.details.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p 
                    className="text-slate-600 text-sm mb-6 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: service.details }}
                  ></p>
                )}
                {service.title === "Organizational Transformation" ? (
                  <Link
                    to="/advisory"
                    onClick={() => {
                      setTimeout(() => {
                        const element = document.getElementById('organizational-transformation');
                        if (element) {
                          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                          const offsetPosition = elementPosition - 165; // Account for fixed header + banner + optimal spacing
                          window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                          });
                        }
                      }, 100);
                    }}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                  >
                    Learn more
                    <ArrowRight size={16} />
                  </Link>
                ) : service.title === "Leadership Advisory" ? (
                  <a
                    href="/advisory"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                  >
                    Discover more
                    <ArrowRight size={16} />
                  </a>
                ) : service.title === "Client and Stakeholder Engagement" ? (
                  <Link
                    to="/advisory"
                    onClick={() => {
                      setTimeout(() => {
                        const element = document.getElementById('client-and-stakeholder-engagement');
                        if (element) {
                          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                          const offsetPosition = elementPosition - 165; // Account for fixed header + banner + optimal spacing
                          window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                          });
                        }
                      }, 100);
                    }}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                  >
                    Learn more
                    <ArrowRight size={16} />
                  </Link>
                ) : service.title === "Peer-to-Peer Networks" ? (
                  <a
                    href={service.link}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                  >
                    Discover more
                    <ArrowRight size={16} />
                  </a>
                ) : service.title === "Custom Programs" ? (
                  <a
                    href={service.link}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                  >
                    Discover more
                    <ArrowRight size={16} />
                  </a>
                ) : (
                  <a
                    href={service.link}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                  >
                    Learn more
                    <ArrowRight size={16} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Second row for remaining services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:p-8 mt-8">
          {services.slice(3).map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (index + 3) * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200"
            >
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url('${service.image}')` }}>
                <div className="h-full bg-gradient-to-t from-black/40 to-transparent flex items-end p-6">
                  <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-slate-700 mb-4 leading-relaxed font-bold">
                  {service.description}
                </p>
                <p 
                  className="text-slate-600 text-sm mb-6 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: service.details }}
                ></p>
                {service.title === "Client and Stakeholder Engagement" ? (
                  <Link
                    to="/advisory"
                    onClick={() => {
                      setTimeout(() => {
                        const element = document.getElementById('client-and-stakeholder-engagement');
                        if (element) {
                          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                          const offsetPosition = elementPosition - 165; // Account for fixed header + banner + optimal spacing
                          window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                          });
                        }
                      }, 100);
                    }}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                  >
                    Learn more
                    <ArrowRight size={16} />
                  </Link>
                ) : (
                  <a
                    href={service.link}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                  >
                    Learn more
                    <ArrowRight size={16} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Video Quote Section

export default NewWhatWeDoSection;
