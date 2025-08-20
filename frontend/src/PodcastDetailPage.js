import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, Headphones, Clock, Share2, ExternalLink, Play } from 'lucide-react';

const PodcastDetailPage = () => {
  const { id } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [similarPodcasts, setSimilarPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPodcast();
  }, [id]);

  useEffect(() => {
    if (podcast) {
      fetchSimilarPodcasts();
    }
  }, [podcast]);

  const fetchPodcast = async () => {
    try {
      setLoading(true);
      const backendUrl = import.meta.env?.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/podcasts`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch podcasts: ${response.status} ${response.statusText}`);
      }
      
      const podcastData = await response.json();
      const foundPodcast = podcastData.find(p => p.id === id);
      
      if (!foundPodcast) {
        throw new Error('Podcast not found');
      }
      
      setPodcast(foundPodcast);
    } catch (err) {
      console.error('Error fetching podcast:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Extract iframe from soundcloud embed code
  const getSoundCloudIframe = (embedCode) => {
    if (!embedCode) return null;
    
    // If it's already an iframe, use it directly
    if (embedCode.includes('<iframe')) {
      return embedCode;
    }
    
    // If it's just a URL, create an iframe
    if (embedCode.includes('soundcloud.com')) {
      return `<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="${embedCode}"></iframe>`;
    }
    
    return embedCode;
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
          <p className="text-xl text-slate-600">Loading podcast...</p>
        </div>
      </motion.div>
    );
  }

  if (error || !podcast) {
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
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Podcast Not Found</h2>
          <p className="text-slate-600 mb-6">{error || 'The requested podcast could not be found.'}</p>
          <Link
            to="/podcasts"
            className="inline-flex items-center gap-2 bg-[#00A8E1] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0096c7] transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Podcasts
          </Link>
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
      {/* Back Navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link
          to="/podcasts"
          className="inline-flex items-center gap-2 text-[#00A8E1] hover:text-[#0096c7] font-medium transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Podcasts
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header Section with Thumbnail and Title */}
          <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Thumbnail Section */}
              <div className="relative h-80 lg:h-96 overflow-hidden">
                {podcast.thumbnail ? (
                  <img
                    src={podcast.thumbnail}
                    alt={podcast.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#045184] to-[#00A8E1] flex items-center justify-center">
                    <Headphones size={96} className="text-white opacity-50" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center cursor-pointer shadow-2xl"
                  >
                    <Play size={32} className="text-[#045184] ml-1" />
                  </motion.div>
                </div>
              </div>
              
              {/* Info Section */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <motion.h1 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 leading-tight"
                >
                  {podcast.title}
                </motion.h1>
                
                {podcast.featured_speaker && (
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-3 mb-6"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-[#045184] to-[#00A8E1] rounded-full flex items-center justify-center">
                      <User size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium">Featured Speaker</p>
                      <p className="text-lg font-bold text-slate-900">{podcast.featured_speaker}</p>
                    </div>
                  </motion.div>
                )}
                
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex gap-4"
                >
                  <button className="flex items-center gap-2 bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300">
                    <Share2 size={20} />
                    Share
                  </button>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 lg:p-12">
            {/* Description */}
            {podcast.description && (
              <motion.div 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#045184] to-[#00A8E1] rounded-lg flex items-center justify-center">
                    <Headphones size={20} className="text-white" />
                  </div>
                  About This Episode
                </h2>
                <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed">
                  {podcast.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            )}

            {/* SoundCloud Player */}
            {podcast.soundcloud_embed && (
              <motion.div 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#045184] to-[#00A8E1] rounded-lg flex items-center justify-center">
                    <Play size={20} className="text-white" />
                  </div>
                  Listen Now
                </h2>
                <div className="bg-slate-50 rounded-2xl p-6">
                  <div 
                    className="w-full"
                    dangerouslySetInnerHTML={{ 
                      __html: getSoundCloudIframe(podcast.soundcloud_embed) 
                    }}
                  />
                </div>
              </motion.div>
            )}

            {/* Related Content */}
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-r from-slate-50 to-blue-50/30 rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-4">Want More Leadership Insights?</h3>
              <p className="text-slate-600 mb-6">
                Explore our other podcasts, upcoming events, and leadership programs designed to accelerate your growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/podcasts"
                  className="inline-flex items-center gap-2 bg-[#00A8E1] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#0096c7] transition-colors"
                >
                  <Headphones size={20} />
                  More Podcasts
                </Link>
                <Link
                  to="/upcoming-events"
                  className="inline-flex items-center gap-2 border-2 border-[#00A8E1] text-[#00A8E1] px-6 py-3 rounded-xl font-bold hover:bg-[#00A8E1] hover:text-white transition-colors"
                >
                  <Clock size={20} />
                  Upcoming Events
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PodcastDetailPage;