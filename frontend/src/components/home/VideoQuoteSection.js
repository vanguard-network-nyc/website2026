import React from 'react';
import { motion } from 'framer-motion';

const VideoQuoteSection = () => {
  const videoRef = React.useRef(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <section 
      className="py-24"
      style={{
        background: 'linear-gradient(135deg, #f8fafc, #f0f9ff)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-6 md:p-12 items-center">
          {/* Video Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-slate-900">
              <video 
                ref={videoRef}
                className="w-full h-full object-cover"
                controls
                controlsList="nodownload nofullscreen noremoteplayback"
                disablePictureInPicture
                playsInline
                poster="/ken-banta-thumbnail.jpg"
              >
                <source src="/ken-banta-welcome.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>

          {/* Quote Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <div className="relative">
              <svg className="absolute -top-6 -left-4 w-16 h-16 text-[#7f30cb] opacity-20" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <blockquote className="text-2xl md:text-3xl font-light text-slate-800 mb-8 leading-relaxed italic">
                "Our sole focus is unlocking high-performance leadership. That's why we don't take a cookie-cutter approach."
              </blockquote>
              <div>
                <p className="font-bold text-lg text-slate-900">Ken Banta</p>
                <p className="text-slate-600">Founder & CEO, The Vanguard Network</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// About Section

export default VideoQuoteSection;
