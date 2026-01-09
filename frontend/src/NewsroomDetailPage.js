import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Breadcrumb from './Breadcrumb';
import SEO from './SEO';
import useArticleSchema from './useArticleSchema';
import { User, Tag, Calendar, FileText } from 'lucide-react';

// Define markdown components outside the component to avoid re-creation on each render
const teaserComponents = {
  p: (props) => <p className="mb-4" {...props} />,
  strong: (props) => <strong className="font-bold" {...props} />,
  em: (props) => <em className="italic" {...props} />,
};

const bodyComponents = {
  p: (props) => <p className="mb-4 text-slate-700 leading-relaxed whitespace-pre-line" {...props} />,
  strong: (props) => <strong className="font-bold" {...props} />,
  em: (props) => <em className="italic" {...props} />,
  ul: (props) => <ul className="list-disc ml-6 mb-4" {...props} />,
  ol: (props) => <ol className="list-decimal ml-6 mb-4" {...props} />,
  li: (props) => <li className="mb-2" {...props} />,
  h1: (props) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
  h2: (props) => <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />,
  h3: (props) => <h3 className="text-xl font-bold mt-4 mb-2" {...props} />,
  a: (props) => <a className="text-blue-600 hover:text-blue-700 underline" target="_blank" rel="noopener noreferrer" {...props} />,
  blockquote: (props) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props} />,
  br: () => <br />,
};

// Helper function to preprocess markdown text
const preprocessMarkdown = (text) => {
  if (!text) return '';
  let processed = text;
  
  // Fix malformed italics around links: "word_, [link text](url)_" -> "word, _[link text](url)_"
  processed = processed.replace(/_,\s*\[([^\]]+)\]\(([^)]+)\)_/g, ', _[$1]($2)_');
  processed = processed.replace(/(\w)_,\s*\[([^\]]+)\]\(([^)]+)\)_/g, '$1, _[$2]($3)_');
  
  // Fix bold markers with trailing space: "**text **" -> "**text**"
  processed = processed.replace(/\s+\*\*(\s*)$/gm, '**$1');
  processed = processed.replace(/\s+\*\*(\n)/g, '**$1');
  
  return processed;
};

const NewsroomDetailPage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNewsroomItem = useCallback(async () => {
    try {
      setLoading(true);
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      
      const response = await fetch(`${backendUrl}/api/newsroom/${id}`);
        
      if (!response.ok) {
        throw new Error(`Failed to fetch newsroom item: ${response.status} ${response.statusText}`);
      }
      
      const articleData = await response.json();
      
      // Transform field names for compatibility
      if (articleData.featured_speakers && !articleData.featured_speaker_linkedin) {
        articleData.featured_speaker_linkedin = articleData.featured_speakers;
      }
      
      setArticle(articleData);
    } catch (err) {
      console.error('Error fetching newsroom item:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchNewsroomItem();
    }
  }, [id, fetchNewsroomItem]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (err) {
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
          to="/newsroom"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
        >
          Back to Newsroom
        </Link>
      </div>
    </div>
  );

  // Prepare article data for SEO schema
  const articleSchemaData = article ? {
    author: article.featured_speaker_linkedin || 'The Vanguard Network',
    datePublished: article.publish_by || article.published_to_web || new Date().toISOString(),
    dateModified: article.publish_by || article.published_to_web || new Date().toISOString()
  } : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-12 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
    >
      {article && (
        <SEO 
          title={article.blog_title}
          description={article.description_teaser ? article.description_teaser.substring(0, 160) : `News and updates from The Vanguard Network about ${article.type_content || 'leadership insights'}.`}
          image={article.newsroom_detail_image || article.photo}
          article={articleSchemaData}
        />
      )}
      <div className="max-w-4xl mx-auto">
        <div className="px-4 sm:px-6 lg:px-4 md:px-8 mb-4">
          <Breadcrumb customTitle={article?.blog_title} />
        </div>

        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Newsroom Header Image - Use rectangular detail image */}
          {(article.newsroom_detail_image || article.photo) && (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full bg-slate-100"
            >
              <img
                src={article.newsroom_detail_image || article.photo}
                alt={article.blog_title}
                className="w-full h-auto max-h-[600px] object-contain"
              />
            </motion.div>
          )}

          {/* Article Content */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-4 md:p-8 md:p-6 md:p-12"
          >
            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {article.type_content && (
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  {article.type_content}
                </span>
              )}
              {(article.publish_by || article.published_to_web) && (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar size={16} />
                  <span>{formatDate(article.publish_by || article.published_to_web)}</span>
                </div>
              )}
            </div>

            {/* Article Title */}
            <h1 className="text-3xl md:text-2xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
              {article.blog_title}
            </h1>

            {/* Description */}
            {article.description_teaser && (
              <div className="text-xl text-slate-600 mb-8 leading-relaxed font-light prose prose-xl max-w-none">
                <ReactMarkdown components={teaserComponents}>
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
                  remarkPlugins={[remarkGfm]}
                  components={bodyComponents}
                >
                  {preprocessMarkdown(article.body_of_blog)}
                </ReactMarkdown>
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
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Stay Updated
            </h3>
            <p className="text-slate-600 mb-6">
              Discover more news, announcements, and media features from The Vanguard Network.
            </p>
            <Link
              to="/newsroom"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
            >
              <FileText size={20} />
              Return to Newsroom
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NewsroomDetailPage;
