import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../../utils/apiClient';

export default function AppCard({ app, index }) {
  const { name, description, icon: Icon, url, isReady, color } = app;
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get('/auth/me')
      .then((data) => setUser(data.user))
      .catch(() => setUser(null));
  }, []);

  // Анимация появления карточки
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        delay: index * 0.15,
        ease: "easeOut"
      } 
    }
  };

  if (!isReady) {
    return (
      <motion.div 
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="bg-white/60 backdrop-blur-md p-8 rounded-3xl flex flex-col relative overflow-hidden opacity-60 grayscale border border-brand-navy/5 shadow-sm"
      >
        <div className="absolute top-6 right-6 text-[10px] font-bold tracking-widest uppercase bg-brand-navy/10 text-brand-navy px-3 py-1 rounded-full">
          Скоро
        </div>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-brand-navy/40 bg-brand-navy/5">
          <Icon size={28} />
        </div>
        <h3 className="text-2xl font-bold text-brand-navy/70 mb-3">{name}</h3>
        <p className="text-brand-navy/50 font-medium flex-1">{description}</p>
      </motion.div>
    );
  }

  const targetUrl = url;

  return (
    <motion.a 
      href={targetUrl}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group bg-white p-8 rounded-3xl flex flex-col relative overflow-hidden border border-brand-navy/5 shadow-lg shadow-brand-navy/5 hover:shadow-2xl hover:shadow-brand-navy/10 transition-shadow duration-500"
    >
      {/* Декоративный градиент при наведении */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-brand-navy/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white ${color} shadow-md group-hover:scale-110 transition-transform duration-500`}>
        <Icon size={32} />
      </div>
      
      <h3 className="relative z-10 text-2xl font-bold text-brand-navy mb-3 group-hover:text-brand-teal transition-colors duration-300">
        {name}
      </h3>
      <p className="relative z-10 text-brand-navy/60 font-medium flex-1 mb-8 leading-relaxed">
        {description}
      </p>

      <div className="relative z-10 flex items-center text-sm font-bold tracking-wide text-brand-teal group-hover:gap-3 gap-2 transition-all duration-300">
        {user ? 'ОТКРЫТЬ' : 'ПОДРОБНЕЕ'}
        <ArrowRight size={16} />
      </div>
    </motion.a>
  );
}
