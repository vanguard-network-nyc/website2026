import { useEffect } from 'react';

/**
 * Custom hook to inject Article schema JSON-LD into the page
 * This bypasses react-helmet-async limitations with script injection
 */
const useArticleSchema = (article, options = {}) => {
  useEffect(() => {
    if (!article) return;

    const siteName = 'The Vanguard Network';
    const siteUrl = 'https://thevanguardnetwork.com';
    const canonicalUrl = `${siteUrl}${window.location.pathname}`;

    // Build the Article schema
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": options.title || article.blog_title || article.title || article.vimeo_name,
      "description": options.description || article.description_teaser || article.description || article.vimeo_long_description || '',
      "image": options.image || article.photo || article.thumbnail || article.headshot,
      "url": canonicalUrl,
      "publisher": {
        "@type": "Organization",
        "name": siteName,
        "url": siteUrl,
        "logo": {
          "@type": "ImageObject",
          "url": "https://thevanguardnetwork.com/logo.png"
        }
      },
      "author": {
        "@type": "Person",
        "name": options.author || article.featured_speaker_linkedin || article.featured_speaker || article.featured_speakers || 'The Vanguard Network'
      },
      "datePublished": options.datePublished || article.publish_by || article.published_to_web || new Date().toISOString(),
      "dateModified": options.dateModified || article.publish_by || article.published_to_web || new Date().toISOString(),
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonicalUrl
      },
      "inLanguage": "en-US"
    };

    // Clean undefined values
    Object.keys(articleSchema).forEach(key => {
      if (articleSchema[key] === undefined || articleSchema[key] === '') {
        delete articleSchema[key];
      }
    });

    // Create and inject the script element
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-article-schema', 'true');
    script.textContent = JSON.stringify(articleSchema, null, 2);
    
    // Remove any existing article schema script first
    const existing = document.querySelector('script[data-article-schema]');
    if (existing) {
      existing.remove();
    }
    
    // Append to head
    document.head.appendChild(script);

    // Cleanup on unmount
    return () => {
      const scriptToRemove = document.querySelector('script[data-article-schema]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [article, options.title, options.description, options.image, options.author, options.datePublished, options.dateModified]);
};

export default useArticleSchema;
