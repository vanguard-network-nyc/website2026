import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';
import { Headphones, User, Search, Filter, Play, ArrowRight, ExternalLink, Users, Mic, Calendar } from 'lucide-react';

const PodcastsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [podcasts, setPodcasts] = useState([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpeaker, setSelectedSpeaker] = useState('All');
  const [currentPage, setCurrentPage] = useState(() => {
    const pageParam = searchParams.get('page');
    return pageParam ? parseInt(pageParam, 10) : 1;
  });
  const itemsPerPage = 30;

  // Sync state with URL params on mount and when URL changes externally (e.g., back button)
  useEffect(() => {
    const pageParam = searchParams.get('page');
    const pageFromUrl = pageParam ? parseInt(pageParam, 10) : 1;
    if (pageFromUrl !== currentPage) {
      setCurrentPage(pageFromUrl);
    }
  }, [searchParams]);

  // Scroll to top when component mounts or page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Update URL when page changes from user interaction
  useEffect(() => {
    const pageParam = searchParams.get('page');
    const pageFromUrl = pageParam ? parseInt(pageParam, 10) : 1;
    if (currentPage !== pageFromUrl) {
      setSearchParams({ page: currentPage.toString() });
    }
  }, [currentPage]);

  useEffect(() => {
    fetchPodcasts();
  }, []);

  useEffect(() => {
    if (podcasts.length > 0) {
      filterPodcasts();
      setCurrentPage(1); // Reset to first page when filtering
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

    // Filter by selected speaker
    if (selectedSpeaker && selectedSpeaker !== 'All') {
      filtered = filtered.filter(podcast => podcast.featured_speaker === selectedSpeaker);
    }

    console.log('Filtered podcasts count:', filtered.length); // Debug log
    setFilteredPodcasts(filtered);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return '';
    }
  };

  const getUniqueSpeakers = () => {
    const speakers = ['All'];
    podcasts.forEach(podcast => {
      if (podcast.featured_speaker && !speakers.includes(podcast.featured_speaker)) {
        speakers.push(podcast.featured_speaker);
      }
    });
    return speakers;
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-40 pb-12 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center"
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
        className="pt-40 pb-12 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center"
      >
        <div className="text-center max-w-md mx-auto p-4 md:p-8">
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
      className="pt-40 pb-12 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
    >
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

        {/* Search Bar */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12 max-w-2xl mx-auto"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search podcasts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </motion.div>

        {/* Podcasts Grid */}
        {filteredPodcasts.length > 0 ? (
          <>
            <div className="grid gap-4 md:p-8 md:grid-cols-2 xl:grid-cols-3">
              {(() => {
                // Calculate pagination
                const indexOfLastItem = currentPage * itemsPerPage;
                const indexOfFirstItem = indexOfLastItem - itemsPerPage;
                const currentItems = filteredPodcasts.slice(indexOfFirstItem, indexOfLastItem);
                
                return currentItems.map((podcast, index) => (
                  <motion.div
                    key={podcast.id}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-slate-200 flex flex-col"
                  >
                    {/* Podcast Thumbnail */}
                    <div className="relative h-[338px] overflow-hidden bg-gray-100">
                      {podcast.thumbnail ? (
                        <img
                          src={podcast.thumbnail}
                          alt={podcast.title}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#045184] to-[#00A8E1] flex items-center justify-center">
                          <Headphones size={64} className="text-white opacity-50" />
                        </div>
                      )}
                    </div>
                    
                    {/* Podcast Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-[17px] font-bold text-slate-900 mb-4 group-hover:text-[#045184] transition-colors line-clamp-4">
                        {podcast.title}
                      </h3>
                      
                      {podcast.featured_speaker && (
                        <div className="mb-2">
                          <p className="text-sm font-medium text-slate-600 mb-1">
                            <User size={14} className="inline mr-1" />
                            Featured Speaker(s)
                          </p>
                          <p className="text-sm font-extrabold text-black">
                            {podcast.featured_speaker}
                          </p>
                        </div>
                      )}
                      
                      {/* Date */}
                      {podcast.release_date && (
                        <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
                          <Calendar size={16} />
                          <span>{formatDate(podcast.release_date)}</span>
                        </div>
                      )}
                      
                      <Link
                        to={`/podcast/${podcast.id}`}
                        className="w-full bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 mt-auto hover:shadow-lg"
                      >
                        <Headphones size={16} />
                        Click to Listen
                      </Link>
                    </div>
                  </motion.div>
                ));
              })()}
            </div>

            {/* Pagination */}
            {filteredPodcasts.length > itemsPerPage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-12 flex justify-center items-center gap-1 md:gap-2 flex-wrap"
              >
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-2 md:px-4 py-1.5 md:py-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-xs md:text-base"
                >
                  Prev
                </button>
                
                {(() => {
                  const totalPages = Math.ceil(filteredPodcasts.length / itemsPerPage);
                  const pages = [];
                  
                  // Show first page
                  if (currentPage > 3) {
                    pages.push(
                      <button
                        key={1}
                        onClick={() => setCurrentPage(1)}
                        className="px-2 md:px-4 py-1.5 md:py-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all text-xs md:text-base"
                      >
                        1
                      </button>
                    );
                    if (currentPage > 4) {
                      pages.push(<span key="ellipsis1" className="px-1 md:px-2 text-slate-400 text-xs md:text-base">...</span>);
                    }
                  }
                  
                  // Show pages around current
                  for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
                    pages.push(
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i)}
                        className={`px-2 md:px-4 py-1.5 md:py-2 rounded-lg transition-all text-xs md:text-base ${
                          currentPage === i
                            ? 'bg-[#045184] text-white'
                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {i}
                      </button>
                    );
                  }
                  
                  // Show last page
                  if (currentPage < totalPages - 2) {
                    if (currentPage < totalPages - 3) {
                      pages.push(<span key="ellipsis2" className="px-1 md:px-2 text-slate-400 text-xs md:text-base">...</span>);
                    }
                    pages.push(
                      <button
                        key={totalPages}
                        onClick={() => setCurrentPage(totalPages)}
                        className="px-2 md:px-4 py-1.5 md:py-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all text-xs md:text-base"
                      >
                        {totalPages}
                      </button>
                    );
                  }
                  
                  return pages;
                })()}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredPodcasts.length / itemsPerPage)))}
                  disabled={currentPage === Math.ceil(filteredPodcasts.length / itemsPerPage)}
                  className="px-2 md:px-4 py-1.5 md:py-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-xs md:text-base"
                >
                  Next
                </button>
              </motion.div>
            )}
          </>
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
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8 text-center"
      >
        <div className="bg-gradient-to-r from-[#045184] to-[#00A8E1] rounded-3xl p-6 md:p-16 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">Want to Be Featured?</h2>
            <p className="text-base md:text-xl mb-6 md:mb-8 max-w-3xl mx-auto">
              Share your leadership insights and expertise with our community. Join our podcast as a guest speaker.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#045184] px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-sm md:text-lg hover:bg-slate-100 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Mic size={18} />
                <span>Become a Guest</span>
              </motion.a>
              <motion.a
                href="/upcoming-events"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-sm md:text-lg hover:bg-white hover:text-[#045184] transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Users size={18} />
                <span>View Events</span>
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PodcastsPage;