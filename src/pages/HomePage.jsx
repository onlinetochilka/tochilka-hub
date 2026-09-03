import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Target, Clock, Shield, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AppGrid from '../components/ui/AppGrid';

const values = [
  {
    icon: Target,
    title: 'Сделано практиками',
    text: 'Никаких оторванных от жизни функций. Каждый генератор, трекер или планер решает конкретную задачу, с которой преподаватели сталкиваются каждый день.',
    color: 'text-brand-teal',
  },
  {
    icon: Clock,
    title: 'Свободные вечера',
    text: 'Создание прописей, линованных листов, карточек и учет оплат теперь занимает пару кликов. Мы автоматизировали процессы, которые раньше отнимали часы.',
    color: 'text-amber-500',
  },
  {
    icon: Shield,
    title: 'Всё под замком',
    text: 'Данные ваших учеников, списки классов и финансовая статистика хранятся в строгой секретности. Никто, кроме вас, не имеет к ним доступа.',
    color: 'text-emerald-500',
  },
  {
    icon: Sparkles,
    title: 'Живая платформа',
    text: 'Экосистема постоянно пополняется новыми инструментами. Мы регулярно обновляем функционал, ориентируясь на реальные запросы.',
    color: 'text-brand-crimson',
  },
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Доброе утро';
  if (hour >= 12 && hour < 18) return 'Добрый день';
  if (hour >= 18 && hour < 23) return 'Добрый вечер';
  return 'Доброй ночи';
}

export default function HomePage() {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState('');
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  return (
    <div className="flex-1 flex flex-col px-6 lg:px-10 py-6 lg:py-8 w-full">
      {/* ─── Greeting ─── */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-brand-navy mb-1">
          {greeting}{user?.name ? `, ${user.name}` : ''}!
        </h1>
        <p
          className="text-xl text-brand-crimson/70"
          style={{ fontFamily: 'var(--font-family-cursive)' }}
        >
          Сделаем острыми детские умы
        </p>
      </div>

      {/* ─── Onboarding Banner ─── */}
      {showBanner && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-navy to-brand-teal p-6 md:p-8 mb-10 shadow-md flex gap-4 pr-12 group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          
          <button 
            onClick={() => setShowBanner(false)}
            className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-1.5 rounded-full"
            title="Закрыть приветствие"
          >
            <X size={18} />
          </button>

          <div className="relative z-10">
            <h2 className="text-lg font-bold text-white mb-2">Добро пожаловать в Точилку</h2>
            <p className="text-sm text-white/80 leading-relaxed max-w-4xl">
              Эта платформа создавалась не абстрактными разработчиками, а практиками. 
              Мы прекрасно знаем, сколько сил съедает подготовка раздаточных материалов, составление расписаний и бумажная рутина. 
              «Точилка» забирает эту механическую работу на себя, чтобы у вас оставалось больше времени на самое главное — на учеников. И на свободные вечера.
            </p>
          </div>
        </div>
      )}

      {/* ─── Tools Grid ─── */}
      <div className="mb-16">
        <h2 className="text-sm font-bold text-brand-navy/40 uppercase tracking-wider mb-5 px-1">
          Каталог инструментов
        </h2>
        <AppGrid />
      </div>

      {/* ─── Quiet Values (Footer Area) ─── */}
      <div className="mt-auto pt-8 border-t border-brand-navy/[0.04]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-1 mb-10">
          {values.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex flex-col gap-2">
                <div className={`flex items-center gap-2 ${item.color}`}>
                  <Icon size={18} strokeWidth={2.5} />
                  <h3 className="text-sm font-bold text-brand-navy">{item.title}</h3>
                </div>
                <p className="text-xs text-brand-navy/50 leading-relaxed font-medium">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* ─── Actual Footer Links ─── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-1">
          <p className="text-[11px] font-semibold text-brand-navy/25 uppercase tracking-wider">
            © {new Date().getFullYear()} Точилка
          </p>
          <div className="flex gap-5 text-[11px] font-semibold text-brand-navy/25 uppercase tracking-wider">
            <Link to="/privacy" className="hover:text-brand-navy/40 transition-colors">
              Конфиденциальность
            </Link>
            <Link to="/terms" className="hover:text-brand-navy/40 transition-colors">
              Оферта
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
