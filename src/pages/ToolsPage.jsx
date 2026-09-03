import { useRef, useEffect } from 'react';
import AppGrid from '../components/ui/AppGrid';

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    const els = ref.current?.querySelectorAll('.reveal');
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function ToolsPage() {
  const pageRef = useReveal();

  return (
    <div ref={pageRef} className="px-8 lg:px-12 py-8 lg:py-10 w-full">
      <div className="reveal mb-6">
        <h1 className="text-3xl font-bold text-brand-navy mb-1">
          Все инструменты
        </h1>
        <p className="text-base text-brand-navy/50">
          Выберите инструмент для работы
        </p>
      </div>
      <div className="reveal">
        <AppGrid />
      </div>
    </div>
  );
}
