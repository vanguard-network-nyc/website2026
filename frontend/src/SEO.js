import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEO = ({ 
  title, 
  description, 
  image = 'https://customer-assets.emergentagent.com/job_4fab1a4c-02f5-469e-a1ed-d1849b158ebf/artifacts/h5eblom2_hero.png',
  type = 'website',
  noindex = false,
  article = null, // For article pages: { author, datePublished, dateModified }
  breadcrumbs = null, // For breadcrumb schema: [{ name, url }]
  event = null, // For event pages: { name, startDate, endDate, location, description }
  faq = null // For FAQ: [{ question, answer }]
}) => {
  const location = useLocation();
  const siteName = 'The Vanguard Network';
  const siteUrl = 'https://thevanguardnetwork.com';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const canonicalUrl = `${siteUrl}${location.pathname}`;
  
  // WebPage Schema
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": article ? "Article" : "WebPage",
    "name": fullTitle,
    "description": description,
    "url": canonicalUrl,
    "publisher": {
      "@type": "Organization",
      "name": siteName,
      "url": siteUrl
    },
    "inLanguage": "en-US"
  };

  // Add article-specific fields
  if (article) {
    webPageSchema["@type"] = "Article";
    webPageSchema.headline = title;
    webPageSchema.image = image;
    if (article.author) {
      webPageSchema.author = {
        "@type": "Person",
        "name": article.author
      };
    }
    if (article.datePublished) {
      webPageSchema.datePublished = article.datePublished;
    }
    if (article.dateModified) {
      webPageSchema.dateModified = article.dateModified;
    }
  }

  // BreadcrumbList Schema
  const breadcrumbSchema = breadcrumbs ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  } : null;
  
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
      <meta property="og:type" content={article ? 'article' : type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      
      {/* Article-specific OG tags */}
      {article?.datePublished && (
        <meta property="article:published_time" content={article.datePublished} />
      )}
      {article?.dateModified && (
        <meta property="article:modified_time" content={article.dateModified} />
      )}
      {article?.author && (
        <meta property="article:author" content={article.author} />
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO Tags */}
      <meta name="author" content="The Vanguard Network" />
      <meta name="publisher" content="The Vanguard Network" />
      
      {/* WebPage/Article Schema */}
      <script type="application/ld+json" data-schema-type="page">
        {JSON.stringify(webPageSchema)}
      </script>
      
      {/* Breadcrumb Schema */}
      {breadcrumbSchema && (
        <script type="application/ld+json" data-schema-type="breadcrumb">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
