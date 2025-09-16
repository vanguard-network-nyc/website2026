import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, FileText, User, Tag, Calendar, ChevronDown } from 'lucide-react';

const ArticlesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  // Initialize filter from URL parameters
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      if (categoryParam === 'organizational-transformation') {
        setSelectedType('Organizational Transformation');
      } else {
        setSelectedType(categoryParam);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    filterArticles();
  }, [articles, searchTerm, selectedType]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const backendUrl = import.meta.env?.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/articles`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch articles: ${response.status} ${response.statusText}`);
      }
      
      const articleData = await response.json();
      setArticles(articleData);
      setFilteredArticles(articleData);
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filterArticles = () => {
    let filtered = articles;

    if (searchTerm) {
      filtered = filtered.filter(article => 
        article.blog_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description_teaser?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.featured_speaker_linkedin?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.type_content?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType !== 'All') {
      if (selectedType === 'Organizational Transformation') {
        // Filter for organizational transformation related articles
        filtered = filtered.filter(article => 
          article.type_content?.toLowerCase().includes('transformation') ||
          article.type_content?.toLowerCase().includes('organizational') ||
          article.blog_title?.toLowerCase().includes('transformation') ||
          article.blog_title?.toLowerCase().includes('organizational') ||
          article.description_teaser?.toLowerCase().includes('transformation') ||
          article.description_teaser?.toLowerCase().includes('organizational')
        );
      } else {
        filtered = filtered.filter(article => 
          article.type_content === selectedType
        );
      }
    }

    setFilteredArticles(filtered);
  };

  const getUniqueTypes = () => {
    const types = articles.map(article => article.type_content).filter(Boolean);
    const uniqueTypes = ['All', 'Organizational Transformation', ...new Set(types)];
    return uniqueTypes;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  if (loading) return (
    <div className="pt-40 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-xl text-slate-600">Loading articles...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="pt-40 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Unable to Load Articles</h2>
        <p className="text-slate-600 mb-6">{error}</p>
        <button 
          onClick={fetchArticles}
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
            Articles & Insights
          </motion.h1>
          
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            Discover thought-provoking articles and insights from leadership experts, covering organizational transformation, governance, and strategic leadership.
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
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Type Filter */}
          <div className="relative">
            <select
              value={selectedType}
              onChange={(e) => {
                const newType = e.target.value;
                setSelectedType(newType);
                // Update URL parameters
                if (newType === 'All') {
                  setSearchParams({});
                } else if (newType === 'Organizational Transformation') {
                  setSearchParams({ category: 'organizational-transformation' });
                } else {
                  setSearchParams({ category: newType });
                }
              }}
              className="appearance-none bg-white border border-slate-200 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {getUniqueTypes().map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
          </div>
        </motion.div>

        {/* Articles Grid */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredArticles.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-semibold text-slate-600 mb-2">No articles found</h3>
              <p className="text-slate-500">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
              >
                {/* Article Image */}
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  {article.photo ? (
                    <img 
                      src={article.photo} 
                      alt={article.blog_title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      style={{ 
                        objectPosition: 'center top',
                        paddingBottom: '20px',
                        marginBottom: '-20px'
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                      <FileText size={48} className="text-blue-600" />
                    </div>
                  )}
                  {article.type_content && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-white bg-opacity-90 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                        {article.type_content}
                      </span>
                    </div>
                  )}
                </div>

                {/* Article Content */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Content Area - grows to fill available space */}
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">
                      {article.blog_title}
                    </h3>
                    
                    {article.description_teaser && (
                      <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                        {article.description_teaser}
                      </p>
                    )}

                    {article.featured_speaker_linkedin && (
                      <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                        <User size={16} />
                        <span className="font-medium">Featured Speaker</span>
                      </div>
                    )}

                    {article.featured_speaker_linkedin && (
                      <p className="text-sm text-slate-700 mb-4 font-medium">
                        {article.featured_speaker_linkedin}
                      </p>
                    )}

                    {article.published_to_web && (
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                        <Calendar size={14} />
                        <span>{formatDate(article.published_to_web)}</span>
                      </div>
                    )}

                    {article.tags && article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {article.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                        {article.tags.length > 3 && (
                          <span className="text-xs text-slate-500">+{article.tags.length - 3} more</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Button Area - always at bottom */}
                  <div className="mt-auto pt-4">
                    <Link
                      to={`/article/${article.id}`}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                    >
                      <FileText size={16} />
                      Read Article
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ArticlesPage;