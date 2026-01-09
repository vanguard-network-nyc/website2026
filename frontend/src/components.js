import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';
import SEO from './SEO';
import Slider from 'react-slick';
import ReactMarkdown from 'react-markdown';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Import extracted layout components
import { Header, Footer, GCLBanner } from './components/layout';

// Import extracted page components
import { AdvisoryPage, TeamPage, ContactPage, BookPage } from './pages';

// Import extracted home components
import { 
  NewHero, 
  NewStatsSection, 
  NewWhatWeDoSection, 
  VideoQuoteSection, 
  NewAboutSection, 
  NewContentLibrarySection, 
  NewsroomSliderSection, 
  ImageSliderSection 
} from './components/home';

import { 
  Menu, 
  X, 
  ChevronRight,
  ChevronLeft, 
  ChevronDown,
  Play, 
  Users, 
  Target, 
  BookOpen, 
  Award,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Star,
  Network,
  MessageCircle,
  UserCheck,
  Newspaper,
  Shield,
  Video,
  Bot,
  Search,
  Filter,
  Grid,
  List,
  Clock,
  TrendingUp,
  CheckCircle2,
  Linkedin,
  Globe,
  Calendar,
  ExternalLink,
  Headphones,
  FileText
} from 'lucide-react';

// Animation variants for consistent scroll and page load animations
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const slideInLeftVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const slideInRightVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {

// All page components, home sections, and layout components have been extracted to:
// - /components/layout/ (Header, Footer, GCLBanner)
// - /pages/ (AdvisoryPage, TeamPage, ContactPage, BookPage)
// - /components/home/ (NewHero, NewStatsSection, etc.)

          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-296px * 20));
            }
          }
        }
      `}</style>
    </section>
  );
};


// Export all components
const Components = {
  Header,
  Footer,
  AdvisoryPage,
  TeamPage,
  ContactPage,
  BookPage,
  NewHero,
  NewStatsSection,
  NewWhatWeDoSection,
  NewAboutSection,
  NewContentLibrarySection,
  GCLBanner,
  VideoQuoteSection,
  NewsroomSliderSection,
  ImageSliderSection
};

export default Components;
