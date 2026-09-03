import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Check } from 'lucide-react';
import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function AppDetailPanel({ app, onClose }) {
  const { user } = useAuth();

  if (!app) return null;

  const { name, fullDescription, features, icon: Icon, url, color } = app;

  // Закрытие по Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Блокировка скролла фона
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-brand-navy/25 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Panel */}
        <motion.div
          className="relative bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[85vh] overflow-y-auto p-7 sm:p-8"
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.97 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-brand-navy/5 text-brand-navy/30 hover:text-brand-navy transition-colors"
            aria-label="Закрыть"
          >
            <X size={18} />
          </button>

          {/* Icon + Title */}
          <div className="flex items-center gap-3 mb-5">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-white ${color} shadow-sm`}>
              <Icon size={22} />
            </div>
            <h2 className="text-xl font-bold text-brand-navy pr-8 leading-tight">
              {name}
            </h2>
          </div>

          {/* Full description */}
          <p className="text-brand-navy/60 text-base leading-relaxed mb-6">
            {fullDescription}
          </p>

          {/* Features list */}
          {features && features.length > 0 && (
            <ul className="space-y-2.5 mb-8">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${color}`}>
                    <Check size={11} className="text-white" />
                  </div>
                  <span className="text-sm text-brand-navy/70 font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          )}

          {/* CTA Button */}
          {user ? (
            <a
              href={url}
              className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-white ${color} hover:opacity-90 transition-opacity shadow-md text-base`}
            >
              Перейти в приложение
              <ArrowRight size={18} />
            </a>
          ) : (
            <div className="text-center">
              <p className="text-brand-navy/40 text-sm mb-3">
                Войдите, чтобы открыть приложение
              </p>
              <button
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-white bg-brand-teal hover:bg-brand-teal/85 transition-colors shadow-md text-base"
              >
                Войти
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
