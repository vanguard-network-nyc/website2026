import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import {
  ArrowRight, ExternalLink, Linkedin, Play, Shield, Target, Award,
  BookOpen, Users, Zap, Compass, Lightbulb, Rocket, Briefcase, Calendar
} from 'lucide-react';

const ICONS = {
  Shield, Target, Award, BookOpen, Users, Zap, Compass, Lightbulb, Rocket, Briefcase
};

// ---------- shared helpers ----------
const bgToClass = (bg) => {
  switch (bg) {
    case 'light-blue': return 'bg-gradient-to-br from-blue-50 to-slate-50';
    case 'dark':      return 'bg-gradient-to-br from-[#032a48] to-[#045184] text-white';
    default:          return 'bg-white';
  }
};

const Section = ({ background, children, dataTestId, first = false }) => (
  <section className={`${bgToClass(background)}`} data-testid={dataTestId}>
    <div className={`max-w-6xl mx-auto px-4 md:px-8 ${first ? 'pt-2 md:pt-4 pb-10 md:pb-14' : 'py-10 md:py-14'}`}>
      {children}
    </div>
  </section>
);

const Markdown = ({ children, dark = false }) => {
  if (!children) return null;
  const proseClass = dark
    ? 'prose prose-invert max-w-none prose-p:my-3 prose-li:my-1 prose-li:text-inherit prose-li:marker:text-current prose-ul:text-inherit'
    : 'prose max-w-none prose-p:my-3 prose-li:my-1 prose-headings:text-slate-900 prose-p:text-slate-700 prose-li:text-slate-700 prose-li:marker:text-slate-700 prose-ul:text-slate-700 prose-strong:text-slate-900';
  return (
    <div className={proseClass}>
      <ReactMarkdown remarkPlugins={[remarkBreaks]} rehypePlugins={[rehypeRaw]}>
        {children}
      </ReactMarkdown>
    </div>
  );
};

const CtaButton = ({ href, children, variant = 'primary' }) => {
  if (!href || !children) return null;
  const isExternal = /^https?:\/\//.test(href);
  const base = 'inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors';
  const styles = variant === 'primary'
    ? 'bg-[#00A8E1] text-white hover:bg-[#0096C7]'
    : 'bg-white text-[#045184] hover:bg-slate-100';
  const link = (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={`${base} ${styles}`}
    >
      {children}
      {isExternal ? <ExternalLink size={16} /> : <ArrowRight size={16} />}
    </a>
  );
  return link;
};

