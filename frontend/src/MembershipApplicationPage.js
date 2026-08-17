import React from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import SEO from './SEO';
import MembershipApplicationForm from './signup-forms/MembershipApplicationForm';

const slugToLabel = {
  'general-counsel-network': 'General Counsel Network',
  'senior-in-house-counsel-network': 'Senior In-House Counsel Network',
  'life-sciences-ceo-network': 'Life Sciences CEO Network',
  'risk-management-network': 'Risk Management Network',
  'senior-leaders-network': 'Senior Leaders Network',
  'next-gen-gc-network': 'Next Gen GC Network',
};

const MembershipApplicationPage = () => {
  const [searchParams] = useSearchParams();
  const initialNetwork = slugToLabel[searchParams.get('network')] || '';

  return (
    <>
      <SEO
        title="Membership Application"
        description="Apply to join The Vanguard Network. Connect with 2,000+ senior executives through our exclusive peer-to-peer leadership community."
      />
      <div className="pt-40 pb-20 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-3xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent py-2 leading-tight">
              Vanguard Network Membership
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              We're delighted that you are interested in a membership of the Vanguard Network. Please complete the information below so that we can get back to you. If you heard about us through someone else, please let us know.
            </p>
          </motion.div>

          <MembershipApplicationForm initialNetwork={initialNetwork} />
        </div>
      </div>
    </>
  );
};

export default MembershipApplicationPage;
