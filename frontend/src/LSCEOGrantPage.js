import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from './SEO';
import Breadcrumb from './Breadcrumb';
import SignupModal from './SignupModal';
import LSCEOGrantForm from './signup-forms/LSCEOGrantForm';
import { TextBlock, LogoGallery } from './programs/Blocks';

const BERKLEY_LOGO_URL =
  'https://customer-assets-rejwkqb3.emergentagent.net/job_95c11ed2-04fc-4e03-90f5-5a9265b65d8d/artifacts/i9ihq5w3_berkley.jpeg';

// Prefilled "Recommend a colleague" mailto — body copy provided by TVN.
const RECOMMEND_MAILTO =
  "mailto:?subject=Thought you might find this valuable&body=Hi,%0D%0A%0D%0AI came across this through The Vanguard Network and thought of you.%0D%0A%0D%0AHere%E2%80%99s the link:%0D%0Ahttps://www.thevanguardnetwork.com/networks/life-sciences-ceo/grant%0D%0A%0D%0AThis is an offer for a one-year complimentary membership of the Vanguard Life Sciences CEO Network. A peer community focused on candid, small-group dialogue under Chatham House rules.%0D%0A%0D%0AMembers gain access to confidential forums, leadership exchanges, and practical playbooks drawn directly from real-world executive challenges.%0D%0A%0D%0AThought it could be highly valuable given the environment leaders are navigating right now.%0D%0A%0D%0ABest,";

const ELIGIBILITY_BODY = `## 1. Eligibility Criteria

To apply for the Berkley/Vanguard Life Sciences CEO Network Grant, applicants must meet the following requirements:

- **Company Structure:** The applicant must be a CEO or co-founder of a legally incorporated life sciences company. Sole proprietors are not eligible.
- **Development Stage:** The company must:
  - Have a pipeline of therapeutic, diagnostic, or medical device candidates or have initiated clinical trials.
  - Be pre-revenue (i.e., no significant commercial sales).
- **Team Size:** The company must generally have a minimum of five (5) employees, including full-time and key leadership roles.
- **Commitment to Engagement:** Awardees must actively participate in networking events and virtual exchanges throughout the year.

## 2. Application Process

- **Submission:** Applications must be submitted online through the official Vanguard Life Sciences CEO Network portal.
- **Required Materials:**
  - A completed application form with company details.
  - A brief executive summary outlining the company's pipeline, clinical development status, and team structure.
  - A declaration confirming pre-revenue status.
  - A statement of commitment to network participation and collaboration.
- **Review & Selection:** Applications will be reviewed by a selection committee based on eligibility, innovation potential, and engagement fit.
- **Availability:** 10 grants are currently available.
  - 5 Pre-revenue & pre-clinical trial — value $1,500
  - 5 Pre-revenue, in clinical trial — value $3,000
- **Duration:** Grants last for one year at which point the applicant will be invited to continue their membership through the standard Vanguard Network process.`;

// Custom CTA banner with TWO actions (apply + recommend).
const GrantCtaBanner = ({ onApply }) => (
  <section className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100" data-testid="grant-cta-banner">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8 py-6 md:py-10">
      <div className="bg-gradient-to-r from-[#045184] to-[#00A8E1] rounded-3xl p-8 md:p-14 text-white shadow-lg">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="flex flex-col items-start">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to apply?</h2>
            <p className="text-base md:text-lg opacity-95 mb-6">
              Click the button below to get started.
            </p>
            <button
              type="button"
              onClick={onApply}
              className="group inline-flex items-center gap-3 bg-white text-[#045184] px-6 md:px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
              data-testid="grant-apply-btn"
            >
              Apply for the Grant
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-300"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </button>
          </div>
          <div className="flex flex-col items-start md:border-l md:border-white/20 md:pl-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Already A Post-Revenue Company Or An Existing Member?
            </h2>
            <p className="text-base md:text-lg opacity-95 mb-6">
              Refer a pre-revenue peer who could benefit from this program.
            </p>
            <a
              href={RECOMMEND_MAILTO}
              className="group inline-flex items-center gap-3 bg-white/10 border-2 border-white text-white px-6 md:px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:bg-white hover:text-[#045184] hover:shadow-xl hover:scale-105"
              data-testid="grant-recommend-btn"
            >
              Recommend A Pre-Revenue Colleague Here
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-300"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Placeholder body while TVN finalizes the application form fields.
const GrantHero = () => (
  <section className="relative pt-40 pb-16 md:pb-20 bg-gradient-to-br from-[#032a48] via-[#045184] to-[#00A8E1] text-white overflow-hidden" data-testid="grant-hero">
    <div className="relative max-w-6xl mx-auto px-4 md:px-8">
      <motion.h1
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}
        className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-3"
      >
        Life Sciences CEO Network
      </motion.h1>
      <motion.h2
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-100 leading-tight mb-6"
      >
        One-Year Membership Grants
      </motion.h2>
      <motion.p
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg md:text-2xl text-blue-100 max-w-3xl leading-snug"
      >
        Grants are available for CEOs of pre-revenue companies. Read below to see if you qualify and how to apply.
      </motion.p>
    </div>
  </section>
);

const LSCEOGrantPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isApplyRoute = location.pathname.endsWith('/apply');
  const [modalOpen, setModalOpen] = useState(false);

  // Deep-link support:
  //  - /life-sciences-ceo/grant/apply  (canonical shareable URL)
  //  - /life-sciences-ceo/grant?apply=1 (legacy query variant)
  useEffect(() => {
    if (isApplyRoute || searchParams.get('apply') === '1') setModalOpen(true);
  }, [isApplyRoute, searchParams]);

  const openModal = useCallback(() => {
    // Update the URL so the modal state is shareable/bookmarkable.
    if (!isApplyRoute) navigate('/life-sciences-ceo/grant/apply');
    setModalOpen(true);
  }, [isApplyRoute, navigate]);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    if (isApplyRoute) navigate('/life-sciences-ceo/grant', { replace: true });
    if (searchParams.has('apply')) {
      const next = new URLSearchParams(searchParams);
      next.delete('apply');
      setSearchParams(next, { replace: true });
    }
  }, [isApplyRoute, navigate, searchParams, setSearchParams]);

  const sponsorSection = {
    id: 'sponsor',
    type: 'Logo Gallery',
    heading: 'Thanks To Our Sponsor',
    subheading: '',
    background: 'white',
    columns: '',
    companies: [{ id: 'berkley', name: 'Berkley Lifesciences', logo: BERKLEY_LOGO_URL }],
  };

  const eligibilitySection = {
    id: 'eligibility',
    type: 'Text Block',
    heading: 'Applications for the 2027 cohort are now open. Please apply by March 31, 2027.',
    subheading: '',
    body: ELIGIBILITY_BODY,
    background: 'light-blue-strip',
    cta_label: '',
    cta_url: '',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100" data-testid="lsceo-grant-page">
      <SEO
        title="Life Sciences CEO Network Grants — Berkley / Vanguard"
        description="Apply for a one-year complimentary membership to the Vanguard Life Sciences CEO Network, sponsored by Berkley Lifesciences. Grants support pre-revenue CEOs of therapeutic, diagnostic, and medical-device companies. Applications for the 2027 cohort close March 31, 2027."
        image={BERKLEY_LOGO_URL}
        type="website"
        breadcrumbs={[
          { name: 'Home', url: 'https://thevanguardnetwork.com/' },
          { name: 'Life Sciences CEO Network', url: 'https://thevanguardnetwork.com/networks/life-sciences-ceo-network' },
          { name: 'Grant', url: 'https://thevanguardnetwork.com/life-sciences-ceo/grant' },
        ]}
        faq={[
          {
            question: 'Who is eligible for the Life Sciences CEO Network Grant?',
            answer: 'CEOs or co-founders of legally incorporated, pre-revenue life sciences companies with a pipeline of therapeutic, diagnostic, or medical-device candidates (or an initiated clinical trial) and at least five employees.',
          },
          {
            question: 'What does the grant cover?',
            answer: 'A one-year complimentary membership in the Vanguard Life Sciences CEO Network. Grants are valued at $1,500 for pre-clinical companies and $3,000 for companies with an active clinical trial.',
          },
          {
            question: 'When is the deadline to apply?',
            answer: 'Applications for the 2027 cohort must reach The Vanguard Network by March 31, 2027.',
          },
        ]}
      />

      <GrantHero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8 pt-6 -mb-4">
        <Breadcrumb customTitle="Grant" />
      </div>

      <LogoGallery section={sponsorSection} />
      <TextBlock section={eligibilitySection} />
      <GrantCtaBanner onApply={openModal} />

      <div className="pb-16 md:pb-24" />

      <SignupModal
        isOpen={modalOpen}
        onClose={closeModal}
        title="Grant application for an annual membership in the Vanguard Life Sciences CEO Network"
      >
        <LSCEOGrantForm onClose={closeModal} />
      </SignupModal>
    </div>
  );
};

export default LSCEOGrantPage;
