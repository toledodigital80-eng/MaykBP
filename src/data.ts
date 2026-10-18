import { Benefit, CaseStudy, FAQ } from './types';

export const BENEFITS: Benefit[] = [
  {
    id: 'b1',
    title: 'Cero Pérdidas de Contactos',
    description: 'Cada consulta de agricultores, distribuidores o cooperativas se registra automáticamente en una base de datos segura de la empresa, sin depender del bloc de notas de un vendedor o de un chat de WhatsApp personal.',
    outcome: 'El 100% de los interesados son atendidos bajo un estándar profesional.'
  },
  {
    id: 'b2',
    title: 'Seguimiento con Precisión Quirúrgica',
    description: 'Sistemas que recuerdan y automatizan los recordatorios de ofertas técnicas enviadas, garantizando que ninguna propuesta comercial de maquinaria, biofertilizantes o riego se quede sin respuesta por falta de tiempo.',
    outcome: 'Aumento inmediato en la tasa de cierre sin sobrecargar a su equipo.'
  },
  {
    id: 'b3',
    title: 'Control Absoluto de su Red Comercial',
    description: 'Sepa exactamente qué está haciendo cada agente de ventas, en qué fase se encuentran los presupuestos más importantes y cuánto va a facturar el próximo mes, con un panel visual simple e intuitivo.',
    outcome: 'Elimina la incertidumbre y permite tomar decisiones basadas en números reales.'
  },
  {
    id: 'b4',
    title: 'Automatización de Tareas Repetitivas',
    description: 'Liberamos a sus comerciales de redactar correos manuales rutinarios, agendar reuniones por WhatsApp o rellenar tediosas hojas de cálculo, para que se enfoquen en lo que mejor saben hacer: negociar y vender sobre el terreno.',
    outcome: 'Hasta un 35% más de tiempo de venta efectiva por comercial.'
  },
  {
    id: 'b5',
    title: 'Planificación Estratégica Adaptada al Agro',
    description: 'Entendemos los ciclos de la siembra, las campañas de fitosanitarios y los tiempos de maduración en la compra de maquinaria. El sistema se parametriza de acuerdo a la estacionalidad de sus productos.',
    outcome: 'Interacciones comerciales en el momento idóneo de la campaña.'
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'c1',
    sector: 'Maquinaria Agrícola',
    companyType: 'Distribuidor e Importador de Equipamiento',
    scenario: 'Los comerciales capturaban solicitudes en ferias del sector y las apuntaban en cuadernos. Si un cliente pedía presupuesto para un tractor o apero, la oferta tardaba 10 días en enviarse por falta de información fluida, y un 40% de los contactos nunca recibían llamada de seguimiento.',
    leak: 'Fuga estimada de 8 oportunidades de venta de alta gama al año por valor de más de 250.000€.',
    agroflowImpact: 'Centralización de captación en ferias mediante tabletas, asignación inmediata al comercial de zona y generación de alertas automáticas de seguimiento de presupuesto al 3º y 7º día.',
    highlight: 'Reducción del tiempo de respuesta a 24 horas y rescate de 5 ventas de maquinaria en las primeras dos campañas.'
  },
  {
    id: 'c2',
    sector: 'Nutrición y Biofertilizantes',
    companyType: 'Fabricante de Bioestimulantes y Micronutrientes',
    scenario: 'Dependían al 100% de la relación personal de los delegados agrícolas con los distribuidores de zona. Cuando un delegado cambiaba de empresa, se llevaba consigo toda la cartera y la información de los ensayos en campo debido a que toda la historia comercial estaba en su WhatsApp personal.',
    leak: 'Pérdida de cuentas históricas y falta de trazabilidad en las pruebas de producto que demuestran la eficacia técnica.',
    agroflowImpact: 'Digitalización y registro sistemático de cada visita a cooperativas y fincas. Integración de los resultados de ensayos directamente en el expediente del cliente accesible para todo el equipo técnico-comercial.',
    highlight: 'Control total de la propiedad del cliente por la empresa, incrementando un 18% la recompra al asegurar la continuidad en el servicio.'
  },
  {
    id: 'c3',
    sector: 'Sistemas de Riego y Fitosanitarios',
    companyType: 'Instaladora y Distribuidora Hortofrutícola',
    scenario: 'Las peticiones de presupuesto web o llamadas a la oficina se derivaban por correo electrónico a los ingenieros comerciales. Nadie controlaba si esos correos se contestaban o si el presupuesto era aceptado o rechazado. El gerente desconocía la efectividad de sus esfuerzos comerciales.',
    leak: 'Un 55% de los presupuestos de proyectos de riego quedaban en el limbo sin ningún tipo de acción posterior por sobrecarga de trabajo técnico.',
    agroflowImpact: 'Creación de un pipeline visual comercial. Alerta automática al comercial si una oferta de proyecto técnico supera los 5 días sin interacción y panel resumen mensual para gerencia.',
    highlight: 'Aumento del 22% en la facturación total al reactivar presupuestos que el cliente simplemente había olvidado.'
  }
];

