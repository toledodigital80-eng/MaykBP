# AGROFLOW™ — Landing page

Landing de captación de AGROFLOW™ (ingeniería comercial para empresas agrícolas en España),
portada desde Google AI Studio a un proyecto **Vite + React + Tailwind** listo para **GitHub Pages**.

Cada solicitud del autodiagnóstico se envía en paralelo a:

- **Formspree** → te llega por email.
- **Airtable** (base *AGROFLOW CRM*, tabla **Leads**) → mediante el webhook de una automatización.

## Desarrollo local

```bash
npm install
cp .env.example .env.local   # rellena las dos URLs (opcional en local)
npm run dev                   # http://localhost:3000
npm run build && npm run preview
```

Si no defines ninguna variable, el formulario funciona igual pero solo muestra el lead en la consola.

## 1. Formspree (email)

1. Crea un formulario en <https://formspree.io> con el email donde quieres recibir los leads.
2. Copia el endpoint (`https://formspree.io/f/xxxxxxx`) → variable `VITE_FORMSPREE_ENDPOINT`.

## 2. Airtable (CRM)

En la base **AGROFLOW CRM** → **Automations** → *Create automation*:

1. **Trigger:** *When webhook received*. Copia la URL → variable `VITE_AIRTABLE_WEBHOOK_URL`.
2. Envía un lead de prueba desde la web (o con el `curl` de abajo) y pulsa *Test trigger* para que
   Airtable detecte la estructura.
3. **Acción:** *Create record* en la tabla **Leads** con este mapeo:

| Campo en Leads                     | Valor del webhook |
|------------------------------------|-------------------|
| Empresa                            | `empresa`         |
| Contacto                           | `contacto`        |
| Cargo                              | `cargo`           |
| Teléfono                           | `telefono`        |
| Email                              | `email`           |
| Provincia                          | `provincia`       |
| Sector                             | `sector`          |
| Fuente Lead                        | `fuente` (siempre "Web / Formulario") |
| Origen del Diagnóstico             | `origen` (siempre "Web / Landing page") |
| Estado                             | `estado` (siempre "Nuevo") |
| Fecha Entrada                      | `fecha` (AAAA-MM-DD) |
| Canal de Seguimiento Preferido     | `canal`           |
| Consentimiento datos               | `consentimiento`  |
| Problema / Necesidad Comercial     | `problema` (puntuación, nivel, respuestas y fuga estimada) |

4. Activa la automatización.

Prueba manual del webhook:

```bash
curl -X POST "$VITE_AIRTABLE_WEBHOOK_URL" -H "Content-Type: application/json" -d '{
  "empresa":"Prueba S.L.","contacto":"Test","cargo":"Gerente / Socio","telefono":"+34600000000",
  "email":"test@example.com","provincia":"Toledo","sector":"Riego","fuente":"Web / Formulario",
  "origen":"Web / Landing page","estado":"Nuevo","fecha":"2026-10-18","canal":"WhatsApp",
  "consentimiento":true,"problema":"Prueba"}'
```

## 3. Publicar en GitHub Pages

1. En el repositorio: **Settings → Pages → Source: GitHub Actions**.
2. **Settings → Secrets and variables → Actions → Variables**: crea `VITE_FORMSPREE_ENDPOINT` y
   `VITE_AIRTABLE_WEBHOOK_URL`.
3. Haz push a `main` (o ejecuta el workflow *Deploy to GitHub Pages* a mano). La web quedará en
   `https://<usuario>.github.io/<repositorio>/`.

> Nota: al ser una web estática, ambas URLs son visibles en el código del navegador. No dan acceso
> de lectura a tu base; como mucho permiten crear leads, por eso el formulario incluye un honeypot anti-spam.
