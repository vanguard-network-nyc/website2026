import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = ({ customTitle, lightMode = false, extraCrumbs = [] }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbNameMap = {
    'advisory': 'Advisory',
    'programs': 'Programs',
    'networks': 'Networks',
    'networking': 'Networks',
    'success-stories': 'Success Stories',
    'contact': 'Contact',
    'team': 'Team',
    'events': 'Events',
    'upcoming-events': 'Events',
    'content': 'Content',
    'articles': 'Articles',
    'article': 'Articles',
    'podcasts': 'Podcasts',
    'podcast': 'Podcasts',
    'videos': 'Videos',
    'video': 'Videos',
    'newsroom': 'Newsroom',
    'newsroom-item': 'Newsroom',
    'in-the-press': 'In The Press',
    'privacy': 'Privacy Policy',
    'terms': 'Terms of Use',
    'about': 'About',
    'book': 'Book'
  };

  // Map detail page segments to their correct parent URLs
  const breadcrumbLinkMap = {
    'article': '/articles',
    'events': '/upcoming-events',
    'podcast': '/podcasts',
    'video': '/videos',
    'newsroom-item': '/newsroom'
  };

  // Color classes based on light mode
  const textColor = lightMode ? 'text-white/80' : 'text-slate-600';
  const hoverColor = lightMode ? 'hover:text-white' : 'hover:text-[#045184]';
  const activeColor = lightMode ? 'text-white' : 'text-[#045184]';
  const chevronColor = lightMode ? 'text-white/50' : 'text-slate-400';

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6">
      <Link
        to="/"
        className={`flex items-center ${textColor} ${hoverColor} transition-colors duration-200`}
      >
        <Home size={16} />
      </Link>
      
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        
        // Use custom link if it's a detail page segment
        let to = breadcrumbLinkMap[value] || `/${pathnames.slice(0, index + 1).join('/')}`;
        
        let displayName = breadcrumbNameMap[value] || value;
        
        // If this is the last item and we have a custom title, use it
        if (last && customTitle) {
          displayName = customTitle;
        }

        // Insert any extraCrumbs BEFORE the last URL-derived crumb
        const shouldInsertExtras = last && extraCrumbs.length > 0;

        return (
          <React.Fragment key={to}>
            {shouldInsertExtras && extraCrumbs.map((c, i) => (
              <React.Fragment key={`extra-${i}`}>
                <ChevronRight size={16} className={chevronColor} />
                {c.to ? (
                  <Link to={c.to} className={`${textColor} ${hoverColor} transition-colors duration-200`}>
                    {c.name}
                  </Link>
                ) : (
                  <span className={textColor}>{c.name}</span>
                )}
              </React.Fragment>
            ))}
            <ChevronRight size={16} className={chevronColor} />
            {last ? (
              <span className={`${activeColor} font-semibold`}>{displayName}</span>
            ) : (
              <Link
                to={to}
                className={`${textColor} ${hoverColor} transition-colors duration-200`}
              >
                {displayName}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
