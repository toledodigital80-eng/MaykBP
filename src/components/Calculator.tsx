import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Tractor, TrendingDown, DollarSign, ArrowRight, ShieldCheck, CornerDownRight } from 'lucide-react';
import { CompanySector } from '../types';

interface CalculatorProps {
  onActionClick: (lostRevenue: number) => void;
}

export default function Calculator({ onActionClick }: CalculatorProps) {
  const [sector, setSector] = useState<CompanySector>('maquinaria');
  const [leadsPerMonth, setLeadsPerMonth] = useState<number>(20);
  const [averageTicket, setAverageTicket] = useState<number>(8500);
  const [noFollowUpRate, setNoFollowUpRate] = useState<number>(45);

  // Sector defaults to help user choose standard values
  const handleSectorChange = (selected: CompanySector) => {
    setSector(selected);
    switch (selected) {
      case 'maquinaria':
        setLeadsPerMonth(15);
        setAverageTicket(28000);
        setNoFollowUpRate(40);
        break;
      case 'distribuidor':
        setLeadsPerMonth(40);
        setAverageTicket(3500);
        setNoFollowUpRate(50);
        break;
      case 'fitosanitarios':
        setLeadsPerMonth(35);
        setAverageTicket(6200);
        setNoFollowUpRate(45);
        break;
      case 'biofertilizantes':
        setLeadsPerMonth(25);
        setAverageTicket(4800);
        setNoFollowUpRate(35);
        break;
      case 'riego':
        setLeadsPerMonth(10);
        setAverageTicket(42000);
        setNoFollowUpRate(55);
        break;
      default:
        break;
    }
  };

  // Math: 
  // Total annual inquiries: leadsPerMonth * 12
  // Offeres sent without follow-up: (leadsPerMonth * 12) * (noFollowUpRate / 100)
  // Assuming a conservative 12% closing rate on properly followed-up leads:
  // Lost deals = Offers without follow-up * 0.12
  // Lost Revenue = Lost deals * averageTicket
  // Recovered with AGROFLOW (by automating followups and increasing checkout by 15%):
  // Recovered Revenue = Lost Revenue * 0.35 (assuming we rescue 35% of those lost deals)

  const annualLeads = leadsPerMonth * 12;
  const annualNoFollowUpLeads = Math.round(annualLeads * (noFollowUpRate / 100));
  const estimatedLostDeals = Math.round(annualNoFollowUpLeads * 0.15); // conservative 15% would close if followed up
  const lostRevenue = estimatedLostDeals * averageTicket;
  const potentialRecovery = Math.round(lostRevenue * 0.40); // 40% of standard leaks recovered with Agroflow CRM setup

  return (
    <div id="calculadora-perdidas" className="bg-white rounded-2xl border border-slate-200/80 shadow-xl overflow-hidden">
      <div className="bg-agro-900 px-6 py-5 text-white flex flex-wrap justify-between items-center gap-4">
        <div>
          <span className="text-xs font-mono uppercase bg-agro-800 text-agro-200 px-2.5 py-1 rounded">Herramienta Interactiva</span>
          <h3 className="text-xl font-bold mt-1 text-white">Calculadora de Fuga de Facturación Agro</h3>
        </div>
        <div className="flex items-center gap-2 text-harvest-400">
          <TrendingDown className="h-5 w-5 animate-pulse" />
          <span className="text-sm font-semibold">¿Cuánto dinero está quedando en el campo?</span>
        </div>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sliders and Selectors */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              1. Seleccione su especialidad principal:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'maquinaria', label: 'Maquinaria' },
                { id: 'distribuidor', label: 'Distribución' },
                { id: 'fitosanitarios', label: 'Fitosanitarios' },
                { id: 'biofertilizantes', label: 'Biofertilizantes' },
                { id: 'riego', label: 'Sistemas Riego' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSectorChange(item.id as CompanySector)}
                  className={`py-2 px-3 text-sm font-medium rounded-lg border transition-all text-center cursor-pointer ${
                    sector === item.id
                      ? 'bg-agro-50 border-agro-600 text-agro-800 ring-2 ring-agro-100'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm font-semibold text-slate-700">
                  2. Solicitudes de presupuesto / Consultas al mes:
                </span>
                <span className="text-slate-900 font-mono font-bold bg-slate-100 px-2.5 py-0.5 rounded text-sm">
                  {leadsPerMonth} consultas
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
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                <span>5 / mes</span>
                <span>100 / mes</span>
                <span>200 / mes</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm font-semibold text-slate-700">
                  3. Valor medio de cada venta / contrato técnico:
                </span>
                <span className="text-agro-900 font-mono font-bold bg-agro-50 px-2.5 py-0.5 rounded text-sm">
                  {averageTicket.toLocaleString('es-ES')} €
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="100000"
                step="500"
                value={averageTicket}
                onChange={(e) => setAverageTicket(Number(e.target.value))}
                className="w-full accent-agro-600 cursor-ew-resize h-2 bg-slate-100 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                <span>500 €</span>
                <span>50.000 €</span>
                <span>100.000 €</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm font-semibold text-slate-700">
                  4. % estimado de ofertas que se quedan sin seguimiento activo:
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
              />
              <p className="text-xs text-rose-600 mt-1 flex items-center gap-1 font-medium">
                <CornerDownRight className="h-3 w-3" />
                Presupuestos presentados que nadie vuelve a llamar para preguntar si se aceptan.
              </p>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-5 bg-slate-50 border border-slate-200/50 rounded-xl p-6 flex flex-col justify-between">
          <div className="space-y-6">
            <h4 className="text-sm font-mono font-bold text-slate-500 uppercase tracking-wider">
              Diagnóstico de Pérdidas Estimado
            </h4>

            <div className="space-y-1">
              <span className="text-xs text-slate-500 block font-medium">
                Peticiones al año olvidadas o sin seguimiento continuo:
              </span>
              <span className="text-lg font-bold text-slate-800">
                {annualNoFollowUpLeads} oportunidades agrícolas
              </span>
            </div>

            <div className="border-t border-slate-200/80 my-4"></div>

            <div className="space-y-1">
              <span className="text-xs text-slate-500 block font-medium">
                Ventas perdidas al año por falta de insistencia profesional:
              </span>
              <span className="text-xl font-bold text-amber-700">
                ~ {estimatedLostDeals} operaciones comerciales
              </span>
            </div>

            <div className="space-y-1 bg-red-50 p-4 rounded-lg border border-red-100/60">
              <span className="text-xs text-red-700 font-bold uppercase tracking-wider block">
                Fuga comercial estimada anual:
              </span>
              <div className="flex items-baseline gap-1 text-red-600">
                <span className="text-3xl font-extrabold font-display">
                  {lostRevenue.toLocaleString('es-ES')}
                </span>
                <span className="text-lg font-bold">€ / año</span>
              </div>
              <p className="text-[11px] text-red-600/80 mt-1">
                Ingresos que ya genera su publicidad o histórico, pero se escapan por no tener procesos.
              </p>
            </div>

            <div className="space-y-1 bg-emerald-50 p-4 rounded-lg border border-emerald-100/60">
              <span className="text-xs text-emerald-800 font-bold uppercase tracking-wider block">
                Recuperable directo con AGROFLOW™:
              </span>
              <div className="flex items-baseline gap-1 text-emerald-700">
                <span className="text-2xl font-extrabold font-display">
                  + {potentialRecovery.toLocaleString('es-ES')}
                </span>
                <span className="text-base font-bold">€ / año</span>
              </div>
              <p className="text-[11px] text-emerald-700/80 mt-1">
                Rescatando conservadoramente solo el 40% de las ventas olvidadas.
              </p>
            </div>
          </div>

          <button
            onClick={() => onActionClick(lostRevenue)}
            className="w-full mt-6 bg-agro-700 hover:bg-agro-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow hover:shadow-md cursor-pointer text-sm"
          >
            <span>Detener esta fuga de ventas</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="bg-slate-100 px-6 py-3 border-t border-slate-200/60 flex items-center gap-2 text-slate-500 text-xs">
        <ShieldCheck className="h-4 w-4 text-agro-600 flex-shrink-0" />
        <span>Fórmulas de negocio calibradas según medias reales de cooperativas y fabricantes españoles en 2025.</span>
      </div>
    </div>
  );
}
