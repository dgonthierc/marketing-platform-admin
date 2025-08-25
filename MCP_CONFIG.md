# Configuración de Servidores MCP en Claude Code

## Servidores Configurados

### 1. MCP Playwright
Servidor para automatización de navegadores y pruebas web.

**Paquete NPM:** `@executeautomation/playwright-mcp-server`

**Características:**
- Navegación a URLs
- Capturas de pantalla de páginas completas o elementos específicos
- Hacer clic en elementos usando selectores CSS
- Evaluación de JavaScript en el navegador
- Automatización de pruebas de API

**Estado:** ✅ Configurado y listo para usar

### 2. MCP DigitalOcean
Servidor para gestionar aplicaciones en DigitalOcean App Platform.

**Paquete NPM:** `@digitalocean/mcp`

**Características:**
- Desplegar aplicaciones desde repositorios GitHub
- Gestionar servicios (reiniciar, actualizar, eliminar)
- Obtener logs de aplicaciones
- Listar y administrar todas tus aplicaciones

**Estado:** ✅ Configurado y listo para usar (token incluido)

## Configuración Completada

Ambos servidores MCP están configurados y listos para usar:
- ✅ **MCP Playwright**: Automatización web habilitada
- ✅ **MCP DigitalOcean**: Token configurado y listo

## Uso de los Servidores MCP

### Playwright
Una vez configurado, puedes pedirle a Claude Code que:
- Navegue a sitios web
- Tome capturas de pantalla
- Automatice pruebas de navegador
- Interactúe con elementos web

Ejemplo:
```
"Navega a https://example.com y toma una captura de pantalla"
```

### DigitalOcean
Con el token configurado, puedes:
- Desplegar aplicaciones directamente desde GitHub
- Gestionar tus aplicaciones existentes
- Ver logs y estado de servicios
- Crear y configurar nuevas aplicaciones

Ejemplo:
```
"Lista todas mis aplicaciones en DigitalOcean"
"Despliega mi repositorio de GitHub en DigitalOcean App Platform"
```

## Verificar la Configuración

Para verificar que los servidores MCP están funcionando:

1. Reinicia Claude Code completamente
2. Ejecuta el comando `/mcp` para ver los servidores disponibles
3. Los servidores configurados deberían aparecer en la lista

## Solución de Problemas

Si los servidores no aparecen:
1. Verifica que el archivo `.claude.json` tenga la sintaxis JSON correcta
2. Asegúrate de haber reiniciado Claude Code después de hacer cambios
3. Revisa que tengas conexión a internet para descargar los paquetes npm
4. Para DigitalOcean, verifica que el token de API sea válido

## Notas Importantes

- Los servidores MCP se ejecutan bajo demanda usando `npx`
- No necesitas instalar los paquetes globalmente
- La configuración es específica por proyecto (en este caso `/mnt/c/Users/Dsg/Documents/Projects`)
- Los servidores MCP permiten a Claude Code interactuar con servicios externos de forma segura