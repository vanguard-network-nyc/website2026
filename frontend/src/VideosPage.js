import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Filter, Play, User, Tag, Calendar, ChevronDown } from 'lucide-react';

const VideosPage = () => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    filterVideos();
  }, [videos, searchTerm, selectedCategory]);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const backendUrl = import.meta.env?.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/videos`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch videos: ${response.status} ${response.statusText}`);
      }
      
      const videoData = await response.json();
      setVideos(videoData);
      setFilteredVideos(videoData);
    } catch (err) {
      console.error('Error fetching videos:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filterVideos = () => {
    let filtered = videos;

    if (searchTerm) {
      filtered = filtered.filter(video => 
        video.video_description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.featured_speakers?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(video => 
        video.category === selectedCategory
      );
    }

    setFilteredVideos(filtered);
  };

  const getUniqueCategories = () => {
    const categories = videos.map(video => video.category).filter(Boolean);
    return ['All', ...new Set(categories)];
  };

  if (loading) return (
    <div className="pt-40 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-xl text-slate-600">Loading videos...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="pt-40 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Unable to Load Videos</h2>
        <p className="text-slate-600 mb-6">{error}</p>
        <button 
          onClick={fetchVideos}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-12 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-slate-900 mb-6"
          >
            Video Library
          </motion.h1>
          
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            Explore our collection of leadership insights, expert interviews, and strategic discussions from industry thought leaders.
          </motion.p>
        </div>

        {/* Search and Filters */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12 flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
        >
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-white border border-slate-200 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {getUniqueCategories().map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
          </div>
        </motion.div>

        {/* Videos Grid */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredVideos.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-semibold text-slate-600 mb-2">No videos found</h3>
              <p className="text-slate-500">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            filteredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                {/* Video Thumbnail */}
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  {video.headshot ? (
                    <img 
                      src={video.headshot} 
                      alt={video.video_description}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                      <Play size={48} className="text-blue-600" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white bg-opacity-90 rounded-full p-3">
                      <Play size={24} className="text-blue-600" />
                    </div>
                  </div>
                </div>

                {/* Video Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">
                    {video.video_description}
                  </h3>
                  
                  {video.featured_speakers && (
                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                      <User size={16} />
                      <span className="font-medium">Featured Speaker</span>
                    </div>
                  )}

                  {video.featured_speakers && (
                    <p className="text-sm text-slate-700 mb-4 font-medium">
                      {video.featured_speakers}
                    </p>
                  )}

                  {video.category && (
                    <div className="flex items-center gap-2 mb-4">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                        {video.category}
                      </span>
                    </div>
                  )}

                  <Link
                    to={`/video/${video.id}`}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                  >
                    <Play size={16} />
                    Click to watch
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default VideosPage;