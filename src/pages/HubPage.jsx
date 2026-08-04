import { useEffect, useRef } from "react";
import {
  CalendarDays,
  Wallet,
  Users,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import GlassGear from "../components/GlassGear.jsx";

/* ─── Scroll Reveal Hook ─── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    const els = ref.current?.querySelectorAll(".reveal");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ─── Feature Data ─── */
const features = [
  {
    id: "schedule",
    icon: CalendarDays,
    title: "Умное расписание",
    text: "Недельный и месячный вид, перетаскивание уроков, статусы и напоминания. Видно, кто пришёл, кто заплатил, кто сделал домашку.",
    image: "/feature_schedule.jpg",
    bullets: [
      "Неделя, месяц и день — в одном клике",
      "Drag-and-drop перенос уроков",
      "Статусы оплаты и домашней работы",
    ],
  },
  {
    id: "finance",
    icon: Wallet,
    title: "Финансы под контролем",
    text: "Автоматический учёт доходов, долгов и авансов. Знайте, сколько заработали в этом месяце — без Excel.",
    image: "/feature_finance.jpg",
    bullets: [
      "Доходы, долги и авансы в реальном времени",
      "Аналитика по ученикам и периодам",
      "Никаких Excel-таблиц и блокнотов",
    ],
  },
  {
    id: "students",
    icon: Users,
    title: "Всё о каждом ученике",
    text: "Карточки с предметами, программами и историей. Автоматические отчёты для родителей. Гостевой доступ по ссылке.",
    image: "/feature_students.jpg",
    bullets: [
      "Профиль, предметы и программы обучения",
      "Готовые отчёты для родителей в 1 клик",
      "Гостевой портал по ссылке",
    ],
  },
];

/* ─── Pain → Solution Data ─── */
const painSolution = [
  {
    pain: "3 блокнота",
    painIcon: "📒",
    solution: "1 приложение",
    solutionIcon: "📱",
  },
  {
    pain: "Excel-таблицы",
    painIcon: "📊",
    solution: "Автоматический учёт",
    solutionIcon: "💰",
  },
  {
    pain: "Чаты с родителями",
    painIcon: "💬",
    solution: "Готовые отчёты",
    solutionIcon: "📋",
  },
];

/* ─── Roadmap Data ─── */
const roadmap = [
  { name: "Идеальная Тетрадь", icon: "/icon_notebook.jpg" },
  { name: "Разлиновка", icon: "/icon_lines.jpg" },
  { name: "Умный Таймер", icon: "/icon_timer.jpg" },
  { name: "Устный Счёт", icon: "/icon_math.jpg" },
];

/* ─── Components ─── */

function Nav() {
  return (
    <nav className="relative z-20 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
      <a href="/" className="flex items-center gap-3 group">
        <img
          src="/logo.svg"
          alt="Точилка"
          className="w-12 h-12 md:w-14 md:h-14 transition-transform group-hover:scale-105"
        />
        <span className="font-extrabold text-xl md:text-2xl text-brand-teal tracking-tight hidden sm:block">
          ТОЧИЛКА
        </span>
      </a>

      <div className="hidden lg:flex items-center gap-10 font-bold text-[13px] tracking-widest text-brand-teal/70">
        <a href="#features" className="hover:text-brand-teal transition-colors">
          ВОЗМОЖНОСТИ
        </a>
        <a href="#about" className="hover:text-brand-teal transition-colors">
          О НАС
        </a>
        <a href="#contact" className="hover:text-brand-teal transition-colors">
          КОНТАКТЫ
        </a>
      </div>

      <a
        href="https://tutor.tochilka.app"
        className="bg-brand-teal hover:bg-brand-teal/85 text-white px-7 py-2.5 rounded-full font-bold text-sm tracking-wide transition-all shadow-[0_4px_14px_0_rgba(0,101,132,0.35)] hover:shadow-[0_6px_20px_rgba(0,101,132,0.25)] hover:-translate-y-0.5"
      >
        ВХОД
      </a>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-8 pb-20 md:pt-16 md:pb-28 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
      <div className="flex-1 max-w-2xl reveal">
        <div className="inline-flex items-center gap-2 bg-brand-teal/8 text-brand-teal px-4 py-1.5 rounded-full text-[13px] font-semibold tracking-wide mb-6">
          <Sparkles size={14} />
          Бесплатно для репетиторов
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-[58px] leading-[1.12] font-black text-brand-navy mb-6 tracking-tight">
          Все&nbsp;ученики, расписание и&nbsp;финансы&nbsp;—{" "}
          <span className="text-brand-teal">в&nbsp;одном месте</span>
        </h1>
        <p className="text-lg md:text-xl text-brand-navy/65 mb-10 max-w-xl font-medium leading-relaxed">
          Цифровой ежедневник для репетиторов. Замените блокноты, таблицы
          и&nbsp;чаты на один удобный инструмент.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="https://tutor.tochilka.app?demo=true"
            className="inline-flex items-center gap-2 bg-brand-crimson hover:bg-brand-crimson-dark text-white px-8 py-4 rounded-full font-bold text-[15px] tracking-wide transition-all shadow-[0_8px_24px_-6px_rgba(183,18,52,0.5)] hover:shadow-[0_12px_28px_-6px_rgba(183,18,52,0.4)] hover:-translate-y-1"
          >
            ПОПРОБОВАТЬ БЕСПЛАТНО
            <ArrowRight size={18} />
          </a>
        </div>
      </div>

      <div className="flex-1 relative flex justify-center items-center w-full max-w-md lg:max-w-xl reveal reveal-delay-2">
        <GlassGear />
      </div>
    </section>
  );
}

function FeatureBlock({ feature, index }) {
  const Icon = feature.icon;
  const reversed = index % 2 !== 0;

  return (
    <div
      className={`flex flex-col ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-10 lg:gap-16 reveal`}
    >
      {/* Text */}
      <div className="flex-1 max-w-lg">
        <div className="w-12 h-12 rounded-2xl bg-brand-teal/8 flex items-center justify-center mb-5">
          <Icon size={24} className="text-brand-teal" strokeWidth={1.8} />
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy mb-4 tracking-tight">
          {feature.title}
        </h2>
        <p className="text-lg text-brand-navy/60 mb-6 leading-relaxed font-medium">
          {feature.text}
        </p>
        <ul className="space-y-3">
          {feature.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3 text-brand-navy/75 font-medium">
              <ChevronRight
                size={18}
                className="text-brand-crimson mt-0.5 flex-shrink-0"
              />
              {b}
            </li>
          ))}
        </ul>
      </div>

      {/* Image */}
      <div className="flex-1 w-full max-w-xl">
        <div className="relative group">
          <div className="absolute -inset-3 bg-gradient-to-br from-brand-teal/10 to-brand-crimson/5 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <img
            src={feature.image}
            alt={feature.title}
            className="relative w-full h-auto rounded-2xl shadow-[0_20px_50px_-16px_rgba(0,40,69,0.15)] border border-white/80 transition-transform duration-500 group-hover:-translate-y-1"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

function Features() {
  return (
    <section
      id="features"
      className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 md:py-28 space-y-24 md:space-y-32"
    >
      {features.map((f, i) => (
        <FeatureBlock key={f.id} feature={f} index={i} />
      ))}
    </section>
  );
}

function PainSolution() {
  return (
    <section
      id="about"
      className="relative z-10 w-full max-w-5xl mx-auto px-6 py-20 md:py-28"
    >
      <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy text-center mb-4 tracking-tight reveal">
        Замените хаос на систему
      </h2>
      <p className="text-lg text-brand-navy/55 text-center mb-14 font-medium reveal reveal-delay-1">
        Всё, что раньше отнимало время, теперь работает само
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {painSolution.map((item, i) => (
          <div
            key={i}
            className={`reveal reveal-delay-${i + 1} bg-white rounded-3xl p-8 shadow-[0_8px_32px_-12px_rgba(0,40,69,0.08)] border border-brand-navy/[0.04] hover:shadow-[0_16px_40px_-12px_rgba(0,40,69,0.12)] transition-all duration-300 hover:-translate-y-1`}
          >
            {/* Pain */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-brand-navy/[0.06]">
              <span className="text-3xl">{item.painIcon}</span>
              <div>
                <p className="text-xs font-bold text-brand-navy/35 uppercase tracking-widest mb-0.5">
                  Было
                </p>
                <p className="text-lg font-bold text-brand-navy/70 line-through decoration-brand-crimson/40 decoration-2">
                  {item.pain}
                </p>
              </div>
            </div>
            {/* Solution */}
            <div className="flex items-center gap-3">
              <span className="text-3xl">{item.solutionIcon}</span>
              <div>
                <p className="text-xs font-bold text-brand-teal/60 uppercase tracking-widest mb-0.5">
                  Стало
                </p>
                <p className="text-lg font-extrabold text-brand-navy">
                  {item.solution}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function DemoCTA() {
  return (
    <section className="relative z-10 w-full max-w-4xl mx-auto px-6 py-20 md:py-24">
      <div className="reveal relative bg-gradient-to-br from-brand-navy to-brand-teal rounded-[2.5rem] p-10 md:p-16 text-center overflow-hidden">
        {/* Decorative orbs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-crimson/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
            Попробуйте прямо сейчас
          </h2>
          <p className="text-lg text-white/65 mb-10 max-w-lg mx-auto font-medium leading-relaxed">
            Запустите демо-режим с готовыми данными — без регистрации
            и&nbsp;обязательств.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://tutor.tochilka.app?demo=true"
              className="inline-flex items-center gap-2 bg-brand-crimson hover:bg-brand-crimson-dark text-white px-8 py-4 rounded-full font-bold text-[15px] tracking-wide transition-all shadow-[0_8px_24px_-6px_rgba(183,18,52,0.5)] hover:shadow-[0_12px_28px_-6px_rgba(183,18,52,0.4)] hover:-translate-y-1"
            >
              ЗАПУСТИТЬ ДЕМО
              <ArrowUpRight size={18} />
            </a>
            <a
              href="https://tutor.tochilka.app"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold text-[15px] tracking-wide transition-all border border-white/20 hover:-translate-y-0.5"
            >
              СОЗДАТЬ АККАУНТ
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Roadmap() {
  return (
    <section className="relative z-10 w-full max-w-5xl mx-auto px-6 py-16 md:py-20">
      <h3 className="text-center text-sm font-bold text-brand-navy/30 uppercase tracking-[0.2em] mb-10 reveal">
        Скоро в экосистеме
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {roadmap.map((item, i) => (
          <div
            key={item.name}
            className={`reveal reveal-delay-${i + 1} flex flex-col items-center text-center group`}
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden mb-4 shadow-[0_8px_24px_-8px_rgba(0,40,69,0.12)] border border-white/60 bg-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_12px_28px_-8px_rgba(0,40,69,0.16)]">
              <img
                src={item.icon}
                alt={item.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <p className="text-sm font-bold text-brand-navy/50 tracking-wide">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative z-10 w-full max-w-3xl mx-auto px-6 py-16 md:py-20 text-center reveal">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy mb-4 tracking-tight">
        Готовы навести порядок?
      </h2>
      <p className="text-lg text-brand-navy/55 mb-8 font-medium">
        Начните бесплатно — регистрация занимает 30 секунд.
      </p>
      <a
        href="https://tutor.tochilka.app"
        className="inline-flex items-center gap-2 bg-brand-crimson hover:bg-brand-crimson-dark text-white px-10 py-4.5 rounded-full font-bold text-[15px] tracking-wide transition-all shadow-[0_8px_24px_-6px_rgba(183,18,52,0.5)] hover:shadow-[0_12px_28px_-6px_rgba(183,18,52,0.4)] hover:-translate-y-1"
      >
        НАЧАТЬ БЕСПЛАТНО
        <ArrowRight size={18} />
      </a>
    </section>
  );
}

function Footer() {
  return (
    <footer
      id="contact"
      className="relative z-10 w-full max-w-7xl mx-auto px-6 py-10 border-t border-brand-navy/[0.06]"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6 text-xs font-semibold text-brand-navy/35 uppercase tracking-wider">
          <p>© {new Date().getFullYear()} Точилка</p>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-brand-navy/35 uppercase tracking-wider">
          <a href="/privacy" className="hover:text-brand-navy/60 transition-colors">
            Конфиденциальность
          </a>
          <a href="/terms" className="hover:text-brand-navy/60 transition-colors">
            Оферта
          </a>
          <a href="/consent" className="hover:text-brand-navy/60 transition-colors">
            Согласие ПД
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ─── */
export default function HubPage() {
  const pageRef = useReveal();

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-bg-page font-sans overflow-x-hidden relative flex flex-col"
    >
      {/* Background orbs */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-white/50 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/4" />
      <div className="absolute top-[40%] left-0 w-[500px] h-[500px] bg-brand-teal/[0.04] rounded-full blur-[100px] pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-[20%] right-0 w-[400px] h-[400px] bg-brand-crimson/[0.03] rounded-full blur-[80px] pointer-events-none translate-x-1/3" />

      <Nav />
      <Hero />
      <Features />
      <PainSolution />
      <DemoCTA />
      <Roadmap />
      <FinalCTA />
      <Footer />
    </div>
  );
}