export const FAQS: FAQ[] = [
  {
    id: 'f1',
    question: '«Ya tenemos WhatsApp para atender a los clientes de siempre, ¿por qué necesitamos esto?»',
    answer: 'WhatsApp es una herramienta excelente de mensajería instantánea, pero es un pozo sin fondo para la información corporativa. Si un comercial borra una conversación, se le pierde el móvil o decide marcharse de la empresa, todo el historial de precios, compromisos y necesidades agropecuarias de ese cliente se va con él. Además, WhatsApp no le dice qué presupuestos están pendientes de seguimiento. AGROFLOW™ integra e institucionaliza la información para que la empresa de verdad sea dueña de su base comercial.'
  },
  {
    id: 'f2',
    question: '«Ya gastamos dinero en hacer una página web y no nos entran ventas por ahí. ¿Esto funcionará realmente?»',
    answer: 'Una página web típica es como un folleto digital pasivo. No genera ventas por sí sola. AGROFLOW™ no vende páginas web, sino sistemas comerciales activos de captación y seguimiento. Capturamos la necesidad del agricultor o técnico de campo y la canalizamos inmediatamente en un proceso comercial automatizado para llamar, asesorar y cerrar la venta de inmediato.'
  },
  {
    id: 'f3',
    question: '«Nuestros comerciales pasan el día en la carretera y no tienen tiempo para rellenar datos técnicos»',
    answer: 'Precisamente por eso AGROFLOW™ está pensado para ser extremadamente simple. Su equipo comercial no tendrá que rellenar sistemas complejos de informática. El sistema automatiza el registro de llamadas, permite dictar notas de voz rápidas desde el móvil en la linde del campo y envía recordatorios para que ellos solo tengan que pulsar "Aceptar". Eliminamos la burocracia para que pasen más horas negociando.'
  },
  {
    id: 'f4',
    question: '«¿No es esto demasiado tecnológico para nuestro sector? Nuestros agricultores valoran el trato tradicional»',
    answer: 'El trato tradicional, la visita a la finca y el café con el distribuidor son indispensables y nunca van a desaparecer. Nosotros no sustituimos la cercanía humana, la potenciamos. El sistema se encarga de que usted se acuerde de llamar al distribuidor justo el día que necesita renovar existencias, o que le mande un mensaje de agradecimiento justo después de entregar un pedido. Usamos la tecnología para hacerle más humano y puntual con cada cliente.'
  },
  {
    id: 'f5',
    question: '«¿Este diagnóstico gratuito de verdad es útil o es una sesión de venta agresiva?»',
    answer: 'No creemos en la venta agresiva y menos en el sector agrícola, donde la reputación y la palabra lo son todo. El diagnóstico comercial de 30-45 minutos es una sesión técnica realista. Analizamos su proceso actual de captación, cómo realizan el seguimiento de presupuestos y dónde están perdiendo operaciones comerciales concretas. Al finalizar la videollamada, le entregaremos un mapa de oportunidades comercial sencillo. Si decide aplicarlo con AGROFLOW™, excelente. Si prefiere implementarlo usted mismo con su equipo, lo hará con una hoja de ruta clara.'
  }
];

