import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ChevronLeft, Calendar, Info, ShieldCheck, Milestone, AlertTriangle } from 'lucide-react';
import { DIAGNOSTIC_QUESTIONS } from '../data';
import { LeadSubmission, CompanySector, FollowUpChannel } from '../types';
import { submitLead, PROVINCES } from '../lib/submitLead';

interface DiagnosticWizardProps {
  initialEstimatedLostRevenue?: number;
  onSubmitSuccess: (lead: LeadSubmission) => void;
}

export default function DiagnosticWizard({ initialEstimatedLostRevenue, onSubmitSuccess }: DiagnosticWizardProps) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  // Índice de la opción elegida en cada pregunta
  const [answers, setAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Form states
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [sector, setSector] = useState<CompanySector>('maquinaria');
  const [role, setRole] = useState<string>('Gerente / Socio');
  const [province, setProvince] = useState<string>('');
  const [followUpChannel, setFollowUpChannel] = useState<FollowUpChannel | ''>('');
  const [consent, setConsent] = useState<boolean>(false);
  const [honeypot, setHoneypot] = useState<string>('');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const totalQuestions = DIAGNOSTIC_QUESTIONS.length;

  const handleOptionSelect = (optionIndex: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentStep] = optionIndex;
    setAnswers(updatedAnswers);

    // Auto advance with tiny delay
    setTimeout(() => {
      if (currentStep < totalQuestions - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setIsCompleted(true);
      }
    }, 250);
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setIsCompleted(false);
    setSubmitted(false);
    setSubmitError(null);
  };

  const scoreSum = answers.reduce(
    (sum, optionIndex, questionIndex) => sum + DIAGNOSTIC_QUESTIONS[questionIndex].options[optionIndex].score,
    0
  );
  const maxScore = totalQuestions * 4;
  const scorePercentage = Math.round((scoreSum / maxScore) * 100);

  // Commercial health analysis
  const getHealthReport = () => {
    if (scoreSum <= 4) {
      return {
        slug: 'crítica',
        title: 'Pérdida Crítica de Oportunidades',
        color: 'text-rose-600 bg-rose-50 border-rose-200',
        barColor: 'bg-red-500',
        intro: 'Su empresa sufre una fuga continua de facturación. La ausencia de un CRM centrado en el agro y la dependencia del azar o WhatsApps personales de los comerciales hacen que más de la mitad de sus presupuestos presentados queden en el olvido.',
        recommendation: 'Es prioritario unificar el registro comercial de ferias y llamadas dentro del mismo mes para evitar perder oportunidades ya captadas.'
      };
    } else if (scoreSum <= 10) {
      return {
        slug: 'moderada',
        title: 'Riesgo Comercial Moderado',
        color: 'text-amber-700 bg-amber-50 border-amber-200',
        barColor: 'bg-amber-500',
        intro: 'Tienen un negocio agrícola sólido, pero el proceso comercial depende del esfuerzo manual de cada vendedor. Si un comercial se retira de la empresa o no tiene tiempo para rellenar informes, la trazabilidad del cliente se pierde por completo.',
        recommendation: 'Le sugerimos estructurar un flujo automático de llamadas de cortesía y centralizar presupuestos para liberar un 30% del papeleo.'
      };
    } else if (scoreSum <= 16) {
      return {
        slug: 'saludable',
        title: 'Operación Comercial Estable',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        barColor: 'bg-emerald-500',
        intro: 'Sus procesos funcionan y el equipo comercial responde diligentemente. Sin embargo, hay un margen importante de optimización mediante automatizaciones automáticas de presupuestos post-campaña y dashboards en tiempo real para gerencia.',
        recommendation: 'Un panel de ventas agro automatizado le daría mayor poder de previsibilidad y control sobre los presupuestos pendientes.'
      };
    } else {
      return {
        slug: 'óptima',
        title: 'Salud Comercial Alta',
        color: 'text-teal-700 bg-teal-50 border-teal-200',
        barColor: 'bg-teal-500',
        intro: 'Enhorabuena, disponen de una estructura ágil con herramientas correctas. Su enfoque debe centrarse ahora en automatizar al máximo para optimizar costes de personal y mejorar preventivamente la fidelización de distribuidores.',
        recommendation: 'Analizar cómo perfeccionar la estacionalidad comercial según siembras u obras hidráulicas.'
      };
    }
  };

  const report = getHealthReport();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!name.trim() || !email.trim() || !phone.trim() || !company.trim()) {
      setSubmitError('Por favor, rellene todos los campos requeridos.');
      return;
    }
    if (!consent) {
      setSubmitError('Debe aceptar la política de privacidad para continuar.');
      return;
    }

    const lead: LeadSubmission = {
      name,
      email,
      phone,
      company,
      sector,
      role,
      province: province || undefined,
      followUpChannel: followUpChannel || undefined,
      consent,
      score: scoreSum,
      maxScore,
      healthLevel: report.title,
      answers: answers.map((selectedOptionIndex, i) => ({
        questionId: DIAGNOSTIC_QUESTIONS[i].id,
        selectedOptionIndex,
      })),
      estimatedLostRevenue: initialEstimatedLostRevenue,
    };

    setSubmitting(true);
    try {
      // Bots que rellenan el campo oculto: simulamos éxito sin enviar nada
      if (!honeypot) await submitLead(lead);
      setSubmitted(true);
      onSubmitSuccess(lead);
    } catch {
      setSubmitError('No hemos podido enviar su solicitud. Inténtelo de nuevo en unos segundos o llámenos al +34 900 839 122.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="diagnostico-wizard" className="bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-agro-900 to-agro-800 px-6 py-6 text-white text-center md:text-left md:flex justify-between items-center gap-6">
        <div>
          <h3 className="text-xl md:text-2xl font-bold font-display text-white">
            Autodiagnóstico Comercial Agro
          </h3>
          <p className="text-agro-200 text-xs md:text-sm mt-1 max-w-xl">
            Responda 5 preguntas prácticas y mida el nivel de control y fugas en su departamento de ventas.
          </p>
        </div>
        {!isCompleted && (
          <div className="mt-4 md:mt-0 bg-agro-700/60 font-mono text-sm px-4 py-1.5 rounded-full border border-agro-600/50 inline-block">
            Pregunta {currentStep + 1} de {totalQuestions}
          </div>
        )}
      </div>

      {/* Main Wizard Area */}
      <div className="p-6 md:p-8">
        <AnimatePresence mode="wait">
          {!isCompleted ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Progress Bar */}
              <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                <div
                  className="bg-agro-600 h-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / totalQuestions) * 100}%` }}
                ></div>
              </div>

              {/* Question */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-agro-600 font-mono uppercase tracking-wider">
                  Área de Evaluación Comercial
                </span>
                <h4 className="text-lg md:text-xl font-bold text-slate-800 leading-snug">
                  {DIAGNOSTIC_QUESTIONS[currentStep].question}
                </h4>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {DIAGNOSTIC_QUESTIONS[currentStep].options.map((option, idx) => {
                  const isSelected = answers[currentStep] === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleOptionSelect(idx)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 group cursor-pointer ${
                        isSelected
                          ? 'bg-agro-50 border-agro-600 text-agro-900 ring-2 ring-agro-100'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5 ${
                          isSelected
                            ? 'bg-agro-600 border-agro-600 text-white'
                            : 'border-slate-300 text-slate-400 group-hover:border-slate-400'
                        }`}
                      >
                        {isSelected ? <Check className="h-3 w-3" /> : String.fromCharCode(65 + idx)}
                      </div>
                      <span className="text-sm font-medium leading-relaxed">{option.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Back */}
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 font-medium pt-2 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Volver a la pregunta anterior</span>
                </button>
              )}
            </motion.div>
          ) : (
            /* Results & Form Submission Screen */
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {!submitted ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Column: Test Result report */}
                  <div className="lg:col-span-5 space-y-5">
                    <h4 className="text-sm font-mono font-bold text-slate-400 uppercase tracking-wider">
                      REPORTE DE SALUD COMERCIAL
                    </h4>

                    {/* Gauge Visual */}
                    <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/60 text-center space-y-3">
                      <span className="text-xs text-slate-500 font-medium block">Puntuación de Diagnóstico</span>
                      <div className="relative inline-flex items-center justify-center">
                        <span className="text-4xl font-extrabold font-display text-slate-800">
                          {scoreSum}
                        </span>
                        <span className="text-slate-400 font-medium ml-1">/ {maxScore}</span>
                      </div>

                      {/* Bar indicator */}
                      <div className="space-y-1">
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div
                            className={`${report.barColor} h-full transition-all duration-300`}
                            style={{ width: `${scorePercentage}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                          <span>Operación Frágil</span>
                          <span>Estructurada</span>
                        </div>
                      </div>
                    </div>

                    {/* Quality statement */}
                    <div className={`p-4 rounded-xl border ${report.color} space-y-2`}>
                      <h5 className="font-bold text-sm uppercase tracking-wide flex items-center gap-2">
                        <Milestone className="h-4 w-4 flex-shrink-0" />
                        {report.title}
                      </h5>
                      <p className="text-xs leading-relaxed opacity-95">
                        {report.intro}
                      </p>
                    </div>

                    <div className="bg-agro-50/50 p-4 rounded-xl border border-agro-100 space-y-2.5">
                      <h5 className="font-bold text-xs text-agro-900 uppercase tracking-wide flex items-center gap-1.5">
                        <Info className="h-4 w-4 text-agro-600 flex-shrink-0" />
                        Recomendación Estratégica
                      </h5>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {report.recommendation}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors w-full text-center py-2 underline cursor-pointer"
                    >
                      Repetir autoevaluación comercial
                    </button>
                  </div>

                  {/* Right Column: Lead Request Form */}
                  <div className="lg:col-span-7 bg-slate-50 border border-slate-200 p-6 rounded-xl space-y-4">
                    <div className="text-center md:text-left space-y-1">
                      <span className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-wider block">
                        PASO SIGUIENTE
                      </span>
                      <h4 className="text-base md:text-lg font-bold text-slate-800">
                        Solicite su Diagnóstico Comercial de 30-45 min
                      </h4>
                      <p className="text-slate-500 text-xs leading-relaxed">
                        Analizaremos telefónicamente su estructura actual y le propondremos acciones concretas para frenar el goteo de ventas. Totalmente gratuito para empresas agrícolas en España.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3.5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">
                            Su Nombre Completo *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Ej. Manuel García"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full text-sm py-2 px-3 rounded-md border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-agro-500 text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">
                            Cargo en la Entidad *
                          </label>
                          <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full text-sm py-2 px-3 rounded-md border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-agro-500 text-slate-900 cursor-pointer"
                          >
                            <option value="Gerente / Socio">Gerente / Socio</option>
                            <option value="Director Comercial">Director Comercial</option>
                            <option value="Propietario / Dueño">Propietario / Dueño</option>
                            <option value="Responsable de Ventas">Responsable de Ventas</option>
                            <option value="Otro directivo">Otro perfil de decisión</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">
                            Nombre de la Empresa *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Ej. Suministros Agropecuarios S.L."
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="w-full text-sm py-2 px-3 rounded-md border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-agro-500 text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">
                            Especialidad Agrícola *
                          </label>
                          <select
                            value={sector}
                            onChange={(e) => setSector(e.target.value as CompanySector)}
                            className="w-full text-sm py-2 px-3 rounded-md border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-agro-500 text-slate-900 cursor-pointer"
                          >
                            <option value="maquinaria">Maquinaria Agrícola</option>
                            <option value="distribuidor">Distribuidor Comercial</option>
                            <option value="fitosanitarios">Nutrición / Fitosanitarios</option>
                            <option value="biofertilizantes">Fabricación Biofertilizantes</option>
                            <option value="riego">Sistemas e Ingeniería de Riego</option>
                            <option value="otro">Otras Industrias Agropecuarias</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">
                            Móvil / WhatsApp de Contacto *
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="Ej. +34 600 000 000"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full text-sm py-2 px-3 rounded-md border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-agro-500 text-slate-900 font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">
                            Correo Coporativo *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="Ej. gerencia@empresa.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full text-sm py-2 px-3 rounded-md border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-agro-500 text-slate-900"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label htmlFor="lead-province" className="block text-xs font-bold text-slate-600 mb-1">
                            Provincia
                          </label>
                          <select
                            id="lead-province"
                            value={province}
                            onChange={(e) => setProvince(e.target.value)}
                            className="w-full text-sm py-2 px-3 rounded-md border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-agro-500 text-slate-900 cursor-pointer"
                          >
                            <option value="">Seleccione provincia</option>
                            {PROVINCES.map((p) => (
                              <option key={p} value={p}>{p}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="lead-channel" className="block text-xs font-bold text-slate-600 mb-1">
                            Canal de Contacto Preferido
                          </label>
                          <select
                            id="lead-channel"
                            value={followUpChannel}
                            onChange={(e) => setFollowUpChannel(e.target.value as FollowUpChannel | '')}
                            className="w-full text-sm py-2 px-3 rounded-md border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-agro-500 text-slate-900 cursor-pointer"
                          >
                            <option value="">Indiferente</option>
                            <option value="WhatsApp">WhatsApp</option>
                            <option value="Llamada">Llamada</option>
                            <option value="Email">Email</option>
                          </select>
                        </div>
                      </div>

                      {/* Honeypot anti-spam: invisible para personas */}
                      <input
                        type="text"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        className="hidden"
                      />

                      <label className="flex items-start gap-2 text-xs text-slate-600 cursor-pointer">
                        <input
                          type="checkbox"
                          required
                          checked={consent}
                          onChange={(e) => setConsent(e.target.checked)}
                          className="mt-0.5 h-4 w-4 accent-agro-700 cursor-pointer"
                        />
                        <span>
                          Acepto la <a href="#privacidad" className="underline hover:text-agro-700">política de privacidad</a> y que AGROFLOW contacte conmigo para realizar el diagnóstico comercial. *
                        </span>
                      </label>

                      {submitError && (
                        <div role="alert" className="flex items-start gap-2 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-md p-3">
                          <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                          <span>{submitError}</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full mt-4 bg-agro-700 hover:bg-agro-800 disabled:bg-slate-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow hover:shadow-md cursor-pointer text-sm"
                      >
                        <Calendar className="h-4 w-4" />
                        <span>
                          {submitting ? 'Enviando solicitud...' : 'Solicitar Diagnóstico Comercial Gratuito'}
                        </span>
                      </button>

                      <div className="flex items-center gap-2 justify-center text-[10px] text-slate-400 pt-1">
                        <ShieldCheck className="h-3.5 w-3.5 text-agro-500" />
                        <span>Cumplimiento RGPD. Sus datos están 100% seguros y nunca serán cedidos.</span>
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                /* Success message */
                <div className="text-center py-12 px-6 space-y-6">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <Check className="h-8 w-8 stroke-[3]" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold font-display text-slate-800">
                      ¡Solicitud Recibida Correctamente!
                    </h4>
                    <p className="text-slate-600 max-w-lg mx-auto text-sm">
                      Hola <strong>{name}</strong>, hemos registrado su autoevaluación comercial de la empresa <strong>{company}</strong> con una puntuación de ({scoreSum}/{maxScore}).
                    </p>
                    <p className="text-slate-600 max-w-lg mx-auto text-sm">
                      Nuestro Ingeniero Agrónomo fundador analizará sus respuestas y le contactará en menos de 24 horas laborables al teléfono <strong>{phone}</strong> (o al correo {email}) para concretar el día y la hora de la videollamada de diagnóstico.
                    </p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl max-w-sm mx-auto text-xs text-slate-500">
                    <span className="font-bold text-slate-700 uppercase block mb-1">¿Qué preparará el fundador para la llamada?</span>
                    <ul className="list-disc list-inside space-y-1 text-left">
                      <li>Un mapa inicial de su red de captación según su sector ({sector}).</li>
                      <li>Simulaciones comerciales de cómo reducir el papeleo administrativo de su plantilla comercial.</li>
                      <li>Ideas concretas de seguimiento aplicables en su negocio desde el primer día.</li>
                    </ul>
                  </div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-xs text-agro-600 font-bold hover:underline cursor-pointer"
                  >
                    Hacer otro autodiagnóstico
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
