import React, { useEffect, useState } from 'react';
import { useParams, Link, useSearchParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import { Calendar, MapPin, ArrowLeft, ExternalLink, Linkedin, ArrowRight } from 'lucide-react';
import SEO from './SEO';
import Breadcrumb from './Breadcrumb';
import SignupModal from './SignupModal';
import CSCGuestTrialForm from './signup-forms/CSCGuestTrialForm';
import GCFForumForm from './signup-forms/GCFForumForm';
import LSCEOFForumForm from './signup-forms/LSCEOFForumForm';
import MemberNetworkForm from './signup-forms/MemberNetworkForm';
import NGGCNominationForm from './signup-forms/NGGCNominationForm';

// Series Code -> form variant component. Series codes without an entry here
// fall back to the existing external members-site link.
const FORM_VARIANTS = {
  'csc-form':             { title: 'I would like to attend this event!',                     Component: CSCGuestTrialForm },
  'gcf-form':             { title: 'I would like to attend this event!',                     Component: GCFForumForm },
  'lsceof-form':          { title: 'I would like to attend this event!',                     Component: LSCEOFForumForm },
  'gcx-form':             { title: 'Member-only event for General Counsel Network',          Component: MemberNetworkForm },
  'rmx-form':             { title: 'Member-only event for Risk Management Network',          Component: MemberNetworkForm },
  'lsceox-form':          { title: 'Member-only event for Life Sciences CEO Network',        Component: MemberNetworkForm },
  'nggc-nomination-form': { title: 'Next Gen GC Program: Nominate Your Candidate',           Component: NGGCNominationForm },
};
const SERIES_TO_FORM_KEY = {
  CSC: 'csc-form',
  GCF: 'gcf-form',
  LSCEOF: 'lsceof-form',
  GCX: 'gcx-form',
  RMX: 'rmx-form',
  LSCEOX: 'lsceox-form',
  NGGC: 'nggc-nomination-form',
};

// Series codes with an internal /events/:id details page (mirrors UpcomingEventsPage rules)
const INTERNAL_DETAILS_SERIES = new Set(['CSC', 'GCF', 'LSCEOF', 'GCX', 'RMX', 'LSCEOX']);
const SERIES_TO_PROGRAM_PATH = { NGGC: '/programs/next-generation-general-counsel' };
const nearbyEventUrl = (ev) => {
  if (ev.series_code && INTERNAL_DETAILS_SERIES.has(ev.series_code)) return `/events/${ev.id}`;
  if (ev.series_code && SERIES_TO_PROGRAM_PATH[ev.series_code]) return SERIES_TO_PROGRAM_PATH[ev.series_code];
  return ev.registration_url || '#';
};

const formatDate = (iso) => {
  if (!iso) return null;
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return iso;
  }
};

// Explicit renderers for the description body (Tailwind typography plugin isn't installed).
// This gives us reliable paragraph spacing, bullet points, and inline HTML tag support.
const mdComponents = {
  p: ({ node, ...props }) => <p className="mb-4 last:mb-0" {...props} />,
  ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4 space-y-1" {...props} />,
  ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4 space-y-1" {...props} />,
  li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
  h1: ({ node, ...props }) => <h3 className="text-xl font-bold mt-6 mb-3 text-[#045184]" {...props} />,
  h2: ({ node, ...props }) => <h3 className="text-xl font-bold mt-6 mb-3 text-[#045184]" {...props} />,
  h3: ({ node, ...props }) => <h4 className="text-lg font-bold mt-4 mb-2 text-[#045184]" {...props} />,
  a: ({ node, ...props }) => <a className="text-[#00A8E1] hover:text-[#0096C7] underline" target="_blank" rel="noopener noreferrer" {...props} />,
  strong: ({ node, ...props }) => <strong className="font-semibold text-slate-900" {...props} />,
  em: ({ node, ...props }) => <em className="italic" {...props} />,
  u: ({ node, ...props }) => <u className="underline" {...props} />,
  br: () => <br />,
  hr: () => <hr className="my-6 border-slate-200" />,
  blockquote: ({ node, ...props }) => (
    <blockquote className="border-l-4 border-[#00A8E1] pl-4 italic my-4 text-slate-600" {...props} />
  ),
};

