import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';
import SEO from './SEO';
import { Calendar, Clock, ArrowRight, ExternalLink, Users, Search, Filter, CalendarDays, ChevronDown, Mail } from 'lucide-react';

// Past-events cards always link to the internal past-event details page.
const eventDetailsUrl = (event) => `/past-events/${event.id}`;

const PastEventsPage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAudience, setSelectedAudience] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'calendar'
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      filterEvents();
    }
  }, [events, searchTerm, selectedAudience, selectedLocation, selectedDate]);

  // Helper to parse date and convert from UTC to local timezone
  const parseDateToLocal = (dateString, timezone = 'EST') => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      const timezoneOffsets = {
        'EST': -5, 'EDT': -4, 'CST': -6, 'CDT': -5,
        'MST': -7, 'MDT': -6, 'PST': -8, 'PDT': -7,
        'ET': -5, 'CT': -6, 'MT': -7, 'PT': -8
      };
      const offset = timezoneOffsets[timezone] || -5;
      const localDate = new Date(date.getTime() + (offset * 60 * 60 * 1000));
      return {
        year: localDate.getUTCFullYear(),
        month: localDate.getUTCMonth() + 1,
        day: localDate.getUTCDate(),
        hours: localDate.getUTCHours(),
        minutes: localDate.getUTCMinutes()
      };
    } catch (error) {
      return null;
    }
  };

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/past-events`);

      if (!response.ok) {
        throw new Error(`Failed to fetch past events: ${response.status} ${response.statusText}`);
      }

      const eventData = await response.json();

      // Sort past events by start date DESCENDING (most recent first)
      const sortedEvents = eventData.sort((a, b) => {
        if (!a.start_date && !b.start_date) return 0;
        if (!a.start_date) return 1;
        if (!b.start_date) return -1;
        return new Date(b.start_date) - new Date(a.start_date);
      });

      setEvents(sortedEvents);
      setFilteredEvents(sortedEvents);
    } catch (err) {
      console.error('Error fetching past events:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = () => {
    let filtered = [...events];

    if (searchTerm) {
      filtered = filtered.filter(event => {
        const titleMatch = event.event_title.toLowerCase().includes(searchTerm.toLowerCase());
        const sessionLeaderMatch = event.session_leader_name && event.session_leader_name.toLowerCase().includes(searchTerm.toLowerCase());
        return titleMatch || sessionLeaderMatch;
      });
    }

    if (selectedAudience !== 'All') {
      filtered = filtered.filter(event =>
        event.audience_network && event.audience_network.toLowerCase().includes(selectedAudience.toLowerCase())
      );
    }

    if (selectedLocation !== 'All') {
      filtered = filtered.filter(event =>
        event.location && event.location === selectedLocation
      );
    }

    if (selectedDate) {
      filtered = filtered.filter(event => {
        if (!event.start_date) return false;
        const parsed = parseDateToLocal(event.start_date, event.timezone);
        if (!parsed) return false;
        return parsed.year === selectedDate.getFullYear() &&
               parsed.month === selectedDate.getMonth() + 1 &&
               parsed.day === selectedDate.getDate();
      });
    }

    setFilteredEvents(filtered);
  };

  const getUniqueAudiences = () => {
    const audiences = new Set();
    events.forEach(event => {
      if (event.audience_network) {
        event.audience_network.split(',').forEach(audience => {
          audiences.add(audience.trim());
        });
      }
    });
    return ['All', ...Array.from(audiences).sort()];
  };

  const getUniqueLocations = () => {
    const locations = new Set();
    events.forEach(event => {
      if (event.location) {
        locations.add(event.location);
      }
    });
    return ['All', ...Array.from(locations).sort()];
  };

  const formatEventTitle = (title) => (title || '').replace(/\n+/g, ' ').trim();

  const formatEventDate = (dateString, timezone) => {
    if (!dateString) return 'Date TBA';
    try {
      const date = new Date(dateString);
      const timezoneOffsets = {
        'EST': -5, 'EDT': -4, 'CST': -6, 'CDT': -5,
        'MST': -7, 'MDT': -6, 'PST': -8, 'PDT': -7,
        'ET': -5, 'CT': -6, 'MT': -7, 'PT': -8
      };
      const offset = timezoneOffsets[timezone] || -5;
      const localDate = new Date(date.getTime() + (offset * 60 * 60 * 1000));

      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                          'July', 'August', 'September', 'October', 'November', 'December'];
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      const year = localDate.getUTCFullYear();
      const month = localDate.getUTCMonth();
      const day = localDate.getUTCDate();
      const hours = localDate.getUTCHours();
      const minutes = localDate.getUTCMinutes();
      const dayOfWeek = dayNames[localDate.getUTCDay()];

      const hour12 = hours % 12 || 12;
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const timeStr = `${hour12}:${minutes.toString().padStart(2, '0')} ${ampm}`;

      const tzStr = timezone ? ` ${timezone}` : '';

      return `${dayOfWeek}, ${monthNames[month]} ${day}, ${year}, ${timeStr}${tzStr}`;
    } catch (error) {
      return 'Date TBA';
    }
  };

  const getEventsByMonth = () => {
    const eventsByMonth = {};
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];

    filteredEvents.forEach(event => {
      if (event.start_date) {
        const parsed = parseDateToLocal(event.start_date, event.timezone);
        if (parsed) {
          const monthKey = `${parsed.year}-${(parsed.month - 1).toString().padStart(2, '0')}`;
          const monthName = `${monthNames[parsed.month - 1]} ${parsed.year}`;

          if (!eventsByMonth[monthKey]) {
            eventsByMonth[monthKey] = { name: monthName, events: [] };
          }
          eventsByMonth[monthKey].events.push(event);
        }
      }
    });
    // Return sorted DESC (most recent month first)
    return Object.fromEntries(
      Object.entries(eventsByMonth).sort(([a], [b]) => b.localeCompare(a))
    );
  };

  const formatEventTime = (dateString, timezone) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      const timezoneOffsets = {
        'EST': -5, 'EDT': -4, 'CST': -6, 'CDT': -5,
        'MST': -7, 'MDT': -6, 'PST': -8, 'PDT': -7,
        'ET': -5, 'CT': -6, 'MT': -7, 'PT': -8
      };
      const offset = timezoneOffsets[timezone] || -5;
      const localDate = new Date(date.getTime() + (offset * 60 * 60 * 1000));
      const hours = localDate.getUTCHours();
      const minutes = localDate.getUTCMinutes();
      const hour12 = hours % 12 || 12;
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const tzStr = timezone ? ` ${timezone}` : '';
      return `${hour12}:${minutes.toString().padStart(2, '0')} ${ampm}${tzStr}`;
    } catch (error) {
      return '';
    }
  };

  const getEventDay = (dateString, timezone) => {
    const parsed = parseDateToLocal(dateString, timezone);
    return parsed ? parsed.day : '?';
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-40 pb-12 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 flex items-center justify-center"
      >
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#00A8E1] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-slate-600">Loading past events...</p>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-40 pb-12 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 flex items-center justify-center"
      >
        <div className="text-center max-w-md mx-auto p-4 md:p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ExternalLink className="text-red-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Unable to Load Past Events</h2>
          <p className="text-slate-600 mb-4">{error}</p>
          <button
            onClick={fetchEvents}
            className="bg-[#00A8E1] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0096c7] transition-colors"
            data-testid="past-events-retry-btn"
          >
            Try Again
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="pt-40 pb-12 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100" data-testid="past-events-page">
      <SEO
        title="Past Events"
        description="Explore The Vanguard Network's past leadership events, forums, and exchanges — featuring senior executives, General Counsel, and industry leaders."
      />
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8 mb-16">
        <Breadcrumb />
        <div className="text-center mb-16">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent mb-8 py-2 leading-tight"
          >
            Past Events
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium"
          >
            A look back at the peer-to-peer leadership conversations that have shaped The Vanguard Network. Each session was grounded in the challenges leaders were facing at the time.
          </motion.p>
        </div>

        {/* Search and View Controls */}
        <div className="bg-white rounded-2xl p-4 md:p-8 shadow-xl mb-12 border border-slate-200">
          <div className="flex flex-col gap-6">
            <div className="relative">
              <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search past events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 md:pl-12 pr-4 py-3 md:py-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A8E1] focus:border-transparent text-sm md:text-lg"
                data-testid="past-events-search-input"
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full">
              <div className="flex flex-col md:flex-row flex-wrap gap-3 md:gap-4 items-center justify-center md:justify-start w-full md:w-auto">
                <span className="text-slate-600 font-medium text-sm md:text-base">Filters:</span>

                <div className="relative w-full md:w-auto">
                  <select
                    value={selectedAudience}
                    onChange={(e) => setSelectedAudience(e.target.value)}
                    className="appearance-none bg-white border border-slate-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#00A8E1] focus:border-transparent text-sm font-medium cursor-pointer w-full md:w-auto"
                  >
                    {getUniqueAudiences().map(audience => (
                      <option key={audience} value={audience}>
                        {audience === 'All' ? 'All Audiences' : audience}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 md:right-2 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                </div>

                <div className="relative w-full md:w-auto">
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="appearance-none bg-white border border-slate-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#00A8E1] focus:border-transparent text-sm font-medium cursor-pointer w-full md:w-auto"
                  >
                    {getUniqueLocations().map(location => (
                      <option key={location} value={location}>
                        {location === 'All' ? 'All Locations' : location}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 md:right-2 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                </div>

                {(searchTerm || selectedAudience !== 'All' || selectedLocation !== 'All') && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedAudience('All');
                      setSelectedLocation('All');
                      setSelectedDate(null);
                    }}
                    className="text-[#00A8E1] hover:text-[#0096c7] font-medium text-sm"
                    data-testid="past-events-clear-filters"
                  >
                    Clear all filters
                  </button>
                )}
              </div>

              <div className="flex items-center gap-4">
                <span className="text-slate-600 font-medium">View:</span>
                <div className="flex bg-slate-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2 ${
                      viewMode === 'grid'
                        ? 'bg-white text-[#00A8E1] shadow-sm'
                        : 'text-slate-600 hover:text-slate-800'
                    }`}
                    data-testid="past-events-view-grid"
                  >
                    <Users size={18} />
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode('calendar')}
                    className={`px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2 ${
                      viewMode === 'calendar'
                        ? 'bg-white text-[#00A8E1] shadow-sm'
                        : 'text-slate-600 hover:text-slate-800'
                    }`}
                    data-testid="past-events-view-calendar"
                  >
                    <CalendarDays size={18} />
                    Calendar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <div className="mb-12">
            {Object.entries(getEventsByMonth()).map(([monthKey, monthData]) => (
              <motion.div
                key={monthKey}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white rounded-2xl shadow-lg border border-slate-200 mb-6 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-[#045184] to-[#00A8E1] p-6">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Calendar size={28} />
                    {monthData.name}
                    <span className="text-lg font-normal opacity-90">
                      ({monthData.events.length} events)
                    </span>
                  </h3>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {monthData.events.map((event, index) => (
                      <motion.div
                        key={event.id}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-6 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors duration-200 cursor-pointer"
                        onClick={() => navigate(eventDetailsUrl(event))}
                        data-testid={`past-event-row-${event.id}`}
                      >
                        <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-[#045184] to-[#00A8E1] rounded-xl flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {getEventDay(event.start_date, event.timezone)}
                          </span>
                        </div>

                        <div className="flex-1">
                          <h4 className="font-bold text-slate-900 mb-1">
                            {formatEventTitle(event.event_title)}
                          </h4>
                          <div className="flex flex-col gap-1 text-sm text-slate-600">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Clock size={14} />
                                {formatEventTime(event.start_date, event.timezone)}
                              </span>
                              {event.session_leader_name && (
                                <span className="flex items-center gap-1">
                                  <Users size={14} />
                                  {event.session_leader_name}
                                </span>
                              )}
                              {event.location && (
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  event.location === 'Virtual'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-green-100 text-green-800'
                                }`}>
                                  {event.location}
                                </span>
                              )}
                            </div>
                            {event.audience_network && (
                              <div className="text-xs text-slate-500">
                                <span className="font-medium">Audience:</span> {event.audience_network}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex-shrink-0">
                          <div className="bg-[#00A8E1] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#0096c7] transition-colors">
                            View Details
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Grid View — cards WITHOUT the listing graphic */}
        {viewMode === 'grid' && (
          <>
            {filteredEvents.length > 0 ? (
              <div className="grid gap-4 md:p-8 md:grid-cols-2 xl:grid-cols-3">
                {filteredEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: Math.min(index * 0.05, 0.6) }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-slate-200 flex flex-col"
                    data-testid={`past-event-card-${event.id}`}
                  >
                    {/* Event Image */}
                    <div className="relative w-full overflow-hidden" style={{ height: '280px', minHeight: '280px', maxHeight: '280px' }}>
                      {event.listing_picture ? (
                        <img
                          src={event.listing_picture}
                          alt={formatEventTitle(event.event_title)}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          style={{ objectFit: 'cover' }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#045184] to-[#00A8E1] flex items-center justify-center">
                          <Calendar size={64} className="text-white opacity-50" />
                        </div>
                      )}
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex-grow">
                        <h3 className="text-[17px] font-bold text-slate-900 mb-3 line-clamp-3 group-hover:text-[#045184] transition-colors leading-tight">
                          {formatEventTitle(event.event_title)}
                        </h3>

                        {event.start_date && (
                          <div className="flex items-center gap-2 text-slate-600 mb-4">
                            <Clock size={16} className="text-[#00A8E1]" />
                            <span className="text-sm">{formatEventDate(event.start_date, event.timezone)}</span>
                          </div>
                        )}

                        <div className="flex flex-col gap-3 mb-6">
                          {event.audience_network && (
                            <div className="flex items-start gap-2 text-slate-600">
                              <Users size={16} className="text-[#00A8E1] flex-shrink-0 mt-0.5" />
                              <span className="text-sm"><span className="font-medium">Audience:</span> {event.audience_network}</span>
                            </div>
                          )}

                          {event.location && (
                            <div>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                event.location === 'Virtual'
                                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                  : 'bg-green-100 text-green-800 border border-green-200'
                              }`}>
                                📍 {event.location}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-auto pt-4">
                        <a
                          href={eventDetailsUrl(event)}
                          className="w-full bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white py-3 px-6 rounded-xl font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                          data-testid={`past-event-details-link-${event.id}`}
                        >
                          View Details
                          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center py-8 md:py-16"
              >
                <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search size={48} className="text-slate-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {searchTerm ? 'No past events found' : 'No Past Events Available'}
                </h3>
                <p className="text-slate-600 mb-6 max-w-md mx-auto">
                  {searchTerm
                    ? `No past events match your search "${searchTerm}". Try different keywords.`
                    : 'Past events will appear here once they take place.'
                  }
                </p>
                {searchTerm && (
                  <button
                    onClick={() => { setSearchTerm(''); setSelectedDate(null); }}
                    className="inline-flex items-center gap-2 bg-[#00A8E1] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0096c7] transition-colors"
                  >
                    <Filter size={20} />
                    Clear Search
                  </button>
                )}
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8 text-center"
      >
        <div className="md:mx-8">
          <div className="bg-gradient-to-r from-[#045184] to-[#00A8E1] rounded-3xl p-16 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">Want to Attend Our Next Event?</h2>
              <p className="text-base md:text-xl mb-6 md:mb-8 max-w-3xl mx-auto">
                Explore what's coming up next on the Vanguard Network calendar.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
                <motion.a
                  href="/upcoming-events"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-[#045184] px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-sm md:text-lg hover:bg-slate-100 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
                  data-testid="past-events-view-upcoming-cta"
                >
                  <Calendar size={18} />
                  <span>See Upcoming Events</span>
                </motion.a>
                <motion.a
                  href="/application"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-sm md:text-lg hover:bg-white hover:text-[#045184] transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <Mail size={18} />
                  <span>Contact Us to Learn More</span>
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PastEventsPage;
