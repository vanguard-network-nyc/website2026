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
          className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 md:p-6"
          onClick={onClose}
          data-testid="signup-modal-backdrop"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl relative flex flex-col"
            style={{ maxHeight: 'calc(100vh - 24px)' }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={title || 'Sign up'}
            data-testid="signup-modal"
          >
            {/* Sticky header — always visible while form scrolls */}
            <div className="flex items-start justify-between px-6 md:px-8 pt-5 pb-3 border-b border-slate-100 flex-shrink-0">
              {title && (
                <h2 className="text-xl md:text-2xl font-bold pr-8" style={{ color: '#045184' }}>
                  {title}
                </h2>
              )}
              <button
                type="button"
                onClick={onClose}
                className="text-slate-400 hover:text-slate-700 transition-colors flex-shrink-0"
                aria-label="Close"
                data-testid="signup-modal-close"
              >
                <X size={22} />
              </button>
            </div>
            {/* Scrollable body */}
            <div className="px-6 md:px-8 py-4 overflow-y-auto flex-1">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SignupModal;
