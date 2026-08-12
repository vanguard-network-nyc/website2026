import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import { Calendar, MapPin, ArrowLeft, ExternalLink, Linkedin } from 'lucide-react';
import SEO from './SEO';
import Breadcrumb from './Breadcrumb';

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
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          <Link to="/upcoming-events" className="inline-flex items-center gap-2 text-[#045184] hover:text-[#00A8E1] font-semibold">
            <ArrowLeft size={18} /> Back to Events
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
          <Link to="/upcoming-events" className="inline-flex items-center gap-2 text-[#045184] hover:text-[#00A8E1] font-semibold">
            <ArrowLeft size={18} /> Back to Events
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
          to="/upcoming-events"
          className="inline-flex items-center gap-2 text-[#045184] hover:text-[#00A8E1] font-medium mb-6 transition-colors"
          data-testid="event-detail-back"
        >
          <ArrowLeft size={18} /> Back to Events
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

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-3">
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
              {event.registration_closed && !event.fully_booked && (
                <span className="text-sm font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full">
                  Registration closed
                </span>
              )}
            </div>
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
      </div>
    </div>
  );
};

export default EventDetailsPage;
