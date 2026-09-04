import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import FloatingIcons from '../components/ui/FloatingIcons';
import AuthModal from '../components/ui/AuthModal';

export default function LandingPage() {
  const [authOpen, setAuthOpen] = useState(false);
  const { refreshUser } = useAuth();

  return (
    <div className="min-h-screen relative overflow-x-hidden font-sans bg-bg-page selection:bg-brand-teal/20 flex flex-col">
      <FloatingIcons />

      {/* ─── Header (Cursive Tagline) ─── */}
      <header className="absolute top-0 left-0 right-0 z-40 w-full pt-8 px-6 text-center">
        <p
          className="text-2xl md:text-3xl text-brand-crimson/80"
          style={{ fontFamily: 'var(--font-family-cursive)' }}
        >
          Сделаем острыми детские умы
        </p>
      </header>

      {/* ─── Hero ─── */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-20 pb-16">
        
        {/* Big Centered Brand */}
        <div className="flex items-center justify-center gap-3 md:gap-4 mb-8 md:mb-12">
          <img
            src="/logo.svg"
            alt="Логотип Точилка"
            className="w-12 h-12 md:w-16 md:h-16 animate-[spin_30s_linear_infinite]"
          />
          <span className="font-extrabold text-4xl md:text-5xl lg:text-6xl text-brand-teal tracking-tight uppercase">
            ТОЧИЛКА
          </span>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 text-xs md:text-sm font-bold text-brand-teal tracking-wide">
          <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
          ПЕРЕДОВАЯ ОБРАЗОВАТЕЛЬНАЯ ЭКОСИСТЕМА
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-navy mb-8 tracking-tight leading-[1.15]">
          Всё для работы и учебы
          <br className="hidden sm:block" />
          {' '}в одном месте
        </h1>

        <p className="text-lg md:text-xl text-brand-navy/50 max-w-xl mx-auto font-medium leading-relaxed mb-10">
          Единая платформа полезных инструментов. Управляйте расписанием,
          создавайте учебные материалы и экономьте время.
        </p>

        <button
          onClick={() => setAuthOpen(true)}
          className="bg-brand-teal hover:bg-brand-teal/85 text-white px-12 py-5 rounded-full font-bold text-xl tracking-wide transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-3 mt-4"
        >
          Начать работу
          <ArrowRight size={24} />
        </button>
      </main>

      {/* ─── Footer ─── */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 border-t border-brand-navy/[0.06]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-xs font-semibold text-brand-navy/30 uppercase tracking-wider">
            © {new Date().getFullYear()} Точилка
          </p>
          <div className="flex gap-6 text-xs font-semibold text-brand-navy/30 uppercase tracking-wider">
            <Link to="/privacy" className="hover:text-brand-navy/50 transition-colors">
              Конфиденциальность
            </Link>
            <Link to="/terms" className="hover:text-brand-navy/50 transition-colors">
              Оферта
            </Link>
          </div>
        </div>
      </footer>

      {authOpen && (
        <AuthModal
          isOpen={authOpen}
          onClose={() => setAuthOpen(false)}
          onLoginSuccess={refreshUser}
        />
      )}
    </div>
  );
}
