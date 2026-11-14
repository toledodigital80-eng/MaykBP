import { useState } from 'react';
import { TrendingDown, ArrowRight, Info, CornerDownRight, ChevronDown } from 'lucide-react';
import { CompanySector } from '../types';

interface CalculatorProps {
  onActionClick: (lostRevenue: number) => void;
}

type CalculatorSector = Exclude<CompanySector, 'otro'>;

interface SectorDefaults {
  label: string;
  leadsPerMonth: number;
  averageTicket: number;
  noFollowUpRate: number;
  // % de presupuestos que se cierran cuando sí se hace seguimiento
  closeRate: number;
  ticketNote: string;
}

// Valores de partida orientativos para el mercado español (2025-2026).
// Son conservadores y el usuario los ajusta a su empresa con los mandos.
const SECTOR_DEFAULTS: Record<CalculatorSector, SectorDefaults> = {
  maquinaria: {
    label: 'Maquinaria',
    leadsPerMonth: 15,
    averageTicket: 45000,
    noFollowUpRate: 40,
    closeRate: 20,
    ticketNote: 'Mezcla de tractores, atomizadores y aperos nuevos o de ocasión.',
  },
  distribuidor: {
    label: 'Distribución',
    leadsPerMonth: 40,
    averageTicket: 2000,
    noFollowUpRate: 45,
    closeRate: 35,
    ticketNote: 'Pedido medio de insumos, repuestos o material de campaña.',
  },
  fitosanitarios: {
    label: 'Fitosanitarios',
    leadsPerMonth: 25,
    averageTicket: 6000,
    noFollowUpRate: 40,
    closeRate: 30,
    ticketNote: 'Pedido de campaña de un distribuidor, cooperativa o explotación grande.',
  },
  biofertilizantes: {
    label: 'Biofertilizantes',
    leadsPerMonth: 20,
    averageTicket: 4000,
    noFollowUpRate: 45,
    closeRate: 25,
    ticketNote: 'Primer pedido tras una demo o ensayo en campo.',
  },
  riego: {
    label: 'Riego',
    leadsPerMonth: 10,
    averageTicket: 25000,
    noFollowUpRate: 50,
    closeRate: 25,
    ticketNote: 'Instalación de riego localizado de unas 10 ha (≈ 1.500-3.500 €/ha).',
  },
};

// es-ES no agrupa los números de 4 cifras por defecto (2000 → «2000»); forzamos «2.000»
const numberFormat = new Intl.NumberFormat('es-ES', { useGrouping: 'always' } as unknown as Intl.NumberFormatOptions);
const fmt = (n: number) => numberFormat.format(n);

// Parte de las ventas perdidas que un seguimiento ordenado puede recuperar (supuesto prudente)
const RECOVERY_RATE = 30;

