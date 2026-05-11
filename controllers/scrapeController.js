const scrapeService = require('../services/scrapeService');

const iniciarScraping = async (req, res) => {
    try {
        const { url } = req.body;

        // 1. Validación: HTML/URL no vacía 
        if (!url) {
            return res.status(400).json({ error: 'Falta la URL. Por favor, envía un campo "url" en el body.' });
        }

        // 2. Validación: Formato de URL válido 
        try {
            new URL(url);
        } catch (e) {
            return res.status(400).json({ error: 'La URL proporcionada no es válida. Incluye http:// o https://' });
        }


        const datosExtraidos = await scrapeService.extraerDatosLibros(url);

        // 3. Validación: Selectores sin resultados 
        if (!datosExtraidos || datosExtraidos.length === 0) {
            return res.status(404).json({ error: 'No se encontraron datos en la página con los selectores actuales.' });
        }

        // Respuesta exitosa
        return res.status(200).json({
            mensaje: 'Scraping realizado con éxito',
            total_extraidos: datosExtraidos.length,
            datos: datosExtraidos
        });

    } catch (error) {
        console.error("Error en el controlador:", error.message);
        // Manejo de errores de red o servidor 
        return res.status(500).json({ error: 'Error interno del servidor al procesar la página HTML.' });
    }
};

module.exports = { iniciarScraping };