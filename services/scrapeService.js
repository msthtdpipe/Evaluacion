const axios = require('axios');
const cheerio = require('cheerio');

const extractData = async (url) => {
    try {
        const { data: html } = await axios.get(url);
        
        if (!html) {
            throw new Error("El cuerpo del HTML está vacío.");
        }

        const $ = cheerio.load(html);
        const results = [];

        // Extraer información (Asumiendo books.toscrape.com como objetivo principal)
        $('article.product_pod').each((index, element) => {
            // Mínimo 3 datos solicitados:
            const title = $(element).find('h3 a').attr('title'); // Dato 1
            const price = $(element).find('.price_color').text(); // Dato 2
            const availability = $(element).find('.instock.availability').text().trim(); // Dato 3

            if (title && price) {
                results.push({
                    id: index + 1,
                    titulo: title,
                    precio: price,
                    disponibilidad: availability
                });
            }
        });

        return results;

    } catch (error) {
        throw new Error(`Fallo al obtener la página: ${error.message}`);
    }
};

module.exports = { extractData };