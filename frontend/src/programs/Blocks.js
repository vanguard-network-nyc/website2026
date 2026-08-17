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
// Airtable "background" field values (single-select):
//   white          → white box on ambient strip (default)
//   light-blue-box → light-blue-tinted box on ambient strip
//   light-blue-strip → white box on a light-blue strip
//   dark-box       → dark-navy box on ambient strip (dark text mode inside)
//   dark-strip     → white box on a dark-navy strip
//   plain          → no box at all, content sits directly on ambient strip
//   (legacy) light-blue → alias of light-blue-strip
//   (legacy) dark → alias of dark-strip
const bgToClass = (bg) => {
  if (bg === 'light-blue-strip' || bg === 'light-blue') {
    return 'bg-gradient-to-br from-blue-50 to-slate-50';
  }
  if (bg === 'dark-strip' || bg === 'dark') {
    return 'bg-gradient-to-br from-[#032a48] to-[#045184]';
  }
  return 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100';
};

// Card wrapper style. Returns '' when no box should be drawn.
const CARD_BASE_NO_BORDER = 'rounded-3xl p-8 md:p-12 shadow-lg';
const CARD_BASE = `${CARD_BASE_NO_BORDER} border`;
const cardWrapClass = (background) => {
  if (background === 'plain') return '';
  if (background === 'dark-box') return `${CARD_BASE} bg-gradient-to-br from-[#032a48] to-[#045184] border-white/10 text-white`;
  if (background === 'light-blue-box') return `${CARD_BASE} bg-gradient-to-br from-sky-100 to-blue-100 border-blue-200`;
  if (background === 'white-light-blue-outline') return `${CARD_BASE_NO_BORDER.replace('shadow-lg','')} bg-white shadow-[10px_10px_28px_-8px_rgba(0,168,225,0.35)]`;
  if (background === 'white-dark-outline') return `${CARD_BASE_NO_BORDER.replace('shadow-lg','')} bg-white shadow-[10px_10px_28px_-8px_rgba(4,81,132,0.35)]`;
  return `${CARD_BASE} bg-white border-slate-200`;
};

// Inside a dark box, text/headings switch to light mode.
const isDarkInside = (bg) => bg === 'dark-box';

// True whenever text sits on a dark surface (dark box OR dark strip).
// Used by blocks whose heading/subheading render directly on the strip
// (Feature Cards, People Gallery, Logo Gallery, Video, Related Events).
const isDarkContrast = (bg) => bg === 'dark-box' || bg === 'dark-strip' || bg === 'dark';

