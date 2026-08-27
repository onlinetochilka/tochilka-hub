import { CalendarDays, BookOpen, Clock, Calculator, GraduationCap, FileType, BookOpenCheck, Puzzle, PenLine } from 'lucide-react';
import AppCard from './AppCard';

const apps = [
  {
    id: 'tutor',
    name: 'Ежедневник репетитора',
    description: 'Умное расписание, контроль финансов и портал для учеников в одном месте.',
    icon: CalendarDays,
    url: 'https://tutor.tochilka.app',
    isReady: true,
    color: 'bg-brand-teal',
  },
  {
    id: 'notebook',
    name: 'Идеальная тетрадь',
    description: 'Генератор прописей, памяток и рабочих листов для преподавателей.',
    icon: BookOpen,
    url: 'https://write.tochilka.app',
    isReady: true,
    color: 'bg-brand-crimson',
  },
  {
    id: 'exams',
    name: 'Трекер Экзаменов',
    description: 'Система учета подготовки, результатов и прогресса учеников к экзаменам.',
    icon: GraduationCap,
    url: 'https://exams.tochilka.app/',
    isReady: true,
    color: 'bg-brand-navy',
  },
  {
    id: 'lines',
    name: 'Генератор разлиновки',
    description: 'Инструмент для создания листов в клетку, линейку и других шаблонов.',
    icon: FileType,
    url: 'https://lines.tochilka.app/',
    isReady: true,
    color: 'bg-emerald-600',
  },
  {
    id: 'timer',
    name: 'Умный таймер',
    description: 'Инструмент для контроля времени на занятиях с геймификацией.',
    icon: Clock,
    url: '#',
    isReady: false,
    color: 'bg-gray-400',
  },
  {
    id: 'math',
    name: 'Устный счет',
    description: 'Тренажеры для быстрого счета и математических диктантов.',
    icon: Calculator,
    url: '#',
    isReady: false,
    color: 'bg-gray-400',
  },
  {
    id: 'reading',
    name: 'Проверка техники чтения',
    description: 'Инструмент для оценки скорости и выразительности чтения.',
    icon: BookOpenCheck,
    url: '#',
    isReady: false,
    color: 'bg-gray-400',
  },
  {
    id: 'crosswords',
    name: 'Генератор кроссвордов',
    description: 'Создание кроссвордов и филвордов по вашим спискам слов.',
    icon: Puzzle,
    url: '#',
    isReady: false,
    color: 'bg-gray-400',
  },
  {
    id: 'dictations',
    name: 'Словарные диктанты',
    description: 'Интерактивные диктанты для проверки правописания и словарного запаса.',
    icon: PenLine,
    url: '#',
    isReady: false,
    color: 'bg-gray-400',
  },
];

export default function AppGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
      {apps.map((app, index) => (
        <AppCard key={app.id} app={app} index={index} />
      ))}
    </div>
  );
}
