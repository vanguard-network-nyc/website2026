import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from './SEO';
import Breadcrumb from './Breadcrumb';
import { BLOCK_REGISTRY, HeroBlock } from './programs/Blocks';
import SignupModal from './SignupModal';
import MembershipApplicationForm from './signup-forms/MembershipApplicationForm';
import CSCGuestTrialForm from './signup-forms/CSCGuestTrialForm';
import GCFForumForm from './signup-forms/GCFForumForm';
import LSCEOFForumForm from './signup-forms/LSCEOFForumForm';
import MemberNetworkForm from './signup-forms/MemberNetworkForm';
import NGGCNominationForm from './signup-forms/NGGCNominationForm';

// Same form registry as ProgramPage — allows the same modal to open on network pages
// if a section uses `#form:<key>` in its CTA URL.
const FORM_VARIANTS = {
  'csc-form':              { title: 'I would like to attend this event!',              Component: CSCGuestTrialForm },
  'gcf-form':              { title: 'I would like to attend this event!',              Component: GCFForumForm },
  'lsceof-form':           { title: 'I would like to attend this event!',              Component: LSCEOFForumForm },
  'gcx-form':              { title: 'Contact us to join the General Counsel Network',   Component: MemberNetworkForm },
  'rmx-form':              { title: 'Contact us to join the Risk Management Network',   Component: MemberNetworkForm },
  'lsceox-form':           { title: 'Contact us to join the Life Sciences CEO Network', Component: MemberNetworkForm },
  'nggc-nomination-form':  { title: 'Next Generation GC Program: Nominate Your Candidate', Component: NGGCNominationForm },
  // Membership application form (same as /application) — used on every network page in a modal.
  'membership-application': { title: 'Vanguard Network Membership', Component: MembershipApplicationForm },
};

const NetworkPage = () => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formModalKey, setFormModalKey] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    setLoading(true);
    setError(null);
    fetch(`${backendUrl}/api/networks/${encodeURIComponent(slug)}`)
      .then(async (r) => {
        if (r.status === 404) throw new Error('not_found');
        if (!r.ok) throw new Error(`status_${r.status}`);
        return r.json();
      })
      .then((json) => { if (!cancelled) setData(json); })
      .catch((e) => { if (!cancelled) setError(e.message || 'error'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [slug]);

  useEffect(() => {
    if (!data) return;
    const key = searchParams.get('form');
    if (key && FORM_VARIANTS[key]) setFormModalKey(key);
  }, [data, searchParams]);

  const openForm = useCallback((key) => {
    if (!key || !FORM_VARIANTS[key]) return;
    setFormModalKey(key);
  }, []);

  const closeForm = useCallback(() => {
    setFormModalKey(null);
    if (searchParams.has('form')) {
      const next = new URLSearchParams(searchParams);
      next.delete('form');
      setSearchParams(next, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  if (loading) {
    return (
      <div className="pt-40 pb-24 min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-[#00A8E1] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading network...</p>
        </div>
      </div>
    );
  }

  if (error === 'not_found') {
    return (
      <div className="pt-40 pb-24 min-h-screen bg-slate-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Network not found</h1>
          <p className="text-slate-600 mb-8">We couldn't find a network at this URL.</p>
          <Link to="/networks" className="inline-flex items-center gap-2 text-[#045184] hover:text-[#00A8E1] font-semibold">
            <ArrowLeft size={18} /> Back to Networks
          </Link>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="pt-40 pb-24 min-h-screen bg-slate-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Something went wrong</h1>
          <p className="text-slate-600 mb-8">We couldn't load this network right now. Please try again shortly.</p>
          <Link to="/networks" className="inline-flex items-center gap-2 text-[#045184] hover:text-[#00A8E1] font-semibold">
            <ArrowLeft size={18} /> Back to Networks
          </Link>
        </div>
      </div>
    );
  }

  // Backend also returns `program` alongside `network` so Blocks.js keeps working.
  const network = data.network || data.program;
  const sections = data.sections || [];
  const seoTitle = network.seo_title || network.name;
  const seoDescription = (
    network.seo_description
    || network.description_short
    || network.description_long
    || network.tagline
    || network.summary
    || `Learn more about the ${network.name}, a peer leadership community at The Vanguard Network.`
  ).toString().trim().slice(0, 300);

  const hasExplicitHero = sections.length > 0 && sections[0].type === 'Hero';
  const formVariant = formModalKey ? FORM_VARIANTS[formModalKey] : null;
  const modalTitle = formVariant?.title;

  const networkAsEvent = {
    id: null,
    series_code: network.series_code || null,
    clean_event_code: null,
    event_title: network.name,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100" data-testid="network-page">
      <SEO
        title={seoTitle}
        description={seoDescription}
        image={network.hero_image || undefined}
        type="website"
        breadcrumbs={[
          { name: 'Home', url: 'https://thevanguardnetwork.com/' },
          { name: 'Networks', url: 'https://thevanguardnetwork.com/networks' },
          { name: network.name, url: `https://thevanguardnetwork.com/networks/${network.slug}` },
        ]}
      />

      {!hasExplicitHero && <HeroBlock program={network} section={{}} onOpenForm={openForm} />}

      {sections.map((section, idx) => {
        const Block = BLOCK_REGISTRY[section.type];
        if (!Block) {
          console.warn(`Unknown network block type: ${section.type}`);
          return null;
        }
        return (
          <React.Fragment key={section.id}>
            <Block
              section={section}
              program={network}
              first={idx === 0}
              onOpenForm={openForm}
            />
            {/* Breadcrumb sits directly under the Hero so it isn't hidden by the fixed nav */}
            {section.type === 'Hero' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8 pt-6 -mb-4">
                <Breadcrumb customTitle={network.name} />
              </div>
            )}
          </React.Fragment>
        );
      })}

      <div className="pb-16 md:pb-24" />

      {formVariant && (
        <SignupModal
          isOpen={!!formModalKey}
          onClose={closeForm}
          title={modalTitle}
        >
          {formModalKey === 'membership-application' ? (
            <MembershipApplicationForm compact />
          ) : (
            <formVariant.Component
              event={networkAsEvent}
              formKey={formModalKey}
              onSuccess={() => { /* keep modal open on success view */ }}
            />
          )}
        </SignupModal>
      )}
    </div>
  );
};

export default NetworkPage;
