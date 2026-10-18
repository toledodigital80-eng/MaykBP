import LegalLayout from './LegalLayout';
import { TITULAR } from './titular';

export default function PoliticaPrivacidad() {
  return (
    <LegalLayout title="Política de Privacidad">
      <p>
        Esta política explica cómo se tratan los datos personales recogidos a través de este sitio web, conforme al
        Reglamento (UE) 2016/679, General de Protección de Datos (RGPD), y a la Ley Orgánica 3/2018, de Protección de
        Datos Personales y garantía de los derechos digitales (LOPDGDD).
      </p>

      <h2>1. Responsable del tratamiento</h2>
      <ul>
        <li><strong>Responsable:</strong> {TITULAR.nombre} ({TITULAR.marca})</li>
        <li><strong>NIE:</strong> {TITULAR.nif}</li>
        <li><strong>Domicilio:</strong> {TITULAR.domicilio}</li>
        <li><strong>Correo electrónico:</strong> <a href={`mailto:${TITULAR.email}`}>{TITULAR.email}</a></li>
      </ul>

      <h2>2. Qué datos tratamos</h2>
      <p>Cuando el usuario completa el autodiagnóstico y solicita el diagnóstico comercial, tratamos:</p>
      <ul>
        <li><strong>Datos de contacto y profesionales:</strong> nombre y apellidos, cargo, empresa, sector, teléfono, correo electrónico, provincia y canal de contacto preferido.</li>
        <li><strong>Datos del autodiagnóstico:</strong> respuestas a las preguntas, puntuación obtenida y, si se usa la calculadora, la estimación de pérdidas.</li>
        <li><strong>Datos de origen de la visita:</strong> la página desde la que se envía el formulario y, si existen, los parámetros de campaña de la dirección web (utm_source, utm_medium, utm_campaign).</li>
        <li><strong>Constancia del consentimiento</strong> y fecha de la solicitud.</li>
      </ul>
      <p>
        Los campos marcados con asterisco son necesarios para atender la solicitud; si no se facilitan, no podremos
        tramitarla. No solicitamos categorías especiales de datos.
      </p>

      <h2>3. Finalidades</h2>
      <ul>
        <li>Atender la solicitud de diagnóstico comercial y contactar con el usuario por el canal indicado para concertarlo.</li>
        <li>Gestionar la relación comercial derivada de la solicitud (seguimiento y, en su caso, envío de propuestas de servicios relacionados con lo solicitado).</li>
        <li>Conocer qué campañas o canales generan las solicitudes, de forma agregada, para mejorar la web.</li>
      </ul>
      <p>
        La puntuación del autodiagnóstico es una orientación automática y genérica. No se toman decisiones basadas
        únicamente en tratamientos automatizados que produzcan efectos jurídicos o afecten significativamente al
        usuario (art. 22 RGPD).
      </p>

      <h2>4. Base jurídica</h2>
      <ul>
        <li><strong>Consentimiento</strong> del interesado, otorgado al marcar la casilla del formulario (art. 6.1.a RGPD). Puede retirarse en cualquier momento sin que afecte a la licitud del tratamiento previo.</li>
        <li><strong>Aplicación de medidas precontractuales</strong> adoptadas a petición del interesado (art. 6.1.b RGPD), al solicitar el diagnóstico.</li>
      </ul>

      <h2>5. Plazo de conservación</h2>
      <p>
        Los datos se conservarán mientras se mantenga la relación comercial o hasta que el usuario retire su
        consentimiento o solicite su supresión y, en todo caso, no más de dos años desde el último contacto si no se
        llega a una relación comercial. Después se bloquearán durante los plazos de prescripción de las posibles
        responsabilidades legales y, transcurridos estos, se eliminarán.
      </p>

      <h2>6. Destinatarios y encargados del tratamiento</h2>
      <p>
        No se ceden datos a terceros, salvo obligación legal. Para prestar el servicio, intervienen los siguientes
        proveedores como encargados del tratamiento, con los que existen las garantías exigidas por el art. 28 RGPD:
      </p>
      <ul>
        <li><strong>Airtable (Formagrid Inc.):</strong> almacenamiento de las solicitudes en el CRM y envío del aviso interno por correo.</li>
        <li><strong>GitHub, Inc. (GitHub Pages):</strong> alojamiento de la web. Registra datos técnicos de conexión, como la dirección IP, por motivos de seguridad.</li>
        <li><strong>Google LLC (Google Fonts):</strong> al cargar la web, el navegador solicita las tipografías a los servidores de Google, que reciben la dirección IP del usuario.</li>
      </ul>

      <h2>7. Transferencias internacionales</h2>
      <p>
        Los proveedores anteriores tienen sede en Estados Unidos. Las transferencias se amparan en la decisión de
        adecuación de la Comisión Europea sobre el Marco de Privacidad de Datos UE-EE. UU. (EU-U.S. Data Privacy
        Framework), para las entidades adheridas, y/o en las cláusulas contractuales tipo aprobadas por la Comisión
        Europea (art. 46 RGPD).
      </p>

      <h2>8. Derechos del usuario</h2>
      <p>El usuario puede ejercer en cualquier momento sus derechos de:</p>
      <ul>
        <li>acceso a sus datos;</li>
        <li>rectificación de datos inexactos;</li>
        <li>supresión;</li>
        <li>oposición al tratamiento;</li>
        <li>limitación del tratamiento;</li>
        <li>portabilidad;</li>
        <li>retirada del consentimiento.</li>
      </ul>
      <p>
        Para ello, puede escribir a <a href={`mailto:${TITULAR.email}`}>{TITULAR.email}</a> o al domicilio indicado,
        indicando el derecho que ejerce. Responderemos en el plazo de un mes. Si considera que el tratamiento no se
        ajusta a la normativa, puede presentar una reclamación ante la Agencia Española de Protección de Datos{' '}
        (<a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>).
      </p>

      <h2>9. Cookies y almacenamiento en el navegador</h2>
      <p>
        Este sitio web no instala cookies ni guarda información en el navegador del usuario, por lo que no muestra
        aviso de cookies.
      </p>

      <h2>10. Seguridad</h2>
      <p>
        Se aplican medidas técnicas y organizativas adecuadas al riesgo para proteger los datos frente a pérdida,
        acceso no autorizado o alteración, como la transmisión cifrada (HTTPS) y el acceso restringido al CRM.
      </p>

      <h2>11. Menores de edad</h2>
      <p>
        Los servicios se dirigen a empresas y profesionales. No se recogen conscientemente datos de menores de 14
        años (art. 7 LOPDGDD).
      </p>

      <h2>12. Cambios en esta política</h2>
      <p>
        Esta política puede actualizarse por cambios normativos o en los tratamientos. La fecha de la última
        actualización figura al inicio de esta página.
      </p>
    </LegalLayout>
  );
}
