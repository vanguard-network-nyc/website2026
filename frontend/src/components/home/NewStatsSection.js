import React from 'react';
import { motion } from 'framer-motion';

const NewStatsSection = () => {
  const stats = [
    { number: "37+", label: "Countries Represented" },
    { number: "358+", label: "Participating Companies" },
    { number: "2,000+", label: "Top Leaders Engaged" },
    { number: "25 Years", label: "Leadership Expertise" }
  ];

  return (
    <section 
      className="py-8 md:py-16"
      style={{
        background: 'linear-gradient(135deg, #f8fafc, #f0f9ff)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:p-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="p-6"
            >
              <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                {stat.number}
              </div>
              <div className="text-lg text-slate-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-right mt-6">
          <p className="text-sm italic text-slate-500">
            *Data current as of November 2025. Figures are updated quarterly.
          </p>
        </div>
      </div>
    </section>
  );
};

// What We Do Section
// Original What Makes Us Different Section (5 boxes - for HomePage2)

export default NewStatsSection;
