import { useEffect, useRef } from "react";
import FloatingIcons from "../components/ui/FloatingIcons";
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

function CompactHero() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 pt-28 pb-8 md:pt-32 md:pb-10">
      <div className="reveal flex items-center justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-navy mb-3 tracking-tight leading-[1.1]">
            Ваши инструменты
          </h1>
          <p className="text-lg md:text-xl text-brand-navy/50 font-medium max-w-xl">
            Единая платформа полезных инструментов для образования. Выберите инструмент для работы.
          </p>
        </div>
        
        {/* Декоративный крутящийся логотип */}
        <div className="hidden md:block flex-shrink-0 ml-8">
          <img
            src="/logo.svg"
            alt=""
            className="w-20 h-20 lg:w-24 lg:h-24 opacity-20 animate-[spin_30s_linear_infinite]"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}

function ToolsSection() {
  return (
    <section className="relative z-10 w-full px-6 pb-12 md:pb-20 flex justify-center">
      <div className="reveal w-full max-w-7xl mx-auto">
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
        <CompactHero />
        <ToolsSection />
      </main>

      <Footer />
    </div>
  );
}
