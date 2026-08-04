import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Notebook, Timer, Calculator, PieChart, Sparkles } from "lucide-react";

export default function HubPage() {
  const tools = [
    {
      id: "tutor",
      name: "ЕЖЕДНЕВНИК РЕПЕТИТОРА",
      description: "Умное расписание, учет финансов и полная аналитика для преподавателей.",
      icon: PieChart,
      active: true,
      url: "https://tutor.tochilka.app",
    },
    {
      id: "notebook",
      name: "ИДЕАЛЬНАЯ ТЕТРАДЬ",
      description: "Создание и ведение идеальных конспектов уроков.",
      icon: BookOpen,
      active: false,
    },
    {
      id: "lines",
      name: "РАЗЛИНОВКА",
      description: "Генератор листов с индивидуальной разлиновкой.",
      icon: Notebook,
      active: false,
    },
    {
      id: "timer",
      name: "УМНЫЙ ТАЙМЕР",
      description: "Контроль времени выполнения заданий и фокус.",
      icon: Timer,
      active: false,
    },
    {
      id: "math",
      name: "УСТНЫЙ СЧЕТ",
      description: "Тренажер для быстрого счета и разминки.",
      icon: Calculator,
      active: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f2f5f8] font-sans selection:bg-[#B71234]/20 selection:text-[#006584] overflow-x-hidden relative flex flex-col">
      
      {/* Abstract Background Elements (Soft glowing orbs) */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/40 rounded-full blur-[120px] pointer-events-none transform translate-x-1/3 -translate-y-1/4" />
      <div className="absolute top-40 left-0 w-[500px] h-[500px] bg-[#006584]/5 rounded-full blur-[100px] pointer-events-none transform -translate-x-1/2" />

      {/* Navigation */}
      <nav className="relative z-20 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Точилка" className="w-12 h-12 md:w-16 md:h-16" />
          <span className="font-extrabold textxl md:text-2xl text-[#006584] tracking-tight hidden sm:block">ТОЧИЛКА</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-10 font-bold text-[13px] tracking-widest text-[#006584]/80">
          <a href="#" className="hover:text-[#006584] transition-colors">ГЛАВНАЯ</a>
          <a href="#" className="hover:text-[#006584] transition-colors">ПРОГРАММЫ</a>
          <a href="#" className="hover:text-[#006584] transition-colors">О НАС</a>
          <a href="#" className="hover:text-[#006584] transition-colors">КОНТАКТЫ</a>
        </div>
        
        <a 
          href="https://tutor.tochilka.app" 
          className="bg-[#006584] hover:bg-[#00516a] text-white px-8 py-3 rounded-full font-bold text-sm tracking-wide transition-all shadow-[0_4px_14px_0_rgba(0,101,132,0.39)] hover:shadow-[0_6px_20px_rgba(0,101,132,0.23)] hover:-translate-y-0.5"
        >
          ВХОД
        </a>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-12 pb-24 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="flex-1 max-w-2xl">
          <h1 className="text-4xl sm:text-5xl lg:text-[64px] leading-[1.1] font-black text-[#002845] mb-6 tracking-tight">
            ПЕРЕДОВАЯ<br/>
            ОБРАЗОВАТЕЛЬНАЯ<br/>
            ЭКОСИСТЕМА
          </h1>
          <p className="text-lg md:text-xl text-[#002845]/70 mb-10 max-w-xl font-medium leading-relaxed">
            Развивайте навыки будущего с премиальным инструментарием и экспертной поддержкой.
          </p>
          <a 
            href="https://tutor.tochilka.app" 
            className="inline-flex items-center justify-center bg-[#B71234] hover:bg-[#9a0f2b] text-white px-10 py-4.5 rounded-full font-bold text-[15px] tracking-wide transition-all shadow-[0_8px_20px_-4px_rgba(183,18,52,0.5)] hover:shadow-[0_12px_24px_-4px_rgba(183,18,52,0.4)] hover:-translate-y-1"
          >
            НАЧАТЬ РАБОТУ
          </a>
        </div>
        
        {/* Hero Graphic (Abstract Glass Gear/Cog) */}
        <div className="flex-1 relative flex justify-center items-center h-[400px] w-full max-w-lg lg:max-w-none perspective-[1000px]">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/60 to-white/10 backdrop-blur-3xl rounded-[3rem] border border-white/80 shadow-[0_32px_64px_-12px_rgba(0,101,132,0.1)] transform rotate-12 rotate-y-12 rotate-x-12 animate-[float_6s_ease-in-out_infinite] flex items-center justify-center p-12">
            <Sparkles className="w-full h-full text-[#006584]/20 absolute opacity-50" />
            <div className="w-32 h-32 rounded-full border-[12px] border-[#B71234]/10 border-t-[#006584]/20 border-r-[#B71234]/20 animate-spin-slow"></div>
            <div className="absolute w-16 h-16 rounded-full bg-[#006584]/5 backdrop-blur-md border border-white/50 shadow-inner flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-[#B71234]/80"></div>
            </div>
          </div>
        </div>
      </main>

      {/* Cards Grid Section */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div 
                key={tool.id}
                className="group relative bg-[#f8fafc]/80 backdrop-blur-xl border border-white rounded-[2rem] p-8 shadow-[0_12px_32px_-12px_rgba(0,40,69,0.06),inset_0_2px_4px_rgba(255,255,255,1)] hover:shadow-[0_20px_40px_-12px_rgba(0,40,69,0.1),inset_0_2px_4px_rgba(255,255,255,1)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden min-h-[280px]"
              >
                {!tool.active && (
                   <div className="absolute top-6 right-6 text-[10px] font-bold text-[#006584]/40 uppercase tracking-widest bg-[#006584]/5 px-2.5 py-1 rounded-full">Скоро</div>
                )}
                
                <h3 className="text-xl font-extrabold text-[#002845] max-w-[200px] leading-tight mb-12 relative z-10">
                  {tool.name}
                </h3>
                
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-[inset_0_4px_12px_rgba(0,0,0,0.05),0_12px_24px_-8px_rgba(0,101,132,0.15)] group-hover:scale-110 transition-transform duration-500">
                  <Icon size={32} className={tool.active ? "text-[#006584]" : "text-[#B71234]"} strokeWidth={1.5} />
                </div>
                
                <div className="mt-auto relative z-10">
                  <a 
                    href={tool.active ? tool.url : undefined} 
                    className={`inline-flex items-center justify-center px-6 py-2 rounded-full font-bold text-[12px] tracking-wider transition-colors cursor-pointer ${
                      tool.active 
                        ? "bg-[#B71234] hover:bg-[#9a0f2b] text-white shadow-[0_4px_12px_rgba(183,18,52,0.3)]"
                        : "bg-[#B71234]/90 text-white opacity-80 cursor-default"
                    }`}
                  >
                    {tool.active ? "ОТКРЫТЬ" : "ПОДРОБНЕЕ"}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 border-t border-[#002845]/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-[#002845]/40 uppercase tracking-wider">
        <p>© {new Date().getFullYear()} ТОЧИЛКА. ВСЕ ПРАВА ЗАЩИЩЕНЫ.</p>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          <Link to="/privacy" className="hover:text-[#006584] transition-colors">Политика конфиденциальности</Link>
          <Link to="/terms" className="hover:text-[#006584] transition-colors">Оферта</Link>
          <Link to="/consent" className="hover:text-[#006584] transition-colors">Согласие ПД</Link>
        </div>
      </footer>
      
      {/* Custom Keyframes */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0%, 100% { transform: translateY(0) rotateX(12deg) rotateY(12deg) rotateZ(12deg); }
          50% { transform: translateY(-20px) rotateX(15deg) rotateY(15deg) rotateZ(10deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}} />
    </div>
  );
}
