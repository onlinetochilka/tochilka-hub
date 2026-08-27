import { useEffect, useRef } from "react";
import FloatingIcons from "../components/ui/FloatingIcons";
import GlassGear from "../components/GlassGear";
import Navbar from "../components/ui/Navbar";
import AppGrid from "../components/ui/AppGrid";

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
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    const els = ref.current?.querySelectorAll(".reveal");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Hero() {
  return (
    <section className="relative w-full max-w-5xl mx-auto px-6 pt-32 pb-20 md:pt-48 md:pb-28 text-center flex flex-col items-center">
      
      {/* 3D Gear spinning subtly in the background behind the text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none -z-10 translate-y-[-10%] scale-[1.2] md:scale-100 md:translate-y-[-15%]">
        <GlassGear />
      </div>

      <div className="reveal relative z-10">
        {/* Pill Label */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 text-sm font-bold text-brand-teal tracking-wide bg-white/70 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
          ПЕРЕДОВАЯ ОБРАЗОВАТЕЛЬНАЯ ЭКОСИСТЕМА
        </div>
        
        {/* Main Title */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-brand-navy mb-8 tracking-tight leading-[1.1]">
          Всё для работы и учебы <br/>
          <span className="text-brand-teal">в одном месте</span>
        </h1>

        {/* Cursive Subtitle */}
        <h2 
          className="text-4xl sm:text-6xl text-brand-crimson mb-10"
          style={{ fontFamily: "var(--font-family-cursive)" }}
        >
          Сделаем острыми детские умы
        </h2>
        
        {/* Paragraph */}
        <p className="text-xl md:text-2xl text-brand-navy/60 max-w-2xl mx-auto font-medium leading-relaxed mb-10">
          Единая платформа полезных инструментов. Управляйте расписанием, создавайте учебные материалы и экономьте время.
        </p>
      </div>
    </section>
  );
}

function Ecosystem() {
  return (
    <section id="ecosystem" className="relative z-10 w-full px-6 py-12 md:py-20 flex justify-center bg-white/40 backdrop-blur-sm border-t border-brand-navy/[0.04]">
      <div className="reveal w-full max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-16 text-center">
            <h3 className="text-3xl font-extrabold text-brand-navy mb-4">
              Наши инструменты
            </h3>
            <div className="w-16 h-1 bg-brand-teal rounded-full" />
        </div>
        <AppGrid />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-10 mt-10 border-t border-brand-navy/[0.06] bg-transparent">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6 text-xs font-semibold text-brand-navy/40 uppercase tracking-wider">
          <p>© {new Date().getFullYear()} Точилка</p>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-brand-navy/40 uppercase tracking-wider">
          <a href="/privacy" className="hover:text-brand-navy/70 transition-colors">
            Конфиденциальность
          </a>
          <a href="/terms" className="hover:text-brand-navy/70 transition-colors">
            Оферта
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function HubPage() {
  const pageRef = useReveal();

  return (
    <div
      ref={pageRef}
      className="min-h-screen font-sans overflow-x-hidden relative flex flex-col selection:bg-brand-teal/20"
    >
      {/* Vector Line-Art Icons Background */}
      <FloatingIcons />

      {/* Top Navigation */}
      <Navbar />

      {/* Content */}
      <main className="flex-1 relative z-10">
        <Hero />
        <Ecosystem />
      </main>

      <Footer />
    </div>
  );
}
