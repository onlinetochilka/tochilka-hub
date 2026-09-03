import { useState } from 'react';
import { User, GraduationCap, BookOpen, MapPin, ArrowRight, Check } from 'lucide-react';
import api from '../../utils/apiClient';
import { useAuth } from '../../contexts/AuthContext';

const ROLES = [
  { value: 'teacher', label: 'Школьный учитель', emoji: '🏫' },
  { value: 'tutor', label: 'Репетитор', emoji: '📚' },
  { value: 'parent', label: 'Родитель', emoji: '👨‍👩‍👧' },
  { value: 'student', label: 'Ученик / студент', emoji: '🎓' },
  { value: 'other', label: 'Другое', emoji: '✨' },
];

const SUBJECTS = [
  'Математика', 'Русский язык', 'Литература', 'Английский язык',
  'Физика', 'Химия', 'Биология', 'История',
  'Обществознание', 'География', 'Информатика',
  'Начальные классы', 'Музыка', 'ИЗО',
];

const TOTAL_STEPS = 3;

export default function OnboardingModal() {
  const { refreshUser } = useAuth();
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const canNext =
    (step === 1 && name.trim().length >= 2) ||
    (step === 2 && role) ||
    step === 3;

  const toggleSubject = (subj) => {
    setSubjects((prev) =>
      prev.includes(subj) ? prev.filter((s) => s !== subj) : [...prev, subj]
    );
  };

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    try {
      await api.patch('/auth/profile', {
        name: name.trim(),
        role,
        subjects,
        city: city.trim(),
      });
      await refreshUser();
    } catch (err) {
      setError(err.message || 'Произошла ошибка');
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const showSubjects = role === 'teacher' || role === 'tutor';

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-brand-navy/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-brand-navy/[0.05] overflow-hidden">
        {/* Progress Bar */}
        <div className="h-1.5 bg-brand-navy/[0.04]">
          <div
            className="h-full bg-brand-teal transition-all duration-500 ease-out rounded-full"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-brand-navy mb-2">
              {step === 1 && 'Давайте познакомимся!'}
              {step === 2 && 'Кем вы работаете?'}
              {step === 3 && (showSubjects ? 'Ещё пара деталей' : 'Откуда вы?')}
            </h2>
            <p className="text-sm text-brand-navy/50 font-medium">
              Шаг {step} из {TOTAL_STEPS}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 rounded-xl bg-brand-crimson/10 border border-brand-crimson/20 text-brand-crimson text-sm font-medium text-center">
              {error}
            </div>
          )}

          {/* ─── Step 1: Name ─── */}
          {step === 1 && (
            <div>
              <label className="block text-sm font-bold text-brand-navy/70 mb-2">
                Как к вам обращаться?
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-navy/30" size={20} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Анна Ивановна"
                  autoFocus
                  className="w-full bg-bg-page border border-brand-navy/[0.08] focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 rounded-xl py-3.5 pl-11 pr-4 text-brand-navy font-medium outline-none transition-all text-lg"
                />
              </div>
              <p className="mt-2 text-xs text-brand-navy/40 font-medium">
                Имя или имя и отчество — как удобно
              </p>
            </div>
          )}

          {/* ─── Step 2: Role ─── */}
          {step === 2 && (
            <div className="grid gap-2.5">
              {ROLES.map((r) => (
                <button
                  key={r.value}
                  onClick={() => setRole(r.value)}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                    role === r.value
                      ? 'border-brand-teal bg-brand-teal/5 shadow-sm'
                      : 'border-brand-navy/[0.06] bg-white hover:border-brand-navy/[0.12] hover:bg-bg-page'
                  }`}
                >
                  <span className="text-2xl">{r.emoji}</span>
                  <span
                    className={`font-semibold text-sm ${
                      role === r.value ? 'text-brand-teal' : 'text-brand-navy'
                    }`}
                  >
                    {r.label}
                  </span>
                  {role === r.value && (
                    <Check size={18} className="ml-auto text-brand-teal" />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* ─── Step 3: Subjects + City ─── */}
          {step === 3 && (
            <div className="space-y-6">
              {showSubjects && (
                <div>
                  <label className="block text-sm font-bold text-brand-navy/70 mb-3">
                    <BookOpen size={16} className="inline mr-1.5 -mt-0.5" />
                    Какие предметы вы ведёте?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SUBJECTS.map((subj) => {
                      const selected = subjects.includes(subj);
                      return (
                        <button
                          key={subj}
                          onClick={() => toggleSubject(subj)}
                          className={`px-3.5 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                            selected
                              ? 'bg-brand-teal text-white border-brand-teal shadow-sm'
                              : 'bg-white text-brand-navy/60 border-brand-navy/[0.08] hover:border-brand-teal/40 hover:text-brand-navy'
                          }`}
                        >
                          {subj}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-brand-navy/70 mb-2">
                  <MapPin size={16} className="inline mr-1.5 -mt-0.5" />
                  Город <span className="font-normal text-brand-navy/40">(необязательно)</span>
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Москва"
                  className="w-full bg-bg-page border border-brand-navy/[0.08] focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 rounded-xl py-3 px-4 text-brand-navy font-medium outline-none transition-all"
                />
              </div>
            </div>
          )}

          {/* ─── Navigation ─── */}
          <div className="flex items-center justify-between mt-8 gap-4">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                disabled={loading}
                className="text-sm font-bold text-brand-navy/40 hover:text-brand-navy transition-colors disabled:opacity-50"
              >
                ← Назад
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleNext}
              disabled={!canNext || loading}
              className="bg-brand-teal hover:bg-brand-teal/90 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              {loading
                ? 'Сохраняем...'
                : step === TOTAL_STEPS
                  ? 'Начать работу'
                  : 'Далее'}
              {!loading && step < TOTAL_STEPS && <ArrowRight size={16} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
