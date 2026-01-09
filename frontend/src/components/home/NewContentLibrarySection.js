import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { Headphones, Video, FileText, ArrowRight, Clock, ChevronRight, ChevronLeft, Calendar, Play } from 'lucide-react';

const NewContentLibrarySection = () => {
  const [featuredInsights, setFeaturedInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedInsights();
  }, []);

  const fetchFeaturedInsights = async () => {
    try {
      setLoading(true);
      const backendUrl = import.meta.env?.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL;
      
      // Fetch latest from each content type and Substack
      const [articlesResponse, podcastsResponse, videosResponse, substackResponse] = await Promise.all([
        fetch(`${backendUrl}/api/articles`),
        fetch(`${backendUrl}/api/podcasts`),
        fetch(`${backendUrl}/api/videos`),
        fetch('https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent('https://kenbanta.substack.com/feed'))
      ]);

      const articles = await articlesResponse.json();
      const podcasts = await podcastsResponse.json();
      const videos = await videosResponse.json();
      const substackData = await substackResponse.json();

      // Get the latest entry from each type
      const latestArticle = articles && articles.length > 0 ? articles[0] : null;
      const latestPodcast = podcasts && podcasts.length > 0 ? podcasts[0] : null;
      const latestVideo = videos && videos.length > 0 ? videos[0] : null;
      
      // Get the latest Substack post
      let substackPost = null;
      if (substackData.status === 'ok' && substackData.items && substackData.items.length > 0) {
        substackPost = substackData.items[0]; // Always use the latest post
      }

      const insights = [];

      // Add latest article
      if (latestArticle) {
        insights.push({
          type: "Article",
          category: latestArticle.category || "Leadership Development",
          title: latestArticle.blog_title || latestArticle.title,
          description: latestArticle.description || latestArticle.summary || "Exploring leadership insights and organizational transformation.",
          author: latestArticle.author || "Vanguard Faculty",
          duration: `${Math.ceil((latestArticle.blog_title?.length || 100) / 10)} min read`,
          image: latestArticle.photo || "https://images.unsplash.com/photo-1543132220-7bc04a0e790a",
          link: `/article/${latestArticle.id}`
        });
      }

      // Add latest podcast
      if (latestPodcast) {
        insights.push({
          type: "Podcast",
          category: latestPodcast.category || "Board Dynamics",
          title: latestPodcast.title || "Leadership Insights Podcast",
          description: latestPodcast.description || "A candid discussion with experienced leaders about governance and strategy.",
          author: latestPodcast.featured_speaker || "Member Contributor",
          duration: latestPodcast.duration || "45 min listen",
          image: latestPodcast.thumbnail || "https://images.unsplash.com/photo-1579525109384-ddf54825044f",
          link: `/podcast/${latestPodcast.id}`
        });
      }

      // Add latest video
      if (latestVideo) {
        insights.push({
          type: "Video",
          category: latestVideo.category || "Personal Awareness",
          title: latestVideo.vimeo_name || latestVideo.video_description || "Leadership Development Video",
          description: latestVideo.description || "Understanding how leadership principles drive better strategic decisions.",
          author: latestVideo.featured_speakers || "Affiliate Contributor",
          duration: latestVideo.duration || "12 min watch",
          image: latestVideo.headshot || "https://images.unsplash.com/photo-1562935345-5080389daccd",
          link: `/video/${latestVideo.id}`
        });
      }

      // Add latest Substack post
      if (substackPost) {
        // Extract description from content
        const stripHtmlTags = (html) => {
          const div = document.createElement('div');
          div.innerHTML = html;
          return div.textContent || div.innerText || '';
        };
        const description = stripHtmlTags(substackPost.description || substackPost.content);
        const excerpt = description.length > 300 ? description.substring(0, 300) + '...' : description;
        
        insights.push({
          type: "Substack",
          category: "Ken Banta on Leadership",
          title: substackPost.title || "Leadership Insights",
          description: excerpt,
          author: "Ken Banta",
          duration: new Date(substackPost.pubDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          image: substackPost.thumbnail || substackPost.enclosure?.link || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
          link: substackPost.link,
          external: true
        });
      }

      setFeaturedInsights(insights);
    } catch (error) {
      console.error('Error fetching featured insights:', error);
      // Fallback to hardcoded data if API fails
      setFeaturedInsights([
        {
          type: "Article",
          category: "Leadership Development",
          title: "The Future of C-Suite Leadership in Uncertain Times",
          description: "Exploring how today's senior executives can navigate complexity while driving organizational transformation and maintaining stakeholder trust.",
          author: "Vanguard Faculty",
          duration: "8 min read",
          image: "https://images.unsplash.com/photo-1543132220-7bc04a0e790a"
        },
        {
          type: "Podcast",
          category: "Board Dynamics",
          title: "Board Dynamics: Building Effective Governance",
          description: "A candid discussion with three experienced board chairs about creating high-performing governance structures.",
          author: "Member Contributor",
          duration: "45 min listen",
          image: "https://images.unsplash.com/photo-1579525109384-ddf54825044f"
        },
        {
          type: "Video",
          category: "Personal Awareness",
          title: "Personal Awareness in Executive Decision Making",
          description: "Understanding how self-awareness drives better strategic decisions and enhances leadership effectiveness.",
          author: "Affiliate Contributor",
          duration: "12 min watch",
          image: "https://images.unsplash.com/photo-1562935345-5080389daccd"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const contentTypes = [
    {
      title: "Articles",
      description: "In-depth analysis and thought leadership on organizational transformation and leadership excellence.",
      icon: <Newspaper size={32} />
    },
    {
      title: "Podcasts",
      description: "Conversations with industry leaders sharing insights on governance, strategy, and leadership development.",
      icon: <MessageCircle size={32} />
    },
    {
      title: "Videos",
      description: "Visual content featuring expert discussions and leadership development sessions from our community.",
      icon: <Video size={32} />
    },
    {
      title: "Ken Banta's Substack",
      description: "Stay updated with the latest leadership insights and strategic thinking from our Founder & CEO column, <strong>Ken Banta on Leadership</strong>.",
      icon: <Newspaper size={32} />
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Real World Insights
          </h2>
          <p className="text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Vanguard's rich library of content features members and other real world experts talking about the leadership topics that matter most.
          </p>
        </motion.div>

        {/* Integrated Content Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          {loading ? (
            <div className="text-center py-6 md:py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-slate-600">Loading latest insights...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredInsights.map((insight, index) => (
                <motion.div
                  key={insight.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col h-full"
                >
                  {/* Intro Header Section */}
                  <div className="bg-gradient-to-r from-blue-50 to-slate-50 border-b border-gray-200 p-4">
                    <div className="flex items-center justify-center text-[#045184] mb-2" style={{ height: '32px' }}>
                      {insight.type === 'Article' ? <Newspaper size={24} /> : 
                       insight.type === 'Podcast' ? <Headphones size={24} /> : 
                       insight.type === 'Video' ? <Video size={24} /> : 
                       <FileText size={24} />}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2 text-center whitespace-nowrap overflow-hidden" style={{ height: '24px', lineHeight: '24px' }}>
                      {insight.type === 'Article' ? 'Articles' : 
                       insight.type === 'Podcast' ? 'Podcasts' : 
                       insight.type === 'Video' ? 'Videos' : 
                       "Ken Banta's Substack"}
                    </h3>
                    <div className="flex items-start justify-center" style={{ height: '80px' }}>
                      <p className="text-xs text-slate-600 leading-relaxed text-center" dangerouslySetInnerHTML={{ 
                        __html: insight.type === 'Article' ? 'In-depth analysis and thought leadership on organizational transformation and leadership excellence.' : 
                                insight.type === 'Podcast' ? 'Conversations with industry leaders sharing insights on governance, strategy, and leadership development.' : 
                                insight.type === 'Video' ? 'Visual content featuring expert discussions and leadership development sessions from our community.' : 
                                'Stay updated with the latest leadership insights and strategic thinking from our Founder & CEO column, <strong>Ken Banta on Leadership</strong>.'
                      }}>
                      </p>
                    </div>
                  </div>

                  {/* Image Section */}
                  <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url('${insight.image}')` }}>
                    <div className="h-full bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  
                  <div className="p-4 flex flex-col flex-grow">
                    {/* Content Area - grows to fill available space */}
                    <div className="flex-grow">
                      <h4 className="text-base font-bold text-slate-900 mb-2 leading-tight">
                        {insight.title}
                      </h4>
                      <p className="text-slate-600 text-xs mb-3 leading-relaxed">
                        {insight.description}
                      </p>
                    </div>
                    
                    {/* Button Area - always at bottom */}
                    <div className="mt-auto pt-3">
                      {insight.link ? (
                        insight.external ? (
                          <a 
                            href={insight.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-center"
                          >
                            {insight.type === 'Article' ? 'Read more' : 
                             insight.type === 'Podcast' ? 'Listen to podcast' : 
                             insight.type === 'Video' ? 'Watch video' : 
                             insight.type === 'Substack' ? 'Read on Substack' : 'Read More'}
                          </a>
                        ) : (
                          <Link 
                            to={insight.link}
                            className="block w-full bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-center"
                          >
                            {insight.type === 'Article' ? 'Read more' : 
                             insight.type === 'Podcast' ? 'Listen to podcast' : 
                             insight.type === 'Video' ? 'Watch video' : 'Read More'}
                          </Link>
                        )
                      ) : (
                        <button 
                          className="w-full bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          {insight.type === 'Article' ? 'Read more' : 
                           insight.type === 'Podcast' ? 'Listen to podcast' : 
                           insight.type === 'Video' ? 'Watch video' : 'Read More'}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

// Executive Networks Section

export default NewContentLibrarySection;
