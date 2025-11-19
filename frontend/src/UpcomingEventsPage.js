import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, ExternalLink, Users, MapPin, Search, Filter, CalendarDays, ChevronDown } from 'lucide-react';

const UpcomingEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAudience, setSelectedAudience] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'calendar'
  const [selectedDate, setSelectedDate] = useState(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      filterEvents();
    }
  }, [events, searchTerm, selectedAudience, selectedLocation, selectedDate]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const backendUrl = import.meta.env?.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL;
      console.log('Backend URL:', backendUrl); // Debug log
      const response = await fetch(`${backendUrl}/api/events`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.status} ${response.statusText}`);
      }
      
      const eventData = await response.json();
      console.log('Fetched events:', eventData.length); // Debug log
      
      // Sort events by start date
      const sortedEvents = eventData.sort((a, b) => {
        if (!a.start_date && !b.start_date) return 0;
        if (!a.start_date) return 1;
        if (!b.start_date) return -1;
        return new Date(a.start_date) - new Date(b.start_date);
      });
      
      console.log('Setting events and filtered events'); // Debug log
      setEvents(sortedEvents);
      setFilteredEvents(sortedEvents); // Initialize filtered events
      console.log('Events set, turning off loading'); // Debug log
    } catch (err) {
      console.error('Error fetching events:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = () => {
    console.log('Filtering events, total events:', events.length); // Debug log
    let filtered = [...events]; // Create a copy of the events array

    // Filter by search term (title and session leader only)
    if (searchTerm) {
      console.log('Filtering by search term:', searchTerm); // Debug log
      filtered = filtered.filter(event => {
        const titleMatch = event.event_title.toLowerCase().includes(searchTerm.toLowerCase());
        const sessionLeaderMatch = event.session_leader_name && event.session_leader_name.toLowerCase().includes(searchTerm.toLowerCase());
        return titleMatch || sessionLeaderMatch;
      });
    }

    // Filter by audience
    if (selectedAudience !== 'All') {
      console.log('Filtering by audience:', selectedAudience); // Debug log
      filtered = filtered.filter(event => 
        event.audience_network && event.audience_network.toLowerCase().includes(selectedAudience.toLowerCase())
      );
    }

    // Filter by location
    if (selectedLocation !== 'All') {
      console.log('Filtering by location:', selectedLocation); // Debug log
      filtered = filtered.filter(event => 
        event.location && event.location === selectedLocation
      );
    }

    // Filter by selected date from calendar
    if (selectedDate) {
      console.log('Filtering by selected date:', selectedDate); // Debug log
      filtered = filtered.filter(event => {
        if (!event.start_date) return false;
        const eventDate = new Date(event.start_date).toDateString();
        return eventDate === selectedDate.toDateString();
      });
    }

    console.log('Filtered events count:', filtered.length); // Debug log
    setFilteredEvents(filtered);
  };

  // Get unique audiences for dropdown
  const getUniqueAudiences = () => {
    const audiences = new Set();
    events.forEach(event => {
      if (event.audience_network) {
        // Split comma-separated audiences and add each one
        event.audience_network.split(',').forEach(audience => {
          audiences.add(audience.trim());
        });
      }
    });
    return ['All', ...Array.from(audiences).sort()];
  };

  // Get unique locations for dropdown
  const getUniqueLocations = () => {
    const locations = new Set();
    events.forEach(event => {
      if (event.location) {
        locations.add(event.location);
      }
    });
    return ['All', ...Array.from(locations).sort()];
  };

  const formatEventTitle = (title) => {
    return title.replace(/\n+/g, ' ').trim();
  };

  const formatEventDate = (dateString) => {
    if (!dateString) return 'Date TBA';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Date TBA';
    }
  };

  const formatEventTime = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return '';
    }
  };

  // Get unique months for calendar view
  const getEventsByMonth = () => {
    const eventsByMonth = {};
    filteredEvents.forEach(event => {
      if (event.start_date) {
        const date = new Date(event.start_date);
        const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
        const monthName = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
        
        if (!eventsByMonth[monthKey]) {
          eventsByMonth[monthKey] = {
            name: monthName,
            events: []
          };
        }
        eventsByMonth[monthKey].events.push(event);
      }
    });
    return eventsByMonth;
  };

  if (loading) {
    console.log('Component is in loading state'); // Debug log
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-40 pb-12 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 flex items-center justify-center"
      >
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#00A8E1] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-slate-600">Loading upcoming events...</p>
          <p className="text-sm text-slate-500 mt-2">Events loaded: {events.length}</p>
          <p className="text-sm text-slate-500">Filtered events: {filteredEvents.length}</p>
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
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ExternalLink className="text-red-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Unable to Load Events</h2>
          <p className="text-slate-600 mb-4">{error}</p>
          <button
            onClick={fetchEvents}
            className="bg-[#00A8E1] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0096c7] transition-colors"
          >
            Try Again
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-12 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100"
    >
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent mb-8 py-2 leading-tight"
          >
            Events
          </motion.h1>
          
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium"
          >
            Join our leadership community at exclusive events designed to accelerate your growth and expand your network.
          </motion.p>
        </div>

        {/* Search and View Controls */}
        <div className="bg-white rounded-2xl p-8 shadow-xl mb-12 border border-slate-200">
          <div className="flex flex-col gap-6">
            {/* First Row: Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search events by title or session leader..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A8E1] focus:border-transparent text-lg"
              />
            </div>
            
            {/* Second Row: Filters and View Toggle */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Filter Dropdowns */}
              <div className="flex flex-wrap gap-4 items-center">
                <span className="text-slate-600 font-medium">Filters:</span>
                
                {/* Audience Filter */}
                <div className="relative">
                  <select
                    value={selectedAudience}
                    onChange={(e) => setSelectedAudience(e.target.value)}
                    className="appearance-none bg-white border border-slate-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#00A8E1] focus:border-transparent text-sm font-medium cursor-pointer"
                  >
                    {getUniqueAudiences().map(audience => (
                      <option key={audience} value={audience}>
                        {audience === 'All' ? 'All Audiences' : audience}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                </div>
                
                {/* Location Filter */}
                <div className="relative">
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="appearance-none bg-white border border-slate-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#00A8E1] focus:border-transparent text-sm font-medium cursor-pointer"
                  >
                    {getUniqueLocations().map(location => (
                      <option key={location} value={location}>
                        {location === 'All' ? 'All Locations' : location}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                </div>
                
                {/* Clear Filters Button */}
                {(searchTerm || selectedAudience !== 'All' || selectedLocation !== 'All') && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedAudience('All');
                      setSelectedLocation('All');
                      setSelectedDate(null);
                    }}
                    className="text-[#00A8E1] hover:text-[#0096c7] font-medium text-sm"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
              
              {/* View Mode Toggle */}
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
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-6 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors duration-200 cursor-pointer"
                        onClick={() => window.open(event.registration_url, '_blank')}
                      >
                        <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-[#045184] to-[#00A8E1] rounded-xl flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {event.start_date ? new Date(event.start_date).getDate() : '?'}
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
                                {formatEventTime(event.start_date)}
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
                            More Details
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

        {/* Grid View */}
        {viewMode === 'grid' && (
          <>
            {filteredEvents.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-slate-200 h-[600px] flex flex-col"
                  >
                    {/* Event Image */}
                    <div className="relative h-64 overflow-hidden">
                      {event.listing_picture ? (
                        <img
                          src={event.listing_picture}
                          alt={formatEventTitle(event.event_title)}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#045184] to-[#00A8E1] flex items-center justify-center">
                          <Calendar size={64} className="text-white opacity-50" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                      {event.start_date && (
                        <div className="absolute bottom-4 left-4">
                          <div className="bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm font-medium">
                            {new Date(event.start_date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Event Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      {/* Content Area - grows to fill available space */}
                      <div className="flex-grow">
                        <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-[#045184] transition-colors">
                          {formatEventTitle(event.event_title)}
                        </h3>
                        
                        {event.start_date && (
                          <div className="flex items-center gap-2 text-slate-600 mb-4">
                            <Clock size={16} className="text-[#00A8E1]" />
                            <span className="text-sm">{formatEventDate(event.start_date)}</span>
                          </div>
                        )}
                        
                        {/* Session Leader, Audience, and Location Row */}
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                          <div className="flex flex-col gap-2">
                            {event.session_leader_name ? (
                              <div className="flex items-center gap-2 text-slate-600">
                                <Users size={16} className="text-[#00A8E1]" />
                                <span className="text-sm">Session Leader: {event.session_leader_name}</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 text-slate-600">
                                <Users size={16} className="text-[#00A8E1]" />
                                <span className="text-sm">Leadership Community Event</span>
                              </div>
                            )}
                            
                            {event.audience_network && (
                              <div className="text-sm text-slate-500 ml-6">
                                <span className="font-medium">Audience:</span> {event.audience_network}
                              </div>
                            )}
                          </div>
                          
                          {event.location && (
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              event.location === 'Virtual' 
                                ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                                : 'bg-green-100 text-green-800 border border-green-200'
                            }`}>
                              📍 {event.location}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Button Area - always at bottom */}
                      <div className="mt-auto pt-4">
                        <a
                          href={event.registration_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white py-3 px-6 rounded-xl font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                        >
                          More Details
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
                className="text-center py-16"
              >
                <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search size={48} className="text-slate-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {searchTerm ? 'No events found' : 'No Events Available'}
                </h3>
                <p className="text-slate-600 mb-6 max-w-md mx-auto">
                  {searchTerm 
                    ? `No events match your search "${searchTerm}". Try different keywords.`
                    : 'We\'re currently planning exciting new events. Check back soon for updates!'
                  }
                </p>
                {searchTerm ? (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedDate(null);
                    }}
                    className="inline-flex items-center gap-2 bg-[#00A8E1] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0096c7] transition-colors"
                  >
                    <Filter size={20} />
                    Clear Search
                  </button>
                ) : (
                  <a
                    href="https://members.thevanguardnetwork.com/events"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#00A8E1] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0096c7] transition-colors"
                  >
                    <ExternalLink size={20} />
                    Visit Events Portal
                  </a>
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
        transition={{ delay: 0.8, duration: 0.8 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <div className="bg-gradient-to-r from-[#045184] to-[#00A8E1] rounded-3xl p-16 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6">Ready to Join Our Community?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Connect with industry leaders, gain exclusive insights, and accelerate your leadership journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://members.thevanguardnetwork.com/events"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#045184] px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-100 transition-all duration-300 flex items-center gap-2"
              >
                <ExternalLink size={20} />
                View All Events
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#045184] transition-all duration-300 flex items-center gap-2"
              >
                <Users size={20} />
                Contact Us
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UpcomingEventsPage;