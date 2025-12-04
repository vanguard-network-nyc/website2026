import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';
import { Search, Play, User } from 'lucide-react';

const VideosPage = () => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  // Scroll to top when component mounts or page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    if (videos.length > 0) {
      filterVideos();
      setCurrentPage(1); // Reset to first page when filtering
    }
  }, [videos, searchTerm]);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const backendUrl = import.meta.env?.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/videos`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch videos: ${response.status} ${response.statusText}`);
      }
      
      const videoData = await response.json();
      // Videos are already sorted by backend (softr_order descending)
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
    let filtered = [...videos];

    if (searchTerm) {
      filtered = filtered.filter(video => 
        video.vimeo_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.video_description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.featured_speakers?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredVideos(filtered);
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
        <Breadcrumb />
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent mb-6 py-2 leading-tight"
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
              placeholder="Search videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </motion.div>

        {/* Videos Grid */}
        {filteredVideos.length > 0 ? (
          <>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {(() => {
                // Calculate pagination
                const indexOfLastItem = currentPage * itemsPerPage;
                const indexOfFirstItem = indexOfLastItem - itemsPerPage;
                const currentItems = filteredVideos.slice(indexOfFirstItem, indexOfLastItem);
                
                return currentItems.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-slate-200 flex flex-col"
                  >
                    {/* Video Thumbnail */}
                    <div className="relative h-[338px] overflow-hidden bg-gray-100">
                      {video.headshot ? (
                        <img
                          src={video.headshot}
                          alt={video.vimeo_name || video.video_description}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#045184] to-[#00A8E1] flex items-center justify-center">
                          <Play size={64} className="text-white opacity-50" />
                        </div>
                      )}
                    </div>
                    
                    {/* Video Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-[17px] font-bold text-slate-900 mb-4 group-hover:text-[#045184] transition-colors line-clamp-4">
                        {video.vimeo_name || video.video_description}
                      </h3>
                      
                      {video.featured_speakers && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-slate-600 mb-1">
                            <User size={14} className="inline mr-1" />
                            Featured Speaker(s)
                          </p>
                          <p className="text-sm font-extrabold text-black">
                            {video.featured_speakers}
                          </p>
                        </div>
                      )}
                      
                      <Link
                        to={`/video/${video.id}`}
                        className="w-full bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 mt-auto hover:shadow-lg"
                      >
                        <Play size={16} />
                        Click to Watch
                      </Link>
                    </div>
                  </motion.div>
                ));
              })()}
            </div>

            {/* Pagination */}
            {filteredVideos.length > itemsPerPage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-12 flex justify-center items-center gap-2"
              >
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Previous
                </button>
                
                {(() => {
                  const totalPages = Math.ceil(filteredVideos.length / itemsPerPage);
                  const pages = [];
                  
                  // Show first page
                  if (currentPage > 3) {
                    pages.push(
                      <button
                        key={1}
                        onClick={() => setCurrentPage(1)}
                        className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all"
                      >
                        1
                      </button>
                    );
                    if (currentPage > 4) {
                      pages.push(<span key="ellipsis1" className="px-2 text-slate-400">...</span>);
                    }
                  }
                  
                  // Show pages around current
                  for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
                    pages.push(
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i)}
                        className={`px-4 py-2 rounded-lg transition-all ${
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
                      pages.push(<span key="ellipsis2" className="px-2 text-slate-400">...</span>);
                    }
                    pages.push(
                      <button
                        key={totalPages}
                        onClick={() => setCurrentPage(totalPages)}
                        className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all"
                      >
                        {totalPages}
                      </button>
                    );
                  }
                  
                  return pages;
                })()}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredVideos.length / itemsPerPage)))}
                  disabled={currentPage === Math.ceil(filteredVideos.length / itemsPerPage)}
                  className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Next
                </button>
              </motion.div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No videos found</h3>
            <p className="text-slate-500">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default VideosPage;