export const DIAGNOSTIC_QUESTIONS = [
  {
    id: 1,
    question: '¿Dónde registran actualmente la información de sus clientes, visitas y presupuestos agrícolas?',
    options: [
      { text: 'Cada comercial en su libreta, su libre albedrío o su propio móvil personal.', score: 0 },
      { text: 'Usamos hojas de Excel / archivos compartidos que a veces se quedan desfasados.', score: 1 },
      { text: 'Confiamos en gran parte en la memoria y en los chats de WhatsApp rápidos.', score: 0 },
      { text: 'Tenemos un CRM contratado, pero apenas se usa por ser complejo o poco adaptado.', score: 2 },
      { text: 'Disponemos de un sistema adaptado donde registramos el 100% de la actividad comercial.', score: 4 }
    ]
  },
  {
    id: 2,
    question: '¿Qué ocurre con un presupuesto o cotización de producto después de enviarse al cliente?',
    options: [
      { text: 'Esperamos a que el cliente decida y llame. Casi nunca realizamos seguimiento formal.', score: 0 },
      { text: 'El comercial le llama una vez; si no responde o está ocupado, la oferta queda en el olvido.', score: 1 },
      { text: 'Hacemos seguimiento solo de las operaciones más grandes (tractores, grandes obras de riego).', score: 2 },
      { text: 'Hay un proceso calendarizado y automatizado de llamadas y mensajes de cortesía.', score: 4 }
    ]
  },
  {
    id: 3,
    question: '¿Con qué rapidez contactan con un agricultor o técnico que solicita información de su producto o servicio?',
    options: [
      { text: 'Tardamos varios días o a veces la solicitud queda sin responder por el volumen de trabajo.', score: 0 },
      { text: 'Solemos tardar entre 48 y 72 horas hábiles.', score: 1 },
      { text: 'Respondemos dentro del mismo día laborable (menos de 24 horas).', score: 3 },
      { text: 'Atendemos en menos de 1 hora de forma ágil y profesional mediante flujos coordinados.', score: 4 }
    ]
  },
  {
    id: 4,
    question: '¿Qué control tiene gerencia sobre las métricas comerciales y previsiones de cierre mensual?',
    options: [
      { text: 'Ninguna. Solo sabemos si el mes ha ido bien o mal cuando vemos la facturación en el banco.', score: 0 },
      { text: 'Preguntamos constantemente uno por uno a los comerciales el estado de sus presupuestos.', score: 1 },
      { text: 'Tenemos estimaciones aproximadas, pero carecemos de un panel centralizado e histórico.', score: 2 },
      { text: 'Disponemos de un dashboard en tiempo real con la tasa de conversión y previsión de ventas.', score: 4 }
    ]
  },
  {
    id: 5,
    question: '¿Cómo gestionas la comunicación durante los picos estacionales de la campaña agrícola?',
    options: [
      { text: 'Es un caos de llamadas cruzadas, WhatsApps sin responder y pérdida de oportunidades de venta.', score: 0 },
      { text: 'Trabajamos horas extra descontroladas y atendemos lo urgente, dejando lo importante de lado.', score: 1 },
      { text: 'El equipo hace lo que puede, pero se nota la bajada en la calidad del seguimiento comercial.', score: 2 },
      { text: 'Los flujos automatizados de respuesta y filtrado atienden y agendan las llamadas de forma organizada.', score: 4 }
    ]
  }
];
