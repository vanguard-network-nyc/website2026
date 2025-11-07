import React, { useState, useEffect, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import Components from './components';
import ProgramsV2 from './ProgramsV2';
import NetworkingV2Page from './NetworkingV2Page';
import UpcomingEventsPage from './UpcomingEventsPage';
import AboutPage from './AboutPage';
import PodcastsPage from './PodcastsPage';
import PodcastDetailPage from './PodcastDetailPage';
import VideosPage from './VideosPage';
import VideoDetailPage from './VideoDetailPage';
import ArticlesPage from './ArticlesPage';
import ArticleDetailPage from './ArticleDetailPage';
import InThePressPage from './InThePressPage';
import InThePressDetailPage from './InThePressDetailPage';
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
import NewsroomArticlePage from './NewsroomArticlePage';

const {
  Header,
  Hero,
  ServicesSection,
  TestimonnialSection,
  VideoTestimonial,
  ProgramsSection,
  Footer,
  AdvisoryPage,
  NetworkingPage,
  ProgramsPage,
  TeamPage,
  ContactPage,
  BookPage,
  ContentPage,
  NewHero,
  NewStatsSection,
  NewWhatWeDoSection,
  NewAboutSection,
  SubstackPostsSection,
  NewSpecializedGroupsSection,
  NewIntegrationSection,
  NewContentLibrarySection,
  ExecutiveNetworksSection,
  LeadershipAdvisorySection
} = Components;

// ScrollToTop component must be inside Router
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Header />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home-2" element={<HomePage2 />} />
            <Route path="/advisory" element={<AdvisoryPage />} />
            <Route path="/networking" element={<NetworkingV2Page />} />
            <Route path="/networking-old" element={<NetworkingPage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/programs-v2" element={<ProgramsV2 />} />
            <Route path="/upcoming-events" element={<UpcomingEventsPage />} />
            <Route path="/content" element={<ContentPage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/article/:id" element={<ArticleDetailPage />} />
            <Route path="/podcasts" element={<PodcastsPage />} />
            <Route path="/podcast/:id" element={<PodcastDetailPage />} />
            <Route path="/videos" element={<VideosPage />} />
            <Route path="/video/:id" element={<VideoDetailPage />} />
            <Route path="/in-the-press" element={<InThePressPage />} />
            <Route path="/in-the-press/:id" element={<InThePressDetailPage />} />
            <Route path="/gc-exchange" element={<GCExchangePage />} />
            <Route path="/senior-counsel-exchange" element={<SeniorCounselExchangePage />} />
            <Route path="/next-gen-gc" element={<NextGenGCPage />} />
            <Route path="/life-sciences-ceo" element={<LifeSciencesCEOPage />} />
            <Route path="/law-associates" element={<LawAssociatesPage />} />
            <Route path="/risk-management" element={<RiskManagementPage />} />
            <Route path="/global-counsel-leaders" element={<GlobalCounselLeadersPage />} />
            <Route path="/new-leaders" element={<NewLeadersPage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/book" element={<BookPage />} />
            <Route path="/newsroom" element={<NewsroomPage />} />
            <Route path="/newsroom/:slug" element={<NewsroomArticlePage />} />
          </Routes>
        </AnimatePresence>
        <Footer />
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
      <SubstackPostsSection />
    </motion.div>
  );
}

// Home 2 Page - Full version with all sections
function HomePage2() {
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
      <SubstackPostsSection />
      <ExecutiveNetworksSection />
      <LeadershipAdvisorySection />
      <NewSpecializedGroupsSection />
      <NewIntegrationSection />
      <NewContentLibrarySection />
    </motion.div>
  );
}

export default App;