import { MessageCircle } from 'lucide-react';
import { TITULAR } from '../legal/titular';

const DEFAULT_MESSAGE = 'Hola Maykel, he visto la web de AGROFLOW™ y me gustaría hablar sobre el seguimiento comercial de mi empresa.';

export function whatsappUrl(message: string = DEFAULT_MESSAGE) {
  return `https://wa.me/${TITULAR.whatsapp}?text=${encodeURIComponent(message)}`;
}

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Escribir por WhatsApp al ${TITULAR.telefono}`}
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5b] text-white font-bold text-sm pl-4 pr-5 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">WhatsApp {TITULAR.telefono}</span>
      <span className="sm:hidden">WhatsApp</span>
    </a>
  );
}
