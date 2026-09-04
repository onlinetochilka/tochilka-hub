import { useState } from 'react';
import { X, Mail, Lock, User } from 'lucide-react';
import api from '../../utils/apiClient';

const MIN_PASSWORD_LENGTH = 6;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ERROR_MAP = {
  'failed to create record': 'Пользователь с таким email уже существует',
  'ошибка валидации': 'Проверьте правильность введённых данных',
  'invalid credentials': 'Неверный email или пароль',
  'too many requests': 'Слишком много попыток. Подождите немного.',
};

function friendlyError(msg) {
  if (!msg) return 'Произошла ошибка. Попробуйте позже.';
  for (const [key, value] of Object.entries(ERROR_MAP)) {
    if (msg.toLowerCase().includes(key.toLowerCase())) return value;
  }
  return 'Произошла ошибка. Попробуйте позже.';
}

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Client-side validation
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError('Введите email');
      return;
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setError('Введите корректный email');
      return;
    }

    if (!isLogin && password.length < MIN_PASSWORD_LENGTH) {
      setError(`Пароль должен быть не менее ${MIN_PASSWORD_LENGTH} символов`);
      return;
    }

    const sanitizedName = name.trim().replace(/<[^>]*>/g, '');
    if (!isLogin && !sanitizedName) {
      setError('Укажите, как к вам обращаться');
      return;
    }

    if (!isLogin && !agreed) {
      setError('Необходимо принять условия использования');
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        await api.post('/auth/login', { email: trimmedEmail, password });
      } else {
        await api.post('/auth/register', { email: trimmedEmail, password, name: sanitizedName });
      }
      onLoginSuccess?.();
      onClose();
    } catch (err) {
      setError(friendlyError(err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/30 backdrop-blur-sm">
      <div className="bg-white relative w-full max-w-md p-8 shadow-2xl rounded-3xl border border-brand-navy/[0.05]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-brand-navy/30 hover:text-brand-navy transition-colors bg-brand-navy/5 hover:bg-brand-navy/10 p-1.5 rounded-full"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-brand-navy mb-6 text-center">
          {isLogin ? 'Вход в систему' : 'Регистрация'}
        </h2>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-brand-crimson/10 border border-brand-crimson/20 text-brand-crimson text-sm font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-bold text-brand-navy/70 mb-1.5">Как к вам обращаться?</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-navy/40" size={18} />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-bg-page border border-brand-navy/[0.06] focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 rounded-xl py-2.5 pl-10 pr-4 text-brand-navy outline-none transition-all font-medium"
                  placeholder="Ваше имя"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-brand-navy/70 mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-navy/40" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-bg-page border border-brand-navy/[0.06] focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 rounded-xl py-2.5 pl-10 pr-4 text-brand-navy outline-none transition-all font-medium"
                placeholder="ваша@почта.ru"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-brand-navy/70 mb-1.5">Пароль</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-navy/40" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-bg-page border border-brand-navy/[0.06] focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 rounded-xl py-2.5 pl-10 pr-4 text-brand-navy outline-none transition-all font-medium"
                placeholder="••••••••"
              />
            </div>
            {!isLogin && (
              <p className="mt-1.5 text-xs text-brand-navy/40 font-medium">Минимум {MIN_PASSWORD_LENGTH} символов</p>
            )}
          </div>

          {!isLogin && (
            <label className="flex items-start gap-2.5 cursor-pointer mt-2">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-brand-navy/20 text-brand-teal focus:ring-brand-teal/20"
              />
              <span className="text-xs text-brand-navy/50 leading-relaxed">
                Я принимаю{' '}
                <a href="/terms" target="_blank" className="text-brand-teal hover:underline">условия использования</a>
                {' '}и{' '}
                <a href="/privacy" target="_blank" className="text-brand-teal hover:underline">политику конфиденциальности</a>
              </span>
            </label>
          )}

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
            disabled={loading}
            className="text-brand-teal hover:underline font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLogin ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </div>
      </div>
    </div>
  );
}
