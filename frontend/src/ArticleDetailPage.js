import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import Breadcrumb from './Breadcrumb';
import { ArrowLeft, User, Tag, Calendar, FileText, ChevronDown } from 'lucide-react';

const ArticleDetailPage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [similarArticles, setSimilarArticles] = useState([]);
  const [isQAOpen, setIsQAOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFromNewsroom, setIsFromNewsroom] = useState(false);

  useEffect(() => {
    if (id) {
      fetchArticle();
    }
  }, [id]);

  useEffect(() => {
    if (article && !isFromNewsroom) {
      fetchSimilarArticles();
    }
  }, [article, isFromNewsroom]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const backendUrl = import.meta.env?.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL;
      
      // First try to fetch from regular articles API
      let response = await fetch(`${backendUrl}/api/article/${id}`);
      let fromNewsroom = false;
      
      if (!response.ok) {
        // If not found in articles, try newsroom API
        response = await fetch(`${backendUrl}/api/newsroom/${id}`);
        fromNewsroom = true;
        
        if (!response.ok) {
          throw new Error(`Failed to fetch article: ${response.status} ${response.statusText}`);
        }
      }
      
      const articleData = await response.json();
      
      // Track the source for back button navigation
      setIsFromNewsroom(fromNewsroom);
      
      // If the article came from newsroom, we need to transform the field names to match what ArticleDetailPage expects
      if (articleData.featured_speakers && !articleData.featured_speaker_linkedin) {
        articleData.featured_speaker_linkedin = articleData.featured_speakers;
      }
      
      setArticle(articleData);
    } catch (err) {
      console.error('Error fetching article:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilarArticles = async () => {
    try {
      const backendUrl = import.meta.env?.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/articles/similar/${id}`);
      
      if (!response.ok) {
        console.warn('Failed to fetch similar articles');
        setSimilarArticles([]);
        return;
      }
      
      const similarData = await response.json();
      setSimilarArticles(similarData);
    } catch (err) {
      console.warn('Error fetching similar articles:', err);
      setSimilarArticles([]);
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
          to={isFromNewsroom ? "/newsroom" : "/articles"}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
        >
          {isFromNewsroom ? "Back to Newsroom" : "Back to Articles"}
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
            to={isFromNewsroom ? "/newsroom" : "/articles"}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            {isFromNewsroom ? "Back to Newsroom" : "Back to Articles"}
          </Link>
        </motion.div>

        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Article Content */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 md:p-12"
          >
            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {(article.publish_by || article.published_to_web) && (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar size={16} />
                  <span>{formatDate(article.publish_by || article.published_to_web)}</span>
                </div>
              )}
            </div>

            {/* Article Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
              {article.blog_title}
            </h1>

            {/* Description */}
            {article.description_teaser && (
              <div className="text-xl text-slate-600 mb-8 leading-relaxed font-light prose prose-xl max-w-none">
                <ReactMarkdown
                  components={{
                    p: ({node, ...props}) => <p className="mb-4" {...props} />,
                    strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                    em: ({node, ...props}) => <em className="italic" {...props} />,
                  }}
                >
                  {article.description_teaser}
                </ReactMarkdown>
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
            {article.body_of_blog && (
              <div className="prose prose-lg max-w-none mb-8">
                <ReactMarkdown
                  components={{
                    p: ({node, ...props}) => <p className="mb-4 text-slate-700 leading-relaxed" {...props} />,
                    strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                    em: ({node, ...props}) => <em className="italic" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc ml-6 mb-4" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal ml-6 mb-4" {...props} />,
                    li: ({node, ...props}) => <li className="mb-2" {...props} />,
                    h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-4 mb-2" {...props} />,
                    a: ({node, ...props}) => <a className="text-blue-600 hover:text-blue-700 underline" target="_blank" rel="noopener noreferrer" {...props} />,
                    blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props} />,
                  }}
                >
                  {article.body_of_blog
                    .replace(/_, \[/g, ' [')
                    .replace(/\)_\./g, ').')
                    .replace(/\)_\*/g, ')*')
                    .replace(/\]_\./g, '].')
                    .replace(/\]_\*/g, ']*')
                  }
                </ReactMarkdown>
              </div>
            )}

            {/* Q&A Collapsible Section */}
            {article.body_qa && (
              <div className="mb-8 border border-slate-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setIsQAOpen(!isQAOpen)}
                  className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-slate-50 to-blue-50 hover:from-slate-100 hover:to-blue-100 transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-slate-900">Read the Q&A</h3>
                  <ChevronDown 
                    size={24} 
                    className={`text-slate-600 transition-transform duration-300 ${isQAOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isQAOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 bg-white border-t border-slate-200"
                  >
                    <div className="prose prose-lg max-w-none">
                      <ReactMarkdown
                        components={{
                          p: ({node, ...props}) => <p className="mb-4 text-slate-700 leading-relaxed" {...props} />,
                          strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                          em: ({node, ...props}) => <em className="italic" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc ml-6 mb-4" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal ml-6 mb-4" {...props} />,
                          li: ({node, ...props}) => <li className="mb-2" {...props} />,
                          h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
                          h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />,
                          h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-4 mb-2" {...props} />,
                          a: ({node, ...props}) => <a className="text-blue-600 hover:text-blue-700 underline" target="_blank" rel="noopener noreferrer" {...props} />,
                          blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props} />,
                        }}
                      >
                        {article.body_qa}
                      </ReactMarkdown>
                    </div>
                  </motion.div>
                )}
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

        {/* Similar Articles */}
        {similarArticles.length > 0 && (
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mb-12 pt-8"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-[#045184] to-[#00A8E1] rounded-lg flex items-center justify-center">
                <FileText size={20} className="text-white" />
              </div>
              Similar Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarArticles.map((similarArticle, index) => (
                <motion.div
                  key={similarArticle.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-slate-200 flex flex-col"
                >
                  <div className="relative h-[270px] overflow-hidden">
                    {similarArticle.photo ? (
                      <img
                        src={similarArticle.photo}
                        alt={similarArticle.blog_title}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#045184] to-[#00A8E1] flex items-center justify-center">
                        <FileText size={32} className="text-white opacity-50" />
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-bold text-slate-900 mb-2 line-clamp-3 text-sm">
                      {similarArticle.blog_title}
                    </h3>
                    {similarArticle.featured_speaker_linkedin && (
                      <p className="text-xs mb-3">
                        <span className="font-medium text-slate-600">Featured Speaker(s):</span> <span className="font-bold text-slate-900">{similarArticle.featured_speaker_linkedin}</span>
                      </p>
                    )}
                    <Link
                      to={`/article/${similarArticle.id}`}
                      className="w-full bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white py-2 px-4 rounded-lg font-medium text-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 mt-auto"
                    >
                      <FileText size={16} />
                      Read More
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

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
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
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