# Plantilla-Empresas-Plasencia

Plantilla base para crear paginas web de empresas de Plasencia de forma rapida. La idea es mantener una estructura comun y personalizar cada proyecto cambiando configuracion, textos, colores, servicios, imagenes y datos de contacto.

## Estructura

- `backend/`: API Node.js con Express y TypeScript.
- `frontend/`: aplicacion Angular preparada para consumir configuracion y pintar una web corporativa.
- `frontend/src/assets/config/site.config.json`: datos principales de la empresa.

## Puesta en marcha

Entorno recomendado:

- `Node.js 22 LTS`
- `pnpm 11`
- En WSL con Homebrew: `brew install pnpm node@22`

```bash
pnpm install
pnpm dev:backend
```

```bash
pnpm dev:frontend
```

Por defecto:

- API: `http://localhost:3000`
- Frontend: `http://localhost:4200`

## Comandos principales

```bash
pnpm install
pnpm dev:backend
pnpm dev:frontend
pnpm build
```

La plantilla usa `pnpm` como gestor de paquetes y configura `minimumReleaseAge: 1440` en `pnpm-workspace.yaml`, para esperar 24 horas antes de instalar versiones recien publicadas.

## GitHub Pages

El frontend queda preparado para publicarse en GitHub Pages con GitHub Actions.

- Workflow: `.github/workflows/deploy-pages.yml`
- Script de build: `pnpm build:pages`
- URL esperada: `https://apablosmarcos.github.io/Plantilla-Empresas-Plasencia/`

Estado actual:

- El despliegue puede fallar si el repositorio sigue siendo `private` y la cuenta no tiene un plan que permita `GitHub Pages` en repos privados.
- En ese caso, la causa no es el build del frontend, sino una limitacion del tipo de repositorio o del plan de GitHub.

Opciones para activarlo mas adelante:

1. Cambiar este repositorio a `public`.
2. Mantenerlo `private` y usar un plan de GitHub compatible con `Pages` en repos privados.
3. Separar la demo publica en otro repositorio solo para el frontend.

Si `apiBaseUrl` esta vacio en `frontend/src/assets/config/site.config.json`, el formulario funciona en modo demo y no intenta llamar al backend. Para conectarlo con tu API real, rellena `apiBaseUrl` con la URL publica del backend.

## Personalizacion por empresa

1. Cambiar nombre, sector, descripcion y llamada a la accion en `frontend/src/assets/config/site.config.json`.
2. Ajustar colores de marca en el mismo archivo.
3. Reemplazar imagenes en `frontend/src/assets/images/`.
4. Editar servicios, ventajas y datos de contacto.
5. Si hace falta, ampliar endpoints en `backend/src/routes/`.

## Objetivo

Esta plantilla sirve como punto de partida para webs de pequenas empresas: restaurantes, comercios, servicios profesionales, talleres, alojamientos, clinicas, academias y negocios locales.
