import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/ui/Sidebar';
import AuthModal from '../components/ui/AuthModal';
import OnboardingModal from '../components/ui/OnboardingModal';
import FloatingIcons from '../components/ui/FloatingIcons';

export default function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { user, refreshUser } = useAuth();

  return (
    <div className="min-h-screen bg-bg-page font-sans overflow-x-hidden selection:bg-brand-teal/20">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLoginClick={() => setAuthOpen(true)}
      />

      <div className="lg:ml-64 min-h-screen flex flex-col relative">
        {/* Mobile top bar */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-30 p-4">
          <div className="glass-panel rounded-full px-5 py-3 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1.5 rounded-full hover:bg-brand-navy/5 text-brand-navy/60 transition-colors"
            >
              <Menu size={22} />
            </button>

            <Link to="/" className="flex items-center gap-2">
              <img
                src="/logo.svg"
                alt="Точилка"
                className="w-8 h-8 animate-[spin_30s_linear_infinite]"
              />
              <span className="font-extrabold text-lg text-brand-teal tracking-tight">
                ТОЧИЛКА
              </span>
            </Link>

            {!user ? (
              <button
                onClick={() => setAuthOpen(true)}
                className="bg-brand-teal text-white px-4 py-1.5 rounded-full font-bold text-xs tracking-wide hover:bg-brand-teal/85 transition-colors"
              >
                ВХОД
              </button>
            ) : (
              <div className="w-14" />
            )}
          </div>
        </div>

        {/* Floating icons background */}
        <FloatingIcons />

        {/* Page content */}
        <main className="flex-1 relative z-10 pt-24 lg:pt-0 flex flex-col">
          <Outlet />
        </main>
      </div>

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onLoginSuccess={refreshUser}
      />

      {/* Онбординг — показываем если пользователь авторизован, но не заполнил имя */}
      {user && !user.name && <OnboardingModal />}
    </div>
  );
}
