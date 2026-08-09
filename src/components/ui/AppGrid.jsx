import { CalendarDays, BookOpen, Clock, Calculator } from 'lucide-react';
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
];

export default function AppGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto w-full">
      {apps.map((app) => (
        <AppCard key={app.id} app={app} />
      ))}
    </div>
  );
}
