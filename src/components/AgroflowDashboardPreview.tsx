import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Tractor, Users, TrendingUp, Sparkles, Mail, CheckCircle2, Clock, PhoneCall, AlertTriangle } from 'lucide-react';

export default function AgroflowDashboardPreview() {
  const [automationActive, setAutomationActive] = useState<boolean>(false);

  // Simulated metrics
  const totalLeads = 124;
  const initialClosedDeals = 28;
  const rescuedDeals = 16;
  const avgDealValue = 12500;

  const closedDeals = automationActive ? initialClosedDeals + rescuedDeals : initialClosedDeals;
  const totalPipeline = totalLeads * avgDealValue;
  const closedValue = closedDeals * avgDealValue;
  const conversionRate = Math.round((closedDeals / totalLeads) * 100);

  // Simulated pipeline stages
  const pipelineStages = [
    { name: 'Nueva solicitud (Ferias / Web / Llamadas)', count: automationActive ? 12 : 28, value: (automationActive ? 12 : 28) * avgDealValue, color: 'bg-indigo-500' },
    { name: 'Estudio Técnico / Presupuesto enviado', count: automationActive ? 25 : 39, value: (automationActive ? 25 : 39) * avgDealValue, color: 'bg-amber-500' },
    { name: 'Seguimiento Automático Activo', count: automationActive ? 43 : 0, value: (automationActive ? 43 : 0) * avgDealValue, color: 'bg-emerald-500 animate-pulse' },
    { name: 'Negociación / Cierre', count: automationActive ? 16 : 29, value: (automationActive ? 16 : 29) * avgDealValue, color: 'bg-agro-650' },
    { name: 'Cerrado - Ganado', count: closedDeals, value: closedValue, color: 'bg-emerald-600 font-bold' },
  ];

  return (
    <div className="bg-slate-900 text-white rounded-2xl border border-slate-700/60 shadow-2xl overflow-hidden font-sans">
      {/* Top bar resemble actual software app */}
      <div className="bg-slate-950 px-5 py-4 border-b border-slate-800 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-agro-600 flex items-center justify-center font-extrabold text-sm tracking-tighter shadow">
            AF
          </div>
          <div>
            <h4 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
              AGROFLOW™ Control Panel
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                SIMULADOR ACTIVO
              </span>
            </h4>
            <p className="text-[10px] text-slate-400">Trazabilidad comercial para la dirección técnica</p>
          </div>
        </div>

        {/* Dynamic Toggle Action */}
        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-lg p-1">
          <span className="text-[11px] font-bold text-slate-300 ml-2">Seguimiento inteligente:</span>
          <button
            type="button"
            onClick={() => setAutomationActive(!automationActive)}
            className={`px-3 py-1 text-xs font-bold rounded cursor-pointer transition-all flex items-center gap-1 ${
              automationActive
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {automationActive ? (
              <>
                <Sparkles className="h-3.5 w-3.5" />
                <span>ACTIVADO</span>
              </>
            ) : (
              'DESACTIVADO'
            )}
          </button>
        </div>
      </div>

      <div className="p-5 md:p-6 space-y-6">
        {/* Metric Cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">Solicitudes totales (Campaña)</span>
            <div className="text-2xl font-black font-display text-white mt-1">{totalLeads}</div>
            <span className="text-[10px] text-slate-400 mt-1 block">Procedentes de ferias, web y campo</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">Presupuestos aceptados</span>
            <div className="text-2xl font-black font-display text-emerald-400 mt-1 flex items-baseline gap-1">
              <span>{closedDeals}</span>
              {automationActive && (
                <span className="text-xs text-emerald-400 font-semibold">(+{rescuedDeals} rescatados)</span>
              )}
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">Tasa conversión: <b className="text-white">{conversionRate}%</b></span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">Facturación protegida</span>
            <div className="text-2xl font-black font-display text-white mt-1">
              {closedValue.toLocaleString('es-ES')} €
            </div>
            <span className="text-[10px] text-emerald-400 mt-1 block font-mono">
              {automationActive ? `+${(rescuedDeals * avgDealValue).toLocaleString('es-ES')} € recuperados` : 'Esperando activación'}
            </span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">Eficiencia del comercial</span>
            <div className="text-2xl font-black font-display text-amber-400 mt-1">
              {automationActive ? '94%' : '48%'}
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">Tasa de respuesta a ofertas</span>
          </div>
        </div>

        {/* Pipeline simulation viz */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Funnel simulation */}
          <div className="lg:col-span-8 bg-slate-950 border border-slate-800/80 rounded-xl p-5 space-y-4">
            <div className="flex justify-between items-center">
              <h5 className="text-xs font-bold font-mono tracking-wider text-slate-400 uppercase">
                Pipeline comercial activo por estados
              </h5>
              <span className="text-[10px] bg-slate-900 text-slate-400 py-0.5 px-2 rounded">
                Ticket medio estándar: {avgDealValue.toLocaleString('es-ES')}€
              </span>
            </div>

            <div className="space-y-3 pt-2">
              {pipelineStages.map((stage, idx) => {
                const maxVal = totalLeads * avgDealValue;
                const pct = Math.max(10, Math.round((stage.value / maxVal) * 100));
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span className="font-semibold flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${stage.color}`}></span>
                        {stage.name}
                      </span>
                      <span className="font-mono text-[11px]">
                        <b>{stage.count}</b> ofertas · <b>{stage.value.toLocaleString('es-ES')} €</b>
                      </span>
                    </div>
                    <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.5 }}
                        className={`h-full rounded-full ${stage.color}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Activity feed simulation */}
          <div className="lg:col-span-4 bg-slate-950 border border-slate-800/80 rounded-xl p-5 space-y-4 h-full">
            <h5 className="text-xs font-bold font-mono tracking-wider text-slate-400 uppercase">
              Flujo de Tareas y Alertas
            </h5>

            <div className="space-y-3.5 text-xs">
              <div className="border-l-2 border-emerald-500 pl-3 py-0.5 space-y-1">
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>Suministros Huesca</span>
                  <span>Hace 5 min</span>
                </div>
                <p className="text-slate-200 font-medium">WhatsApp automático de seguimiento entregado.</p>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded font-bold font-mono">
                  RESIDUAL SALVADO
                </span>
              </div>

              {automationActive ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="border-l-2 border-emerald-500 pl-3 py-0.5 space-y-1"
                >
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>Sistemas Riego Ebro</span>
                    <span>Hace 24 min</span>
                  </div>
                  <p className="text-slate-200 font-medium">Llamada agendada automáticamente en el calendario comercial para oferta técnica de 45.000€.</p>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded font-bold font-mono">
                    CON TAREA ASIGNADA
                  </span>
                </motion.div>
              ) : (
                <div className="border-l-2 border-rose-500 pl-3 py-0.5 space-y-1">
                  <div className="flex justify-between text-[10px] text-rose-400 font-mono">
                    <span>Sistemas Riego Ebro</span>
                    <span>Ayer</span>
                  </div>
                  <p className="text-slate-300 font-medium">Presupuesto inactivo desde hace 8 días.</p>
                  <span className="text-[10px] text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded font-bold font-mono">
                    SIN SEGUIMIENTO (FUGA)
                  </span>
                </div>
              )}

              <div className="border-l-2 border-slate-700 pl-3 py-0.5 space-y-1">
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>Tractores Castelar</span>
                  <span>Hace 2 horas</span>
                </div>
                <p className="text-slate-200 font-medium">Nueva solicitud desde formulario web "Feria FIMA Zaragoza" registrada.</p>
                <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded font-bold font-mono">
                  ASIGNADO COMERCIAL
                </span>
              </div>
            </div>

            {/* Simulated Insight Call */}
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800/80 space-y-1">
              <div className="flex items-center gap-1.5 text-amber-400 text-[10px] font-bold">
                <AlertTriangle className="h-3.5 w-3.5" />
                <span>OBSERVACIÓN DIRECTA</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-normal">
                {automationActive 
                  ? "Flujos óptimos. El 100% de la fuerza comercial tiene agendado su contacto semanal obligatorio sin despistes."
                  : "Detectada fuga sistemática: 14 presupuestos cerrarán el mes sin que ningún comercial intente un segundo contacto por saturación diaria."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Control explanation for users */}
      <div className="bg-slate-950 px-5 py-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
        <span>Diseño de control exclusivo AGROFLOW™</span>
        <span className="text-emerald-400 font-semibold cursor-pointer select-none" onClick={() => setAutomationActive(!automationActive)}>
          {automationActive ? '👉 Pulse para simular la pérdida de ventas' : '👉 Active para rescatar oportunidades perdidas'}
        </span>
      </div>
    </div>
  );
}
