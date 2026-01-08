import React, { useState, useEffect, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import Components from './components';
import ProgramsV2 from './ProgramsV2';
import NetworkingV2Page from './NetworkingV2Page';
import UpcomingEventsPage from './UpcomingEventsPage';
import NotFoundPage from './NotFoundPage';
import PodcastsPage from './PodcastsPage';
import PodcastDetailPage from './PodcastDetailPage';
import VideosPage from './VideosPage';
import VideoDetailPage from './VideoDetailPage';
import ArticlesPage from './ArticlesPage';
import ArticleDetailPage from './ArticleDetailPage';
import GCExchangePage from './GCExchangePage';
import GlobalCounselLeadersPage from './GlobalCounselLeadersPage';
import NewLeadersPage from './NewLeadersPage';
import SeniorCounselExchangePage from './SeniorCounselExchangePage';
import NextGenGCPage from './NextGenGCPage';
import LifeSciencesCEOPage from './LifeSciencesCEOPage';
import LawAssociatesPage from './LawAssociatesPage';
import RiskManagementPage from './RiskManagementPage';
import CaseStudiesPage from './CaseStudiesPage';
import NewsroomPage from './NewsroomPage';
import NewsroomDetailPage from './NewsroomDetailPage';
import MembershipApplicationPage from './MembershipApplicationPage';
import PrivacyPage from './PrivacyPage';
import TermsPage from './TermsPage';
import BackToTopButton from './ScrollToTop';

// ScrollToTop component to handle scroll restoration on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Immediately scroll to top without animation when route changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const {
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
  VideoQuoteSection,
  NewsroomSliderSection,
  ImageSliderSection
} = Components;

// Component to handle scroll restoration with transition overlay
function ScrollHandler({ setIsTransitioning }) {
  const location = useLocation();
  
  useLayoutEffect(() => {
    // Scroll to top IMMEDIATELY if no hash - this runs BEFORE paint
    if (!location.hash) {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
    
    // Show overlay briefly for smooth transition
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [location.pathname, location.hash, setIsTransitioning]);
  
  return null;
}

function App() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Disable automatic scroll restoration
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);
  
  return (
    <Router>
      <ScrollToTop />
      <ScrollHandler setIsTransitioning={setIsTransitioning} />
      {isTransitioning && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#f8fafc',
          zIndex: 99999,
          pointerEvents: 'none'
        }} />
      )}
      <div className="App">
        <Header />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/advisory" element={<AdvisoryPage />} />
            <Route path="/networking" element={<NetworkingV2Page />} />
            <Route path="/programs" element={<ProgramsV2 />} />
            <Route path="/upcoming-events" element={<UpcomingEventsPage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/article/:id" element={<ArticleDetailPage />} />
            <Route path="/podcasts" element={<PodcastsPage />} />
            <Route path="/podcast/:id" element={<PodcastDetailPage />} />
            <Route path="/videos" element={<VideosPage />} />
            <Route path="/video/:id" element={<VideoDetailPage />} />
            <Route path="/gc-exchange" element={<GCExchangePage />} />
            <Route path="/senior-counsel-exchange" element={<SeniorCounselExchangePage />} />
            <Route path="/next-gen-gc" element={<NextGenGCPage />} />
            <Route path="/life-sciences-ceo" element={<LifeSciencesCEOPage />} />
            <Route path="/law-associates" element={<LawAssociatesPage />} />
            <Route path="/risk-management" element={<RiskManagementPage />} />
            <Route path="/global-counsel-leaders" element={<GlobalCounselLeadersPage />} />
            <Route path="/new-leaders" element={<NewLeadersPage />} />
            <Route path="/success-stories" element={<CaseStudiesPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/book" element={<BookPage />} />
            <Route path="/newsroom" element={<NewsroomPage />} />
            <Route path="/newsroom-item/:id" element={<NewsroomDetailPage />} />
            <Route path="/application" element={<MembershipApplicationPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
        <Footer />
        <BackToTopButton />
      </div>
    </Router>
  );
}

function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <NewHero />
      <NewStatsSection />
      <NewWhatWeDoSection />
      <NewAboutSection />
      <NewContentLibrarySection />
      <VideoQuoteSection />
      <NewsroomSliderSection />
      <ImageSliderSection />
    </motion.div>
  );
}

// Home 2 Page - Full version with all sections
export default App;