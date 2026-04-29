# ─────────────────────────────────────────────
# Imagen base: Nginx Alpine (ligera y segura)
# ─────────────────────────────────────────────
FROM nginx:alpine

# Eliminar el contenido por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar todos los archivos web al directorio público de Nginx
COPY . /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Nginx arranca automáticamente con el CMD del imagen base
CMD ["nginx", "-g", "daemon off;"]
