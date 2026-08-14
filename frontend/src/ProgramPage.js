import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from './SEO';
import Breadcrumb from './Breadcrumb';
import { BLOCK_REGISTRY, HeroBlock } from './programs/Blocks';

const ProgramPage = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // If the first section isn't a Hero, synthesize one from Program fields so pages always start with a hero band.
  const hasExplicitHero = sections.length > 0 && sections[0].type === 'Hero';

  return (
    <div className="min-h-screen bg-white" data-testid="program-page">
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonical={`https://thevanguardnetwork.com/programs/${program.slug}`}
      />

      {!hasExplicitHero && <HeroBlock program={program} section={{}} />}

      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-6">
        <Breadcrumb />
      </div>

      {sections.map((section) => {
        const Block = BLOCK_REGISTRY[section.type];
        if (!Block) {
          console.warn(`Unknown program block type: ${section.type}`);
          return null;
        }
        return <Block key={section.id} section={section} program={program} />;
      })}
    </div>
  );
};

export default ProgramPage;
