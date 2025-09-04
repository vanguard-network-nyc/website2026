import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, User, FileText } from 'lucide-react';

const InThePressDetailPage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchArticle();
      fetchRelatedArticles();
    }
  }, [id]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const backendUrl = import.meta.env?.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/in-the-press/${id}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch press article: ${response.status} ${response.statusText}`);
      }
      
      const articleData = await response.json();
      setArticle(articleData);
    } catch (err) {
      console.error('Error fetching press article:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedArticles = async () => {
    try {
      const backendUrl = import.meta.env?.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/in-the-press`);
      
      if (response.ok) {
        const allArticles = await response.json();
        // Get 3 random articles that are not the current one
        const otherArticles = allArticles.filter(article => article.id !== id);
        const shuffled = otherArticles.sort(() => 0.5 - Math.random());
        setRelatedArticles(shuffled.slice(0, 3));
      }
    } catch (err) {
      console.error('Error fetching related press articles:', err);
    }
  };

  if (loading) return (
    <div className="pt-32 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-xl text-slate-600">Loading press article...</p>
      </div>
    </div>
  );

  if (error || !article) return (
    <div className="pt-32 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Press Article Not Found</h2>
        <p className="text-slate-600 mb-6">{error || 'This press article could not be found.'}</p>
        <Link 
          to="/in-the-press"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
        >
          Back to In the Press
        </Link>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-12 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
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
            to="/in-the-press"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            Back to In the Press
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
                alt={article.article_title}
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
            {/* Article Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
              {article.article_title}
            </h1>

            {/* Author Names */}
            {article.author_names && (
              <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 text-slate-700 mb-2">
                  <User size={20} />
                  <span className="font-semibold">Authors</span>
                </div>
                <p className="text-lg text-slate-800 font-medium mb-4">
                  {article.author_names}
                </p>
                
                {/* Authors Introduction */}
                {article.authors_intro && (
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="font-semibold text-slate-800 mb-2">About the Authors</h3>
                    <div className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                      {article.authors_intro}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Short Description */}
            {article.short_description && (
              <div className="text-xl text-slate-600 mb-8 leading-relaxed font-light p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                {article.short_description}
              </div>
            )}

            {/* Article Body */}
            {article.body_of_article && (
              <div className="prose prose-lg max-w-none">
                <div className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {article.body_of_article}
                </div>
              </div>
            )}
          </motion.div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12"
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">
                More Press Coverage
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <Link
                    key={relatedArticle.id}
                    to={`/in-the-press/${relatedArticle.id}`}
                    className="block group hover:transform hover:scale-105 transition-all duration-300"
                  >
                    <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300">
                      <div className="h-32 bg-gray-200 overflow-hidden">
                        {relatedArticle.photo ? (
                          <img
                            src={relatedArticle.photo}
                            alt={relatedArticle.article_title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                            <FileText size={24} className="text-blue-600" />
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4">
                        <h4 className="text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                          {relatedArticle.article_title}
                        </h4>
                        {relatedArticle.author_names && (
                          <p className="text-xs text-slate-600 mt-2">
                            By {relatedArticle.author_names}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Back to Press CTA */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Explore More Press Coverage
            </h3>
            <p className="text-slate-600 mb-6">
              Discover how The Vanguard Network continues to make headlines in leadership and business publications.
            </p>
            <Link
              to="/in-the-press"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              <FileText size={20} />
              View All Press Coverage
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default InThePressDetailPage;