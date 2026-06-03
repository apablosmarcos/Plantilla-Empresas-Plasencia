# Plantilla-Empresas-Plasencia

Plantilla base para crear paginas web de empresas de Plasencia de forma rapida. La idea es mantener una estructura comun y personalizar cada proyecto cambiando configuracion, textos, colores, servicios, imagenes y datos de contacto.

## Estructura

- `backend/`: API Node.js con Express y TypeScript.
- `frontend/`: aplicacion Angular preparada para consumir configuracion y pintar una web corporativa.
- `frontend/src/assets/config/site.config.json`: datos principales de la empresa.

## Puesta en marcha

```bash
cd backend
npm install
npm run dev
```

```bash
cd frontend
npm install
npm start
```

Por defecto:

- API: `http://localhost:3000`
- Frontend: `http://localhost:4200`

## Personalizacion por empresa

1. Cambiar nombre, sector, descripcion y llamada a la accion en `frontend/src/assets/config/site.config.json`.
2. Ajustar colores de marca en el mismo archivo.
3. Reemplazar imagenes en `frontend/src/assets/images/`.
4. Editar servicios, ventajas y datos de contacto.
5. Si hace falta, ampliar endpoints en `backend/src/routes/`.

## Objetivo

Esta plantilla sirve como punto de partida para webs de pequenas empresas: restaurantes, comercios, servicios profesionales, talleres, alojamientos, clinicas, academias y negocios locales.

