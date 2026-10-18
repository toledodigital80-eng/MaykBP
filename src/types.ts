export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  outcome: string;
}

export interface CaseStudy {
  id: string;
  sector: string;
  companyType: string;
  scenario: string;
  leak: string;
  agroflowImpact: string;
  highlight: string;
}

export type CompanySector = 'maquinaria' | 'distribuidor' | 'fitosanitarios' | 'biofertilizantes' | 'riego' | 'otro';

export type FollowUpChannel = 'WhatsApp' | 'Email' | 'Llamada';

export interface DiagnosticAnswer {
  questionId: number;
  selectedOptionIndex: number;
}

export interface LeadSubmission {
  name: string;
  email: string;
  phone: string;
  company: string;
  sector: CompanySector;
  role: string;
  province?: string;
  followUpChannel?: FollowUpChannel;
  consent: boolean;
  score: number;
  maxScore: number;
  healthLevel: string;
  answers: DiagnosticAnswer[];
  estimatedLostRevenue?: number;
}
