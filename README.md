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

La base **AGROFLOW CRM** ya tiene la automatización **"Landing AGROFLOW → Nuevo Lead"**
(*When webhook received* → *Create record* en **Leads**). Su URL es la que va en `VITE_AIRTABLE_WEBHOOK_URL`.

Datos que envía la landing y dónde acaban:

| Clave del webhook | Campo en Leads |
|-------------------|----------------|
| `empresa`         | Empresa        |
| `nombre`          | Contacto       |
| `telefono`        | Teléfono       |
| `email`           | Email          |
| `provincia`       | Provincia      |
| `tipo`            | Sector (valor exacto de la opción) |
| `cargo`           | Cargo          |
| `canal`           | Canal de Seguimiento Preferido |
| `reto`, `utm_source`, `utm_campaign` | Notas (puntuación, nivel, respuestas y fuga estimada) |
| —                 | Fuente Lead = "Web / Formulario", Estado = "Nuevo", Origen del Diagnóstico = "Web / Landing page", Consentimiento datos = ✓, Fecha Entrada = fecha de ejecución (fijos en la automatización) |

Después de crear el registro, la misma automatización envía un email de aviso a
`espinosatoledom99@gmail.com` (el email de la cuenta de Airtable; Airtable solo envía a colaboradores de la base) con los datos principales del lead y un enlace al registro
(responder al email escribe directamente al lead).

El webhook solo acepta `application/json` o `application/x-www-form-urlencoded`; la landing envía
formulario (`URLSearchParams`) porque es el único de los dos que el navegador permite sin CORS.

## 3. Publicar en GitHub Pages

1. En el repositorio: **Settings → Pages → Source: GitHub Actions**.
2. **Settings → Secrets and variables → Actions → Variables**: crea `VITE_FORMSPREE_ENDPOINT`.
   La URL del webhook de Airtable ya viene configurada en `.github/workflows/deploy.yml`
   (solo hace falta la variable `VITE_AIRTABLE_WEBHOOK_URL` si quieres cambiarla).
3. Haz push a `main` (o ejecuta el workflow *Deploy to GitHub Pages* a mano). La web quedará en
   `https://<usuario>.github.io/<repositorio>/`.

### Dominio propio (www.agroflowes.com)

1. En el proveedor del dominio, crea un registro DNS **CNAME** con nombre `www` y valor
   `toledodigital80-eng.github.io`.
2. Para que `agroflowes.com` (sin www) también funcione, crea cuatro registros **A** en `@` con
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153` y `185.199.111.153`.
3. En **Settings → Pages → Custom domain** escribe `www.agroflowes.com`, guarda y, cuando el
   certificado esté listo, marca **Enforce HTTPS**.

Al desplegar con GitHub Actions no hace falta archivo `CNAME`: el dominio se configura solo en Settings.

> Nota: al ser una web estática, ambas URLs son visibles en el código del navegador. No dan acceso
> de lectura a tu base; como mucho permiten crear leads, por eso el formulario incluye un honeypot anti-spam.
