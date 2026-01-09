import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEO = ({ 
  title, 
  description, 
  image = 'https://customer-assets.emergentagent.com/job_4fab1a4c-02f5-469e-a1ed-d1849b158ebf/artifacts/h5eblom2_hero.png',
  type = 'website',
  noindex = false
}) => {
  const location = useLocation();
  const siteName = 'The Vanguard Network';
  const siteUrl = 'https://thevanguardnetwork.com';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const canonicalUrl = `${siteUrl}${location.pathname}`;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Canonical URL - Prevents duplicate content issues */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots directive */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO Tags */}
      <meta name="author" content="The Vanguard Network" />
      <meta name="publisher" content="The Vanguard Network" />
    </Helmet>
  );
};

export default SEO;
