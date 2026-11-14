import { Benefit, CaseStudy, FAQ } from './types';

export const BENEFITS: Benefit[] = [
  {
    id: 'b1',
    title: 'Ningún contacto se pierde',
    description: 'Cada consulta de agricultores, distribuidores o cooperativas se registra automáticamente en una base de datos segura de la empresa, sin depender del bloc de notas de un vendedor o de un chat de WhatsApp personal.',
    outcome: 'Cada interesado recibe respuesta y queda registrado en la empresa.'
  },
  {
    id: 'b2',
    title: 'Seguimiento de cada presupuesto',
    description: 'Recordatorios automáticos para cada oferta enviada, de modo que ningún presupuesto de maquinaria, biofertilizantes o riego se quede sin llamada por falta de tiempo.',
    outcome: 'Más presupuestos cerrados sin cargar más trabajo al equipo.'
  },
  {
    id: 'b3',
    title: 'Visión clara de su red comercial',
    description: 'Vea en un panel sencillo qué presupuestos están abiertos, en qué fase está cada uno y qué ventas se esperan para el próximo mes.',
    outcome: 'Decisiones basadas en datos de su propia empresa, no en intuiciones.'
  },
  {
    id: 'b4',
    title: 'Menos tareas repetitivas',
    description: 'Sus comerciales dejan de redactar correos rutinarios, agendar a mano por WhatsApp o pasar datos entre hojas de cálculo, y dedican ese tiempo a visitar y vender.',
    outcome: 'Más horas de venta en el campo y menos en la oficina.'
  },
  {
    id: 'b5',
    title: 'Adaptado a las campañas del agro',
    description: 'Tenemos en cuenta los ciclos de siembra, las campañas de fitosanitarios y los plazos de decisión en la compra de maquinaria. El sistema se ajusta a la estacionalidad de sus productos.',
    outcome: 'Cada contacto llega en el momento adecuado de la campaña.'
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'c1',
    sector: 'Maquinaria Agrícola',
    companyType: 'Distribuidor e Importador de Equipamiento',
    scenario: 'Imagine un distribuidor que recoge contactos en ferias y los apunta en libretas. Cuando un agricultor pide presupuesto de un tractor o un apero, la oferta tarda días en salir y muchos contactos nunca reciben una llamada de seguimiento.',
    leak: 'Presupuestos de alto importe que se enfrían y acaban comprando a la competencia.',
    agroflowImpact: 'Registro de contactos en la propia feria desde el móvil, asignación inmediata al comercial de zona y avisos automáticos para llamar a los 3 y a los 7 días de enviar el presupuesto.',
    highlight: 'Respuestas más rápidas y ningún presupuesto sin llamada de seguimiento.'
  },
  {
    id: 'c2',
    sector: 'Nutrición y Biofertilizantes',
    companyType: 'Fabricante de Bioestimulantes y Micronutrientes',
    scenario: 'Imagine un fabricante cuyas ventas dependen de la relación personal de cada delegado con los distribuidores. Si un delegado se marcha, se lleva la cartera y los resultados de los ensayos en campo, porque todo estaba en su WhatsApp personal.',
    leak: 'Pérdida de cuentas históricas y falta de trazabilidad en las pruebas de producto que demuestran la eficacia técnica.',
    agroflowImpact: 'Registro de cada visita a cooperativas y fincas, con los resultados de los ensayos en la ficha del cliente y accesibles para todo el equipo técnico-comercial.',
    highlight: 'Los clientes y su historial son de la empresa, y el servicio continúa aunque cambie el delegado.'
  },
  {
    id: 'c3',
    sector: 'Sistemas de Riego y Fitosanitarios',
    companyType: 'Instaladora y Distribuidora Hortofrutícola',
    scenario: 'Imagine una instaladora que reenvía por correo las peticiones de presupuesto de la web y del teléfono a sus técnicos. Nadie controla si se contestan ni si el presupuesto se acepta o se rechaza, y la gerencia no sabe qué está funcionando.',
    leak: 'Proyectos de riego presupuestados que se quedan en el aire por sobrecarga de trabajo técnico.',
    agroflowImpact: 'Un panel con todos los presupuestos por fases, aviso automático al técnico si una oferta pasa 5 días sin respuesta y resumen mensual para gerencia.',
    highlight: 'Presupuestos olvidados que vuelven a moverse y gerencia con datos para decidir.'
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
    answer: 'Una web por sí sola es como un folleto: no vende si nadie atiende lo que entra. AGROFLOW™ no vende páginas web, sino sistemas de captación y seguimiento. Cada consulta del agricultor o del técnico entra en un proceso ordenado para llamar, asesorar y cerrar la venta a tiempo.'
  },
  {
    id: 'f3',
    question: '«Nuestros comerciales pasan el día en la carretera y no tienen tiempo para rellenar datos técnicos»',
    answer: 'Precisamente por eso AGROFLOW™ está pensado para ser extremadamente simple. Su equipo no tendrá que rellenar programas complicados. Puede dejar notas de voz desde el móvil en la misma finca y recibe recordatorios en los que solo tiene que confirmar. Eliminamos la burocracia para que pasen más horas negociando.'
  },
  {
    id: 'f4',
    question: '«¿No es esto demasiado tecnológico para nuestro sector? Nuestros agricultores valoran el trato tradicional»',
    answer: 'El trato tradicional, la visita a la finca y el café con el distribuidor son indispensables y nunca van a desaparecer. Nosotros no sustituimos la cercanía humana, la potenciamos. El sistema se encarga de que usted se acuerde de llamar al distribuidor justo el día que necesita renovar existencias, o que le mande un mensaje de agradecimiento justo después de entregar un pedido. Usamos la tecnología para hacerle más humano y puntual con cada cliente.'
  },
  {
    id: 'f5',
    question: '«¿El diagnóstico gratuito es útil de verdad o es una sesión de venta?»',
    answer: 'No creemos en la venta agresiva y menos en el sector agrícola, donde la reputación y la palabra lo son todo. En el diagnóstico de 30-45 minutos, Maykel Espinosa Toledo revisa con usted su proceso comercial real. Analizamos su proceso actual de captación, cómo realizan el seguimiento de presupuestos y dónde están perdiendo operaciones comerciales concretas. Al terminar, le enviamos un mapa sencillo con las oportunidades de mejora. Si decide aplicarlo con AGROFLOW™, excelente. Si prefiere implementarlo usted mismo con su equipo, lo hará con una hoja de ruta clara.'
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
