import React, { useEffect, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Components from './components';
import SEO from './SEO';
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

// PageWrapper: Forces instant scroll to top BEFORE any paint
// This is the key fix for the page transition scroll bug
function PageWrapper({ children }) {
  // useLayoutEffect runs synchronously BEFORE the browser paints
  // This ensures scroll happens before the user sees anything
  useLayoutEffect(() => {
    // Immediately reset scroll position using all methods
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  return children;
}

// Google Analytics 4 Page View Tracker for SPA
function GAPageViewTracker() {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname + location.search
      });
    }
  }, [location]);

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

function App() {
  
  // Disable automatic scroll restoration
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);
  
  return (
    <Router>
      <GAPageViewTracker />
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
          <Route path="/advisory" element={<PageWrapper><AdvisoryPage /></PageWrapper>} />
          <Route path="/networking" element={<PageWrapper><NetworkingV2Page /></PageWrapper>} />
          <Route path="/programs" element={<PageWrapper><ProgramsV2 /></PageWrapper>} />
          <Route path="/upcoming-events" element={<PageWrapper><UpcomingEventsPage /></PageWrapper>} />
          <Route path="/articles" element={<PageWrapper><ArticlesPage /></PageWrapper>} />
          <Route path="/article/:id" element={<PageWrapper><ArticleDetailPage /></PageWrapper>} />
          <Route path="/podcasts" element={<PageWrapper><PodcastsPage /></PageWrapper>} />
          <Route path="/podcast/:id" element={<PageWrapper><PodcastDetailPage /></PageWrapper>} />
          <Route path="/videos" element={<PageWrapper><VideosPage /></PageWrapper>} />
          <Route path="/video/:id" element={<PageWrapper><VideoDetailPage /></PageWrapper>} />
          <Route path="/gc-exchange" element={<PageWrapper><GCExchangePage /></PageWrapper>} />
          <Route path="/senior-counsel-exchange" element={<PageWrapper><SeniorCounselExchangePage /></PageWrapper>} />
          <Route path="/next-gen-gc" element={<PageWrapper><NextGenGCPage /></PageWrapper>} />
          <Route path="/life-sciences-ceo" element={<PageWrapper><LifeSciencesCEOPage /></PageWrapper>} />
          <Route path="/law-associates" element={<PageWrapper><LawAssociatesPage /></PageWrapper>} />
          <Route path="/risk-management" element={<PageWrapper><RiskManagementPage /></PageWrapper>} />
          <Route path="/global-counsel-leaders" element={<PageWrapper><GlobalCounselLeadersPage /></PageWrapper>} />
          <Route path="/new-leaders" element={<PageWrapper><NewLeadersPage /></PageWrapper>} />
          <Route path="/success-stories" element={<PageWrapper><CaseStudiesPage /></PageWrapper>} />
          <Route path="/team" element={<PageWrapper><TeamPage /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
          <Route path="/book" element={<PageWrapper><BookPage /></PageWrapper>} />
          <Route path="/newsroom" element={<PageWrapper><NewsroomPage /></PageWrapper>} />
          <Route path="/newsroom-item/:id" element={<PageWrapper><NewsroomDetailPage /></PageWrapper>} />
          <Route path="/application" element={<PageWrapper><MembershipApplicationPage /></PageWrapper>} />
          <Route path="/privacy" element={<PageWrapper><PrivacyPage /></PageWrapper>} />
          <Route path="/terms" element={<PageWrapper><TermsPage /></PageWrapper>} />
          <Route path="*" element={<PageWrapper><NotFoundPage /></PageWrapper>} />
        </Routes>
        <Footer />
        <BackToTopButton />
      </div>
    </Router>
  );
}

function HomePage() {
  return (
    <div>
      <SEO 
        title="Executive Leadership Network & Advisory"
        description="Join 2,000+ senior executives in peer-to-peer leadership networks. Expert advisory services for C-suite leaders focused on the human factor in leadership."
      />
      <NewHero />
      <NewStatsSection />
      <NewWhatWeDoSection />
      <NewAboutSection />
      <NewContentLibrarySection />
      <VideoQuoteSection />
      <NewsroomSliderSection />
      <ImageSliderSection />
    </div>
  );
}

// Home 2 Page - Full version with all sections
export default App;