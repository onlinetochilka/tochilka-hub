import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutGrid, LogOut, UserCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../utils/cn';

const navItems = [
  { path: '/', label: 'Главная', icon: Home },
  { path: '/tools', label: 'Инструменты', icon: LayoutGrid },
];

export default function Sidebar({ isOpen, onClose, onLoginClick }) {
  const location = useLocation();
  const { user, logout } = useAuth();

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-brand-navy/[0.06]">
        <img
          src="/logo.svg"
          alt="Точилка"
          className="w-10 h-10 animate-[spin_30s_linear_infinite]"
        />
        <span className="font-extrabold text-xl text-brand-teal tracking-tight">
          ТОЧИЛКА
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200',
                isActive
                  ? 'bg-brand-teal/10 text-brand-teal'
                  : 'text-brand-navy/60 hover:bg-brand-navy/5 hover:text-brand-navy'
              )}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="px-3 pb-4 border-t border-brand-navy/[0.06] pt-4 space-y-2">
        {user ? (
          <>
            <div className="flex items-center gap-3 px-4 py-2">
              <UserCircle size={20} className="text-brand-navy/40 flex-shrink-0" />
              <span className="text-sm text-brand-navy/60 font-medium truncate">
                {user.email}
              </span>
            </div>
            <button
              onClick={() => { logout(); onClose?.(); }}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-brand-crimson/70 hover:bg-brand-crimson/5 hover:text-brand-crimson transition-colors w-full"
            >
              <LogOut size={18} />
              Выйти
            </button>
          </>
        ) : (
          <button
            onClick={() => { onLoginClick?.(); onClose?.(); }}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-brand-teal text-white font-bold text-sm hover:bg-brand-teal/85 transition-colors shadow-md"
          >
            Войти
          </button>
        )}

        {/* Footer links */}
        <div className="flex items-center gap-4 px-4 pt-2">
          <Link
            to="/privacy"
            onClick={onClose}
            className="text-[11px] font-semibold text-brand-navy/30 uppercase tracking-wider hover:text-brand-navy/50 transition-colors"
          >
            Конфиденциальность
          </Link>
          <Link
            to="/terms"
            onClick={onClose}
            className="text-[11px] font-semibold text-brand-navy/30 uppercase tracking-wider hover:text-brand-navy/50 transition-colors"
          >
            Оферта
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop: permanent sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-brand-navy/[0.06] z-30 flex-col">
        {sidebarContent}
      </aside>

      {/* Mobile: slide-over sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-brand-navy/30 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            <motion.aside
              className="fixed left-0 top-0 bottom-0 w-72 bg-white z-50 lg:hidden shadow-2xl flex flex-col"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
