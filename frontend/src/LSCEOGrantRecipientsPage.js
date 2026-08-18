import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SEO from './SEO';
import Breadcrumb from './Breadcrumb';
import { LogoGallery, PeopleGallery } from './programs/Blocks';

const BERKLEY_LOGO_URL =
  'https://customer-assets-rejwkqb3.emergentagent.net/job_95c11ed2-04fc-4e03-90f5-5a9265b65d8d/artifacts/i9ihq5w3_berkley.jpeg';

const RecipientsHero = () => (
  <section className="relative pt-40 pb-16 md:pb-20 bg-gradient-to-br from-[#032a48] via-[#045184] to-[#00A8E1] text-white overflow-hidden" data-testid="recipients-hero">
    <div className="relative max-w-6xl mx-auto px-4 md:px-8">
      <motion.h1
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}
        className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
      >
        Berkley Circle Of Fellows
      </motion.h1>
      <motion.p
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.15 }}
        className="text-lg md:text-2xl text-blue-100 max-w-3xl leading-snug"
      >
        Recipients of the Life Sciences CEO Network grants, sponsored by Berkley Lifesciences.
      </motion.p>
    </div>
  </section>
);

const LSCEOGrantRecipientsPage = () => {
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipients = async () => {
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
        const res = await fetch(`${backendUrl}/api/lsceo-grant/recipients`);
        if (!res.ok) throw new Error('Failed to load recipients');
        const data = await res.json();
        setRecipients(Array.isArray(data) ? data : []);
      } catch (e) {
        setError(e.message || 'Failed to load recipients');
      } finally {
        setLoading(false);
      }
    };
    fetchRecipients();
  }, []);

  const sponsorSection = {
    id: 'sponsor',
    type: 'Logo Gallery',
    heading: 'Thanks To Our Sponsor',
    subheading: '',
    background: 'white',
    columns: '',
    companies: [{ id: 'berkley', name: 'Berkley Lifesciences', logo: BERKLEY_LOGO_URL }],
  };

  const peopleSection = {
    id: 'recipients',
    type: 'People Gallery',
    heading: 'Grant Recipients',
    subheading: '',
    background: 'plain',
    columns: '',
    people: recipients,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100" data-testid="lsceo-recipients-page">
      <SEO
        title="Berkley Circle of Fellows — Life Sciences CEO Grant Recipients"
        description="Meet the Berkley Circle of Fellows: past recipients of the Life Sciences CEO Network membership grants sponsored by Berkley Lifesciences. A curated cohort of pre-revenue therapeutic, diagnostic, and medical-device CEOs advancing patient outcomes."
        image={BERKLEY_LOGO_URL}
        type="website"
        breadcrumbs={[
          { name: 'Home', url: 'https://thevanguardnetwork.com/' },
          { name: 'Life Sciences CEO', url: 'https://thevanguardnetwork.com/life-sciences-ceo' },
          { name: 'Grant', url: 'https://thevanguardnetwork.com/life-sciences-ceo/grant' },
          { name: 'Recipients', url: 'https://thevanguardnetwork.com/life-sciences-ceo/grant/recipients' },
        ]}
      />

      <RecipientsHero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8 pt-6 -mb-4">
        <Breadcrumb customTitle="Recipients" />
      </div>

      <LogoGallery section={sponsorSection} />

      {loading ? (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 text-center text-slate-500" data-testid="recipients-loading">
          Loading recipients…
        </div>
      ) : error ? (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 text-center text-red-600" data-testid="recipients-error">
          Could not load recipients. Please refresh.
        </div>
      ) : recipients.length === 0 ? (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 text-center text-slate-500" data-testid="recipients-empty">
          No recipients to show yet.
        </div>
      ) : (
        <PeopleGallery section={peopleSection} />
      )}

      <div className="pb-16 md:pb-24" />
    </div>
  );
};

export default LSCEOGrantRecipientsPage;
