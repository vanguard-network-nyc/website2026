import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App";
import { reportWebVitals } from "./webVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
);

// Report Web Vitals - logs in development, can send to analytics in production
reportWebVitals((metric) => {
  // In production, you can send to analytics:
  // sendToAnalytics(metric);
  
  // For now, just log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vitals]', metric);
  }
});
