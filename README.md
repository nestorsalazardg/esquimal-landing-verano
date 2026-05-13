# Landing Page - Verano Esquimal 2026

Landing page para la campaña de verano 2026 de Esquimal. Objetivo: captación de leads y ventas directas de productos de temporada (edredones ligeros, blancos y artículos de verano).

## Stack Tecnológico

- **Frontend:** HTML5, CSS3 (variables CSS), JavaScript (ES6+)
- **Servidor:** Nginx 1.27 (Alpine Linux)
- **Contenedor:** Docker
- **CI/CD:** GitHub Actions + Render.com (despliegue automático)

## Pre-requisitos

- Git
- Docker (opcional, para pruebas locales con contenedor)

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/nestorsalazardg/esquimal-landing-verano.git
   cd esquimal-landing-verano
   ```

2. (Opcional) Ejecutar con Docker:
   ```bash
   docker build -t esquimal-landing .
   docker run -p 8080:80 esquimal-landing
   ```

3. Abrir en el navegador:
   ```
   http://localhost:8080
   ```

## Estructura de Carpetas

```
/
├── index.html          # Punto de entrada (HTML5 semántico)
├── css/
│   └── styles.css      # Estilos globales y variables CSS
├── js/
│   └── main.js         # Lógica: navegación, slider, animaciones
├── assets/
│   ├── img/            # Imágenes por marca
│   │   ├── hero/       # Imágenes del hero section
│   │   ├── esquimal/   # Productos Esquimal
│   │   ├── cookify/    # Productos Cookify
│   │   └── realtextil/ # Productos Real Textil
│   └── video/          # Videos (si aplica)
├── nginx.conf          # Configuración de servidor (seguridad, cache)
├── Dockerfile          # Definición del contenedor
└── .dockerignore       # Archivos excluidos del build
```

## Scripts Disponibles

| Acción | Comando |
|--------|---------|
| Commit y push | `git add . && git commit -m "mensaje" && git push origin main` |

El despliegue es **automático**: cualquier push a `main` déclenchea un rebuild en Render.com.

## Notas de Implementación

### Gestión de Imágenes
Las imágenes temporales se encuentran en `assets/img/`. Reemplazar por las imágenes definitivas del equipo de diseño siguiendo la estructura de carpetas por marca.

### Tracking
Los placeholders de Meta Pixel (`TU_PIXEL_ID`) y Google Analytics 4 (`TU_GA4_ID`) están configurados en `index.html`. Reemplazar antes de lanzar a producción.

### Seguridad
- Content Security Policy (CSP) configurada en `nginx.conf` y meta tags.
- Headers de seguridad (`X-Content-Type-Options`, `Referrer-Policy`).
- El contenedor corre con usuario `nginx` (no root).

### Optimización
- Imágenes con `loading="lazy"`.
- Fuentes de Google con `preconnect`.
- CSS/JS separados para cache independiente.

### Flujo de Desarrollo
1. Editar archivos locales.
2. Commit y push a GitHub.
3. Render detecta cambios y redespliega automáticamente.

## Configuración de Dominio (Render)

- **Build Command:** (vacío, usa el Dockerfile)
- **Publish Directory:** `/`
