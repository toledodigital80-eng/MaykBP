import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Tractor, 
  Sprout, 
  TrendingDown, 
  Users, 
  CheckSquare, 
  FileSpreadsheet, 
  Phone, 
  ShieldCheck, 
  ChevronDown, 
  Calendar, 
  ChevronRight, 
  UserCheck, 
  Clock, 
  ArrowRight, 
  Lock, 
  Sparkles, 
  Menu, 
  X,
  AlertTriangle,
  Award,
  BookOpen,
  Briefcase,
  Layers,
  FileCheck2,
  BookmarkCheck,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

import { BENEFITS, CASE_STUDIES, FAQS } from './data';
import { LeadSubmission } from './types';
import Calculator from './components/Calculator';
import DiagnosticWizard from './components/DiagnosticWizard';
import AgroflowDashboardPreview from './components/AgroflowDashboardPreview';
import WhatsAppButton, { whatsappUrl } from './components/WhatsAppButton';
import { TITULAR } from './legal/titular';
import heroImage from './assets/images/agroflow_hero_banner_1779466437412.png';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [estimatedLostCost, setEstimatedLostCost] = useState<number | undefined>(undefined);
  const [activeTabCase, setActiveTabCase] = useState<string>('c1');
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleLeadSuccess = (newLead: LeadSubmission) => {
    showToast(`¡Diagnóstico solicitado correctamente por ${newLead.company}!`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  };

  const handleCalculatorAction = (lostVal: number) => {
    setEstimatedLostCost(lostVal);
    scrollToSection('autodiagnostico');
    showToast(`Estimación: ${lostVal.toLocaleString('es-ES')} € al año. Complete el autodiagnóstico para revisarlo con Maykel.`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-agro-500 selection:text-white">
      {/* Toast alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-agro-900 border border-agro-600 text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-2.5 font-medium text-sm text-center"
          >
            <Sparkles className="h-4.5 w-4.5 text-harvest-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HEADER & NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200/85">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('inicio')}>
            <div className="w-10 h-10 bg-agro-900 text-white rounded-xl flex items-center justify-center font-black tracking-tighter text-lg shadow-md">
              AF
            </div>
            <div>
              <span className="font-extrabold text-lg md:text-xl tracking-tight text-agro-950 block leading-tight font-display">
                AGRO<span className="text-agro-600 font-bold">FLOW</span>™
              </span>
              <span className="text-[10px] text-slate-500 tracking-wider font-semibold uppercase block -mt-0.5">
                por {TITULAR.nombre}
              </span>
            </div>
          </div>

          {/* Nav links for screen layout */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <button onClick={() => scrollToSection('problematica')} className="hover:text-agro-700 transition-colors cursor-pointer">El Problema</button>
            <button onClick={() => scrollToSection('metodo')} className="hover:text-agro-700 transition-colors cursor-pointer">El Método</button>
            <button onClick={() => scrollToSection('beneficios')} className="hover:text-agro-700 transition-colors cursor-pointer">Beneficios</button>
            <button onClick={() => scrollToSection('casos')} className="hover:text-agro-700 transition-colors cursor-pointer">Ejemplos</button>
            <button onClick={() => scrollToSection('faq')} className="hover:text-agro-700 transition-colors cursor-pointer">Preguntas</button>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-agro-800 hover:text-agro-950 font-mono"
            >
              WhatsApp {TITULAR.telefono}
            </a>
            <button 
              onClick={() => scrollToSection('autodiagnostico')}
              className="bg-agro-900 hover:bg-agro-800 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm hover:shadow hover:-translate-y-0.5 cursor-pointer"
            >
              Solicitar Diagnóstico Comercial
            </button>
          </div>

          {/* Mobile menu trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 text-slate-500 hover:text-slate-950 focus:outline-none"
            aria-label="Menú de navegación"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Nav menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-slate-200 bg-white"
            >
              <div className="px-4 py-5 space-y-3 flex flex-col">
                <button onClick={() => scrollToSection('problematica')} className="text-left font-semibold text-slate-700 py-1.5 border-b border-slate-100 hover:text-agro-600">El Problema de Base</button>
                <button onClick={() => scrollToSection('metodo')} className="text-left font-semibold text-slate-700 py-1.5 border-b border-slate-100 hover:text-agro-600">El Método de 5 Fases</button>
                <button onClick={() => scrollToSection('beneficios')} className="text-left font-semibold text-slate-700 py-1.5 border-b border-slate-100 hover:text-agro-600">Beneficios</button>
                <button onClick={() => scrollToSection('casos')} className="text-left font-semibold text-slate-700 py-1.5 border-b border-slate-100 hover:text-agro-600">Ejemplos del sector</button>
                <button onClick={() => scrollToSection('faq')} className="text-left font-semibold text-slate-700 py-1.5 border-b border-slate-100 hover:text-agro-600">Preguntas Frecuentes</button>
                <button 
                  onClick={() => scrollToSection('autodiagnostico')}
                  className="w-full text-center bg-agro-900 hover:bg-agro-800 text-white font-bold py-3 rounded-lg text-sm mt-2 cursor-pointer"
                >
                  Solicitar Diagnóstico Comercial Gratuito
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. HERO SECTION */}
      <section id="inicio" className="relative overflow-hidden bg-gradient-to-br from-agro-950 to-agro-900 px-4 py-16 md:py-24 text-white">
        {/* Abstract background graphics with grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-40"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-agro-700/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 bg-agro-800/80 border border-agro-700/60 px-3 py-1.5 rounded-full text-[11px] md:text-xs text-agro-200 font-mono tracking-wider font-semibold uppercase">
              <Tractor className="h-3.5 w-3.5 text-harvest-400" />
              <span>Captación y seguimiento comercial para empresas agrícolas</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white font-display">
                La mayoría de empresas agrícolas no necesitan más publicidad. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-harvest-400 via-agro-300 to-emerald-400">
                  Necesitan mejores sistemas comerciales.
                </span>
              </h1>
              <p className="text-slate-300 text-base md:text-lg max-w-xl leading-relaxed">
                Soy {TITULAR.nombre}, Ingeniero Agrónomo especializado en marketing digital e IA. Ayudo a empresas de maquinaria, distribución, fitosanitarios, biofertilizantes y riego a <strong>generar más oportunidades comerciales</strong> con sistemas de captación, seguimiento, automatización e inteligencia artificial, sin complicar el trabajo de sus comerciales.
              </p>
            </div>

            {/* Core differentiating badges strictly customized for AGROFLOW as in request */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-200 font-semibold font-mono">
              <div className="flex items-center gap-2.5 bg-agro-800/40 border border-agro-700/30 p-3 rounded-lg">
                <span className="text-harvest-400 font-black">✔</span> No somos una agencia tradicional
              </div>
              <div className="flex items-center gap-2.5 bg-agro-800/40 border border-agro-700/30 p-3 rounded-lg">
                <span className="text-harvest-400 font-black">✔</span> No vendemos redes sociales
              </div>
              <div className="flex items-center gap-2.5 bg-agro-800/40 border border-agro-700/30 p-3 rounded-lg">
                <span className="text-harvest-400 font-black">✔</span> Hablamos de ventas, no de software
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 items-stretch sm:items-center">
              <button
                onClick={() => scrollToSection('autodiagnostico')}
                className="bg-harvest-500 hover:bg-harvest-600 text-agro-950 font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-center cursor-pointer text-sm"
              >
                Solicitar Diagnóstico Gratuito (30-45 min)
              </button>
              
              <button
                onClick={() => scrollToSection('calculadora')}
                className="bg-agro-800 hover:bg-agro-750 text-white border border-agro-700 hover:border-agro-600 font-semibold px-6 py-3.5 rounded-xl transition-all text-center cursor-pointer text-sm flex items-center justify-center gap-2"
              >
                <span>Calcule sus ventas perdidas</span>
                <ChevronDown className="h-4 w-4 text-agro-300" />
              </button>
            </div>

            <div className="flex items-center gap-2 md:gap-3 text-slate-400 text-xs font-mono pt-2">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-harvest-400" /> Sesión Online de 30-45 min
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <UserCheck className="h-3.5 w-3.5 text-harvest-400" /> Para gerentes y directores comerciales
              </span>
            </div>
          </div>

          {/* Hero Right Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-harvest-500 to-agro-500 rounded-2xl blur opacity-30"></div>
            <div className="relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={heroImage} 
                alt="Seguimiento comercial para empresas agrícolas" 
                className="w-full h-auto object-cover opacity-85 hover:scale-[1.02] transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent flex flex-col justify-end p-5">
                <p className="text-xs text-harvest-400 font-bold uppercase tracking-wider font-mono">Cada presupuesto, con su seguimiento</p>
                <span className="text-sm text-slate-200 mt-1 font-medium">«Muchas ventas no se pierden por el precio, sino porque nadie volvió a llamar a tiempo después de la feria.»</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CALCULADORA INTERACTIVA DE PÉRDIDAS */}
      <section id="calculadora" className="py-16 bg-slate-100 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 mb-10">
            <span className="text-xs font-mono font-bold text-agro-700 bg-agro-100 px-3 py-1 rounded-full uppercase tracking-wider">
              Calculadora
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 font-display">
              ¿Cuánto le cuesta la falta de seguimiento?
            </h2>
            <p className="text-slate-650 max-w-xl mx-auto text-sm md:text-base">
              Elija su sector y ajuste los mandos para estimar cuántas ventas se escapan cada año por presupuestos que nadie vuelve a llamar.
            </p>
          </div>

          <Calculator onActionClick={handleCalculatorAction} />
        </div>
      </section>

      {/* 4. IDENTIFICACIÓN DEL PROBLEMA */}
      <section id="problematica" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Content Copy */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono font-bold text-rose-600 bg-rose-50 border border-rose-100 py-1.5 px-3 rounded-full uppercase tracking-wide">
                La Realidad del Sector Agrícola Español
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-display leading-tight">
                Las ventas se pierden entre papeles, correos sin contestar y chats de WhatsApp
              </h2>
              <p className="text-slate-650 text-base leading-relaxed">
                Su equipo de campo conoce al distribuidor, al técnico de la cooperativa y al agricultor. Son buenos comerciales y la confianza se gana en persona.
              </p>
              <p className="text-slate-650 text-base leading-relaxed">
                Pero en plena campaña es imposible acordarse de todo. En cada feria y en cada visita se recogen contactos que acaban en una libreta o perdidos entre chats de WhatsApp.
              </p>

              <div className="bg-amber-50 border border-amber-200 p-5 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-amber-800">
                  <AlertTriangle className="h-5 w-5 flex-shrink-0 animate-bounce" />
                  <span className="font-bold text-sm">¿La consecuencia directa de esto?</span>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed font-medium">
                  Se envía un presupuesto importante de riego o de maquinaria y nadie vuelve a llamar en las dos semanas siguientes. El cliente interpreta falta de interés y acaba comprando a la competencia.
                </p>
              </div>
            </div>

            {/* Right Interactive Problem List */}
            <div className="lg:col-span-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest font-mono mb-2">
                Fugas comunes que combatimos con sistemas comerciales
              </h3>

              {[
                {
                  icon: <CheckSquare className="h-5 w-5 text-rose-500 mt-1" />,
                  title: 'Leads de Ferias e Interesados Perdidos',
                  desc: 'Se invierte en stands de ferias del sector como FIMA. Los contactos se apuntan en tarjetas que se traspapelan y, semanas después, nadie ha llamado a esos agricultores interesados.'
                },
                {
                  icon: <FileSpreadsheet className="h-5 w-5 text-rose-500 mt-1" />,
                  desc: 'Sin un registro común, cada delegado lleva su cartera en la cabeza. Si se marcha a la competencia, sus clientes se van con él.',
                  title: 'Trazabilidad Comercial Inexistente'
                },
                {
                  icon: <Phone className="h-5 w-5 text-rose-500 mt-1" />,
                  title: 'Dependencia Excesiva del WhatsApp Personal',
                  desc: 'Presupuestos, descuentos y acuerdos quedan en chats personales, sin ningún registro en la empresa.'
                },
                {
                  icon: <TrendingDown className="h-5 w-5 text-rose-500 mt-1" />,
                  title: 'Ofertas sin seguimiento',
                  desc: 'Se envía una oferta por correo y no se vuelve a insistir. Nadie avisa al comercial: «Llama hoy al distribuidor de Cuenca, su oferta caduca mañana».'
                },
                {
                  icon: <Users className="h-5 w-5 text-rose-500 mt-1" />,
                  title: 'Gerencia sin datos',
                  desc: 'El gerente no sabe cuántos presupuestos hay abiertos, cuántos cierra cada comercial ni qué ventas se esperan para la próxima campaña.'
                }
              ].map((item, idx) => (
                <div key={idx} className="p-4 bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200/60 rounded-xl flex items-start gap-3">
                  <div className="bg-rose-50 p-2 rounded-lg text-rose-600 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm leading-normal">{item.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 5. PRESENTACIÓN DE AGROFLOW™ (EL MÉTODO DE 5 FASES) */}
      <section id="metodo" className="py-16 md:py-24 bg-gradient-to-br from-agro-950 to-agro-900 text-white relative">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold text-harvest-400 uppercase tracking-widest bg-agro-900 border border-agro-800 py-1 px-3 rounded-full">
              El método
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-display">
              El Método AGROFLOW™
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              No se trata de instalar un programa que nadie usa. Es un método sencillo en cinco pasos para que ninguna oportunidad comercial se quede por el camino.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {/* Visual connector line in desktop */}
            <div className="hidden md:block absolute top-[44px] left-12 right-12 h-0.5 bg-gradient-to-r from-agro-700 via-harvest-500 to-agro-750 z-0"></div>

            {[
              {
                step: '01',
                title: 'Atracción',
                desc: 'Atraemos a agricultores y distribuidores de su zona que de verdad necesitan su maquinaria o sus insumos.',
                icon: <Sprout className="h-5 w-5 text-harvest-400" />
              },
              {
                step: '02',
                title: 'Captación',
                desc: 'Recogemos cada petición de presupuesto, venga de la web, de una feria, de una llamada o de WhatsApp.',
                icon: <CheckSquare className="h-5 w-5 text-harvest-400" />
              },
              {
                step: '03',
                title: 'Organización',
                desc: 'Cada contacto entra en un registro único de la empresa y se asigna al comercial de su zona o de su línea de producto.',
                icon: <Layers className="h-5 w-5 text-harvest-400" />
              },
              {
                step: '04',
                title: 'Automatización',
                desc: 'Recordatorios de llamada, avisos de ofertas a punto de caducar y detección de presupuestos parados, con ayuda de la IA.',
                icon: <Sparkles className="h-5 w-5 text-harvest-400" />
              },
              {
                step: '05',
                title: 'Conversión',
                desc: 'El comercial se centra en las oportunidades con más opciones y la gerencia ve qué se cierra y qué no.',
                icon: <Award className="h-5 w-5 text-harvest-400" />
              }
            ].map((phase, idx) => (
              <div key={idx} className="bg-agro-900/60 border border-agro-800 hover:border-agro-700/80 p-5 rounded-xl space-y-4 relative z-10 transition-transform hover:-translate-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-black font-mono text-agro-700/50">{phase.step}</span>
                  <div className="bg-agro-855 p-2 rounded-lg">
                    {phase.icon}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">{phase.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mt-2">{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-slate-900/90 border border-slate-800 p-6 md:p-8 rounded-2xl max-w-5xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <span className="text-[10px] text-harvest-400 font-mono uppercase tracking-wider block font-bold">Demostración con datos de ejemplo</span>
              <h3 className="text-lg md:text-xl font-bold font-display text-white">Pruebe el Panel Comercial AGROFLOW™</h3>
              <p className="text-xs text-slate-400 max-w-xl mx-auto">
                Pulse el botón de seguimiento automático para ver cómo cambia un panel comercial cuando ningún presupuesto se olvida. Los datos son de ejemplo.
              </p>
            </div>
            <AgroflowDashboardPreview />
          </div>

        </div>
      </section>

      {/* 6. BENEFICIOS CONCRETOS (RESULTADOS) */}
      <section id="beneficios" className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold text-agro-700 bg-agro-100 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              Beneficios
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 font-display">
              Venda más sobre el terreno sin perder el control de su oficina
            </h2>
            <p className="text-slate-650 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
              La tecnología es solo el medio. Lo que importa es lo que cambia en su día a día comercial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((benefit, idx) => (
              <div key={benefit.id} className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="w-10 h-10 bg-agro-50 text-agro-700 rounded-xl flex items-center justify-center font-bold text-sm font-mono border border-agro-100">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-display">{benefit.title}</h3>
                  <p className="text-xs text-slate-650 leading-relaxed">{benefit.description}</p>
                </div>
                <div className="bg-agro-50 p-3 rounded-lg border border-agro-100 text-xs">
                  <span className="font-bold text-agro-900 block uppercase tracking-wider text-[10px] mb-0.5">Resultado visible:</span>
                  <p className="text-slate-700 leading-normal">{benefit.outcome}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-6 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-3.5">
              <div className="bg-agro-100 text-agro-800 p-3 rounded-full flex-shrink-0 mt-0.5">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-800">Sus datos, siempre suyos</h4>
                <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
                  La información de sus clientes queda en herramientas a nombre de su empresa y se trata conforme al RGPD. Si un día deja de trabajar con nosotros, todo sigue siendo suyo.
                </p>
              </div>
            </div>
            <button 
              onClick={() => scrollToSection('autodiagnostico')}
              className="bg-agro-900 hover:bg-agro-800 text-white font-bold text-xs px-5 py-3 rounded-lg transition-colors flex-shrink-0 cursor-pointer text-center"
            >
              Probar Autodiagnóstico Gratuito
            </button>
          </div>

        </div>
      </section>

      {/* 7. CASOS DE USO / EJEMPLOS REALES */}
      <section id="casos" className="py-16 md:py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold text-agro-700 bg-agro-100 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              Ejemplos ilustrativos
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 font-display">
              Situaciones habituales en el sector
            </h2>
            <p className="text-slate-650 text-sm md:text-base leading-relaxed">
              El sistema se adapta a su forma de vender, según fabrique, distribuya o instale. Elija su sector para ver un ejemplo de cómo se aplica (situaciones tipo, no casos de clientes concretos):
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left selector buttons */}
            <div className="lg:col-span-4 space-y-2.5">
              {[
                { id: 'c1', label: 'Maquinaria Agrícola e Importadoras' },
                { id: 'c2', label: 'Nutrición, Biofertilizantes y Abonos' },
                { id: 'c3', label: 'Sistemas de Riego y Obra Hidráulica' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabCase(tab.id)}
                  className={`w-full text-left p-4 rounded-xl border font-bold text-sm transition-all flex justify-between items-center cursor-pointer ${
                    activeTabCase === tab.id
                      ? 'bg-agro-900 border-agro-900 text-white shadow'
                      : 'border-slate-200 text-slate-700 bg-white hover:bg-slate-50'
                  }`}
                >
                  <span>{tab.label}</span>
                  <ChevronRight className={`h-4 w-4 transition-transform ${activeTabCase === tab.id ? 'translate-x-1 text-harvest-400' : 'text-slate-400'}`} />
                </button>
              ))}
            </div>

            {/* Right details card */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                {CASE_STUDIES.map((cs) => {
                  if (cs.id !== activeTabCase) return null;
                  return (
                    <motion.div
                      key={cs.id}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.2 }}
                      className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm"
                    >
                      <div className="flex flex-wrap justify-between items-center gap-4">
                        <div>
                          <span className="text-xs font-mono font-bold text-agro-700 bg-agro-100 rounded px-2 py-0.5">
                            {cs.sector}
                          </span>
                          <h3 className="text-xl font-bold font-display text-slate-900 mt-1">{cs.companyType}</h3>
                        </div>
                        <div className="bg-rose-50 border border-rose-100 p-2.5 rounded-lg text-rose-700 text-xs font-mono">
                          <span className="font-bold block uppercase tracking-wider text-[9px] text-rose-600 mb-0.5">Dónde se pierden ventas:</span>
                          <span>{cs.leak}</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="text-xs font-bold font-mono tracking-wider text-slate-400 uppercase">La situación:</h4>
                          <p className="text-xs text-slate-650 leading-relaxed mt-1">{cs.scenario}</p>
                        </div>

                        <div>
                          <h4 className="text-xs font-bold font-mono tracking-wider text-slate-400 uppercase">Cómo lo resuelve AGROFLOW™:</h4>
                          <p className="text-xs text-slate-650 leading-relaxed mt-1">{cs.agroflowImpact}</p>
                        </div>
                      </div>

                      <div className="border-t border-slate-200 pt-5 flex items-center gap-3 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/40">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
                          ✓
                        </div>
                        <div>
                          <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block">Resultado esperado</span>
                          <p className="text-xs font-bold text-slate-800 leading-normal">{cs.highlight}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </section>

      {/* 8. CÓMO FUNCIONA EL DIAGNÓSTICO COMERCIAL */}
      <section id="metodologia-diagnostico" className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold text-agro-700 bg-agro-100 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              Paso a paso
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 font-display">
              ¿Cómo funciona el Diagnóstico Comercial Agro?
            </h2>
            <p className="text-slate-650 text-sm md:text-base leading-relaxed">
              Un proceso sencillo en 4 pasos. Usted nos cuenta cómo trabaja hoy su equipo comercial y nosotros preparamos el análisis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: 'Paso 1',
                title: 'Autodiagnóstico',
                desc: `Responda el autodiagnóstico de abajo. ${TITULAR.nombre}, Ingeniero Agrónomo, revisará personalmente sus respuestas.`,
                detail: 'Duración: 2 minutos.'
              },
              {
                step: 'Paso 2',
                title: 'Reunión de diagnóstico',
                desc: 'Una sesión online o por teléfono de 30-45 minutos para revisar cómo se gestionan hoy sus presupuestos y contactos.',
                detail: 'Sin coste ni compromiso.'
              },
              {
                step: 'Paso 3',
                title: 'Dónde se pierden ventas',
                desc: 'Localizamos en qué momentos de su proceso comercial se pierden más oportunidades.',
                detail: 'Con datos de su propia empresa.'
              },
              {
                step: 'Paso 4',
                title: 'Plan de acción',
                desc: 'Le enviamos por escrito un plan sencillo para que su equipo deje de perder presupuestos.',
                detail: 'Para aplicarlo con o sin nosotros.'
              }
            ].map((step, idx) => (
              <div key={idx} className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm space-y-4 relative flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="font-mono text-xs font-bold text-agro-600 bg-agro-50 border border-agro-100 py-1 px-2.5 rounded-full inline-block">
                    {step.step}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 font-display">{step.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
                <div className="border-t border-slate-100 pt-3 text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
                  <Clock className="h-3 w-3 text-agro-500" />
                  <span>{step.detail}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. SECCIÓN INTERACTIVA PRINCIPAL - WIZARD DE AUTODIAGNOSTICO Y CONTACTO */}
      <section id="autodiagnostico" className="py-16 md:py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-mono font-bold text-harvest-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              Diagnóstico Comercial Agro Gratuito
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 font-display">
              Solicite su diagnóstico de 30-45 minutos
            </h2>
            <p className="text-slate-650 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
              Haga el autodiagnóstico en 2 minutos y solicite su sesión con {TITULAR.nombre}.
            </p>
          </div>

          <DiagnosticWizard 
            initialEstimatedLostRevenue={estimatedLostCost} 
            onSubmitSuccess={handleLeadSuccess} 
          />
        </div>
      </section>

      {/* 11. PREGUNTAS FRECUENTES (FAQs) */}
      <section id="faq" className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs font-mono font-bold text-agro-700 bg-agro-100 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              Claridad y Transparencia Absoluta
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 font-display">
              Preguntas de Gerencia y Dudas Habituales
            </h2>
            <p className="text-slate-650 text-sm md:text-base">
              Resolvemos sin filtros las objeciones y realidades de directores comerciales y gerentes antes de contratar un sistema.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq) => {
              const isOpen = activeFaq === faq.id;
              return (
                <div key={faq.id} className="border border-slate-200 rounded-xl overflow-hidden transition-all bg-slate-50 hover:bg-slate-100/60">
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                    className="w-full text-left p-5 font-bold text-[13px] md:text-sm text-slate-800 flex justify-between items-center gap-4 cursor-pointer focus:outline-none"
                  >
                    <span className="leading-snug flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-agro-600 flex-shrink-0" />
                      {faq.question}
                    </span>
                    <ChevronDown className={`h-4.5 w-4.5 text-slate-400 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180 text-agro-600' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-5 pt-0 text-xs md:text-[13px] text-slate-600 leading-relaxed border-t border-slate-200 bg-white">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 12. SECCIÓN DE CIERRE Y CTA FINAL */}
      <section className="bg-gradient-to-br from-agro-950 to-agro-900 text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-30"></div>
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-harvest-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-1 bg-harvest-500/15 border border-harvest-400/20 px-3 py-1 rounded-full text-xs text-harvest-400 font-mono">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Diagnóstico gratuito y sin compromiso</span>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-white">
              ¿Sus ventas dependen de la memoria de su equipo?
            </h2>
            <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Reserve su Diagnóstico Comercial Agro Gratuito de 30-45 minutos con {TITULAR.nombre}, Ingeniero Agrónomo, y descubra dónde se le escapan las oportunidades esta campaña.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => scrollToSection('autodiagnostico')}
              className="w-full sm:w-auto bg-harvest-500 hover:bg-harvest-600 text-agro-950 font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5 cursor-pointer text-sm"
            >
              Solicitar Diagnóstico Gratuito
            </button>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-agro-800 hover:bg-agro-750 border border-agro-700 hover:border-agro-600 text-white font-semibold px-6 py-4 rounded-xl transition-all text-sm text-center"
            >
              Escribir por WhatsApp ({TITULAR.telefono})
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-4 w-4 text-harvest-400" /> Sin compromiso
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-harvest-400" /> Respuesta en 24 h laborables
            </span>
            <span className="flex items-center gap-1">
              <UserCheck className="h-4 w-4 text-harvest-400" /> Confidencialidad
            </span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-12 px-4 border-t border-slate-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-8 space-y-3">
            <span className="font-extrabold text-lg text-white font-display uppercase tracking-tight">
              AGROFLOW<span className="text-agro-500 font-bold">™</span>
            </span>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Sistemas de captación, seguimiento, automatización e IA para empresas agrícolas en España. Por {TITULAR.nombre}, Ingeniero Agrónomo.
            </p>
            <p className="text-xs text-slate-400">
              <a href={`mailto:${TITULAR.email}`} className="hover:text-white">{TITULAR.email}</a>
              <span className="mx-2">·</span>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-white">WhatsApp {TITULAR.telefono}</a>
            </p>
          </div>

          <div className="md:col-span-4 text-left md:text-right space-y-3">
            <span className="text-xs font-semibold text-slate-300 block">© 2026 AGROFLOW™. Todos los derechos reservados.</span>
            <div className="flex justify-start md:justify-end gap-3 text-xs">
              <a href="#aviso-legal" className="hover:text-white transition-colors">Aviso Legal</a>
              <span>·</span>
              <a href="#privacidad" className="hover:text-white transition-colors">Política de Privacidad</a>
            </div>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
}
