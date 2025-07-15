# PROBLEMA SOLUCIONADO: BUCLE DE REDIRECCIONES 301
# ===================================================

## CAUSA DEL PROBLEMA:
- Las reglas de redirección HTTPS y WWW en .htaccess
- Estas reglas son para el dominio FINAL, no para desarrollo
- Causan bucles infinitos en el dominio temporal

## SOLUCIÓN APLICADA:
- .htaccess actual: SIN redirecciones (solo para desarrollo)
- .htaccess-production: CON redirecciones (para dominio final)

# Configuración de URLs - FlatOut Homologaciones
# ==============================================

# URL ACTUAL DE DESARROLLO (temporal)
CURRENT_URL=https://flatout.bestdariblue.tech

# URL FINAL DE PRODUCCIÓN (mantener en SEO)
FINAL_URL=https://flatouthomologaciones.com

# ANTES DEL LANZAMIENTO FINAL:
# 1. Cambiar todas las URLs de imágenes de flatout.bestdariblue.tech a flatouthomologaciones.com
# 2. REEMPLAZAR .htaccess con .htaccess-production
# 3. Configurar DNS para flatouthomologaciones.com
# 4. Verificar que todos los assets estén disponibles en el dominio final
# 5. Configurar SSL/HTTPS para el dominio final

# ARCHIVOS A ACTUALIZAR ANTES DEL LANZAMIENTO:
# - index.html (og:image, twitter:image, JSON-LD logo e image)
# - sitemap.xml (si se cambian las fechas)
# - robots.txt (URL del sitemap)
# - .htaccess (usar .htaccess-production)

# VERIFICACIONES POST-LANZAMIENTO:
# - Google Search Console configurado para flatouthomologaciones.com
# - Analytics configurado para el dominio final
# - Redirects 301 funcionando correctamente
# - Todas las imágenes Open Graph cargando correctamente
# - No hay bucles de redirección
# - SSL certificate funcionando correctamente
