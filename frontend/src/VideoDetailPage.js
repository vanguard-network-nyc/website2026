import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Tag, Calendar, Play } from 'lucide-react';

const VideoDetailPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [similarVideos, setSimilarVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchVideo();
      fetchSimilarVideos();
    }
  }, [id]);

  const getVimeoEmbedUrl = (vimeoLink) => {
    if (!vimeoLink) return null;
    // Extract video ID from various Vimeo URL formats
    // https://vimeo.com/1137704539 -> 1137704539
    // https://vimeo.com/showcase/123/video/456 -> 456
    const match = vimeoLink.match(/vimeo\.com\/(?:.*\/)?(\d+)/);
    if (match && match[1]) {
      return `https://player.vimeo.com/video/${match[1]}`;
    }
    return vimeoLink;
  };

  const fetchVideo = async () => {
    try {
      setLoading(true);
      const backendUrl = import.meta.env?.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/video/${id}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch video: ${response.status} ${response.statusText}`);
      }
      
      const videoData = await response.json();
      setVideo(videoData);
    } catch (err) {
      console.error('Error fetching video:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilarVideos = async () => {
    try {
      const backendUrl = import.meta.env?.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/videos/similar/${id}`);
      
      if (response.ok) {
        const similarData = await response.json();
        setSimilarVideos(similarData);
      }
    } catch (err) {
      console.error('Error fetching similar videos:', err);
    }
  };

  if (loading) return (
    <div className="pt-40 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-xl text-slate-600">Loading video...</p>
      </div>
    </div>
  );

  if (error || !video) return (
    <div className="pt-40 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Video Not Found</h2>
        <p className="text-slate-600 mb-6">{error || 'This video could not be found.'}</p>
        <Link 
          to="/videos"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
        >
          Back to Videos
        </Link>
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            to="/videos"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            Back to Videos
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
            >
              <div className="aspect-video bg-black">
                {video.vanguard_vimeo_link ? (
                  <iframe
                    src={getVimeoEmbedUrl(video.vanguard_vimeo_link)}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-white text-center">
                      <Play size={64} className="mx-auto mb-4" />
                      <p>Video player not available</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Video Info */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h1 className="text-3xl font-bold text-slate-900 mb-6">
                {video.vimeo_name || video.video_description}
              </h1>

              {video.featured_speakers && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-slate-600 mb-2">
                    <User size={20} />
                    <span className="font-semibold">Featured Speaker(s)</span>
                  </div>
                  <p className="text-lg text-slate-800 font-medium">
                    {video.featured_speakers}
                  </p>
                </div>
              )}

              {video.vimeo_long_description && (
                <div className="mb-6">
                  <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {video.vimeo_long_description}
                  </p>
                </div>
              )}

              {video.tags && video.tags.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-slate-600 mb-3">
                    <Tag size={20} />
                    <span className="font-semibold">Tags</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {video.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Similar Videos Section */}
            {similarVideos.length > 0 && (
              <motion.div 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mb-12 pt-8"
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#045184] to-[#00A8E1] rounded-lg flex items-center justify-center">
                    <Play size={20} className="text-white" />
                  </div>
                  Similar Videos
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {similarVideos.slice(0, 3).map((similarVideo, index) => (
                    <motion.div
                      key={similarVideo.id}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-slate-200 flex flex-col"
                    >
                      <div className="relative h-[220px] overflow-hidden">
                        {similarVideo.headshot ? (
                          <img
                            src={similarVideo.headshot}
                            alt={similarVideo.vimeo_name || similarVideo.video_description}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#045184] to-[#00A8E1] flex items-center justify-center">
                            <Play size={32} className="text-white opacity-50" />
                          </div>
                        )}
                      </div>
                      <div className="p-4 flex flex-col flex-grow">
                        <h3 className="font-bold text-slate-900 mb-2 line-clamp-3 text-sm">
                          {similarVideo.vimeo_name || similarVideo.video_description}
                        </h3>
                        {similarVideo.featured_speakers && (
                          <p className="text-xs mb-3">
                            <span className="font-medium text-slate-600">Featured Speaker(s):</span> <span className="font-bold text-slate-900">{similarVideo.featured_speakers}</span>
                          </p>
                        )}
                        <Link
                          to={`/video/${similarVideo.id}`}
                          className="w-full bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white py-2 px-4 rounded-lg font-medium text-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 mt-auto"
                        >
                          <Play size={16} />
                          Watch Video
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

        </div>

        {/* Explore More Videos CTA */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Explore More Videos
            </h3>
            <p className="text-slate-600 mb-6">
              Discover more thought-provoking videos and leadership insights from our expert contributors.
            </p>
            <Link
              to="/videos"
              className="inline-flex items-center gap-2 bg-[#045184] hover:bg-[#033d6b] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              <Play size={20} />
              View All Videos
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default VideoDetailPage;