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
    showToast(`Fuga de ${lostVal.toLocaleString('es-ES')}€ calculada. Rellene el autodiagnóstico comercial.`);
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
                Ingeniería Comercial Agrícola
              </span>
            </div>
          </div>

          {/* Nav links for screen layout */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <button onClick={() => scrollToSection('problematica')} className="hover:text-agro-700 transition-colors cursor-pointer">El Problema</button>
            <button onClick={() => scrollToSection('metodo')} className="hover:text-agro-700 transition-colors cursor-pointer">El Método</button>
            <button onClick={() => scrollToSection('beneficios')} className="hover:text-agro-700 transition-colors cursor-pointer">Resultados</button>
            <button onClick={() => scrollToSection('casos')} className="hover:text-agro-700 transition-colors cursor-pointer">Casos de Éxito</button>
            <button onClick={() => scrollToSection('faq')} className="hover:text-agro-700 transition-colors cursor-pointer">Preguntas</button>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
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
                <button onClick={() => scrollToSection('beneficios')} className="text-left font-semibold text-slate-700 py-1.5 border-b border-slate-100 hover:text-agro-600">Resultados Prácticos</button>
                <button onClick={() => scrollToSection('casos')} className="text-left font-semibold text-slate-700 py-1.5 border-b border-slate-100 hover:text-agro-600">Casos de Uso Reales</button>
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
              <span>Sistemas de Organización Comercial Especializados en el Sector Agro</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white font-display">
                La mayoría de empresas agrícolas no necesitan más publicidad. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-harvest-400 via-agro-300 to-emerald-400">
                  Necesitan mejores sistemas comerciales.
                </span>
              </h1>
              <p className="text-slate-300 text-base md:text-lg max-w-xl leading-relaxed">
                Ayudamos a fabricantes de maquinaria, fitosanitarios, biofertilizantes e instaladoras de riego españolas a <strong>frenar la pérdida de oportunidades</strong> y estructurar un seguimiento de ventas automático sin complicar la vida a sus delegados de zona.
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
                <span className="text-harvest-400 font-black">✔</span> No vendemos páginas web vacías
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
                <span>Mida su fuga en 60 segundos</span>
                <ChevronDown className="h-4 w-4 text-agro-300" />
              </button>
            </div>

            <div className="flex items-center gap-2 md:gap-3 text-slate-400 text-xs font-mono pt-2">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-harvest-400" /> Sesión Online de 30-45 min
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <UserCheck className="h-3.5 w-3.5 text-harvest-400" /> Dirigido a Gerentes y Directores Comerciales
              </span>
            </div>
          </div>

          {/* Hero Right Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-harvest-500 to-agro-500 rounded-2xl blur opacity-30"></div>
            <div className="relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={heroImage} 
                alt="Agroflow Smart Farming Business Control" 
                className="w-full h-auto object-cover opacity-85 hover:scale-[1.02] transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent flex flex-col justify-end p-5">
                <p className="text-xs text-harvest-400 font-bold uppercase tracking-wider font-mono">Control de Campaña en Tiempo Real</p>
                <span className="text-sm text-slate-200 mt-1 font-medium">«¿Sabía que el 30% de sus oportunidades agropecuarias mueren al no realizar una llamada simple el tercer día tras la feria?»</span>
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
              Diagnóstico Cuantitativo
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 font-display">
              ¿Cuánto dinero está costándole a su empresa la falta de seguimiento?
            </h2>
            <p className="text-slate-650 max-w-xl mx-auto text-sm md:text-base">
              Modifique los mandos para estimar el total de presupuestos de maquinaria, bioestimulantes o riego que se están escapando cada año por falta de un proceso estructurado.
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
                El canal de ventas tradicional está colapsado por el papeleo de oficina y correos sin contestar
              </h2>
              <p className="text-slate-650 text-base leading-relaxed">
                Usted confía en la palabra de su equipo de campo. Son excelentes comerciales, con gran don de gentes, conocen perfectamente al distribuidor, al agrónomo de cooperativa y al gran dueño de finca. 
              </p>
              <p className="text-slate-650 text-base leading-relaxed">
                Sin embargo, la carga diaria en época de campaña agrícola hace imposible que recuerden todo. En cada feria agrícola de primer nivel, en cada visita técnica, se capturan decenas de correos y teléfonos que terminan en cuadernos rústicos o sepultados bajo infinitos chats de WhatsApp.
              </p>

              <div className="bg-amber-50 border border-amber-200 p-5 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-amber-800">
                  <AlertTriangle className="h-5 w-5 flex-shrink-0 animate-bounce" />
                  <span className="font-bold text-sm">¿La consecuencia directa de esto?</span>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed font-medium">
                  Se presentan presupuestos cuantiosos para instalaciones de riego complejos o flotas de maquinaria. Nadie vuelve a llamar al cliente en los siguientes 15 días. El cliente, ante la falta de insistencia y atención, asume falta de seriedad o simplemente compra a la cooperativa de la competencia por inercia técnica.
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
                  desc: 'Se invierte miles de euros en stands de ferias del sector (como FIMA o Expoagro). Los contactos se apuntan en cartulinas que acaban traspapeladas. Tres semanas después, nadie ha llamado a esos agricultores interesados.'
                },
                {
                  icon: <FileSpreadsheet className="h-5 w-5 text-rose-500 mt-1" />,
                  desc: 'Si no hay un Excel central que todos usen, cada delegado tiene su cartera en su cabeza. Si el comercial se marcha a trabajar con un competidor de nutrición vegetal, su base comercial vuela con él.',
                  title: 'Trazabilidad Comercial Inexistente'
                },
                {
                  icon: <Phone className="h-5 w-5 text-rose-500 mt-1" />,
                  title: 'Dependencia Excesiva del WhatsApp Personal',
                  desc: 'Los presupuestos, acuerdos de descuento por volumen de compra y cotizaciones flotan en chats individuales sin ningún registro en la sede de la empresa.'
                },
                {
                  icon: <TrendingDown className="h-5 w-5 text-rose-500 mt-1" />,
                  title: 'Seguimiento de Ofertas inexistente o Descoordinado',
                  desc: 'Se redacta una oferta técnica por correo y nunca más se insiste. No hay alertas que avisen al comercial: «Llama hoy al distribuidor de Cuenca, su oferta caduca mañana».'
                },
                {
                  icon: <Users className="h-5 w-5 text-rose-500 mt-1" />,
                  title: 'Ceguera de métricas para Dirección',
                  desc: 'El Gerente no tiene datos reales sobre cuántos presupuestos de obra hay presentados en total, qué tasa de efectividad posee cada vendedor o cuántas ventas se cerrarán para la próxima siembra.'
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
              SISTEMA INTEGRAL DE CONTROL COMERCIAL
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-display">
              El Método AGROFLOW™
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              No implantamos software informático que sus comerciales odien usar. Estructuramos un método de negocio simple que automatiza la retención de clientes en cinco pasos específicos del sector agropecuaria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {/* Visual connector line in desktop */}
            <div className="hidden md:block absolute top-[44px] left-12 right-12 h-0.5 bg-gradient-to-r from-agro-700 via-harvest-500 to-agro-750 z-0"></div>

            {[
              {
                step: '01',
                title: 'Atracción',
                desc: 'Identificamos agricultores y distribuidores cualificados que necesitan maquinaria o insumos en su zona geográfica concreta, canalizando la intención de compra real.',
                icon: <Sprout className="h-5 w-5 text-harvest-400" />
              },
              {
                step: '02',
                title: 'Captación',
                desc: 'Capturamos solicitudes de presupuestos de forma fluida: formularios móviles adaptados para ferias presenciales o llamadas directas, sin perder ni un solo contacto.',
                icon: <CheckSquare className="h-5 w-5 text-harvest-400" />
              },
              {
                step: '03',
                title: 'Organización',
                desc: 'El contacto entra directo al sistema, se asocia a la cartera de la empresa y se asigna automáticamente al comercial de la provincia por GPS o línea de producto.',
                icon: <Layers className="h-5 w-5 text-harvest-400" />
              },
              {
                step: '04',
                title: 'Automatización',
                desc: 'El sistema asiste de forma inteligente: programa llamadas rutinarias, recuerda vigencias de tarifas de abono o maquinaria y detecta cotizaciones inactivas.',
                icon: <Sparkles className="h-5 w-5 text-harvest-400" />
              },
              {
                step: '05',
                title: 'Conversión',
                desc: 'Control total de cierres y facturación. El comercial se enfoca en cooperativas precalificadas y la dirección obtiene métricas de rentabilidad por primera vez.',
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
              <span className="text-[10px] text-harvest-400 font-mono uppercase tracking-wider block font-bold">Demostración Visual Interactiva</span>
              <h3 className="text-lg md:text-xl font-bold font-display text-white">Pruebe el Panel Comercial AGROFLOW™</h3>
              <p className="text-xs text-slate-400 max-w-xl mx-auto">
                Pulse el botón de seguimiento automático para simular cómo evitamos el olvido y fugas en su red comercial.
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
              Beneficios Basados en Resultados Reales
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 font-display">
              Venda más sobre el terreno sin perder el control de su oficina
            </h2>
            <p className="text-slate-650 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
              No nos importa la tecnología por sí misma. Lo que cambia su negocio son estos cinco resultados concretos desde el primer mes de implantación.
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
                <h4 className="text-sm font-bold text-slate-800">Sello de Cumplimiento Agro-Industrial</h4>
                <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
                  Nuestros sistemas cuentan con los estándares de seguridad necesarios para cumplir con normativas de cooperativas españolas y protección de marcas de fertilizantes autorizados por el MAPA.
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
              Experiencia Sectorial Concreta
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 font-display">
              Especialistas en su tipo de Operación Comercial
            </h2>
            <p className="text-slate-650 text-sm md:text-base leading-relaxed">
              No deforma su forma de vender para encajar en un software. Adaptamos el sistema según si usted fabrica, distribuye o instala. Elija su especialidad para conocer un caso de uso real:
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
                          <span className="font-bold block uppercase tracking-wider text-[9px] text-rose-600 mb-0.5">La Fuga Común:</span>
                          <span>{cs.leak}</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="text-xs font-bold font-mono tracking-wider text-slate-400 uppercase">La Situación Inicial:</h4>
                          <p className="text-xs text-slate-650 leading-relaxed mt-1">{cs.scenario}</p>
                        </div>

                        <div>
                          <h4 className="text-xs font-bold font-mono tracking-wider text-slate-400 uppercase">La Solución AGROFLOW™:</h4>
                          <p className="text-xs text-slate-650 leading-relaxed mt-1">{cs.agroflowImpact}</p>
                        </div>
                      </div>

                      <div className="border-t border-slate-200 pt-5 flex items-center gap-3 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/40">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
                          ✓
                        </div>
                        <div>
                          <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block">El Impacto en Facturación</span>
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
              Hoja de Ruta de Conversión
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 font-display">
              ¿Cómo funciona el Diagnóstico Comercial Agro?
            </h2>
            <p className="text-slate-650 text-sm md:text-base leading-relaxed">
              No queremos que pierda el tiempo. Diseñamos un proceso ágil en 4 fases donde su única tarea es explicarnos cómo atienden hoy el campo. El resto lo calculamos nosotros.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: 'Paso 1',
                title: 'Solicitud del Test',
                desc: 'Rellena el autodiagnóstico de abajo. El fundador (Ingeniero Agrónomo) analizará directamente sus respuestas técnicas.',
                detail: 'Duración: 2 minutos.'
              },
              {
                step: 'Paso 2',
                title: 'Reunión Estratégica',
                desc: 'Hacemos una sesión online o telefónica privada de 30-45 minutos analizando de verdad su organización actual y plantillas.',
                detail: 'Sin coste ni compromiso.'
              },
              {
                step: 'Paso 3',
                title: 'Identificación de Fugas',
                desc: 'Localizamos en qué puntos de su proceso comercial agrario se están perdiendo el 80% de las oportunidades de repuesto o abono.',
                detail: 'Datos objetivos del negocio.'
              },
              {
                step: 'Paso 4',
                title: 'Plan de Acción',
                desc: 'Le enviamos por escrito una guía de implementación simplificada para que sus comerciales dejen de perder cotizaciones.',
                detail: 'Listo para aplicar de inmediato.'
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
              Área de Registro Oficial
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 font-display">
              Obtenga su Diagnóstico Comercial de 30-45 min
            </h2>
            <p className="text-slate-650 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
              Consiga su autoevaluación comercial de forma preliminar en la interfaz inteligente y agende su llamada técnica con el equipo fundador.
            </p>
          </div>

          <DiagnosticWizard 
            initialEstimatedLostRevenue={estimatedLostCost} 
            onSubmitSuccess={handleLeadSuccess} 
          />
        </div>
      </section>

      {/* 10. SOBRE EL FUNDADOR */}
      <section id="fundador" className="py-16 md:py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-md grid grid-cols-1 md:grid-cols-12 gap-8 p-6 md:p-10 items-center">
            
            {/* Founder Avatar info */}
            <div className="md:col-span-4 text-center space-y-4">
              <div className="relative inline-block">
                <div className="w-32 h-32 md:w-40 md:h-40 bg-agro-100 rounded-full overflow-hidden mx-auto border-4 border-agro-900 shadow-md">
                  <img 
                    src="https://picsum.photos/seed/agronomo/320/320" 
                    alt="Fundador - Ingeniero Agrónomo" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-harvest-500 text-agro-950 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono shadow border border-white">
                  Ing. Agrónomo
                </div>
              </div>

              <div>
                <h3 className="font-bold text-base text-slate-800">Jaime Toledo</h3>
                <p className="text-xs text-slate-500 font-mono">Fundador - AGROFLOW™</p>
                <p className="text-[11px] text-slate-400 mt-1">Especializado en Automatización Comercial</p>
              </div>
            </div>

            {/* Founder background letter */}
            <div className="md:col-span-8 space-y-4">
              <span className="text-xs font-mono font-bold text-agro-800 uppercase tracking-wider block">
                CARTA INTEGRAL DEL INGENIERO COMERCIAL
              </span>
              <h4 className="text-xl font-bold font-display text-slate-900 leading-tight">
                «Entendemos el valor de la palabra en el campo español. No vendemos fantasías informáticas.»
              </h4>
              <p className="text-xs text-slate-650 leading-relaxed space-y-2">
                Como Ingeniero Agrónomo, he pasado muchisimas jornadas visitando almacenes agricultores, cooperativas andaluzas y distribuidores de repuestos de tractores en Castilla. He visto cómo comerciales brillantes perdían ventas de 60.000€ simplemente por apuntar el teléfono del agricultor en una caja de cartón de abono mojada.
              </p>
              <p className="text-xs text-slate-650 leading-relaxed">
                Nací para resolver eso. En el sector agrícola español, la confianza se fragua con el trato humano, pero se consolida con la puntualidad y el servicio serio. AGROFLOW™ no viene a cambiar cómo habla usted con sus clientes habituales. Viene a recordarle de forma rigurosa cuándo llamarlos para que ningún presupuesto quede en el tintero.
              </p>
              <div className="pt-2 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-agro-600" />
                <span className="text-[10px] text-slate-500 font-bold font-mono">CONFIDENCIALIDAD TÉCNICA E INDUSTRIAL GARANTIZADA</span>
              </div>
            </div>

          </div>
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
            <span>Cupo Mensual Limitado a 8 Diagnósticos Gratuitos</span>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-white">
              ¿Seguirá confiando las ventas a la memoria o prefiere el control real?
            </h2>
            <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Evite las fugas comerciales de maquinaria o biofertilizantes en la actual campaña. Reserve su Diagnóstico Comercial Gratuito de 30-45 minutos con un Ingeniero Agrónomo y empiece a proteger su base de datos.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => scrollToSection('autodiagnostico')}
              className="w-full sm:w-auto bg-harvest-500 hover:bg-harvest-600 text-agro-950 font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5 cursor-pointer text-sm"
            >
              Solicitar Diagnóstico Comercial Ahora
            </button>
            <button
              onClick={() => scrollToSection('calculadora')}
              className="w-full sm:w-auto bg-agro-905 hover:bg-agro-800 border border-agro-700 hover:border-agro-600 text-slate-250 font-semibold px-6 py-4 rounded-xl transition-all cursor-pointer text-sm"
            >
              Recalcular Fuga Comercial
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-4 w-4 text-harvest-400" /> Sin Contratos de Permanencia
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-harvest-400" /> Confirmación Directo en 24h
            </span>
            <span className="flex items-center gap-1">
              <UserCheck className="h-4 w-4 text-harvest-400" /> Garantía de Confidencialidad
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
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              Sistemas de optimización comercial, censo y seguimiento automatizado especializado en fabricantes, ingenierías e importadores del agro español.
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
    </div>
  );
}
