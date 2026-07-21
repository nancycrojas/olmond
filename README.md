# React + Vite

## Newsletter

El formulario llama a `/api/newsletter/subscribe`. La función de Vercel valida origen, tamaño, honeypot y frecuencia antes de reenviar al webhook productivo de n8n.

Configurar en Vercel, para Production y Preview:

```text
N8N_NEWSLETTER_WEBHOOK_URL=https://olmond.app.n8n.cloud/webhook/olmond-newsletter-subscribe-v1
```

La URL queda del lado servidor. No volver a usar `VITE_N8N_NEWSLETTER_WEBHOOK_URL`, porque las variables `VITE_` se incorporan al JavaScript público.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
