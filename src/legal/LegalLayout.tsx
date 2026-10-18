import { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { TITULAR } from './titular';

interface LegalLayoutProps {
  title: string;
  children: ReactNode;
}

export default function LegalLayout({ title, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200/85">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center gap-4">
          <a href="#" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-agro-900 text-white rounded-xl flex items-center justify-center font-black tracking-tighter text-lg shadow-md">
              AF
            </div>
            <span className="font-extrabold text-lg tracking-tight text-agro-950 font-display">
              AGRO<span className="text-agro-600 font-bold">FLOW</span>™
            </span>
          </a>
          <a
            href="#"
            className="flex items-center gap-1.5 text-sm font-semibold text-agro-700 hover:text-agro-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a la web
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 font-display">{title}</h1>
        <p className="text-xs text-slate-500 mt-2">Última actualización: {TITULAR.ultimaActualizacion}</p>
        <div className="legal-content mt-8 bg-white border border-slate-200 rounded-xl p-6 md:p-10 text-sm leading-relaxed text-slate-700">
          {children}
        </div>
        <nav className="mt-8 flex flex-wrap gap-4 text-sm">
          <a href="#aviso-legal" className="text-agro-700 hover:underline">Aviso Legal</a>
          <a href="#privacidad" className="text-agro-700 hover:underline">Política de Privacidad</a>
          <a href="#" className="text-agro-700 hover:underline">Volver a la web</a>
        </nav>
      </main>
    </div>
  );
}
