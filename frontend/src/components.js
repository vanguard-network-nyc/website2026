import React from 'react';

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

// Animation variants for consistent scroll and page load animations
// These are exported for use in other components
export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

export const slideInLeftVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const slideInRightVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
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
