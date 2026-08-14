import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from './SEO';
import Breadcrumb from './Breadcrumb';
import { BLOCK_REGISTRY, HeroBlock } from './programs/Blocks';
import SignupModal from './SignupModal';
import CSCGuestTrialForm from './signup-forms/CSCGuestTrialForm';
import GCFForumForm from './signup-forms/GCFForumForm';
import LSCEOFForumForm from './signup-forms/LSCEOFForumForm';
import MemberNetworkForm from './signup-forms/MemberNetworkForm';
import NGGCNominationForm from './signup-forms/NGGCNominationForm';

// Same form registry as EventDetailsPage — allows the same modal to open on program pages.
const FORM_VARIANTS = {
  'csc-form':              { title: 'I would like to attend this event!',              Component: CSCGuestTrialForm },
  'gcf-form':              { title: 'I would like to attend this event!',              Component: GCFForumForm },
  'lsceof-form':           { title: 'I would like to attend this event!',              Component: LSCEOFForumForm },
  'gcx-form':              { title: 'Member-only event for General Counsel Network',   Component: MemberNetworkForm },
  'rmx-form':              { title: 'Member-only event for Risk Management Network',   Component: MemberNetworkForm },
  'lsceox-form':           { title: 'Member-only event for Life Sciences CEO Network', Component: MemberNetworkForm },
  'nggc-nomination-form':  { title: 'Next Generation GC Program: Nominate Your Candidate', Component: NGGCNominationForm },
};

const ProgramPage = () => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formModalKey, setFormModalKey] = useState(null);

  // Fetch program
  useEffect(() => {
    let cancelled = false;
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    setLoading(true);
    setError(null);
    fetch(`${backendUrl}/api/programs/${encodeURIComponent(slug)}`)
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

  // Deep-link: ?form=<form-key> opens the modal on load
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
          <p className="text-slate-600">Loading program...</p>
        </div>
      </div>
    );
  }

  if (error === 'not_found') {
    return (
      <div className="pt-40 pb-24 min-h-screen bg-slate-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Program not found</h1>
          <p className="text-slate-600 mb-8">We couldn't find a program at this URL.</p>
          <Link to="/programs" className="inline-flex items-center gap-2 text-[#045184] hover:text-[#00A8E1] font-semibold">
            <ArrowLeft size={18} /> Back to Programs
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
          <p className="text-slate-600 mb-8">We couldn't load this program right now. Please try again shortly.</p>
          <Link to="/programs" className="inline-flex items-center gap-2 text-[#045184] hover:text-[#00A8E1] font-semibold">
            <ArrowLeft size={18} /> Back to Programs
          </Link>
        </div>
      </div>
    );
  }

  const { program, sections } = data;
  const seoTitle = program.seo_title || program.name;
  const seoDescription = program.seo_description || program.tagline || program.summary;

  const hasExplicitHero = sections.length > 0 && sections[0].type === 'Hero';
  const formVariant = formModalKey ? FORM_VARIANTS[formModalKey] : null;

  // Synthetic "event"-shaped object so signup forms can submit at the program level.
  const programAsEvent = {
    id: null,
    series_code: program.series_code || null,
    clean_event_code: null,
    event_title: program.name,
  };

  return (
    <div className="min-h-screen bg-white" data-testid="program-page">
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonical={`https://thevanguardnetwork.com/programs/${program.slug}`}
      />

      {!hasExplicitHero && <HeroBlock program={program} section={{}} onOpenForm={openForm} />}

      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-4 -mb-4">
        <Breadcrumb customTitle={program.name} />
      </div>

      {sections.map((section, idx) => {
        const Block = BLOCK_REGISTRY[section.type];
        if (!Block) {
          console.warn(`Unknown program block type: ${section.type}`);
          return null;
        }
        return (
          <Block
            key={section.id}
            section={section}
            program={program}
            first={idx === 0}
            onOpenForm={openForm}
          />
        );
      })}

      {formVariant && (
        <SignupModal
          isOpen={!!formModalKey}
          onClose={closeForm}
          title={formVariant.title}
        >
          <formVariant.Component
            event={programAsEvent}
            formKey={formModalKey}
            onSuccess={() => { /* keep modal open on success view */ }}
          />
        </SignupModal>
      )}
    </div>
  );
};

export default ProgramPage;
