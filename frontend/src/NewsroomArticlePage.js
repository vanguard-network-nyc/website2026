import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  ArrowLeft,
  ExternalLink,
  Share2
} from 'lucide-react';

const NewsroomArticlePage = () => {
  const { slug } = useParams();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const articles = {
    "vanguard-network-launches-next-gen-gc-program-in-washington-dc": {
      title: "Vanguard Network Launches Next Gen GC Program in Washington, DC",
      date: "September 30, 2024",
      readTime: "3 min read",
      heroImage: "https://static.wixstatic.com/media/e6a994_7ce682f53c3347bcb536bbc64bb042be~mv2.jpeg/v1/fill/w_740,h_555,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e6a994_7ce682f53c3347bcb536bbc64bb042be~mv2.jpeg",
      content: [
        "On September 30, 2025, The Vanguard Network launched the inaugural module of its Next Gen GC Program in Washington, DC. This six-part program is designed to prepare rising general counsel for the unique challenges of top leadership roles, with an emphasis on foresight, practical skills, and peer-to-peer learning.",
        "The opening forum was generously hosted by Foley & Lardner LLP, setting the stage for a day of candid discussion and interactive sessions. Following the program, participants gathered for a dinner at the River Club, hosted by Russell Reynolds Associates, where conversations continued in a more informal and collaborative setting.",
        "The Next Gen GC Program represents Vanguard's commitment to equipping the next generation of general counsel with the tools and community they need to succeed at the highest levels of leadership. Future modules will build on the strong start in Washington, DC and continue to blend practical learning with confidential peer exchange."
      ],
      images: [
        {
          src: "https://static.wixstatic.com/media/e6a994_779b511dce3f4e0f8fa77d350a48a919~mv2.jpeg/v1/fill/w_740,h_555,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e6a994_779b511dce3f4e0f8fa77d350a48a919~mv2.jpeg",
          caption: "Participants engaged in collaborative discussion during Module 1"
        }
      ],
      links: [
        {
          text: "View Program Summary (PDF)",
          url: "https://e6a99458-1b15-4ea7-911a-e5ef26d15ca4.usrfiles.com/ugd/e6a994_4158135221544aa889b487281aa86c75.pdf"
        },
        {
          text: "Learn More About Next Gen GC Program",
          url: "/next-gen-gc"
        }
      ]
    },
    "tvn-welcomes-leigh-dance": {
      title: "The Vanguard Network Welcomes E. Leigh Dance as Senior Global Advisor",
      date: "September 27, 2024",
      readTime: "2 min read",
      heroImage: "https://static.wixstatic.com/media/e6a994_5397c3a55566443498feaea80adb750c~mv2.png/v1/fill/w_271,h_271,fp_0.50_0.50,q_95,enc_avif,quality_auto/e6a994_5397c3a55566443498feaea80adb750c~mv2.webp",
      content: [
        "The Vanguard Network (TVN) is pleased to announce that E. Leigh Dance has joined as Senior Global Advisor, with a focus on expanding and enriching Vanguard's General Counsel Network.",
        "Leigh brings extensive experience in building and leading global legal communities, having previously founded and led Global Counsel Leaders (GCL), a premier network for senior in-house counsel worldwide.",
        "In her new role at TVN, Leigh will leverage her deep understanding of the challenges facing today's general counsel to enhance our programming and expand our global reach, particularly in helping legal leaders navigate the evolving landscape of corporate governance and organizational transformation."
      ]
    },
    "the-vanguard-network-featured-on-your-partner-in-success-radio": {
      title: "The Vanguard Network Featured on Your Partner In Success Radio",
      date: "September 24, 2024",
      readTime: "2 min read",
      heroImage: "https://static.wixstatic.com/media/e6a994_c58f3de85a63453daab62333cc19ccfa~mv2.jpg/v1/fill/w_271,h_271,fp_0.50_0.50,q_90,enc_avif,quality_auto/e6a994_c58f3de85a63453daab62333cc19ccfa~mv2.webp",
      content: [
        "The Vanguard Network is pleased to share that its founder and CEO, Ken Banta, was recently featured on the leadership podcast Your Partner In Success Radio with host Denise Griffitts.",
        "During the interview, Ken discussed The Vanguard Network's unique approach to leadership development, focusing on how senior executives can leverage peer networks and confidential forums to enhance their strategic thinking and decision-making capabilities.",
        "The conversation covered key topics including organizational transformation, the importance of peer learning in executive development, and how leaders can build the foresight necessary to navigate today's complex business environment."
      ]
    },
    "the-vanguard-network-featured-on-pharm-exec-podcast": {
      title: "The Vanguard Network Featured on Pharm Exec Podcast",
      date: "September 20, 2024",
      readTime: "2 min read",
      heroImage: "https://static.wixstatic.com/media/e6a994_29bbd547e1624bd8b746c48306d3c96e~mv2.webp/v1/fill/w_271,h_271,al_c,q_90,enc_avif,quality_auto/e6a994_29bbd547e1624bd8b746c48306d3c96e~mv2.webp",
      content: [
        "Ken Banta, founder and CEO of The Vanguard Network, was featured on the Pharm Exec podcast to discuss leadership development and organizational transformation specifically within the pharmaceutical industry.",
        "The conversation explored how pharmaceutical leaders can navigate the unique challenges of their industry, including regulatory complexity, scientific innovation pressures, and the evolving healthcare landscape.",
        "Ken shared insights on how The Vanguard Network's Life Sciences CEO Exchanges provide a confidential forum for pharmaceutical executives to address these challenges through peer learning and strategic collaboration."
      ]
    },
    "the-vanguard-network-featured-on-skot-waldron-podcast": {
      title: "The Vanguard Network Featured on Skot Waldron Podcast",
      date: "September 15, 2024",
      readTime: "2 min read",
      heroImage: "https://static.wixstatic.com/media/e6a994_26e53e3a3fbe48b79aa9d011c1e3be03~mv2.png/v1/fill/w_271,h_271,fp_0.50_0.50,q_95,enc_avif,quality_auto/e6a994_26e53e3a3fbe48b79aa9d011c1e3be03~mv2.png",
      content: [
        "Executive leadership insights were shared by The Vanguard Network on Skot Waldron's leadership development podcast series, focusing on the critical elements of effective C-suite leadership.",
        "The discussion highlighted how traditional leadership development approaches often fall short for senior executives, and why peer-to-peer learning in confidential settings provides more meaningful and actionable insights.",
        "Key topics covered included building executive presence, making strategic decisions under uncertainty, and the importance of continuous learning and adaptation in today's rapidly changing business environment."
      ]
    },
    "the-vanguard-network-featured-on-the-daily-helping-podcast": {
      title: "The Vanguard Network Featured on The Daily Helping Podcast",
      date: "September 10, 2024",
      readTime: "2 min read",
      heroImage: "https://static.wixstatic.com/media/e6a994_1e187b6933204c23a867e0968a191f36~mv2.png/v1/fill/w_271,h_271,fp_0.50_0.50,q_95,enc_avif,quality_auto/e6a994_1e187b6933204c23a867e0968a191f36~mv2.png",
      content: [
        "Ken Banta shared insights on leadership excellence and organizational transformation on The Daily Helping podcast with host Dr. Sherry Walling, focusing on how leaders can create meaningful impact in their organizations.",
        "The conversation explored the psychological and practical aspects of leadership transformation, discussing how executives can develop the self-awareness and strategic thinking necessary for effective leadership.",
        "Dr. Walling and Ken discussed the unique challenges facing today's leaders, including managing through uncertainty, building resilient organizations, and the importance of authentic leadership in creating lasting organizational change."
      ]
    }
  };

  const article = articles[slug];

  if (!article) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-40 pb-12 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Article Not Found</h1>
          <p className="text-slate-600 mb-8">The article you're looking for doesn't exist.</p>
          <Link
            to="/newsroom"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Newsroom
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-12 min-h-screen bg-white"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Newsroom */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="mb-8"
        >
          <Link
            to="/newsroom"
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Newsroom
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{article.readTime}</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
            {article.title}
          </h1>
        </motion.div>

        {/* Hero Image */}
        {article.heroImage && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <img
              src={article.heroImage}
              alt={article.title}
              className="w-full h-96 object-cover rounded-xl shadow-lg"
            />
          </motion.div>
        )}

        {/* Article Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="prose prose-lg max-w-none mb-8"
        >
          {article.content.map((paragraph, index) => (
            <p key={index} className="text-slate-700 leading-relaxed mb-6 text-lg">
              {paragraph}
            </p>
          ))}
        </motion.div>

        {/* Additional Images */}
        {article.images && article.images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="mb-8"
          >
            <img
              src={image.src}
              alt={image.caption}
              className="w-full h-96 object-cover rounded-xl shadow-lg mb-4"
            />
            {image.caption && (
              <p className="text-sm text-slate-600 italic text-center">{image.caption}</p>
            )}
          </motion.div>
        ))}

        {/* Links */}
        {article.links && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-slate-50 rounded-xl p-6 mb-8"
          >
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Links</h3>
            <div className="space-y-3">
              {article.links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target={link.url.startsWith('http') ? '_blank' : '_self'}
                  rel={link.url.startsWith('http') ? 'noopener noreferrer' : ''}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <ExternalLink size={16} />
                  <span>{link.text}</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}

        {/* About The Vanguard Network */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-[#045184] to-[#00A8E1] rounded-xl p-8 text-white mb-8"
        >
          <h3 className="text-2xl font-bold mb-4">About The Vanguard Network</h3>
          <p className="text-lg leading-relaxed opacity-95">
            The Vanguard Network is a leadership community and advisory platform that helps senior executives sharpen foresight, strengthen performance, and achieve impact. Through forums, exchanges, and programs, Vanguard convenes leaders across industries to share challenges and solutions in a confidential, collaborative setting.
          </p>
        </motion.div>

        {/* Share */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-between border-t border-slate-200 pt-8"
        >
          <Link
            to="/newsroom"
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Newsroom
          </Link>
          
          <button
            onClick={() => navigator.share ? navigator.share({
              title: article.title,
              url: window.location.href
            }) : navigator.clipboard.writeText(window.location.href)}
            className="text-slate-600 hover:text-slate-800 font-medium flex items-center gap-2 transition-colors"
          >
            <Share2 size={16} />
            Share Article
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NewsroomArticlePage;