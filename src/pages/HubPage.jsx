import { motion } from "framer-motion";
import Navbar from "../components/ui/Navbar";
import AppGrid from "../components/ui/AppGrid";

export default function HubPage() {
  return (
    <div className="min-h-screen font-sans selection:bg-brand-teal/20 flex flex-col relative">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 pt-32 pb-20 flex flex-col items-center">
        
        {/* Hero Section */}
        <section className="w-full text-center py-20 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-6 inline-flex items-center justify-center w-24 h-24 rounded-full bg-white shadow-xl shadow-brand-navy/5 border border-brand-navy/5"
          >
            <img src="/logo.svg" alt="Точилка" className="w-14 h-14" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-5xl sm:text-7xl font-black text-brand-navy tracking-tight mb-4"
          >
            ТОЧИЛКА
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="text-xl sm:text-2xl text-brand-teal font-bold tracking-widest uppercase mb-12"
          >
            Передовая образовательная экосистема
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
            className="text-4xl sm:text-6xl text-brand-crimson"
            style={{ fontFamily: "var(--font-family-cursive)" }}
          >
            Сделаем острыми детские умы
          </motion.h2>
        </section>

        {/* Ecosystem Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full py-16"
        >
          <div className="flex flex-col items-center mb-16">
            <h3 className="text-3xl font-extrabold text-brand-navy mb-4">
              Наши инструменты
            </h3>
            <div className="w-16 h-1 bg-brand-teal rounded-full" />
          </div>
          
          <AppGrid />
        </motion.section>

      </main>

      <footer className="w-full py-8 mt-auto border-t border-brand-navy/10 bg-white/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between text-sm font-semibold text-brand-navy/40 uppercase tracking-wider">
          <p>© {new Date().getFullYear()} Точилка</p>
          <a href="/privacy" className="hover:text-brand-navy/70 transition-colors mt-4 sm:mt-0">
            Конфиденциальность
          </a>
        </div>
      </footer>
    </div>
  );
}
