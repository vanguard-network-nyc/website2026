import React from 'react';

const ImageSliderSection = () => {
  const sliderImages = [
    "https://customer-assets.emergentagent.com/job_4fab1a4c-02f5-469e-a1ed-d1849b158ebf/artifacts/jkpjmgxx_1.jpeg",
    "https://customer-assets.emergentagent.com/job_4fab1a4c-02f5-469e-a1ed-d1849b158ebf/artifacts/n8bhxx14_2.jpg",
    "https://customer-assets.emergentagent.com/job_4fab1a4c-02f5-469e-a1ed-d1849b158ebf/artifacts/a1pjtqe1_3.jpg",
    "https://customer-assets.emergentagent.com/job_4fab1a4c-02f5-469e-a1ed-d1849b158ebf/artifacts/z2y5xxfu_4.jpg",
    "https://customer-assets.emergentagent.com/job_4fab1a4c-02f5-469e-a1ed-d1849b158ebf/artifacts/52zrcx3f_5.jpeg",
    "https://customer-assets.emergentagent.com/job_4fab1a4c-02f5-469e-a1ed-d1849b158ebf/artifacts/lfjanqfw_6.jpeg",
    "https://customer-assets.emergentagent.com/job_4fab1a4c-02f5-469e-a1ed-d1849b158ebf/artifacts/gnpe1htz_7.jpeg",
    "https://customer-assets.emergentagent.com/job_4fab1a4c-02f5-469e-a1ed-d1849b158ebf/artifacts/tn01u7ph_8.jpeg",
    "https://customer-assets.emergentagent.com/job_4fab1a4c-02f5-469e-a1ed-d1849b158ebf/artifacts/gfpvvoao_9.jpg",
    "https://customer-assets.emergentagent.com/job_4fab1a4c-02f5-469e-a1ed-d1849b158ebf/artifacts/rnqxpk76_10.jpeg",
    "https://customer-assets.emergentagent.com/job_4fab1a4c-02f5-469e-a1ed-d1849b158ebf/artifacts/b5ar2pk4_11.jpg",
    "https://customer-assets.emergentagent.com/job_4fab1a4c-02f5-469e-a1ed-d1849b158ebf/artifacts/ig92lkos_12.jpg",
    "https://customer-assets.emergentagent.com/job_4fab1a4c-02f5-469e-a1ed-d1849b158ebf/artifacts/od3u3t8j_13.jpeg",
    "https://customer-assets.emergentagent.com/job_4fab1a4c-02f5-469e-a1ed-d1849b158ebf/artifacts/otu490nv_14.jpg",
    "https://customer-assets.emergentagent.com/job_4fab1a4c-02f5-469e-a1ed-d1849b158ebf/artifacts/0350c8bf_15.jpeg",
    "https://customer-assets.emergentagent.com/job_4fab1a4c-02f5-469e-a1ed-d1849b158ebf/artifacts/a457e65m_16.jpg",
    "https://customer-assets.emergentagent.com/job_4fab1a4c-02f5-469e-a1ed-d1849b158ebf/artifacts/mepgjo2i_17.jpeg",
    "https://customer-assets.emergentagent.com/job_4fab1a4c-02f5-469e-a1ed-d1849b158ebf/artifacts/kzk7a0uj_18.jpeg",
    "https://customer-assets.emergentagent.com/job_4fab1a4c-02f5-469e-a1ed-d1849b158ebf/artifacts/vuxecvei_19.jpeg",
    "https://customer-assets.emergentagent.com/job_4fab1a4c-02f5-469e-a1ed-d1849b158ebf/artifacts/54l17ktd_20.jpeg"
  ];

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="slider-container">
        <div className="slider-track">
          {/* First set of images */}
          {sliderImages.map((src, index) => (
            <div key={`first-${index}`} className="slider-slide">
              <img 
                src={src} 
                alt={`Leadership event ${index + 1}`}
                className="slider-image"
                loading="lazy"
                decoding="async"
                width="400"
                height="300"
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {sliderImages.map((src, index) => (
            <div key={`second-${index}`} className="slider-slide">
              <img 
                src={src} 
                alt={`Leadership event ${index + 1}`}
                className="slider-image"
                loading="lazy"
                decoding="async"
                width="400"
                height="300"
              />
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .slider-container {
          width: 100%;
          overflow: hidden;
        }
        .slider-track {
          display: flex;
          width: calc(416px * 40);
          animation: scroll 60s linear infinite;
        }
        .slider-slide {
          flex-shrink: 0;
          width: 400px;
          height: 300px;
          padding: 0 8px;
        }
        .slider-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
        }
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-416px * 20));
          }
        }
        @media (max-width: 768px) {
          .slider-track {
            width: calc(296px * 40);
          }
          .slider-slide {
            width: 280px;
            height: 210px;
          }
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-296px * 20));
            }
          }
        }
      `}</style>
    </section>
  );
};



export default ImageSliderSection;
