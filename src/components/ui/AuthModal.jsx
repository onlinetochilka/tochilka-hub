import { useState } from 'react';
import { X, Mail, Lock } from 'lucide-react';
import pb from '../../utils/pb';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await pb.collection('users').authWithPassword(email, password);
      } else {
        await pb.collection('users').create({
          email,
          password,
          passwordConfirm: password,
        });
        await pb.collection('users').authWithPassword(email, password);
      }
      onLoginSuccess();
      onClose();
    } catch (err) {
      setError(err.message || 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/20 backdrop-blur-sm">
      <div className="glass-card relative w-full max-w-md p-8 shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-brand-navy/50 hover:text-brand-navy transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-brand-navy mb-6 text-center">
          {isLogin ? 'Вход в систему' : 'Регистрация'}
        </h2>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-brand-crimson/10 border border-brand-crimson/20 text-brand-crimson text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-brand-navy/70 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-navy/40" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/50 border border-white/60 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 rounded-xl py-2.5 pl-10 pr-4 text-brand-navy outline-none transition-all"
                placeholder="ваша@почта.ru"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-brand-navy/70 mb-1">Пароль</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-navy/40" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/50 border border-white/60 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 rounded-xl py-2.5 pl-10 pr-4 text-brand-navy outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-teal hover:bg-brand-teal/90 text-white font-bold py-3 rounded-xl transition-all shadow-md mt-6 disabled:opacity-70"
          >
            {loading ? 'Загрузка...' : (isLogin ? 'Войти' : 'Создать аккаунт')}
          </button>
        </form>

        <div className="mt-6 text-center text-sm font-medium text-brand-navy/60">
          {isLogin ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-brand-teal hover:underline font-bold"
          >
            {isLogin ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </div>
      </div>
    </div>
  );
}
