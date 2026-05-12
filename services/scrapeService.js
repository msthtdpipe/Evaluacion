const cheerio = require('cheerio');
const fs = require('fs').promises;
const path = require('path');

const procesarArchivoLocal = async () => {
    try {
        // Ruta dinámica para encontrar el HTML en la carpeta /public
        const ruta = path.join(__dirname, '../../public/index.html');
        
        // Verificamos si el archivo existe antes de leerlo (Validación de robustez)
        await fs.access(ruta);
        const contenido = await fs.readFile(ruta, 'utf-8');

        const $ = cheerio.load(contenido);
        const listaProductos = [];

        // Selectores basados en la estructura de EduTrack (clases claras)
        $('.card-producto').each((i, el) => {
            listaProductos.push({
                id: i + 1,
                nombre: $(el).find('.titulo').text().trim(),
                precio: $(el).find('.precio').text().trim(),
                stock: $(el).find('.disponibilidad').text().trim()
            });
        });

        return listaProductos;
    } catch (error) {
        // Si el archivo no existe o hay error de lectura
        throw { status: 500, message: "Error al acceder al archivo de la maqueta" };
    }
};

module.exports = { procesarArchivoLocal };