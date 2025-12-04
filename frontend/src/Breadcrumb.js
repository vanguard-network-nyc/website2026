import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbNameMap = {
    'advisory': 'Advisory',
    'programs': 'Programs',
    'networking': 'Networking',
    'case-studies': 'Case Studies',
    'contact': 'Contact',
    'team': 'Team',
    'upcoming-events': 'Events',
    'content': 'Content',
    'articles': 'Articles',
    'article': 'Article',
    'podcasts': 'Podcasts',
    'podcast': 'Podcast',
    'videos': 'Videos',
    'video': 'Video',
    'newsroom': 'Newsroom',
    'in-the-press': 'In The Press'
  };

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6">
      <Link
        to="/"
        className="flex items-center text-slate-600 hover:text-[#045184] transition-colors duration-200"
      >
        <Home size={16} />
      </Link>
      
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const displayName = breadcrumbNameMap[value] || value;

        return (
          <React.Fragment key={to}>
            <ChevronRight size={16} className="text-slate-400" />
            {last ? (
              <span className="text-[#045184] font-semibold">{displayName}</span>
            ) : (
              <Link
                to={to}
                className="text-slate-600 hover:text-[#045184] transition-colors duration-200"
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
