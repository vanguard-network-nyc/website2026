import React, { useEffect, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Components from './components';
import SEO from './SEO';
import ProgramsV2 from './ProgramsV2';
import ProgramPage from './ProgramPage';
import NetworkPage from './NetworkPage';
import NetworkingV2Page from './NetworkingV2Page';
import UpcomingEventsPage from './UpcomingEventsPage';
import PastEventsPage from './PastEventsPage';
import EventDetailsPage from './EventDetailsPage';
import NotFoundPage from './NotFoundPage';
import PodcastsPage from './PodcastsPage';
import PodcastDetailPage from './PodcastDetailPage';
import VideosPage from './VideosPage';
import VideoDetailPage from './VideoDetailPage';
import ArticlesPage from './ArticlesPage';
import ArticleDetailPage from './ArticleDetailPage';
import GlobalCounselLeadersPage from './GlobalCounselLeadersPage';
import LSCEOGrantPage from './LSCEOGrantPage';
import LSCEOGrantRecipientsPage from './LSCEOGrantRecipientsPage';
import NominateDeclinePage from './NominateDeclinePage';
import LawAssociatesPage from './LawAssociatesPage';
import CaseStudiesPage from './CaseStudiesPage';
import NewsroomPage from './NewsroomPage';
import NewsroomDetailPage from './NewsroomDetailPage';
import MembershipApplicationPage from './MembershipApplicationPage';
import GeneralCounselAdvisoryPage from './GeneralCounselAdvisoryPage';
import PrivacyPage from './PrivacyPage';
import TermsPage from './TermsPage';
import BackToTopButton from './ScrollToTop';

// PageWrapper: Forces instant scroll to top BEFORE any paint
// This is the key fix for the page transition scroll bug
function PageWrapper({ children }) {
  const location = useLocation();
  
  // useLayoutEffect runs synchronously BEFORE the browser paints
  // This ensures scroll happens before the user sees anything
  useLayoutEffect(() => {
    // Only scroll to top if there's no hash (anchor link)
    if (!location.hash) {
      // Immediately reset scroll position using all methods
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [location.pathname, location.hash]);

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
  InTheMediaSection,
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
          <Route path="/general-counsel-advisory" element={<PageWrapper><GeneralCounselAdvisoryPage /></PageWrapper>} />
          <Route path="/networks" element={<PageWrapper><NetworkingV2Page /></PageWrapper>} />
          <Route path="/networking" element={<Navigate to="/networks" replace />} />
          <Route path="/networks/:slug" element={<PageWrapper><NetworkPage /></PageWrapper>} />
          <Route path="/programs" element={<PageWrapper><ProgramsV2 /></PageWrapper>} />
          <Route path="/programs/:slug" element={<PageWrapper><ProgramPage /></PageWrapper>} />
          <Route path="/upcoming-events" element={<PageWrapper><UpcomingEventsPage /></PageWrapper>} />
          <Route path="/past-events" element={<PageWrapper><PastEventsPage /></PageWrapper>} />
          <Route path="/events/:recordId" element={<PageWrapper><EventDetailsPage /></PageWrapper>} />
          <Route path="/past-events/:recordId" element={<PageWrapper><EventDetailsPage /></PageWrapper>} />
          <Route path="/articles" element={<PageWrapper><ArticlesPage /></PageWrapper>} />
          <Route path="/article/:id" element={<PageWrapper><ArticleDetailPage /></PageWrapper>} />
          <Route path="/podcasts" element={<PageWrapper><PodcastsPage /></PageWrapper>} />
          <Route path="/podcast/:id" element={<PageWrapper><PodcastDetailPage /></PageWrapper>} />
          <Route path="/videos" element={<PageWrapper><VideosPage /></PageWrapper>} />
          <Route path="/video/:id" element={<PageWrapper><VideoDetailPage /></PageWrapper>} />
          <Route path="/gc-exchange" element={<Navigate to="/programs/general-counsel-exchange" replace />} />
          <Route path="/senior-counsel-exchange" element={<Navigate to="/programs" replace />} />
          <Route path="/next-gen-gc-template" element={<Navigate to="/programs/next-generation-general-counsel" replace />} />
          {/* /life-sciences-ceo is now the dynamic network page — redirect the legacy static route. */}
          <Route path="/life-sciences-ceo" element={<Navigate to="/networks/life-sciences-ceo-network" replace />} />
          <Route path="/life-sciences-ceo/grant" element={<PageWrapper><LSCEOGrantPage /></PageWrapper>} />
          <Route path="/life-sciences-ceo/grant/apply" element={<PageWrapper><LSCEOGrantPage /></PageWrapper>} />
          <Route path="/life-sciences-ceo/grant/recipients" element={<PageWrapper><LSCEOGrantRecipientsPage /></PageWrapper>} />
          <Route path="/nominate/decline" element={<PageWrapper><NominateDeclinePage /></PageWrapper>} />
          <Route path="/law-associates" element={<PageWrapper><LawAssociatesPage /></PageWrapper>} />
          <Route path="/risk-management" element={<Navigate to="/programs/risk-management-exchange" replace />} />
          <Route path="/global-counsel-leaders" element={<PageWrapper><GlobalCounselLeadersPage /></PageWrapper>} />
          <Route path="/new-leaders" element={<Navigate to="/programs" replace />} />
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
      <InTheMediaSection />
      <NewContentLibrarySection />
      <VideoQuoteSection />
      <NewsroomSliderSection />
      <ImageSliderSection />
    </div>
  );
}

// Home 2 Page - Full version with all sections
export default App;