const Section = ({ background, children, dataTestId, first = false }) => (
  <section className={`${bgToClass(background)}`} data-testid={dataTestId}>
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8 ${first ? 'pt-2 md:pt-4 pb-6 md:pb-10' : 'py-6 md:py-10'}`}>
      {children}
    </div>
  </section>
);

// A section is rendered inside a white card by default. Setting `background = "plain"`
// on the Airtable row skips the card wrapper — the block renders bare on the page's
// ambient background. Use "plain" for short bridging paragraphs between boxed sections.

const Markdown = ({ children, dark = false }) => {
  if (!children) return null;
  const proseClass = dark
    ? 'prose prose-invert max-w-none prose-p:my-3 prose-li:my-1 prose-li:text-inherit prose-li:marker:text-current prose-ul:text-inherit'
    : 'prose max-w-none prose-p:my-3 prose-li:my-1 prose-headings:text-slate-900 prose-p:text-slate-700 prose-li:text-slate-700 prose-li:marker:text-slate-700 prose-ul:text-slate-700 prose-strong:text-slate-900';
  return (
    <div className={proseClass}>
      <ReactMarkdown
        remarkPlugins={[remarkBreaks]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // External links open in a new tab; internal (relative) links stay in-tab.
          a: ({ node, href, children, ...props }) => {
            const isExternal = /^https?:\/\//i.test(href || '');
            return (
              <a
                href={href}
                {...(isExternal
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                {...props}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
};

const CtaButton = ({ href, children, variant = 'primary', onOpenForm }) => {
  if (!href || !children) return null;
  const base = 'inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer';
  const styles = variant === 'primary'
    ? 'bg-[#00A8E1] text-white hover:bg-[#0096C7]'
    : 'bg-white text-[#045184] hover:bg-slate-100';

  // Special href: #form:<form-key> opens a modal on the current page instead of navigating.
  const formMatch = /^#form:([\w-]+)$/i.exec(href.trim());
  if (formMatch) {
    const key = formMatch[1];
    return (
      <button
        type="button"
        onClick={() => onOpenForm && onOpenForm(key)}
        className={`${base} ${styles}`}
      >
        {children}
        <ArrowRight size={16} />
      </button>
    );
  }

  const isExternal = /^https?:\/\//.test(href);
  return (
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
};

// ---------- 1. Hero ----------
export const HeroBlock = ({ program, section, onOpenForm }) => {
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
            <CtaButton href={ctaUrl} variant="light" onOpenForm={onOpenForm}>{ctaLabel}</CtaButton>
          </div>
        )}
      </div>
    </section>
  );
};

// ---------- 2. Text Block ----------
export const TextBlock = ({ section, first, onOpenForm }) => {
  const { heading, subheading, body, cta_label, cta_url, background } = section;
  if (!heading && !subheading && !body && !cta_label) return null;
  const dark = isDarkInside(background);
  return (
    <Section background={background} first={first} dataTestId="program-text-block">
      <div className={`mx-auto ${cardWrapClass(background)}`}>
        {heading && (
          <h2 className={`text-2xl md:text-4xl font-bold mb-3 pb-1 leading-tight ${dark ? 'text-white' : 'bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent'}`}>
            {heading}
          </h2>
        )}
        {subheading && <p className={`text-lg md:text-xl mb-6 ${dark ? 'text-blue-100' : 'text-slate-600'}`}>{subheading}</p>}
        <Markdown dark={dark}>{body}</Markdown>
        {cta_label && cta_url && <div className="mt-8"><CtaButton href={cta_url} onOpenForm={onOpenForm}>{cta_label}</CtaButton></div>}
      </div>
    </Section>
  );
};

// ---------- 3. Two-Column ----------
export const TwoColumnBlock = ({ section, first, onOpenForm }) => {
  const { heading, subheading, body, image, image_side, cta_label, cta_url, background } = section;
  if (!body && !heading && !image) return null;
  const dark = isDarkInside(background);
  const imgFirst = image_side === 'left';
  const columns = (
    <>
      {image && (
        <div className={imgFirst ? 'order-1' : 'order-2'}>
          <img src={image} alt={heading || ''} className="w-full h-auto rounded-2xl shadow-xl object-cover" />
        </div>
      )}
      <div className={image ? (imgFirst ? 'order-2' : 'order-1') : 'md:col-span-2'}>
        {heading && (
          <h2 className={`text-2xl md:text-4xl font-bold mb-3 pb-1 leading-tight ${dark ? 'text-white' : 'bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent'}`}>
            {heading}
          </h2>
        )}
        {subheading && <p className={`text-lg mb-4 ${dark ? 'text-blue-100' : 'text-slate-600'}`}>{subheading}</p>}
        <Markdown dark={dark}>{body}</Markdown>
        {cta_label && cta_url && <div className="mt-6"><CtaButton href={cta_url} onOpenForm={onOpenForm}>{cta_label}</CtaButton></div>}
      </div>
    </>
  );
  return (
    <Section background={background} first={first} dataTestId="program-two-column">
      <div className={`mx-auto ${cardWrapClass(background)}`}>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">{columns}</div>
      </div>
    </Section>
  );
};

// ---------- 4. CTA Banner ----------
export const CtaBanner = ({ section, first, onOpenForm }) => {
  const { heading, body, cta_label, cta_url } = section;
  if (!cta_label && !heading && !body) return null;
  return (
    <Section background="plain" first={first} dataTestId="program-cta-banner">
      <div className="bg-gradient-to-r from-[#045184] to-[#00A8E1] rounded-3xl p-8 md:p-16 text-white text-center shadow-lg">
        {heading && <h2 className="text-2xl md:text-4xl font-bold mb-4">{heading}</h2>}
        {body && (
          <div className="text-base md:text-xl mb-8 max-w-3xl mx-auto opacity-95">
            <Markdown dark>{body}</Markdown>
          </div>
        )}
        {cta_label && cta_url && <CtaButton href={cta_url} variant="light" onOpenForm={onOpenForm}>{cta_label}</CtaButton>}
      </div>
    </Section>
  );
};

// ---------- 5. Testimonial ----------
export const TestimonialBlock = ({ section, first }) => {
  const { body, subheading, image, people, background } = section;
  if (!body) return null;
  const dark = isDarkInside(background);
  const person = people && people.length > 0 ? people[0] : null;
  const headshot = person?.headshot || image;
  const attributionParts = person
    ? [person.name, person.title, person.company].filter(Boolean)
    : (subheading ? [subheading] : []);
  return (
    <Section background={background} first={first} dataTestId="program-testimonial">
      <div className={`mx-auto ${cardWrapClass(background)}`}>
        <div className="grid md:grid-cols-[minmax(180px,220px)_1fr] gap-8 md:gap-12 items-center">
          {/* Headshot — vertically centered alongside quote + attribution */}
          <div className="flex items-center justify-center md:justify-start">
            {headshot ? (
              <img
                src={headshot}
                alt={person?.name || ''}
                className="w-40 h-40 md:w-52 md:h-52 rounded-full object-cover shadow-lg ring-4 ring-slate-50"
              />
            ) : (
              <div className={`w-40 h-40 md:w-52 md:h-52 rounded-full flex items-center justify-center ${dark ? 'bg-white/10' : 'bg-slate-200'}`}>
                <Users size={48} className={dark ? 'text-white/50' : 'text-slate-400'} />
              </div>
            )}
          </div>

          {/* Right column: quote + attribution stacked tightly */}
          <div>
            <div className="relative">
              <span className={`absolute -top-4 -left-2 text-6xl leading-none font-serif ${dark ? 'text-white/20' : 'text-slate-200'}`}>&ldquo;</span>
              <blockquote className={`relative text-lg md:text-2xl italic leading-relaxed ${dark ? 'text-white' : 'text-slate-800'}`}>
                {body}
              </blockquote>
            </div>
            {attributionParts.length > 0 && (
              <p className={`mt-3 text-sm md:text-base font-semibold text-right ${dark ? 'text-blue-100' : 'text-slate-600'}`}>
                — {attributionParts.join(' | ')}
              </p>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};

// ---------- 6. Feature Cards ----------
export const FeatureCardsBlock = ({ section, first }) => {
  const { heading, subheading, feature_items, background, columns } = section;
  if (!feature_items || feature_items.length === 0) return null;
  const dark = isDarkContrast(background);
  const boxed = cardWrapClass(background);
  const explicit = String(columns || '').trim();
  const cols = explicit === '2' ? 'md:grid-cols-2'
             : explicit === '3' ? 'md:grid-cols-3'
             : explicit === '4' ? 'md:grid-cols-2 lg:grid-cols-4'
             : feature_items.length === 2 ? 'md:grid-cols-2'
             : feature_items.length === 3 ? 'md:grid-cols-3'
             : 'md:grid-cols-2 lg:grid-cols-4';
  return (
    <Section background={background} first={first} dataTestId="program-feature-cards">
      <div className={boxed}>
        {heading && (
          <h2 className={`text-2xl md:text-4xl font-bold mb-3 pb-1 text-center leading-tight ${dark ? 'text-white' : 'bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent'}`}>
            {heading}
          </h2>
        )}
        {subheading && <p className={`text-lg mb-10 text-center ${dark ? 'text-blue-100' : 'text-slate-600'}`}>{subheading}</p>}
        <div className={`grid gap-6 ${cols}`}>
          {feature_items.map((item, idx) => {
            const hasIcon = !!item.icon && !!ICONS[item.icon];
            const Icon = ICONS[item.icon];
            return (
              <motion.div
                key={item.id}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: Math.min(idx * 0.08, 0.4) }}
                className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${dark ? 'bg-white/10 border-white/20' : 'bg-white border-slate-200 shadow-sm'}`}
              >
                {hasIcon ? (
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-r from-[#045184] to-[#00A8E1] shadow-md">
                    <Icon size={24} className="text-white" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4 bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white font-bold shadow-md">
                    {idx + 1}
                  </div>
                )}
                <h3 className={`text-lg font-bold mb-2 ${dark ? 'text-white' : 'text-slate-900'}`}>{item.title}</h3>
                {item.body && (
                  <div className={`text-sm ${dark ? 'text-blue-100' : 'text-slate-600'}`}>
                    <Markdown dark={dark}>{item.body}</Markdown>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

// ---------- 7. Video ----------
const isDirectVideoFile = (url) => /\.(mp4|webm|mov|m4v|ogv)(\?.*)?$/i.test(url || '');

export const VideoBlock = ({ section, first }) => {
  const { heading, subheading, video_url, background } = section;
  if (!video_url) return null;
  const isNative = isDirectVideoFile(video_url);
  const embedUrl = isNative ? null : toEmbedUrl(video_url);
  return (
    <Section background={background} first={first} dataTestId="program-video">
      <div className="bg-white rounded-3xl p-6 md:p-12 shadow-xl border-2 border-transparent hover:border-[#045184]/10 transition-all duration-500 relative overflow-hidden">
        {/* Subtle decorative accent */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#045184]/5 to-[#00A8E1]/5 rounded-full transform translate-x-20 -translate-y-20 pointer-events-none"></div>
        <div className="relative z-10">
          {heading && (
            <h2 className="text-2xl md:text-4xl font-bold mb-3 pb-1 text-center leading-tight bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent">
              {heading}
            </h2>
          )}
          {subheading && <p className="text-lg mb-8 text-center text-slate-600">{subheading}</p>}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-slate-900">
            {isNative ? (
              <video
                className="w-full h-full object-cover"
                controls
                controlsList="nodownload nofullscreen noremoteplayback"
                disablePictureInPicture
                playsInline
              >
                <source src={video_url} />
                Your browser does not support the video tag.
              </video>
            ) : embedUrl ? (
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
        </div>
      </div>
    </Section>
  );
};

const toEmbedUrl = (url) => {
  if (!url) return null;
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/);
  if (yt) {
    // Minimal chrome: hide title bar, "related videos" popup, keyboard closed captions info.
    return `https://www.youtube.com/embed/${yt[1]}?modestbranding=1&rel=0&iv_load_policy=3&playsinline=1`;
  }
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) {
    // Clean Vimeo player — hide top overlay (title/byline/portrait), disable Picture-in-Picture,
    // respect DNT, keep controls + playsinline. Matches the stripped-down look of the native
    // <video controlsList="nodownload nofullscreen noremoteplayback"> used elsewhere on the site.
    return `https://player.vimeo.com/video/${vimeo[1]}?title=0&byline=0&portrait=0&pip=0&dnt=1&playsinline=1`;
  }
  return url;
};

// ---------- 8. Investment / Pricing ----------
export const InvestmentBlock = ({ section, first, onOpenForm }) => {
  const { heading, subheading, body, cta_label, cta_url, background } = section;
  if (!heading && !body) return null;
  const dark = isDarkInside(background);
  return (
    <Section background={background} first={first} dataTestId="program-investment">
      <div className={`mx-auto ${cardWrapClass(background)}`}>
        {heading && (
          <h2 className={`text-2xl md:text-4xl font-bold mb-3 pb-1 leading-tight ${dark ? 'text-white' : 'bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent'}`}>
            {heading}
          </h2>
        )}
        {subheading && <p className={`text-xl md:text-3xl font-extrabold mb-6 ${dark ? 'text-blue-100' : 'text-[#00A8E1]'}`}>{subheading}</p>}
        <Markdown dark={dark}>{body}</Markdown>
        {cta_label && cta_url && <div className="mt-6"><CtaButton href={cta_url} onOpenForm={onOpenForm}>{cta_label}</CtaButton></div>}
      </div>
    </Section>
  );
};

// ---------- 9. People Gallery ----------
const lastNameOf = (name) => {
  if (!name) return '';
  const parts = String(name).trim().split(/\s+/);
  return (parts[parts.length - 1] || '').toLowerCase();
};

export const PeopleGallery = ({ section, first }) => {
  const { heading, subheading, people, background, columns } = section;
  const [expanded, setExpanded] = useState(false);
  if (!people || people.length === 0) return null;
  const dark = isDarkContrast(background);
  const boxed = cardWrapClass(background);
  const sorted = [...people].sort((a, b) => lastNameOf(a.name).localeCompare(lastNameOf(b.name)));
  const showAll = (columns || '').toLowerCase() === 'all';
  const INITIAL = 12;
  const hasMore = !showAll && sorted.length > INITIAL;
  const visible = expanded || !hasMore ? sorted : sorted.slice(0, INITIAL);
  return (
    <Section background={background} first={first} dataTestId="program-people-gallery">
      <div className={boxed}>
        {heading && (
          <h2 className={`text-2xl md:text-4xl font-bold mb-3 pb-1 text-center ${dark ? 'text-white' : 'bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent'}`}>
            {heading}
          </h2>
        )}
        {subheading && <p className={`text-lg mb-10 text-center ${dark ? 'text-blue-100' : 'text-slate-600'}`}>{subheading}</p>}
        {!subheading && heading && <div className="mb-8" />}
        <div className="flex flex-wrap justify-center gap-6">
          {visible.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: Math.min(idx * 0.05, 0.4) }}
              className={`text-center p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.125rem)] max-w-xs ${dark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}
            >
              {p.headshot ? (
                <img src={p.headshot} alt={p.name} className="w-28 h-28 rounded-full mx-auto object-cover shadow-md ring-2 ring-white mb-3" />
              ) : (
                <div className="w-28 h-28 rounded-full mx-auto bg-slate-200 flex items-center justify-center mb-3">
                  <Users className="text-slate-400" size={36} />
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
            </motion.div>
          ))}
        </div>
        {hasMore && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${dark ? 'bg-white/10 text-white hover:bg-white/20 border border-white/20' : 'bg-white text-[#045184] hover:bg-slate-100 border border-slate-200 shadow-sm'}`}
              data-testid="people-gallery-toggle"
            >
              {expanded ? 'Show less' : `See more (${sorted.length - INITIAL})`}
            </button>
          </div>
        )}
      </div>
    </Section>
  );
};

// ---------- 10. Logo Gallery ----------
// Supports layout variants via section.columns:
//   ""       — default (medium logos, spread apart)
//   "large"  — big graphic cards, tight gap (used for "Membership Provides Access To")
//   "dense"  — 5 per row, small tight logos with "See more" after 15 (used for network members)
export const LogoGallery = ({ section, first }) => {
  const { heading, subheading, companies, background, columns } = section;
  const [expanded, setExpanded] = useState(false);
  if (!companies || companies.length === 0) return null;
  const dark = isDarkContrast(background);
  const boxed = cardWrapClass(background);
  const variant = (columns || '').toLowerCase();

  let gridCls = "flex flex-wrap justify-center items-center gap-10 md:gap-16";
  let itemCls = "flex items-center justify-center transition-transform duration-300 hover:scale-105 w-40 md:w-56 h-24 md:h-32";
  let imgCls = "max-h-24 md:max-h-32 max-w-full object-contain";

  if (variant === 'large') {
    gridCls = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-3";
    itemCls = "flex items-center justify-center transition-transform duration-300 hover:scale-105";
    imgCls = "w-full h-auto max-h-[520px] object-contain";
  } else if (variant === 'dense') {
    gridCls = "grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-x-0 gap-y-1";
    itemCls = "flex items-center justify-center transition-transform duration-300 hover:scale-105 h-16 md:h-20 px-1";
    imgCls = "w-full h-full object-contain";
  }

  const INITIAL = 28;
  const hasMore = variant === 'dense' && companies.length > INITIAL;
  const visible = hasMore && !expanded ? companies.slice(0, INITIAL) : companies;

  return (
    <Section background={background} first={first} dataTestId="program-logo-gallery">
      <div className={boxed}>
        {heading && (
          <h2 className={`text-2xl md:text-4xl font-bold mb-3 pb-1 text-center leading-tight ${dark ? 'text-white' : 'bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent'}`}>
            {heading}
          </h2>
        )}
        {subheading && <p className={`text-lg mb-10 text-center ${dark ? 'text-blue-100' : 'text-slate-600'}`}>{subheading}</p>}
        <div className={gridCls}>
          {visible.map((c, idx) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: Math.min(idx * 0.03, 0.4) }}
              className={itemCls}
            >
              {c.logo ? (
                <img src={c.logo} alt={c.name} title={c.name} className={imgCls} />
              ) : (
                <span className={`text-sm text-center ${dark ? 'text-white' : 'text-slate-700'}`}>{c.name}</span>
              )}
            </motion.div>
          ))}
        </div>
        {hasMore && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${dark ? 'bg-white/10 text-white hover:bg-white/20 border border-white/20' : 'bg-white text-[#045184] hover:bg-slate-100 border border-slate-200 shadow-sm'}`}
              data-testid="logo-gallery-toggle"
            >
              {expanded ? 'Show less' : `See more (${companies.length - INITIAL})`}
            </button>
          </div>
        )}
      </div>
    </Section>
  );
};

// ---------- 11. Related Events ----------
export const RelatedEventsBlock = ({ section, program, first }) => {
  const seriesCode = section.series_code_override || program?.series_code;
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);
  const dark = isDarkContrast(section.background);
  const boxed = cardWrapClass(section.background);
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
      <div className={boxed}>
        <h2 className={`text-2xl md:text-4xl font-bold mb-8 pb-1 text-center leading-tight ${dark ? 'text-white' : 'bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent'}`}>{heading}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, idx) => (
            <motion.a
              key={event.id}
              href={`/events/${event.id}`}
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: Math.min(idx * 0.08, 0.4) }}
              className={`block rounded-2xl overflow-hidden shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${dark ? 'bg-white/10 border border-white/20' : 'bg-white border border-slate-200'}`}
            >
              {event.listing_picture ? (
                <img src={event.listing_picture} alt={event.event_title} className="w-full h-64 object-cover" />
              ) : (
                <div className="w-full h-64 bg-gradient-to-r from-[#045184] to-[#00A8E1] flex items-center justify-center">
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
            </motion.a>
          ))}
        </div>
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
