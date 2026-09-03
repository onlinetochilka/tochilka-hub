import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function AppCard({ app, index, onSelect }) {
  const { name, description, icon: Icon, isReady, color } = app;
  const { user } = useAuth();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.06,
        ease: 'easeOut',
      },
    },
  };

  if (!isReady) {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-30px' }}
        className="bg-white/60 backdrop-blur-sm p-5 rounded-xl flex flex-col relative overflow-hidden opacity-50 grayscale border border-brand-navy/5"
      >
        <div className="absolute top-4 right-4 text-[9px] font-bold tracking-widest uppercase bg-brand-navy/10 text-brand-navy/60 px-2.5 py-0.5 rounded-full">
          Скоро
        </div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-brand-navy/30 bg-brand-navy/5">
            <Icon size={20} />
          </div>
          <h3 className="text-base font-bold text-brand-navy/50 leading-tight">
            {name}
          </h3>
        </div>
        <p className="text-sm text-brand-navy/40 line-clamp-2 leading-relaxed">
          {description}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(app)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(app)}
      className="group bg-white p-5 rounded-xl flex flex-col relative overflow-hidden border border-brand-navy/[0.06] shadow-sm hover:shadow-md hover:border-brand-teal/30 transition-all duration-200 cursor-pointer"
    >
      {/* Header: icon + title */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${color} shadow-sm group-hover:scale-105 transition-transform duration-300`}
        >
          <Icon size={20} />
        </div>
        <h3 className="text-base font-bold text-brand-navy group-hover:text-brand-teal transition-colors duration-200 leading-tight">
          {name}
        </h3>
      </div>

      {/* Description */}
      <p className="text-sm text-brand-navy/50 font-medium line-clamp-2 leading-relaxed flex-1 mb-4">
        {description}
      </p>

      {/* Footer */}
      <div className="flex items-center text-xs font-bold tracking-wide text-brand-teal group-hover:gap-2 gap-1 transition-all duration-200">
        {user ? 'ОТКРЫТЬ' : 'ПОДРОБНЕЕ'}
        <ArrowRight size={14} />
      </div>
    </motion.div>
  );
}
