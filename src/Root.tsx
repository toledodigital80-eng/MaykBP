import { useEffect, useState } from 'react';
import App from './App';
import AvisoLegal from './legal/AvisoLegal';
import PoliticaPrivacidad from './legal/PoliticaPrivacidad';

// Navegación por hash: funciona en GitHub Pages sin configurar el servidor.
export default function Root() {
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const onHashChange = () => {
      setHash(window.location.hash);
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (hash === '#aviso-legal') return <AvisoLegal />;
  if (hash === '#privacidad') return <PoliticaPrivacidad />;
  return <App />;
}
