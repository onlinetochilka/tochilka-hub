import { useEffect, useRef } from "react";
import Background3D from "../components/3d/Background3D";
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
    <section className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-32 pb-20 md:pt-48 md:pb-28 text-center flex flex-col items-center">
      <div className="reveal">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 text-sm font-bold text-brand-teal tracking-wide">
          <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
          ТОЧИЛКА ЭКОСИСТЕМА
        </div>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-brand-navy mb-8 tracking-tight leading-[1.1]">
          Всё для репетитора <br/>
          <span className="text-brand-teal">в одном месте</span>
        </h1>
        <p className="text-xl md:text-2xl text-brand-navy/60 max-w-2xl mx-auto font-medium leading-relaxed mb-10">
          Единая платформа полезных инструментов. Управляйте расписанием, создавайте учебные материалы и экономьте время.
        </p>
      </div>
    </section>
  );
}

function Ecosystem() {
  return (
    <section id="ecosystem" className="relative z-10 w-full px-6 py-12 md:py-20 flex justify-center">
      <div className="reveal w-full">
        <AppGrid />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-10 mt-20 border-t border-brand-navy/[0.06]">
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
      {/* 3D Background */}
      <Background3D />

      {/* Top Navigation */}
      <Navbar />

      {/* Content */}
      <main className="flex-1">
        <Hero />
        <Ecosystem />
      </main>

      <Footer />
    </div>
  );
}
