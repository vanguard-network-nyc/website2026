import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Breadcrumb from './Breadcrumb';
import { 
  Calendar, 
  Clock, 
  ArrowRight,
  Newspaper,
  ExternalLink,
  Search,
  Filter
} from 'lucide-react';

const NewsroomPage = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedSpeaker, setSelectedSpeaker] = useState('All');
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  // Scroll to top when component mounts or page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    fetchNewsroomArticles();
  }, []);

  useEffect(() => {
    filterArticles();
  }, [newsArticles, searchTerm, selectedType, selectedSpeaker]);

  const fetchNewsroomArticles = async () => {
    try {
      setLoading(true);
      const backendUrl = import.meta.env?.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/newsroom`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch newsroom articles: ${response.status} ${response.statusText}`);
      }
      
      const articleData = await response.json();
      
      // Transform the data to match the current card structure, keeping all Airtable fields
      const transformedArticles = articleData.map((article, index) => ({
        id: article.id,
        title: article.blog_title,
        description: article.description_teaser || "Read more about this newsroom update...",
        image: article.photo || `https://via.placeholder.com/271x271/3B82F6/FFFFFF?text=News+${index + 1}`,
        date: formatDate(article.publish_by),
        readTime: "2 min read", // Default read time since it's not in API
        link: `/newsroom-item/${article.id}`, // Use newsroom detail page with dynamic ID
        // Keep original fields for filtering
        type_of_news: article.type_of_news || "NEWS",
        featured_speakers: article.featured_speakers,
        blog_title: article.blog_title,
        description_teaser: article.description_teaser
      }));
      
      setNewsArticles(transformedArticles);
      setFilteredArticles(transformedArticles);
    } catch (err) {
      console.error('Error fetching newsroom articles:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filterArticles = () => {
    let filtered = newsArticles;

    if (searchTerm) {
      filtered = filtered.filter(article => 
        article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.featured_speakers?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.type_of_news?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType !== 'All') {
      filtered = filtered.filter(article => {
        // Split the article's types and check if selected type is included
        const articleTypes = article.type_of_news?.split(',').map(t => t.trim()) || [];
        return articleTypes.includes(selectedType);
      });
    }

    if (selectedSpeaker !== 'All') {
      filtered = filtered.filter(article => 
        article.featured_speakers?.includes(selectedSpeaker)
      );
    }

    setFilteredArticles(filtered);
    setCurrentPage(1); // Reset to first page when filtering changes
  };

  const getUniqueTypes = () => {
    // Split combined categories (e.g., "News, Events" -> ["News", "Events"])
    const allTypes = newsArticles
      .map(article => article.type_of_news)
      .filter(Boolean)
      .flatMap(type => type.split(',').map(t => t.trim()))
      .filter(Boolean);
    
    // Define the exact order for categories
    const orderedCategories = ['Content', 'Events', 'In The Media', 'News', 'Programs'];
    
    // Get unique types that exist in the data
    const uniqueTypes = [...new Set(allTypes)];
    
    // Sort according to the defined order
    const sortedTypes = orderedCategories.filter(cat => uniqueTypes.includes(cat));
    
    return ['All', ...sortedTypes];
  };

  const getUniqueSpeakers = () => {
    const speakers = newsArticles
      .map(article => article.featured_speakers)
      .filter(Boolean)
      .flatMap(speakers => speakers.split(', '))
      .filter(Boolean);
    return ['All', ...new Set(speakers)];
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Recent';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Recent';
    }
  };

  // Use filtered articles from Airtable
  const displayArticles = filteredArticles;

  if (loading) {
    return (
      <div className="pt-40 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-slate-600">Loading newsroom...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-12 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
    >
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <Breadcrumb />
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-xl"
            >
              <Newspaper size={40} className="text-white" />
            </motion.div>
            <h1 
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent py-2 leading-tight"
            >
              Newsroom
            </h1>
          </div>
          
          <p className="text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium">
            Stay updated with the latest news, announcements, and media features from The Vanguard Network
          </p>
        </motion.div>

        {/* Search and Filters */}
        {newsArticles.length > 0 && (
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12 max-w-6xl mx-auto"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-center">
              {/* Search Bar */}
              <div className="flex-1 max-w-md relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Search newsroom..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Type Filter */}
              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[140px]"
                >
                  {getUniqueTypes().map(type => (
                    <option key={type} value={type}>
                      {type === 'All' ? 'All Types' : type}
                    </option>
                  ))}
                </select>
                <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
              </div>
            </div>

            {/* Results Count */}
            <div className="text-center mt-4">
              <p className="text-slate-600">
                Showing {filteredArticles.length} of {newsArticles.length} article{newsArticles.length !== 1 ? 's' : ''}
                {searchTerm && ` for "${searchTerm}"`}
                {selectedType !== 'All' && ` in ${selectedType}`}
              </p>
            </div>
          </motion.div>
        )}

        {/* News Articles Grid */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {displayArticles.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <Newspaper className="mx-auto h-16 w-16 text-slate-300 mb-4" />
              <h3 className="text-xl font-semibold text-slate-600 mb-2">No articles found</h3>
              <p className="text-slate-500 mb-6">
                {newsArticles.length === 0 
                  ? "No newsroom articles available at the moment." 
                  : "Try adjusting your search or filter criteria."
                }
              </p>
              {(searchTerm || selectedType !== 'All' || selectedSpeaker !== 'All') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedType('All');
                    setSelectedSpeaker('All');
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            displayArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
            >
              {/* Article Image */}
              <div className="relative h-[350px] overflow-hidden bg-gray-100">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Article Content */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Content Area - grows to fill available space */}
                <div className="flex-grow">
                  <h3 className="text-[17px] font-bold text-slate-900 mb-3 line-clamp-4 group-hover:text-[#045184] transition-colors leading-tight">
                    {article.title}
                  </h3>
                  
                  <div className="text-slate-600 text-sm mb-4 leading-relaxed line-clamp-5 prose prose-sm max-w-none">
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
                  
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>
                
                {/* Button Area - always at bottom */}
                <div className="mt-auto pt-4">
                  <Link
                    to={article.link}
                    className="w-full bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/btn hover:shadow-lg"
                  >
                    <span>Read More</span>
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
            ))
          )}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center bg-white rounded-3xl p-12 shadow-xl border border-slate-200 mt-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Stay Connected</h2>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Subscribe to our newsletter or follow us on social media to get the latest updates about The Vanguard Network's programs, events, and thought leadership content.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2 justify-center"
            >
              <Newspaper size={20} />
              Contact Us
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/company/40948215"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-slate-300 text-slate-700 hover:bg-slate-100 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-2 justify-center"
            >
              Follow on LinkedIn
              <ExternalLink size={20} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NewsroomPage;