// ---------- 1. Hero ----------
export const HeroBlock = ({ program, section }) => {
  const heading = section?.heading || program?.name || '';
  const subheading = section?.subheading || program?.tagline || '';
  const body = section?.body || program?.summary || '';
  const image = section?.image || program?.hero_image;
  const ctaLabel = section?.cta_label || program?.hero_cta_label;
  const ctaUrl = section?.cta_url || program?.hero_cta_url;

  return (
    <section className="relative pt-40 pb-16 md:pb-20 bg-gradient-to-br from-[#032a48] via-[#045184] to-[#00A8E1] text-white overflow-hidden" data-testid="program-hero">
      {image && (
        <div className="absolute inset-0 opacity-20">
          <img src={image} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="relative max-w-6xl mx-auto px-4 md:px-8">
        <motion.h1
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
        >
          {heading}
        </motion.h1>
        {subheading && (
          <motion.p
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-2xl text-blue-100 mb-6 max-w-3xl"
          >
            {subheading}
          </motion.p>
        )}
        {body && (
          <motion.div
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl text-blue-50 text-base md:text-lg"
          >
            <Markdown dark>{body}</Markdown>
          </motion.div>
        )}
        {ctaLabel && ctaUrl && (
          <div className="mt-8">
            <CtaButton href={ctaUrl} variant="light">{ctaLabel}</CtaButton>
          </div>
        )}
      </div>
    </section>
  );
};

// ---------- 2. Text Block ----------
export const TextBlock = ({ section, first }) => {
  const { heading, subheading, body, cta_label, cta_url, background } = section;
  if (!heading && !subheading && !body && !cta_label) return null;
  const dark = background === 'dark';
  return (
    <Section background={background} first={first} dataTestId="program-text-block">
      {heading && <h2 className={`text-2xl md:text-4xl font-bold mb-3 ${dark ? 'text-white' : 'text-slate-900'}`}>{heading}</h2>}
      {subheading && <p className={`text-lg md:text-xl mb-6 ${dark ? 'text-blue-100' : 'text-slate-600'}`}>{subheading}</p>}
      <Markdown dark={dark}>{body}</Markdown>
      {cta_label && cta_url && <div className="mt-8"><CtaButton href={cta_url}>{cta_label}</CtaButton></div>}
    </Section>
  );
};

// ---------- 3. Two-Column ----------
export const TwoColumnBlock = ({ section, first }) => {
  const { heading, subheading, body, image, image_side, cta_label, cta_url, background } = section;
  if (!body && !heading && !image) return null;
  const dark = background === 'dark';
  const imgFirst = image_side === 'left';
  const columns = (
    <>
      {image && (
        <div className={imgFirst ? 'order-1' : 'order-2'}>
          <img src={image} alt={heading || ''} className="w-full h-auto rounded-2xl shadow-xl object-cover" />
        </div>
      )}
      <div className={image ? (imgFirst ? 'order-2' : 'order-1') : 'md:col-span-2'}>
        {heading && <h2 className={`text-2xl md:text-4xl font-bold mb-3 ${dark ? 'text-white' : 'text-slate-900'}`}>{heading}</h2>}
        {subheading && <p className={`text-lg mb-4 ${dark ? 'text-blue-100' : 'text-slate-600'}`}>{subheading}</p>}
        <Markdown dark={dark}>{body}</Markdown>
        {cta_label && cta_url && <div className="mt-6"><CtaButton href={cta_url}>{cta_label}</CtaButton></div>}
      </div>
    </>
  );
  return (
    <Section background={background} first={first} dataTestId="program-two-column">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">{columns}</div>
    </Section>
  );
};

// ---------- 4. CTA Banner ----------
export const CtaBanner = ({ section }) => {
  const { heading, body, cta_label, cta_url } = section;
  if (!cta_label && !heading && !body) return null;
  return (
    <section className="py-16 md:py-20" data-testid="program-cta-banner">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="bg-gradient-to-r from-[#045184] to-[#00A8E1] rounded-3xl p-8 md:p-16 text-white text-center">
          {heading && <h2 className="text-2xl md:text-4xl font-bold mb-4">{heading}</h2>}
          {body && (
            <div className="text-base md:text-xl mb-8 max-w-3xl mx-auto opacity-95">
              <Markdown dark>{body}</Markdown>
            </div>
          )}
          {cta_label && cta_url && <CtaButton href={cta_url} variant="light">{cta_label}</CtaButton>}
        </div>
      </div>
    </section>
  );
};

// ---------- 5. Testimonial ----------
export const TestimonialBlock = ({ section, first }) => {
  const { body, subheading, image, background } = section;
  if (!body) return null;
  const dark = background === 'dark';
  return (
    <Section background={background} first={first} dataTestId="program-testimonial">
      <div className="max-w-3xl mx-auto text-center">
        {image && <img src={image} alt="" className="w-20 h-20 rounded-full mx-auto mb-4 object-cover shadow" />}
        <blockquote className={`text-lg md:text-2xl italic leading-relaxed mb-4 ${dark ? 'text-white' : 'text-slate-800'}`}>
          "{body}"
        </blockquote>
        {subheading && (
          <p className={`text-sm md:text-base font-semibold ${dark ? 'text-blue-100' : 'text-slate-600'}`}>
            — {subheading}
          </p>
        )}
      </div>
    </Section>
  );
};

// ---------- 6. Feature Cards ----------
export const FeatureCardsBlock = ({ section, first }) => {
  const { heading, subheading, feature_items, background } = section;
  if (!feature_items || feature_items.length === 0) return null;
  const dark = background === 'dark';
  const cols = feature_items.length === 2 ? 'md:grid-cols-2'
             : feature_items.length === 3 ? 'md:grid-cols-3'
             : 'md:grid-cols-2 lg:grid-cols-4';
  return (
    <Section background={background} first={first} dataTestId="program-feature-cards">
      {heading && <h2 className={`text-2xl md:text-4xl font-bold mb-3 text-center ${dark ? 'text-white' : 'text-slate-900'}`}>{heading}</h2>}
      {subheading && <p className={`text-lg mb-10 text-center ${dark ? 'text-blue-100' : 'text-slate-600'}`}>{subheading}</p>}
      <div className={`grid gap-6 ${cols}`}>
        {feature_items.map((item) => {
          const Icon = ICONS[item.icon] || Zap;
          return (
            <div key={item.id} className={`p-6 rounded-2xl border ${dark ? 'bg-white/10 border-white/20' : 'bg-white border-slate-200 shadow-sm hover:shadow-lg transition-shadow'}`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${dark ? 'bg-white/20' : 'bg-gradient-to-r from-[#045184] to-[#00A8E1]'}`}>
                <Icon size={24} className="text-white" />
              </div>
              <h3 className={`text-lg font-bold mb-2 ${dark ? 'text-white' : 'text-slate-900'}`}>{item.title}</h3>
              {item.body && (
                <div className={`text-sm ${dark ? 'text-blue-100' : 'text-slate-600'}`}>
                  <Markdown dark={dark}>{item.body}</Markdown>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
};

// ---------- 7. Video ----------
export const VideoBlock = ({ section, first }) => {
  const { heading, subheading, video_url, background } = section;
  if (!video_url) return null;
  const embedUrl = toEmbedUrl(video_url);
  const dark = background === 'dark';
  return (
    <Section background={background} first={first} dataTestId="program-video">
      {heading && <h2 className={`text-2xl md:text-4xl font-bold mb-3 text-center ${dark ? 'text-white' : 'text-slate-900'}`}>{heading}</h2>}
      {subheading && <p className={`text-lg mb-8 text-center ${dark ? 'text-blue-100' : 'text-slate-600'}`}>{subheading}</p>}
      <div className="max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={heading || 'Video'}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <a href={video_url} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center text-white gap-2">
            <Play size={24} /> Watch Video
          </a>
        )}
      </div>
    </Section>
  );
};

const toEmbedUrl = (url) => {
  if (!url) return null;
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return url;
};

// ---------- 8. Investment / Pricing ----------
export const InvestmentBlock = ({ section, first }) => {
  const { heading, subheading, body, cta_label, cta_url, background } = section;
  if (!heading && !body) return null;
  const dark = background === 'dark';
  return (
    <Section background={background} first={first} dataTestId="program-investment">
      <div className="max-w-3xl mx-auto text-center">
        {heading && <h2 className={`text-2xl md:text-4xl font-bold mb-3 ${dark ? 'text-white' : 'text-slate-900'}`}>{heading}</h2>}
        {subheading && <p className={`text-xl md:text-2xl font-semibold mb-4 ${dark ? 'text-blue-100' : 'text-[#00A8E1]'}`}>{subheading}</p>}
        <Markdown dark={dark}>{body}</Markdown>
        {cta_label && cta_url && <div className="mt-6"><CtaButton href={cta_url}>{cta_label}</CtaButton></div>}
      </div>
    </Section>
  );
};

// ---------- 9. People Gallery ----------
export const PeopleGallery = ({ section, first }) => {
  const { heading, subheading, people, background } = section;
  if (!people || people.length === 0) return null;
  const dark = background === 'dark';
  return (
    <Section background={background} first={first} dataTestId="program-people-gallery">
      {heading && <h2 className={`text-2xl md:text-4xl font-bold mb-3 text-center ${dark ? 'text-white' : 'text-slate-900'}`}>{heading}</h2>}
      {subheading && <p className={`text-lg mb-10 text-center ${dark ? 'text-blue-100' : 'text-slate-600'}`}>{subheading}</p>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {people.map((p) => (
          <div key={p.id} className="text-center">
            {p.headshot ? (
              <img src={p.headshot} alt={p.name} className="w-32 h-32 rounded-full mx-auto object-cover shadow-md mb-3" />
            ) : (
              <div className="w-32 h-32 rounded-full mx-auto bg-slate-200 flex items-center justify-center mb-3">
                <Users className="text-slate-400" size={40} />
              </div>
            )}
            <p className={`font-bold text-sm md:text-base ${dark ? 'text-white' : 'text-slate-900'}`}>{p.name}</p>
            {p.title && <p className={`text-xs md:text-sm mt-1 ${dark ? 'text-blue-100' : 'text-slate-600'}`}>{p.title}</p>}
            {p.company && <p className={`text-xs mt-0.5 ${dark ? 'text-blue-200' : 'text-slate-500'}`}>{p.company}</p>}
            {p.linkedin_url && (
              <a href={p.linkedin_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-2 text-[#0077B5] hover:opacity-80">
                <Linkedin size={16} />
              </a>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
};

// ---------- 10. Logo Gallery ----------
export const LogoGallery = ({ section, first }) => {
  const { heading, subheading, companies, background } = section;
  if (!companies || companies.length === 0) return null;
  const dark = background === 'dark';
  return (
    <Section background={background} first={first} dataTestId="program-logo-gallery">
      {heading && <h2 className={`text-2xl md:text-4xl font-bold mb-3 text-center ${dark ? 'text-white' : 'text-slate-900'}`}>{heading}</h2>}
      {subheading && <p className={`text-lg mb-10 text-center ${dark ? 'text-blue-100' : 'text-slate-600'}`}>{subheading}</p>}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 items-center">
        {companies.map((c) => (
          <div key={c.id} className={`p-4 rounded-xl flex items-center justify-center h-24 ${dark ? 'bg-white/10' : 'bg-white border border-slate-200'}`}>
            {c.logo ? (
              <img src={c.logo} alt={c.name} title={c.name} className="max-h-16 max-w-full object-contain" />
            ) : (
              <span className={`text-sm text-center ${dark ? 'text-white' : 'text-slate-700'}`}>{c.name}</span>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
};

// ---------- 11. Related Events ----------
export const RelatedEventsBlock = ({ section, program, first }) => {
  const seriesCode = section.series_code_override || program?.series_code;
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);
  const dark = section.background === 'dark';
  const maxItems = section.max_items || 3;

  useEffect(() => {
    if (!seriesCode) { setLoading(false); return; }
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    fetch(`${backendUrl}/api/events`)
      .then((r) => r.json())
      .then((data) => {
        const filtered = (data || []).filter((e) => e.series_code === seriesCode).slice(0, maxItems);
        setEvents(filtered);
      })
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, [seriesCode, maxItems]);

  if (!seriesCode) return null;
  if (loading) return null;
  if (!events || events.length === 0) return null;

  const heading = section.heading || 'Upcoming Events';
  return (
    <Section background={section.background} first={first} dataTestId="program-related-events">
      <h2 className={`text-2xl md:text-4xl font-bold mb-8 text-center ${dark ? 'text-white' : 'text-slate-900'}`}>{heading}</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <a
            key={event.id}
            href={`/events/${event.id}`}
            className={`block rounded-2xl overflow-hidden shadow hover:shadow-xl transition-shadow ${dark ? 'bg-white/10 border border-white/20' : 'bg-white border border-slate-200'}`}
          >
            {event.listing_picture ? (
              <img src={event.listing_picture} alt={event.event_title} className="w-full h-40 object-cover" />
            ) : (
              <div className="w-full h-40 bg-gradient-to-r from-[#045184] to-[#00A8E1] flex items-center justify-center">
                <Calendar size={48} className="text-white opacity-70" />
              </div>
            )}
            <div className="p-5">
              <h3 className={`font-bold mb-2 leading-tight ${dark ? 'text-white' : 'text-slate-900'}`}>{event.event_title}</h3>
              {event.start_date && (
                <p className={`text-sm ${dark ? 'text-blue-100' : 'text-slate-600'}`}>
                  {new Date(event.start_date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              )}
              <span className={`inline-flex items-center gap-1 mt-3 text-sm font-semibold ${dark ? 'text-blue-100' : 'text-[#00A8E1]'}`}>
                View Details <ArrowRight size={14} />
              </span>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
};

// ---------- Registry ----------
export const BLOCK_REGISTRY = {
  'Hero': HeroBlock,
  'Text Block': TextBlock,
  'Two-Column': TwoColumnBlock,
  'CTA Banner': CtaBanner,
  'Testimonial': TestimonialBlock,
  'Feature Cards': FeatureCardsBlock,
  'Video': VideoBlock,
  'Investment': InvestmentBlock,
  'People Gallery': PeopleGallery,
  'Logo Gallery': LogoGallery,
  'Related Events': RelatedEventsBlock,
};
