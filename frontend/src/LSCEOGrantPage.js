import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEO from './SEO';
import Breadcrumb from './Breadcrumb';
import SignupModal from './SignupModal';
import { HeroBlock, TextBlock, LogoGallery } from './programs/Blocks';

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
const GrantApplicationPlaceholder = () => (
  <div className="p-8 text-center" data-testid="grant-application-placeholder">
    <h3 className="text-xl font-bold text-[#045184] mb-3">Application form coming soon</h3>
    <p className="text-slate-600 leading-relaxed">
      We&apos;re finalizing the intake form for the 2027 cohort. Applications open by
      <strong> March 31, 2027</strong>. In the meantime, please reach out to
      {' '}<a href="mailto:hello@thevanguardnetwork.com" className="text-[#00A8E1] font-semibold hover:underline">hello@thevanguardnetwork.com</a>
      {' '}if you&apos;d like to be notified as soon as the form goes live.
    </p>
  </div>
);

const LSCEOGrantPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [modalOpen, setModalOpen] = useState(false);

  // Deep-link support: /life-sciences-ceo/grant?apply=1 auto-opens the modal.
  useEffect(() => {
    if (searchParams.get('apply') === '1') setModalOpen(true);
  }, [searchParams]);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => {
    setModalOpen(false);
    if (searchParams.has('apply')) {
      const next = new URLSearchParams(searchParams);
      next.delete('apply');
      setSearchParams(next, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  // Fake `program` object so the shared Blocks components render happily.
  const program = {
    name: 'Life Sciences CEO Network',
    tagline: 'One-Year Membership Grants',
    summary: 'Grants are available for CEOs of pre-revenue companies. Read below to see if you qualify and how to apply.',
    hero_image: null,
  };

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
        title="Life Sciences CEO Network Grants"
        description="Berkley/Vanguard Life Sciences CEO Network Grant — one-year complimentary memberships for pre-revenue life sciences CEOs. Apply by March 31, 2027."
        breadcrumbs={[
          { name: 'Home', url: 'https://thevanguardnetwork.com/' },
          { name: 'Life Sciences CEO', url: 'https://thevanguardnetwork.com/life-sciences-ceo' },
          { name: 'Grant', url: 'https://thevanguardnetwork.com/life-sciences-ceo/grant' },
        ]}
      />

      <HeroBlock program={program} section={{}} />

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
        title="Life Sciences CEO Network Grant Application"
      >
        <GrantApplicationPlaceholder />
      </SignupModal>
    </div>
  );
};

export default LSCEOGrantPage;
