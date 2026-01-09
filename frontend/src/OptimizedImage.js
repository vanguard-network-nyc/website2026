import React, { useState, useRef, useEffect } from 'react';

/**
 * OptimizedImage Component
 * - Lazy loading with Intersection Observer
 * - Blur placeholder during load
 * - Explicit dimensions to prevent CLS
 * - Error handling with fallback
 */
const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false, // Set true for above-the-fold images
  placeholder = 'blur', // 'blur' or 'empty'
  objectFit = 'cover',
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return; // Skip lazy loading for priority images

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px', // Start loading 50px before image enters viewport
        threshold: 0.01
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = (e) => {
    setIsLoaded(true);
    onLoad?.(e);
  };

  const handleError = (e) => {
    setHasError(true);
    onError?.(e);
  };

  // Generate blur placeholder color based on image
  const placeholderStyle = placeholder === 'blur' ? {
    backgroundColor: '#e2e8f0',
    filter: isLoaded ? 'none' : 'blur(20px)',
    transition: 'filter 0.3s ease-out'
  } : {};

  // Fallback image for errors
  const fallbackSrc = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect fill="%23e2e8f0" width="400" height="300"/%3E%3Ctext fill="%2394a3b8" font-family="sans-serif" font-size="14" x="50%25" y="50%25" text-anchor="middle"%3EImage unavailable%3C/text%3E%3C/svg%3E';

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto',
        aspectRatio: width && height ? `${width}/${height}` : undefined
      }}
    >
      {isInView && (
        <img
          src={hasError ? fallbackSrc : src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          onLoad={handleLoad}
          onError={handleError}
          className="w-full h-full"
          style={{
            objectFit,
            ...placeholderStyle
          }}
          {...props}
        />
      )}
      {!isInView && (
        <div 
          className="w-full h-full bg-slate-200 animate-pulse"
          style={{ aspectRatio: width && height ? `${width}/${height}` : '16/9' }}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