export default function Calculator({ onActionClick }: CalculatorProps) {
  const [sector, setSector] = useState<CalculatorSector>('maquinaria');
  const [leadsPerMonth, setLeadsPerMonth] = useState<number>(SECTOR_DEFAULTS.maquinaria.leadsPerMonth);
  const [averageTicket, setAverageTicket] = useState<number>(SECTOR_DEFAULTS.maquinaria.averageTicket);
  const [noFollowUpRate, setNoFollowUpRate] = useState<number>(SECTOR_DEFAULTS.maquinaria.noFollowUpRate);
  const [showMethod, setShowMethod] = useState<boolean>(false);

  const defaults = SECTOR_DEFAULTS[sector];

  const handleSectorChange = (selected: CalculatorSector) => {
    setSector(selected);
    setLeadsPerMonth(SECTOR_DEFAULTS[selected].leadsPerMonth);
    setAverageTicket(SECTOR_DEFAULTS[selected].averageTicket);
    setNoFollowUpRate(SECTOR_DEFAULTS[selected].noFollowUpRate);
  };

  const annualLeads = leadsPerMonth * 12;
  const annualNoFollowUpLeads = Math.round(annualLeads * (noFollowUpRate / 100));
  const estimatedLostDeals = Math.round(annualNoFollowUpLeads * (defaults.closeRate / 100));
  const lostRevenue = estimatedLostDeals * averageTicket;
  const potentialRecovery = Math.round(lostRevenue * (RECOVERY_RATE / 100));

  return (
    <div id="calculadora-perdidas" className="bg-white rounded-2xl border border-slate-200/80 shadow-xl overflow-hidden">
      <div className="bg-agro-900 px-6 py-5 text-white flex flex-wrap justify-between items-center gap-4">
        <div>
          <span className="text-xs font-mono uppercase bg-agro-800 text-agro-200 px-2.5 py-1 rounded">Herramienta interactiva</span>
          <h3 className="text-xl font-bold mt-1 text-white">Calculadora de ventas perdidas</h3>
        </div>
        <div className="flex items-center gap-2 text-harvest-400">
          <TrendingDown className="h-5 w-5 animate-pulse" />
          <span className="text-sm font-semibold">¿Cuánto se queda sin vender cada año?</span>
        </div>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Mandos */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              1. Elija su sector:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(Object.keys(SECTOR_DEFAULTS) as CalculatorSector[]).map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleSectorChange(id)}
                  className={`py-2 px-3 text-sm font-medium rounded-lg border transition-all text-center cursor-pointer ${
                    sector === id
                      ? 'bg-agro-50 border-agro-600 text-agro-800 ring-2 ring-agro-100'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {SECTOR_DEFAULTS[id].label}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Cargamos valores de partida habituales en su sector. Ajústelos a su empresa.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between items-center mb-1.5 gap-3">
                <span className="text-sm font-semibold text-slate-700">
                  2. Presupuestos o consultas al mes:
                </span>
                <span className="text-slate-900 font-mono font-bold bg-slate-100 px-2.5 py-0.5 rounded text-sm whitespace-nowrap">
                  {leadsPerMonth} / mes
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="200"
                step="5"
                value={leadsPerMonth}
                onChange={(e) => setLeadsPerMonth(Number(e.target.value))}
                className="w-full accent-agro-600 cursor-ew-resize h-2 bg-slate-100 rounded-lg appearance-none"
                aria-label="Presupuestos o consultas al mes"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                <span>5</span>
                <span>100</span>
                <span>200</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5 gap-3">
                <span className="text-sm font-semibold text-slate-700">
                  3. Importe medio de cada venta:
                </span>
                <span className="text-agro-900 font-mono font-bold bg-agro-50 px-2.5 py-0.5 rounded text-sm whitespace-nowrap">
                  {fmt(averageTicket)} €
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="150000"
                step="500"
                value={averageTicket}
                onChange={(e) => setAverageTicket(Number(e.target.value))}
                className="w-full accent-agro-600 cursor-ew-resize h-2 bg-slate-100 rounded-lg appearance-none"
                aria-label="Importe medio de cada venta"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                <span>500 €</span>
                <span>75.000 €</span>
                <span>150.000 €</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Referencia: {defaults.ticketNote}</p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5 gap-3">
                <span className="text-sm font-semibold text-slate-700">
                  4. % de presupuestos sin seguimiento:
                </span>
                <span className="text-red-500 font-mono font-bold bg-red-50 px-2.5 py-0.5 rounded text-sm">
                  {noFollowUpRate}%
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                step="5"
                value={noFollowUpRate}
                onChange={(e) => setNoFollowUpRate(Number(e.target.value))}
                className="w-full accent-red-500 cursor-ew-resize h-2 bg-slate-100 rounded-lg appearance-none"
                aria-label="Porcentaje de presupuestos sin seguimiento"
              />
              <p className="text-xs text-rose-600 mt-1 flex items-center gap-1 font-medium">
                <CornerDownRight className="h-3 w-3 flex-shrink-0" />
                Presupuestos enviados a los que nadie vuelve a llamar.
              </p>
            </div>
          </div>
        </div>

        {/* Resultados */}
        <div className="lg:col-span-5 bg-slate-50 border border-slate-200/50 rounded-xl p-6 flex flex-col justify-between">
          <div className="space-y-5">
            <h4 className="text-sm font-mono font-bold text-slate-500 uppercase tracking-wider">
              Su estimación
            </h4>

            <div className="space-y-1">
              <span className="text-xs text-slate-500 block font-medium">
                Presupuestos al año sin seguimiento:
              </span>
              <span className="text-lg font-bold text-slate-800">
                {fmt(annualNoFollowUpLeads)} oportunidades
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-500 block font-medium">
                Ventas que se habrían cerrado con seguimiento ({defaults.closeRate}% en {defaults.label.toLowerCase()}):
              </span>
              <span className="text-xl font-bold text-amber-700">
                ~ {fmt(estimatedLostDeals)} ventas
              </span>
            </div>

            <div className="space-y-1 bg-red-50 p-4 rounded-lg border border-red-100/60">
              <span className="text-xs text-red-700 font-bold uppercase tracking-wider block">
                Ventas perdidas estimadas al año:
              </span>
              <div className="flex items-baseline gap-1 text-red-600 flex-wrap">
                <span className="text-3xl font-extrabold font-display">
                  {fmt(lostRevenue)}
                </span>
                <span className="text-lg font-bold">€</span>
              </div>
            </div>

            <div className="space-y-1 bg-emerald-50 p-4 rounded-lg border border-emerald-100/60">
              <span className="text-xs text-emerald-800 font-bold uppercase tracking-wider block">
                Recuperable con un seguimiento ordenado:
              </span>
              <div className="flex items-baseline gap-1 text-emerald-700 flex-wrap">
                <span className="text-2xl font-extrabold font-display">
                  + {fmt(potentialRecovery)}
                </span>
                <span className="text-base font-bold">€ / año</span>
              </div>
              <p className="text-[11px] text-emerald-700/80 mt-1">
                Suponiendo que solo se recupera el {RECOVERY_RATE}% de esas ventas.
              </p>
            </div>
          </div>

          <button
            onClick={() => onActionClick(lostRevenue)}
            className="w-full mt-6 bg-agro-700 hover:bg-agro-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow hover:shadow-md cursor-pointer text-sm"
          >
            <span>Quiero dejar de perder estas ventas</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Cómo calculamos */}
      <div className="bg-slate-100 border-t border-slate-200/60 text-slate-600 text-xs">
        <button
          type="button"
          onClick={() => setShowMethod(!showMethod)}
          className="w-full px-6 py-3 flex items-center justify-between gap-2 cursor-pointer hover:text-slate-800"
          aria-expanded={showMethod}
        >
          <span className="flex items-center gap-2 font-semibold">
            <Info className="h-4 w-4 text-agro-600 flex-shrink-0" />
            Cómo calculamos esta estimación
          </span>
          <ChevronDown className={`h-4 w-4 transition-transform ${showMethod ? 'rotate-180' : ''}`} />
        </button>
        {showMethod && (
          <div className="px-6 pb-5 space-y-3 leading-relaxed">
            <p>
              <strong>Fórmula:</strong> presupuestos al mes × 12 × % sin seguimiento × % de cierre con seguimiento ×
              importe medio. Lo recuperable es el {RECOVERY_RATE}% de ese resultado.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px] bg-white rounded-lg border border-slate-200">
                <thead>
                  <tr className="text-slate-500">
                    <th className="p-2 font-semibold">Sector</th>
                    <th className="p-2 font-semibold">Importe medio de partida</th>
                    <th className="p-2 font-semibold">Cierre con seguimiento</th>
                  </tr>
                </thead>
                <tbody>
                  {(Object.keys(SECTOR_DEFAULTS) as CalculatorSector[]).map((id) => (
                    <tr key={id} className="border-t border-slate-100">
                      <td className="p-2">{SECTOR_DEFAULTS[id].label}</td>
                      <td className="p-2 font-mono">{fmt(SECTOR_DEFAULTS[id].averageTicket)} €</td>
                      <td className="p-2 font-mono">{SECTOR_DEFAULTS[id].closeRate}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              Los valores de partida son orientativos y prudentes para el mercado agrícola español (2025-2026): precios
              habituales de venta en cada sector y tasas de cierre de presupuestos B2B con un seguimiento básico. Cada
              empresa es distinta: ajuste los mandos con sus propios datos. Es una estimación, no una promesa de resultados.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
