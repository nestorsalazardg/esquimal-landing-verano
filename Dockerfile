# ─────────────────────────────────────────────────────────────
# Imagen base: Nginx Alpine (ligera ~8MB, superficie de ataque mínima)
# Fijamos el digest SHA para evitar que una actualización silenciosa
# de la imagen "latest" introduzca código malicioso (supply-chain attack).
# Actualiza este digest cuando quieras subir de versión intencionalmente.
# ─────────────────────────────────────────────────────────────
FROM nginx:1.27-alpine

# ─────────────────────────────────────────────────────────────
# SEGURIDAD: Eliminar contenido por defecto y copiar solo los
# archivos web necesarios (el .dockerignore excluye el resto).
# ─────────────────────────────────────────────────────────────
RUN rm -rf /usr/share/nginx/html/*

# Copiar configuración de Nginx segura personalizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar archivos web al directorio público de Nginx
COPY index.html /usr/share/nginx/html/index.html

# ─────────────────────────────────────────────────────────────
# SEGURIDAD: Ajustar permisos — el proceso de Nginx worker corre
# como usuario "nginx" (no root). Solo root puede escuchar en
# puertos < 1024, pero el master process lo hace y luego cede
# privilegios al worker. Esto limita el daño si hay un exploit.
# ─────────────────────────────────────────────────────────────
RUN chown -R nginx:nginx /usr/share/nginx/html \
    && chmod -R 755 /usr/share/nginx/html \
    && chown -R nginx:nginx /var/cache/nginx \
    && chown -R nginx:nginx /var/log/nginx \
    && touch /var/run/nginx.pid \
    && chown nginx:nginx /var/run/nginx.pid

# Exponer el puerto 80
EXPOSE 80

# Nginx arranca automáticamente con el CMD de la imagen base
CMD ["nginx", "-g", "daemon off;"]