const EventDetailsPage = () => {
  const { recordId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const isPast = location.pathname.startsWith('/past-events/');
  const listingPath = isPast ? '/past-events' : '/upcoming-events';
  const backLabel = isPast ? 'Back to Past Events' : 'Back to Upcoming Events';
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [signupOpen, setSignupOpen] = useState(false);
  const [nearbyEvents, setNearbyEvents] = useState([]);
  const [registrants, setRegistrants] = useState([]);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      setError(null);
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
        const res = await fetch(`${backendUrl}/api/events/${recordId}`);
        if (res.status === 404) {
          setError('not_found');
          setLoading(false);
          return;
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setEvent(data);
      } catch (e) {
        console.error('Failed to load event:', e);
        setError('load_failed');
      } finally {
        setLoading(false);
      }
    };
    if (recordId) fetchEvent();
  }, [recordId]);

  // Fetch registered participants for GCF / LSCEOF events (backend enforces
  // the >=10 minimum and returns [] otherwise, so we just render what we get).
  useEffect(() => {
    if (!event || !['GCF', 'LSCEOF'].includes(event.series_code)) {
      setRegistrants([]);
      return;
    }
    let cancelled = false;
    const fetchRegistrants = async () => {
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
        const res = await fetch(`${backendUrl}/api/events/${recordId}/registrants`);
        if (!res.ok) return;
        const list = await res.json();
        if (!cancelled && Array.isArray(list)) setRegistrants(list);
      } catch (e) { /* silently ignore */ }
    };
    fetchRegistrants();
    return () => { cancelled = true; };
  }, [recordId, event]);

  // Fetch upcoming events to power the "You might also like" strip.
  // Skip on past-event routes.
  useEffect(() => {
    if (isPast) { setNearbyEvents([]); return; }
    let cancelled = false;
    const fetchNearby = async () => {
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
        const res = await fetch(`${backendUrl}/api/events`);
        if (!res.ok) return;
        const list = await res.json();
        if (cancelled || !Array.isArray(list)) return;
        const filtered = list.filter((e) => e && e.id && e.id !== recordId).slice(0, 3);
        setNearbyEvents(filtered);
      } catch (e) {
        // silently ignore — strip just won't render
      }
    };
    fetchNearby();
    return () => { cancelled = true; };
  }, [recordId, isPast]);

  // Deep-link: auto-open sign-up modal when URL has ?signup=1 (real users)
  // OR ?formOverride=<key> (preview links). Either one is enough.
  // Never opens on past-event routes.
  useEffect(() => {
    if (!event || isPast) return;
    const override = searchParams.get('formOverride');
    const wantOpen = searchParams.get('signup') === '1' || !!override;
    if (!wantOpen) return;
    const key = (override && FORM_VARIANTS[override])
      ? override
      : (event.series_code ? SERIES_TO_FORM_KEY[event.series_code] : null);
    if (key && FORM_VARIANTS[key]) setSignupOpen(true);
  }, [event, searchParams, isPast]);

  const closeSignup = () => {
    setSignupOpen(false);
    // Clean the query params without adding a history entry, so a reload
    // of the (now bare) URL doesn't re-open the modal.
    const next = new URLSearchParams(searchParams);
    let changed = false;
    if (next.has('signup')) { next.delete('signup'); changed = true; }
    if (next.has('formOverride')) { next.delete('formOverride'); changed = true; }
    if (changed) setSearchParams(next, { replace: true });
  };

  if (loading) {
    return (
      <div className="pt-40 pb-24 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center">
        <div className="text-slate-600 text-lg" data-testid="event-detail-loading">Loading event…</div>
      </div>
    );
  }

  if (error === 'not_found') {
    return (
      <div className="pt-40 pb-24 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Event not found</h1>
          <p className="text-slate-600 mb-8">This event may have been removed or the link is incorrect.</p>
          <Link to={listingPath} className="inline-flex items-center gap-2 text-[#045184] hover:text-[#00A8E1] font-semibold">
            <ArrowLeft size={18} /> {backLabel}
          </Link>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="pt-40 pb-24 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Something went wrong</h1>
          <p className="text-slate-600 mb-8">We couldn't load this event right now. Please try again shortly.</p>
          <Link to={listingPath} className="inline-flex items-center gap-2 text-[#045184] hover:text-[#00A8E1] font-semibold">
            <ArrowLeft size={18} /> {backLabel}
          </Link>
        </div>
      </div>
    );
  }

  const heroImage = event.co_chair_graphic || event.listing_picture;
  const dateLine = event.date_time
    || [formatDate(event.start_date), event.start_time && event.end_time ? `${event.start_time} – ${event.end_time}` : null, event.timezone]
        .filter(Boolean)
        .join(' • ');

  // Which sign-up form (if any) applies to this event's series code?
  // Optional `?formOverride=<form_key>` lets you preview any form on any event.
  const overrideKey = searchParams.get('formOverride');
  const formKey = overrideKey && FORM_VARIANTS[overrideKey]
    ? overrideKey
    : (event.series_code ? SERIES_TO_FORM_KEY[event.series_code] : null);
  const formVariant = formKey ? FORM_VARIANTS[formKey] : null;

  // Deep link: /events/:recordId?signup=1 auto-opens the modal if a form is configured
  // We check this AFTER the event has loaded so we know whether a variant exists.
  // Using useEffect below.

  return (
    <div className="pt-40 pb-24 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100" data-testid="event-detail-page">
      <SEO
        title={event.event_title}
        description={(event.short_description || '').slice(0, 160)}
        image={heroImage || undefined}
        event={{
          name: event.event_title,
          startDate: event.start_date,
          endDate: event.end_date,
          location: event.location,
          address: event.venue_address,
          isVirtual: (event.in_person_digital || '').toLowerCase().includes('virtual'),
          description: event.short_description,
          url: event.registration_url,
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb customTitle={event.event_title} />

        <Link
          to={listingPath}
          className="inline-flex items-center gap-2 text-[#045184] hover:text-[#00A8E1] font-medium mb-6 transition-colors"
          data-testid="event-detail-back"
        >
          <ArrowLeft size={18} /> {backLabel}
        </Link>

        {/* Header block */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl overflow-hidden shadow-lg mb-8"
        >
          {heroImage && (
            <div className="w-full overflow-hidden bg-slate-100">
              <img
                src={heroImage}
                alt={event.event_title}
                className="block w-full h-auto"
                loading="eager"
              />
            </div>
          )}
          <div className="p-6 md:p-10">
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight"
              data-testid="event-detail-title"
            >
              {event.event_title}
            </h1>

            {/* Meta rows */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {dateLine && (
                <div className="flex items-start gap-3 text-slate-700">
                  <Calendar size={20} className="text-[#00A8E1] mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-semibold uppercase text-slate-500 mb-1">Date & Time</div>
                    <div className="text-sm md:text-base" data-testid="event-detail-date">{dateLine}</div>
                  </div>
                </div>
              )}
              {event.location && (
                <div className="flex items-start gap-3 text-slate-700">
                  <MapPin size={20} className="text-[#00A8E1] mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-semibold uppercase text-slate-500 mb-1">Location</div>
                    <div className="text-sm md:text-base" data-testid="event-detail-location">
                      {event.location}
                      {event.venue_address && event.venue_address !== event.location && (
                        <div className="text-slate-500 text-sm mt-0.5">{event.venue_address}</div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* CTA — hidden for past events */}
            {!isPast && (
            <div className="flex flex-wrap items-center gap-3">
              {formVariant ? (
                <button
                  type="button"
                  onClick={() => setSignupOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-colors"
                  style={{ backgroundColor: '#00A8E1' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0096C7')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#00A8E1')}
                  data-testid="event-detail-attend-btn"
                >
                  I would like to attend
                </button>
              ) : (
                <a
                  href={event.registration_url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-colors"
                  style={{ backgroundColor: '#00A8E1' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0096C7')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#00A8E1')}
                  data-testid="event-detail-attend-btn"
                >
                  I would like to attend
                  <ExternalLink size={16} />
                </a>
              )}
              {event.registration_closed && !event.fully_booked && (
                <span className="text-sm font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full">
                  Registration closed
                </span>
              )}
            </div>
            )}
          </div>
        </motion.div>

        {/* Body: description */}
        {(event.short_description || event.long_description) && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-6 md:p-10 shadow-lg mb-8"
          >
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#045184' }}>About this event</h2>
            <div
              className="event-description text-slate-700 leading-relaxed"
              data-testid="event-detail-description"
            >
              {event.short_description && (
                <ReactMarkdown
                  remarkPlugins={[remarkBreaks]}
                  rehypePlugins={[rehypeRaw]}
                  components={mdComponents}
                >
                  {event.short_description}
                </ReactMarkdown>
              )}
              {event.long_description && (
                <ReactMarkdown
                  remarkPlugins={[remarkBreaks]}
                  rehypePlugins={[rehypeRaw]}
                  components={mdComponents}
                >
                  {event.long_description}
                </ReactMarkdown>
              )}
            </div>
          </motion.div>
        )}

        {/* Session leader */}
        {event.session_leader_name && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-6 md:p-10 shadow-lg mb-8"
          >
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#045184' }}>Session Leader</h2>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {event.session_leader_headshot && (
                <img
                  src={event.session_leader_headshot}
                  alt={event.session_leader_name}
                  className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover shadow-md flex-shrink-0"
                />
              )}
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-bold text-slate-900">{event.session_leader_name}</h3>
                {event.session_leader_position && (
                  <p className="text-slate-600 mt-1">{event.session_leader_position}</p>
                )}
                {event.session_leader_company && (
                  <p className="text-[#00A8E1] font-medium mt-0.5">{event.session_leader_company}</p>
                )}
                {event.session_leader_linkedin && (
                  <a
                    href={event.session_leader_linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-sm text-[#0077b5] hover:text-[#005582] font-medium"
                  >
                    <Linkedin size={16} /> LinkedIn
                  </a>
                )}
              </div>
            </div>
            {event.lead_moderator_name && event.lead_moderator_name !== event.session_leader_name && (
              <p className="text-sm text-slate-500 mt-6 pt-4 border-t border-slate-200">
                <strong className="text-slate-700">Moderator:</strong> {event.lead_moderator_name}
              </p>
            )}
          </motion.div>
        )}

        {/* Registered Participants — GCF/LSCEOF forums with 10+ registrants */}
        {registrants.length > 0 && (
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-6 mb-10"
            data-testid="event-detail-registrants"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: '#045184' }}>
              Registered Participants
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
              {registrants.map((p, i) => (
                <div
                  key={p.id || i}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  data-testid={`event-detail-registrant-${i}`}
                >
                  <div className="aspect-square w-full overflow-hidden bg-slate-100">
                    {p.headshot ? (
                      <img src={p.headshot} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 text-3xl font-bold">
                        {(p.name || '?').charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-bold text-slate-900 leading-tight line-clamp-2">{p.name}</h3>
                    {p.title && (
                      <p className="text-xs text-slate-600 leading-snug mt-1 line-clamp-2">{p.title}</p>
                    )}
                    {p.company && (
                      <p className="text-xs text-[#00A8E1] font-semibold mt-1 line-clamp-1">{p.company}</p>
                    )}
                    {p.linkedin && (
                      <a
                        href={p.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-[#0077b5] mt-2"
                        aria-label={`${p.name} on LinkedIn`}
                      >
                        <Linkedin size={12} /> LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Bottom CTA — hidden for past events */}
        {!isPast && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-lg text-center"
            data-testid="event-detail-bottom-cta"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: '#045184' }}>
              Interested in joining us?
            </h2>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Reserve your seat at <strong className="font-semibold text-slate-900">{event.event_title}</strong> and connect with peers driving executive leadership forward.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {formVariant ? (
                <button
                  type="button"
                  onClick={() => setSignupOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-colors"
                  style={{ backgroundColor: '#00A8E1' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0096C7')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#00A8E1')}
                  data-testid="event-detail-attend-btn-bottom"
                >
                  I would like to attend
                </button>
              ) : (
                <a
                  href={event.registration_url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-colors"
                  style={{ backgroundColor: '#00A8E1' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0096C7')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#00A8E1')}
                  data-testid="event-detail-attend-btn-bottom"
                >
                  I would like to attend
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </motion.div>
        )}

        {/* Thanks To Our Partners — sponsor logos, hidden if no sponsors */}
        {event.sponsors && event.sponsors.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mt-8"
            data-testid="event-detail-partners"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8" style={{ color: '#045184' }}>
              Thanks To Our Partners
            </h2>
            <div className={`grid gap-6 md:gap-8 items-center justify-items-center ${
              event.sponsors.length === 1 ? 'grid-cols-1 max-w-xs mx-auto' :
              event.sponsors.length === 2 ? 'grid-cols-2 max-w-2xl mx-auto' :
              event.sponsors.length === 3 ? 'grid-cols-2 sm:grid-cols-3 max-w-3xl mx-auto' :
              'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'
            }`}>
              {event.sponsors.map((sponsor, idx) => (
                <div
                  key={idx}
                  className="w-full flex items-center justify-center p-4"
                  data-testid={`event-detail-partner-logo-${idx}`}
                >
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name ? `${sponsor.name} — event partner` : 'Event partner logo'}
                    className="max-h-20 md:max-h-24 w-auto object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* You might also like — 2-3 other upcoming events */}
        {!isPast && nearbyEvents.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12"
            data-testid="event-detail-nearby-events"
          >
            <div className="flex items-end justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold" style={{ color: '#045184' }}>
                You might also like
              </h2>
              <Link
                to="/upcoming-events"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[#00A8E1] hover:text-[#0096C7]"
                data-testid="event-detail-nearby-see-all"
              >
                See all events <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {nearbyEvents.map((ne, i) => {
                const href = nearbyEventUrl(ne);
                const isInternal = href.startsWith('/');
                const dateText = ne.date_time || (ne.start_date ? new Date(ne.start_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '');
                const cardInner = (
                  <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow h-full flex flex-col">
                    {ne.listing_picture && (
                      <div className="w-full aspect-[16/9] overflow-hidden bg-slate-100">
                        <img
                          src={ne.listing_picture}
                          alt={ne.event_title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-5 flex-1 flex flex-col">
                      {ne.series && (
                        <div className="text-xs font-semibold uppercase tracking-wider text-[#00A8E1] mb-2">
                          {ne.series}
                        </div>
                      )}
                      <h3 className="text-lg font-bold text-slate-900 leading-snug mb-3 line-clamp-3">
                        {ne.event_title}
                      </h3>
                      {dateText && (
                        <div className="mt-auto flex items-center gap-2 text-sm text-slate-600">
                          <Calendar size={14} className="text-[#00A8E1]" />
                          <span>{dateText}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
                return isInternal ? (
                  <Link
                    key={ne.id || i}
                    to={href}
                    className="block group"
                    data-testid={`event-detail-nearby-card-${i}`}
                  >
                    {cardInner}
                  </Link>
                ) : (
                  <a
                    key={ne.id || i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                    data-testid={`event-detail-nearby-card-${i}`}
                  >
                    {cardInner}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>

      {/* Sign-up modal (rendered only when a form variant is configured for this series) */}
      {formVariant && (
        <SignupModal
          isOpen={signupOpen}
          onClose={closeSignup}
          title={formVariant.title}
        >
          <formVariant.Component event={event} formKey={formKey} onSuccess={() => { /* keep modal open on success view */ }} />
        </SignupModal>
      )}
    </div>
  );
};

export default EventDetailsPage;
