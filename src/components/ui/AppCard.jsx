import { ArrowRight, ExternalLink } from 'lucide-react';
import pb from '../../utils/pb';

export default function AppCard({ app }) {
  const { name, description, icon: Icon, url, isReady, color } = app;
  const user = pb.authStore.model;

  // Если приложение не готово
  if (!isReady) {
    return (
      <div className="glass-card p-8 flex flex-col relative overflow-hidden group opacity-80 cursor-not-allowed">
        <div className="absolute top-4 right-4 text-[10px] font-bold tracking-widest uppercase bg-brand-navy/10 text-brand-navy/50 px-3 py-1 rounded-full">
          Скоро
        </div>
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-brand-navy/40 bg-brand-navy/5`}>
          <Icon size={28} />
        </div>
        <h3 className="text-2xl font-bold text-brand-navy/50 mb-3">{name}</h3>
        <p className="text-brand-navy/40 font-medium flex-1">{description}</p>
      </div>
    );
  }

  // Ссылка с передачей токена, если нужно (тут можно реализовать логику SSO редиректа)
  // Пока просто обычная ссылка, приложения сами могут читать cookie или мы передаем токен
  const targetUrl = user ? `${url}?token=${pb.authStore.token}` : url;

  return (
    <a href={targetUrl} className="glass-card p-8 flex flex-col relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
      
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white ${color}`}>
        <Icon size={28} />
      </div>
      
      <h3 className="text-2xl font-bold text-brand-navy mb-3 group-hover:text-brand-teal transition-colors">
        {name}
      </h3>
      <p className="text-brand-navy/60 font-medium flex-1 mb-8 leading-relaxed">
        {description}
      </p>

      <div className="flex items-center text-sm font-bold tracking-wide text-brand-teal group-hover:gap-3 gap-2 transition-all">
        {user ? 'ОТКРЫТЬ' : 'ПОДРОБНЕЕ'}
        <ArrowRight size={16} />
      </div>
    </a>
  );
}
