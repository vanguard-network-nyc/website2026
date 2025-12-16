import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';
import { ArrowLeft, User, Headphones, Clock, ExternalLink, Play } from 'lucide-react';

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

  const fetchSimilarPodcasts = async () => {
    try {
      const backendUrl = import.meta.env?.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/podcasts/similar/${id}`);
      
      if (!response.ok) {
        console.warn('Failed to fetch similar podcasts');
        setSimilarPodcasts([]);
        return;
      }
      
      const similarData = await response.json();
      setSimilarPodcasts(similarData);
    } catch (err) {
      console.warn('Error fetching similar podcasts:', err);
      setSimilarPodcasts([]);
    }
  };

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

  // Extract iframe from soundcloud embed code with mobile-friendly parameters
  const getSoundCloudIframe = (embedCode) => {
    if (!embedCode) return null;
    
    // If it's already an iframe, modify it for better mobile experience
    if (embedCode.includes('<iframe')) {
      // Extract the src URL from the iframe
      const srcMatch = embedCode.match(/src="([^"]+)"/);
      if (srcMatch) {
        let srcUrl = srcMatch[1];
        // Add mobile-friendly parameters if not already present
        if (!srcUrl.includes('hide_related=')) {
          srcUrl += (srcUrl.includes('?') ? '&' : '?') + 'hide_related=true';
        }
        if (!srcUrl.includes('show_comments=')) {
          srcUrl += '&show_comments=false';
        }
        if (!srcUrl.includes('show_playcount=')) {
          srcUrl += '&show_playcount=false';
        }
        if (!srcUrl.includes('show_teaser=')) {
          srcUrl += '&show_teaser=false';
        }
        // Return modified iframe with responsive width
        return `<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="${srcUrl}" style="border-radius: 12px;"></iframe>`;
      }
      return embedCode;
    }
    
    // If it's just a URL, create an iframe with optimal parameters
    if (embedCode.includes('soundcloud.com')) {
      const params = 'hide_related=true&show_comments=false&show_playcount=false&show_teaser=false&visual=false';
      const separator = embedCode.includes('?') ? '&' : '?';
      return `<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="${embedCode}${separator}${params}" style="border-radius: 12px;"></iframe>`;
    }
    
    return embedCode;
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
        className="pt-40 pb-12 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 flex items-center justify-center"
      >
        <div className="text-center max-w-md mx-auto p-4 md:p-8">
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
      className="pt-40 pb-12 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100"
    >
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8">
        <Breadcrumb customTitle={podcast?.title} />
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
              <div className="relative h-[370px] lg:h-[434px] overflow-hidden">
                {podcast.thumbnail ? (
                  <img
                    src={podcast.thumbnail}
                    alt={podcast.title}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#045184] to-[#00A8E1] flex items-center justify-center">
                    <Headphones size={96} className="text-white opacity-50" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
              
              {/* Info Section */}
              <div className="p-4 md:p-8 lg:p-6 md:p-12 flex flex-col justify-center">
                <motion.h1 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl lg:text-2xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight"
                >
                  {podcast.title}
                </motion.h1>
                
                {podcast.featured_speaker && (
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-3"
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
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4 md:p-8 lg:p-6 md:p-12">
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
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 md:mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#045184] to-[#00A8E1] rounded-lg flex items-center justify-center">
                    <Play size={20} className="text-white" />
                  </div>
                  Listen Now
                </h2>
                
                {/* SoundCloud embed - same for mobile and desktop */}
                <div className="bg-slate-50 rounded-2xl p-4 md:p-6">
                  <div 
                    className="w-full soundcloud-player-container overflow-hidden rounded-xl"
                    style={{ minHeight: '166px' }}
                    dangerouslySetInnerHTML={{ 
                      __html: getSoundCloudIframe(podcast.soundcloud_embed) 
                    }}
                  />
                </div>
              </motion.div>
            )}

            {/* Similar Podcasts */}
            {similarPodcasts.length > 0 && (
              <motion.div 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#045184] to-[#00A8E1] rounded-lg flex items-center justify-center">
                    <Headphones size={20} className="text-white" />
                  </div>
                  Similar Podcasts
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {similarPodcasts.map((similarPodcast, index) => (
                    <motion.div
                      key={similarPodcast.id}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-slate-200 flex flex-col"
                    >
                      <div className="relative h-[265px] overflow-hidden">
                        {similarPodcast.thumbnail ? (
                          <img
                            src={similarPodcast.thumbnail}
                            alt={similarPodcast.title}
                            className="w-full h-full object-cover object-top"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#045184] to-[#00A8E1] flex items-center justify-center">
                            <Headphones size={32} className="text-white opacity-50" />
                          </div>
                        )}
                      </div>
                      <div className="p-4 flex flex-col flex-grow">
                        <h3 className="font-bold text-slate-900 mb-2 line-clamp-2 text-sm">
                          {similarPodcast.title}
                        </h3>
                        {similarPodcast.featured_speaker && (
                          <p className="text-xs mb-3">
                            <span className="font-medium text-slate-600">Featured Speaker(s):</span> <span className="font-bold text-slate-900">{similarPodcast.featured_speaker}</span>
                          </p>
                        )}
                        <Link
                          to={`/podcast/${similarPodcast.id}`}
                          className="w-full bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white py-2 px-4 rounded-lg font-medium text-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 mt-auto"
                        >
                          <Play size={16} />
                          Listen
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Want More Leadership Insights Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Want More Leadership Insights?
            </h3>
            <p className="text-slate-600 mb-6">
              Explore our other podcasts, upcoming events, and leadership programs designed to accelerate your growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/podcasts"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
              >
                <Headphones size={20} />
                More Podcasts
              </Link>
              <Link
                to="/upcoming-events"
                className="inline-flex items-center gap-2 text-[#045184] px-6 py-3 rounded-lg font-semibold hover:bg-gradient-to-r hover:from-[#045184] hover:to-[#00A8E1] hover:text-white transition-all duration-300 relative"
                style={{
                  background: 'linear-gradient(white, white) padding-box, linear-gradient(to right, #045184, #00A8E1) border-box',
                  border: '2px solid transparent'
                }}
              >
                <Clock size={20} />
                Upcoming Events
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PodcastDetailPage;