import { DIAGNOSTIC_QUESTIONS } from '../data';
import { CompanySector, LeadSubmission } from '../types';

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined;
const AIRTABLE_WEBHOOK_URL = import.meta.env.VITE_AIRTABLE_WEBHOOK_URL as string | undefined;

// Valores exactos de las opciones "Sector" de la tabla Leads en Airtable
const SECTOR_LABELS: Record<CompanySector, string> = {
  maquinaria: 'Maquinaria agrícola',
  distribuidor: 'Distribuidor agrícola',
  fitosanitarios: 'Fitosanitarios',
  biofertilizantes: 'Biofertilizantes',
  riego: 'Riego',
  otro: 'Otro',
};

// Provincias tal y como están definidas en el campo "Provincia" de Airtable
export const PROVINCES = [
  'A Coruña', 'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila', 'Badajoz', 'Baleares',
  'Barcelona', 'Burgos', 'Cáceres', 'Cádiz', 'Cantabria', 'Castellón', 'Ceuta', 'Ciudad Real', 'Córdoba',
  'Cuenca', 'Girona', 'Granada', 'Guadalajara', 'Guipúzcoa', 'Huelva', 'Huesca', 'Jaén', 'La Rioja',
  'Las Palmas', 'León', 'Lleida', 'Lugo', 'Madrid', 'Málaga', 'Melilla', 'Murcia', 'Navarra', 'Ourense',
  'Palencia', 'Pontevedra', 'Salamanca', 'Santa Cruz de Tenerife', 'Segovia', 'Sevilla', 'Soria',
  'Tarragona', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza',
];

/** Payload plano cuyas claves se mapean 1:1 con los campos de la tabla Leads. */
export interface LeadPayload {
  empresa: string;
  contacto: string;
  cargo: string;
  telefono: string;
  email: string;
  provincia: string;
  sector: string;
  fuente: string;
  origen: string;
  estado: string;
  fecha: string;
  canal: string;
  consentimiento: boolean;
  problema: string;
}

function buildDiagnosticSummary(lead: LeadSubmission): string {
  const lines = [
    `Autodiagnóstico web: ${lead.score}/${lead.maxScore} (${lead.healthLevel})`,
  ];
  if (lead.estimatedLostRevenue) {
    lines.push(`Fuga comercial estimada: ${lead.estimatedLostRevenue.toLocaleString('es-ES')} € / año`);
  }
  lines.push('', 'Respuestas:');
  for (const answer of lead.answers) {
    const question = DIAGNOSTIC_QUESTIONS.find((q) => q.id === answer.questionId);
    const option = question?.options[answer.selectedOptionIndex];
    if (question && option) {
      lines.push(`${question.id}. ${question.question}`, `   → ${option.text} (${option.score} pts)`);
    }
  }
  return lines.join('\n');
}

export function buildLeadPayload(lead: LeadSubmission): LeadPayload {
  return {
    empresa: lead.company.trim(),
    contacto: lead.name.trim(),
    cargo: lead.role,
    telefono: lead.phone.trim(),
    email: lead.email.trim(),
    provincia: lead.province ?? '',
    sector: SECTOR_LABELS[lead.sector],
    fuente: 'Web / Formulario',
    origen: 'Web / Landing page',
    estado: 'Nuevo',
    fecha: new Date().toISOString().slice(0, 10),
    canal: lead.followUpChannel ?? '',
    consentimiento: lead.consent,
    problema: buildDiagnosticSummary(lead),
  };
}

async function sendToFormspree(endpoint: string, payload: LeadPayload): Promise<void> {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      ...payload,
      _subject: `Nuevo lead AGROFLOW: ${payload.empresa}`,
      _replyto: payload.email,
    }),
  });
  if (!res.ok) throw new Error(`Formspree respondió ${res.status}`);
}

async function sendToAirtable(webhookUrl: string, payload: LeadPayload): Promise<void> {
  // Los webhooks de Airtable no devuelven cabeceras CORS, así que la petición se envía
  // como "simple request" (text/plain + no-cors). Airtable parsea igualmente el cuerpo JSON.
  await fetch(webhookUrl, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
    body: JSON.stringify(payload),
  });
}

/**
 * Envía el lead a Formspree (email) y al webhook de Airtable (CRM) en paralelo.
 * Se considera correcto si al menos un destino configurado lo recibe.
 */
export async function submitLead(lead: LeadSubmission): Promise<void> {
  const payload = buildLeadPayload(lead);
  const tasks: Promise<void>[] = [];
  if (FORMSPREE_ENDPOINT) tasks.push(sendToFormspree(FORMSPREE_ENDPOINT, payload));
  if (AIRTABLE_WEBHOOK_URL) tasks.push(sendToAirtable(AIRTABLE_WEBHOOK_URL, payload));

  if (tasks.length === 0) {
    console.warn('[AGROFLOW] Ningún destino configurado (VITE_FORMSPREE_ENDPOINT / VITE_AIRTABLE_WEBHOOK_URL). Lead:', payload);
    return;
  }

  const results = await Promise.allSettled(tasks);
  results
    .filter((r): r is PromiseRejectedResult => r.status === 'rejected')
    .forEach((r) => console.error('[AGROFLOW] Error enviando lead:', r.reason));

  if (results.every((r) => r.status === 'rejected')) {
    throw new Error('No se pudo enviar la solicitud');
  }
}
