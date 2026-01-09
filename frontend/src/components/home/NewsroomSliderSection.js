import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import ReactMarkdown from 'react-markdown';
import { Newspaper, ArrowRight, ChevronRight, ChevronLeft, Calendar } from 'lucide-react';

const NewsroomSliderSection = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewsroomArticles();
  }, []);

  const fetchNewsroomArticles = async () => {
    try {
      setLoading(true);
      const backendUrl = import.meta.env?.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/newsroom`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch newsroom articles: ${response.status}`);
      }
      
      const articleData = await response.json();
      
      // Get only the top 6 most recent articles
      const recentArticles = articleData.slice(0, 6).map((article) => ({
        id: article.id,
        title: article.blog_title,
        description: article.description_teaser || "Read more about this newsroom update...",
        image: article.photo || "https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=News",
        date: formatDate(article.publish_by),
        link: `/newsroom-item/${article.id}`,
        type: article.type_of_news || "NEWS"
      }));
      
      setNewsArticles(recentArticles);
    } catch (err) {
      console.error('Error fetching newsroom articles:', err);
      // Use fallback articles if fetch fails
      setNewsArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Recent';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Recent';
    }
  };

  // Custom arrow components for slider
  const CustomPrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
      aria-label="Previous slide"
    >
      <ChevronLeft size={24} className="text-slate-700" />
    </button>
  );

  const CustomNextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
      aria-label="Next slide"
    >
      <ChevronRight size={24} className="text-slate-700" />
    </button>
  );

  const sliderSettings = {
    dots: true,
    infinite: newsArticles.length > 3,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: newsArticles.length > 2,
          adaptiveHeight: false,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: newsArticles.length > 1,
          adaptiveHeight: false,
        }
      }
    ]
  };

  if (loading) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (newsArticles.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-900">
              Latest From Our Newsroom
            </h2>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Stay updated with the latest news, announcements, and exclusive content
          </p>
        </motion.div>

        {/* Desktop Slider - Hidden on Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="newsroom-slider hidden md:block relative"
        >
          <Slider {...sliderSettings}>
            {newsArticles.map((article) => (
              <div key={article.id} className="px-4 py-4 md:py-8 h-full">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-slate-100 flex flex-col h-full min-h-[630px]">
                  {/* Article Image */}
                  <div className="relative h-[324px] overflow-hidden bg-slate-100 flex-shrink-0">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Article Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-4 group-hover:text-blue-600 transition-colors leading-tight" style={{minHeight: '5.5rem'}}>
                      {article.title}
                    </h3>
                    
                    <div className="text-slate-600 text-sm mb-4 leading-relaxed line-clamp-5 prose prose-sm max-w-none flex-grow">
                      <ReactMarkdown
                        components={{
                          p: ({node, ...props}) => <span {...props} />,
                          strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                          em: ({node, ...props}) => <em className="italic" {...props} />,
                        }}
                      >
                        {article.description}
                      </ReactMarkdown>
                    </div>
                    
                    <Link
                      to={article.link}
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm group-hover:gap-3 transition-all"
                    >
                      <span>Read More</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </motion.div>

        {/* Mobile Stack Layout - Show only on Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="md:hidden space-y-6"
        >
          {newsArticles.slice(0, 3).map((article, index) => (
            <Link key={article.id} to={article.link} className="block">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-slate-100 flex">
                {/* Article Image */}
                <div className="relative w-28 h-28 flex-shrink-0 overflow-hidden bg-slate-100">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Article Content */}
                <div className="p-4 flex flex-col justify-center flex-grow">
                  <h3 className="text-sm font-bold text-slate-900 mb-2 line-clamp-2 leading-tight">
                    {article.title}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-blue-600 font-semibold text-xs">
                    Read More
                    <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <Link
            to="/newsroom"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white px-4 md:px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300"
          >
            <span>Visit the Newsroom</span>
          </Link>
        </motion.div>
      </div>

      {/* Custom Slider Styles */}
      <style jsx>{`
        .newsroom-slider .slick-dots {
          bottom: -50px;
        }
        .newsroom-slider .slick-dots li button:before {
          font-size: 12px;
          color: #64748b;
        }
        .newsroom-slider .slick-dots li.slick-active button:before {
          color: #2563eb;
        }
        .newsroom-slider .slick-prev,
        .newsroom-slider .slick-next {
          width: 48px;
          height: 48px;
          z-index: 10;
        }
        .newsroom-slider .slick-prev {
          left: -60px;
        }
        .newsroom-slider .slick-next {
          right: -60px;
        }
        .newsroom-slider .slick-prev:before,
        .newsroom-slider .slick-next:before {
          font-size: 48px;
          color: #045184;
          opacity: 1;
        }
        .newsroom-slider .slick-prev:hover:before,
        .newsroom-slider .slick-next:hover:before {
          opacity: 0.8;
        }
        @media (max-width: 1280px) {
          .newsroom-slider .slick-prev {
            left: -40px;
          }
          .newsroom-slider .slick-next {
            right: -40px;
          }
        }
        @media (max-width: 768px) {
          .newsroom-slider .slick-prev {
            left: 10px;
          }
          .newsroom-slider .slick-next {
            right: 10px;
          }
        }
      `}</style>
    </section>
  );
};

// Image Slider Section - Full width horizontal slider with 20 images

export default NewsroomSliderSection;
