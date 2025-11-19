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
                    <span className="font-semibold">Featured Speakers</span>
                  </div>
                  <p className="text-lg text-slate-800 font-medium">
                    {video.featured_speakers}
                  </p>
                </div>
              )}

              {video.category && (
                <div className="mb-6">
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    {video.category}
                  </span>
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

              {video.keywords && video.keywords.length > 0 && (
                <div>
                  <h3 className="font-semibold text-slate-800 mb-3">Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {video.keywords.map((keyword, index) => (
                      <span 
                        key={index} 
                        className="bg-slate-100 text-slate-700 text-sm px-3 py-1 rounded-full"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Similar Videos */}
            {similarVideos.length > 0 && (
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-6">Similar Videos</h3>
                <div className="space-y-4">
                  {similarVideos.map((similarVideo) => (
                    <Link
                      key={similarVideo.id}
                      to={`/video/${similarVideo.id}`}
                      className="block group"
                    >
                      <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                        <div className="flex-shrink-0">
                          {similarVideo.headshot ? (
                            <img
                              src={similarVideo.headshot}
                              alt={similarVideo.video_description}
                              className="w-16 h-12 object-cover rounded-lg"
                            />
                          ) : (
                            <div className="w-16 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                              <Play size={16} className="text-gray-500" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                            {similarVideo.vimeo_name || similarVideo.video_description}
                          </h4>
                          {similarVideo.featured_speakers && (
                            <p className="text-xs text-slate-600 mt-1 line-clamp-1">
                              {similarVideo.featured_speakers}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoDetailPage;