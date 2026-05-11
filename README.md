# Actividad 2.6: Exploración de JavaScript en backend + Cheerio

## Objetivo
Implementar una solución backend utilizando **Node.js** y **Express** que obtenga el código HTML de una página, lo procese mediante **Cheerio** para extraer información estructurada (título, precio, y disponibilidad) y la devuelva a través de una API REST aplicando validaciones y manejo de errores.

## Instalación
1. Clona el repositorio.
2. Abre la terminal en el directorio principal (`actividad_2_6_cheerio`).
3. Instala las dependencias ejecutando:
   \`\`\`bash
   npm install
   \`\`\`

## Ejecución
Inicia el servidor de desarrollo ejecutando:
\`\`\`bash
npm start
\`\`\`
El servidor correrá en `http://localhost:3000`.

## Endpoints

### 1. Obtener datos parseados
- **Método:** `GET`
- **Ruta:** `/api/scrape`
- **Query Params (opcional):** `?url=https://books.toscrape.com/`
- **Descripción:** Descarga el HTML de la URL especificada (o la de prueba por defecto) y extrae datos utilizando selectores CSS.

#### Ejemplo de Response (Éxito - 200 OK):
\`\`\`json
{
  "success": true,
  "total_extraidos": 20,
  "data": [
    {
      "id": 1,
      "titulo": "A Light in the Attic",
      "precio": "£51.77",
      "disponibilidad": "In stock"
    }
  ]
}
\`\`\`

#### Ejemplo de Response (Error URL Inválida - 400 Bad Request):
\`\`\`json
{
  "success": false,
  "message": "La URL proporcionada no es válida. (Ejemplo: https://sitio.com)"
}
\`\`\`

## Selectores Utilizados y Datos Extraídos
Para esta demostración apuntamos a `books.toscrape.com`. Se usaron los siguientes selectores de Cheerio:
1. Contenedor principal: `$('article.product_pod')`
2. **Título (Dato 1):** `$(element).find('h3 a').attr('title')` (Obtiene el atributo title para sacar el nombre completo).
3. **Precio (Dato 2):** `$(element).find('.price_color').text()` (Obtiene el texto del precio).
4. **Disponibilidad (Dato 3):** `$(element).find('.instock.availability').text().trim()` (Extrae si está o no en stock y limpia saltos de línea con trim).
