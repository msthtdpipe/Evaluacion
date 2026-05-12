# Actividad 2.6 - Web Scraping con Cheerio

Una aplicación backend en Node.js que extrae datos estructurados de HTML utilizando Cheerio y los expone a través de una API REST.

## Descripción del Proyecto

Este proyecto implementa una solución backend utilizando **Node.js** y **Express** que:
- Lee contenido HTML de archivos locales
- Lo procesa utilizando **Cheerio** para extraer información estructurada
- Extrae datos de productos incluyendo título, precio y disponibilidad
- Devuelve los datos a través de una API REST con validación y manejo de errores

## Estructura del Proyecto

```
actividad_2_6_cheerio/
├── datos.html              # Archivo HTML de ejemplo
├── package.json            # Dependencias y configuración del proyecto
├── README.md               # Este archivo
├── server.js               # Punto de entrada del servidor Express
├── controllers/
│   └── scrapeController.js # Manejadores de solicitudes para endpoints de scraping
├── routes/
│   └── scrapeRoutes.js     # Definición de rutas de la API
└── services/
    └── scrapeService.js    # Lógica de negocio para procesar HTML
```

## Características

- **Web Scraping**: Utiliza Cheerio para analizar y extraer datos de archivos HTML
- **API REST**: Servidor basado en Express en el puerto 3000
- **Extracción de Datos**: Extrae información de productos (nombre, precio, disponibilidad)
- **Manejo de Errores**: Manejo integral de errores con códigos HTTP apropiados
- **Validación de Datos**: Valida los datos extraídos y maneja casos especiales

## Dependencias

- **express** (^5.2.1) - Framework web para construir la API REST
- **cheerio** (^1.2.0) - Sintaxis similar a jQuery para analizar y manipular HTML
- **axios** (^1.16.0) - Cliente HTTP para realizar solicitudes
- **node** (con sistema de módulos CommonJS)

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/msthtdpipe/Evaluacion.git
```

2. Instalar dependencias:
```bash
npm install
```

## Uso

Iniciar el servidor:
```bash
npm start
```

El servidor se ejecutará en `http://localhost:3000`

## Endpoints de la API

### GET `/api/scrape`

Extrae información de productos del archivo HTML.

**Respuesta Exitosa (200):**
```json
{
  "ok": true,
  "total": 2,
  "resultados": [
    {
      "id": 1,
      "nombre": "Título del Producto",
      "precio": "$99.99",
      "stock": "Disponible"
    }
  ]
}
```

**Respuesta de Error (404):**
```json
{
  "ok": false,
  "msg": "No se encontraron elementos con los selectores definidos"
}
```

**Respuesta de Error (500):**
```json
{
  "ok": false,
  "msg": "Error interno en el servidor de scraping"
}
```

## Arquitectura Técnica

### Configuración del Servidor (`server.js`)
- Configuración de la aplicación Express.js
- Middleware de análisis de cuerpo JSON
- Rutas montadas en el prefijo `/api`

### Rutas (`routes/scrapeRoutes.js`)
- `GET /scrape` - Dispara el scraping de HTML y extracción de datos

### Controlador (`controllers/scrapeController.js`)
- Maneja las solicitudes entrantes
- Llama al servicio de scraping
- Devuelve respuestas JSON formateadas con manejo de errores

### Servicio (`services/scrapeService.js`)
- Lee archivos HTML del sistema de archivos local
- Utiliza Cheerio para analizar HTML
- Extrae datos utilizando selectores CSS (`.card-producto`, `.titulo`, `.precio`, `.disponibilidad`)
- Devuelve datos estructurados de productos

## Selectores HTML

El scraper busca las siguientes clases CSS en el HTML:
- `.card-producto` - Elemento contenedor del producto
- `.titulo` - Título/nombre del producto
- `.precio` - Precio del producto
- `.disponibilidad` - Estado de disponibilidad/stock del producto

## Manejo de Errores

- **404**: No se encontraron elementos que coincidan con los selectores definidos
- **500**: Errores de acceso a archivos o errores internos del servidor
- Todos los errores se devuelven en un formato JSON consistente con códigos de estado

## Licencia

ISC

## 🔗 Repositorio

[Repositorio en GitHub](https://github.com/msthtdpipe/Evaluacion)
