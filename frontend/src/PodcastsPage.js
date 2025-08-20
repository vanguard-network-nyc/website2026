import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Headphones, User, Search, Filter, Play, ArrowRight, ExternalLink, Users, Mic } from 'lucide-react';

const PodcastsPage = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpeaker, setSelectedSpeaker] = useState('All');

  useEffect(() => {
    fetchPodcasts();
  }, []);

  useEffect(() => {
    if (podcasts.length > 0) {
      filterPodcasts();
    }
  }, [podcasts, searchTerm, selectedSpeaker]);

  const fetchPodcasts = async () => {
    try {
      setLoading(true);
      const backendUrl = import.meta.env?.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL;
      console.log('Backend URL:', backendUrl); // Debug log
      const response = await fetch(`${backendUrl}/api/podcasts`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch podcasts: ${response.status} ${response.statusText}`);
      }
      
      const podcastData = await response.json();
      console.log('Fetched podcasts:', podcastData.length); // Debug log
      
      setPodcasts(podcastData);
      setFilteredPodcasts(podcastData);
    } catch (err) {
      console.error('Error fetching podcasts:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filterPodcasts = () => {
    console.log('Filtering podcasts, total podcasts:', podcasts.length); // Debug log
    let filtered = [...podcasts];

    // Filter by search term (title, featured speaker)
    if (searchTerm) {
      console.log('Filtering by search term:', searchTerm); // Debug log
      filtered = filtered.filter(podcast => {
        const titleMatch = podcast.title.toLowerCase().includes(searchTerm.toLowerCase());
        const speakerMatch = podcast.featured_speaker && podcast.featured_speaker.toLowerCase().includes(searchTerm.toLowerCase());
        return titleMatch || speakerMatch;
      });
    }

    // Filter by featured speaker
    if (selectedSpeaker !== 'All') {
      console.log('Filtering by speaker:', selectedSpeaker); // Debug log
      filtered = filtered.filter(podcast => 
        podcast.featured_speaker && podcast.featured_speaker.toLowerCase().includes(selectedSpeaker.toLowerCase())
      );
    }

    console.log('Filtered podcasts count:', filtered.length); // Debug log
    setFilteredPodcasts(filtered);
  };

  // Get unique speakers for dropdown
  const getUniqueSpeakers = () => {
    const speakers = new Set();
    podcasts.forEach(podcast => {
      if (podcast.featured_speaker) {
        speakers.add(podcast.featured_speaker);
      }
    });
    return ['All', ...Array.from(speakers).sort()];
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-24 pb-12 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 flex items-center justify-center"
      >
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#00A8E1] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-slate-600">Loading podcasts...</p>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-24 pb-12 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 flex items-center justify-center"
      >
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ExternalLink className="text-red-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Unable to Load Podcasts</h2>
          <p className="text-slate-600 mb-4">{error}</p>
          <button
            onClick={fetchPodcasts}
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
      className="pt-24 pb-12 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100"
    >
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-7xl font-bold bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent mb-8"
          >
            Podcasts
          </motion.h1>
          
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium"
          >
            Listen to thought-provoking conversations with industry leaders and experts from our community.
          </motion.p>
        </div>

        {/* Podcast Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { number: podcasts.length.toString(), label: "Episodes Available", icon: <Headphones size={32} className="text-[#00A8E1]" /> },
            { number: getUniqueSpeakers().length - 1, label: "Featured Speakers", icon: <Mic size={32} className="text-purple-500" /> },
            { number: "Leadership", label: "Focus Area", icon: <Users size={32} className="text-green-500" /> }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200"
            >
              <div className="flex justify-center mb-4">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold text-slate-900 mb-2">{stat.number}</div>
              <div className="text-slate-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-white rounded-2xl p-8 shadow-xl mb-12 border border-slate-200">
          <div className="flex flex-col gap-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search podcasts by title or speaker..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A8E1] focus:border-transparent text-lg"
              />
            </div>
            
            {/* Filter Dropdown */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-4 items-center">
                <span className="text-slate-600 font-medium">Filter by Speaker:</span>
                
                <div className="relative">
                  <select
                    value={selectedSpeaker}
                    onChange={(e) => setSelectedSpeaker(e.target.value)}
                    className="appearance-none bg-white border border-slate-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#00A8E1] focus:border-transparent text-sm font-medium cursor-pointer"
                  >
                    {getUniqueSpeakers().map(speaker => (
                      <option key={speaker} value={speaker}>
                        {speaker === 'All' ? 'All Speakers' : speaker}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="text-slate-600 font-medium">
                Showing {filteredPodcasts.length} of {podcasts.length} podcasts
                {(searchTerm || selectedSpeaker !== 'All') && (
                  <span className="ml-2 text-sm text-slate-500">
                    with active filters
                  </span>
                )}
              </div>
            </div>
            
            {(searchTerm || selectedSpeaker !== 'All') && (
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedSpeaker('All');
                  }}
                  className="text-[#00A8E1] hover:text-[#0096c7] font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Podcasts Grid */}
        {filteredPodcasts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPodcasts.map((podcast, index) => (
              <motion.div
                key={podcast.id}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-slate-200 h-[500px] flex flex-col"
              >
                {/* Podcast Thumbnail */}
                <div className="relative h-64 overflow-hidden">
                  {podcast.thumbnail ? (
                    <img
                      src={podcast.thumbnail}
                      alt={podcast.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#045184] to-[#00A8E1] flex items-center justify-center">
                      <Headphones size={64} className="text-white opacity-50" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                      <Play size={24} className="text-[#045184] ml-1" />
                    </div>
                  </div>
                </div>
                
                {/* Podcast Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 line-clamp-2 group-hover:text-[#045184] transition-colors flex-1">
                    {podcast.title}
                  </h3>
                  
                  {podcast.featured_speaker && (
                    <div className="flex items-center gap-2 text-slate-600 mb-6">
                      <User size={16} className="text-[#00A8E1]" />
                      <span className="text-sm font-medium">{podcast.featured_speaker}</span>
                    </div>
                  )}
                  
                  <button 
                    className="w-full bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white py-3 px-6 rounded-xl font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group mt-auto"
                  >
                    <Play size={20} />
                    Listen Now
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
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
              {searchTerm ? 'No podcasts found' : 'No Podcasts Available'}
            </h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              {searchTerm 
                ? `No podcasts match your search "${searchTerm}". Try different keywords.`
                : 'We\'re currently building our podcast library. Check back soon for new episodes!'
              }
            </p>
            {searchTerm ? (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSpeaker('All');
                }}
                className="inline-flex items-center gap-2 bg-[#00A8E1] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0096c7] transition-colors"
              >
                <Filter size={20} />
                Clear Search
              </button>
            ) : null}
          </motion.div>
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
            <h2 className="text-4xl font-bold mb-6">Want to Be Featured?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Share your leadership insights and expertise with our community. Join our podcast as a guest speaker.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#045184] px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-100 transition-all duration-300 flex items-center gap-2"
              >
                <Mic size={20} />
                Become a Guest
              </motion.a>
              <motion.a
                href="/upcoming-events"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#045184] transition-all duration-300 flex items-center gap-2"
              >
                <Users size={20} />
                View Events
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PodcastsPage;