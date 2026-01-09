/**
 * Web Vitals Tracking
 * Measures Core Web Vitals: LCP, FID, CLS
 * 
 * Usage: Import and call in your app entry point
 * import { reportWebVitals } from './webVitals';
 * reportWebVitals(console.log); // or send to analytics
 */

// Core Web Vitals thresholds
const THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 }, // Largest Contentful Paint
  FID: { good: 100, needsImprovement: 300 },   // First Input Delay
  CLS: { good: 0.1, needsImprovement: 0.25 },  // Cumulative Layout Shift
  FCP: { good: 1800, needsImprovement: 3000 }, // First Contentful Paint
  TTFB: { good: 800, needsImprovement: 1800 }, // Time to First Byte
  INP: { good: 200, needsImprovement: 500 }    // Interaction to Next Paint
};

// Get rating based on value and thresholds
const getRating = (name, value) => {
  const threshold = THRESHOLDS[name];
  if (!threshold) return 'unknown';
  if (value <= threshold.good) return 'good';
  if (value <= threshold.needsImprovement) return 'needs-improvement';
  return 'poor';
};

// Report individual metric
const reportMetric = (metric, callback) => {
  const { name, value, delta, id, rating } = metric;
  
  const report = {
    name,
    value: Math.round(name === 'CLS' ? value * 1000 : value), // CLS is already a decimal
    delta: Math.round(name === 'CLS' ? delta * 1000 : delta),
    id,
    rating: rating || getRating(name, value),
    timestamp: Date.now()
  };

  if (callback) {
    callback(report);
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    const color = report.rating === 'good' ? 'green' : 
                  report.rating === 'needs-improvement' ? 'orange' : 'red';
    console.log(
      `%c[Web Vitals] ${name}: ${report.value}${name === 'CLS' ? '' : 'ms'} (${report.rating})`,
      `color: ${color}; font-weight: bold;`
    );
  }

  return report;
};

// Main export function
export const reportWebVitals = (onReport) => {
  if (typeof window === 'undefined') return;

  // Use web-vitals library if available, otherwise use native APIs
  import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB, onINP }) => {
    onCLS((metric) => reportMetric(metric, onReport));
    onFID((metric) => reportMetric(metric, onReport));
    onFCP((metric) => reportMetric(metric, onReport));
    onLCP((metric) => reportMetric(metric, onReport));
    onTTFB((metric) => reportMetric(metric, onReport));
    onINP((metric) => reportMetric(metric, onReport));
  }).catch(() => {
    // Fallback: Use Performance Observer API
    console.log('[Web Vitals] Using fallback Performance Observer');
    
    // Observe LCP
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          reportMetric({
            name: 'LCP',
            value: lastEntry.startTime,
            delta: lastEntry.startTime,
            id: 'lcp-' + Date.now()
          }, onReport);
        });
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

        // Observe CLS
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
        });
        clsObserver.observe({ type: 'layout-shift', buffered: true });

        // Report CLS on page hide
        window.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'hidden') {
            reportMetric({
              name: 'CLS',
              value: clsValue,
              delta: clsValue,
              id: 'cls-' + Date.now()
            }, onReport);
          }
        });

        // Observe FID
        const fidObserver = new PerformanceObserver((list) => {
          const firstInput = list.getEntries()[0];
          if (firstInput) {
            reportMetric({
              name: 'FID',
              value: firstInput.processingStart - firstInput.startTime,
              delta: firstInput.processingStart - firstInput.startTime,
              id: 'fid-' + Date.now()
            }, onReport);
          }
        });
        fidObserver.observe({ type: 'first-input', buffered: true });
      } catch (e) {
        console.warn('[Web Vitals] Performance Observer not fully supported');
      }
    }
  });
};

// Send metrics to analytics endpoint
export const sendToAnalytics = (metric) => {
  // Example: Send to your analytics endpoint
  const body = JSON.stringify({
    ...metric,
    url: window.location.href,
    userAgent: navigator.userAgent
  });

  // Use sendBeacon for reliability
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/analytics/vitals', body);
  } else {
    fetch('/api/analytics/vitals', {
      body,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true
    });
  }
};

export default reportWebVitals;
