import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Tag, Calendar, FileText } from 'lucide-react';

const ArticleDetailPage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchArticle();
    }
  }, [id]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const backendUrl = import.meta.env?.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/article/${id}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch article: ${response.status} ${response.statusText}`);
      }
      
      const articleData = await response.json();
      setArticle(articleData);
    } catch (err) {
      console.error('Error fetching article:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
        <p className="text-xl text-slate-600">Loading article...</p>
      </div>
    </div>
  );

  if (error || !article) return (
    <div className="pt-40 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Article Not Found</h2>
        <p className="text-slate-600 mb-6">{error || 'This article could not be found.'}</p>
        <Link 
          to="/articles"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
        >
          Back to Articles
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            Back to Articles
          </Link>
        </motion.div>

        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Article Header Image */}
          {article.photo && (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="h-64 md:h-96 overflow-hidden"
            >
              <img
                src={article.photo}
                alt={article.blog_title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}

          {/* Article Content */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 md:p-12"
          >
            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {article.type_content && (
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  {article.type_content}
                </span>
              )}
              {article.published_to_web && (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar size={16} />
                  <span>{formatDate(article.published_to_web)}</span>
                </div>
              )}
            </div>

            {/* Article Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
              {article.blog_title}
            </h1>

            {/* Description */}
            {article.description_teaser && (
              <div className="text-xl text-slate-600 mb-8 leading-relaxed font-light">
                {article.description_teaser}
              </div>
            )}

            {/* Featured Speaker */}
            {article.featured_speaker_linkedin && (
              <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 text-slate-700 mb-2">
                  <User size={20} />
                  <span className="font-semibold">Featured Speaker</span>
                </div>
                <p className="text-lg text-slate-800 font-medium">
                  {article.featured_speaker_linkedin}
                </p>
              </div>
            )}

            {/* Article Body */}
            {article.body_qa && (
              <div className="prose prose-lg max-w-none mb-8">
                <div className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {article.body_qa}
                </div>
              </div>
            )}

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="border-t pt-8">
                <div className="flex items-center gap-2 text-slate-600 mb-4">
                  <Tag size={20} />
                  <span className="font-semibold">Tags</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="bg-gray-100 text-gray-700 text-sm px-3 py-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </article>

        {/* Related Articles CTA */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Explore More Insights
            </h3>
            <p className="text-slate-600 mb-6">
              Discover more thought-provoking articles and leadership insights from our expert contributors.
            </p>
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              <FileText size={20} />
              View All Articles
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ArticleDetailPage;