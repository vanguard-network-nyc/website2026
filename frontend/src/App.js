import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import Components from './components';
import ProgramsV2 from './ProgramsV2';
import UpcomingEventsPage from './UpcomingEventsPage';
import AboutPage from './AboutPage';

const {
  Header,
  Hero,
  ServicesSection,
  TestimonnialSection,
  VideoTestimonial,
  ProgramsSection,
  Footer,
  AboutPage,
  AdvisoryPage,
  NetworkingPage,
  ProgramsPage,
  TeamPage,
  ContactPage,
  BookPage,
  ContentPage
} = Components;

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/advisory" element={<AdvisoryPage />} />
            <Route path="/networking" element={<NetworkingPage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/programs-v2" element={<ProgramsV2 />} />
            <Route path="/upcoming-events" element={<UpcomingEventsPage />} />
            <Route path="/content" element={<ContentPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/book" element={<BookPage />} />
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
      <Hero />
      <ServicesSection />
      <TestimonnialSection />
      <VideoTestimonial />
      <ProgramsSection />
    </motion.div>
  );
}

export default App;