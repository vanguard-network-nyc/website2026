import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, FileText, User, Calendar } from 'lucide-react';

const InThePressPage = () => {
  const [pressArticles, setPressArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPressArticles();
  }, []);

  useEffect(() => {
    filterArticles();
  }, [pressArticles, searchTerm]);

  const fetchPressArticles = async () => {
    try {
      setLoading(true);
      const backendUrl = import.meta.env?.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/in-the-press`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch press articles: ${response.status} ${response.statusText}`);
      }
      
      const articlesData = await response.json();
      setPressArticles(articlesData);
      setFilteredArticles(articlesData);
    } catch (err) {
      console.error('Error fetching press articles:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filterArticles = () => {
    let filtered = pressArticles;

    if (searchTerm) {
      filtered = filtered.filter(article => 
        article.article_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.author_names?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.short_description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredArticles(filtered);
  };

  if (loading) return (
    <div className="pt-40 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-xl text-slate-600">Loading press articles...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="pt-40 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Unable to Load Press Articles</h2>
        <p className="text-slate-600 mb-6">{error}</p>
        <button 
          onClick={fetchPressArticles}
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
            In the Press
          </motion.h1>
          
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            Discover how The Vanguard Network and our thought leaders are featured across leading publications and media outlets.
          </motion.p>
        </div>

        {/* Search Bar */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12 flex justify-center"
        >
          <div className="relative max-w-xl w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search by title, author, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
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
              <h3 className="text-xl font-semibold text-slate-600 mb-2">No press articles found</h3>
              <p className="text-slate-500">
                {searchTerm ? "Try adjusting your search criteria." : "No press articles available at the moment."}
              </p>
            </div>
          ) : (
            filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                {/* Article Image */}
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  {article.photo ? (
                    <img 
                      src={article.photo} 
                      alt={article.article_title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                      <FileText size={48} className="text-blue-600" />
                    </div>
                  )}
                </div>

                {/* Article Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 leading-tight">
                    {article.article_title}
                  </h3>
                  
                  {article.author_names && (
                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                      <User size={16} />
                      <span className="font-medium">By {article.author_names}</span>
                    </div>
                  )}

                  {article.short_description && (
                    <p className="text-sm text-slate-600 mb-4 line-clamp-3 leading-relaxed">
                      {article.short_description}
                    </p>
                  )}

                  <Link
                    to={`/in-the-press/${article.id}`}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                  >
                    <FileText size={16} />
                    Read More
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Results Counter */}
        {filteredArticles.length > 0 && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-12"
          >
            <p className="text-slate-600">
              Showing {filteredArticles.length} of {pressArticles.length} press articles
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default InThePressPage;