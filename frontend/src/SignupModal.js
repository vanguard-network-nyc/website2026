import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

/**
 * Generic modal shell for event sign-up forms. The actual form body is rendered
 * as children. This component handles: backdrop, close (X / click-outside / Esc),
 * body-scroll lock, and framer-motion in/out animations.
 */
const SignupModal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-start md:items-center justify-center overflow-y-auto p-4 md:p-8"
          onClick={onClose}
          data-testid="signup-modal-backdrop"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl relative my-8"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={title || 'Sign up'}
            data-testid="signup-modal"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors z-10"
              aria-label="Close"
              data-testid="signup-modal-close"
            >
              <X size={22} />
            </button>
            {title && (
              <div className="px-6 md:px-10 pt-8 pb-2">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900" style={{ color: '#045184' }}>
                  {title}
                </h2>
              </div>
            )}
            <div className="px-6 md:px-10 pb-8">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SignupModal;
