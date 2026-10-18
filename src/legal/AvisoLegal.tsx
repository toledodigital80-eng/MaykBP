import LegalLayout from './LegalLayout';
import { TITULAR } from './titular';

export default function AvisoLegal() {
  return (
    <LegalLayout title="Aviso Legal">
      <h2>1. Datos identificativos del titular</h2>
      <p>
        En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la
        Información y de Comercio Electrónico (LSSI-CE), se informa de los datos del titular de este sitio web:
      </p>
      <ul>
        <li><strong>Titular:</strong> {TITULAR.nombre} (empresario individual / autónomo), que opera bajo la marca comercial {TITULAR.marca}.</li>
        <li><strong>NIE:</strong> {TITULAR.nif}</li>
        <li><strong>Domicilio:</strong> {TITULAR.domicilio}</li>
        <li><strong>Correo electrónico:</strong> <a href={`mailto:${TITULAR.email}`}>{TITULAR.email}</a></li>
        <li><strong>Actividad:</strong> {TITULAR.actividad}.</li>
        <li><strong>Sitio web:</strong> {TITULAR.web}</li>
      </ul>

      <h2>2. Objeto</h2>
      <p>
        Este sitio web tiene por objeto informar sobre los servicios de {TITULAR.marca} y permitir a las empresas
        interesadas realizar un autodiagnóstico comercial orientativo y solicitar un diagnóstico comercial gratuito.
        El acceso a la web es gratuito y no exige registro. La navegación atribuye la condición de usuario e implica la
        aceptación de este Aviso Legal.
      </p>

      <h2>3. Condiciones de uso</h2>
      <p>
        El usuario se compromete a hacer un uso adecuado y lícito del sitio web y de sus contenidos, conforme a la
        legislación vigente, la buena fe y el orden público, y a no emplearlos para realizar actividades ilícitas o
        que puedan dañar los derechos de terceros o el funcionamiento del sitio. El usuario se compromete a que los
        datos que facilite a través de los formularios sean veraces y le pertenezcan o esté autorizado a facilitarlos.
      </p>

      <h2>4. Propiedad intelectual e industrial</h2>
      <p>
        Los contenidos de este sitio web (textos, diseño, imágenes, logotipos, código y la marca {TITULAR.marca}) son
        titularidad de {TITULAR.nombre} o se usan con autorización de sus titulares, y están protegidos por la
        normativa de propiedad intelectual e industrial. Queda prohibida su reproducción, distribución, comunicación
        pública o transformación, total o parcial, sin autorización expresa y por escrito del titular, salvo para uso
        personal y privado.
      </p>

      <h2>5. Exclusión de responsabilidad</h2>
      <p>
        El titular procura que la información de la web sea correcta y esté actualizada, pero no garantiza la ausencia
        de errores ni la disponibilidad ininterrumpida del sitio. Los resultados del autodiagnóstico y de la
        calculadora de pérdidas son estimaciones orientativas y genéricas basadas en las respuestas del usuario; no
        constituyen asesoramiento profesional ni compromiso de resultados. El titular no se responsabiliza de los
        daños derivados del uso de la información de la web ni de interrupciones, virus o fallos técnicos ajenos a su
        control.
      </p>

      <h2>6. Enlaces</h2>
      <p>
        Si la web contiene enlaces a sitios de terceros, el titular no controla ni se hace responsable de sus
        contenidos ni de sus políticas. Quien desee enlazar a esta web deberá hacerlo a su página principal, sin
        reproducir sus contenidos ni dar a entender una relación inexistente con el titular.
      </p>

      <h2>7. Protección de datos personales</h2>
      <p>
        El tratamiento de los datos personales que el usuario facilite a través de la web se rige por la{' '}
        <a href="#privacidad">Política de Privacidad</a>. Este sitio web no instala cookies.
      </p>

      <h2>8. Modificaciones</h2>
      <p>
        El titular puede modificar en cualquier momento los contenidos de la web y este Aviso Legal. Los cambios serán
        aplicables desde su publicación.
      </p>

      <h2>9. Legislación aplicable y jurisdicción</h2>
      <p>
        Este Aviso Legal se rige por la legislación española. Para cualquier controversia, si el usuario tiene la
        condición de consumidor, serán competentes los juzgados y tribunales de su domicilio, conforme a la normativa
        de consumidores y usuarios. En los demás casos, las partes se someten a los juzgados y tribunales del
        domicilio del titular.
      </p>
    </LegalLayout>
  );
}
