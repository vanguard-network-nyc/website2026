import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  ArrowRight,
  Newspaper,
  ExternalLink
} from 'lucide-react';

const NewsroomPage = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const newsArticles = [
    {
      id: 7,
      title: "Ken Banta, CEO and Founder of The Vanguard Network, Moderates Nantucket Project Discussion on AI and Healthcare",
      description: "The Vanguard Network announced today that its CEO and founder, Ken Banta, facilitated a dynamic discussion at The Nantucket Project event in New York City.",
      image: "https://static.wixstatic.com/media/e6a994_b33b414425f3453684365c283a661d22~mv2.png/v1/fill/w_271,h_271,fp_0.50_0.50,q_95,enc_avif,quality_auto/e6a994_b33b414425f3453684365c283a661d22~mv2.png",
      date: "September 28, 2024",
      readTime: "2 min read",
      link: "/newsroom/ken-banta-moderates-nantucket-project-discussion-on-ai-and-healthcare"
    },
    {
      id: 1,
      title: "Vanguard Network Launches Next Gen GC Program in Washington, DC",
      description: "On September 30, 2025, The Vanguard Network launched the inaugural module of its Next Gen GC Program in Washington, DC.",
      image: "https://static.wixstatic.com/media/e6a994_3924142a7bf2420a89eb36e198270a99~mv2.png/v1/fill/w_271,h_271,fp_0.50_0.50,q_95,enc_avif,quality_auto/e6a994_3924142a7bf2420a89eb36e198270a99~mv2.webp",
      date: "September 30, 2024",
      readTime: "1 min read",
      link: "/newsroom/vanguard-network-launches-next-gen-gc-program-in-washington-dc"
    },
    {
      id: 2,
      title: "The Vanguard Network Welcomes E. Leigh Dance as Senior Global Advisor",
      description: "The Vanguard Network (TVN) is pleased to announce that E. Leigh Dance has joined as Senior Global Advisor, with a focus on expanding and enriching Vanguard's General Counsel Network.",
      image: "https://static.wixstatic.com/media/e6a994_5397c3a55566443498feaea80adb750c~mv2.png/v1/fill/w_271,h_271,fp_0.50_0.50,q_95,enc_avif,quality_auto/e6a994_5397c3a55566443498feaea80adb750c~mv2.webp",
      date: "September 27, 2024",
      readTime: "1 min read",
      link: "/newsroom/tvn-welcomes-leigh-dance"
    },
    {
      id: 3,
      title: "The Vanguard Network Featured on Your Partner In Success Radio",
      description: "The Vanguard Network is pleased to share that its founder and CEO, Ken Banta, was recently featured on the leadership podcast Your Partner In Success Radio with host Denise Griffitts.",
      image: "https://static.wixstatic.com/media/e6a994_c58f3de85a63453daab62333cc19ccfa~mv2.jpg/v1/fill/w_271,h_271,fp_0.50_0.50,q_90,enc_avif,quality_auto/e6a994_c58f3de85a63453daab62333cc19ccfa~mv2.webp",
      date: "September 24, 2024",
      readTime: "1 min read",
      link: "/newsroom/the-vanguard-network-featured-on-your-partner-in-success-radio"
    },
    {
      id: 4,
      title: "The Vanguard Network Featured on Pharm Exec Podcast",
      description: "Ken Banta discusses leadership development and organizational transformation in the pharmaceutical industry on this leading industry podcast.",
      image: "https://static.wixstatic.com/media/e6a994_29bbd547e1624bd8b746c48306d3c96e~mv2.webp/v1/fill/w_271,h_271,al_c,q_90,enc_avif,quality_auto/e6a994_29bbd547e1624bd8b746c48306d3c96e~mv2.webp",
      date: "September 20, 2024",
      readTime: "1 min read",
      link: "/newsroom/the-vanguard-network-featured-on-pharm-exec-podcast"
    },
    {
      id: 5,
      title: "The Vanguard Network Featured on Skot Waldron Podcast",
      description: "Executive leadership insights shared by The Vanguard Network on Skot Waldron's leadership development podcast series.",
      image: "https://static.wixstatic.com/media/e6a994_26e53e3a3fbe48b79aa9d011c1e3be03~mv2.png/v1/fill/w_271,h_271,fp_0.50_0.50,q_95,enc_avif,quality_auto/e6a994_26e53e3a3fbe48b79aa9d011c1e3be03~mv2.png",
      date: "September 15, 2024",
      readTime: "1 min read",
      link: "/newsroom/the-vanguard-network-featured-on-skot-waldron-podcast"
    },
    {
      id: 6,
      title: "The Vanguard Network Featured on The Daily Helping Podcast",
      description: "Ken Banta shares insights on leadership excellence and organizational transformation on The Daily Helping podcast with host Dr. Sherry Walling.",
      image: "https://static.wixstatic.com/media/e6a994_1e187b6933204c23a867e0968a191f36~mv2.png/v1/fill/w_271,h_271,fp_0.50_0.50,q_95,enc_avif,quality_auto/e6a994_1e187b6933204c23a867e0968a191f36~mv2.png",
      date: "September 10, 2024",
      readTime: "1 min read",
      link: "/newsroom/the-vanguard-network-featured-on-the-daily-helping-podcast"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-12 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
    >
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
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
            <h1 className="text-6xl font-bold bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent">
              Newsroom
            </h1>
          </div>
          
          <p className="text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium">
            Stay updated with the latest news, announcements, and media features from The Vanguard Network
          </p>
        </motion.div>

        {/* News Articles Grid */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {newsArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
            >
              {/* Article Image */}
              <div className="relative h-72 overflow-hidden bg-gray-100">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <div className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    NEWS
                  </div>
                </div>
              </div>
              
              {/* Article Content */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Content Area - grows to fill available space */}
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-[#045184] transition-colors leading-tight">
                    {article.title}
                  </h3>
                  
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed line-clamp-3">
                    {article.description}
                  </p>
                  
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
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                  >
                    <span>Read More</span>
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
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