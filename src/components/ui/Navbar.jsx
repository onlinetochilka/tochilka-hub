import { useState } from 'react';
import { LogOut, UserCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import AuthModal from './AuthModal';

export default function Navbar() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { user, logout, refreshUser } = useAuth();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 w-full">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="glass-panel rounded-full px-6 py-3 flex items-center justify-between">
            <a href="/" className="flex items-center gap-3 group">
              <img
                src="/logo.svg"
                alt="Точилка"
                className="w-8 h-8 md:w-10 md:h-10 transition-transform group-hover:scale-105 animate-[spin_30s_linear_infinite]"
              />
              <span className="font-extrabold text-lg md:text-xl text-brand-teal tracking-tight">
                ТОЧИЛКА
              </span>
            </a>

            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex items-center gap-2 text-brand-navy/80 font-medium text-sm">
                    <UserCircle size={18} />
                    <span>{user.email}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="p-2 rounded-full hover:bg-brand-crimson/10 text-brand-crimson transition-colors"
                    title="Выйти"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="bg-brand-teal hover:bg-brand-teal/85 text-white px-6 py-2 rounded-full font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  ВХОД
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onLoginSuccess={refreshUser}
      />
    </>
  );
}
