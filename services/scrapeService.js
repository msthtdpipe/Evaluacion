const axios = require('axios');
const cheerio = require('cheerio');

const extraerDatosLibros = async (url) => {
    try {
        const respuesta = await axios.get(url, { timeout: 5000 });
        const html = respuesta.data;

        const $ = cheerio.load(html);
        const resultados = [];


        $('article.product_pod').each((index, elemento) => {
            // Extraer 3 datos requeridos
            const titulo = $(elemento).find('h3 a').attr('title');
            const precio = $(elemento).find('.price_color').text();
            const disponibilidad = $(elemento).find('.instock.availability').text().trim();


            if (titulo && precio && disponibilidad) {
                resultados.push({
                    id: index + 1,
                    titulo: titulo,
                    precio: precio,
                    disponibilidad: disponibilidad
                });
            }
        });

        return resultados;

    } catch (error) {
        console.error("Error en la extracción con Cheerio:", error.message);
        throw new Error('Fallo al obtener o parsear el HTML'); 
    }
};

module.exports = { extraerDatosLibros };