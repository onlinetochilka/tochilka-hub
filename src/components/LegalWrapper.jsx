import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function LegalWrapper({ title, children }) {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-stone-100/50 to-transparent pointer-events-none" />
      
      <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-12 lg:py-20 relative z-10">
        
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-indigo-600 transition-colors mb-8 font-medium">
          <ArrowLeft size={18} />
          Назад на главную
        </Link>
        
        {/* Document Content */}
        <div className="bg-white/80 backdrop-blur-xl border border-stone-200/60 p-8 sm:p-12 rounded-[32px] shadow-sm text-stone-700 leading-relaxed space-y-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mb-8">{title}</h1>
          {children}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 w-full max-w-5xl mx-auto px-6 py-8 border-t border-stone-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-stone-500">
        <p>© {new Date().getFullYear()} Точилка. Все права защищены.</p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <Link to="/privacy" className="hover:text-indigo-600 transition-colors">Политика конфиденциальности</Link>
          <Link to="/terms" className="hover:text-indigo-600 transition-colors">Пользовательское соглашение</Link>
          <Link to="/consent" className="hover:text-indigo-600 transition-colors">Согласие на обработку ПД</Link>
        </div>
      </footer>
    </div>
  );
}
